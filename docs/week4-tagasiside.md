# tagasiside.md — N4 sisuloome workflow esimese käivituse läbivaatus

> **Mis see fail on:** päris human-in-the-loop episood. AI lõi mustandi, inimene-toimetaja vaatas üle, leidis vead, parandas, dokumenteeris.
>
> **Miks see on portfooliotöö kõige tähtsam fail:** AI-i sisuloome demosid oskab teha igaüks. Inimese-AI koostöö dokumenteerimine — see on see, mis eristab töötava süsteemi prototüübist.
>
> **Käivituse aeg:** N4 nädala lõpuosa, esimene Ha-taseme end-to-end test.

---

## 1. Käivituse parameetrid

**Sisend (vorm):**

| Väli | Väärtus |
|---|---|
| Kampaania | Jätkusuutlik valik (PR-03) |
| Sihtrühm | Teadlikud noored (SEG-06) |
| Kanal | (tühi → Code node valis Instagram segmendi eelistuse järgi) |
| Põhisõnum | "Recycled tote kevadeks" |

**Code node andmed AI-le:**

- `tone_hint`: "energiline aga mitte ülemüüdud"
- `allowed_claims`: "eco-certified tooted, praktilisus"
- `do_not_claim`: "100% süsinikuneutraalsus"
- `cta_default`: "Tutvu teadliku valikuga"
- `products_featured`: US-P-301 Recycled tote (120 tk), US-P-403 Travel pouch (65 tk), US-P-302 Minimal nahkvöö (26 tk)
- `products_excluded_by_inventory`: (puudub, kuna PR-03 kontekstis "aksessuaarid" pole märgitud "ära luba laialdast")

---

## 2. AI-i väljund (saadeti Telegrami)

```
PEALKIRI: Vali jätkusuutlikud aksessuaarid kevadeks!

TEKST: Tervituseks kevad! Kevad on aeg uuesti tunda elu ja vabastuda
talve pimedast. Aga mis on kevad ilma jätkusuutliku stiili? Üksmeele
meie teadlikud noored! Vali meie eco-certified aksessuaarid, mis on
valmistatud taaskasutatud materjalistest kottadest või lihtsaid,
kvaliteetsed vöödest.

CTA: Tutvu teadliku valikuga

HASHTAGID: #jätkusuutlikvalik #teadlikkliendid #kevad2024

KUVING: Vaadake, kuidas meie aksessuaarid võimaldavad teil olla
stiilne ja jätkusuutlik! kuvidega

VÕIMALIKUD TOOTED (valitud 2):
- US-P-301 Recycled tote kott (29€, eco)
- US-P-403 Travel pouch (24€, eco)

MÄRKUS: Osta meie jätkusuutlike aksessuaaridega ja toeta taaskasutust!
```

---

## 3. Mida AI tegi õigesti ✅

| Reegel | Kontroll | Tulemus |
|---|---|---|
| CTA `promotions.csv`-st | "Tutvu teadliku valikuga" | ✅ sõna-sõnalt õige |
| Lubatud claim'id | "eco-certified", "taaskasutatud materjal" | ✅ |
| Keelatud claim'id | süsinikuneutraalsus, kliimaneutraalsus | ✅ vältis |
| Allahindluse keeld | "kuni -50%" piiri pidamine | ✅ ei lubanud allahindlust |
| Featured tooted CSV-st | US-P-301, US-P-403 | ✅ kasutas Code node andmeid |
| Inventory filter | US-P-202 Merino välistamine | ✅ ei mainitud (filter töötab) |

**Süsteemi tugev koht:** Code node tagas, et AI sai õiged sisendid. Kõik **fakti-tasemel** vastab brand voice'ile ja CSV reeglitele. See on Ha-taseme põhitõestus.

---

## 4. Mida AI tegi valesti ❌

### 4.1 Eesti keele hallutsinatsioonid

AI kasutas sõnu, mida eesti keeles **pole** või mis tähendavad midagi muud.

