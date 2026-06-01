// Kisgéphajó study material, derived from the kisgephajo question bank and
// verified against trusted sources (OMSZ/vízügy viharjelzés, hajós képzési
// anyagok). Each topic renders as titled sections of bullet items.

export const KISHAJO_TOPICS = [
  {
    id: "motor-hajtas",
    icon: "🛠️",
    title: "Motor és hajtás",
    subtitle: "Motortípusok, hűtés, hajócsavar",
    source:
      "Kisgéphajó-vezető képzési anyag és kérdésbank alapján; belső égésű motorok általános működése.",
    sections: [
      {
        title: "Motortípusok",
        items: [
          "Otto-motor üzemanyaga a benzin; a dízelmotoré a gázolaj.",
          "Kétütemű Otto-motor: a kenőolajat az üzemanyaghoz keverve juttatják a kenési helyekre.",
          "Négyütemű motor: külön kenőolaj-rendszer (olajteknő), nincs keverés.",
          "Modern kishajó-dízel: elektronikusan vezérelt befecskendezés (a régi tisztán mechanikus volt).",
        ],
      },
      {
        title: "Elhelyezés szerint",
        items: [
          "Beépített motor: a hajótest belsejébe, a fedélzet alá stabilan rögzített motor.",
          "Külmotor: a fartükörre függesztett, kisebb tömegű, kibillenthető motor.",
          "Vízkiszorításos hajó a legnagyobb sebességét viszonylag kis motorteljesítménnyel éri el.",
        ],
      },
      {
        title: "Hűtés, ellenőrzés",
        items: [
          "Külmotor hűtése akkor megfelelő, ha az ellenőrző vízsugár erős és megszakítatlan.",
        ],
      },
      {
        title: "Hajócsavar",
        items: [
          "A hajócsavar forgásirányának ismerete segíti a manőverezést és az iránytartást.",
          "Jobb forgású csavarral hátramenetbe kapcsolva a hajó fara bal oldalra tér ki.",
          "Ha kötél/hínár tekeredik a csavarra: külmotornál a motort leállítani, kibillenteni, a kötelet lefejteni; beépített motornál leállítás és áramtalanítás után (öbölben/tavon) merülve kiszabadítani.",
          "Meghibásodott külmotornál evezős kikötéskor a hajtóművet érdemes kiemelni, mert az álló csavar fékezi a hajót.",
        ],
      },
    ],
  },
  {
    id: "uzemanyag",
    icon: "⛽",
    title: "Üzemanyag, tankolás",
    subtitle: "Keverékképzés és tankolási szabályok",
    source: "Kérdésbank; belső égésű motorok keverékképzése.",
    sections: [
      {
        title: "Keverékképzés",
        items: [
          "Otto-motornál a benzin-levegő keveréket karburátor vagy befecskendező rendszer hozza létre.",
          "Dízelmotornál a befecskendező porlasztó apró cseppekre porlasztja a gázolajat, és nagy nyomáson az égéstérbe juttatja.",
        ],
      },
      {
        title: "Tankolás – tűzvédelmi előkészületek",
        items: [
          "Elektromos berendezések kikapcsolása.",
          "Motor leállítása.",
          "Dohányzás és nyílt láng használatának megszüntetése.",
          "Kézi tűzoltó készülék ellenőrzése és előkészítése.",
        ],
      },
    ],
  },
  {
    id: "hajotest",
    icon: "⛴️",
    title: "Hajótest, stabilitás",
    subtitle: "Úszóképesség, merülés, trimmelés",
    source: "Kérdésbank; hajóelméleti alapfogalmak.",
    sections: [
      {
        title: "Úszóképesség és stabilitás",
        items: [
          "Úszóképesség: a hajótest által kiszorított víz súlya megegyezik a hajó súlyával, így a hajó nem merül el.",
          "Stabilitás: a hajó azon tulajdonsága, hogy a billentő nyomatéknak ellenáll.",
          "A vízkiszorítás ismerete a kiemeléshez és szállításhoz elengedhetetlen.",
          "Légszekrény: vízmentes rekesz csónakokban/kishajókban, amely borulás vagy vízbetörés esetén biztosítja az úszóképességet.",
        ],
      },
      {
        title: "Méretfogalmak",
        items: [
          "Oldalmagasság: a gerinc legalsó pontja és a fedélzet legalsó pontja közötti, a hajó oldalán mért legrövidebb függőleges távolság.",
          "Szabad oldalmagasság: az oldalmagasság a merüléssel csökkentve.",
          "Biztonsági távolság: a merülési sík feletti függőleges távolság, amely felett a hajó már nem tekinthető vízmentesnek.",
        ],
      },
      {
        title: "Siklás, trimmelés",
        items: [
          "A kisgéphajó siklásban az orrhullámán halad.",
          "Ideális trimm: a hajótest közel vízszintesen halad, a tolóerő hátrafelé hat.",
          "Faránál terhelt hajónál a meghajtószárat a farhoz közelebb állítva a fart megemeli, az orrot süllyeszti.",
        ],
      },
    ],
  },
  {
    id: "kormanyzas",
    icon: "🧭",
    title: "Kormányzás, manőverezés",
    subtitle: "Csavarhatás, sekély víz, szél",
    source: "Kérdésbank; gyakorlati hajóvezetés.",
    sections: [
      {
        title: "Csavarhatás és kormányzás",
        items: [
          "Jobb forgású csavar hátramenetben a fart balra téríti – ezt a manővernél ki lehet használni.",
          "Erős oldalszélben a szél felőli oldalra folyamatosan ellenkormányozni kell.",
          "Szűk hajóútban találkozáskor: sebességet csökkenteni és biztonságos oldaltávolságot tartani.",
        ],
      },
      {
        title: "Sekély víz, akadályok",
        items: [
          "Sekély vízben: sebességet csökkenteni, a trimmelést magasra állítani.",
          "Sűrű hínárban a csavar feltekeri a hínárt: csökken a tolóerő, nő a fogyasztás, akár le is áll a hajtómű.",
          "Elhaladó nagyhajó mellett: a szívóhatás miatti vízszintcsökkenés sértheti a hajtóművet, a farhullám a partmenti mederhez csaphatja a hajót.",
          "Folyón kis motorral: felfelé a parthoz közeli részen, lefelé a víziút közepén érdemes haladni.",
        ],
      },
    ],
  },
  {
    id: "kikotes",
    icon: "⚓",
    title: "Kikötés, horgonyzás, kötelek",
    subtitle: "Manőver, horgony, kötélkezelés",
    source: "Kérdésbank; gyakorlati hajóvezetés.",
    sections: [
      {
        title: "Kikötés",
        items: [
          "Kikötés előtt: ütközőballonokat kihelyezni, a kikötőköteleket előkészíteni.",
          "Sodrással vagy széllel szemben érkezve az orrkötél megkötésével kell kezdeni.",
          "Induláskor (sodrással/széllel szemben kikötve) a farkötél elengedésével kell kezdeni.",
          "Mólóhoz a part felől fújó erős szélben közel merőlegesen érdemes közelíteni.",
        ],
      },
      {
        title: "Horgonyzás",
        items: [
          "A ledobott horgonyt a horgonyra kötött bója jelzi a többi hajós felé.",
          "Köves, sziklás mederfenéken ne horgonyozz – a horgony úgy beakadhat, hogy nem szedhető fel.",
          "Horgonyfelszedéskor a csörlő terhelése lassú előremenettel csökkenthető.",
        ],
      },
      {
        title: "Kötelek",
        items: [
          "A szintetikus kötél laza, belógó állapotból hirtelen nagy terhelést kapva könnyen elpattanhat – ne állj a feszülő kötél irányába.",
        ],
      },
    ],
  },
  {
    id: "biztonsag",
    icon: "🦺",
    title: "Biztonság, mentés",
    subtitle: "Mentési kötelezettség, felelősség",
    source: "Kérdésbank; HSz mentési előírások.",
    sections: [
      {
        title: "Mentés, felelősség",
        items: [
          "Életveszélybe került embert kötelező menteni, de csak a saját és a hajó biztonságával összeegyeztethető mértékben.",
          "A hajóvezető felel az utasok testi épségéért – addig a mértékig, ameddig betartják az e körben adott utasításait.",
          "Az utas köteles végrehajtani a vezető utasítását, ha azt a hajózás biztonsága vagy a rend érdekében adta.",
        ],
      },
      {
        title: "Tűzvédelem, úszóképesség",
        items: [
          "Tankolásnál: elektromos berendezés ki, motor leáll, nincs nyílt láng/dohányzás, kézi tűzoltó készenlétben.",
          "A légszekrény borulás/vízbetörés esetén tartja a hajót a felszínen.",
          "A kötelező felszerelést a hajó hossza alapján írják elő.",
        ],
      },
    ],
  },
  {
    id: "idojaras",
    icon: "🌩️",
    title: "Időjárás, viharjelzés",
    subtitle: "Balatoni viharjelzés, szél, hullám",
    source:
      "Kérdésbank; OMSZ / vízügy balatoni viharjelző rendszer (I. fok 45/perc, II. fok 90/perc).",
    sections: [
      {
        title: "Viharjelzés a nagy tavainkon",
        items: [
          "Szezonálisan üzemel, sárga villogó fényekkel figyelmeztet a veszélyre.",
          "I. fokú jelzés: percenként 45 felvillanás – a veszélyes jelenségek közeledtének lehetőségét jelzi (a keletkezés idejére utalás nélkül). Fürdeni/vízi sportolni a parttól kb. 500 m-en belül szabad.",
          "II. fokú jelzés: percenként 90 felvillanás – a veszély jele, a veszélyes jelenség közvetlen közeledtére figyelmeztet. Fürdeni tilos, a vízijárművek használata is tilos (a vitorlás kivételével).",
        ],
      },
      {
        title: "Szél, hullám, évszak",
        items: [
          "A hajó farhulláma kis vízmélységnél a legnagyobb.",
          "A kompozit (műgyanta) testű hajót télen ki kell emelni, mert a jégnyomás összeroppanthatja a hajótestet.",
        ],
      },
    ],
  },
  {
    id: "navigacio",
    icon: "🗺️",
    title: "Navigáció, vízrajz",
    subtitle: "Víziút, hajóút, hegy-/völgymenet",
    source: "Kérdésbank; vízrajzi alapfogalmak, HSz fogalommeghatározások.",
    sections: [
      {
        title: "Alapfogalmak",
        items: [
          "Víziút: a víziközlekedés pályája – a folyók, csatornák és tavak rendeletben víziúttá nyilvánított szakasza vagy része.",
          "Hajóút: a víziútnak a nagyhajók közlekedésére kijelölt és kitűzött (ennek hiányában rendszeresen használt) része.",
          "Vízállás: a vízszint magassága a vízmérce nullpontjához viszonyítva.",
          "Folyamkilométer: az adott pont torkolattól mért távolsága.",
        ],
      },
      {
        title: "Menetirány, meder",
        items: [
          "Hegymenet: a hajó orra a folyásiránnyal szemben mutat (ár ellen halad).",
          "Völgymenet: a folyásirányban, árral halad.",
          "Sziget környezetében a sziget alsó és felső végénél kell zátonyra számítani.",
          "Alsó szakasz jellegű folyó: kis esésű, hordaléklerakásokkal, szigetekkel, széles mederrel.",
          "Nagyon alacsony vízállásnál a hajóúton kívül hajózni veszélyes, alapos helyismeretet igényel.",
        ],
      },
    ],
  },
];
