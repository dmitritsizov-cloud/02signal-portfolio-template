# Dmitri Tsizov — 02Signal Portfolio

## About Me

Hi! I'm **Dmitri Tsizov**, and I'm building practical AI automations for small businesses in Estonia.

In this portfolio I document my work in the **02Signal program** — a 7-week journey applying AI and n8n workflows to real business problems. My current case study: **UrbanStyle.ltd** (4 stores across Estonia, ~3000 active customers, ~600 hours/year currently spent on repetitive customer service that AI can handle).

**My focus:** turning manual processes into 24/7 automation — without replacing people, but freeing them from routine work.

📍 Estonia
🛠️ n8n · Telegram · Claude · Groq · Google Workspace · GitHub

---

## My Automations

### Week 1 — Customer Segmentation & Market Analysis ✅

**What I built:** A data-driven customer segmentation framework for UrbanStyle.ltd, generated using Claude as an AI strategic consultant.

**What it covers:** Five distinct customer segments (Eco-Kadri, Klubi-Maret, Trendi-Liisa, Narva-Olga, Ühekordne-Andres) with full demographic, behavioral, and value profiles. Each segment includes a marketing recommendation and a clear AI-automation priority. The analysis ends with a 6-month strategic roadmap for marketing director Anna Mets — including the honest insight that one segment's problem (Narva's 2.1% conversion) is **not** an AI problem but a localization/staffing issue.

**Key business insight:** Klubi-Maret = only 15% of customers but 35% of revenue. A single segment carries one-third of the business — and protecting it (churn prevention) is the highest-ROI AI use case UrbanStyle could deploy.

**Estimated business impact:** ~60,000€ additional annual revenue + risk mitigation on 1.4M€ of revenue from the loyalty segment.

**View it:**
- 📄 [Full segmentation analysis](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week1.md)
- 🎯 [The exact prompt I used (for reproducibility)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/prompts/week1-segmentation-prompt.md)

### Week 2 — Operations & Process Analysis ✅

**What I built:** A systematic evaluation of UrbanStyle's business processes using the Estonian **TÄPNE framework** (Frequency, Recognizability, Structure, Visible Value, Predictability — each scored 1-5, max 25 points).

**What it covers:** Ten candidate processes identified across core, support, and management categories — then scored individually against the TÄPNE criteria. Results: two processes hit a perfect 25/25 (sales reports, loyalty program management), three more in Tier 1 (20-22/25), and one deliberate counter-example at 7/25 (recruitment) showing the framework's discriminating power.

**Key strategic insight:** Not every high-scoring process is an AI project. Staff scheduling and inventory tracking score 22/25 but are solved by standard SaaS (Planday, ERP) — not AI. Mislabeling them as "AI" wastes budget. The genuinely AI-suited processes are loyalty program automation, customer support (already built in Week 4), and email personalization.

**Validates Week 4 retroactively:** The FAQ bot built in Week 4 addresses Customer Support — TÄPNE score 20/25, and the highest-scoring process that is genuinely an AI problem rather than a standard software problem.

**View it:**
- 📄 [Full process analysis with TÄPNE scoring](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week2.md)
- 🎯 [The two prompts I used (for reproducibility)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/prompts/week2-process-analysis-prompts.md)

### Week 3 — UrbanStyle FAQ Telegram Bot ✅

**What I built:** A branded Telegram bot for UrbanStyle.ltd customer service, connected to an n8n workflow.

**What it does:** When triggered in n8n, the workflow sends an automated message to the Telegram bot. This is the foundation for upcoming weeks where AI will generate FAQ responses automatically (~75% of customer queries are repetitive and bot-answerable).

