# UrbanStyle N4 — Ha-taseme Code node (CSV-lookup)

> **Mida see node teeb:** võtab Form Trigger'i sisendi (sihtrühm + kampaania + sõnum), otsib CSV-andmetest reaalsed väärtused (`allowed_claims`, `do_not_claim`, `tone_hint`, `inventory_note`), filtreerib madala laoseisuga tooted välja ja koostab AI mudelile struktureeritud system + user prompt'i.

> **Workflow asukoht:** `Form Trigger → [SEE Code node] → AI Agent / Groq node → Telegram node`

---

## 1. Vormi väljad (Form Trigger)

Asenda olemasoleva template'i Form Trigger nendega. Kõik `requiredField: true`.

| Väli | Tüüp | Valikud / näide |
|---|---|---|
| **Kampaania** | dropdown | `Kevadine garderoob` · `Tööpäeva stiil` · `Jätkusuutlik valik` · `Uue poe tervitus` · `E-poe nädal` · `Capsule wardrobe` |
| **Sihtrühm** | dropdown | `Tallinn gold kliendid` · `Tartu silver kliendid` · `Pärnu suveostjad` · `Narva uued kliendid` · `E-poe korduvostjad` · `Teadlikud noored` |
| **Kanal** | dropdown | `(automaatne)` · `Instagram` · `Email` · `Facebook` · `Tootekirjeldus` |
| **Põhisõnum** | textarea | nt. *"Recycled tote kotile fookus, kevadine teadlik valik"* |

> **NB:** dropdown'i väärtused **peavad täpselt vastama** CSV-tabelite `segment_name` ja `promotion_name` veerule. Üks tähemärk valesti → "ei leitud" viga.

---

## 2. Code node — kogu JavaScript

Kopeeri kogu allolev plokk n8n-i `Code` node'i (Mode: **Run Once for All Items**, Language: **JavaScript**).

