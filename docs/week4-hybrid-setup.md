# Week 4 (Part 3) — Sisuloome Hybrid: Setup & Demo Guide

This document covers everything needed to import, configure, test, and demo the **Sisuloome Hybrid v1.1** workflow. The workflow file lives at [`workflows/week4-sisuloome-hybrid.json`](../workflows/week4-sisuloome-hybrid.json).

## What this workflow does

One workflow, three input shapes, five output channels, full feedback loop:

```
Form Trigger ────┐
Telegram Trigger ─┼─→ Normalize → N4 Data Lookup → AI Agent → Multi-channel Formatter → Telegram Send
Schedule (9:00) ─┘
```

A marketer fills a brief through any of three channels. The workflow enriches the brief with UrbanStyle's authorized claims, segment tone, and inventory warnings, then asks Groq's `llama-3.3-70b-versatile` to generate five channel-specific drafts at once: Telegram, Instagram (with hashtags), Facebook (with CTA), Email (subject + body), and an e-shop product description. All five arrive in Telegram as one structured message, ready for human review.

If the marketer wants edits, they reply in the same Telegram chat with `PARANDA: <feedback>`. The bot loads the previous draft from n8n's static data, applies the feedback as a revision instruction, and returns a corrected version while preserving the brand voice.

## Setup — five steps

### 1. Import the workflow

In n8n: **Workflows → Import from File → select `week4-sisuloome-hybrid.json`**. The canvas appears with 13 nodes and 4 sticky notes explaining each section.

### 2. Bind credentials (this is the step that catches everyone)

An imported `.json` file remembers credential *names*, not the credentials themselves. Every node that talks to an external service needs its credential dropdown re-selected manually, even though the field already shows the right name.

Three nodes need attention:

| Node | Credential to bind |
|---|---|
| `Telegram Trigger - PARANDA või /reklaam` | Your Telegram bot credential |
| `Telegram - saada draft kinnitamiseks` | Same Telegram bot credential |
| `Groq Chat Model` | Your Groq API credential |

If a node shows "Node does not have any credentials set" while the dropdown still displays a name, that's the import-binding bug. Re-select from the dropdown to fix it.

### 3. Replace the placeholder chat ID

Open the Code node `Normaliseeri sisend (3 triggerit → 1 vorm)`. Two lines contain the placeholder string `'CHAT_ID_HERE'` — one in the Form Trigger branch, one in the Schedule branch. Replace both with your personal Telegram chat ID (an integer).

The Telegram trigger branch does NOT need a hardcoded ID — it reads `chat.id` from the incoming message automatically.

