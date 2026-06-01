// Structured study data extracted from the official Hajózási Szabályzat
// (57/2011. (XI. 22.) NFM rendelet, 1. melléklet I–7 / I–6 / II–8, ch. 3–6).
// Signs follow the CEVNI A/B/C/D/E system. `glyph` keys map to drawings in
// MaterialDiagrams.jsx; signs without a glyph render with their code label.

// Official sign images (downloaded from the jogtar HTML, I–7 melléklet).
// Returns the public URL for a sign code, or null if no image exists.
const _signImgCodes = new Set(
  ("A.1 A.2 A.3 A.4 A.4.1 A.5 A.5.1 A.6 A.7 A.8 A.9 A.10 A.11 A.12 A.13 A.14 " +
    "A.15 A.16 A.17 A.18 A.19 A.20 B.1 B.2 B.3 B.4 B.5 B.6 B.7 B.8 B.9 B.10 B.11 " +
    "C.1 C.2 C.3 C.4 C.5 D.1 D.2 D.3 E.1 E.2 E.3 E.4 E.5 E.5.1 E.5.2 E.5.3 E.5.4 " +
    "E.5.5 E.5.6 E.5.7 E.5.8 E.5.9 E.5.10 E.5.11 E.5.12 E.5.13 E.5.14 E.5.15 E.6 " +
    "E.7 E.7.1 E.8 E.9 E.10 E.11 E.12 E.13 E.14 E.15 E.16 E.17 E.18 E.19 E.20 " +
    "E.21 E.22 E.23 E.24 " +
    // a/b variants with their own official images
    "B.2a B.2b B.3a B.3b B.4a B.4b B.9a B.9b B.11a B.11b D.1a D.1b E.4a E.4b " +
    "E.9a E.9b E.10a E.10b E.12b").split(" ")
);

export function signImg(code) {
  // "B.2 a)" → "B.2a"; "D.1" → "D.1"
  const key = code.replace(/\s|\)/g, "");
  if (!_signImgCodes.has(key)) return null;
  return `${import.meta.env.BASE_URL}data/signs/${key.replace(/\./g, "-")}.png`;
}

// ---- I–7: waterway signs ------------------------------------------------