```javascript
// =================================================================
// UrbanStyle N4 — Ha-taseme CSV lookup
// Form Trigger → [SEE NODE] → AI node → Telegram
// =================================================================

// --- 1. CSV-andmed (kõvastiseatud demo jaoks) ---

const SEGMENTS = [
  { id: "SEG-01", name: "Tallinn gold kliendid",  city: "Tallinn", tier: "gold",   main_need: "kvaliteetsed ja ajatud esemed", channel: "Instagram", tone: "premium ja inspireeriv" },
  { id: "SEG-02", name: "Tartu silver kliendid",  city: "Tartu",   tier: "silver", main_need: "praktiline argimood",            channel: "Email",     tone: "selge ja kasulik" },
  { id: "SEG-03", name: "Pärnu suveostjad",       city: "Pärnu",   tier: "bronze", main_need: "kerged kevad- ja suveriided",    channel: "Instagram", tone: "soe ja hooajaline" },
  { id: "SEG-04", name: "Narva uued kliendid",    city: "Narva",   tier: "new",    main_need: "usaldus ja poe tutvustus",       channel: "Facebook",  tone: "lihtne ja kutsuv" },
  { id: "SEG-05", name: "E-poe korduvostjad",     city: "online",  tier: "gold",   main_need: "kiire valik ja sobivus",         channel: "Email",     tone: "personaalne ja konkreetne" },
  { id: "SEG-06", name: "Teadlikud noored",       city: "online",  tier: "silver", main_need: "jätkusuutlikkus ja stiil",       channel: "Instagram", tone: "energiline aga mitte ülemüüdud" },
];

const PROMOTIONS = [
  { id: "PR-01", name: "Kevadine garderoob",  context: "naiste riided", offer: "Uus kevadkollektsioon on e-poes ja poodides",      allowed: "uus kollektsioon, ajatud lõiked",     forbidden: "allahindlust või piiramatut laoseisu",     cta: "Vaata kevadkollektsiooni" },
  { id: "PR-02", name: "Tööpäeva stiil",      context: "meeste riided", offer: "Valik mugavaid kontori- ja linnariideid",          allowed: "mugavus, lihtne kombineerida",        forbidden: "ametlik dresscode garantii",               cta: "Leia oma argipäeva lemmik" },
  { id: "PR-03", name: "Jätkusuutlik valik",  context: "aksessuaarid",  offer: "Eco-certified aksessuaarid teadlikule kliendile",  allowed: "eco-certified tooted, praktilisus",   forbidden: "100% süsinikuneutraalsus",                 cta: "Tutvu teadliku valikuga" },
  { id: "PR-04", name: "Uue poe tervitus",    context: "Narva",         offer: "Narva poe avamise tutvustuskampaania",             allowed: "uus pood, kohalik valik",             forbidden: "täpseid avamisaegu ilma kinnitatud infota", cta: "Külasta UrbanStyle Narva poodi" },
  { id: "PR-05", name: "E-poe nädal",         context: "online",        offer: "E-poes esile tõstetud hooajatooted",               allowed: "mugav ostmine, kiire valik",          forbidden: "tasuta tarne, kui seda ei ole briefis",    cta: "Vaata e-poe valikut" },
  { id: "PR-06", name: "Capsule wardrobe",    context: "naiste riided", offer: "Baasesemed, mida saab kombineerida mitmel viisil", allowed: "ajatus, kombineeritavus",             forbidden: "üks ese sobib kõigile",                    cta: "Ehita oma capsule wardrobe" },
];

const PRODUCTS = [
  { id: "US-P-101", name: "Linen Flow kleit",     category: "naiste riided", price: 89,  eco: true,  msg: "hingav linasest segust kleit",   angle: "ajatu kevadine garderoob" },
  { id: "US-P-102", name: "City Soft bleiser",    category: "naiste riided", price: 119, eco: false, msg: "pehme kontoribleiser",            angle: "tööpäevast õhtuni" },
  { id: "US-P-103", name: "Everyday rib top",     category: "naiste riided", price: 34,  eco: true,  msg: "mugav baastopp",                  angle: "capsule wardrobe alus" },
  { id: "US-P-201", name: "Nordic chino püksid",  category: "meeste riided", price: 79,  eco: false, msg: "sirge lõikega chino",             angle: "praktiline argistiil" },
  { id: "US-P-202", name: "Merino light kampsun", category: "meeste riided", price: 99,  eco: true,  msg: "kerge meriinovill",               angle: "kihiline kevadriietus" },
  { id: "US-P-203", name: "Urban overshirt",      category: "meeste riided", price: 69,  eco: false, msg: "särkjakk linnaliikumiseks",       angle: "üks ese mitmeks olukorraks" },
  { id: "US-P-301", name: "Recycled tote kott",   category: "aksessuaarid",  price: 29,  eco: true,  msg: "taaskasutatud materjalist kott",  angle: "igapäevane teadlik valik" },
  { id: "US-P-302", name: "Minimal nahkvöö",      category: "aksessuaarid",  price: 39,  eco: false, msg: "lihtne kvaliteetne vöö",          angle: "väike detail, suur mõju" },
  { id: "US-P-303", name: "Soft scarf sall",      category: "aksessuaarid",  price: 45,  eco: true,  msg: "pehme kevadsall",                 angle: "värv ja mugavus" },
  { id: "US-P-401", name: "Studio denim jacket",  category: "naiste riided", price: 109, eco: false, msg: "klassikaline teksajakk",          angle: "kevadine üleminekukiht" },
  { id: "US-P-402", name: "Relaxed linen shirt",  category: "meeste riided", price: 74,  eco: true,  msg: "linasegune suvesärk",             angle: "hingav ja rahulik stiil" },
  { id: "US-P-403", name: "Travel pouch",         category: "aksessuaarid",  price: 24,  eco: true,  msg: "väike tarvikute kott",            angle: "korrahoid liikumisel" },
];

const INVENTORY = [
  { id: "US-P-101", online: 42,  note: "sobib kampaaniasse" },
  { id: "US-P-102", online: 12,  note: "kasuta ettevaatlikult, madalam laoseis" },
  { id: "US-P-103", online: 80,  note: "sobib suurema nähtavusega kampaaniasse" },
  { id: "US-P-201", online: 30,  note: "sobib kampaaniasse" },
  { id: "US-P-202", online: 9,   note: "ära luba laialdast saadavust" },
  { id: "US-P-203", online: 36,  note: "sobib kampaaniasse" },
  { id: "US-P-301", online: 120, note: "sobib kampaaniasse" },
  { id: "US-P-302", online: 26,  note: "sobib piiratud fookusega kampaaniasse" },
  { id: "US-P-303", online: 18,  note: "kasuta ettevaatlikult" },
  { id: "US-P-401", online: 21,  note: "sobib väiksema kampaaniaga" },
  { id: "US-P-402", online: 33,  note: "sobib kampaaniasse" },
  { id: "US-P-403", online: 65,  note: "sobib kampaaniasse" },
];


// --- 2. SISEND VORMIST ---

const form = $input.first().json;

const segmentInput    = (form["Sihtrühm"]  || "").trim();
const promotionInput  = (form["Kampaania"] || "").trim();
const customMessage   = (form["Põhisõnum"] || "").trim();
const channelOverride = (form["Kanal"]     || "").trim();


// --- 3. CSV-otsing ---

const segment   = SEGMENTS.find(s => s.name === segmentInput);
const promotion = PROMOTIONS.find(p => p.name === promotionInput);

if (!segment) {
  throw new Error(`Sihtrühma "${segmentInput}" ei leitud. Kontrolli vormi dropdown'i väärtusi.`);
}
if (!promotion) {
  throw new Error(`Kampaaniat "${promotionInput}" ei leitud. Kontrolli vormi dropdown'i väärtusi.`);
}