| AI väljund | Probleem | Õige variant |
|---|---|---|
| *"Üksmeele meie teadlikud noored"* | `üksmeel` = konsensus, mitte "üksildus" või "ainsuse". Ebaloogiline lause. | *"Tere, teadlikud noored"* või lihtsalt jäta välja |
| *"Tervituseks kevad!"* | grammatiliselt vale | *"Tere kevad!"* või *"Kevad on käes."* |
| *"vabastuda talve pimedast"* | käändevorm vale | *"vabaneda talve pimedusest"* |
| *"materjalistest kottadest või lihtsaid, kvaliteetsed vöödest"* | seestütlev/omastav käände kokku ei lähe | *"materjalist kottidest või kvaliteetsest nahast vöödest"* |
| *"KUVING:"* | seda sõna pole eesti keeles | (kustutada — pole väljastusspetsifikaadis) |

> **Inimese-toimetaja õppetund:** AI suudab tabada sõnavara üldjoones, aga **käänded ja loomulikud fraasid** on selle nõrk koht. Eesti keele tekstides peab inimene lugema iga lause grammatiliselt läbi.

### 4.2 Väljundformaat ei vasta spetsifikaadile

System prompt nõudis:
```
KANAL / SIHTRÜHM / PEALKIRI / TEKST / CTA / HASHTAGID / KVALITEEDIKONTROLL
```

AI andis:
```
PEALKIRI / TEKST / CTA / HASHTAGID / KUVING / VÕIMALIKUD TOOTED / MÄRKUS
```

**Vahed:**
- ❌ Puudub `KANAL` ja `SIHTRÜHM` (vaja inimese-toimetajale konteksti jaoks)
- ❌ Puudub `KVALITEEDIKONTROLL` blokk (AI ei teinud enesekontrolli — see on **Ha-taseme süda**)
- ❌ Lisatud `KUVING`, `VÕIMALIKUD TOOTED`, `MÄRKUS` mida ei tellitud
- ❌ `VÕIMALIKUD TOOTED` plokk on user prompt'i päise kopeering — AI taasesitas oma sisendi, mitte ei loonud sisu

### 4.3 Aastaarvu hallutsinatsioon

**Hashtag `#kevad2024`** — käivitamine toimus aastal **2026**. AI kasutas vananenud aastaarvu oma treeninguandmetest. Avaldamiseks see hashtag ei sobi — kohe kustutada või asendada `#kevad`-iga (ajatu).

### 4.4 Toon kohati liiga müügilik

*"MÄRKUS: Osta meie jätkusuutlike aksessuaaridega ja toeta taaskasutust!"* — algab käskiva sõnaga "Osta", mis on otseselt vastuolus brand voice'i reegliga *"rahulik ja aus, ei mingit survet ega agressiivset müüki"*.

---

## 5. Inimese-toimetaja parandatud versioon

```
KANAL: Instagram post
SIHTRÜHM: SEG-06 — Teadlikud noored

PEALKIRI: Aksessuaar, mis kestab kevadest sügiseni

TEKST:
Eco-certified materjal, lihtne lõige, igapäevaks tehtud.

Recycled tote kott on meie vastus küsimusele: kas kott peab olema uus,
et olla hea? Ei pea. Sama kott, mis sobib turule, raamatukogusse ja
nädalavahetuse väljasõidule.

Travel pouch hoiab tarvikud korras — väike, aga vajalik. 🌱

CTA: Tutvu teadliku valikuga

HASHTAGID: #UrbanStyle #SlowFashion #TeadlikValik #Kevad

KVALITEEDIKONTROLL (inimese-toimetaja kontroll):
- Lubatud väited kasutatud? Jah — eco-certified, praktilisus.
- Keelatud väited välditud? Jah.
- Toon? Soe, selge, teadlik. Ei ole müügilik.
- Eesti keel? Loomulik, käänded korras.
- Kontroll enne avaldamist: Recycled tote sertifikaadi kehtivus.
```

