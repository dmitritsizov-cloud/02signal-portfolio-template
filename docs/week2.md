# Week 2 — Operations & Process Analysis

**Project:** UrbanStyle.ltd — sustainable fashion retail in Estonia
**Course:** 02Signal — AI Business Automation Program
**Author:** Dmitri Tsizov
**Tools:** Claude Opus 4.7 (AI Consultant pattern, continued from Week 1)

---

## Project Context

After identifying customer segments in Week 1 (KOMУ — to whom), Week 2 answers the next strategic question: **WHAT processes should UrbanStyle automate, and in what order?**

**The business reality:** UrbanStyle's four management-level employees (Anna, Marko, Liis, Kristi) collectively spend approximately **59 hours per week** on routine processes — roughly 1.5 full-time-equivalents of work that doesn't directly create customer value. Plus additional hours scattered across store managers and sales staff.

**The trap to avoid:** Automating what's *easy to automate* rather than what *matters most*. Among UrbanStyle's ~47 business processes, only 5-7 deserve serious automation investment. The other 40+ either happen too rarely, are too variable, are too judgment-intensive, or have negligible ROI.

**My role this week:** Use AI as a strategic consultant to (a) identify candidate processes, (b) evaluate them systematically using the Estonian TÄPNE framework, and (c) produce a prioritized list that connects back to the segmentation insights from Week 1.

---

## Methodology: The TÄPNE Framework

The 02Signal program teaches a five-criterion evaluation framework for assessing automation potential. Each criterion scores 1-5, summing to a maximum of 25.

| Letter | Estonian | Meaning | What it measures |
|--------|----------|---------|------------------|
| **T** | **T**oimingu sagedus | Frequency | How often does the process occur? More frequent = higher ROI |
| **Ä** | **Ä**ratuntavus | Recognizability | Can a system automatically detect when the process starts? |
| **P** | **P**rotsessi struktuur | Structure | Are the steps clear and rule-based, or chaotic? |
| **N** | **N**ähtav väärtus | Visible value | Is the time/money saving measurable and significant? |
| **E** | **E**ttearvatavus | Predictability | Are inputs stable, allowing reliable autonomous operation? |

### Score interpretation
- **20-25:** Ideal automation candidate
- **15-19:** Good candidate, needs preparation
- **10-14:** Medium — partial automation possible
- **5-9:** Poor candidate — improve the process before automating

---

## Process Identification: 10 Candidate Processes

Working with Claude as my AI consultant, I identified ten distinct business processes spanning all three categories (core, support, management). The list intentionally includes one negative example (recruitment) to demonstrate that not every process should be automated.

### Time accounting note
Claude flagged an important methodological correction: the 59 hours/week figure represents **management-level** time only. Several processes also consume sales staff and operations team hours that aren't included in that figure. Each process below distinguishes "management hours" (counts toward the 59) from "total organizational hours" where they differ — this matters for ROI calculation.

### The ten processes

1. **Daily and weekly sales reports** — Marko produces these manually for all departments
2. **Customer support inquiry handling** — distributed across e-shop manager and store sales staff
3. **Email marketing campaign creation** — Anna's main weekly output
4. **Social media content planning** — Anna + occasional freelancer
5. **Staff scheduling across 4 stores** — Liis with input from store managers
6. **Inventory tracking and replenishment** — Liis + store managers + supply chain
7. **Returns processing and classification** — store sales staff + e-shop manager
8. **Loyalty program (UrbanStyle Club) management** — Anna with admin support
9. **Board and council reporting** — Kristi (CEO), with data input from Marko
10. **Recruitment and interviewing** — Liis + Kristi (included as a deliberate counter-example)

Each process was documented with: type (core/support/management), responsible person, frequency, current time cost (split into management vs total org hours), description, inputs/outputs, and connection to Week 1 customer segments.

---

## TÄPNE Evaluation Results

After systematic scoring, the ten processes break into four clear tiers.

### Tier 1: Ideal automation candidates (20-25/25)

| # | Process | T | Ä | P | N | E | **Total** |
|---|---------|---|---|---|---|---|-----------|
| 1 | **Sales reports** (Marko) | 5 | 5 | 5 | 5 | 5 | **25/25** |
| 8 | **Loyalty program management** | 5 | 5 | 5 | 5 | 5 | **25/25** |
| 5 | **Staff scheduling** | 4 | 5 | 4 | 5 | 4 | **22/25** |
| 6 | **Inventory tracking** | 5 | 5 | 4 | 5 | 3 | **22/25** |
| 2 | **Customer support** | 5 | 4 | 3 | 5 | 3 | **20/25** |

### Tier 2: Good candidates needing preparation (15-19/25)