export const SIGN_GROUPS = [
  {
    cat: "A",
    label: "Tiltó jelzések",
    desc: "Fehér tábla, vörös szegély + vörös átló (A.1: vörös-fehér-vörös sávok).",
    signs: [
      { code: "A.1", glyph: "rwr", title: "Áthaladni tilos (általános).", note: "Két egymás feletti tábla/fény/lobogó = tartós tilalom." },
      { code: "A.2", glyph: "overtake", title: "Előzés tilos." },
      { code: "A.3", title: "Kötelékek egymás közti előzése tilos." },
      { code: "A.4", glyph: "meet", title: "Találkozás és előzés tilos." },
      { code: "A.4.1", title: "Kötelékek egymás közti találkozása és előzése tilos." },
      { code: "A.5", glyph: "P", title: "Veszteglés (horgonyon vagy parthoz kötve) tilos." },
      { code: "A.5.1", title: "Veszteglés tilos a megadott szélességben (métertől a jelzéstől)." },
      { code: "A.6", glyph: "anchor", title: "Horgonyozni, horgonyt/kötelet/láncot vonszolni tilos." },
      { code: "A.7", glyph: "moor", title: "Parthoz kikötni tilos." },
      { code: "A.8", glyph: "turn", title: "Megfordulni tilos." },
      { code: "A.9", glyph: "wave", title: "Hullámzást kelteni tilos." },
      { code: "A.10", title: "A jelzett területen kívül áthaladni tilos (híd-/duzzasztónyílás)." },
      { code: "A.11", title: "Az áthaladás tilos, de az induláshoz készülj fel." },
      { code: "A.12", glyph: "motor", title: "Géphajók közlekedése tilos." },
      { code: "A.13", glyph: "rec", title: "Kedvtelési célú vízijárművek közlekedése tilos." },
      { code: "A.14", glyph: "waterski", title: "Vízisízés tilos." },
      { code: "A.15", glyph: "sail", title: "Vitorlás hajók közlekedése tilos." },
      { code: "A.16", glyph: "row", title: "Géphajónak és vitorlásnak nem minősülő hajók közlekedése tilos." },
      { code: "A.17", glyph: "windsurf", title: "Vitorlás deszkával közlekedni tilos." },
      { code: "A.18", glyph: "highspeed", title: "A nagy sebességű közlekedésre engedélyezett zóna vége." },
      { code: "A.19", glyph: "slip", title: "Hajók vízre bocsátása és partra húzása tilos." },
      { code: "A.20", glyph: "jetski", title: "Motoros vízi sporteszközzel közlekedni tilos." },
    ],
  },
  {
    cat: "B",
    label: "Utasító (kötelező) jelzések",
    desc: "Fehér tábla, vörös szegély, fekete jel/nyíl – cselekvésre kötelez.",
    signs: [
      { code: "B.1", glyph: "arrowUp", title: "A nyíllal jelölt irányban köteles haladni." },
      { code: "B.2 a)", title: "A hajóút bal oldala felé eső oldalára köteles áthajózni." },
      { code: "B.2 b)", title: "A hajóút jobb oldala felé eső oldalára köteles áthajózni." },
      { code: "B.3 a)", title: "A hajóút bal oldala felé eső oldalán köteles haladni." },
      { code: "B.3 b)", title: "A hajóút jobb oldala felé eső oldalán köteles haladni." },
      { code: "B.4 a)", title: "A hajóút bal oldala felé eső oldalára köteles áthajózni (a haladásnál)." },
      { code: "B.4 b)", title: "A hajóút jobb oldala felé eső oldalára köteles áthajózni (a haladásnál)." },
      { code: "B.5", glyph: "stop", title: "A Szabályzatban megállapított esetben köteles megállni." },
      { code: "B.6", glyph: "speed", title: "A megadott sebességet (km/h) túllépni tilos." },
      { code: "B.7", glyph: "horn", title: "Köteles hangjelet adni." },
      { code: "B.8", glyph: "warn", title: "Fokozott elővigyázatosság kötelező." },
      { code: "B.9 a)", title: "Főágba kihajózni/keresztezni csak akkor szabad, ha a haladókat nem kényszeríted sebesség- vagy irányváltásra (ferde nyíl)." },
      { code: "B.9 b)", title: "Ugyanez a kötelezettség, a tábla másik nyílállású változata (merőleges nyíl)." },
      { code: "B.10", title: "A főágban haladók szükség esetén adjanak utat a kihajózónak." },
      { code: "B.11 a)", title: "Kötelező rádiótelefon-kapcsolatba lépni." },
      { code: "B.11 b)", title: "Kötelező rádiótelefon-kapcsolatba lépni a feltüntetett csatornán." },
    ],
  },
  {
    cat: "C",
    label: "Korlátozó jelzések",
    desc: "Fehér tábla, vörös szegély – korlátozást ír elő.",
    signs: [
      { code: "C.1", glyph: "depth", title: "Korlátozott vízmélység (m)." },
      { code: "C.2", glyph: "height", title: "Korlátozott vízszint feletti szabad magasság (m)." },
      { code: "C.3", glyph: "width", title: "Korlátozott átjáró- vagy hajóútszélesség (m)." },
      { code: "C.4", glyph: "warn", title: "Hajózási korlátozások – tudakozódj." },
      { code: "C.5", title: "A hajóút eltávolodik a parttól; a szám a tartandó távolságot adja (m)." },
    ],
  },
  {
    cat: "D",
    label: "Ajánló jelzések",
    desc: "Sárga tábla / nyíl – ajánlást ad.",
    signs: [
      { code: "D.1 a)", title: "Ajánlott átjáró – mindkét irányban." },
      { code: "D.1 b)", title: "Ajánlott átjáró – csak a megadott irányban (az ellenkező irányban az áthaladás tilos)." },
      { code: "D.2", title: "Ajánlatos a jelzett területen maradni (híd-/duzzasztónyílás)." },
      { code: "D.3", glyph: "arrowUp", title: "Ajánlott haladási irány: az állandó fénytől a villanó fény felé." },
    ],
  },
  {
    cat: "E",
    label: "Tájékoztató jelzések",
    desc: "Kék tábla, fehér jel (E.1: zöld-fehér-zöld sávok) – tájékoztat / megenged.",
    signs: [
      { code: "E.1", glyph: "gwg", title: "Az áthaladás engedélyezett (általános)." },
      { code: "E.2", glyph: "power", title: "Légvezeték-átfeszítés." },
      { code: "E.3", glyph: "weir", title: "Duzzasztómű." },
      { code: "E.4 a)", title: "Nem szabadon közlekedő komp." },
      { code: "E.4 b)", title: "Szabadon közlekedő komp." },
      { code: "E.5", glyph: "P", title: "Vesztegelni szabad (horgonyon vagy parthoz kötve)." },
      { code: "E.5.1", title: "Vesztegelni szabad a jelzéstől mért, méterben megadott szélességben." },
      { code: "E.5.2", title: "Vesztegelni szabad a méterben feltüntetett két távolság között." },
      { code: "E.5.3", title: "Az egymás mellé állítható hajók legnagyobb száma." },
      { code: "E.5.4", title: "Tolt kötelék hajóinak (3.14 jelzés nélkül) veszteglőhelye." },
      { code: "E.5.5", title: "Tolt kötelék hajóinak (1 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.6", title: "Tolt kötelék hajóinak (2 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.7", title: "Tolt kötelék hajóinak (3 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.8", title: "Nem tolt kötelék hajóinak (jelzés nélkül) veszteglőhelye." },
      { code: "E.5.9", title: "Nem tolt kötelék hajóinak (1 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.10", title: "Nem tolt kötelék hajóinak (2 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.11", title: "Nem tolt kötelék hajóinak (3 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.12", title: "Minden hajó (jelzés nélkül) veszteglőhelye." },
      { code: "E.5.13", title: "Minden hajó (1 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.14", title: "Minden hajó (2 kék fény / kúp) veszteglőhelye." },
      { code: "E.5.15", title: "Minden hajó (3 kék fény / kúp) veszteglőhelye." },
      { code: "E.6", glyph: "anchor", title: "Horgonyzás / horgony, kötél, lánc vonszolása megengedett." },
      { code: "E.7", glyph: "moor", title: "Parthoz való kikötés megengedett." },
      { code: "E.7.1", title: "Be- és kirakodásra kijelölt rakpartszakasz." },
      { code: "E.8", glyph: "turn", title: "Fordítóhely." },
      { code: "E.9 a)", title: "Az elért út a haladási út mellékvíziútja (változat a)." },
      { code: "E.9 b)", title: "Az elért út a haladási út mellékvíziútja (változat b)." },
      { code: "E.10 a)", title: "Az út, amelyen haladsz, az elért út mellékvíziútja (változat a)." },
      { code: "E.10 b)", title: "Az út, amelyen haladsz, az elért út mellékvíziútja (változat b)." },
      { code: "E.11", title: "A tilalom / egyirányú közlekedés / korlátozás vége." },
      { code: "E.12", title: "Figyelemfelhívó fehér fény(ek): állandó = megállni; villanó = mehet." },
      { code: "E.13", glyph: "water", title: "Ivóvízvételező hely." },
      { code: "E.14", glyph: "phone", title: "Távbeszélő-állomás." },
      { code: "E.15", glyph: "motor", title: "Géphajók közlekedése engedélyezett." },
      { code: "E.16", glyph: "rec", title: "Kedvtelési célú hajók közlekedése engedélyezett." },
      { code: "E.17", glyph: "waterski", title: "Vízisízés engedélyezett." },
      { code: "E.18", glyph: "sail", title: "Vitorlás hajók közlekedése engedélyezett." },
      { code: "E.19", glyph: "row", title: "Géphajónak/vitorlásnak nem minősülő hajók közlekedése engedélyezett." },
      { code: "E.20", glyph: "windsurf", title: "Vitorlás deszkák közlekedése engedélyezett." },
      { code: "E.21", glyph: "highspeed", title: "Kedvtelési kishajók nagy sebességű közlekedése engedélyezett." },
      { code: "E.22", glyph: "slip", title: "Hajók vízre bocsátása és partra húzása engedélyezett." },
      { code: "E.23", glyph: "radio", title: "Hajózási információ a feltüntetett csatornán." },
      { code: "E.24", glyph: "jetski", title: "Motoros vízi sporteszköz közlekedése engedélyezett." },
    ],
  },
];

