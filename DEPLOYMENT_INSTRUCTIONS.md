# 🚀 Deployment Instructions - Schritt für Schritt

## Vorbereitung (Einmalig)

### 1. Node.js installieren

- Download: https://nodejs.org (LTS Version)
- Installation durchführen
- Terminal öffnen und testen:
  ```bash
  node --version
  npm --version
  ```

### 2. Git installieren (für GitHub)

- Download: https://git-scm.com
- Installation durchführen

---

## GitHub Setup

### 1. GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `nina-portfolio`
3. Private oder Public (deine Wahl)
4. **NICHT** "Initialize with README" anklicken
5. "Create repository"

### 2. Code zu GitHub pushen

Im Projekt-Ordner (`nina-portfolio-app`):

```bash
# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit
git commit -m "Initial commit - Nina Bussjäger Portfolio"

# Branch umbenennen
git branch -M main

# Remote hinzufügen (ERSETZE YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/nina-portfolio.git

# Zu GitHub pushen
git push -u origin main
```

**Fertig!** Code ist jetzt auf GitHub. ✅

---

## Vercel Deployment (EMPFOHLEN)

### Warum Vercel?
- ✅ Kostenlos für persönliche Projekte
- ✅ Automatische SSL Zertifikate
- ✅ CDN weltweit
- ✅ Automatische Deployments bei Git Push

### 1. Vercel Account erstellen

1. Gehe zu https://vercel.com/signup
2. "Continue with GitHub" klicken
3. Account verknüpfen

### 2. Neues Projekt importieren

1. Dashboard → "Add New..." → "Project"
2. "Import Git Repository"
3. Wähle `nina-portfolio`
4. "Import"

### 3. Build Settings

Vercel erkennt Create React App automatisch:
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

**Alles lassen wie es ist!**

### 4. Deploy!

- Klicke "Deploy"
- Warte 2-3 Minuten
- 🎉 Website ist live!

Du bekommst eine URL wie: `https://nina-portfolio-xyz.vercel.app`

### 5. Custom Domain (Optional)

**Eigene Domain verbinden:**

1. Domain kaufen (Namecheap, Google Domains, etc.)
2. In Vercel: Project → Settings → Domains
3. Domain eingeben (z.B. `ninabussjaeger.com`)
4. DNS Records wie angezeigt bei deinem Domain-Provider eintragen:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Warten (~1 Stunde für DNS Propagation)
6. ✅ Website läuft auf deiner Domain!

---

## Updates Deployen

### Automatisch (nach Git Push):

```bash
# Änderungen machen in src/App.js
# Dann:

git add .
git commit -m "Update: Neues Kunstwerk hinzugefügt"
git push
```

**Vercel deployed automatisch!** (ca. 2 Min)

### Manuell (ohne Git):

```bash
# Im Projekt-Ordner
vercel --prod
```

---

## Netlify Deployment (Alternative)

### 1. Netlify Account

1. https://app.netlify.com/signup
2. "Continue with GitHub"

### 2. Neues Projekt

1. "Add new site" → "Import an existing project"
2. "GitHub" wählen
3. Repository `nina-portfolio` wählen

### 3. Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `build`

### 4. Deploy!

- "Deploy site"
- Warte 2-3 Min
- Website ist live!

URL: `https://random-name-12345.netlify.app`

### Custom Domain auf Netlify:

1. Site settings → Domain management
2. "Add custom domain"
3. DNS wie angezeigt konfigurieren

---

## Troubleshooting

### "npm: command not found"
→ Node.js neu installieren

### "Permission denied" bei npm install
→ `sudo npm install` (Mac/Linux)

### Build fails mit "out of memory"
→ In `package.json` bei scripts ergänzen:
```json
"build": "NODE_OPTIONS=--max_old_space_size=4096 react-scripts build"
```

### Vercel: "Command failed"
→ Lösche `node_modules` und `.vercel` Ordner, dann neu deployen

### Website zeigt 404
→ In Vercel/Netlify Settings: Rewrites prüfen (sollte zu index.html umleiten)

---

## Performance Checklist (Nach Launch)

- [ ] Bilder komprimieren (TinyPNG.com)
- [ ] Lighthouse Test durchführen (Chrome DevTools)
- [ ] Mobile Geschwindigkeit testen
- [ ] SSL Zertifikat aktiv? (HTTPS)
- [ ] Alle Links funktionieren?

---

## Support

- **Vercel**: https://vercel.com/support
- **Netlify**: https://answers.netlify.com
- **React**: https://react.dev/community

---

**Geschätzte Zeit für komplettes Setup:**
- Vorbereitung: 15 Min
- GitHub Push: 5 Min  
- Vercel Deploy: 10 Min
- **Total: ~30 Minuten**

🎉 **Viel Erfolg beim Launch!**
