# Week 5 — Andmeraport Hybrid v1.0 — Setup & Deployment Guide

**What this builds:** an n8n workflow that reads 25 rows of UrbanStyle sales data from Google Sheets, aggregates it deterministically (Narva share, stock-risk count, KPI achievement), passes the aggregates to a Groq AI agent that writes a 5-field executive report, then **simultaneously** logs the report as a new row in Google Sheets AND sends a formatted Markdown message to Telegram for review.

**Total time:** ~30 minutes if everything is new, ~15 minutes if you already have a working Week 4 Hybrid v1.1 to fork.

**Architecture (8 nodes):**

```
Form Trigger ────┐                                                                                       ┌─→ Sheets Write (Raportid)
Telegram Trigger ─┼─→ Normalize → Sheets Read (SisendLogi) → Code (Agregeeri müük) → AI Agent (Groq) ──┤
Schedule ────────┘                                                                                       └─→ Telegram Send
```

---

## Prerequisites

Before you start, you need:

- A working n8n instance (self-hosted or cloud)
- A Telegram bot already created via @BotFather, with the bot token in your n8n credentials
- A Groq API key (free tier at console.groq.com is enough)
- A Google account with permission to create Google Cloud projects
- The workflow file `week5-andmeraport-hybrid.json` and the sample data `week5-sheets-template.csv` from this repository

If you completed Week 4 Part 3 (Sisuloome Hybrid v1.1), most of the credentials already exist — you only need to add Google Sheets OAuth. Skip directly to Step 3.

---

## Step 1 — Google Sheets template (5 minutes)

### 1.1 Create the spreadsheet

In your Google Drive, create a new spreadsheet named exactly:

```
02Signal N5 raportilogi
```

Rename the first tab from `Sheet1` to:

```
SisendLogi
```

### 1.2 Import the sample data

Open `data/week5-sheets-template.csv` from this repository. It contains 25 rows of sample sales data plus the headers your workflow expects.

Copy rows 3-27 (the header row and the 25 data rows — skip the comment lines starting with `#`) and paste them into cell `A1` of your `SisendLogi` tab.

**Gotcha:** Google Sheets will paste the entire CSV as text into a single column. To split into proper columns:

1. Select the range `A1:A26` — **not the entire row numbers 1:26**. The "Split text to columns" menu option is greyed out unless you select cells, not row labels.
2. Menu: `Data → Split text to columns`
3. Separator: `Comma`

After the split, you should see 10 columns: date, store, channel, category, revenue_eur, orders, avg_order_eur, campaign, stock_risk, note.

### 1.3 Verify the data shape

Run these formulas in any free cells to verify the import worked:

| Formula | Expected |
|---|---|
| `=SUM(E2:E26)` | **16855** (total revenue) |
| `=COUNTA(A2:A26)` | **25** (rows) |
| `=COUNTIF(I2:I26,"high")` | **4** (high stock-risk rows) |
| `=COUNTIF(B2:B26,"Narva")` | **5** (Narva rows) |

If any of these don't match, the column types are wrong — most likely revenue is stored as text. Re-check that Split text to columns ran with `Comma` as separator.

### 1.4 Create the Raportid tab

Add a second sheet (bottom-left `+`) named exactly:

```
Raportid
```

In cell `A1`, paste this single header row (11 columns):

```
created_at,report_id,report_type,period,key_metric,finding,recommendation,human_check,source,workflow_level,data_context
```

Run `Data → Split text to columns` again with comma separator. Leave the rest of the sheet empty — the workflow will append rows here.

---

## Step 2 — Google Cloud OAuth (15 minutes, biggest gotcha zone)

n8n self-hosted requires a Google Cloud OAuth Client ID before any Sheets node can authenticate. This step has multiple invisible failure modes.

### 2.1 Create or select a project

