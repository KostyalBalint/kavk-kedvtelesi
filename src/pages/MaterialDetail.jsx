import { Link, useParams } from "react-router-dom";
import { TOPICS } from "./Materials.jsx";
import { KISHAJO_TOPICS } from "../data/kishajo.js";
import {
  Buoy,
  CodeFlag,
  DayShape,
  EncounterScene,
  LightMast,
  LightView,
  PlainFlag,
  ShapeStack,
  SignBoard,
  SpecialSignal,
} from "../components/MaterialDiagrams.jsx";
import {
  FLAG_RULES,
  LIGHTS,
  SIGN_GROUPS,
  signImg,
  SOUNDS,
  SOUND_TIMING,
  SPECIAL_SIGNALS,
} from "../data/hsz.js";

// ---------- shared bits ----------

const DIA = import.meta.env.BASE_URL + "data/diagrams/";

// Full-width official diagram image with a caption.
function DiaImg({ name, caption, h }) {
  return (
    <figure className="my-2">
      <img
        src={DIA + name + ".png"}
        alt={caption || name}
        loading="lazy"
        className="w-full rounded-lg border border-slate-100 bg-white object-contain"
        style={h ? { maxHeight: h } : undefined}
      />
      {caption && (
        <figcaption className="mt-1 text-xs text-slate-500">{caption}</figcaption>
      )}
    </figure>
  );
}

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
            <b>Műveletképtelen</b> (kormányozhatatlan) hajó jelzése.
          </Row>
          <Row
            visual={
              <ShapeStack
                shapes={[
                  { kind: "ball", color: "black" },
                  { kind: "doublecone", color: "black" },
                  { kind: "ball", color: "black" },
                ]}
              />
            }
            title="Gömb – kettős kúp – gömb (függőlegesen)"
          >
            A hajó <b>műveletképességében korlátozott</b> (pl. munkavégzés
            közben).
          </Row>
          <Row visual={<DayShape kind="ball" color="green" />} title="Zöld gömb">
            Menetben lévő <b>komp</b> (köteles vagy szabadon közlekedő) viseli,
            legalább 5 m magasságban.
          </Row>
          <Row visual={<DayShape kind="ball" color="red" />} title="Vörös gömb">
            Munkát végző úszó munkagép azon az oldalán, amely felől a{" "}
            <b>hajóút nem szabad</b>.
          </Row>
          <Row
            visual={<DayShape kind="ball" color="black" count={3} />}
            title="Három fekete gömb (függőlegesen)"
          >
            <b>Aknamentesítéssel</b> foglalkozó hajó.
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
          <p className="mb-1 mt-1 px-1 text-xs text-slate-500">
            A veszélyes árut szállító hajó <b>csúcsával lefelé fordított</b> kék
            kúpo(ka)t visel:
          </p>
          <Row visual={<DayShape kind="cone-down" color="blue" />} title="1 kék kúp (csúccsal le)">
            <b>Gyúlékony</b> (tűzveszélyes) anyagot szállít.
          </Row>
          <Row
            visual={<DayShape kind="cone-down" color="blue" count={2} />}
            title="2 kék kúp"
          >
            <b>Egészségre ártalmas</b> anyagot szállít.
          </Row>
          <Row
            visual={<DayShape kind="cone-down" color="blue" count={3} />}
            title="3 kék kúp"
          >
            <b>Robbanóanyagot</b> szállít.
          </Row>
        </Card>
      </Section>

      <Section title="Kettős kúp">
        <Card>
          <Row
            visual={<DayShape kind="doublecone" color="yellow" />}
            title="Sárga kettős kúp"
          >
            A hajó <b>nem minősül kishajónak</b> (20 m-nél rövidebb, de 12 főnél
            több utas szállítására engedélyezett). Kikötőbe be-/kihajózáskor{" "}
            <b>elsőbbsége</b> van a kishajóval szemben.
          </Row>
          <Row
            visual={<DayShape kind="doublecone" color="green" count={2} />}
            title="Két zöld kettős kúp egymás felett"
          >
            Munkát végző úszómunkagép azon az oldalán, amely felől a{" "}
            <b>hajóút szabad</b> (mindkét oldalon viselve: mindkét oldalon
            szabad az elhajózás). A nem szabad oldalon helyette <b>vörös gömb</b>{" "}
            áll.
          </Row>
        </Card>
      </Section>

      <Section title="Halászhajók">
        <Card>
          <Row
            visual={<DayShape kind="hourglass" color="black" />}
            title="Két fekete kúp, csúccsal egymás felé"
          >
            <b>Vonóhálós</b> (vonóhálót vagy halászeszközt vonszoló) halászhajó.
            Figyelj: ez <b>nem</b> a kettős kúp – itt a csúcsok egymás felé
            néznek.
          </Row>
          <Row
            visual={<DayShape kind="cone" color="black" />}
            title="Egy fekete kúp, csúccsal felfelé"
          >
            <b>Egyéb halászattal</b> foglalkozó (nem vonóhálós) hajó.
          </Row>
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 3.
        fejezet (3.08–3.38 cikk, A hajó látható jelzései); kérdésbank.
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

      <Section title="Lobogóviselés szabályai (II–8. melléklet)">
        <Card>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-snug text-slate-600">
            {FLAG_RULES.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
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

      <Section title="A teljes ábécé (II–3. melléklet)">
        <Card>
          <DiaImg
            name="flag-betu"
            caption="A nemzetközi jelző (kód-) lobogók és lengők: 26 betű + 0–9 számlengő (hivatalos ábra)."
          />
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Minden lobogó egy betűnek felel meg, és önálló jelentése is van;
            egyenként vagy kombinálva használhatók.
          </p>
        </Card>
      </Section>

      <Section title="Különleges jelzések (lobogók, lengők, vészjelek)">
        <Card>
          {SPECIAL_SIGNALS.map((sp) => (
            <Row key={sp.name} visual={specialVisual(sp.flag)} title={sp.name}>
              {sp.meaning}
              <span className="mt-0.5 block text-xs text-slate-300">HSz {sp.cikk}</span>
            </Row>
          ))}
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, II–8.
        melléklet (lobogóviselés) és 3. fejezet (különleges jelzések);
        Nemzetközi Jelzési Kódex (ICS).
      </Source>
    </>
  );
}

