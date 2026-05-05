# UrbanStyle N4 — Sisu draftid (5 ühikut)

> **Mis see fail on:** viis AI-genereeritud sisuühikut, mis on koostatud `n4-code-node` workflow loogika järgi. Iga ühik vastab ühele päris CSV-rea kombinatsioonile (kampaania × sihtrühm × tooted) ja järgib `brand-voice-et.md` reegleid.
>
> **Kuidas neid kasutada:** kui sa enda n8n workflow käivitad, siis tulemus peaks **sarnanema** allolevale, mitte olema sõna-sõnalt sama. AI variatsioon on normaalne. Kui sinu väljund on radikaalselt erinev (näiteks lubab kliimaneutraalsust või kasutab 5 emoji), siis on midagi prompt'is valesti.
>
> **NB:** kõik allolevad on **AI esimene mustand**. Inimene-toimetaja peab need üle vaatama enne avaldamist — vt iga ühiku KVALITEEDIKONTROLL plokki.

---

## Sisuühik 1 — Instagram post

**Code node meta:**
- `promotion_id`: PR-03 Jätkusuutlik valik
- `segment_id`: SEG-06 Teadlikud noored
- `channel`: Instagram (segmendi eelistus)
- `products_featured`: US-P-301 Recycled tote kott
- `products_excluded`: (ükski selles kategoorias)

**AI väljund:**

```
KANAL: Instagram post
SIHTRÜHM: SEG-06 — Teadlikud noored

PEALKIRI: Üks kott, palju käike. Recycled tote.

TEKST:
Recycled tote on tehtud taaskasutatud materjalist — tugev, kerge,
mahutab argipäeva olulise.

Tööraamat ja jope. Turult tomatid ja leib. Jõusaalipusa ja veepudel.
Sama kott liigub sinuga kõikjale ja ei pea olema uus, et olla hea valik.

See on lihtne otsus, mis töötab kogu nädala. Materjal on eco-certified,
õmblused tugevad, lõige praktiline. Üks kott, mis ei karda igapäeva. 🌱

CTA: Tutvu teadliku valikuga.

HASHTAGID: #UrbanStyle #SlowFashion #TeadlikValik #RecycledTote

KVALITEEDIKONTROLL:
- Kasutasin ainult lubatud väiteid? Jah — "eco-certified" ja "praktilisus".
- Vältisin keelatud väiteid? Jah — ei lubanud süsinikuneutraalsust.
- Inimene peaks kontrollima: kas Recycled tote sertifikaat on praegu kehtiv
  ja avaldatav (eco-certified väide vajab konkreetset tõendit).
```

---

## Sisuühik 2 — Instagram story

**Code node meta:**
- `promotion_id`: PR-03 Jätkusuutlik valik
- `segment_id`: SEG-06 Teadlikud noored
- `channel`: Instagram story (käsitsi valitud override)
- `products_featured`: US-P-403 Travel pouch

**AI väljund:**

```
KANAL: Instagram story
SIHTRÜHM: SEG-06 — Teadlikud noored

PEALKIRI: Väike kott, suur kord.

TEKST:
Travel pouch — kaabel, võtmed, lipibalsam, kõik ühes kohas.
Sobib seljakotti, käekotti, kasvõi tagataskusse.
Eco-certified materjal, lihtne lõige, igapäevaks valmis. ✨

CTA: Tutvu teadliku valikuga.

HASHTAGID: #UrbanStyle #TravelPouch #EcoCertified

KVALITEEDIKONTROLL:
- Kasutasin ainult lubatud väiteid? Jah — "eco-certified" ja "praktilisus".
- Vältisin keelatud väiteid? Jah.
- Inimene peaks kontrollima: kas Story formaat (kuni 40 sõna) on saavutatud —
  praegu ~25 sõna, sobib. Kas tausta-pilt on toote oma või lifestyle?
```

---

## Sisuühik 3 — Email

**Code node meta:**
- `promotion_id`: PR-02 Tööpäeva stiil
- `segment_id`: SEG-02 Tartu silver kliendid
- `channel`: Email (segmendi eelistus)
- `products_featured`: US-P-201 Nordic chino püksid

