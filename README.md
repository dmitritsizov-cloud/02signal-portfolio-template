# Dmitri Tsizov — 02Signal Portfolio

## About Me

Hi! I'm **Dmitri Tsizov**, and I'm building practical AI automations for small businesses in Estonia.

In this portfolio I document my work in the **02Signal program** — a 7-week journey applying AI and n8n workflows to real business problems. My current case study: **UrbanStyle.ltd** (4 stores across Estonia, ~3000 active customers, ~600 hours/year currently spent on repetitive customer service that AI can handle).

**My focus:** turning manual processes into 24/7 automation — without replacing people, but freeing them from routine work.

📍 Estonia
🛠️ n8n · Telegram · Claude · Google Workspace · GitHub

---

## My Automations

### Week 1
*Coming soon — Customer & market analysis*

### Week 2
*Coming soon — Process mapping*

### Week 3 — UrbanStyle FAQ Telegram Bot ✅

**What I built:** A branded Telegram bot for UrbanStyle.ltd customer service, connected to an n8n workflow.

**What it does:** When triggered in n8n, the workflow sends an automated message to the Telegram bot. This is the foundation for upcoming weeks where AI will generate FAQ responses automatically (~75% of customer queries are repetitive and bot-answerable).

**Try it / view it:**
- 🤖 [Live bot demo: @DmitriTsizov_bot](https://t.me/DmitriTsizov_bot)
- ⚙️ [Workflow file (n8n export)](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week3.json)
- 📄 [Business documentation & ROI estimate](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/docs/week3.md)

### Week 4
*Coming soon — AI-generated content & marketing*

### Week 5
*Coming soon — Data collection & decisions*

### Week 6
*Coming soon — AI strategy presentation*

### Week 7
*Coming soon — Final demo*

---

## My Workflows

All my n8n workflows are stored as `.json` files in [`/workflows`](./workflows/). Anyone with n8n access can import them and run the same automation.

## My Business Documents

Documents I created as part of my automations are in the [`/docs`](./docs/) folder.

---

## What I Learned

### Week 1
*Coming soon*

### Week 2
*Coming soon*

### Week 3

**What was new:** First time building an end-to-end automation. Learning that n8n + Telegram is just two pieces — Trigger and Action — and everything else is variations on that pattern.

**What was hard:** BotFather's two-step logic. When you type `/setname`, it asks "Choose a bot" — and you must select from buttons, not type a new name. I made this mistake first try and got "Invalid bot selected" four times before realizing.

**What clicked:** This isn't a one-off task — it's infrastructure. The same Telegram credential I created today will be reused in Week 4 (with AI), Week 5 (with Google Sheets), and beyond. Every week stacks on top of the previous one.

### Week 4
*Coming soon*

### Week 5
*Coming soon*

### Week 6
*Coming soon*

### Week 7
*Coming soon*

---

*Built with the [02Signal portfolio template](https://github.com/02signal/02signal-portfolio-template)*
