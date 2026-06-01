import { Link, useParams } from "react-router-dom";
import { TOPICS } from "./Materials.jsx";
import {
  CodeFlag,
  DayShape,
  LightView,
  PlainFlag,
} from "../components/MaterialDiagrams.jsx";

// ---------- shared bits ----------

function Card({ children }) {
  return <div className="rounded-2xl bg-white p-4 shadow-sm">{children}</div>;
}

function Row({ visual, title, children }) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0">
      <div className="flex w-16 shrink-0 items-center justify-center">{visual}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-sm leading-snug text-slate-500">{children}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-4">
      {title && (
        <h2 className="mb-2 px-1 text-sm font-bold uppercase tracking-wide text-slate-400">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Source({ children }) {
  return (
    <p className="mt-5 px-1 text-xs leading-relaxed text-slate-400">{children}</p>
  );
}

// ---------- 1. Gömbök, kúpok ----------

function Shapes() {
  return (
    <>
      <Card>
        <p className="mb-1 text-sm leading-relaxed text-slate-600">
          A nappali jelzések egyszerű, távolról is felismerhető alakzatok:{" "}
          <b>gömb</b>, <b>kúp</b>, <b>henger</b> és <b>kettős kúp</b>. A
          Szabályzat szerint mindegyik helyettesíthető olyan szerkezettel, amely
          távolról azonos alakot mutat. Színük hordozza a jelentést.
        </p>
      </Card>

      <Section title="Gömb">
        <Card>
          <Row visual={<DayShape kind="ball" color="black" />} title="Fekete gömb">
            Nyílt helyen, magányosan vagy karavánban <b>veszteglő géphajó</b> a
            hajó elején, minden oldalról láthatóan viseli.
          </Row>
          <Row
            visual={<DayShape kind="ball" color="black" count={2} />}
            title="Két fekete gömb egymás felett"
          >
            <b>Manőverképtelen</b> (kormányozhatatlan) hajó jelzése.
          </Row>
          <Row visual={<DayShape kind="ball" color="green" />} title="Zöld gömb">
            Menetben lévő <b>komp</b> (köteles vagy szabadon közlekedő) viseli,
            legalább 5 m magasságban.
          </Row>
          <Row visual={<DayShape kind="ball" color="red" />} title="Vörös gömb">
            Munkát végző úszó munkagép azon az oldalán, amely felől a{" "}
            <b>hajóút nem szabad</b>.
          </Row>
        </Card>
      </Section>

      <Section title="Kúp">
        <Card>
          <Row
            visual={<DayShape kind="cone-down" color="black" />}
            title="Fekete kúp, csúccsal lefelé"
          >
            <b>Vitorlázó hajó, amely egyúttal a gépét is használja</b> – a
            szabályok szerint géphajónak minősül.
          </Row>
          <Row visual={<DayShape kind="cone" color="blue" />} title="1 kék kúp">
            <b>Gyúlékony</b> (tűzveszélyes) anyagot szállító hajó.
          </Row>
          <Row
            visual={<DayShape kind="cone" color="blue" count={2} />}
            title="2 kék kúp"
          >
            <b>Egészségre ártalmas</b> anyagot szállító hajó.
          </Row>
          <Row
            visual={<DayShape kind="cone" color="blue" count={3} />}
            title="3 kék kúp"
          >
            <b>Robbanóanyagot</b> szállító hajó.
          </Row>
        </Card>
      </Section>

      <Section title="Henger és kettős kúp">
        <Card>
          <Row visual={<DayShape kind="cylinder" color="yellow" />} title="Sárga henger">
            <b>Vontatást</b> végző / vontatott kötelékre utaló jelzés.
          </Row>
          <Row
            visual={<DayShape kind="doublecone" color="yellow" />}
            title="Sárga kettős kúp"
          >
            <b>20 m-nél rövidebb</b>, de <b>12 főnél több utas</b> szállítására
            engedélyezett hajó.
          </Row>
          <Row
            visual={<DayShape kind="doublecone" color="green" count={2} />}
            title="Két zöld kettős kúp egymás felett"
          >
            Munkát végző úszó munkagép / szondázó, mérő hajó azon az oldalán,
            amely felől a <b>hajóút szabad</b>.
          </Row>
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 3.
        fejezet (A hajó látható jelzései). Összefoglaló: shipstore.hu.
      </Source>
    </>
  );
}

// ---------- 2. Zászlók ----------

function Flags() {
  return (
    <>
      <Card>
        <p className="text-sm leading-relaxed text-slate-600">
          A <b>lobogó</b> nincs merev rúdhoz rögzítve (az achterhez kötik), a{" "}
          <b>zászlót</b> zászlórúdra/nyélre erősítik. Minden hajó köteles a
          lajstroma szerinti <b>nemzeti lobogót</b> viselni a hajó farrészén.
        </p>
      </Card>

      <Section title="Lobogóviselés szabályai">
        <Card>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-snug text-slate-600">
            <li>
              A nemzeti lobogót a <b>főhelyen</b>, a farrészi lobogórúdra kell
              felvonni (vontatóhajón a kormányház mögötti rúdra).
            </li>
            <li>
              A jelzőlobogókat a <b>jelzőárbocra</b> vonják fel, vagy
              jelzőzászlóként nyélre erősítve a Szabályzat által megjelölt
              ponton mutatják / lengetik.
            </li>
            <li>
              A kódlobogók egyenként vagy kombinálva rövid, egyértelmű üzenetet
              közvetítenek (Nemzetközi Jelzési Kódex, 1934).
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="Jelzőlobogók a hajózásban">
        <Card>
          <Row visual={<PlainFlag color="red" count={2} />} title="Vörös lobogó (egy vagy két)">
            <b>Áthaladási tilalom</b> – tilos a továbbhaladás.
          </Row>
          <Row visual={<PlainFlag color="green" count={2} />} title="Zöld lobogó (egy vagy két)">
            <b>Az áthaladás engedélyezett.</b>
          </Row>
          <Row visual={<PlainFlag color="green" />} title="Zöld lobogó kompon / személyhajón">
            A hajó a kikötő térségében <b>közlekedésének elősegítését kéri</b>{" "}
            (más hajótól műveletezési könnyítést).
          </Row>
          <Row visual={<PlainFlag color="blue" />} title="Világoskék zászló">
            Erős villogó fehér fénnyel együtt: a hegymenő nagyhajó a{" "}
            <b>jobb oldala felől enged utat</b> a szembe jövő völgymenő hajónak
            (találkozási jelzés).
          </Row>
          <Row visual={<PlainFlag color="red" />} title="Lobogó / zászló körkörös mozgatása">
            <b>Vészjelzés:</b> a hajó veszélyben van, segítséget kér. Ugyanezt
            jelenti egy <b>lobogó, alatta gömb</b> elhelyezése is.
          </Row>
        </Card>
      </Section>

      <Section title="Fontos kódlobogók">
        <Card>
          <Row visual={<CodeFlag letter="A" />} title='„A" – Alfa (fehér-kék)'>
            <b>Búvár van a vízben</b> – lassíts és tarts távolságot! Belvízen a
            búvármunkát a <b>2-es számú lobogó</b> jelzi.
          </Row>
          <Row visual={<CodeFlag letter="B" />} title='„B" – Bravo (vörös)'>
            <b>Veszélyes árut</b> veszek fel, rakodok ki vagy szállítok.
          </Row>
          <Row visual={<CodeFlag letter="O" />} title='„O" – Oscar (vörös-sárga)'>
            <b>Ember a vízben!</b> (man overboard)
          </Row>
          <Row visual={<CodeFlag letter="H" />} title='„H" – Hotel (fehér-vörös)'>
            <b>Révkalauz van a fedélzeten.</b>
          </Row>
          <Row visual={<CodeFlag letter="P" />} title='„P" – Papa (kék-fehér)'>
            „Blue Peter" – a hajó <b>hamarosan indul</b>, mindenki térjen a
            fedélzetre.
          </Row>
        </Card>
      </Section>

      <Section title="A teljes ábécé">
        <Card>
          <p className="text-sm leading-relaxed text-slate-600">
            A 26 betűs kódlobogó-ábécé a fonetikus nevekkel: Alfa, Bravo,
            Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo,
            Lima, Mike, November, <b>Oscar</b>, Papa, Quebec, Romeo, Sierra,
            Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Minden lobogó
            egy betűnek felel meg, és önálló jelentése is van.
          </p>
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 15.
        melléklet (lobogóviselés); Nemzetközi Jelzési Kódex (ICS).
      </Source>
    </>
  );
}

// ---------- 3. Fények (Lights) ----------

function Lights() {
  return (
    <>
      <Card>
        <p className="mb-3 text-sm leading-relaxed text-slate-600">
          Éjszaka a fények mutatják a hajó helyzetét és haladási irányát.
          Felülnézetből minden fény egy adott <b>látószögben</b> világít: a{" "}
          <b>vörös</b> mindig a <b>bal</b>, a <b>zöld</b> mindig a <b>jobb</b>{" "}
          oldalon, a farfény <b>fehér</b> és hátra néz.
        </p>
        <LightView lights={["starboard", "port", "stern"]} size={170} glow />
        <p className="mt-2 text-center text-xs text-slate-400">
          Menetben lévő hajó képe felülről: zöld jobbra, vörös balra, fehér
          hátra. A három ív együtt körbeér (360°).
        </p>
      </Card>

      <Section title="A fények típusai">
        <Card>
          <Row
            visual={<LightView lights={["masthead"]} size={92} />}
            title="Árbocfény (topfény) – fehér, 225°"
          >
            Elöl, a hossztengelyben, magasan (géphajón min. 6 m, 40 m alatt 4
            m). <b>Előre és oldalra előre</b> világít.
          </Row>
          <Row
            visual={<LightView lights={["starboard", "port"]} size={92} />}
            title="Oldalfények – zöld / vörös, egyenként 112,5°"
          >
            Zöld a <b>jobb</b>, vörös a <b>bal</b> oldalon, az árbocfénynél min.
            1 m-rel lejjebb. Csak előre-oldalra látszanak.
          </Row>
          <Row
            visual={<LightView lights={["stern"]} size={92} />}
            title="Farfény – fehér, 135°"
          >
            Hátul, <b>hátrafelé</b> világít, hogy a mögötte haladó hajóról jól
            látható legyen.
          </Row>
          <Row
            visual={<LightView lights={["allround"]} size={92} />}
            title="Körfény – 360°"
          >
            <b>Minden irányból</b> látható fény; pl. horgonyon álló vagy kis
            méretű hajó jelzésére.
          </Row>
        </Card>
      </Section>

      <Section title="Tipikus felállások (felülnézet)">
        <Card>
          <Row
            visual={<LightView lights={["masthead", "starboard", "port", "stern"]} size={110} glow />}
            title="Menetben lévő géphajó"
          >
            Árbocfény (fehér, elöl) + zöld/vörös oldalfény + fehér farfény.
          </Row>
          <Row
            visual={<LightView lights={["starboard", "port", "stern"]} size={110} glow />}
            title="Vitorlás hajó (gép nélkül)"
          >
            Oldalfények + farfény, <b>árbocfény nélkül</b>. 20 m alatt egyetlen
            háromszínű lámpába vonható az árboccsúcson; <b>7 m alatt</b> elég egy
            minden oldalról látható fehér fény.
          </Row>
          <Row
            visual={<LightView lights={["allround"]} size={110} glow />}
            title="Horgonyon álló hajó"
          >
            Minden oldalról látható <b>fehér körfény</b>.
          </Row>
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 3.
        fejezet; az ívek (225° / 112,5° / 135° / 360°) a COLREGS / belvízi
        szabályzat szerinti szabványos értékek.
      </Source>
    </>
  );
}

// ---------- router shell ----------

const CONTENT = {
  "gombok-kupok": Shapes,
  zaszlok: Flags,
  fenyek: Lights,
};

export default function MaterialDetail() {
  const { topicId } = useParams();
  const topic = TOPICS.find((t) => t.id === topicId);
  const Body = CONTENT[topicId];

  if (!topic || !Body) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Ismeretlen témakör.</p>
        <Link to="/materials" className="mt-3 inline-block text-brand">
          ← Tananyag
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-3 px-1">
        <Link to="/materials" className="text-sm font-medium text-brand">
          ← Tananyag
        </Link>
      </div>
      <header className="mb-4 flex items-center gap-3 px-1">
        <span className="text-3xl leading-none">{topic.icon}</span>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{topic.title}</h1>
          <p className="text-sm text-slate-500">{topic.subtitle}</p>
        </div>
      </header>
      <Body />
    </div>
  );
}
