# The Narva Analysis — What 5 Days of Data Said About the Riga Expansion

**Date of analysis:** May 2026
**Analyst:** Dmitri Tsizov (via n8n N5 Andmeraport workflow)
**Audience:** Kristi (CEO, UrbanStyle.ltd) and the board, ahead of the Riga expansion decision
**Status:** Signal, not proof — recommended action is investigation, not conclusion

---

## TL;DR

> Narva produces 5.96% of total UrbanStyle revenue against a 12% KPI target. The shortfall is concentrated in one product category, one campaign, and one supply pattern — all four high stock-risk warnings in the dataset come from the same combination: **Narva × women's clothing × Spring Wardrobe campaign**. The same campaign performs well in every other store. This is not a demand problem; it is a supply-and-fit problem in the store closest in operational profile to UrbanStyle's planned Riga expansion. The board should not finance Riga until Narva's supply chain has been audited and the root cause separated from coincidence.

This report does not recommend cancelling Riga. It recommends spending three weeks of director time understanding Narva before committing capital to a market that looks structurally identical.

---

## Why Narva matters for the Riga decision

UrbanStyle currently operates four physical stores: Tallinn, Tartu, Pärnu, Narva — plus the online channel. Of the four, Narva is the closest analog to what Riga would become:

- Second-language Estonian/Russian customer base, similar to Latvia's Russian-speaking demographic
- Smaller catchment area than the two major cities
- Mid-cost lease (between Tartu and Pärnu)
- Run by a regional manager with limited central-warehouse coordination

If Narva is the model, its performance is the most relevant data point UrbanStyle has for forecasting Riga. The board's expansion deck assumes Riga reaches **12% of company revenue within 18 months**, modeled on the average of Tartu (19.04%) and Pärnu (11.57%). Narva's actual share is half that average — and the deck does not currently address the gap.

---

## The data

Five business days of sales (May 1-5, 2026), 25 rows in total, broken down by store × day × dominant category. This is a small window — see the "Limitations" section below — but the pattern is concentrated enough that we can act on it as a hypothesis worth investigating immediately.

### Revenue by store

| Store | Revenue (EUR) | Share | KPI target | Status |
|---|---|---|---|---|
| Tallinn | 5 780 | 34.29% | n/a (anchor store) | OK |
| Online | 4 910 | 29.13% | 25-30% | OK |
| Tartu | 3 210 | 19.04% | 18-22% | OK |
| Pärnu | 1 950 | 11.57% | 10-15% | OK |
| **Narva** | **1 005** | **5.96%** | **12%** | **CRITICAL** |
| **Total** | **16 855** | 100% | | |

Narva is roughly half of the next-smallest store (Pärnu) on a smaller-but-not-half catchment population. The KPI gap is 6.04 percentage points — equivalent to **~1 020 EUR per 5-day window**, or scaled out, roughly **53 000 EUR of annual revenue not appearing where the model predicted**.

### The stock-risk concentration

The dataset has four rows flagged `stock_risk = high`. These are not distributed across stores or categories:

| Date | Store | Category | Campaign | Stock note |
|---|---|---|---|---|
| 2026-05-01 | Narva | naiste riided | Kevadine garderoob | kleitide laoseis madal |
| 2026-05-02 | Narva | naiste riided | Kevadine garderoob | kliendid küsivad puuduvaid suurusi |
| 2026-05-04 | Narva | naiste riided | Kevadine garderoob | laoseisu risk kordub |
| 2026-05-05 | Narva | naiste riided | Kevadine garderoob | korduv risk |

**Four for four** in one cell of the data matrix. The KPI says a healthy store should see at most 3 high-risk warnings per week. Narva alone produced 4 in 5 days, all in the same product category, all under the same campaign, and the note field shows customers explicitly asking for missing sizes — not browsing without intent, but trying to buy and failing.

### The control case

The same Kevadine garderoob campaign ran in every store during the same period. Performance elsewhere:

| Store | Campaign rows | Total revenue from campaign | High stock-risk |
|---|---|---|---|
| Tallinn | 2 | 2 370 | 0 |
| Tartu | 2 | 1 270 | 0 |
| Pärnu | 2 | 810 | 0 |
| Online | 2 | 2 080 | 0 |
| Narva | 4 | 810 | 4 |

The campaign sells. It just doesn't sell in Narva — and the data on why is explicit in the notes column. This is not a marketing problem.

---

## The interpretation: supply, not demand

The single most important distinction in this analysis is between two superficially similar explanations:

**Explanation A — "Narva customers don't want what we're selling."**
This would predict: low order count, low conversion, complaints about style or pricing in the note field, marketing campaign underperformance across all categories.

**Explanation B — "Narva customers want what we're selling but we can't deliver it."**
This would predict: high stock-risk flags concentrated in popular items, note-field text about missing sizes or unavailable products, the rest of the catalog selling at normal rates.

The data fits Explanation B. Narva's accessories category (`aksessuaarid`, May 3) had a normal day with no stock issues. The men's-clothing category had a normal day on May 3 as well. The store's footfall is producing demand; the warehouse is producing scarcity in the one category that's currently being campaigned.

This matters because the two explanations imply opposite decisions:

