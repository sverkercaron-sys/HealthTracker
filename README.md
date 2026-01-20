# HealthTracker

En omfattande hälsoapplikation byggd med React Native (Expo) som integrerar med Apple Health och Google Fit.

## Funktioner

### MVP (Phase 1)
- ✅ Autentisering (registrering, inloggning)
- ✅ Onboarding
- ✅ Dashboard med widgets
- 🔄 Nutrition tracking (mat, vatten)
- 🔄 Fitness tracking (träning, steg)
- 🔄 Wellness tracking (sömn, humör)

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

1. Klona repot och navigera till mappen:
```bash
cd HealthTracker
```

2. Installera dependencies:
```bash
npm install
```

3. Konfigurera Firebase:
   - Skapa ett projekt på [Firebase Console](https://console.firebase.google.com/)
   - Skapa en webbapp i ditt Firebase-projekt
   - Kopiera konfigurationsvärdena till `src/services/firebase.ts`

4. Starta utvecklingsservern:
```bash
npm start
```

5. Skanna QR-koden med Expo Go-appen på din mobil

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

**STEG 4: 🔄 Dashboard** - Nästa
**STEG 5: Nutrition**
**STEG 6: Fitness**
**STEG 7: Wellness**

## Scripts

```bash
npm start          # Starta Expo development server
npm run android    # Öppna i Android emulator
npm run ios        # Öppna i iOS simulator (kräver macOS)
npm run web        # Öppna i webbläsare
```

## Licens

Private - inte för distribution