**AI väljund:**

```
KANAL: Email
SIHTRÜHM: SEG-02 — Tartu silver kliendid

SUBJECT: Sirge lõikega chino — argipäev korras

TEKST (body):
Tere,

Nordic chino on meie meeste kollektsiooni kõige praktilisem mudel —
sirge lõige, hingav segamaterjal, mugav kogu päeva jooksul.

Mille jaoks see hästi sobib:
• Hommikune koosolek ja lõuna linnas
• Pärastlõunane jalutuskäik Emajõe ääres
• Õhtune kohtumine sõpradega

Lihtne kombineerida. Kanna valge T-särgiga, kui päev on argisem. Lisa
triibuline särk või kerge kampsun, kui kohtumiste tase tõuseb. Üks paar
pükse, mitu erinevat hommikut — sama lõige sobib Raekoja platsi
kohvikust koolimaja õuele.

Tartu Tasku keskuses on praegu kõik tavalisemad suurused saadaval.
E-poes on valik veelgi laiem ja tarne Tartusse jõuab 1–2 päevaga.

Materjal hingab, peseb hästi pesumasinas, lõige püsib pärast paljusid
pesusid. Hooldus lihtne, ese kestev.

CTA: Leia oma argipäeva lemmik.

Lugupidamisega,
UrbanStyle

HASHTAGID: (puudub — Email kanalil ei kasutata)

KVALITEEDIKONTROLL:
- Kasutasin ainult lubatud väiteid? Jah — "mugavus" ja "lihtne kombineerida".
- Vältisin keelatud väiteid? Jah — ei lubanud "ametlik dresscode garantii".
- Inimene peaks kontrollima: kas Tartu Tasku laoseis on saatmise hetkel
  endiselt kehtiv ("kõik tavalisemad suurused"). Kui ei, asenda see lause
  üldisema sõnastusega. Subject 38 tähemärki — sobib mobiilsele.
```

---

## Sisuühik 4 — Instagram post (premium toon)

**Code node meta:**
- `promotion_id`: PR-01 Kevadine garderoob
- `segment_id`: SEG-01 Tallinn gold kliendid
- `channel`: Instagram (segmendi eelistus)
- `products_featured`: US-P-101 Linen Flow kleit

**AI väljund:**

```
KANAL: Instagram post
SIHTRÜHM: SEG-01 — Tallinn gold kliendid

PEALKIRI: Linen Flow — kevad, mis kestab

TEKST:
Linane segus, mis hingab. Lõige, mis ei vananeda hooajaga. Linen Flow
kleit on osa meie uuest kevadkollektsioonist — esemed, mis lähevad
sujuvalt aprillist septembrini.

Kanna eraldi, lisa peenike vöö, kombineeri linase pintsakuga. Sama
kleit, kolm väljanägemist. Üks ese, mis ei lähe garderoobis kaduma.

Ajatu lõige, eesti kevadeks valitud toonid. Tehtud sertifitseeritud
tarnijalt, kantud aastaid. Detail, mida sa märkad alles teisel pilgul.

CTA: Vaata kevadkollektsiooni.

HASHTAGID: #UrbanStyle #LinenFlow #Kevadkollektsioon #SlowFashion

KVALITEEDIKONTROLL:
- Kasutasin ainult lubatud väiteid? Jah — "uus kollektsioon" ja
  "ajatud lõiked" on otsesõnu kohal.
- Vältisin keelatud väiteid? Jah — ei lubanud allahindlust ega
  piiramatut laoseisu.
- Inimese kontroll: 0 emoji on tahtlik (gold-segmendi premium toon).
  Kontrolli, et pildi-stiil sobib (studio-pilt, mitte lifestyle).
  Pealkiri 36 tähemärki, sobib.
```

---

## Sisuühik 5 — Facebook (uue poe avamine)

**Code node meta:**
- `promotion_id`: PR-04 Uue poe tervitus
- `segment_id`: SEG-04 Narva uued kliendid
- `channel`: Facebook (segmendi eelistus)
- `products_featured`: US-P-101 Linen Flow, US-P-201 Nordic chino, US-P-301 Recycled tote
  *(kolm toodet, üks igast kategooriast — "kohalik valik" tõestus)*