function specialVisual(flag) {
  if (flag === "alpha") return <CodeFlag letter="A" size={56} />;
  return <SpecialSignal kind={flag} />;
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
            Elöl, a hossztengelyben, magasan (géphajón min. 5 m, 40 m alatt 4
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

      <Section title="Hajótípusok jelzései (vizsgafontos)">
        <Card>
          {LIGHTS.filter((l) => l.exam).map((l) => (
            <Row
              key={l.cikk + l.vessel}
              visual={lightVisual(l)}
              title={`${l.vessel}`}
            >
              {l.lights.map((x, i) => (
                <span key={i} className="block">
                  • {x}
                </span>
              ))}
              {l.note && <span className="block text-xs text-slate-400">{l.note}</span>}
              <span className="mt-0.5 block text-xs text-slate-300">HSz {l.cikk}</span>
            </Row>
          ))}
        </Card>
      </Section>

      <Section title="További jelzések (nagyhajó, kötelék, különleges)">
        <Card>
          {LIGHTS.filter((l) => !l.exam).map((l) => (
            <div key={l.cikk + l.vessel} className="border-b border-slate-100 py-2 last:border-0">
              <p className="text-sm font-semibold text-slate-700">
                {l.vessel} <span className="text-xs font-normal text-slate-300">HSz {l.cikk}</span>
              </p>
              {l.lights.map((x, i) => (
                <p key={i} className="text-sm leading-snug text-slate-500">• {x}</p>
              ))}
              {l.note && <p className="text-xs text-slate-400">{l.note}</p>}
            </div>
          ))}
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 3.
        fejezet (3.08–3.38 cikk); az ívek (225° / 112°30′ / 135° / 360°) az
        1.01 fogalommeghatározás szerint.
      </Source>
    </>
  );
}

// Pick the right diagram for a light entry: top-view sectors, day-shapes, or
// a colour legend when only stacked all-round lights are defined.
function lightVisual(l) {
  if (l.view) return <LightView lights={l.view} size={96} glow />;
  if (l.mast) return <LightMast lights={l.mast} size={84} />;
  if (l.flag) return <CodeFlag letter={l.flag} size={56} />;
  if (l.shapes) {
    const shapes = l.shapes.map((sp) => {
      const [kind, color] = sp.split(":");
      return { kind, color };
    });
    return <ShapeStack shapes={shapes} size={40} />;
  }
  return <span className="text-2xl">💡</span>;
}

// ---------- 4. Táblák ----------