// ---- I–6 / ch.4,6: sound signals ---------------------------------------
// pattern uses S (rövid ~1mp), L (hosszú ~4mp), V (nagyon rövid sorozat)

export const SOUNDS = [
  { group: "Manőver- és figyelmeztető jelek", items: [
    { pattern: "L", title: "Figyelem! / „itt vagyok\" – figyelmeztető jel." },
    { pattern: "S", title: "Jobbra tartok." },
    { pattern: "SS", title: "Balra tartok." },
    { pattern: "SSS", title: "Hátramenetben működöm (a propulziós mű hátrameneten)." },
    { pattern: "SSSS", title: "Műveletképtelen vagyok." },
    { pattern: "V", title: "Közvetlen összeütközés veszélye (nagyon rövid hangok sorozata: 6×¼ mp)." },
  ]},
  { group: "Vészjelzés (segélykérés)", items: [
    { pattern: "LLL", title: "Veszélyben vagyok, segítséget kérek (ismételt hosszú hangok)." },
    { pattern: "bell", title: "Folyamatos harangkongatás = segélykérés. Harang híján fém-fém ütés." },
  ]},
  { group: "Korlátozott látás (köd)", items: [
    { pattern: "info", title: "Menetben lévő hajó hangjelzéssel, veszteglő harangkongatással jelez." },
    { pattern: "info", title: "Radarral völgymenetben haladó nagyhajó háromtónusú jelet adhat." },
  ]},
];

