# HealthTracker

En omfattande hälsoapplikation byggd med React Native (Expo) som integrerar med Apple Health och Google Fit.

## Funktioner

### MVP (Phase 1) - ✅ KOMPLETT!
- ✅ Autentisering (registrering, inloggning)
- ✅ Onboarding
- ✅ Dashboard med 5 interaktiva widgets
- ✅ Nutrition tracking (mat, vatten, kalorier, makron)
- ✅ Fitness tracking (träning, steg, aktivitet)
- ✅ Wellness tracking (sömn, humör, stress)

### Kommande funktioner
- Health metrics (vikt, blodtryck, blodsocker)
- Mål och achievements
- Grafer och progress tracking
- Community features
- Notifikationer
- Apple Health & Google Fit integration

## Teknisk Stack

- **Framework:** React Native (Expo)
- **Språk:** TypeScript
- **Navigation:** React Navigation
- **State Management:** React Context API
- **Databas:** Firebase Firestore + SQLite (lokal)
- **UI:** React Native Paper
- **Grafer:** React Native Chart Kit
- **Autentisering:** Firebase Authentication

## Setup

### Förutsättningar
- Node.js 18+
- npm eller yarn
- Expo Go-appen på din mobil (för testing)

### Installation

#### Steg 1: Ladda ner koden från GitHub

1. Gå till detta repo på GitHub: `https://github.com/DITT-ANVÄNDARNAMN/HealthTracker`
2. Klicka på **Code** (grön knapp) → **Download ZIP**
3. Packa upp ZIP-filen någonstans på din dator (t.ex. `Dokument/HealthTracker`)

**ELLER** om du har Git installerat, öppna en terminal och skriv:
```bash
git clone https://github.com/DITT-ANVÄNDARNAMN/HealthTracker.git
cd HealthTracker
```

#### Steg 2: Öppna en terminal i projektmappen

- **Windows**: Högerklicka i mappen → "Öppna i Terminal" eller "Git Bash Here"
- **Mac**: Högerklicka i mappen → "Ny terminal vid mapp"
- **Linux**: Högerklicka i mappen → "Öppna terminal här"

#### Steg 3: Installera beroenden

I terminalen, skriv:
```bash
npm install
```
Vänta medan alla paket laddas ner (kan ta 2-5 minuter).

#### Steg 4: Installera Expo Go på din telefon

- **iPhone**: Öppna App Store → Sök "Expo Go" → Installera
- **Android**: Öppna Google Play → Sök "Expo Go" → Installera

#### Steg 5: Starta appen

I terminalen (där du är i HealthTracker-mappen), skriv:
```bash
npx expo start
```

Du kommer se en QR-kod i terminalen!

#### Steg 6: Öppna på din telefon

1. **iPhone**: Öppna Kamera-appen → Scanna QR-koden → Tryck på notisen
2. **Android**: Öppna Expo Go → Tryck "Scan QR code" → Scanna QR-koden

Appen laddas och startar på din telefon! 🎉

> **Tips**: Se till att både datorn och telefonen är på samma WiFi-nätverk!

## Projektstruktur

```
src/
├── components/          # Återanvändbara UI-komponenter
├── screens/             # Alla skärmar/vyer
│   ├── Auth/           # Login, Register, Onboarding
│   ├── Dashboard/
│   ├── Nutrition/
│   ├── Fitness/
│   ├── Wellness/
│   ├── Progress/
│   ├── Goals/
│   ├── Community/
│   └── Settings/
├── navigation/          # Navigationsstruktur
├── services/            # API-anrop, databas, health integrations
├── context/             # State management (Auth, Theme)
├── utils/               # Hjälpfunktioner
├── constants/           # Färger, storlekar, etc.
└── types/               # TypeScript types
```

## Utvecklingsstatus

**STEG 1: ✅ Projektsetup** - Klart!
- ✅ Expo-projekt initierat
- ✅ Dependencies installerade
- ✅ Mappstruktur skapad
- ✅ TypeScript konfigurerat
- ✅ Firebase setup
- ✅ Theme Context
- ✅ Auth Context

**STEG 2: ✅ Autentisering & Onboarding** - Klart!
- ✅ LoginScreen med formulärvalidering
- ✅ RegisterScreen med Firebase integration
- ✅ OnboardingScreen med välkomstslides
- ✅ SplashScreen
- ✅ Återanvändbara komponenter (Input, Button)
- ✅ Valideringsfunktioner
- ✅ Auth navigation
- ✅ Root navigator med auth state routing

**STEG 3: ✅ Navigation & Grundstruktur** - Klart!
- ✅ Bottom tab navigation med 5 tabs
- ✅ DashboardScreen (uppdaterad placeholder)
- ✅ NutritionScreen (placeholder)
- ✅ FitnessScreen (placeholder)
- ✅ WellnessScreen (placeholder)
- ✅ MoreScreen med menyer
- ✅ Färgkodade tabs med ikoner
- ✅ Temanpassad tab bar

**STEG 4: ✅ Dashboard** - Klart!
- ✅ Widget-komponenter (generiska)
- ✅ StepsWidget med cirkulär progress ring
- ✅ CaloriesWidget med intag vs förbränning
- ✅ WorkoutWidget med dagens träning
- ✅ WaterWidget med quick add
- ✅ SleepWidget med kvalitets-rating
- ✅ ProgressRing och ProgressBar komponenter
- ✅ QuickActionFAB för snabbloggning
- ✅ Fullständigt dashboard med mock-data

**STEG 5: ✅ Nutrition** - Klart!
- ✅ NutritionScreen med dagens sammanfattning
- ✅ Kalorier progress bar
- ✅ MacroBreakdown-komponent
- ✅ MealSection - Kollapsbar måltidssektion
- ✅ FoodItem-komponent
- ✅ AddMealScreen för att lägga till matvaror
- ✅ Stack navigation för Nutrition
- ✅ Mock-data med 4 måltidstyper
- ✅ Radera matvaror

**STEG 6: ✅ Fitness** - Klart!
- ✅ FitnessScreen med steg-tracking
- ✅ Cirkulär progress ring för dagens steg
- ✅ Aktivitetsmått (distans, aktiva minuter, våningar)
- ✅ WorkoutCard-komponent
- ✅ ActivityMetric-komponent
- ✅ LogWorkoutScreen för att logga träning
- ✅ 7 träningstyper att välja mellan
- ✅ Intensitetsnivåer (låg/medel/hög)
- ✅ Stack navigation för Fitness
- ✅ Mock-data med exempel träningspass
- ✅ Radera träningspass

**STEG 7: ✅ Wellness** - Klart!
- ✅ WellnessScreen med dagens data
- ✅ Sömn-tracking (timmar, kvalitet, tider)
- ✅ Humör-tracking med emoji-väljare
- ✅ Stress-tracking med slider (1-10, färgkodad)
- ✅ LogSleepScreen
- ✅ LogMoodScreen
- ✅ MoodPicker-komponent
- ✅ StressSlider-komponent
- ✅ Stack navigation för Wellness
- ✅ Mock-data för demonstration

🎉 **MVP KOMPLETT! Alla 7 steg klara!**

## Scripts

```bash
npm start          # Starta Expo development server
npm run android    # Öppna i Android emulator
npm run ios        # Öppna i iOS simulator (kräver macOS)
npm run web        # Öppna i webbläsare
```

## Licens

Private - inte för distribution