// --- 4. KANAL ---

const ALLOWED_CHANNELS = ["Instagram", "Email", "Facebook", "Tootekirjeldus"];
const channel = ALLOWED_CHANNELS.includes(channelOverride) 
  ? channelOverride 
  : segment.channel;


// --- 5. TOOTEVALIK + LAOSEISU FILTER ---

const KATEGORIAD = ["naiste riided", "meeste riided", "aksessuaarid"];
const isCategoryContext = KATEGORIAD.includes(promotion.context);

let candidates = PRODUCTS;
if (isCategoryContext) {
  candidates = PRODUCTS.filter(p => p.category === promotion.context);
}
// Kui context on "online" või linn (nt "Narva"), kasutame kõiki kategooriaid.

const enriched = candidates.map(p => {
  const inv = INVENTORY.find(i => i.id === p.id) || { online: 0, note: "puudub" };
  return { ...p, inventory_note: inv.note, online_stock: inv.online };
});

// Reegel: tooted märkega "ära luba laialdast" → välistame täielikult.
const excluded = enriched.filter(p => p.inventory_note.includes("ära luba laialdast"));
const safe     = enriched.filter(p => !p.inventory_note.includes("ära luba laialdast"));

// Top 3 laoseisu järgi.
const featured = safe.sort((a, b) => b.online_stock - a.online_stock).slice(0, 3);


// --- 6. AI SYSTEM PROMPT ---

const systemPrompt = `Sa oled UrbanStyle.ltd turundusassistent.
Brand voice: soe, selge, teadlik. Kõik tekstid eesti keeles.

KOHUSTUSLIKUD REEGLID:
- Toon: ${segment.tone}
- Lubatud väited (kasuta ainult neid!): ${promotion.allowed}
- KEELATUD väited: ${promotion.forbidden}
- Maksimaalselt 2 emoji ja 1 hüüumärk kogu postituse kohta.
- Ära luba allahindlust, tasuta tarnet ega kliimaneutraalsust, kui see pole briefis.
- Vaikimisi CTA: ${promotion.cta}

VÄLJUNDFORMAAT (range struktuur — Telegram'is kiiresti ülevaadatav):
KANAL: ${channel}
SIHTRÜHM: ${segment.id} — ${segment.name}
PEALKIRI: [üks rida, kuni 60 tähemärki]
TEKST: [Instagram post 60–90 sõna · Email body 100–180 sõna · Story 20–40 sõna · Tootekirjeldus 80–120 sõna]
CTA: [täpselt üks rida]
HASHTAGID: [Instagram'is 3–5; muudel kanalitel jäta tühjaks]

KVALITEEDIKONTROLL (vastusta endale ausalt):
- Kasutasin ainult lubatud väiteid? [jah/ei]
- Vältisin keelatud väiteid? [jah/ei]
- Mida peaks inimene-toimetaja enne avaldamist üle kontrollima?`;


// --- 7. AI USER PROMPT (kampaania brief) ---

const productLines = featured.map(p => 
  `  - ${p.id} ${p.name} (${p.category}, ${p.price}€${p.eco ? ", eco" : ""}) — ${p.msg} | märkus: ${p.inventory_note}`
).join("\n");

const userPrompt = `KAMPAANIA: ${promotion.name} (${promotion.id})
PROMO KIRJELDUS: ${promotion.offer}

SIHTRÜHM: ${segment.name} (${segment.id})
PEAMINE VAJADUS: ${segment.main_need}
KANAL: ${channel}

VÕIMALIKUD TOOTED (vali 1–2, ÄRA viita kõigile korraga):
${productLines}

KASUTAJA SÕNUM: ${customMessage || "(brief puudub — kasuta promo kirjeldust aluseks)"}

Koosta üks sisuühik ülaltoodud formaadi järgi.`;


// --- 8. VÄLJUND ---