**AI väljund:**

```
KANAL: Facebook post
SIHTRÜHM: SEG-04 — Narva uued kliendid

PEALKIRI: Tere tulemast UrbanStyle Narva!

TEKST:
Meie uus pood Narva Fama keskuses on avatud — kohalik valik kvaliteetset
moodi naistele, meestele ja igapäeva aksessuaaridele.

Tule vaatama linast Linen Flow kleiti, Nordic chino pükse või Recycled
tote kotti. Kogu valik on koha peal proovida ja meeskond on kohal sind
aitama.

Esimene külastus on alati eriline — me ootame sind. 🌿

CTA: Külasta UrbanStyle Narva poodi.

HASHTAGID: (puudub — Facebook kanalil ei kasutata)

KVALITEEDIKONTROLL:
- Kasutasin ainult lubatud väiteid? Jah — "uus pood" ja "kohalik valik"
  on selgelt kohal.
- Vältisin keelatud väiteid? Jah — ei nimetanud konkreetset avamiskuupäeva
  ega täpseid lahtiolekuaegu, mis pole kinnitatud.
- Inimene peaks kontrollima: kas Fama keskuse aadress ja parkimisinfo
  tuleb kommentaaridesse panna? Kas FB-postile tehakse pinned-kommentaar
  lahtiolekuaegadega, kui need on kinnitatud?
```

---

## Mida nende 5 ühikuga edasi teha (portfooliotöö)

1. **Käivita oma n8n workflow** ja lase sellel genereerida samad 5 kombinatsiooni.
2. **Võrdle:** kas sinu väljundid järgivad sama struktuuri (KANAL / PEALKIRI / TEKST / CTA / HASHTAGID / KVALITEEDIKONTROLL)?
3. **Vali üks ühik** ja tee sellega päris human-in-the-loop:
   - Telegrami: kopeeri AI väljund
   - Saada Telegrami tagasi: `PARANDA: tee lühemaks ja vähem otseseks` (või muu)
   - Vaata, kuidas Ha+ feedback-loop seda muudab
4. **Logi `tagasiside.md`-sse:**
   - Mida AI tegi hästi
   - Mida sa inimese-toimetajana parandasid
   - Mida lisad järgmisesse system prompt'i versiooni

See viimane samm on portfooliotöö **kõige väärtuslikum osa**. AI-genereeritud drafte oskab teha igaüks. Inimese-AI koostöö dokumenteerimine — see on see, mis eristab töötava süsteemi demonstratsioonist.

---

## Disainimärkused (mida AI siin tegi tahtlikult)

**Emoji ja toon segmenditi:**
- SEG-01 Tallinn gold (premium): 0 emoji. Sõnavara aeglane, "ajatu", "detail mida märkad teisel pilgul".
- SEG-06 Teadlikud noored (energiline): 1 emoji (🌱, ✨). Konkreetsed argipäeva näited.
- SEG-04 Narva uued (kutsuv): 1 emoji (🌿). Sõbralik aga mitte familiaarne.
- SEG-02 Tartu silver (selge): 0 emoji. Bullet-list praktilisuse jaoks.

**Toode-fookus:**
- Iga ühik **ei nimeta kõiki saadaval olevaid tooteid**. Üks ühik = 1–3 toodet maksimaalselt. See on tahtlik — postitused, kus on 8 toodet, ei müü ühtegi.
- US-P-202 Merino kampsun (9 tk laos, "ära luba laialdast saadavust") **ei esine üheski** ühikus. Kui sinu workflow seda mainib, on Code node'i filter katki.

**Konkreetsus üle abstraktsuse:**
- "Emajõe ääres", "Raekoja plats", "Fama keskus" — eesti kohad, eesti kontekst.
- "Tööraamat ja jope, turult tomatid ja leib" — konkreetsed argipäeva olukorrad, mitte "lifestyle" abstraktsioon.

See on sama pikkusega tekst kui "find your perfect bag", aga on lugejal mälus. Brand voice mõte ongi see.
