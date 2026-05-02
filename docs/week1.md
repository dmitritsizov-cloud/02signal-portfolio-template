# Week 1 — Customer Segmentation & Market Analysis

**Project:** UrbanStyle.ltd — sustainable fashion retail in Estonia
**Course:** 02Signal — AI Business Automation Program
**Author:** Dmitri Tsizov
**Tools:** Claude Opus 4.7 (AI Consultant pattern)

---

## Project Context

UrbanStyle.ltd is a sustainable fashion retailer operating 4 physical stores across Estonia (Tallinn, Tartu, Pärnu, Narva) plus an e-commerce platform that generates 60% of revenue. The company has approximately 3000 active customers, 35% repeat-purchase rate, and ~4M EUR annual turnover.

**Business challenge:** Marketing director Anna Mets needs a data-driven customer segmentation framework to allocate her marketing budget effectively. Until now, all 3000 customers received the same generic campaigns. Data analyst Marko Tamm has the underlying transaction data but is overloaded with manual reporting tasks.

**My role this week:** Acting as a consultant for UrbanStyle, I used AI to generate a customer segmentation analysis and strategic recommendations that Anna and CEO Kristi Pärn can use to prioritize the next 6 months of work — including which segments justify AI automation investment.

---

## My Approach: AI as Consultant Pattern

This week introduced a **fundamentally different** AI workflow than what we built in Week 4.

| Pattern | Week 4 (FAQ Bot) | Week 1 (Segmentation) |
|---------|------------------|----------------------|
| **Type** | AI Pipeline | AI Consultant |
| **Frequency** | Continuous (every customer query) | One-time strategic analysis |
| **Output** | Customer-facing answers | Internal business document |
| **Validation** | Automated test cases | Human business judgment |
| **Tool** | Groq API embedded in n8n | Claude.ai conversational interface |

In Week 4, AI was a **production system component**. In Week 1, AI was a **strategic thinking partner** — like hiring a consultant for one project. Both patterns are valuable, and recognizing which to use for which problem is itself a skill.

---

## The Prompt Engineering

The quality of AI consultation is 90% determined by the quality of the prompt. My prompt structure followed four principles:

1. **Role assignment:** "Käitu nagu kogenud ärianalüütik..." — gives Claude a professional perspective
2. **Full business context:** All UrbanStyle data in one block (financials, demographics, store data, team)
3. **Specific deliverables:** 8 attributes per segment + comparison table format
4. **Honesty requirement:** "Kui andmeid pole, ütle ausalt 'see on hinnang'" — prevents fabricated certainty

The full prompt is preserved in `prompts/week1-segmentation-prompt.md` for reproducibility.

---

## Customer Segments Identified

Claude generated **5 distinct segments**, each with realistic Estonian first names that immediately communicate the persona archetype.

### 1. Eco-Kadri — The Conscious Lifestyle Buyer

**Quick profile:** 26-34, female, Tallinn (Kalamaja/Telliskivi) or Tartu center, 1500-2500€/month income, works in office/creative/IT/non-profit sector.

**Why this segment matters:** Eco-Kadri represents ~20% of the customer base but generates ~30% of revenue with a high AOV (75-95€). She is highly loyal (~70% repeat purchase rate) and 80% are UrbanStyle Club members. She is the segment that **defines the brand's identity** — losing her means losing positioning.

**Buying behavior:**
- 4-6 purchases per year, primarily online (70%)
- Reads product descriptions thoroughly, checks material origin
- Follows the brand on Instagram before purchase
- Very low return rate (~5%) — she buys with intention

**What stops her from buying more:**
- Limited assortment vs. niche competitors (Reet Aus, Aldo Järvsoo, Marit Ilison)
- Doesn't respond to discount campaigns — needs substantive content
- Each purchase requires a "value story"

**Marketing recommendation:** Supply-chain transparency content, material origin stories, designer interviews, lookbooks. Channels: segmented email, Instagram, brand blog. Not discount campaigns.

**AI automation priority: HIGH** — personalized product recommendations based on viewing/purchase history. Material-based email sequences ("new collection in Estonian linen") rather than discount-driven.

### 2. Klubi-Maret — The Loyal Repeat Customer

**Quick profile:** 30-42, 90% female, all four cities (notably Pärnu in summer), 1800-3500€/month income, family with children, mid-level management or specialist.

**Why this segment matters:** Klubi-Maret is only ~15% of the customer base but generates ~35% of revenue — by far the highest LTV segment. Her repeat-purchase rate is ~95%. **Losing this segment is the single biggest revenue risk for UrbanStyle.**