return [
  {
    json: {
      ai_system_prompt: systemPrompt,
      ai_user_prompt: userPrompt,

      meta: {
        promotion_id: promotion.id,
        promotion_name: promotion.name,
        segment_id: segment.id,
        segment_name: segment.name,
        channel: channel,
        products_featured: featured.map(p => p.id),
        products_excluded_by_inventory: excluded.map(p => p.id),
      },

      telegram_header: `📋 ${promotion.name} → ${segment.name} (${channel})\nTooted: ${featured.map(p => p.id).join(", ") || "(ei leitud)"}`,
    }
  }
];
```

---

## 3. Järgmise AI node'i seadistus

**Kui kasutad Groq / OpenAI Chat Model node'i:**

| Väli | Väärtus |
|---|---|
| Mudel | `llama-3.3-70b-versatile` (Groq) või `gpt-4o-mini` (OpenAI) |
| Süsteem (System) | `={{ $json.ai_system_prompt }}` |
| Sõnum (User) | `={{ $json.ai_user_prompt }}` |
| Temperature | `0.5` (madalam = ettearvatavam, kõrgem = loovem) |

**AI node väljund** läheb edasi Telegram node'i, mis võtab:
- `={{ $('Code').item.json.telegram_header }}\n\n{{ $json.message.content }}`

(See annab Telegram'is päise + AI väljundi koos.)

---

## 4. Mida see Code node tegelikult lahendab

Three things mis muudavad selle Ha-tasemeks (mitte Shu):

1. **AI ei väljamõtle reegleid** — `allowed_claims` ja `do_not_claim` tulevad otse `promotions.csv`-st. Kui Anna Mets uuendab tabelit, muutub AI käitumine ilma prompt'i puudutamata.

2. **Madala laoseisuga tooted on automaatselt välistatud** — `US-P-202 Merino` (9 tk, "ära luba laialdast saadavust") ei jõua kunagi AI prompt'i. See on pärisbisnise reegel: ära reklaami seda, mida sa ei suuda kohe tarnida.

3. **Kanal valitakse segmendi eelistuse järgi** — kui kasutaja jätab "Kanal" tühjaks, võtab Code node `customer_segments.csv`-st `preferred_channel`. See on personaliseerimise alus.

---

## 5. Tüüpilised vead ja lahendused

| Viga | Põhjus | Lahendus |
|---|---|---|
| `Sihtrühma "X" ei leitud` | vormi dropdown'i tekst erineb CSV-st | Kontrolli täpset õigekirja (`ä ö ü õ`!), eriti `Pärnu suveostjad` |
| AI väljund tuleb inglise keeles | system prompt'i eiratud | Lisa `Temperature: 0.3` ja kontrolli, et System väli on seotud `$json.ai_system_prompt`-ga, mitte tühi |
| Telegram saab ainult päise, AI vastust pole | viide AI node'ile vale | Kontrolli, et Telegram node viitab AI node'i `message.content`-ile, mitte Code node'ile |
| `featured` on tühi massiiv | promo `context` ei klapi ühegi tootega | Kontrolli `promotion.context` vs `product.category` — peavad olema identsed sõnastuses |
| AI lisab emoji rohkem kui lubatud | reegel pole prompt'is piisavalt range | Lisa system prompt'i lõppu: `KUI kasutad rohkem kui 2 emoji, draft on automaatselt vigane.` |

---

## 6. Edasiarendus (kui jõuad Ha+ tasemele)

Praegu on andmed Code node'is kõvastiseatud. **Reaalses tootmises** asendaksid selle nii:

1. **CSV-failid Drive'is või GitHub'is** → `HTTP Request` node tõmbab toore CSV'i
2. **Spreadsheet File** node parsib CSV → `Code` node saab juba parsitud massiivi
3. **Cache 1h** — n8n `Static Data` API hoiab tabeleid mälus, ei pärida iga kord uuesti

See muudab voog *päris* andmebaasi-laadseks, aga **portfooliotöö jaoks pole vaja**. Demonstreeri Ha-tase kõvastiseatud andmetega — kood on selgem ja review käib kiiremini.

---

## 7. Test enne 5 sisuühiku genereerimist

Tee üks test käsitsi enne kui hakkad 5x käivitama:

1. Vorm → vali `Jätkusuutlik valik` + `Teadlikud noored` + Põhisõnum: *"Kevadine teadlik valik"*
2. Vajuta **Execute workflow**
3. Vaata Code node'i väljundit. Peaks olema:
   - `meta.products_featured`: `["US-P-301", "US-P-403", ...]` (mitte US-P-202!)
   - `meta.channel`: `"Instagram"` (segmendi eelistus)
   - `ai_system_prompt`: sisaldab `"energiline aga mitte ülemüüdud"` ja `"100% süsinikuneutraalsus"` keelu
4. Kui see töötab, käivita 5 erinevat kombinatsiooni `sisu-draftid.md` jaoks

Kui meta.products_featured sisaldab US-P-202 → midagi on Code node'is valesti, sa ei filtreeri inventory_note'i õigesti.