function Signs() {
  return (
    <>
      <Card>
        <p className="text-sm leading-relaxed text-slate-600">
          A vízi út jelzőtábláit (I–7. melléklet) öt csoportba sorolják. Az
          alak és szín a csoportot, a piktogram a konkrét jelentést adja. Két
          egymás feletti tábla a <b>tartós</b> jelzést jelenti.
        </p>
      </Card>

      {SIGN_GROUPS.map((g) => (
        <Section key={g.cat} title={`${g.cat} – ${g.label}`}>
          <Card>
            <p className="mb-1 px-1 text-xs leading-relaxed text-slate-500">
              {g.desc}
            </p>
            {g.signs.map((sg) => (
              <div
                key={sg.code}
                className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0"
              >
                <div className="flex w-20 shrink-0 items-center justify-center">
                  <SignBoard code={sg.code} cat={g.cat} glyph={sg.glyph} img={signImg(sg.code)} size={72} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{sg.code}</p>
                  <p className="text-sm leading-snug text-slate-500">{sg.title}</p>
                  {sg.note && <p className="text-xs text-slate-400">{sg.note}</p>}
                </div>
              </div>
            ))}
          </Card>
        </Section>
      ))}

      <Section title="Kiegészítő jelzések (I–7. melléklet, II. rész)">
        <Card>
          <p className="mb-1 text-sm leading-relaxed text-slate-600">
            Az alapjelzések távolságtáblával, nyilakkal, fény- és magyarázó
            táblával egészíthetők ki:
          </p>
          <DiaImg name="suppl-tavolsag" caption="1. Távolságtábla – ettől a ponttól érvényes az előírás (a tábla az alapjelzés felett)." />
          <DiaImg name="suppl-nyil-zold" caption="2. Fehér nyíl zöld fénnyel: a nyíl irányában a behajózás megengedett." />
          <DiaImg name="suppl-nyil-voros" caption="2. Fehér nyíl vörös fénnyel: a nyíl irányában a behajózás tilos." />
          <DiaImg name="suppl-irany1" caption="3. A szakasz irányát jelző nyilak (az alapjelzés mellett/alatt)." />
          <DiaImg name="suppl-magyarazo" caption="4. Magyarázó / kiegészítő tájékoztató tábla (az alapjelzés alatt)." />
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, I–7.
        melléklet (a hajózást szabályozó jelzések, CEVNI A/B/C/D/E rendszer és a
        II. rész kiegészítő jelzései). A táblaképek és kiegészítő ábrák a
        hivatalos melléklet képei.
      </Source>
    </>
  );
}

// ---------- 5. Bóják, hajóút ----------