- **If demand is broken in Narva**, then Riga (similar demographic profile) is high-risk and the expansion should be reconsidered.
- **If supply is broken in Narva**, then Riga is low-risk demographically but high-risk operationally — and the right intervention is fixing the central-warehouse-to-regional-store pipeline before adding a fifth regional store to it.

These are radically different conversations with the board.

---

## What Marko has to verify before this becomes a recommendation

The `human_check` field in the automated report is not a formality. Five days is not enough to make this a conclusion. Before the next board meeting, Marko (product manager) should confirm:

1. **Are the four high-risk notes from Liis (warehouse) or from the store manager?** If they're store-side ("kliendid küsivad") rather than warehouse-side ("laoseis madal"), the supply chain may be fine and the SKU mix for Narva may be wrong from the start.
2. **Does the 5-day window cover the full campaign period?** If Kevadine garderoob ran for 14 days and we only see 5, the late-campaign data may show recovery as restocking arrived. This needs the full campaign timeline.
3. **Were the missing sizes the same SKUs across all four days?** If yes (e.g. EU 38-40 in two specific dress models), this is a SKU-level supply forecasting issue. If no, it's a broader replenishment-cadence issue.
4. **What does the Narva sales register show for the days BEFORE the campaign launched?** The 5.96% share may pre-exist the campaign — in which case the campaign is masking a chronic underperformance, not causing it.

If Marko comes back with all four answers and the supply-side story holds, the recommendation to the board is clear: pause Riga capital decisions for one quarter, run a Narva supply audit, decide on Riga with that data instead of guesswork.

If the supply story falls apart under scrutiny, the recommendation flips: Narva is a demand problem, Riga (with its similar demographic) inherits the same risk, and the deck needs new revenue assumptions.

---

## What this analysis explicitly does not claim

This report exists because the AI agent in the N5 workflow is constrained to **only describe patterns it sees in the aggregated data**. The aggregation is deterministic — the numbers above came from a JavaScript function, not from the AI. The AI's contribution is the prose around those numbers, with explicit instructions not to invent figures and to flag what 5 days of data cannot prove.

Things the AI was instructed not to claim, and which therefore are not in the report Kristi receives in Telegram:

- **Causation.** Correlation between Narva × Kevadine garderoob × stock_risk=high is strong (4/4), but this is not proof of mechanism. A larger sample with controls for category mix and campaign timing is required before a causal claim survives audit.
- **Predictions about Riga.** Narva is the closest analog UrbanStyle has, but a single analog with N=1 cannot be projected onto a market with different language laws, store-network density, and supplier logistics.
- **Recommended capital amounts.** The 53 000 EUR annual gap is arithmetic on observed data; it is not a forecast and it should not appear in a budget without a longer measurement window.

This restraint is part of the architecture, not a personal modesty. The Code node that produced the numbers cannot lie. The AI that wrote the prose was prevented from going beyond the numbers. Together they produce a report that survives the question *"how do you know?"* — because every number has an auditable computation behind it, and every claim explicitly cites or limits itself to the data shown.

---

## Recommended next steps

In priority order:

### Immediate (this week)

1. **Marko**: confirm the four `human_check` questions above with Liis and the Narva store manager. Two-hour task.
2. **Marko**: pull a 30-day extract from the same data pipeline, not 5 days. The N5 workflow can do this with one Sheets formula change. Confirms or breaks the pattern.

### Short-term (this month)

3. **If supply story confirms**: commission a one-week supply-chain audit specifically for the Narva delivery pipeline. Cost: ~3 000 EUR consulting fee or 20 hours of internal time. Outcome: a decision on whether Riga gets opened on the existing supply backbone, on a new backbone, or paused.
4. **If demand story confirms**: redirect Marketing's Narva-focused budget to a customer-research sprint (interviews, basket analysis, churn signals). Outcome: redesigned Narva (and likely Riga) value proposition.

### Standing process

5. **Activate the daily Schedule trigger in the N5 workflow** so every morning at 9:00 the previous day's data lands in Telegram automatically. The Raportid tab in Google Sheets accumulates into a comparable time series. After 3-4 weeks, anomaly detection becomes possible: this week's Narva pattern vs last week's, did the stock-risk warnings precede the actual stock-out, did the supply-audit recommendation get acted on.
6. **At quarter-end**: re-aggregate Raportid. If the Narva pattern persists, the Riga decision becomes data-driven instead of analog-driven.

---

## Closing thought

The first report produced by this workflow recommended a 3 000 EUR audit before approving a 50 000+ EUR expansion decision. That is the entire return on building the system — not the AI prose, not the Telegram delivery, not the Google Sheets log. The return is that the discussion in the board room next month will be about supply chain audits, not about marketing-deck assumptions.

This is the form data analysis should always take in a small business: cheap enough to run every day, transparent enough to challenge any number in the report, and structured enough that the conversation moves from "what do we think?" to "what does the data require us to investigate?"

Five days of data. One workflow run. One auditable finding. That is the unit of work.

---

*Methodology: see [Setup & deployment guide](./week5-hybrid-setup.md). Workflow source: [N5 Andmeraport Hybrid v1.0](../workflows/week5-andmeraport-hybrid.json). Data: [SisendLogi sample](../data/week5-sheets-template.csv).*
