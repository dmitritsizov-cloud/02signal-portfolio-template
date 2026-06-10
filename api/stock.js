// api/stock.js — Vercel serverless function (CommonJS)
// Hides your Anthropic API key on the server and looks up a stock via web search.
// Frontend calls:  /api/stock?q=AAPL   (same origin)  — returns JSON.
//
// Setup in Vercel:
//   1) Put this file at  api/stock.js  in your repo.
//   2) Vercel → Project → Settings → Environment Variables:
//        ANTHROPIC_API_KEY = sk-ant-...   (from console.anthropic.com)
//   3) Anthropic Console → enable the Web search tool for your organization.
//   4) Redeploy.

module.exports = async function handler(req, res) {
  // CORS — lets the page work even if it's hosted on GitHub Pages and calls this Vercel URL.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const q = (req.query && req.query.q ? String(req.query.q) : "").trim();
  const lang = (req.query && req.query.lang ? String(req.query.lang) : "en").toLowerCase();
  if (!q) { res.status(400).json({ found: false, error: "Empty query" }); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ found: false, error: "ANTHROPIC_API_KEY не задан в настройках Vercel" });
    return;
  }

  const langName = lang === "ru" ? "Russian" : lang === "et" ? "Estonian" : "English";
  const prompt =
    `You are a stock data lookup service. User query (ticker or company name): "${q}". ` +
    `Search the web for the most recent information about this stock. Return ONLY a JSON object ` +
    `(no markdown, no text before or after) with keys: found (boolean), name (official company name), ` +
    `ticker (symbol), exchange, price (number, latest price), currency (3-letter code of the price), ` +
    `segment (sector/industry, short), monthChangePct (number, approximate % change over the last ~1 month, ` +
    `can be negative, null if unknown), trendNote (short phrase about the 1-month trend), ` +
    `intro (1-2 sentence description of the company), asOf (when the price is from), ` +
    `source (source name). Write the human-readable text fields (name, segment, trendNote, intro, asOf) in ${langName}. ` +
    `If the stock is not found, return {"found": false}. Output JSON only.`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      const msg = data && data.error && data.error.message ? data.error.message : ("Anthropic API " + r.status);
      res.status(502).json({ found: false, error: msg });
      return;
    }

    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    let obj;
    try {
      const s = text.indexOf("{");
      const e = text.lastIndexOf("}");
      obj = JSON.parse(text.slice(s, e + 1));
    } catch (_) {
      res.status(200).json({ found: false, error: "Не удалось разобрать ответ модели" });
      return;
    }

    res.status(200).json(obj);
  } catch (err) {
    res.status(500).json({ found: false, error: String((err && err.message) || err) });
  }
};