---

## 6. Mida muuta järgmise iteratsiooni system prompt'is

Need 4 parandust läheksid otse Code node'i `systemPrompt` muutujasse:

1. **Lisada käsk eesti keele kontrolliks:**
   ```
   ENNE väljundi lõpetamist: kontrolli, et iga lause on grammatiliselt
   korrektne eesti keeles. Erilise tähelepanuga käänded ja kokku-lahku
   kirjutamine.
   ```

2. **Tugevdada formaadi reeglit:**
   ```
   VÄLJUNDFORMAAT on RANGE. Kasuta TÄPSELT need 7 plokki, selles
   järjekorras: KANAL / SIHTRÜHM / PEALKIRI / TEKST / CTA / HASHTAGID /
   KVALITEEDIKONTROLL. ÄRA lisa muid plokke (KUVING, MÄRKUS, jne).
   ```

3. **Keelata aastaarvud hashtag'ides:**
   ```
   Hashtag'ides ÄRA kasuta aastaarve (#kevad2024 jne). Kasuta üldisi
   silte (#kevad, #suvi).
   ```

4. **Tugevdada keskkonna teadlikkust:**
   ```
   Praegune kuupäev tuleb $now muutujast. Hashtag'ide ja viidete jaoks
   kasuta ainult seda, mitte oma treeningandmete aastat.
   ```

5. **(Bonus, Ha+ tasemele):** lisada few-shot example'id system prompt'i — kaks "õige" draftit ja üks "vale" mille AI peaks ära tundma. See vähendab hallutsinatsiooni 30-50%.

---

## 7. Mida õpetab see N4 kogemus laiemalt

**Tehniline:**
- Code node + CSV lookup töötab täpselt nii, nagu disainisin: AI ei välja mõtelnud claim'e, kasutas ainult lubatud sõnavara, vältis keelatud lubadusi.
- AI hallutsinatsioonid on **stiili ja vormi** tasemel, mitte fakti-tasemel. Code node lahendab fakti-poole. Inimene-toimetaja lahendab stiili-poole.
- Telegram on hea human-in-the-loop kanal: 30 sekundit silmadega üle vaadata, otsus "avaldada / parandada / loobuda" on selge.

**Disainiline:**
- "AI loob 20 ühikut nädalas" pole võrdne "20 head ühikut nädalas". Inimene-toimetaja roll ei kao — see kasvab. Kuid kontroll on **kiirem kui kirjutamine**, mis ongi Ha-taseme võit.
- Brand voice ei ole PDF, mida loetakse üks kord. See on kood, mis läheb iga genereerimise prompt'i, ja mida uuendatakse iga inimese paranduse järel.

**Programmilise:**
- N3 setup'i (Form → Telegram) ilma N4-d ei oleks. Setup-võlg on reaalne.
- "Tee paremas süsteemis" pole abstraktne loosung. See on konkreetselt: brand voice + CSV + Code node + AI + human review + tagasiside-fail. Iga element kannab kaalu.

---

## 8. Järgmise iteratsiooni TODO

- [ ] Uuendada Code node'i `systemPrompt` muutujat punktidega 1–4 ülaltoodud
- [ ] Käivitada workflow uuesti sama briefiga, võrrelda väljundeid
- [ ] Kui paranduste % vähenes märgatavalt → lisada veel 4 erinevat brief'i (kokku 5 sisuühikut)
- [ ] Logida iga draft + parandus eraldi `tagasiside.md` kirjena (versioneerida: v1, v2, v3...)
- [ ] Kui 5 draft'i on vaja vähem kui 5 minutit per ühik → süsteem on valmis tootmiseks (sisemiselt, mitte avalikult)

---

*Dokumenteeris: portfooliotöö autor*
*Reviewer (kaasus): Anna Mets, turundusjuht, UrbanStyle.ltd*
*Süsteemi-omanik: Toomas, operatsioonid*
*Kuupäev: N4 nädala lõpp*