function Buoys() {
  return (
    <>
      <Card>
        <p className="text-sm leading-relaxed text-slate-600">
          A <b>hajóút</b> a vízi útnak az adott vízállásnál hajózásra használt,
          jelzésekkel kitűzött része. A part oldalait a <b>forrástól a torkolat
          felé</b> haladva értelmezzük: így van <b>bal</b> és <b>jobb part</b>.
        </p>
      </Card>

      <Section title="Laterális (oldalsó) kitűzőjelek">
        <Card>
          <Row visual={<Buoy side="right" />} title="Vörös, henger alakú bója">
            A hajóút <b>jobb szélét</b> és a <b>jobb part</b> közeli veszélyeket
            jelöli. (Vörös fény / „P" betű: veszteglőhelyet határol.)
          </Row>
          <Row visual={<Buoy side="left" />} title="Zöld, kúp alakú bója">
            A hajóút <b>bal szélét</b> és a <b>bal part</b> közeli veszélyeket
            jelöli. (Zöld fény / „P" betű: bal parti veszteglőhely.)
          </Row>
        </Card>
      </Section>

      <Section title="Melyik oldalról kerüljem ki?">
        <Card>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="mb-1 font-semibold text-slate-700">Völgymenet ⬇</p>
              <p className="text-slate-500">(árral, torkolat felé)</p>
              <p className="mt-2">
                Vörös bója: <b>jobb</b> oldalad felől
                <br />
                Zöld bója: <b>bal</b> oldalad felől
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="mb-1 font-semibold text-slate-700">Hegymenet ⬆</p>
              <p className="text-slate-500">(ár ellen, forrás felé)</p>
              <p className="mt-2">
                Vörös bója: <b>bal</b> oldalad felől
                <br />
                Zöld bója: <b>jobb</b> oldalad felől
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Egyszerűen: a bóját mindig a hozzá tartozó part felé hagyod. A jelek
            a vízállás szerint kitűzött hajóút szélét mutatják.
          </p>
        </Card>
      </Section>

      <Section title="Hivatalos kitűzőjelek (I–8. melléklet)">
        <Card>
          <DiaImg name="buoy-152" caption="A hajóút JOBB oldala – vörös jelek (bója, úszó, karó)." />
          <DiaImg name="buoy-154" caption="A hajóút BAL oldala – zöld jelek." />
        </Card>
      </Section>

      <Section title="Kardinális és különleges jelek">
        <Card>
          <DiaImg name="buoy-187" caption="Kardinális jelek (Észak / Kelet / Dél / Nyugat) – a veszélyt a megnevezett égtáj felől kell kikerülni." />
          <DiaImg name="buoy-188" caption="Különálló veszélyes helyet jelző jel." />
          <DiaImg name="buoy-189" caption="Biztonságos vizek jelzése." />
          <DiaImg name="buoy-190" caption="Meghatározott rendeltetésű vízterület (pl. vízi sportpálya, horgonyzóhely) – sárga jel." />
          <DiaImg name="buoy-191" caption="Hajózástól elzárt terület." />
        </Card>
      </Section>

      <Section title="Feltakaró (átmeneti) jelek">
        <Card>
          <p className="mb-2 text-sm leading-relaxed text-slate-600">
            A <b>feltakaró jelek</b> a hosszú <b>átmenet</b> (a hajóút egyik
            partról a másikra váltása) <b>tengelyvonalát</b> jelölik: két
            egyforma jel ugyanazon a parton, egymás mögött. A <b>mellső jelet
            alacsonyabban</b>, a <b>hátsót magasabban</b> helyezik el – ha a
            két jel a látómezőben <b>egymás fölé kerül (fedésbe)</b>, a hajó a
            tengelyvonalon halad. Fény: sárga, a mellső villogó, a hátsó
            állandó.
          </p>
          <DiaImg name="buoy-171" caption="Jobbparti feltakaró jelek – négyzetes sárga tábla, fekete csíkkal (mellső + hátsó)." />
          <DiaImg name="buoy-173" caption="Balparti feltakaró jelek – rombusz alakú sárga tábla (mellső + hátsó)." />
          <DiaImg name="buoy-170" caption="Elhelyezés a hajóúton: az átmenet tengelyvonalát jelző jelpárok a partokon." />
        </Card>
      </Section>

      <Section title="Áttekintő ábra – tavi kitűzés">
        <Card>
          <DiaImg name="buoy-195" caption="A vízi úton elhelyezett jelek együtt: tiltó zónák, lateral és kardinális bóják, kikötő, sebességkorlátozás." />
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, I–8.
        melléklet (kitűző jelzések); az ábrák a hivatalos melléklet képei.
      </Source>
    </>
  );
}

// ---------- 6. Hangjelzések ----------

function soundIcon(pattern) {
  // S = short (narrow block), L = long (wide), V = very-short series, plus
  // bell / info pictograms.
  if (pattern === "bell") return <span className="text-2xl">🔔</span>;
  if (pattern === "info") return <span className="text-xl">🌫️</span>;
  const blocks =
    pattern === "V"
      ? Array(6).fill("v")
      : pattern.split("");
  return (
    <span className="inline-flex items-end gap-0.5">
      {blocks.map((p, i) => (
        <span
          key={i}
          className={`rounded-sm bg-slate-700 ${
            p === "L" ? "h-3 w-5" : p === "v" ? "h-3 w-1" : "h-3 w-2"
          }`}
        />
      ))}
    </span>
  );
}

function Sounds() {
  return (
    <>
      <Card>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-snug text-slate-600">
          {SOUND_TIMING.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </Card>

      {SOUNDS.map((grp) => (
        <Section key={grp.group} title={grp.group}>
          <Card>
            {grp.items.map((it, i) => (
              <Row key={i} visual={soundIcon(it.pattern)} title={patternLabel(it.pattern)}>
                {it.title}
              </Row>
            ))}
          </Card>
        </Section>
      ))}

      <Section title="Hivatalos jelábrák (I–6. melléklet)">
        <Card>
          <DiaImg name="sound-altalanos" caption="A. Általános jelzések" />
          <DiaImg name="sound-talalkozas1" caption="B. Találkozás – első eset" />
          <DiaImg name="sound-talalkozas2" caption="B. Találkozás – második eset" />
          <DiaImg name="sound-elozes1" caption="C. Előzés – első eset" />
          <DiaImg name="sound-elozes2" caption="C. Előzés – második eset" />
          <DiaImg name="sound-elozes_nem" caption="C. Az előzés nem lehetséges" />
          <DiaImg name="sound-fordulas" caption="D. A fordulás jelzései" />
          <DiaImg name="sound-behajozas" caption="E. Kikötőbe/mellékvíziútba behajózás és kihajózás" />
          <DiaImg name="sound-kihajozas_kereszt" caption="E. Kihajózás a víziút keresztezésével" />
          <DiaImg name="sound-kod_radar" caption="F/a. Korlátozott látás – radarral közlekedő hajók" />
          <DiaImg name="sound-kod_radarnelkul" caption="F/b. Korlátozott látás – radar nélkül" />
          <DiaImg name="sound-kod_veszteglo" caption="F/c. Korlátozott látás – veszteglő hajók" />
          <DiaImg name="sound-indulas" caption="G. Veszteglőhelyről forduló nélküli induláskor" />
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 4. cikk
        és I–6. melléklet (hangjelzések); az ábrák a hivatalos melléklet
        képei.
      </Source>
    </>
  );
}

function patternLabel(p) {
  const map = { S: "1 rövid", SS: "2 rövid", SSS: "3 rövid", SSSS: "4 rövid", L: "1 hosszú", LLL: "ismételt hosszú", V: "nagyon rövid sorozat", bell: "harangkongatás", info: "köd" };
  return map[p] ?? p;
}

// ---------- 7. Kitérés, elsőbbség ----------

function WideRow({ visual, title, children }) {
  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:gap-4">
      <div className="shrink-0">{visual}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-sm leading-snug text-slate-500">{children}</p>
      </div>
    </div>
  );
}

function RightOfWay() {
  return (
    <>
      <Card>
        <p className="text-sm leading-relaxed text-slate-600">
          A kitérési szabályok célja az összeütközés elkerülése. A{" "}
          <b>kishajó</b> (csónak, vízi sporteszköz) <b>kitér minden nem-kishajó
          hajónak</b> (nagyhajó, kötelék, halászó, korlátozott műveletű). A
          jobb oldalán haladó hajó tartja az irányát.
        </p>
      </Card>

      <Section title="Kishajók rangsora (ki kinek tér ki)">
        <Card>
          <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold">
            <span className="rounded-lg bg-emerald-50 px-2 py-1 text-emerald-700">⛵ Vitorlás</span>
            <span className="text-slate-400">›</span>
            <span className="rounded-lg bg-sky-50 px-2 py-1 text-sky-700">🚣 Emberi erő</span>
            <span className="text-slate-400">›</span>
            <span className="rounded-lg bg-slate-100 px-2 py-1 text-slate-600">🚤 Gépi</span>
          </div>
          <p className="text-center text-xs text-slate-500">
            Aki jobbra áll, az tér ki. A gépi kishajó kitér az emberi erővel
            hajtott és a vitorlás elől; az emberi erővel hajtott a vitorlás
            elől. (HSz II. rész 5.04)
          </p>
        </Card>
      </Section>

      <Section title="Keresztezés – jobbról jövőnek elsőbbség">
        <Card>
          <WideRow
            visual={<EncounterScene kind="crossRight" />}
            title="Keresztező útvonal"
          >
            Ha két azonos fajtájú hajó útvonala keresztezi egymást, a{" "}
            <b>jobbról érkezőnek van elsőbbsége</b> – aki őt a jobb oldala felől
            látja, kitér és <b>mögötte</b> halad el. (6.03 / II. rész 5.04)
          </WideRow>
          <WideRow
            visual={<EncounterScene kind="dist30" label="30 m" color="#0ea5e9" />}
            title="Gépi kishajó ↔ evezős"
          >
            A gépi kishajó kitér az emberi erővel hajtott csónak elől, és – ha a
            víz engedi – legalább <b>30 m</b> távolságot tart tőle.
          </WideRow>
        </Card>
      </Section>

      <Section title="Találkozás folyón">
        <Card>
          <WideRow
            visual={<EncounterScene kind="riverMeet" />}
            title="Hegymenet ad utat a völgymenetnek"
          >
            Szembetalálkozáskor a <b>hegymenetben</b> (ár ellen) haladó köteles
            utat engedni a <b>völgymenetben</b> (árral) haladónak. (6.04)
          </WideRow>
        </Card>
      </Section>

      <Section title="Tiltott keresztezés / megközelítés">
        <Card>
          <WideRow
            visual={<EncounterScene kind="noCrossAhead" label="1000 m" />}
            title="Menetben lévő nagyhajó"
          >
            A nagyhajó <b>haladási irányában 1000 m</b>-en belül{" "}
            <b>tilos keresztezni</b> az útvonalát. (II. rész)
          </WideRow>
          <WideRow
            visual={<EncounterScene kind="noCrossAhead" label="1500 m" color="#f59e0b" />}
            title="Gyorsjáratú hajó (2 gyors sárga villogó)"
          >
            A percenként 100–120-szor villanó, <b>2 sárga fényt</b> viselő
            gyorsjáratú hajó útvonalát <b>1500 m</b>-en belül tilos keresztezni.
          </WideRow>
          <WideRow
            visual={<EncounterScene kind="sternZone" label="1000 m" />}
            title="Aknamentesítő hajó (3 fekete gömb / 3 zöld fény)"
          >
            A 3.37 jelzést viselő hajó <b>farát 1000 m</b>-nél közelebb
            megközelíteni tilos. (6.34)
          </WideRow>
          <WideRow
            visual={<EncounterScene kind="sternZone" label="fara" />}
            title="Halászattal foglalkozó hajó"
          >
            Tilos a halászó hajó <b>fara közelében</b> elhaladni (a kivetett
            háló miatt).
          </WideRow>
        </Card>
      </Section>

      <Section title="Egyéb fontos szabályok">
        <Card>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-snug text-slate-600">
            <li>
              Vitorlás kishajók közt: <b>különböző csapáson</b> a szelet a{" "}
              <b>bal oldalán</b> kapó hajó tér ki; <b>azonos csapáson</b> a{" "}
              <b>szél felőli</b> (luvos) hajó tér ki a szél alatti (leeos) elől.
            </li>
            <li>
              A vitorla mellett a <b>gépét is használó</b> hajó{" "}
              <b>géphajónak minősül</b> (nappal csúccsal lefelé fekete kúp).
            </li>
            <li>
              A kitérő/forduló szándékot hangjellel jelezzük:{" "}
              <b>1 rövid = jobbra</b>, <b>2 rövid = balra</b>; bizonytalan
              helyzetben <b>1 hosszú = figyelem</b>. (lásd <i>Hangjelzések</i>)
            </li>
          </ul>
        </Card>
      </Section>

      <Source>
        Forrás: 57/2011. (XI. 22.) NFM rendelet – Hajózási Szabályzat, 6.
        fejezet (6.01–6.34) és II. rész (kishajókra vonatkozó kiegészítő
        szabályok).
      </Source>
    </>
  );
}

// ---------- router shell ----------

const CONTENT = {
  "gombok-kupok": Shapes,
  zaszlok: Flags,
  fenyek: Lights,
  tablak: Signs,
  bojak: Buoys,
  hangjelzesek: Sounds,
  kiteres: RightOfWay,
};

// Generic renderer for data-driven topics (Kishajó, later Tengeri IV.).
const GENERIC_TOPICS = [...KISHAJO_TOPICS];

function GenericTopic({ topic }) {
  return (
    <>
      {topic.sections.map((sec) => (
        <Section key={sec.title} title={sec.title}>
          <Card>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-slate-600">
              {sec.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </Card>
        </Section>
      ))}
      {topic.source && <Source>Forrás: {topic.source}</Source>}
    </>
  );
}

export default function MaterialDetail() {
  const { cat, topicId } = useParams();
  const hszTopic = TOPICS.find((t) => t.id === topicId);
  const genericTopic = GENERIC_TOPICS.find((t) => t.id === topicId);
  const topic = hszTopic || genericTopic;
  const HszBody = CONTENT[topicId];
  const backTo = cat ? `/materials/${cat}` : "/materials";

  if (!topic || (!HszBody && !genericTopic)) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Ismeretlen témakör.</p>
        <Link to={backTo} className="mt-3 inline-block text-brand">
          ← Vissza
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-3 px-1">
        <Link to={backTo} className="text-sm font-medium text-brand">
          ← Vissza
        </Link>
      </div>
      <header className="mb-4 flex items-center gap-3 px-1">
        <span className="text-3xl leading-none">{topic.icon}</span>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{topic.title}</h1>
          <p className="text-sm text-slate-500">{topic.subtitle}</p>
        </div>
      </header>
      {HszBody ? <HszBody /> : <GenericTopic topic={genericTopic} />}
    </div>
  );
}
