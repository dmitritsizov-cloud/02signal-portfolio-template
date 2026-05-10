# Week 4 (Part 3) — Hybrid Workflow: Production Debugging Log

This is a candid record of the five real-world issues that hit me during the first deployment of `week4-sisuloome-hybrid.json` into a fresh n8n environment, plus the platform migration that followed. None of these issues were solvable by a template, tutorial, or import file. Each one took 2–5 minutes to fix once diagnosed; the fifth took a different kind of decision — when to stop fixing and switch tools. The point of writing them down is not to celebrate solving them — it's to make the next deployment (yours, mine, or someone else's) take a few minutes total instead of a few hours.

## TL;DR — the pre-flight checklist

Before testing any imported n8n workflow, run through this list. Skipping any item costs more time than doing all of them.

1. ☐ Open every node with an external service. Re-select its credential from the dropdown, even if a name is already shown.
2. ☐ Open every AI model sub-node. Re-select that credential too — they bind separately from the agent node.
3. ☐ Find every Telegram `chat_id` field. Confirm it's the *recipient's* user ID (a person), not the *bot's* ID.
4. ☐ Workflow Settings → Timezone → set to your real timezone. Default is America/New_York.
5. ☐ Publish the workflow before testing Telegram or Schedule triggers. Test mode does not register webhooks.
6. ☐ For pure static sites (no build step needed), prefer GitHub Pages over Vercel — fewer moving parts, no auth-toggle pitfalls, no framework auto-detection surprises.

## Issue 1 — Imported credentials look bound but aren't

### Symptom

Every Telegram and AI node displays a credential name in its dropdown, exactly the name I used when I exported the workflow. But execution throws:

```
Node does not have any credentials set
```

It looks like the credential is set. The error says it isn't. Both are correct depending on what you mean.

### Why it happens

n8n's `.json` export stores the credential's *name* as a string, not the credential's secret. When the file is imported into a different workspace, the name is shown but is not bound to any actual credential record in that workspace. The dropdown is displaying a leftover label, not a live link.

### Fix

Open the node. Click the credential dropdown. Select the credential again — even the same name that's already shown. n8n now creates the binding. Save the node.

### Diagnostic time

**~30 seconds per node** once you recognize the pattern. The first time it took me three minutes to even believe the issue was real.

### Prevention

Treat imported workflows like a deployment to a new environment, because that's what it is. Run through every credential dropdown in order before the first test execution.

---

## Issue 2 — AI sub-node credentials need the same treatment, separately

### Symptom

After fixing Issue 1, the AI Agent node now executes — but immediately throws:

```
Error in sub-node 'Groq Chat Model'
Node does not have any credentials set
```

The Groq Chat Model is a sub-node attached to the AI Agent, and it has its own credential field. Fixing the agent node didn't reach down into the sub-node.

### Why it happens

Same root cause as Issue 1, applied recursively. The AI Agent and the LLM sub-node are separate node instances with separate credential bindings. The export file remembers both names but binds neither.

### Fix

Open the Groq Chat Model sub-node directly (or any other AI provider sub-node — OpenAI, Anthropic, etc.). Re-select its credential. Save.

### Diagnostic time

**~30 seconds.** Annoying because Issue 2 is invisible until Issue 1 is solved — they queue up serially rather than appearing together.

### Prevention

Pre-flight checklist item #2. Open every AI provider sub-node, not just the agent.

---

## Issue 3 — Bot's Telegram ID confused with user's chat ID

### Symptom

After fixing Issues 1 and 2, the AI generates a perfect multi-channel draft. The Telegram Send node fires. Telegram API responds:

```
Forbidden: the bot can't send messages to the bot
```

### Why it happens

The bot's own Telegram identifier and a user's chat identifier are both numbers in roughly the same format, both visible in the Telegram API, and easy to confuse. I'd put `8773999500` (the bot's own ID, visible in its profile and credential) into the `chat_id` field, where the recipient ID was supposed to go. Telegram refused to deliver because bots cannot message bots — including themselves.

The error message is precise. I still misread it three times because I'd convinced myself the number was correct.

### Fix

The bot is the *sender*. The chat_id is the *recipient*. Recipients are humans, so you need a human user's ID — yours, in this case.

To find your own chat ID, send `/start` to your bot in Telegram, then in any browser visit:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

In the JSON response, find:

```json
"from": {
  "id": 6205033039,
  "is_bot": false,
  "first_name": "Dmitri"
}
```

The `id` value where `is_bot: false` is the chat_id you want. Replace the bot ID with this in the workflow's Code node (two places: the Form Trigger branch and the Schedule branch).

### Diagnostic time

**~3 minutes.** Most of which were spent re-reading the error and not believing it.

### Prevention

Heuristic for next time: if a Telegram error contains the word "bot" twice, the chat_id is wrong. The error wording `bot can't send to bot` is unusually specific — Telegram is essentially naming the issue if you read it without preconceptions.

---

## Issue 4 — Telegram Trigger silently doesn't fire in Test mode

### Symptom

After fixing Issues 1–3, the form path works perfectly. To test the Ha+ feedback loop, I send `PARANDA: tee lühemaks` to the bot in Telegram. Nothing happens. The bot doesn't reply, no execution appears in n8n's history, and there's no error anywhere — just silence.

### Why it happens

n8n has two execution modes:

| Mode | Form Trigger | Telegram Trigger | Schedule Trigger |
|---|---|---|---|
| Test (Execute workflow) | ✅ via test URL | ❌ no webhook registered | ❌ does not run |
| Published (Active) | ✅ via production URL | ✅ webhook registered with Telegram API | ✅ runs on schedule |