**Buying behavior:**
- 6-10 purchases per year, AOV 70-100€
- Hybrid channel use: 50% online / 50% in-store (visits stores at season changes)
- Uses club benefits systematically
- Knows store staff by name in Tallinn/Tartu
- Low return rate (~10%)

**Hidden risks:**
- **Aging out:** What happens when Maret turns 45 and the brand targets "18-35"? This is a strategic question for Kristi (CEO).
- **Competitor loyalty programs:** Lindex and Reserved offer competing benefits
- **Collection fatigue:** If similar products repeat, churn risk increases

**Marketing recommendation:** Email + SMS for events. VIP early access (7 days before public). Tiered club levels (Silver / Gold / Platinum) gamifying LTV. Birthday and club anniversary offers.

**AI automation priority: HIGH** — but for a different reason than Eco-Kadri. The killer use case is **churn prediction**: identify when Maret starts "fading" (opens fewer emails, no purchase in 60+ days). Automated win-back workflow ready before she actually leaves. This has the highest ROI of any AI application UrbanStyle could deploy.

### 3. Trendi-Liisa — The Style-Seeking Student

**Quick profile:** 19-25, 70% female / 30% male, Tartu (TÜ students), Tallinn, marginal in Narva. 600-1200€/month income (student or first-job).

**Why this segment matters:** Trendi-Liisa is ~25% of the customer base (largest by headcount among loyal segments) but only ~15% of revenue. Low repeat rate (~25%). However, **she is the future Eco-Kadri** in 5-7 years if UrbanStyle maintains the relationship.

**Buying behavior:**
- 2-4 purchases per year, AOV 40-55€ (below average)
- 80% online — TikTok and Instagram are her discovery channels
- Sensitive to discount campaigns
- High return rate (~25%) — orders multiple sizes to try
- Buys 1-2 items at a time, basics (t-shirt, denim)

**The threats are real:**
- Direct competition: Zara, H&M, Vinted (secondhand), SHEIN (price)
- Estonian brand identity is a "plus" but not the primary purchase driver
- High return rate erodes profitability

**Marketing recommendation:** TikTok, Instagram Reels, Tartu campus events, micro-influencers (5-20k followers). Message: "Basics that last." Student-specific autumn campaign. Refer-a-friend mechanism. Lighter loyalty entry (student club, not full club).

**AI automation priority: MEDIUM** — size recommender (Stitch Fix-style) to reduce 25% return rate. First-purchase follow-up sequence ("Liisa style").

### 4. Narva-Olga — The Russian-Speaking Customer

**Quick profile:** 25-40, 85% female, Narva / Sillamäe / Kohtla-Järve / Lasnamäe in Tallinn. 900-1500€/month (Ida-Virumaa average is significantly lower than Tallinn). Russian native speaker.

**Why this segment matters:** Only ~10% of customer base and ~5% of revenue — **but the data tells a story**. Narva store conversion is 2.1% vs. average 3.4%. This isn't because the segment is unprofitable — **it's because the segment isn't being served properly.**

**Buying behavior:**
- 1-3 purchases per year, AOV 55-65€
- Prefers physical store before purchasing — different channel mix than other segments
- Social media: Instagram + partially VK
- Buys mostly during seasonal transitions and discount periods

**The actual problem isn't marketing — it's infrastructure:**
- Is the e-shop available in Russian? (Likely no or incomplete)
- Does Narva sales staff speak Russian fluently? (Question for Liis, ops director)
- Brand message ("sustainability, locality") may not resonate the same way
- Pricing perception vs. local purchasing power

**Marketing recommendation:** Russian-language Instagram content, VK presence, local Narva channels (Narva.ee, regional radio). Message focus on quality and durability ("clothing that lasts") rather than "Estonian locality."

**AI automation priority: MEDIUM, but with critical sequencing.** AI is **not the first investment** here. The first step is localization — Russian e-shop, Russian customer service. Then AI translation for product info. Then a Russian-language chatbot. **Skipping the localization step makes AI investment wasted.**

This is an important consultant-level insight: not every problem is an AI problem.

### 5. Ühekordne-Andres — The One-Time Buyer

**Quick profile:** 25-45 (broader range), 60% female / 40% male (highest male % — often the "gift-shopping man"), predominantly Tallinn, broad income range.

**Why this segment matters:** This is **the largest segment by customer count (~30%, ~900 people) and the biggest hidden opportunity**. They bought exactly once and never returned. If UrbanStyle can convert just 10% to repeat customers, that's +90 new repeat buyers — and repeat-customer LTV is 5-10× the first purchase value.

