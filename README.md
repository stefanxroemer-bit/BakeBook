# Römers Küche

**👉 App öffnen: https://stefanxroemer-bit.github.io/BakeBook/**

Dein persönlicher Küchen-Assistent: 91 Rezepte in 15 Kategorien, geführter Kochmodus mit Timern, Kühlschrank-Suche und Einkaufsliste. Eine einzige HTML-Datei, kein Server, kein Login.

**Stand:** 23.11.2026 · Version 4.7 (steht klein auf der Startseite der App)

## Funktionen

- Kochbuch mit Suche (Rezept oder Zutat) und Kategorien
- Portionen umrechnen, Zutaten in Gramm
- Kochmodus: Schritt für Schritt, mehrere Timer parallel, Bildschirm bleibt an
- „Was hab ich da?“: Rezepte aus dem Vorrat finden, inklusive Tauschvorschlägen
- Einkaufsliste mit Abhaken und Kopieren
- Favoriten, Bewertungen, eigene Notizen je Rezept
- Kochmodus zeigt je Schritt die benötigten Zutaten mit Mengen
- Koch-Zähler und Durchschnittsbewertung je Rezept (Bewertung nach jedem Kochen)
- Druckansicht bzw. PDF je Rezept
- Eigene Fotos je Rezept (Kamera oder Galerie, im Rezept auf „📷 Foto hinzufügen“)
- Installierbar auf dem Handy, funktioniert offline

## Veröffentlichen mit GitHub Pages

1. Auf github.com ein neues Repository anlegen, z. B. `roemers-kueche` (bei dir: `BakeBook`, öffentlich, sonst braucht Pages ein bezahltes Konto).
2. **Add file › Upload files**: alle Dateien und den Ordner `icons` aus diesem Paket hineinziehen. Wichtig: auch `.nojekyll` (versteckte Datei, siehe unten).
3. **Commit changes** klicken.
4. **Settings › Pages**: unter *Build and deployment* „Deploy from a branch“, Branch `main`, Ordner `/ (root)`, **Save**.
5. Nach 1–2 Minuten ist die App erreichbar unter
   `https://stefanxroemer-bit.github.io/BakeBook/`

`.nojekyll` wird im Datei-Explorer oft nicht angezeigt. Ohne die Datei läuft die App trotzdem, sie verhindert nur unnötige Verarbeitung durch GitHub.

## Auf dem Handy installieren

- **iPhone (Safari):** Teilen › „Zum Home-Bildschirm“
- **Android (Chrome):** Menü ⋮ › „App installieren“

Danach startet die App wie eine normale App und funktioniert auch ohne Internet.

## Update einspielen

1. Neue `index.html` hochladen (Upload files, bestehende Datei ersetzen).
2. In `sw.js` die Zeile `const VERSION = "…";` auf einen neuen Wert ändern (z. B. Datum).
3. Commit. Geräte holen sich die neue Version beim nächsten Öffnen mit Internet.

## Daten

- Alles wird im Browser des jeweiligen Geräts gespeichert: Einkaufsliste, Notizen, Bewertungen, Vorrat (localStorage) und eigene Fotos (IndexedDB, auf ca. 1400 px verkleinert).
- Kein Abgleich zwischen Geräten. Die Cloud-Speicherung des Vorrats gibt es nur in der Claude-Version der App.
- Die GitHub-Version und die Claude-Version teilen keine Daten.
- Browserdaten löschen = App-Daten weg.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App |
| `manifest.webmanifest` | Name, Farben, Icons für die Installation |
| `sw.js` | Offline-Speicher |
| `favicon.svg`, `favicon.png` | Symbol im Browser-Tab |
| `icons/` | App-Icons (Android, iPhone) |
| `.nojekyll` | GitHub Pages ohne Jekyll ausliefern |

## Technik

Vanilla JavaScript, keine Abhängigkeiten, kein Build-Schritt. Schriften: Fraunces und Libre Franklin (Google Fonts).