export const SOUND_TIMING = [
  "Rövid hang: kb. 1 másodperc.",
  "Hosszú hang: kb. 4 másodperc.",
  "Két hang között kb. 1 mp szünet (kivéve a nagyon rövid sorozat).",
  "Nagyon rövid hang: legalább 6 db, egyenként ¼ mp, ¼ mp szünettel.",
  "Háromtónusú: 3 különböző magasságú hang, kb. 2 mp, 3× ismételve, a legmélyebbel kezdve.",
  "Géphajó hangjelzését szinkronizált sárga fényjel kíséri (kishajóra nem vonatkozik).",
  "Tilos a Szabályzattól eltérő hangjelzést használni. Kisgéphajón duda/kürt is jó.",
];

// ---- ch.3: night light configurations ----------------------------------
// lights[].arc maps to LightView sectors; `shapes` = daytime equivalent.

export const LIGHTS = [
  { cikk: "3.08", vessel: "Menetben lévő magányos géphajó", exam: true,
    view: ["masthead", "starboard", "port", "stern"],
    lights: ["Árbocfény elöl, hossztengelyben (min 5 m; 40 m alatt 4 m).",
      "Oldalfények: zöld jobb, vörös bal, az árbocfény mögött/alatt min 1 m.",
      "Farfény hátul."],
    note: "110 m felett kötelező 2. árbocfény. Gyorsjáratú: 2 gyors sárga villanó." },
  { cikk: "3.12", vessel: "Menetben lévő vitorlás hajó", exam: true,
    view: ["starboard", "port", "stern"],
    lights: ["Oldalfények (szokásos erősség is lehet) + farfény.",
      "Opció: árboccsúcson 2 körfény – felül vörös, alul zöld."],
    note: "Vitorla + gép egyszerre: plusz árbocfény. Nappal: csúccsal lefelé fekete kúp." },
  { cikk: "3.13", vessel: "Magányosan haladó kisgéphajó", exam: true,
    view: ["masthead", "starboard", "port", "stern"],
    lights: ["Árbocfény (közepesen erős) az oldalfények felett min 1 m.",
      "Oldalfények (orrnál közös lámpatestben is lehet) + farfény."],
    note: "Farfény elhagyható → helyette minden oldalról látható fehér fény." },
  { cikk: "3.13", vessel: "Vitorlás kishajó", exam: true,
    view: ["starboard", "port", "stern"],
    lights: ["Oldalfények + farfény (szokásos), vagy közös lámpa az árboccsúcson.",
      "7 m alatt: egyetlen minden oldalról látható fehér fény."],
    note: "7 m alatt más hajó közeledtekor egy második fehér fényt is mutat." },
  { cikk: "3.13", vessel: "Csónak / evezős és egyéb kishajó", exam: true,
    view: ["allround"],
    lights: ["Egy minden oldalról látható szokásos fehér fény."],
    note: "Hajó csónakja csak más hajó közeledtekor mutatja." },
  { cikk: "3.20", vessel: "Veszteglő (horgonyon álló) hajó", exam: true,
    view: ["allround"],
    lights: ["Egy minden oldalról látható fehér fény, min 3 m magasan."],
    note: "Nappal nyílt helyen: fekete gömb. Part mellett több mentesítés." },
  { cikk: "3.14", vessel: "Veszélyes árut szállító hajó", exam: true,
    shapes: ["cone-down:blue"],
    lights: ["1 kék fény = gyúlékony, 2 = ártalmas, 3 = robbanásveszélyes (körfény)."],
    note: "Nappal: ugyanannyi csúccsal lefelé fordított kék kúp." },
  { cikk: "3.16", vessel: "Komp (menetben)", exam: true,
    mast: ["green", "white"],
    lights: ["Fehér körfény + fölötte zöld körfény (min 5 m).",
      "Szabadon közlekedő: + oldalfények és farfény."],
    note: "Nappal: zöld gömb." },
  { cikk: "3.18", vessel: "Műveletképtelen hajó", exam: true,
    mast: ["red", "red"], shapes: ["ball:black", "ball:black"],
    lights: ["Lengetett vörös fény, vagy 2 vörös körfény egymás felett."],
    note: "Nappal: lengetett vörös lobogó vagy 2 fekete gömb." },
  { cikk: "3.34", vessel: "Műveletképességében korlátozott hajó", exam: true,
    mast: ["red", "white", "red"], shapes: ["ball:black", "doublecone:black", "ball:black"],
    lights: ["3 körfény: felül és alul vörös, középen fehér."],
    note: "Nappal: gömb – fekete kettős kúp – gömb." },
  { cikk: "3.35", vessel: "Halászattal foglalkozó hajó", exam: true,
    mast: ["green", "white"],
    lights: ["Vonóhálós: felül zöld, alul fehér körfény.",
      "Egyéb halász: felül vörös, alul fehér körfény."],
    note: "Nappal: két fekete kúp (csúccsal egymás felé)." },
  { cikk: "3.36", vessel: "Búvármunkát végző hajó", exam: true,
    flag: "A",
    lights: ["A nemzetközi „A\" kódlobogó min 1 m magas merev makettje (nappal-éjjel)."],
    note: "Vagy a 3.34 szerinti vörös-fehér-vörös fények." },
  { cikk: "3.38", vessel: "Révkalauz hajója", exam: true,
    mast: ["white", "red"],
    lights: ["2 körfény az árboc csúcsán: felül fehér, alul vörös."], note: "" },
  // big convoys / special – listed for completeness
  { cikk: "3.09", vessel: "Vontatott kötelék (vontatóhajó)", exam: false,
    mast: ["white", "white"],
    lights: ["2 árbocfény egymás felett + oldalfények + SÁRGA farfény."], note: "Élén több hajó: 3 árbocfény." },
  { cikk: "3.10", vessel: "Tolt kötelék", exam: false,
    mast: ["white", "white", "white"],
    lights: ["3 árbocfény háromszögben + oldalfények + 3 farfény a tolóhajón."], note: "110 m / 12 m alatt magányos géphajóként." },
  { cikk: "3.11", vessel: "Mellévett alakzat", exam: false,
    mast: ["white"],
    lights: ["Minden hajón árbocfény + külső oldalfények + minden hajón farfény."], note: "" },
  { cikk: "3.25", vessel: "Úszómunkagép / fennakadt-elsüllyedt hajó", exam: false,
    mast: ["green", "green"],
    lights: ["Szabad oldal: 2 zöld (munka) v. vörös-fehér; nem szabad oldal: 1 vörös."], note: "Nappal: zöld kettős kúpok / vörös gömb." },
  { cikk: "3.27", vessel: "Ellenőrző / tűzoltó- / mentőhajó", exam: false,
    mast: ["blue"],
    lights: ["Gyors villogó kék fény (ha a feladat kívánja)."], note: "Megkülönböztető jel: kékkel keretezett fehér rombusz az orron." },
  { cikk: "3.37", vessel: "Aknamentesítő hajó", exam: false,
    mast: ["green", "green", "green"],
    lights: ["3 zöld fény háromszögben."], note: "Nappal: 3 fekete gömb." },
];

