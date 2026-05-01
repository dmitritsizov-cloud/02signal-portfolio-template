# Nädal 3 — Esimene automatiseerimine: UrbanStyle FAQ Telegram Bot

> **Workflow file:** [`workflows/week3.json`](../workflows/week3.json)
> **Telegram bot:** [@DmitriTsizov_bot](https://t.me/DmitriTsizov_bot)
> **Status:** ✅ Töötab

---

## 🎯 Probleem

UrbanStyle.ltd (4 kauplust, ~3000 aktiivset klienti) klienditeenindus kulutab umbes 40% ajast samadele põhiküsimustele vastates: lahtiolekuajad, tarne, tagastuspoliitika, suurused. Kompleksed kliendipäringud jäävad ootama, samal ajal kui tiim vastab "millal pood lahti on?" 50ndat korda.

Numbrid:
- ~3000 aktiivset klienti × keskm. 2 päringut/aasta = **6000 päringut/aasta**
- ~75% on korduvad lihtküsimused (FAQ-tüüpi)
- Klienditeenindaja keskmine käsitlusaeg: **8 minutit/päring**
- Manuaalne kulu: **600 töötundi/aasta** ainult FAQ-le

## 💡 Lahendus — kihtidena ehitatud automatiseerimine

Selle nädala eesmärk pole lõplik FAQ bot, vaid **alus**, millele järgnevatel nädalatel ehitada. Spiraalõppe loogika:

| Nädal | Lisand | Tulemus |
|---|---|---|
| **N3 (praegu)** | Manual Trigger → Telegram | Automatiseerimise alus töötab |
| N4 | + AI node (Groq/Claude) | Bot vastab loomulikult, mitte malliga |
| N5 | + Google Sheets logimine | Andmepõhine — näeme sagedasi küsimusi |
| N6 | + Eskalatsiooniloogika | Bot teab oma piire — kompleksed läheb inimesele |

## 🔧 Tehniline arhitektuur (N3 versioon)

```
[Manual Trigger]  ──→  [Telegram: Send Message]  ──→  📱 @DmitriTsizov_bot
   (n8n)                  (sendMessage)              UrbanStyle FAQ
```

**Komponendid:**
- **Bot platvorm:** Telegram Bot API (BotFather)
- **Workflow:** n8n.02signal.com
- **Credential:** Telegram API (token salvestatud n8n credentials, mitte koodis)
- **Trigger:** Manual (asendub N4-s Form Trigger'iga)
- **Action:** Telegram → Send Message

## 🎨 Brändikogemus

Lisaks tehnilisele osale seadistasin BotFather'iga ka boti välimuse:
- **Display name:** UrbanStyle FAQ
- **Description:** *"UrbanStyle klienditeeninduse bot. Küsi meilt lahtiolekuaegade, tagastuspoliitika ja tooteinformatsiooni kohta."*
- **About text:** *"UrbanStyle FAQ — vastame teie küsimustele 24/7"*
- **Profile picture:** UrbanStyle brändiga sobiv pilt

See pole "pisiasi" — kui klient avab boti esimest korda, näeb ta kohe brändilist kogemust, mitte tühja "test" botti. Sama loogika nagu poe vitriiniga: esimene mulje määrab usalduse.

## 📊 FAQ kategooriad (täislahenduse jaoks)

Põhineb projekti `faq_30.json` andmestikul — 30 küsimust 8 kategoorias:

| Kategooria | Küsimuste arv | Näide |
|---|---|---|
| Üldinfo | 5 | "Mis on UrbanStyle?" |
| Tooted ja hinnad | 5 | "Milline on hinnatase?" |
| Tellimused ja tarne | 5 | "Kui kiiresti kohale jõuab?" |
| Tagastused | 4 | "Milline on tagastuspoliitika?" |
| Lojaalsusprogramm | 3 | "Kuidas liituda?" |
| Jätkusuutlikkus | 3 | "Mis on ringlussevõtu programm?" |
| Klienditeenindus | 3 | "Millal on kauplused avatud?" |
| E-pood | 2 | "Kas saab maksta järelmaksuga?" |

Tüüpiline FAQ bot katab 70-80% kõigist kliendipäringutest — täpselt see osa, mis võtab kõige rohkem aega ja annab kõige vähem väärtust inimesega.

## 💰 Eeldatav äriline mõju

**Konservatiivne hinnang täislahendusele (pärast N6):**

- Bot katab 75% päringutest → **4500 automaatset vastust/aasta**
- Säästetud aeg: 4500 × 8 min = **600 töötundi/aastas**
- Lisaboonus: **24/7 kättesaadavus** — eriti väärtuslik õhtustel ja nädalavahetustel, kui klienditugi suletud
- Kvaliteet: kiirem vastus + järjekindel info = kõrgem kliendi rahulolu

## ⚠️ Riskid ja maandus

Bisnes-vaade ei lõpe "see töötab" hetkel. Mida pean järgmistel nädalatel arvestama:

| Risk | Mõju | Maandus |
|---|---|---|
| AI hallutsinatsioonid | Bot annab valeinfot → brändirisk | Range prompt: "ainult `faq_30.json` põhjal, kui ei tea, ütle nii" |
| Halb tonaalsus | Bot kõlab robootiliselt | A/B testimine eri prompt-stiilidega |
| GDPR (Toomas Pärni mure) | Sõnumid sisaldavad isikuandmeid | Logime ainult küsimuse sisu, säilitusperiood max 30 päeva |
| Token leke | Keegi saab kontrolli boti üle | Token ainult n8n credentials'is, kunagi mitte avalikult, sealhulgas mitte exporditud `.json` failis |

## 📚 Mida ma õppisin

**1. Tehniline:** Iga automatiseerimine = **trigger** + **action**. See lihtne ahel on alus kõigele.

**2. BotFather kahe-etapiline loogika:** Käsud nagu `/setname` küsivad **kõigepealt boti valikut nupuga**, alles seejärel uut väärtust. Kui kirjutad uue nime kohe, saad "Invalid bot selected". Tegin selle vea esmakordselt — õppetund.

**3. Bisnes-mõtteviis:** Telegram bot ilma n8n-ita on "telefon ilma rakenduseta" — bot eksisteerib, aga ei tee midagi. Sama tööriist, kaks tasandit — tehniline funktsionaalsus ja brändikogemus.

**4. Turvalisus:** API token on parool. n8n credentials hoiab seda turvaliselt. **Mitte kunagi** mitte pushida tokenit avalikku Git'i — sama loogika nagu paroolide hoidmisega.

**5. Infrastruktuur, mitte tööriist:** Sama Telegram credential kasutan järgmistel nädalatel kõiges. N3 ei ole isoleeritud ülesanne — see on alus kogu programmi jaoks.

---

*Materjalid: [`faq_30.json`](https://github.com/02signal/datasets), [`02S Nädal 3 töövihik`](https://github.com/02signal/programm)*