**Buying behavior:**
- One purchase, no return
- Often a gift-shopper (birthday, Christmas, Valentine's)
- Often not a club member
- Bought during a campaign or via friend recommendation
- AOV 50-70€

**Why didn't they come back?**
- No emotional brand connection formed — but why?
- Was the in-store/online experience good?
- Did the assortment match their actual style?
- Did sizing not work, returned with regret?
- Did pricing shock them?
- They have no "hook" to remember UrbanStyle

**Marketing recommendation:** 30/60/90-day automated email winback sequence:
- **30 days:** "How did X work for you?" (review request + category-based recommendation)
- **60 days:** "You might also like..." (cross-sell complementing the first purchase)
- **90 days:** Club invitation + first-month discount

Plus: club invitation at first-purchase checkout. Retargeting ads.

**AI automation priority: HIGH — best ROI of any segment.**

**The math:** 900 customers × 10% winback rate × 65€ AOV × 2.5 future purchases = **~14,600€ additional revenue per year.**

This is the segment where AI automation gives Anna the most visible win the fastest — which matters because it builds executive support for further AI investment.

---

## Comparison Table

| Attribute | Eco-Kadri | Klubi-Maret | Trendi-Liisa | Narva-Olga | Ühekordne-Andres |
|-----------|-----------|-------------|--------------|------------|------------------|
| **Age** | 26-34 | 30-42 | 19-25 | 25-40 | 25-45 |
| **Gender (primary)** | 80% F | 90% F | 70% F | 85% F | 60% F |
| **Primary location** | Tallinn, Tartu | All 4 cities | Tartu, Tallinn | Narva, I-Virumaa | Tallinn |
| **Income (€/month)** | 1500-2500 | 1800-3500 | 600-1200 | 900-1500 | Wide |
| **Purchase frequency/year** | 4-6 | 6-10 | 2-4 | 1-3 | 1 |
| **AOV (€)** | 75-95 | 70-100 | 40-55 | 55-65 | 50-70 |
| **Online / In-store** | 70 / 30 | 50 / 50 | 80 / 20 | 50 / 50 | 60 / 40 |
| **Club member** | ~80% | ~100% | ~15% | ~10% | ~5% |
| **Return rate** | ~5% | ~10% | ~25% | ~15% | ~20% |
| **% of customer base** | ~20% | ~15% | ~25% | ~10% | ~30% |
| **% of revenue** | ~30% | ~35% | ~15% | ~5% | ~15% |
| **Repeat customer %** | ~70% | ~95% | ~25% | ~20% | 0% |
| **Primary motivation** | Values, sustainability | Identity, exclusivity | Style on budget | Quality, price | One-time need |
| **Primary channel** | Instagram, email | Email, club | TikTok, IG | IG, VK | Retargeting, email |
| **AI priority** | HIGH | HIGH | MEDIUM | MEDIUM* | HIGH |
| **AI use case** | Personalized recs | Churn prediction | Size recommender | (Localize first) | Winback automation |

\* Narva's AI priority is medium because localization (Russian e-shop) must come first — that's an infrastructure project, not an AI project.

---

## Strategic Recommendations: Next 6 Months

If Anna can prioritize one segment to start with, the recommendation is:

### 1. Ühekordne-Andres Winback (start here)
- **Fastest visible ROI:** ~15,000€ additional annual revenue
- **Largest segment:** 900 people
- **Demonstrates AI value** to leadership (Kristi) quickly, building support for further investment

### 2. Klubi-Maret Churn Prevention (parallel track)
- **Biggest revenue risk:** 35% of revenue from 15% of customers
- Better to invest before the problem manifests, not after
- Churn prediction model: detect "fading" engagement before customer leaves

### 3. Eco-Kadri Long-term Content Strategy
- Not a quick AI win — requires sustained content investment
- But this segment **defines brand positioning** for the next 5 years
- Content automation (lookbooks, material stories) supports here

### 4. Narva 2.1% Conversion — Diagnostic Project (Liis + Anna)
- **Not an AI project initially**
- Hypothesis: language barrier (sales staff Russian fluency, e-shop localization)
- Run diagnostic before considering AI investment

This sequencing is itself a deliverable — telling leadership which problems are AI problems and which aren't.

---

## Business Impact Estimation

| Initiative | Estimated Annual Impact |
|------------|------------------------|
| Ühekordne-Andres winback automation | +14,600€ revenue |
| Klubi-Maret churn prevention | Defends ~1.4M€ revenue (35% of 4M) |
| Eco-Kadri personalization | +8-12% AOV in segment (~+30,000€) |
| Trendi-Liisa size recommender | -10pp return rate = ~+15,000€ margin |
| **Total estimated impact** | **~60,000€ + risk mitigation on 1.4M€** |

These are **estimates** based on industry benchmarks. Real numbers depend on execution quality.

---

## Connection to Week 4 (FAQ Bot)

Week 4 produced a working FAQ bot — but with a **uniform** voice for all customers. The Week 1 segmentation reveals this is suboptimal:

| Segment | What the bot should do differently |
|---------|-------------------------------------|
| **Eco-Kadri** | Detailed answers about materials, certificates, supply chain |
| **Klubi-Maret** | Premium tone, fast answers, recognize VIP status |
| **Trendi-Liisa** | TikTok-style: shorter, emoji, casual tone |
| **Narva-Olga** | **Russian language** — current bot doesn't support this at all |
| **Ühekordne-Andres** | Winback nudge: "By the way, here's -10% to come back" |

This is the bridge from **Week 1 strategy** to **Week 4 implementation**: segmentation should drive bot personalization in v2.

A future iteration of the FAQ bot could:
1. Detect customer segment at conversation start (from email lookup or asking)
2. Route to segment-specific system prompts
3. Use different tone, length, and language per segment

This transforms Week 1 from "abstract theory" into "engineering specification."

---

## What I Learned

### What was new
- **AI as Consultant pattern** — fundamentally different from AI Pipeline (Week 4). One-time strategic deliverable vs. continuous production system.
- **Prompt structure for analysis tasks:** role + context + specific deliverables + honesty requirement = high-quality output.
- **RFM analysis terminology** (Recency-Frequency-Monetary) — Claude introduced this concept and explained it's the "real" segmentation method when transaction data is available.

### What was hard
- **Validating AI output without real data.** Claude generated estimated percentages. I had to judge whether they were reasonable based on the business context I provided. The temptation is to accept the numbers because they look professional — but recognizing them as estimates (not facts) is part of the work.
- **Recognizing what's NOT an AI problem.** Claude flagged that Narva's low conversion rate is likely a localization/staff problem, not a marketing problem. This honesty is unusual and valuable — many consultants oversell AI as a universal solution.

### What clicked
- **Segmentation isn't demographics — it's behavior + value.** The most useful insights weren't "this segment is 25-35 years old" but "this segment generates 35% of revenue from only 15% of customers." Behavior and value are what drive business decisions.
- **Strategic prioritization is itself a deliverable.** Telling leadership "do these things in this order, here's why" is the consultant's actual product. The segmentation table is data; the prioritization is wisdom.
- **AI's biggest value is making strategic thinking accessible.** Without Claude, this analysis would have required hiring a consultant for 5,000-10,000€. With Claude and a good prompt, it took 90 minutes.

---

## Limitations & Future Iterations

This analysis has explicit limitations I want to be honest about:

1. **All percentages are estimates**, not derived from transaction data. Claude flagged this in the opening paragraph. The next step is RFM analysis on actual purchase records — Marko's job, ~1 day of work.

2. **Five segments is a hypothesis, not a fact.** Real customer behavior may cluster into 4 or 6 groups. Cluster analysis on actual data could refine this.

3. **No primary research conducted.** No customer interviews, no surveys. The persona attributes are inferred from demographics + business knowledge. A V2 should validate against actual customer voices.

4. **Static snapshot.** Customer behavior evolves. This segmentation needs annual review, especially as the brand grows and demographics shift.

### Planned iterations:
- **v2:** Validate against transaction data (RFM analysis)
- **v3:** Conduct 5-10 customer interviews per segment, refine personas
- **v4:** Cross-reference with Week 4 bot interaction logs (which segments ask which FAQ types?)

---

## Tools Used

- **Claude Opus 4.7** (claude.ai) — primary analysis tool, AI Consultant pattern
- **Source data:** UrbanStyle business profile, store performance metrics, team structure (provided as prompt context)
- **Validation:** My own business judgment + cross-reference with Week 4 implementation

**Cost:** 0€ (Claude Max plan, course-provided)
**Time investment:** ~90 minutes total

---

## Methodology Note: AI Consultant vs AI Pipeline

A reflection that emerged from this week:

**AI Pipeline** (Week 4 — Telegram FAQ bot):
- Repeating, automated production system
- Embedded in n8n workflow
- Same prompt every time
- Output: customer-facing answers
- Validated by automated tests
- Lives in production indefinitely

**AI Consultant** (Week 1 — segmentation analysis):
- One-time strategic deliverable
- Conversational interface (Claude.ai chat)
- Iterative prompt refinement
- Output: internal business document
- Validated by human business judgment
- Used once, then archived (or version-controlled)

Both patterns have their place. Knowing which to apply when is itself a senior skill in AI-augmented work.

---

*This analysis was generated using Claude Opus 4.7 as a strategic AI consultant. The prompt is preserved for reproducibility. Numbers are professional estimates and should be validated with transaction data before acting on substantial campaign budgets.*
