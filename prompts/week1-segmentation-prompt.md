# Week 1 Prompt — Customer Segmentation Analysis

**Tool:** Claude Opus 4.7 (claude.ai)
**Pattern:** AI as Consultant
**Date used:** May 2026

---

## The Prompt

```
Käitu nagu kogenud ärianalüütik, kes spetsialiseerub kliendisegmenteerimisele.

KONTEKST:

UrbanStyle.ltd — Eesti moejaekaubandusettevõte
- Asutatud: 2018
- Töötajaid: ~55
- Käive: ~4M EUR/aasta
- Poed: 4 füüsilist (Tallinn, Tartu, Pärnu, Narva) + e-pood
- E-pood annab 60% käibest

KLIENDIBAAS:
- ~3000 aktiivset klienti
- 35% on korduvostjad
- Keskmine ostusumma (AOV): ~65 EUR
- Lojaalsusprogrammis (UrbanStyle Club): ~1200 liiget
- Sihtgrupp: 18-35-aastased linna elanikud

POSITSIONEERING:
- Jätkusuutliku moe bränd
- Hinnatase: keskmine kleit 39-89€, t-särk 19-39€, denim 49-99€
- Põhiväärtused: keskkonnasõbralikkus, eetiline tootmine, lokaalsus

OPERATSIOONILISED ANDMED:
- Narva pood: konversioon 2.1% (alla keskmise 3.4%)
- Tallinna pood: konversioon ~3.8%
- Tartu pood: konversioon ~3.5%
- Tagastus: 30 päeva, tasuta
- Tarne: tasuta üle 50€

MEESKOND:
- Anna Mets — turundusjuht (vajab segmente, et suunata kampaaniaid)
- Marko Tamm — andmeanalüütik (omab andmeid, aga ülekoormatud)
- Kristi Pärn — tegevjuht
- Liis Koppel — operatsioonijuht

ÜLESANNE:

Tuvasta 4-5 kliendisegmenti UrbanStyle'ile. Iga segmendi jaoks anna:

1. Nimi (eestikeelne, eesnimega — nagu "Eco-Kadri" või "Äri-Marek")
2. Demograafia (vanus, sugu, asukoht, sissetulek)
3. Käitumine (kuidas ostab, kui sageli, milliseid kanaleid kasutab)
4. Motivatsioon (miks ostab UrbanStyle'ist, mitte konkurendilt)
5. Väärtus äriettevõttele (% kliendibaasist, % käibest, korduvostja %)
6. Väljakutsed (mis takistab teda rohkem ostmast)
7. Turundussoovitus (millist sõnumit ja kanalit talle suunata)
8. Prioriteet (kõrge/keskmine/madal) — kus AI-automatiseerimine annaks suurima väärtuse

VORM:
Kasuta tabelivormi kõigi segmentide võrdlemiseks lõpus.

OLULINE:
- Ole konkreetne, kasuta eestikeelseid nimesid ja näiteid
- Iga segment peab olema reaalne ja eristuv (mitte üldine "noored" või "vanad")
- Eralda neid mitte ainult demograafiliselt, vaid ka käitumiselt
- Anna hinnangud andmetel põhinevalt — kui andmeid pole, ütle ausalt "see on hinnang"
```

---

## Why This Prompt Worked

The prompt follows four design principles that are transferable to other AI-Consultant tasks:

### 1. Role Assignment (line 1)
> *"Käitu nagu kogenud ärianalüütik, kes spetsialiseerub kliendisegmenteerimisele."*

Setting Claude as an experienced business analyst specializing in customer segmentation activates the right tone, vocabulary, and analytical frameworks. Without this, Claude defaults to a more generic helper voice.

### 2. Comprehensive Business Context
All UrbanStyle data is provided in one structured block:
- Company basics (size, revenue, age)
- Customer base (count, behavior patterns, AOV, club size)
- Positioning (brand values, price tiers)
- Operational data (conversion rates by store)
- Team (who needs the output and why)

This is **everything** Claude needs. No follow-up clarifications required.

### 3. Specific Deliverable Structure
Eight numbered attributes per segment + comparison table format. This produces **comparable, structured output** rather than a free-form essay.

### 4. Honesty Requirement
> *"Anna hinnangud andmetel põhinevalt — kui andmeid pole, ütle ausalt 'see on hinnang'"*

This single line prevents the most common AI failure mode: presenting estimates as facts. Claude opened its response with an explicit data caveat — exactly the behavior requested.

---

## What Followed

After this single prompt, Claude generated:
- 5 detailed customer segments (8 attributes each)
- A comprehensive comparison table
- Strategic prioritization for the next 6 months
- ROI estimates per initiative
- A clear flag that some problems (Narva conversion) are NOT AI problems

**No follow-up prompts were needed** for the core segmentation. This is a sign of well-engineered prompt design.

---

## Reusability

This prompt template can be adapted for other businesses by replacing:
- Company name and basics
- Customer base data
- Positioning
- Operational data
- Team names

The structure (role + context + task + form + honesty requirement) transfers directly.