| # | Process | Total | Key prerequisite |
|---|---------|-------|------------------|
| 3 | **Email campaigns** | 19/25 | Clean segment data (Marko's first project must complete first) |
| 7 | **Returns processing** | 18/25 | Better to *prevent* returns first (size recommender for Trendi-Liisa segment) |

### Tier 3: Medium — partial automation (10-14/25)

| # | Process | Total | Why limited |
|---|---------|-------|-------------|
| 9 | **Board reporting** | 14/25 | Data aggregation is automatable; narrative and prioritization are not |
| 4 | **Social media content** | 13/25 | AI-generated content damages brand for Eco-Kadri segment |

### Tier 4: Poor candidate (deliberate counter-example)

| # | Process | Total | Why included |
|---|---------|-------|--------------|
| 10 | **Recruitment** | 7/25 | Human judgment process — listed to demonstrate the framework's discriminating power |

---

## Strategic Insights

### Two processes scored a perfect 25/25

**Sales reports (#1)** and **Loyalty program management (#8)** both maxed out the framework. Every week these run manually, UrbanStyle is leaving measurable money on the table.

For sales reports: Marko spends 8 hours/week × 52 weeks = **416 hours/year** on extraction and assembly that a Looker, Power BI, or Metabase dashboard would do automatically. Roughly **€10,400/year** in salary cost — but the bigger value is **what Marko could do with that freed time**: deep segment analysis, demand forecasting, pricing experiments. Currently he can't because he's busy producing reports.

For loyalty program: this is the system that protects the **Klubi-Maret segment** (15% of customers, 35% of revenue from Week 1). Every 1% reduction in Maret's churn rate = approximately **€14,000/year** in protected revenue. Standard tools (Klaviyo, Mailchimp) do this out of the box.

### Critical distinction: AI vs. ordinary automation

This was the consultant-level insight that emerged from the analysis. Several high-scoring processes are **not AI projects**:

| Process | Type of solution | Why this matters |
|---------|-----------------|------------------|
| Sales reports (#1) | Business Intelligence dashboard | Don't waste AI budget on this |
| Staff scheduling (#5) | Rota/scheduling software (Planday, Quinyx) | ~€150/month, ROI < 2 months |
| Inventory tracking (#6) | ERP / inventory management | Standard retail software |
| Customer support (#2) | **AI chatbot** ✅ | This is genuinely an AI use case |
| Loyalty program (#8) | Email automation + AI personalization | Hybrid |

**Why this distinction matters for Kristi (CEO):** AI investment should go to processes where AI provides a real advantage over standard software. Spending AI budget on staff scheduling would be misallocation — Planday already solves it.

### Two-dimensional ROI thinking

The most important strategic point Claude raised: looking only at **time savings** ranks #1 (Marko's 8 hours) at the top. But looking at **revenue protection**, #8 (Loyalty program / Klubi-Maret churn prevention) is an order of magnitude larger.

A good business case considers both dimensions:
- **Cost savings:** how many hours/euros does automation free up?
- **Revenue impact:** how much revenue does this protect or generate?

Most automation analysis only addresses the first. For UrbanStyle, the second is much larger.

### Prerequisites that block direct automation

For three high-scoring processes, automation cannot start immediately:

1. **Customer support (#2):** Needs Russian-language localization first. A chatbot that only speaks Estonian/English makes the Narva-Olga segment problem **worse**, not better. Localization → then automation.

2. **Email campaigns (#3):** Needs clean segmented customer data first. Marko's RFM analysis is the gating dependency. Otherwise you get "automated chaos faster."

3. **Returns processing (#7):** Bigger win is *preventing* returns (size recommender for Trendi-Liisa's 25% return rate) than processing them faster. Classic "simplify before automating" lesson.

---

## Connection to Week 1 (Segments)

The TÄPNE rankings make sense only when read alongside Week 1's segmentation:

| Process | Primary segment impact |
|---------|------------------------|
| **Loyalty program (#8 — 25/25)** | Klubi-Maret — defends 35% of revenue |
| **Customer support (#2 — 20/25)** | Trendi-Liisa (returns), Narva-Olga (language), Ühekordne-Andres (first impression) |
| **Email campaigns (#3 — 19/25)** | All segments — but especially winback for Ühekordne-Andres |
| **Returns (#7 — 18/25)** | Trendi-Liisa drives disproportionate volume |
| **Inventory (#6 — 22/25)** | Klubi-Maret — out-of-stock = loyalty killer |

**This is the bridge between Week 1 and Week 2:** segments tell you *who matters*, processes tell you *what matters*, and ROI calculation (next iteration) tells you *what to do first*.

---

## Connection to Week 4 (FAQ Bot — Already Built)

Customer support (#2) scored 20/25 — the highest-scoring process that is **genuinely an AI problem** rather than a standard software problem. This validates the choice of building the FAQ bot in Week 4 retroactively: I picked a process that scored in Tier 1 of TÄPNE, and the highest-ranked among genuinely-AI candidates.

What Week 2 reveals about the Week 4 bot:
- It addresses the largest **organizational** time cost (15-25 hours/week distributed across e-shop manager + store staff)
- It impacts three of five customer segments directly
- Its biggest **gap** is exactly the Narva-Olga prerequisite — the bot doesn't speak Russian, which means it doesn't help the segment that needs help most

A v2 of the bot should add Russian language support before any other improvement. This insight came from process analysis, not from looking at the bot itself.

---

## What I Learned

### What was new

**The TÄPNE framework gives systematic discipline to a subjective question.** Before this week, "should we automate this?" was an opinion-driven discussion. After TÄPNE, it's a 1-5 score across five criteria, comparable across processes. The framework doesn't make the decision for you — but it forces honest evaluation.

**The distinction between AI and ordinary automation matters more than I expected.** It would have been easy to label everything "AI" — that's the trendy term. But staff scheduling and inventory tracking are solved problems with standard software. Mislabeling them costs budget and time.

### What was hard

**Resisting the temptation to give everything high scores.** When I asked Claude to evaluate the processes, the quality check was: are some scores genuinely low? If everything ranked 22-25, the framework would be useless. Claude was honest — recruitment got 7/25, social media 13/25 — and that honesty is what makes the rest of the rankings credible.

**Distinguishing between cost savings and revenue impact.** My instinct was to rank by hours saved. But protecting €1.4M of revenue (the Klubi-Maret segment) by reducing churn is much larger than saving Marko's 8 hours/week. Both are real ROI, but they answer different questions and need separate analysis.

### What clicked

**Process analysis is segmentation analysis from a different angle.** Week 1 looked at customers. Week 2 looked at the work UrbanStyle does for those customers. The same insights re-emerge — Klubi-Maret matters most, Narva needs language work first, Trendi-Liisa drives operational pain — but viewed through the lens of where the *work* happens. Both views are needed; neither alone is enough.

**The most valuable consultant move is saying "don't automate this."** Including recruitment as a deliberate counter-example, flagging social media as a brand risk for Eco-Kadri, marking staff scheduling as not-an-AI-project — these are negative results that prevent expensive mistakes. A consultant who only proposes new things is dangerous.

---

## Limitations & Future Iterations

This analysis explicitly does **not** include:

1. **Detailed process maps.** I produced a top-level list with descriptions. The next iteration should map step-by-step flows (inputs, decisions, outputs, error states) for the top 3 processes — that's process mapping at the detail level Liis would need to actually implement automation.

2. **Quantitative ROI per process.** Estimated hours and euros are present, but a full ROI model with implementation cost, maintenance cost, and risk-adjusted payback period is the next step. Top-5 processes deserve this rigor before budget allocation.

3. **Implementation sequencing.** The TÄPNE rankings tell you *which* to prioritize; sequencing tells you *when* and *in what order*. This depends on prerequisites (e.g., customer support needs localization first), team capacity, and dependencies between projects.

4. **Validation against actual time tracking.** All hour estimates are reported by team members or estimated. A two-week time-tracking study would refine these numbers materially.

### Planned iterations
- **v2:** Detailed process maps for the top 3 processes (Loyalty program, Sales reports, Customer support)
- **v3:** Full ROI model with implementation costs and payback periods
- **v4:** Implementation roadmap with quarterly milestones and dependencies

---

## Tools Used

- **Claude Opus 4.7** (claude.ai) — same conversation thread continued from Week 1, allowing context-aware analysis that connected processes back to segments
- **TÄPNE framework** — provided by the 02Signal program
- **Source data:** UrbanStyle business profile, team time estimates, store operations data

**Cost:** €0 (Claude Max plan, course-provided)
**Time investment:** ~75 minutes total (process identification + TÄPNE evaluation)

---

## Methodology Note: Continuing the AI Consultant Pattern

Week 1 introduced the AI Consultant pattern. Week 2 demonstrated its compounding value: by continuing the same Claude conversation, the AI maintained context about UrbanStyle's segments, team, and constraints. Each new analysis built on the previous one rather than starting from scratch.

This is a non-obvious workflow advantage. In production AI Pipeline systems (like the Week 4 FAQ bot), each query is independent — there's no memory across customer interactions. In AI Consultant workflows, the conversation **is** the memory. Insights from segmentation flow into process analysis flow into ROI flow into roadmap, with the AI tracking implications across all of them.

This suggests a portfolio-level lesson: long-running consulting conversations with AI may produce better strategic output than discrete one-off prompts, because the AI develops deeper context over the conversation.

---

*This analysis was generated using Claude Opus 4.7 as a strategic AI consultant, continuing the conversation thread from Week 1's segmentation work. TÄPNE scores are professional estimates; ROI numbers should be validated with actual time-tracking and revenue data before significant budget allocation.*