**Try it / view it:**
- 🤖 [Live bot demo: @DmitriTsizov_bot](https://t.me/DmitriTsizov_bot)
- ⚙️ [Workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week3.json)
- 📄 [Business documentation & ROI estimate](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week3.md)

### Week 4 (Part 1) — UrbanStyle FAQ Bot powered by AI ✅

**What I built:** Upgraded the Week 3 bot with AI — it now understands customer questions in Estonian and answers from UrbanStyle's FAQ knowledge base, using Groq's `llama-3.1-8b-instant` model.

**What it does:** Customer asks a question (e.g. *"Mis on teie tagastuspoliitika?"*) → AI matches it against the FAQ → sends a relevant Estonian-language response via Telegram in ~5 seconds. If the question is outside the FAQ (e.g. *"Kas teil on astronaudikostüüme?"*), the bot honestly says it doesn't know and redirects to human support — **no hallucinations**.

**Tested with 3 scenarios:**
- ✅ In-FAQ question (returns) → accurate answer
- ✅ In-FAQ question (store hours) → accurate answer
- ✅ Out-of-FAQ question (astronaut costumes) → graceful "I don't know, contact human" response

**Try it / view it:**
- 🤖 [Live bot demo: @DmitriTsizov_bot](https://t.me/DmitriTsizov_bot)
- ⚙️ [Workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week4.json)
- 📄 [Business documentation & test results](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4.md)

### Week 4 (Part 2) — UrbanStyle Sisuloome Workflow v1.0 ✅

**What I built:** A controllable AI content drafting workflow for UrbanStyle.ltd — turns a campaign brief from a web form into a structured Instagram/Email/Facebook draft delivered to Telegram for human review before publishing.

**What it does:** Marketer fills a form (Campaign × Segment × Channel × Brief). A JavaScript code node looks up the campaign's allowed claims, forbidden claims, segment tone, and product inventory from CSV-style data. The AI gets brand voice rules + the campaign-specific constraints as a system prompt. Output: a structured draft (PEALKIRI / TEKST / CTA / HASHTAGID + AI self-check block) sent to Telegram in ~10 seconds. Human approves or edits before it goes anywhere public.

**Architecture:** Form Trigger → Code node (CSV lookup) → Basic LLM Chain (Groq llama-3.3-70b) → Telegram Send Message. Brand voice rules live in code, not PDF — every campaign update changes AI behavior automatically without prompt edits.

![n8n workflow canvas: Form Trigger → Code → AI → Telegram](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/screenshots/n8n-canvas.png?raw=true)

**Tested with 3 different campaigns:**

- ✅ Jätkusuutlik valik (PR-03) × Teadlikud noored (SEG-06) → Instagram post about Recycled tote
- ✅ Tööpäeva stiil (PR-02) × Tartu silver kliendid (SEG-02) → Email about Nordic chino
- ✅ Multiple variations confirmed: format consistency, CTA pulled correctly from CSV, no fabricated claims

**Real output example** — first run, AI-generated draft delivered to Telegram for human review (raw, before edits):

![AI-generated marketing draft delivered to Telegram for human review](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/screenshots/telegram-output.png?raw=true)

The draft has authorized claims (eco-certified, recycled materials), correct CTA pulled from CSV, and no fabricated discounts — but also Estonian hallucinations and format gaps that needed human cleanup. The full breakdown of what AI got right and what needed fixing is in the review log below.

**Try it / view it:**

- 📁 [Workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week4-sisuloome.json)
- 📄 [Brand voice document](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-brand-voice-et.md) — the Estonian brand voice that goes into AI system prompts
- 📄 [Code node technical setup](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-code-node-setup.md) — the CSV lookup logic, ~150 lines of JavaScript
- 📄 [Reference content drafts](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-sisu-draftid.md) — 5 expected output examples for comparison
- 📄 [**Human-in-the-loop review log**](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-tagasiside.md) ← the most valuable file

### Week 4 (Part 3) — UrbanStyle Sisuloome **Hybrid v1.1** ✅

**What I built:** A production-grade evolution of v1.0 — three input triggers feeding one AI logic, generating five channel-specific drafts from a single brief, with a Telegram feedback loop for revisions. Marketed internally as the "1 brief = 5 channels" workflow.

**What changed from v1.0:**

| Capability | v1.0 | v1.1 Hybrid |
|---|---|---|
| Input triggers | Form only | Form + Telegram (`/reklaam`, `PARANDA:`) + Schedule (daily 9:00) |
| Output channels | Single channel selected in form | All 5 channels at once: Telegram / Instagram / Facebook / Email / Tootekirjeldus |
| Data lookup | Products + campaigns | Products + campaigns + segments + **inventory warnings** (do_not_claim enforcement) |
| Human-in-the-loop | One-shot draft | **Full feedback loop** — write `PARANDA: <feedback>` in Telegram → AI revises → returns updated draft |
| Production status | Test mode | **Published** with Europe/Tallinn timezone |
| ROI tracking | Not measured | **75 minutes saved per execution** tracked automatically by n8n |

**Architecture (13 nodes):**

```
Form Trigger ────┐
Telegram Trigger ─┼─→ Normalize → N4 Data Lookup → AI Agent (Groq) → Multi-channel Formatter → Telegram Send
Schedule ────────┘
```

The Normalize node converts all three input shapes into one unified format. The Data Lookup node enriches the brief with the matched segment's tone, the campaign's `allowed_claims` / `do_not_claim` rules, the top 3 products from inventory, and stock-level warnings. The AI Agent receives this as structured context — so it cannot fabricate prices (89€ Linen Flow stays 89€) or claim wide availability for low-stock products (Merino Light, 9 units, gets a "do not promise wide availability" flag).

**The "1 brief = 5 channels" insight:** the same brief generates a 3-sentence emoji-friendly Telegram post, a 4-sentence inspirational Instagram caption with 6-8 hashtags, a 4-5 sentence Facebook post with a clear CTA, an Email with subject line + 3 paragraphs, AND a 80-120 word product description for the e-shop. Each output respects the channel's voice while staying inside the campaign's `allowed_claims`. A marketer who would have spent 80 minutes on one campaign in five formats now spends 6 minutes — fill the brief, review the Telegram draft, hit approve.

**The PARANDA feedback loop:** after receiving any draft, the marketer can write `PARANDA: tee Telegrami tekst lühemaks ja eemalda emoji` in the same Telegram chat. The bot loads the previous draft from n8n's static data store, sends it back to the AI with the feedback as a revision instruction, and returns a corrected version. The brand voice is preserved automatically — the AI does not start from scratch. This is the pattern N4 calls *Ha+ tase* (advanced level): AI accelerates the typing, the human only judges what's right.

**Production debugging story (the most valuable lesson):** importing the workflow into n8n exposed four real-world issues that no template solves automatically. (1) Imported credentials display their old name but aren't actually linked — every credential field needs to be re-selected manually. (2) The same applies to AI model credentials separately. (3) I initially put the bot's own Telegram ID (`8773999500`) into the chat_id field, causing `Forbidden: bot can't send messages to bot` — the user's chat ID and the bot's ID are different numbers and easy to confuse. (4) The Telegram trigger only catches messages when the workflow is **Published** (Active), not in Test mode — Form Trigger works in both, but Telegram Trigger needs a registered webhook. Each issue took 2-5 minutes to fix once diagnosed; the value is in the diagnostic patterns, which now go into my engineering notebook.

**Real output example** — single brief about *Tartu silver kliendid × Tööpäeva stiil*, all five channels delivered to Telegram in 10 seconds:

![Multi-channel AI draft: Telegram + Instagram + Facebook + Email + Tootekirjeldus](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/screenshots/telegram-output-hybrid.png?raw=true)

**Estimated business impact:** Anna Mets currently produces ~5 content units per week and needs ~20. At 75 minutes saved per draft (measured by n8n tracking), reaching 20 units/week becomes feasible without hiring. Conservatively: 15 hours/week of marketing capacity returned, ~750€/month in opportunity cost recovered, and brand voice consistency enforced by code rather than reliance on individual judgment.

**Try it / view it:**

- 📁 [Hybrid workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week4-sisuloome-hybrid.json)
- 📄 [Setup & demo guide](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-hybrid-setup.md) — five-step deployment + three-minute demo script
- 📄 [Production debugging notes](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week4-hybrid-debug-log.md) — the four import issues and how to diagnose them in under a minute each

### Week 5 — UrbanStyle Andmeraport **Hybrid v1.0** ✅

**What I built:** A data-aware reporting workflow that turns 25 rows of UrbanStyle daily sales into a five-field executive report — delivered to Telegram and logged in Google Sheets for time-series analysis. Same three-trigger Hybrid pattern as Week 4 (Part 3), but adapted for N5's job: **data → insight → decision**, not brief → content.

**What it does:** Triggered by Form, Telegram command, or a 9:00 daily Schedule → reads 25 rows of sales data from Google Sheets `SisendLogi` → a JavaScript Code node aggregates the data deterministically (Narva share 5.96% vs 12% KPI target, 4 `stock_risk = high` rows all from Narva womenswear, period-over-KPI achievement 96.3%) → AI Agent receives the pre-calculated aggregates and writes a 5-field JSON report (`key_metric` / `finding` / `recommendation` / `human_check` / `ai_limitation`) in business Estonian → output is **simultaneously** logged as a new row in Google Sheets `Raportid` AND sent as a formatted Markdown message to Telegram for Marko's review.

**Architecture (8 nodes):**

```
Form Trigger ────┐                                                                                       ┌─→ Sheets Write (Raportid)
Telegram Trigger ─┼─→ Normalize → Sheets Read (SisendLogi) → Code (Agregeeri müük) → AI Agent (Groq) ──┤
Schedule ────────┘                                                                                       └─→ Telegram Send
```

**The deterministic-creative split (most important architectural decision):** the Code node calculates *every* number — total revenue, Narva share, stock_risk count, KPI achievement percentage — and labels statuses (`CRITICAL` / `BELOW_TARGET` / `OK`, `EXCEEDS_KPI` / `WITHIN_KPI`). AI receives these as structured input and only writes prose around them. **AI cannot fabricate cifras because it never sees raw rows — it sees aggregates.** When I cross-checked the same analysis prompt against Groq (in-workflow), Grok, and Gemini, all three got the anchor metrics (Narva 5.96%, stockRisk 4×, Tallinn 5,780€) correct because they came from the aggregator; the external models got *secondary* numbers wrong (Tartu 2,010€ instead of 3,210€, Online 3,310€ instead of 4,910€) because they were trying to recalculate from raw data. Removing AI's ability to do arithmetic is what makes the report trustworthy.

**The Narva discovery (real strategic insight, not a demo):** running the workflow on five days of data surfaced a pattern that wouldn't have been visible without aggregation. Narva produces **5.96% of revenue** against a 12% KPI target — but the problem is not demand. All four `stock_risk = high` rows came from one combination: **Narva store × women's clothing × Spring Wardrobe campaign**. The same campaign works elsewhere: Tallinn 5,780€, Tartu 3,210€, Online 4,910€. The note field has customers saying *"kliendid küsivad puuduvaid suurusi"* four days in a row. This is a **supply problem, not a demand problem** — and Narva is the closest analog UrbanStyle has to what their Riga expansion will look like. The report Kristi takes to the board has one sentence: *do not finance Riga expansion until Narva supply chain is audited.* That's not generated content. That's a finding that survives audit.

**The Sheets-as-memory pattern:** every report writes a new row to the `Raportid` tab with 11 columns including a `human_check` field that captures what Marko has to verify before the report goes external (e.g. *"are the note-column flags confirmed by Liis?"*, *"does the 5-day window cover the full campaign period?"*). Over 3+ weeks, the log becomes searchable history — comparing this week's Narva pattern to last week's, tracking how many high-risk warnings preceded a real stock-out, watching whether recommendations got acted on. Google Sheets is not the long-term database, but it's the right starting point: zero infrastructure, human-readable, an n8n node away from any future Postgres migration. **The workflow doesn't just deliver a report — it accumulates a decision log.**

**Real output example** — full 5-day sales analysis, all five AI fields populated from pre-calculated aggregates, delivered to Telegram in ~10 seconds and simultaneously logged in Google Sheets:

![N5 Telegram report — deterministic numbers + AI narrative](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/screenshots/n5-telegram-report.png?raw=true)

**Tested with cross-AI validation:** ran the same prompt and aggregates through Groq (in-workflow), Grok (external chat), and Gemini (external chat). All three correctly identified Narva 5.96% / 12% target / supply-chain risk as the primary finding. Differences only appeared in non-anchor numbers — confirming that the deterministic-creative split is the right architecture for any data-to-narrative workflow.

**Estimated business impact:** Marko currently spends ~90 minutes per manual report — pulling data from 5 sources, asking Liis for inventory status, checking promo calendars, summarizing for Kristi. At 4 reports per week × 80 minutes saved = **5 hours/week × 50 weeks = ~250 hours/year**, roughly equivalent to **12,500€** of director-level cost recovered, plus a measurable reduction in time-to-decision for board-level questions. The Sheets log adds a second compounding effect: every week of accumulated reports makes the next analysis cheaper because patterns become comparable across time.

**Try it / view it:**

- 📁 [N5 workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week5-andmeraport-hybrid.json)
- 📊 [Google Sheets template (SisendLogi + Raportid headers)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/data/week5-sheets-template.csv)
- 📄 [Setup & deployment guide](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week5-hybrid-setup.md) — Google Cloud OAuth, Sheets credentials, and the Narva test scenario in under 15 minutes
- 📄 [The Narva analysis](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week5-narva-finding.md) — full data breakdown of the supply-side pattern and what it means for the Riga expansion case

### Week 6
*Coming soon — AI strategy presentation*

### Week 7
*Coming soon — Final demo*

---

## My Workflows

All my n8n workflows are stored as `.json` files in [the workflows folder](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/tree/main/workflows). Anyone with n8n access can import them and run the same automation.

## My Business Documents

Business analyses, ROI estimates, and architecture overviews are in [the docs folder](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/tree/main/docs). Each major automation has a corresponding business case.

## My AI Prompts

Reusable prompt templates I've designed are in [the prompts folder](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/tree/main/prompts). These are the exact prompts that produced the analyses in my portfolio — saved for reproducibility and future reuse.

---

## What I Learned

### Week 1

**What was new:** Working with AI as a *strategic consultant* — fundamentally different from using it as a *production component* (like Week 4's bot). Same tool, completely different pattern: one-time deliverable instead of continuous pipeline, conversational interface instead of API workflow, business judgment instead of automated tests. Recognizing which pattern fits a problem is itself a senior skill.

**What was hard:** Validating AI output without real transaction data. Claude generated estimated percentages that *looked* professional and consistent — but they're estimates, not facts. The temptation was to accept the numbers because they were specific. Recognizing them as hypotheses (not conclusions) is part of the consultant's job. The next iteration will validate against actual RFM analysis on transaction records.

**What clicked:** Segmentation isn't demographics — it's behavior + value. The most useful insight wasn't "this segment is 25-35 years old" but "this segment generates 35% of revenue from only 15% of customers." That single ratio drove the entire prioritization. Also: the most consultant-level move Claude made was flagging that Narva's low conversion is **not an AI problem** — it's a localization/staffing problem. Knowing what *not* to automate is just as important as knowing what to automate.

### Week 2

**What was new:** The TÄPNE framework gives systematic discipline to a question that usually devolves into opinions. "Should we automate this?" becomes a 1-5 score across five concrete criteria, comparable across processes. The framework doesn't make decisions for you — but it forces honest evaluation and reveals where intuition was wrong. Also new: distinguishing **AI projects** from **ordinary automation projects**. Several high-scoring processes (staff scheduling, inventory tracking) are solved by standard SaaS, not AI. Mislabeling them costs budget and credibility.

**What was hard:** Resisting uniform high scores. When everything ranks 22-25, the framework is useless. The quality check on Claude's evaluation was: are some scores genuinely low? Recruitment got 7/25, social media 13/25 — and that honesty is what makes the rest of the rankings credible. Also hard: distinguishing cost-savings ROI from revenue-protection ROI. Marko's 8 hours/week is real money, but protecting €1.4M of Klubi-Maret revenue through churn prevention is an order of magnitude larger. Both are valid; both deserve separate analysis.

**What clicked:** Process analysis is segmentation analysis viewed from a different angle. Week 1 looked at customers; Week 2 looked at the work UrbanStyle does for those customers. The same insights re-emerge — Klubi-Maret matters most, Narva needs language work first, Trendi-Liisa drives operational pain — but viewed through where the *work* happens. Both views are needed; neither alone is enough. And the most valuable consultant move was explicitly listing what *not* to automate (recruitment, AI-generated content for Eco-Kadri). Negative recommendations prevent expensive mistakes.

### Week 3

**What was new:** First time building an end-to-end automation. Learning that n8n + Telegram is just two pieces — Trigger and Action — and everything else is variations on that pattern.

**What was hard:** BotFather's two-step logic. When you type `/setname`, it asks "Choose a bot" — and you must select from buttons, not type a new name. I made this mistake first try and got "Invalid bot selected" four times before realizing.

**What clicked:** This isn't a one-off task — it's infrastructure. The same Telegram credential I created today will be reused in Week 4 (with AI), Week 5 (with Google Sheets), and beyond. Every week stacks on top of the previous one.

### Week 4 (Part 1)

**What was new:** First production-grade integration with an AI service. Got hands-on with API key security, prompt engineering, and the two-node architecture (Basic LLM Chain + Chat Model) that n8n uses to keep AI providers swappable.

**What was hard:** Two pitfalls hit me. First, n8n's autocomplete suggested `xAI Grok Chat Model` when I searched "Groq" — I almost configured the wrong service (Grok vs Groq are different companies entirely). Second, when the AI node hung for 60+ seconds, my instinct was to assume my code was broken — but checking Groq Console showed the request had been processed; the issue was the n8n instance, not my workflow.

**What clicked:** The biggest insight was that **prompt quality is 90% of AI bot quality**, not model choice. The same `llama-3.1-8b-instant` model can either confidently fabricate fake products OR honestly say "I don't know" — entirely depending on how the system prompt is written. Hallucination protection is non-negotiable for customer-facing bots, and it's just a few well-placed sentences in the prompt.

### Week 4 (Part 2) — Sisuloome Workflow v1.0

**What was new:** CSV-as-config for AI behavior. Until this week I thought "AI prompts" meant writing one good text and reusing it. Realized prompts can be **dynamically constructed** from structured data — every brief gets a campaign-specific prompt with the exact allowed/forbidden claims for that campaign. The result: AI cannot fabricate marketing claims because the constraints are baked into its input, not added as a hopeful instruction.

**What was hard:** Three things, in order of how much time they ate. First, Form Trigger field names must match Code node lookup keys character-by-character — one wrong `ä` and `.find()` returns nothing. Second, I didn't realize I had two triggers (Manual + Form) running in parallel — Submit hung because the workflow was confused which path to follow. Third, AI hallucinations in Estonian. Even llama-3.3-70b invents words ("üksmeele", "käsugas", "stiilililisemaks") and uses outdated years (#kevad2024 in 2026). Fact-level constraints work; stylistic constraints are fuzzier.

**What clicked:** The system's value isn't the AI — it's the **structured input data**. Code node guarantees AI sees only authorized claims and excludes low-stock products (US-P-202 Merino, 9 units, never appears in any draft). Without that filtering, AI is a nice text generator. With it, AI is a content assistant that can't sabotage the brand. Brand voice is code, not a PDF nobody reads. And the Telegram review checkpoint takes 30 seconds per draft — not because human review is slow, but because the human-in-the-loop is **structurally fast** when AI does the typing and the human only judges.

### Week 4 (Part 3) — Hybrid Upgrade v1.1

**What was new:** Designing for **multiple input shapes feeding one logic**. The v1.0 workflow had one trigger and one output. The Hybrid version has three triggers (Form, Telegram, Schedule) — but they all converge into a single Normalize node that produces a unified shape, so the rest of the pipeline (data lookup, AI, formatter, Telegram send) doesn't need to know where the request came from. This is the same pattern professional APIs use: many endpoints, one internal model. Realizing that *the unification step is itself the architecture* — not a chore — was the conceptual jump.

**What was hard:** The four production issues during deployment, in order of how stupid they felt afterward:

1. **Credential mapping after import.** A `.json` workflow file remembers credential *names*, not the credentials themselves. When I imported it, every node showed "UrbanStyle FAQ Bot 1" in its Credential field — but n8n still threw "Node does not have any credentials set" because the names weren't actually bound to real credentials in my workspace. Fix: re-select every credential manually. Five seconds per node, but invisible until you try to execute.
2. **The same problem hit the Groq Chat Model node separately.** Each AI provider node has its own credential dropdown. Importing fixes the *workflow shape*, never the *secrets*.
3. **Bot ID vs user chat ID.** I put `8773999500` (the bot's own Telegram ID) into the chat_id field instead of `6205033039` (my personal chat ID). Telegram API responded with `Forbidden: the bot can't send messages to the bot` — a clear error message that I still misread three times because I'd convinced myself the number was right. Fix: bots send TO users, not TO themselves; the recipient ID is always the human's, found via `getUpdates` or any RawDataBot.
4. **Active vs Test mode for triggers.** Form Trigger works in both modes through a test URL. Telegram Trigger only works when the workflow is **Published** — because that's when n8n registers a webhook with Telegram. Schedule trigger same story. So the workflow appeared "broken" through Telegram even though the canvas was green.

**What clicked:** Production deployment is an entirely different skill from prototyping. The v1.0 workflow worked the moment I built it, because everything was on the same machine and I had set every credential by hand. The v1.1 import felt like deploying to a new environment for the first time — and that's exactly what it was. The credentials are the *interface between the workflow and reality*, and an exported `.json` cannot carry that interface across environments. **This is the most useful operational lesson of the week:** treat every workflow import like a fresh deployment, run a five-minute credential audit before testing, and verify Active/Test mode for each trigger type. Skipping any of the four checks costs more time than doing all of them. Also clicked: the **"1 brief = 5 channels"** framing. Until I produced all five outputs from one input, I thought of channels as separate workflows. After: one brief is the unit of work, the channels are projections. That reframing alone is what makes the workflow worth 75 minutes of saved time per execution.

### Week 5 — Andmeraport Hybrid v1.0

**What was new:** Splitting work between **deterministic logic** and **creative AI** as an architectural rule, not just a preference. Previous weeks had AI doing both the calculating and the writing — and tolerating the occasional fabrication as long as the prose was good. Week 5 forced the separation: every numeric claim in the report comes from a Code node that ran in 50 milliseconds with auditable math; every sentence around those numbers comes from AI that explicitly cannot do arithmetic. The result is a report I can defend to a CEO without checking the figures, because the figures were never AI's job in the first place. Also new: Google Sheets as **workflow memory**, not just a data source — every execution writes a row, and rows accumulate into a searchable decision log over time. The same `Raportid` table that records this week's analysis is what I'll query in week 8 to ask "how many high-risk Narva warnings preceded a real stock-out?"

**What was hard:** Three things, in descending order of time cost.

1. **Google Cloud OAuth setup.** n8n self-hosted requires creating an OAuth Client ID in Google Cloud Console — enable Sheets API + Drive API, configure consent screen, register the redirect URI (`https://n8n.02signal.com/rest/oauth2-credential/callback`), and add my own Google email as a test user before any auth flow works. About 15 minutes one-time, but with zero margin for error: a single missing test user invalidates the entire flow with "Access blocked" and gives almost no signal what's actually wrong. The fix order matters too: skip the test user step and you don't find out until step 9 of 9.
2. **CSV import into Google Sheets does not auto-parse.** Pasting 25 rows of comma-separated text creates 25 cells in column A, not 25 rows × 10 columns. The fix is *Data → Split text to columns*, but the menu option is **greyed out unless you select a cell range** (not entire rows). I spent five minutes clicking row numbers and wondering why the option was disabled before realizing the selection had to be `A2:A26`, not `2:26`.
3. **AI's `output` field returns a JSON string, not a parsed object.** Using `{{ $json.output.key_metric }}` in downstream nodes produces blank values — the field is literally the string `"{\"key_metric\":\"...\"}"`. The fix is `{{ JSON.parse($json.output).key_metric }}` everywhere the AI's structured output is consumed, including the Sheets Write node and the Telegram message template. Five expressions, one mistake, two debugging cycles in Telegram before I caught it.

Also: the Vorminda node from the v1.1 template that I duplicated had a hardcoded reference to a deleted upstream node (`$('02Signal N5 raportilogi')`), which silently broke the whole branch with `Cannot assign to read only property 'name'`. **When you fork a workflow template, the broken nodes from the original are debt you inherit.** Audit-then-delete, not the reverse.

**What clicked:** The Hybrid v1.1 pattern from Week 4 (Part 3) is **template-able**. Week 5 is Week 4's architecture with two pieces swapped: hardcoded Data Lookup → Google Sheets Read, and Multi-channel Formatter → Sheets Write + single Telegram. The pipeline shape — three triggers, Normalize node, deterministic enrichment, AI as text generator, dual output — is the same. This is the difference between Shu, Ha, and Ri: Shu is following a template; Ha is adapting it to a new problem; Ri is recognizing that *the template itself is the asset*. After two iterations on this Hybrid pattern, I can estimate that the next workflow with the same shape — a weekly customer-service quality report, a daily inventory-alert digest, a monthly board-metrics summary — would take 2-3 hours, not 2-3 days. **The pattern is the product.**

And the Narva 5.96% finding is the proof that boring data tooling, applied honestly, produces consultant-grade insights without consultants. The exact same five days of data, viewed without the aggregator, look like "Narva is doing badly, probably needs more marketing." Viewed with the aggregator, they say "Narva has 4 of 4 high-risk markers in one product category, supply chain is broken, do not extrapolate to Riga." Same data, two different conclusions, and the second one is worth tens of thousands of euros in averted misallocation. **The architecture is what produces the insight — not the AI.**

### Week 6
*Coming soon*

### Week 7
*Coming soon*

---

*Built with the [02Signal portfolio template](https://github.com/02signal/02signal-portfolio-template)*
