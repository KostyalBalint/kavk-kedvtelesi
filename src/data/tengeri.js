// Tengeri IV. osztályú (kedvtelési tengeri kishajóvezető) study material,
// derived from the tengeri question bank and standard COLREG/GMDSS practice.

export const TENGERI_TOPICS = [
  {
    id: "terkep-navigacio",
    icon: "🗺️",
    title: "Térkép és navigáció",
    subtitle: "Koordináták, Mercator, helymeghatározás",
    source: "Tengeri kishajóvezető kérdésbank; tengerészeti navigáció alapjai.",
    sections: [
      {
        title: "Koordináták, idő",
        items: [
          "Az északi szélességet +, a déli szélességet − előjellel számoljuk.",
          "UTC: az egyezményes koordinált világidő – ehhez viszonyítjuk a Föld összes többi időzónáját.",
        ],
      },
      {
        title: "Térképfajták és lépték",
        items: [
          "Part menti navigációhoz a kishajón Mercator-vetületű térképet használnak.",
          "Lépték szerint: átnézeti, útvonal, részlet, részletes part- és kikötői térkép.",
        ],
      },
      {
        title: "Távolságmérés",
        items: [
          "A távolságot a térkép függőleges (oldalsó) keretén olvassuk: 1 ívperc = 1 tengeri mérföld.",
          "Nagy távolságnál a közepes szélességen körzőnyílásba veszünk 5–10 mérföldet, és lépegetve felmérjük.",
        ],
      },
      {
        title: "Helymeghatározás",
        items: [
          "Két vagy több céltárgy valódi iránylatát felrajzoljuk; a metszéspont a pozíció.",
          "Egyetlen céltárgynál: orrszög-kettőzéssel vagy csúsztatott helyzetvonallal.",
          "Az orrszög értékét a saját hajó vagy a céltárgy mozgása befolyásolja.",
        ],
      },
      {
        title: "Térképjelek",
        items: [
          "Horgonyzóhelyet a horgony jele jelöli (gyakran megadott vízmélységgel).",
          "Időnként víz alatti / kilátszó szikla és hullámtörés jelek (árapály miatt) veszélyt jeleznek.",
          "A # jel rossz minőségű mederfeneket jelöl: áthajózni nem veszélyes, de horgonyozni nem javasolt.",
        ],
      },
    ],
  },
  {
    id: "tajolo-variacio",
    icon: "🧭",
    title: "Tájoló, variáció, deviáció",
    subtitle: "Mágneses iránymérés",
    source: "Kérdésbank; mágneses iránytű elmélete.",
    sections: [
      {
        title: "Mágneses tér és variáció",
        items: [
          "A Föld mágneses tere nem egyenletes a felszínen.",
          "Variáció: az adott helyen áthaladó mágneses erővonal és a valódi északi irány szögeltérése.",
          "Példa térképfeliratra: „Magnetic Variation 4°30'W 2011 (8'E)” = 2011-ben a variáció 4°30' nyugat, és évente 8 percet változik kelet felé.",
          "A tájoló tűje a földmágnesség és a hajómágnesség eredő irányába mutat – ez a tájoló északi irány.",
        ],
      },
    ],
  },
  {
    id: "jeloles-fenyek",
    icon: "🚨",
    title: "Tengeri jelölés és fények",
    subtitle: "Bóják, szektorfény, hajófények",
    source: "Kérdésbank; IALA / tengerészeti kitűzés, COLREG fényjelzések.",
    sections: [
      {
        title: "Bóják és fények a térképen",
        items: [
          "Szektorfény: a fehér szektor a hajózható útirányt jelzi, a vörös/zöld a határoló oldalakat.",
          "Hajózási csatorna szélén pl. „öt másodpercenként egy zöld fénnyel felvillanó” bója.",
          "Hullámos vízen egyes bóják harangoznak (hangjelzés).",
          "Térképen jelölik: AIS-jeladóval ellátott világítótorony, révkalauz beszállóállomás.",
        ],
      },
      {
        title: "Hajófények, jelzőtestek",
        items: [
          "Lehorgonyzott géphajó nappal egy minden oldalról látható fekete gömböt visel.",
          "Szűk csatorna vagy hajóút kanyarulatához közeledő géphajó egy hosszú hangjelzést ad.",
        ],
      },
    ],
  },
  {
    id: "kiteres-colreg",
    icon: "↔️",
    title: "Kitérés (COLREG)",
    subtitle: "Összeütközés megelőzése a tengeren",
    source: "Kérdésbank; COLREG (Nemzetközi Szabályok az Összeütközések Megelőzésére).",
    sections: [
      {
        title: "Alapszabályok",
        items: [
          "A COLREG a nyílt tengereken és a tengeri hajókkal járható, azokkal összeköttetésben lévő vizeken alkalmazandó.",
          "Szembe haladó géphajók jobbra téréssel térnek ki egymásnak („red to red” – bal oldali vörös fények egymás mellett).",
          "Előzéskor általában az előzött hajó nem változtat útirányt.",
          "Forgalomelválasztó (szeparációs) rendszerben csak a kijelölt sávban, az általános haladási irányban szabad haladni (halász- és keresztező hajók kivételével).",
        ],
      },
    ],
  },
  {
    id: "idojaras-tenger",
    icon: "🌬️",
    title: "Időjárás, tengerállapot",
    subtitle: "Szél, hullám, helyi jelenségek",
    source: "Kérdésbank; tengerészeti meteorológia.",
    sections: [
      {
        title: "Mértékegységek, skálák",
        items: [
          "Csomó: az egy óra alatt megtett távolság tengeri mérföldben (1 csomó = 1 tmf/óra).",
          "Példa: 15 csomóval 3 tengeri mérföld megtétele 12 perc.",
          "Douglas-skála: a tengerállapot (hullámzás) leírására szolgál.",
          "Izobár: az időjárási térképen az azonos légnyomású pontokat összekötő görbe.",
        ],
      },
      {
        title: "Szelek, helyi jelenségek",
        items: [
          "Parti és tengeri szelek a szárazföld és a víz eltérő felmelegedése miatt keletkeznek.",
          "Bóra: gyakran előjel nélküli; az Adrián fehér felhősapka a Velebit-hegység felett jelezheti a kezdetét.",
          "Az árapály a Földközi-tengeren NEM okoz jelentős (több méteres) vízszintingadozást.",
        ],
      },
    ],
  },
  {
    id: "radio-vhf",
    icon: "📻",
    title: "Rádió (VHF / GMDSS)",
    subtitle: "Forgalmazás és vészhívás",
    source: "Kérdésbank; GMDSS / VHF rádióforgalmazás.",
    sections: [
      {
        title: "VHF alapok",
        items: [
          "Szimplex üzemmód: adás és vétel ugyanazon a frekvencián – egyszerre adni és venni nem lehet, de mindenki hall minden adást.",
          "„Over” – az egyik fél befejezi az adását és vételre kapcsol.",
          "SQUELCH (zajzár): a vevő érzékenységének beállítása, a légköri alapzaj zavaró hatásának csökkentésére.",
        ],
      },
      {
        title: "Vészhívási kifejezések",
        items: [
          "MAYDAY (×3): a hajó és személyzete közvetlen, súlyos veszélyben van – azonnali külső segítség kell.",
          "PAN-PAN (×3): sürgősségi közlés – nincs szükség azonnali külső segítségre.",
          "PAN-PAN MEDICO: sürgős orvosi segítségre van szükség.",
          "MAYDAY RELAY: továbbított vészjelzés (olyan állomás adja, amely maga nincs veszélyben).",
          "SEELONCE MAYDAY: a 16-os csatornán csak az aktuális vészhelyzettel kapcsolatban szabad forgalmazni (hatóság használja).",
          "Téves riasztás törlése: háromszor „ALL STATIONS”, majd az előző vészjelzés visszavonásának bejelentése.",
        ],
      },
    ],
  },
  {
    id: "vesz-mentes",
    icon: "🆘",
    title: "Vészhelyzet, mentés",
    subtitle: "EPIRB, GMDSS, mentőeszközök",
    source: "Kérdésbank; GMDSS és mentési felszerelés.",
    sections: [
      {
        title: "Vészjelző eszközök",
        items: [
          "GMDSS célja: a biztonság növelése és a bajba jutott hajók mentésének megkönnyítése.",
          "EPIRB-bója: úszóképes helyzetjelző, amely a hajó azonosító adatait és a pillanatnyi GPS-koordinátát továbbítja – a másodlagos riasztás eszköze.",
          "NEM vészjelzés pl. az egyik kar folyamatos fel-le nyújtogatása (a két kar lassú, ismételt fel-le mozgatása viszont igen).",
        ],
      },
      {
        title: "Mentőeszközök",
        items: [
          "A hajón legalább annyi mentőmellénynek kell lennie, amennyi a hajó okmányába bejegyzett maximális utaslétszám.",
        ],
      },
    ],
  },
  {
    id: "okmanyok",
    icon: "📋",
    title: "Okmányok, felszerelés",
    subtitle: "Felszerelési jegyzék, lobogók",
    source: "Kérdésbank; hajózási hatóság felszerelési jegyzéke.",
    sections: [
      {
        title: "Felszerelés",
        items: [
          "A magyar lobogó alatt közlekedő kedvtelési kishajó kötelező és ajánlott tengeri felszereléseit a hajózási hatóság által közzétett Felszerelési jegyzék tartalmazza.",
          "A D tengeri hajózási körzetben (védett part menti vizek) bizonyos felszerelés nem kötelező, csak ajánlott.",
        ],
      },
      {
        title: "Kódlobogók a tengeren",
        items: [
          "H (Hotel): révkalauz van a fedélzeten.",
          "O (Oscar): ember a vízben.",
        ],
      },
    ],
  },
];