How to find your chat ID if you don't know it: open Telegram, send `/start` to your bot, then visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` in any browser. Look for `"from": { "id": <number>, "is_bot": false }` — that number is yours. The `is_bot: true` field belongs to the bot itself; never use that one as a chat_id, the API will respond with `Forbidden: bot can't send messages to bot`.

### 4. Set timezone

Open **Workflow Settings** (three dots menu, top-right of the canvas) → set **Timezone** to `Europe/Tallinn`. Without this, the Schedule trigger runs in n8n's default timezone (America/New_York), so "9:00 each day" actually fires at 16:00 Estonian time.

While you're there, set **Estimated time saved** to a Fixed value of `75 minutes per production execution`. n8n will accumulate this across all runs and surface it in the dashboard, giving you a measured ROI metric instead of a hand-waved one.

### 5. Publish

Click the **Publish** toggle in the top-right of the canvas (n8n's hosted edition replaces "Active/Inactive" with "Publish/Unpublish"). The status indicator turns green and reads "Published". This is the step that registers the Telegram webhook with Telegram's API — without it, Telegram Trigger never fires.

If your n8n tier limits active workflows (`0 / 1` indicator), unpublish another workflow first.

## Testing — four scenarios

### Test 1 — Form path (Shu level, 70 % of grade)

Click the Form Trigger node, copy its production URL, open it in a new tab. Fill the form:

- Kampaania nimi: `Kevadine garderoob`
- Kanal: `Kõik kanalid`
- Tootekategooria: `naiste riided`
- Sihtrühm: `SEG-01 Tallinn gold kliendid`
- Toon: `premium`
- Põhisõnum: `ajatu kevadine garderoob`

Submit. Within 10 seconds, Telegram should receive a structured message with all five channel drafts, the matched segment and campaign, the three selected products with prices, and a quality-check checklist.

### Test 2 — Data lookup (Ha level, 100 % of grade)

Repeat Test 1 but add `US-P-101` in the optional product field. The output must specifically reference Linen Flow kleit at 89 EUR, not invent a different product or price. This proves the Code node lookup is doing its job.

For the negative case: try a brief that would otherwise pull `US-P-202 Merino light kampsun`. The inventory warning ("ära luba laialdast saadavust") should appear in the AI's input context and prevent the AI from claiming wide availability for that product.

### Test 3 — PARANDA feedback loop (Ha+ level, 120 % of grade)

After Test 1 succeeds, open Telegram and send to the same bot:

```
PARANDA: tee Telegrami tekst lühemaks ja eemalda emoji
```

Within 5 seconds, a revised draft arrives. The header reads `✏️ PARANDATUD VERSIOON` and the Telegram text section is shorter and emoji-free, while the brand voice and product references stay correct. The previous draft is loaded from n8n's `staticData.lastDraftByChat[chat_id]` so the AI revises rather than starting over.

### Test 4 — Quick command (bonus from N3)

Send to the bot:

```
/reklaam Linen Flow kleit
```

The workflow generates a draft for the named product without going through the form. This is borrowed from the N3 Reklaamimootor pattern and serves as a fast lane for ad-hoc requests.

## Demo script — three minutes

**0:00 – 0:15 — Frame the problem.**
*"Anna Mets needs 20 content units per week and currently produces 5. Manually drafting one campaign across five channels takes ~80 minutes. Our workflow turns that into 6 minutes per campaign with brand voice protection."*

**0:15 – 0:55 — Show the form path.**
Open the canvas → click the Form URL → fill a brief for Tallinn gold × Kevadine garderoob → switch to Telegram → read out one channel's output. *"All five channel versions arrived in 10 seconds, generated from the same brief."*

**0:55 – 1:35 — Show the data layer.**
Open the Code node `Andmete lookup`. *"This is what makes the AI safe. Every brief gets enriched with the campaign's `allowed_claims` and `do_not_claim` rules, the segment's tone hint, and the top three products with inventory status. The AI cannot promise wide availability for a product with 9 units in stock — the constraint is in its input, not a hopeful instruction."*

**1:35 – 2:30 — Show the feedback loop.**
In Telegram, type `PARANDA: tee premium-tooniga, eemalda emoji`. Wait for the revised draft. *"Human-in-the-loop is structurally fast when AI does the typing and the human only judges. This took 30 seconds. Without the workflow, that revision is another 15 minutes of typing."*

**2:30 – 3:00 — Wrap with ROI and what's next.**
*"n8n tracks 75 minutes saved per execution automatically. At Anna's target of 20 units per week that's ~25 hours of marketing capacity returned every week. Week 5 adds Google Sheets logging and a weekly performance report — the same workflow stays in place, we add a logger node to the Telegram send."*

## Backup plans for the demo

| If this breaks | Do this |
|---|---|
| AI returns malformed JSON | The formatter node catches the error and sends "⚠️ Viga AI väljundis" to Telegram. Show the canvas execution view instead. |
| Telegram credential fails | Show the n8n execution output panel — the AI generated drafts are visible there even without delivery. |
| Groq is slow or rate-limited | Switch the Groq Chat Model node from `llama-3.3-70b-versatile` to `llama-3.1-8b-instant` (faster, slightly less polished). |
| Schedule trigger fires during demo | Deactivate just that one node before starting (right-click → Disable). |

## What's in the workflow file

The exported `.json` is fully self-contained:

- 3 trigger nodes (Form, Telegram, Schedule)
- 1 Normalize Code node (~80 lines of JS) — converts all three input shapes into a unified format
- 1 Data Lookup Code node (~120 lines of JS + embedded UrbanStyle data) — products, segments, promotions, inventory all hardcoded for portability
- 1 AI Agent node (Basic LLM Chain with system + user prompts)
- 1 Groq Chat Model sub-node
- 1 Formatter Code node — parses AI's JSON, builds the Telegram-friendly multi-section message, stores draft in static data for later PARANDA loop
- 1 Telegram Send node — final output
- 4 sticky notes documenting the architecture for whoever opens the file later

UrbanStyle data is embedded in the Lookup node rather than read from Google Sheets so the workflow runs without any external dependencies. Week 5 will replace those embedded arrays with Google Sheets read operations — the rest of the workflow stays unchanged.

## File locations in the repo

- Workflow: [`workflows/week4-sisuloome-hybrid.json`](../workflows/week4-sisuloome-hybrid.json)
- Debug log (4 production issues + diagnostics): [`docs/week4-hybrid-debug-log.md`](week4-hybrid-debug-log.md)
- Screenshot: [`docs/screenshots/telegram-output-hybrid.png`](screenshots/telegram-output-hybrid.png)
- Brand voice (shared with v1.0): [`docs/week4-brand-voice-et.md`](week4-brand-voice-et.md)
