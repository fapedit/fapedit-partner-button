# FAPEDIT partner-button.js
A partner-button.js egy olyan publikus JavaScript könyvtár, aminek a segítségével a FAPEDIT szolgáltatásaihoz vezető gombot lehet elhelyezni egy külső, partnerkapcsolatban álló fél által üzemeltett weboldalon.

Vegye fel velünk a kapcsolatot a fapedit@fapedit.hu email címen!

Interaktív demonstráció: http://run.plnkr.co/plunks/4OAdOo7gqN0YgFTUPXCy/

---

A partner-button.js felhasználásához az alábbi hívókód elhelyezése **szükséges** a weboldalon (jellemzően a `<head>` fejlécbe):
```html
<script>(function(f,a,p,e,d,i,t){f.FapeditPartnerButton=e;f[e]=(function() {t=a.createElement('button');t.style.visibility='hidden';f[e].p.push({a:arguments,e:t});return t;});f[e].p=[];f[e].v=!!d;t=a.createElement('script');t.type='text/javascript';t.async=!0;t.src=p;a.getElementsByTagName('head')[0].appendChild(t);i=new Object();i.setPartnerId=(function(r) {f[e].r=r;return i;});return i;})(window,document,'http://static.fapedit.hu/js/partner-button/1.0/partner-button.js','genFapeditPartnerButton',false).setPartnerId('xxxxxxxx');</script>
```

> **FIGYELEM!**
> A kód végén, a `setPartnerId()` hívás argumentuma a 8 karakter hosszú partner azonosító, amit a FAPEDIT üzemeltetői biztosítanak. Teszteléshez a `test0001` partner azonosító használható.

## API: a genFapeditPartnerButton() függvény
A hívókód elérhetővé teszi az alábbi függvényt, amivel gombot lehet generálni:
```
HTMLButtonElement genFapeditPartnerButton(Object options)
```
> **FIGYELEM!**
> A függvény **nem** helyezi el a generált gombot a DOM-ban, a visszatérő érték maga a hívó környezet által elhelyezendő gomb html-elem.

Funkció szerint kétféle gomb generálható:
* a FAPEDIT Asszisztens főoldalára vezető gomb
* egy, a FAPEDIT adatbázisában szereplő termék részletes adatlapjára vezető gomb

## A FAPEDIT főoldalára vezető gomb generálása
A http://live.fapedit.hu/ címre vezető gomb generálásához az alábbi paraméter használata **szükséges**:

* `string caption`:
a gombon megjelenő logó

  * `branding` FAPEDIT logó megjelenítése a gombon
  * `brandingF` FAPEDIT logóból kiemelt F betű megjelenítése a gombon

Pl.: `genFapeditPartnerButton({caption: 'brandingF'});`

## Termék adatlapra vezető gomb generálása
Egy termék adatlapjára vezető gomb generálásához az alábbi paraméterek használata **szükséges**:

* `string caption`:
a gombon megjelenő felirat

  * `viewProps` "Jellemzők megtekintése"
  * `createFrom` "Kiírás készítése"
  * `addTo` "Hozzáadás a termékkiíráshoz"

* `string query` -
termék azonosító lekérdezés (a FAPEDIT üzemeltetőitől kapott, `q=[...]&s=[...]` formátum)

Pl.: `genFapeditPartnerButton({caption: 'viewProps', query: 'q=dorken_delta-alpina&s=alatethejazat'});`

## Gomb stílusának meghatározása (opcionális)
A generált gomb (a FAPEDIT arculata szerint) meghatározott vizuális stílusú lehet, ennek meghatározása az alábbi paraméteren keresztül *lehetséges*:

* `string style`:
a gomb vizuális stílusa

  * `white_green` fehér háttér, *zöld* vonalrajz
  * `white_gray` fehér háttér, *szürke* vonalrajz
  * `green` *zöld* háttér, fehér vonalrajz
  * `gray` *szürke* háttér, fehér vonalrajz

Továbbá, a gombok alapértelmezetten téglalap/négyzet alakúak, a kerekített sarkú változathot a fenti konstansok bármelyikének a végére a `_rounded` részkarakterlánc fűzendő. Pl.: `white_gray_rounded`

Pl.: `genFapeditPartnerButton({caption: 'branding', style: 'green'});`

## Gomb méretének meghatározása (opcionális)
A generált gomb méretének meghatározása az alábbi paramétereken keresztül *lehetséges*:

* `string scale`:
a gomb mérete

  * `small` kb. 10pt betűméret
  * `normal` kb. 13pt betűméret -- javasolt méretezés
  * `large` kb. 16pt betűméret

Pl.: `genFapeditPartnerButton({caption: 'branding', scale: 'small'});`

### VAGY

* `float scale`:
a gomb mérete (a textúra átméretezése szerint),
`]0;1]` valós intervallumból javasolt értékkel

Pl.: `genFapeditPartnerButton({caption: 'branding', scale: .6312});`

### VAGY
az alábbi kulcsok közül *legalább* az egyikkel:

* `int fit_width`:
a gombot befoglaló téglalap szélessége (px mértékegység)

* `int fit_height`:
a gombot befoglaló téglalap magassága (px mértékegység)

> Ezzel a módszerrel meghatározható annak a téglalap alakú területnek a mérete, amibe a gombnak be kell férnie.

Pl.: `genFapeditPartnerButton({caption: 'branding', fit_height: 41, fit_width: 120});`

## A hívókód további funkciói (haladóknak)
A hívókód az alábbi felépítésű:
```javascript
(function(f,a,p,e,d,i,t){[...]})(<hívási paraméterek>).setPartnerId([...]);
```

Ahol a `<hívási paraméterek>` az alábbiak:

1. `window` beépített obj.
2. `document` beépített obj.

> Innentől kezdve következnek a szerkeszthető paraméterek

3. `string js_path`:
a partner-button.js fájl elérési útvonala,
a FAPEDIT üzemeltetői által biztosított hivatalos elérési útvonalak:
    * `http://static.fapedit.hu/js/partner-button/1.0/partner-button.js` (alapértelmezett)
    * `http://static.fapedit.hu/js/partner-button/1.0/partner-button.min.js`

4. `string func_name`:
a `genFapeditPartnerButton()` függvény neve

5. `bool be_verbose`:
hibakereső mód
    * `false` esetén csak a hibák jelzése (`throw Error`) (alapértelmezett)
    * `true` esetén figyelmeztetések és státusz üzenetek generálása a böngésző konzolra -- *release* build-ben nem javasolt

## Támogatott böngészők
MsIE v9+, MsEdge, Firefox v35+, Chrome v53+, Safari v9.1+,
Opera v40+, iOS Safari v9.3+, Android v5+, iOS Firefox

> A partner-button.js fel nem sorolt böngészőket is támogat, de csak *csökkentett módban*: a gombok vizuális stílusa hívási argmentumoktól függetlenül statikus `white_green`-re korlátozódik.