# 🚀 Snabbguide: Kom igång med HealthTracker

## Vad du behöver

### 1. Installera Node.js på din dator
- Gå till: https://nodejs.org/
- Ladda ner **LTS-versionen** (den rekommenderade)
- Installera genom att dubbelklicka på nedladdad fil
- Följ installationsguiden (klicka bara "Next" hela vägen)

### 2. Verifiera att Node.js är installerat
Öppna en terminal/kommandotolk:
- **Windows**: Tryck Windows-knappen → Skriv "cmd" → Enter
- **Mac**: Tryck Cmd+Space → Skriv "terminal" → Enter

Skriv i terminalen:
```bash
node --version
```

Om du ser något som `v18.17.0` eller liknande så funkar det! ✅

### 3. Installera Expo Go på din telefon
- **iPhone**: App Store → Sök "Expo Go" → Installera
- **Android**: Google Play → Sök "Expo Go" → Installera

---

## Ladda upp till GitHub (gör detta FÖRST)

### Steg 1: Skapa ett nytt repo på GitHub
1. Gå till https://github.com och logga in
2. Klicka på **+** (uppe till höger) → **New repository**
3. Namnge det: `HealthTracker`
4. Välj **Private** (om du vill ha det privat)
5. **VIKTIGT**: Kryssa INTE i "Initialize with README" (vi har redan en!)
6. Klicka **Create repository**

### Steg 2: Pusha koden till GitHub
GitHub visar nu instruktioner. Du ska använda den andra delen:
**"…or push an existing repository from the command line"**

**Öppna en terminal/Git Bash på DENNA server** där HealthTracker-mappen finns:

```bash
cd /home/user/HealthTracker
git remote add origin https://github.com/DITT-ANVÄNDARNAMN/HealthTracker.git
git branch -M main
git push -u origin main
```

> **OBS!** Byt ut `DITT-ANVÄNDARNAMN` mot ditt faktiska GitHub-användarnamn!

GitHub kommer fråga efter ditt lösenord. **Använd inte ditt vanliga lösenord!** Du behöver en **Personal Access Token**:
- Gå till GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token → Ge det ett namn → Kryssa i "repo"
- Kopiera token och använd som lösenord

---

## Ladda ner och köra på DIN egen dator

### Steg 1: Klona projektet från GitHub
Öppna en terminal på din **egen dator** (inte servern):

```bash
cd Dokument
git clone https://github.com/DITT-ANVÄNDARNAMN/HealthTracker.git
cd HealthTracker
```

> Byt ut `DITT-ANVÄNDARNAMN` mot ditt GitHub-användarnamn!

### Steg 2: Installera alla paket
```bash
npm install
```

Detta tar 2-5 minuter. Du ser massa text som rullar förbi - det är normalt!

### Steg 3: Starta appen
```bash
npx expo start
```

Du kommer se:
- Massa text i terminalen
- En QR-kod
- Ett meddelande som säger var Metro Bundler körs

### Steg 4: Öppna på din telefon

**Viktigt**: Din telefon och dator måste vara på **samma WiFi-nätverk**!

**iPhone:**
1. Öppna vanliga Kamera-appen
2. Rikta mot QR-koden
3. En notis dyker upp - tryck på den
4. Expo Go öppnas och laddar appen

**Android:**
1. Öppna Expo Go-appen
2. Tryck "Scan QR code"
3. Scanna QR-koden
4. Appen laddar

### Steg 5: Testa appen! 🎉

Första gången kommer det ta lite tid att ladda (1-2 minuter). Du ser en laddningsskärm.

**Vad du kan göra:**
- Logga in / Skapa konto (mock-data, funkar alltid)
- Utforska Dashboard
- Logga måltider i Nutrition
- Logga träningspass i Fitness
- Logga sömn och humör i Wellness
- Byt tema (ljust/mörkt) i Mer

---

## Felsökning

### Problem: "npm: command not found"
**Lösning**: Node.js är inte installerat. Gå tillbaka till steg 1 ovan.

### Problem: "Cannot find module..."
**Lösning**: Kör `npm install` igen.

### Problem: "Network response timed out"
**Lösning**:
1. Kontrollera att telefon och dator är på samma WiFi
2. Starta om: Tryck Ctrl+C i terminalen, kör `npx expo start` igen
3. Försök igen

### Problem: Appen kraschar direkt
**Lösning**:
1. I terminalen, tryck `r` för att ladda om
2. Starta om Expo: Ctrl+C → `npx expo start --clear`

### Problem: QR-kod syns inte
**Lösning**: Scrolla upp i terminalen för att hitta QR-koden.

---

## Kommandosammanfattning

### Från denna server (för att pusha till GitHub):
```bash
cd /home/user/HealthTracker
git remote add origin https://github.com/DITT-ANVÄNDARNAMN/HealthTracker.git
git push -u origin main
```

### På din egen dator (för att köra appen):
```bash
# En gång:
git clone https://github.com/DITT-ANVÄNDARNAMN/HealthTracker.git
cd HealthTracker
npm install

# Varje gång du vill köra appen:
npx expo start
```

---

## Hjälp!

Om något inte fungerar, kontrollera:
1. ✅ Node.js installerat? (`node --version`)
2. ✅ I rätt mapp? (`cd HealthTracker`)
3. ✅ Paket installerade? (`npm install`)
4. ✅ Samma WiFi på telefon och dator?
5. ✅ Expo Go installerat på telefonen?

Lycka till! 🚀