Go to [console.cloud.google.com](https://console.cloud.google.com). If you don't have a project yet, create one — name it anything (`n8n-02signal` works).

### 2.2 Enable both APIs

Use the search bar at the top of the console:

1. Search `Google Sheets API` → click → `Enable`
2. Search `Google Drive API` → click → `Enable`

Both are required. n8n uses Drive API to find spreadsheets by name and Sheets API to read/write cells.

### 2.3 Configure the OAuth consent screen (`Google Auth Platform`)

In recent versions of Google Cloud, the OAuth consent screen has been renamed to **Google Auth Platform**. Navigate there from the left menu.

If you see "Google Auth Platform not configured yet":

1. Click `Get started`
2. **App information** — App name: `n8n 02signal`, user support email: your own email
3. **Audience** — select **External** (not Internal, unless you have Google Workspace)
4. **Contact information** — your email
5. **Finish** — agree to the User Data Policy and click `Create`

### 2.4 Add yourself as a Test User — DO NOT SKIP

This is the single biggest failure mode. While the app is in testing mode, only emails on the test users list can complete the OAuth flow. If you skip this, you'll see `Access blocked` later with no clear signal of what's wrong.

1. Left menu → `Audience`
2. Scroll to `Test users`
3. Click `+ Add users`
4. Enter the **same Google email** that owns the `02Signal N5 raportilogi` spreadsheet
5. Save

### 2.5 Create the OAuth Client ID

1. Left menu → `Clients`
2. Click `+ Create client`
3. Application type: **Web application**
4. Name: `n8n 02signal client`
5. **Authorized redirect URIs** → `+ Add URI` → paste your n8n callback URL exactly:

```
https://YOUR-N8N-DOMAIN.com/rest/oauth2-credential/callback
```

Replace `YOUR-N8N-DOMAIN.com` with your actual n8n hostname. The path is fixed: `/rest/oauth2-credential/callback`.

6. Click `Create`

A modal appears with **Client ID** and **Client Secret**. Copy both to a notepad — you'll need them in Step 4.

⚠️ **Security note:** the Client Secret is a credential. Do not commit it to GitHub, do not paste it in chats. Store it in a password manager.

---

## Step 3 — Import the n8n workflow (5 minutes)

In n8n:

1. Top-right `+` → `Import from File`
2. Select `workflows/week5-andmeraport-hybrid.json` from this repository
3. n8n creates the workflow with all 8 nodes connected

The workflow opens with **broken credentials** — every node that needs a credential shows the old name from the original export but isn't actually bound to anything in your account. This is expected; we'll fix it next.

---

## Step 4 — Configure credentials (10 minutes)

You need three credentials connected: Google Sheets, Groq, Telegram. Each must be configured separately even though the workflow file remembers their old names.

### 4.1 Google Sheets credential

1. Open the **Get row(s) in sheet** node (double-click)
2. In the `Credential` dropdown, click `+ Create new credential`
3. Type: `Google Sheets OAuth2 API`
4. Paste your `Client ID` and `Client Secret` from Step 2.5
5. Click `Sign in with Google`
6. **Choose the same Google account** that owns the spreadsheet (and that you added as a test user)
7. On the "Google hasn't verified this app" screen: click `Advanced` → `Go to n8n 02signal (unsafe)` — this is your own app, "unsafe" just means it hasn't been Google-verified for public use
8. On the consent screen, check `Select all` (or at minimum the Google Sheets scope) → `Continue`
9. You should see the green "Account connected" banner in n8n

The same credential now also works in the **Append row in sheet** node — re-select it from the dropdown rather than recreating.

### 4.2 Groq credential

If you completed Week 4, this already exists — open the `Groq Chat Model` node and re-select your existing Groq credential from the dropdown.

If not: create a new `Groq` credential with your API key from console.groq.com. Model: `llama-3.3-70b-versatile` is recommended (the workflow JSON specifies this).

### 4.3 Telegram credentials

Two Telegram nodes need credentials:

- **Telegram Trigger - PARANDA või /reklaam** — your bot's API token
- **Telegram - saada draft kinnitamiseks** — same bot credential

In each node, open the credential dropdown and select your existing UrbanStyle FAQ Bot credential. If you don't have one yet, create it with the bot token from @BotFather.

### 4.4 Verify Chat ID

Open the **Telegram - saada draft kinnitamiseks** node. The `Chat ID` field must be **your personal Telegram user ID**, not the bot's ID. If you put the bot's ID by accident, Telegram returns `Forbidden: bot can't send messages to bot`.

To find your user ID: in Telegram, message [@userinfobot](https://t.me/userinfobot). The first number it returns is your chat ID.

---

## Step 5 — Test the Narva scenario (5 minutes)

### 5.1 Set the spreadsheet selectors

Open the **Get row(s) in sheet** node:

- `Document` → click `Choose...` → select `02Signal N5 raportilogi`
- `Sheet` → click `Choose...` → select `SisendLogi`

Open the **Append row in sheet** node (the second Sheets node, between AI Agent and Telegram):

- `Document` → `02Signal N5 raportilogi`
- `Sheet` → **Raportid** (not SisendLogi — different tab)
- `Mapping Column Mode` → `Map Each Column Manually`

### 5.2 Run the workflow

In n8n, click the orange `Execute workflow` button at the bottom. n8n opens the Form Trigger test link in a new tab.

Fill the form with any values (the form is inherited from Week 4 and not yet adapted for N5; all values are accepted):

| Field | Value |
|---|---|
| Kampaania nimi | `N5 test` |
| Kanal | any (e.g. Telegram) |
| Tootekategooria | any (e.g. naiste riided) |
| Sihtrühm | any |
| Toon | any |
| Põhisõnum | `test` |

Submit. Wait 15-30 seconds.

### 5.3 Verify the results

**Telegram:** open your UrbanStyle FAQ bot chat. A message should arrive with this exact shape:

```
📊 N5 UrbanStyle andmeraport

📅 Periood: 2026-05-01 kuni 2026-05-05 (5 päeva, 25 rida)

💰 Põhinumbrid:
• Käive: 16855 €
• Tellimused: 283
• Päevakäive: 3371 € (KPI siht 3500 €, täidetud 96.3%)
• Narva osakaal: 5.96% (siht 12%, staatus: CRITICAL)
• Stock risk high: 4x (KPI max 3, staatus: EXCEEDS_KPI)

🎯 Key metric: [AI text]
🔍 Muster: [AI text]
💡 Soovitus Kristile: [AI text]
✅ Inimese kontroll: [AI text]
⚠️ AI piirang: [AI text]

Allikas: n8n workflow N5 v1.0
```

The five Põhinumbrid values must match exactly: 16855, 283, 3371, 5.96%, 4x. These are deterministic — if any are off, the Code node has a problem (re-check Step 5.1 spreadsheet selectors).

**Google Sheets Raportid tab:** a new row should appear with 11 columns filled, including a fresh ISO timestamp and a report_id like `N5-20260511-104138`.

---

## Common pitfalls

These are the issues we hit during real deployment, in order of how much time they cost:

### Pitfall 1 — Forgot to add yourself as Test User in Step 2.4

**Symptom:** OAuth flow ends with `Access blocked: this app's request is invalid`.
**Fix:** Go back to Step 2.4, add your email to Test users, retry. The error message does not tell you this is the cause.

### Pitfall 2 — CSV split-text option greyed out

**Symptom:** After pasting CSV into Google Sheets, `Data → Split text to columns` is disabled.
**Fix:** You selected entire rows (clicked the `1` row number). Select a cell range instead — `A1:A26`. The menu activates.

### Pitfall 3 — AI's `output` field is a string, not an object

**Symptom:** Telegram message has empty Key metric / Muster / Soovitus / Inimese kontroll / AI piirang fields.
**Fix:** The expression `{{ $json.output.key_metric }}` returns blank because `output` is a JSON-encoded string, not a parsed object. Use `{{ JSON.parse($json.output).key_metric }}` everywhere AI fields are consumed — in the Telegram Text template and in the Append row mappings (5 places total).

### Pitfall 4 — Forked Week 4 workflow has inherited references to deleted nodes

**Symptom:** The Vorminda node (or any node carried from the Week 4 template) throws `Cannot assign to read only property 'name' of object 'Error: Referenced node doesn't exist'`.
**Fix:** Delete the Vorminda node entirely — it formats multi-channel content drafts (N4 logic) and has no role in N5 reporting. Then reconnect AI Agent directly to the final Telegram node by dragging from the AI Agent output handle.

### Pitfall 5 — Wrong Chat ID in Telegram node

**Symptom:** `Forbidden: bot can't send messages to bot`.
**Fix:** Replace the bot's own Telegram ID with your personal user ID (find it via @userinfobot). Bots send TO humans, not to themselves.

### Pitfall 6 — Schedule trigger doesn't fire when you expect

**Symptom:** Setting the Schedule trigger to "every day 9:00" but no automatic report arrives.
**Fix:** Schedule trigger only fires when the workflow is **Published** (the green Active toggle at the top-right). In Test mode, only manual `Execute workflow` runs. Same applies to Telegram Trigger — it only catches incoming messages when Active, because that's when n8n registers the webhook with Telegram.

---

## Activating daily reports (after testing)

When you're satisfied with manual runs:

1. In the **Schedule - iga päev 9:00** node, verify the cron expression: `0 9 * * *` with timezone `Europe/Tallinn`
2. Top-right of the workflow editor → toggle from `Inactive` to `Active`
3. Save (Ctrl+S)

The first scheduled report will fire at 09:00 Europe/Tallinn the next day. Each report writes one row to Raportid and sends one Telegram message — over 6 months you'll have ~180 rows of accumulated decision context.

---

## Extending this workflow

The Hybrid pattern from this template applies to any data-to-narrative workflow. Examples:

- **Weekly customer service quality report** — Code node aggregates ticket categories and resolution times; AI writes the narrative recommendations
- **Daily inventory alert digest** — Code node flags products below threshold; AI writes a priority-ordered email
- **Monthly board KPI summary** — Code node assembles multi-source metrics; AI writes the 1-page executive summary

The deterministic-creative split is what makes these trustworthy: the numbers are auditable, the prose is generated. Both are useful, but they're produced by different parts of the workflow for different reasons.

---

*Built for the [02Signal program](https://02signal.com). Real case: UrbanStyle.ltd, Estonia.*
