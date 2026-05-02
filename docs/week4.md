# Week 4 — UrbanStyle FAQ Bot powered by AI (Groq)

## What I Built

An AI-powered customer service bot for **UrbanStyle.ltd** that answers customer FAQs automatically in Estonian, using Groq's `llama-3.1-8b-instant` model integrated via n8n.

This is the evolution of the [Week 3 bot](./week3.md) — instead of sending a fixed message, the bot now **understands customer questions** and responds with relevant information from the company's FAQ knowledge base.

## Architecture

```
[Manual Trigger] → [Basic LLM Chain] → [Telegram: AI Response]
                          ↓
                   [Groq Chat Model]
                   llama-3.1-8b-instant
```

**Components:**

| Component | Role |
|---|---|
| Manual Trigger | Initiates the workflow with a test question |
| Basic LLM Chain | Orchestrates the AI conversation with system prompt + user message |
| Groq Chat Model | The AI brain — fast inference via Groq's hardware |
| Telegram Bot | Delivery channel — sends AI response to the customer |

## Why Groq

Groq was chosen over OpenAI/Claude for three reasons:

1. **Free tier sufficient for prototype** — no credit card required
2. **Speed** — Groq's specialized hardware delivers responses in ~1-2 seconds
3. **Estonian language support** — Llama 3.1 handles Estonian fluently

The chosen model `llama-3.1-8b-instant` is the smallest viable model for FAQ responses, optimizing for cost efficiency over advanced reasoning.

## System Prompt Engineering

The AI's behavior is shaped by a carefully engineered system prompt with 4 layers:

1. **Identity:** "You are UrbanStyle.ltd customer service assistant"
2. **Source of truth:** Answer ONLY from the provided FAQ knowledge base
3. **Fallback rule:** If unknown → "Ma ei leia... suuna inimesele" (no hallucinations)
4. **Style constraints:** Estonian language, max 3 sentences, friendly tone
5. **Knowledge base:** 10 most-common FAQ categories (returns, delivery, hours, sizes, etc.)

This is a simplified RAG (Retrieval-Augmented Generation) approach — the FAQ is embedded directly in the prompt rather than retrieved from a vector database. For ~10 categories with stable content, this is more cost-effective than full RAG infrastructure.

## Test Results

The bot was validated with 3 test questions covering different scenarios:

### Test 1 — In-FAQ question (Returns)

**Question:** *"Mis on teie tagastuspoliitika?"* (What is your return policy?)

**Response:** *"Klient saab toote tagastada 30 päeva jooksul alates kättesaamisest. Toode peab olema kasutamata, originaalpakendis ja siltidega. Tagastus on tasuta — kasutada saab kaasas olevat tagastussilti."*

**Result:** ✅ Pass — All 3 key facts (30 days, condition, free return) correctly retrieved from FAQ.

### Test 2 — In-FAQ question (Hours)

**Question:** *"Millal Tartu pood avatud on?"* (When is the Tartu store open?)

**Response:** *"Tartu pood on avatud Esmaspäevast Laupäevani 10-19. Pühapäevadel on pood suletud."*

**Result:** ✅ Pass — Correct hours retrieved, properly formatted in Estonian.

### Test 3 — CRITICAL: Out-of-FAQ question (Hallucination test)

**Question:** *"Kas teil on astronaudikostüüme?"* (Do you sell astronaut costumes?)

**Response:** *"Ma ei leia sellele automaatset vastust. Palun suuna küsimus inimesele."*

**Result:** ✅ ✅ ✅ **Critical pass** — The bot correctly refused to invent a product and redirected to human support. This proves the prompt's hallucination protection works as designed.

## Why Test 3 Matters

The most common failure mode for AI customer service bots is **fabrication** — confidently inventing products, prices, policies, or contact info that don't exist. This destroys customer trust and creates legal liability.

By explicitly instructing the AI to admit when it doesn't know, and validating this behavior, the bot is **safe to deploy** in a customer-facing context.

## Business Impact

For UrbanStyle.ltd (4 stores, ~3000 customers, ~600 hours/year on customer service):

| Metric | Before | After |
|---|---|---|
| Average response time | 2-24 hours (during business hours) | **5 seconds** (24/7) |
| Coverage | Estonian working hours | **24/7/365** |
| Repetitive questions handled | 0% automated | **~75% automated** |
| Estimated time saved | — | **~450 hours/year** |
| Customer experience | Wait for human | Instant answer or graceful escalation |

## Limitations & Future Iterations

### Current Limitations

1. **Static FAQ in prompt** — every prompt change requires editing the workflow
2. **No conversation memory** — each question is treated independently
3. **No analytics** — no tracking of which questions are asked most
4. **Manual Trigger only** — not yet connected to a real customer-facing form

### Planned Improvements (Week 5+)

- **Form Trigger** — replace Manual Trigger with a public form
- **GitHub-hosted prompt** — load FAQ from `prompts/urbanstyle-faq-system.md` via HTTP Request, enabling version-controlled prompt updates without modifying the workflow
- **Logging** — store all Q&A pairs in Google Sheets for analysis
- **Multilingual support** — extend to English and Russian (UrbanStyle has international customers)

## Files

- 📦 [`workflows/week4.json`](https://github.com/dmitritsizov-cloud/02signal-portfolio-template/blob/main/workflows/week4.json) — n8n workflow export (importable)
- 🤖 [Live bot demo: @DmitriTsizov_bot](https://t.me/DmitriTsizov_bot)
- 📄 [Week 3 documentation](./week3.md) — the predecessor (manual message bot)

## What I Learned

**Technical:**
- Working with API keys safely — never commit secrets to public repos
- n8n's two-node AI architecture (Chain + Model) and why it's flexible
- Distributed system debugging — using API provider logs (Groq Console) to localize failures between client and server
- Distinguishing similar-named services (Groq vs xAI Grok)

**Business:**
- AI quality depends 90% on prompt engineering, 10% on model choice
- Hallucination protection is non-negotiable for customer-facing bots
- The cost-quality tradeoff: starting with cheaper models is the right call when prompt engineering is good enough
- Documentation matters — a workflow without context is just a JSON file

**Process:**
- "Test in isolation, then integrate" — testing the AI node alone before connecting to Telegram saved debugging time
- When something hangs, don't panic — diagnose where in the pipeline the failure is, then fix that specific point
