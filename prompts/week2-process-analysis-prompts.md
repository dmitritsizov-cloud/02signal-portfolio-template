# Week 2 Prompts — Process Analysis & TÄPNE Evaluation

**Tool:** Claude Opus 4.7 (claude.ai)
**Pattern:** AI as Consultant (continued conversation from Week 1)
**Date used:** May 2026

---

## Context

These prompts continued the same Claude conversation thread that began with Week 1's customer segmentation. The AI retained full context about UrbanStyle's segments, team, business model, and operational data, making each new analysis context-aware and enabling cross-references between weeks.

---

## Prompt 1: Process Identification

Goal: Identify 7-10 candidate processes for automation analysis.

```
Suurepärane segmenteerimine eelmises analüüsis. Nüüd liigume edasi nädal 2 ülesandele — operatsioonid ja protsessid.

KONTEKST (täiendab eelmist):

UrbanStyle'i meeskond kulutab praegu hinnanguliselt ~59 tundi nädalas rutiinsetele protsessidele:
- Anna Mets (turundusjuht): ~12 h/nädalas
- Marko Tamm (andmeanalüütik): ~18 h/nädalas
- Liis Koppel (operatsioonijuht): ~15 h/nädalas
- Kristi Pärn (tegevjuht): ~14 h/nädalas

See on ligikaudu 1,5 täiskohaga töötaja töömaht.

ÜLESANNE:

Tuvasta UrbanStyle'is 7-10 olulisemat äriprotsessi, mis on potentsiaalsed automatiseerimiskandidaadid. Iga protsessi jaoks anna:

1. Protsessi nimi
2. Tüüp: põhiprotsess / tugiprotsess / juhtimisprotsess
3. Vastutaja
4. Sagedus
5. Hinnanguline ajakulu
6. Lühike kirjeldus
7. Sissendid ja väljundid
8. Seos eelmise nädala segmentidega

Lõpus tee võrdlustabel ja kommentaar perspektiivseimate kandidaatide kohta.

OLULINE:
- Kasuta UrbanStyle'i konteksti
- Mõtle nii klientidele suunatud kui sisemiste protsesside peale
- Kui mõni protsess on selgelt halb automatiseerimiseks, maini ka seda
```

---

## Prompt 2: TÄPNE Evaluation

Goal: Systematically score the 10 identified processes using the Estonian TÄPNE framework.

```
Suurepärane analüüs! Nüüd hindame need süstemaatiliselt TÄPNE-raamistikus.

T-Ä-P-N-E RAAMISTIK (igaüks 1-5 punkti, kogusumma max 25):

T = Toimingu sagedus (1=harva, 5=väga tihti)
Ä = Äratuntavus (1=segane algus, 5=selge trigger)
P = Protsessi struktuur (1=kaootiline, 5=selged sammud)
N = Nähtav väärtus (1=marginaalne, 5=suur ja mõõdetav)
E = Ettearvatavus (1=muutuvad sissendid, 5=stabiilsed)

ÜLESANNE:

Hinda iga 10-st protsessist TÄPNE raamistikus. Iga protsessi jaoks anna:
1. Score iga kriteeriumi kohta (1-5) + lühike põhjendus
2. Kogusumma (max 25)
3. Tõlgendus (20-25 ideaalne, 15-19 hea, 10-14 keskmine, 5-9 halb)

Lõpus tee koondtabel sorteeritud kogusumma järgi.

OLULINE:
- Ole aus — ära anna kõigile maksimum punkte
- Arvesta UrbanStyle'i konteksti
- Kui mõnel protsessil on selge takistus enne automatiseerimist, maini seda
- Personali värbamine (#10) peaks loogiliselt saama madala skoori
```

---

## Why This Two-Step Approach Worked

### Step 1: Identification before evaluation
A common mistake is to start with TÄPNE evaluation immediately. But you need a complete candidate list first — otherwise you're scoring whatever processes happened to come to mind, not the systematically identified set. The first prompt forced exhaustive listing before judgment.

### Step 2: Framework-based evaluation
The TÄPNE prompt did three things that produced quality output:
1. **Defined the framework explicitly** — Claude couldn't guess from the abbreviation alone
2. **Anchored each score (1=X, 5=Y)** — gave consistent calibration across processes
3. **Required a counter-example** — explicitly asking for one low-scoring process prevented uniform inflation

### Conversation continuity
Both prompts ran in the same Claude chat as Week 1's segmentation. This meant:
- No need to re-explain UrbanStyle's business model
- Every process automatically connected to the relevant customer segment
- Insights compounded across weeks (e.g., "Klubi-Maret segment matters most" → "loyalty program is the highest-ROI process")

This is the essential advantage of the AI Consultant pattern over the AI Pipeline pattern.

---

## Reusability

These two prompts are templates for any business doing operations analysis:

1. **Identification prompt:** Replace the company context (size, team, hours) and the "connection to previous week" line.

2. **TÄPNE evaluation prompt:** The framework definition is generic and reusable for any business. Only the "important" notes at the end need company-specific adjustment (e.g., which process should be the counter-example).

The two-step structure — identify first, evaluate second — is the transferable pattern.
