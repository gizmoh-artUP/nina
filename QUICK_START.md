# ⚡ Quick Start - Nina Portfolio

## 📥 Download & Setup (5 Minuten)

### 1. Dateien entpacken
- Du hast den Ordner `nina-portfolio-app` erhalten
- Speichere ihn an einem Ort deiner Wahl (z.B. Desktop)

### 2. Terminal/Kommandozeile öffnen

**Windows:**
- `Windows + R` drücken
- `cmd` eingeben
- Enter

**Mac:**
- `Cmd + Space`
- "Terminal" eingeben
- Enter

### 3. Zu Projekt-Ordner navigieren

```bash
# Beispiel Windows:
cd C:\Users\DEINNAME\Desktop\nina-portfolio-app

# Beispiel Mac:
cd ~/Desktop/nina-portfolio-app
```

### 4. Dependencies installieren

```bash
npm install
```

⏳ Dauert 2-3 Minuten beim ersten Mal.

### 5. Lokal testen

```bash
npm start
```

🎉 Browser öffnet automatisch auf http://localhost:3000

**Checke:**
- ✅ Website lädt komplett
- ✅ Navigation funktioniert
- ✅ Lightbox öffnet bei Klick auf Kunstwerk
- ✅ Cookie-Banner erscheint
- ✅ Alle Sektionen sichtbar

---

## 🚀 Zu Vercel deployen (10 Minuten)

### Schritt 1: Vercel Account

1. Gehe zu https://vercel.com/signup
2. "Continue with GitHub"
3. GitHub Account verbinden

### Schritt 2: Vercel CLI installieren

```bash
npm install -g vercel
```

### Schritt 3: Deployen

```bash
# Im nina-portfolio-app Ordner:
vercel
```

**Fragen beantworten:**

1. "Set up and deploy?" → `Y`
2. "Which scope?" → Wähle deinen Account
3. "Link to existing project?" → `N`
4. "What's your project's name?" → `nina-bussjaeger-portfolio`
5. "In which directory is your code located?" → `./` (Enter)
6. "Want to override the settings?" → `N`

⏳ Vercel baut und deployed (2-3 Min)

### Schritt 4: Fertig! 🎉

Du bekommst eine URL:
```
✅ Production: https://nina-bussjaeger-portfolio.vercel.app
```

**Teste die Live-Website:**
- Öffne die URL in verschiedenen Browsern
- Teste auf Handy
- Prüfe alle Funktionen

---

## 📝 Content anpassen

### Bevor du live gehst:

1. **Öffne** `src/App.js`

2. **Suche und ersetze** folgende Platzhalter:

**Impressum (Zeile ~1070):**
```javascript
[Straße und Hausnummer] → Echte Adresse
[PLZ] [Ort] → Echte PLZ und Stadt
[Telefonnummer] → Echte Telefonnummer
[USt-IdNr.] → Echte USt-ID (falls vorhanden)
```

**Events (Zeile ~52):**
```javascript
// Aktuelle Ausstellungsdaten eintragen
```

**Artworks (Zeile ~188):**
```javascript
// Echte Bild-URLs eintragen
image: 'https://...'
```

3. **Speichern**

4. **Neu deployen:**
```bash
vercel --prod
```

---

## 🔄 Updates pushen (später)

### Änderungen machen:

1. Editiere `src/App.js`
2. Speichern
3. Deploy:

```bash
vercel --prod
```

Website ist in ~2 Min aktualisiert!

---

## 🆘 Probleme?

### "npm: command not found"
→ Node.js installieren: https://nodejs.org

### "vercel: command not found"
→ `npm install -g vercel` nochmal ausführen

### Build Error
→ Lösche `node_modules` Ordner und führe `npm install` neu aus

### Website zeigt alten Content
→ Hard Refresh: `Ctrl + Shift + R` (Windows) oder `Cmd + Shift + R` (Mac)

---

## 📋 Checklist vor Go-Live

- [ ] Alle Platzhalter im Impressum ersetzt
- [ ] Echte Event-Daten eingetragen
- [ ] Kontakt-Email korrekt
- [ ] Instagram Handle korrekt  
- [ ] Bilder hochgeladen und URLs eingetragen
- [ ] Lokal getestet (npm start)
- [ ] Auf Vercel deployed
- [ ] Live-URL in allen Browsern getestet
- [ ] Mobile Ansicht getestet
- [ ] Alle Links funktionieren
- [ ] Cookie-Banner funktioniert

---

## 🎯 Nächste Schritte nach Launch

1. **Custom Domain** verbinden (siehe DEPLOYMENT_INSTRUCTIONS.md)
2. Mit Nina testen und Feedback sammeln
3. Kleine Anpassungen machen
4. Social Media Posts vorbereiten
5. 🎉 **LAUNCH ANNOUNCEMENT!**

---

**Alles klar? Los geht's! 🚀**