In Test mode, n8n doesn't register a webhook with Telegram's servers. Telegram has nowhere to deliver the incoming message, so n8n never sees it. There's no error because no request ever arrives.

### Fix

Click the **Publish** toggle in the top-right of the canvas (n8n hosted edition replaces the older "Active/Inactive" switch with this label). The status indicator turns green. n8n now registers the webhook with Telegram. Send `PARANDA:` again — works immediately.

If Publish is unavailable due to a workflow limit (the `0 / 1` indicator in the top bar), unpublish another workflow first.

### Diagnostic time

**~2 minutes.** Most of which were spent re-checking nodes that were already correct.

### Prevention

After Step 1–3, the next test is *not* "send a Telegram message." The next step is "Publish the workflow." Then test.

---

## Issue 5 — Vercel couldn't reliably serve README.md; migrated to GitHub Pages

### Symptom

After Issues 1–4 were resolved, Vercel kept returning 404 for `/README.md` even though the file was committed to the repo root with the correct content (24.4 KB, 237 lines, visible on github.com). The site loaded `index.html` and docsify started rendering, but `fetch('/README.md')` returned 404 from Vercel's edge. Direct navigation to `vercel.app/README.md` returned Vercel's native NOT_FOUND page. Every redeploy also re-enabled "Vercel Authentication: Require Log In" by Hobby-tier default — requiring manual toggle-off each time.

I tried the standard fixes: explicit `vercel.json` static configuration, fresh project deletion and re-import, build cache clearing, framework preset overrides. Same 404 returned each time.

### Why it happens

Vercel auto-detects project type from repo contents — presence of `package.json`, framework markers, output directory hints. For repos that have `package.json` but no build script, Vercel applies opaque defaults that don't always match a pure-static expectation. Combined with Hobby-tier behaviors (auto-enabled deployment protection, aggressive CDN caching, limited diagnostic surface), the debugging cost exceeded the value of the platform for a docsify site that needs zero build steps.

### Fix

Migrated to GitHub Pages — purpose-built for serving repo files as static content with no framework detection. Three-step migration:

1. Repo **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/(root)` → Save**
2. Created empty `.nojekyll` file in repo root. Without it, GitHub runs Jekyll on the content, which silently strips files starting with `_` and applies markdown transforms docsify doesn't expect.
3. Updated repo "About" Website field from the old Vercel URL to `https://dmitritsizov-cloud.github.io/02signal-portfolio-template/`.

Site went live within 60 seconds of the second commit. README, sidebar navigation, all internal links, all screenshots — everything worked on first load. No 404s, no auth toggle, no cache battles.

### Diagnostic time

Migration itself: **~5 minutes**. The work before deciding to migrate (Issues 1–4 plus the unfixable README 404) was ~90 minutes. The valuable lesson is not the migration steps — it's the judgement call to stop fixing and switch platforms.

### Prevention

For pure static sites (docsify, plain HTML, MkDocs output), default to GitHub Pages from the start. Vercel is excellent for projects that need serverless functions, edge middleware, or framework auto-detection (Next.js, SvelteKit, Astro). For a folder of `.md` files served by client-side JavaScript, those features add debugging surface without delivering value. The 02Signal setup guide recommended Vercel because it works for the majority case; for this specific portfolio shape (docsify + zero build step), GitHub Pages is the simpler architectural fit. Choosing the right host is part of the engineering, not just a checklist item.

---

## What I take away from these five

The first four issues together are roughly **8 minutes of total fix time** if you know what to look for, and **45+ minutes** if you don't. The difference is the pre-flight checklist at the top of this document.

The fifth — the migration decision — was a separate kind of lesson: knowing when fixing costs more than switching. Issues 1 through 4 had clear diagnostic patterns and clear fixes. Issue 5 didn't. After the third workaround failed on Vercel, the right move wasn't to keep debugging the platform — it was to recognize that the platform's defaults didn't match the project's shape, and to choose a tool that did. That recognition takes longer than the technical fix it leads to.

More importantly, none of these are n8n-specific or Vercel-specific problems. The same patterns will appear in any environment where:

- A configuration file references named secrets that don't exist yet in the target environment (Issues 1 & 2).
- Two entities of the same type have similar identifiers but different roles (Issue 3 — bot vs user, but generalize: producer vs consumer, source vs destination, request vs response IDs).
- A trigger requires registration with an external service that only happens in a specific deployment mode (Issue 4 — webhooks, but generalize: cron jobs, scheduled events, async listeners).
- A platform's default behaviors don't match the project's actual needs, and the cost of bending the platform exceeds the cost of switching to one that fits (Issue 5 — Vercel for static, but generalize: any tool where the configuration overhead grows faster than the value delivered).

Production deployment is a skill separate from prototyping. Prototyping ends when the workflow runs once in the environment you built it in. Deployment ends when the workflow runs reliably in an environment you didn't build it in, served by infrastructure you didn't pick yourself. The work in between is what this log is about.

## Related files

- Workflow: [`workflows/week4-sisuloome-hybrid.json`](../workflows/week4-sisuloome-hybrid.json)
- Setup & demo guide: [`docs/week4-hybrid-setup.md`](week4-hybrid-setup.md)
- Original v1.0 review log: [`docs/week4-tagasiside.md`](week4-tagasiside.md)
- Live portfolio: [https://dmitritsizov-cloud.github.io/02signal-portfolio-template/](https://dmitritsizov-cloud.github.io/02signal-portfolio-template/)
