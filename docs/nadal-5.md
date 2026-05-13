# Nädal 5 — Andmed ja otsused

> **Mini-lab S1 (Tartu, 13.05.2026):** ehitasin esimese automaatse andmeraporti, mis salvestab otsuse aluse Google Sheets'i ja saadab kokkuvõtte Telegrami. Vorm täidetakse → AI Agent loeb 25 müügirida → KPI-võrdlus → raport jõuab Telegrami ja Sheets'i samaaegselt.

**Tase:** Ha+ • **Workflow versioon:** v1.2 (kolm parandust v1.0-st alates) • **AI mudel:** Groq llama-3.3-70b

---

## 1. Probleem

UrbanStyle on Eesti moe- ja jaekaubandusettevõte (Tallinn, Tartu, Pärnu, Narva + e-pood) ja plaanib Riia laienemist. CEO Kristi vajab nõukogule lühikest andmepõhist raportit:

> **Otsuse küsimus:** *Kas Narva poe madal käive ja korduv kõrge laoseisu risk on Riia laienemise riskisignaal, mis vajab kontrolli enne kampaania eelarve suurendamist?*

Kristi ei vaja dashboardi. Ta vajab ühte numbrit, ühte mustrit ja ühte soovitust **Telegramis** — ja sama rida **Google Sheets'i** logituna, et otsuste ajalugu jääks alles.

---

## 2. Andmed

**Allikas:** `n5_sales_sample.csv` — 25 rida, 5 päeva (01.–05.05.2026), 5 müügikohta, 3 tootekategooriat.

**KPI sihid vs tulemus:**

| KPI | Siht | Tulemus | Staatus |
|---|---|---|---|
| Päevakäive | 3 500 € | **3 371 €** | 96.3% (lähedal) |
| Tellimused (5 päeva kokku) | — | 283 | OK |
| Narva osakaal käibest | 12 % | **5.96 %** | 🔴 **CRITICAL** |
| Stock risk = high | max 3× | **4×** | 🔴 **EXCEEDS_KPI** |

---

## 3. Workflow arhitektuur (Ha+ tase)

```text
Form Trigger ──┐
Telegram Trigger ──┤
Schedule (9:00, disabled) ──┘
        ↓
Normaliseeri sisend (3 triggerit → 1 vorm)
        ↓
Google Sheets read — SisendLogi, 25 rida
        ↓
Code "Agregeeri müük" (revenue, orders, Narva share,
                       stock risk, KPI status)
        ↓
AI Agent (Groq llama-3.3-70b)
   → JSON: key_metric / finding / recommendation
           / human_check / ai_limitation
        ↓
Google Sheets append → Raportid tab
   + Telegram (Markdown raport)
```

**N4 → N5 üleminek:** kasutasin uuesti N4 hübriidvoo Form Triggerit ja Normalizerit. Inspiratsiooni andis grupikaaslane Raido S, kes näitas "üks AI Agent + üks Send Telegram" mustri. See lubas mul mitu sisendit ühte voogu liita ilma duplikaadita.

---

## 4. Muster — mida andmed tegelikult ütlevad

| Päev | Narva naiste riided | Stock risk | Müüja märkus |
|---|---|---|---|
| 01.05 | 220 € / 5 tellimust | **high** | kleitide laoseis madal |
| 02.05 | 190 € / 4 | **high** | kliendid küsivad puuduvaid suurusi |
| 04.05 | 175 € / 4 | **high** | laoseisu risk kordub |
| 05.05 | 160 € / 3 | **high** | korduv risk |

Võrdluseks Tallinn samas kategoorias: **1 280–1 530 €/päev**.

> Narva müük on **~12 % Tallinna käibest, trend langev, stock_risk = high 4 päeval**. Müüjate märkused viitavad **laoseisu/suurusvaliku probleemile**, mitte nõudluse puudumisele.

---

## 5. AI raport (Telegrami väljund)

Workflow saatis automatiseeritult järgmise sõnumi:

```
📊 N5 UrbanStyle andmeraport

❓ Otsuse küsimus: Kas Narva madal käive ja kõrge laorisk
                   vajavad kontrolli enne Riia kampaaniat?

📅 Periood: 2026-05-01 kuni 2026-05-05 (5 päeva, 25 rida)

💰 Põhinumbrid:
- Käive: 16 855 €
- Tellimused: 283
- Päevakäive: 3 371 € (KPI siht 3500 €, täidetud 96.3%)
- Narva osakaal: 5.96% (siht 12%, staatus: CRITICAL)
- Stock risk high: 4× (KPI max 3, staatus: EXCEEDS_KPI)

🎯 Key metric: Narva müük on 5.96%, mis on alla 12% eesmärgi
🔍 Muster: Narva poe müük on madal, laoseisu risk on korduv
💡 Soovitus Kristile: Kontrolli Narva poe müüki ja
                       laoseisu enne Riia laienemist
✅ Inimese kontroll: Üle vaata Narva poe müügi ja laoseisu trende
⚠️ AI piirang: 5 päeva andmed ei võimalda põhjuslikkust väita
```

Sama rida läks paralleelselt Google Sheets `Raportid` tabi — kõik 12 veergu (incl. `decision_question`).

---

## 6. Inimese kontroll (Marko)

Enne nõukogule esitamist Marko peab kontrollima:
- Kas periood **01.–05.05.2026** on andmestikus tõesti täielik (puuduvaid päevi pole)?
- Kas `stock_risk = high` märge Narva ridadel on **päris laoseisu kontroll**, mitte müüja subjektiivne hinnang?
- Kas Tallinna võrdlusnumbrid (1 280–1 530 €) sisaldavad sama kampaaniat (Kevadine garderoob)? Kui ei, võrdlus ei ole õiglane.