// ---- II–8 + ch.3: flag rules and special signals -----------------------

export const FLAG_RULES = [
  "Helyek: farrész = lobogórúd (főhely), orr = vezérpálca, jelzőárboc. A nemzeti lobogót a főhelyre kell felvonni; oda más lobogó tilos.",
  "A személyzettel, menetben lévő hajó nappal a farrészén viseli a nemzeti lobogót (gyorsjáratú hajó helyette azonos színű táblát).",
  "Felvonási sorrend: nemzeti → idegen állam → Duna Bizottság → hatósági → jelzőlobogók → vállalati/egyesületi → lobogódísz. Levonás fordított sorrendben.",
  "Idegen állam lobogója a vezérpálcára (annak vízterületén); jelzőlobogók a jelzőárbocra vagy jelzőzászlóként a megjelölt ponton.",
  "Vitorláson vezérpálca hiányában az orrmerevítő kötél felső harmadában; gyász jeléül a nemzeti lobogót félárbocra.",
  "A lobogók és lengők színe ne legyen fakult/szennyezett, méretük legyen jól látható.",
];

export const SPECIAL_SIGNALS = [
  { name: "Vörös lengő", flag: "redpennant", cikk: "3.17", meaning: "Áthaladási elsőbbséget élvező hajó: a mellső részén magasra felvont egy vörös lengő." },
  { name: "Kékkel keretezett fehér rombusz", flag: "diamond", cikk: "3.27", meaning: "Ellenőrző hatóság (tűzoltó-, mentő-) hajójának megkülönböztető jele az orr mindkét oldalán." },
  { name: "Gyors villogó sárga fény", flag: "yellowlight", cikk: "3.28", meaning: "Víziúton munkát/mérést végző, menetben lévő hajó (hatósági engedéllyel)." },
  { name: "Két gyors sárga villanó fény", flag: "yellowlight", cikk: "3.08", meaning: "Gyorsjáratú hajó kötelező jelzése menetben (nappal és éjjel)." },
  { name: "Vörös-fehér lobogó", flag: "redwhite", cikk: "3.25", meaning: "Hullámzás elleni védelemre szoruló, munkát végző veszteglő hajó (felül vörös, alul fehér)." },
  { name: "Körkörösen mozgatott zászló/fény", flag: "circle", cikk: "3.30", meaning: "Vészjelzés – segítségkérés." },
  { name: "Vörös csillagrakéta / ejtőernyős rakéta / fáklya", flag: "rocket", cikk: "3.30", meaning: "Vészjelzés – segítségkérés." },
  { name: "SOS fényjelzés / égő láng", flag: "sos", cikk: "3.30", meaning: "Vészjelzés – segítségkérés (morze SOS, kátrány/olaj láng)." },
  { name: "Lobogó, alatta gömb", flag: "flagball", cikk: "3.30", meaning: "Vészjelzés – segítségkérés. Lassan le-fel mozgatott kinyújtott karok is." },
  { name: "„A\" kódlobogó merev makettje", flag: "alpha", cikk: "3.36", meaning: "Búvármunkát végző hajó jelzése (min 1 m, minden oldalról látható)." },
];