---

## 7. AI piirang (mida 5 päeva 25 rida EI saa öelda)

- **Kas trend on hooajaline?** 5 päeva = liiga lühike, et eristada nädala loomulikku variatsiooni süsteemsest probleemist.
- **Mis on Narva kliendi tegelik segment?** Andmestikus puudub demograafia.
- **Kas Riia turg käitub nagu Narva?** See on hüpotees, mitte tõend.

> AI sõnastas raporti. Marko valideerib. Kristi otsustab.

---

## 8. Bug log — kuidas leidsin ja parandasin 3 viga (transparentsus)

Selle workflow ehitamise käigus tegin **3 viga**. Iga viga avastasin **Sheets'i logist või Telegrami sõnumist** — see ongi data-driven approach.

| Versioon | Bug | Kust märkasin | Fix |
|---|---|---|---|
| **v1.0** | `workflow_level: "=ri"` — katki expression, Sheets'i läks "ri" | Nägin Sheets logist 5 rida järjest "ri" | **v1.1:** muutsin expression'i lihtsaks string'iks `"Ha+"` |
| **v1.0** | `report_id` parsiti Google Sheets'is formula'ks: `N5-20260511-105430` → `-20365941` | Sheets näitas negatiivseid numbreid veerus B | **v1.1:** kõik report_id'd peavad olema string-formaadis |
| **v1.0** | Otsuse küsimus puudus nii AI promptis kui logis | AI raport ei olnud seotud konkreetse otsusega — Kristi ei näeks "miks see raport tekkis" | **v1.1:** lisatud 3 kohas (AI system prompt + Telegram raporti päises + Sheets'i uus veerg `decision_question`) |
| **v1.1** | Telegram'is tühjad väljad (`*Key metric:* `, `*Muster:* `) | Pärast Execute esimene sõnum tuli ilma AI sisuta — Põhinumbrid olid, AI väljund tühi | **v1.2:** `$json.output` → `$('AI Agent - multi-kanal draft').first().json.output` (5 kohas). Põhjus: Telegram node oli pärast Sheets append'i, seega `$json` viitas Sheets'i response'le, mitte AI väljundile |

**Õppetund inseneril:** kui workflow ahelas on 2+ node'i AI ja final output'i vahel, **kasuta alati `$('Node Name').first().json` viidet**, mitte `$json`. See on N4-st N6-ni korduv muster.

---

## 9. Artefaktid

- **n8n workflow:** `N5 UrbanStyle andmeraport — Ha+ (fixed v1.2)` — 3 triggerit, AI agent, Sheets append, Telegram, 5 Code node'i.
- **Google Sheets:** `02Signal N5 raportilogi - Dmitri`
  - `SisendLogi` tab — 25 müügirida (n5_sales_sample.csv)
  - `Raportid` tab — 12 veergu, esimene rida käsitsi (`R-MANUAL-001`), edasised AI poolt
- **Telegram bot:** UrbanStyle FAQ Bot 1 (taaskasutus N3-st)
- **AI mudel:** Groq llama-3.3-70b-versatile, JSON output mode

---

## 10. Mida õppisin (ettevõtja vaade)

1. **Raport ≠ dashboard.** Üks number + üks soovitus Telegramis on 80 % otsuse väärtusest. Power BI on ülejäänud 20 %, mida vajatakse harva.
2. **Human-in-the-loop on kindlustus, mitte bürokraatia.** "Inimese kontroll" veerg sundis mind kirjutama, *mida täpselt* Marko peab vaatama. See on tõeline väärtus.
3. **AI ei tohi olla viimane otsustaja.** `ai_limitation` veerg lisas mulle ettevõtja distsipliini: enne kui ma anonin AI järelduse, ma kirjeldan, mida andmed EI saa öelda.
4. **Väike võit > täiuslik plaan.** Tegin esmalt Shu-taseme käsitsi rea Sheets'i (`R-MANUAL-001`). Siis Ha+. Kui Ha+ oleks lõplikult katki olnud, oleks Shu rida ikka töötanud.
5. **Bug pole häbi — bug log on portfolios väärtus.** v1.0 → v1.1 → v1.2 evolutsioon näitab, et ma ei ehita "esimese korraga täiuslikult", vaid **mõõdan, näen viga, parandan**.

---

## 11. Edasi (N6 capstone'iks)

- Asendada Google Sheets Read **Supabase'iga**, kui ridade arv ületab 500.
- Lisada **trendi-võrdlus** (week-over-week), mitte ainult ühe nädala snapshot.
- Lisada Schedule trigger aktiivseks → iga esmaspäev 8:00 nädalaraport automaatselt Kristi Telegrami.
- Eraldi `decision_log` tabi Sheets'is, kus iga raport on seotud konkreetse otsuse staatusega (PENDING / APPROVED / REJECTED + Kristi kommentaar).

---

## 12. Grupitööks alguspunkt

> **Minu N5 grupitöö alguspunkt on:**
> otsuse küsimus *"kas Narva naiste riiete madal käive on laoseisu/suurusvaliku või nõudluse probleem ja kas see vajab kontrolli enne Riia kampaaniat"*,
> andmeallikas *"n5_sales_sample.csv (25 rida, 5 päeva)"*,
> ja esimene raport peab kontrollima, *kas periood (01–05.05.2026) ja stock_risk märge ("high" 4 päeval) on andmestikus tõesti õiged ja mitte müüja subjektiivne hinnang*.
