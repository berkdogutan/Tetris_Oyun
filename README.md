# 🎮 ONE MORE MOVE

> An addictive physics-based casual mobile game for Android

[![Platform](https://img.shields.io/badge/Platform-Android-green.svg)](https://play.google.com)
[![Engine](https://img.shields.io/badge/Engine-Unity%202D-black.svg)](https://unity.com)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()

---

## 🎯 Game Concept

**ONE MORE MOVE** is a hyper-casual mobile game built around the psychological "one more try" loop. Each round lasts 5-10 seconds, encouraging frequent replays and maximizing player retention.

### Core Gameplay
- 🎪 **Simple Controls:** Drag → Aim → Release
- ⚡ **One Move Per Round:** Make it count!
- 🎲 **Physics-Based:** Gravity, bounce, and friction determine your fate
- 🏆 **High Score Chase:** Beat your best with every attempt

---

## 🚀 Quick Start

### Prerequisites
- Unity 2022.3 LTS or newer
- Android SDK (API 21+)
- Google AdMob account (for ads)
- Google Play Console account (for publishing)

### Setup
1. Clone this repository
2. Open the project in Unity Hub
3. Open the `MainMenu` scene
4. Press Play to test

---

## 📂 Project Structure

```
Assets/_Project/
├── Scenes/          # Unity scenes
├── Scripts/         # C# game logic
├── Prefabs/         # Reusable game objects
├── Sprites/         # 2D graphics
├── Audio/           # Sound effects and music
├── Materials/       # Physics materials
└── Animations/      # Animation controllers
```

---

## 🎮 Features

### ✅ Implemented
- [ ] Core drag-and-launch mechanics
- [ ] Physics-based gameplay
- [ ] Procedural level generation
- [ ] Scoring system
- [ ] Game over screen

### 🚧 In Progress
- [ ] Rewarded ad integration
- [ ] Daily challenges
- [ ] Google Play Leaderboards
- [ ] Visual polish & animations

### 📋 Planned
- [ ] Cosmetic skins
- [ ] Multiple game modes
- [ ] Seasonal events
- [ ] Cloud save

---

## 💰 Monetization

### Primary Revenue
- **Rewarded Ads:** Continue playing, double score, daily bonus
- High engagement = High ad impressions

### Secondary Revenue
- **In-App Purchases:**
  - Remove Ads ($2.99)
  - Cosmetic Skins ($0.99)
  - Ultimate Pack ($4.99)

---

## 📊 Target Metrics

| Metric | Goal |
|--------|------|
| D1 Retention | > 40% |
| D7 Retention | > 15% |
| Avg Session Length | 2-4 min |
| Sessions per Day | 3-5 |
| ARPU (Day 1) | $0.03-0.08 |

---

## 🛠️ Tech Stack

- **Engine:** Unity 2D
- **Language:** C#
- **Platform:** Android (Google Play)
- **Ads:** Google AdMob
- **Analytics:** Firebase
- **Services:** Google Play Games Services

---

## 📖 Documentation

- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) - Detailed development roadmap
- [`GDD.md`](./GDD.md) - Complete game design document
- `STORE_LISTING.md` - Google Play Store assets

---

## 🎨 Art Direction

### Visual Style
- Minimalist geometric design
- Bright, saturated colors
- Smooth gradients and particle effects
- Clean UI with rounded corners

### Color Palette
- **Primary:** #6C5CE7 (Purple)
- **Secondary:** #00B8D4 (Cyan)
- **Success:** #00E676 (Green)
- **Danger:** #FF3D00 (Red)
- **Background:** #1A1A2E (Dark Blue)

---

## 🏗️ Development Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Foundation & Core Mechanics | 2 weeks | 🟡 In Progress |
| Content & Level Design | 2 weeks | ⚪ Pending |
| Visual & Audio Polish | 1 week | ⚪ Pending |
| Monetization Integration | 2 weeks | ⚪ Pending |
| Optimization & Testing | 2 weeks | ⚪ Pending |
| Soft Launch | 1+ weeks | ⚪ Pending |

**Total Estimated Time:** 10-12 weeks

---

## 🧪 Testing

### Build Commands
```bash
# Android Build
Unity -quit -batchmode -buildTarget Android -executeMethod BuildScript.BuildAndroid

# Test Build (Development Mode)
Unity -quit -batchmode -buildTarget Android -executeMethod BuildScript.BuildAndroidDev
```

### Test on Device
1. Enable USB Debugging on Android device
2. Connect via USB
3. Build and Run from Unity

---

## 📦 Build Configuration

### Android Settings
- **Minimum API Level:** Android 5.0 (API 21)
- **Target API Level:** Android 13 (API 33)
- **Scripting Backend:** IL2CPP
- **Architecture:** ARM64
- **Compression:** LZ4

### Performance Targets
- 60 FPS on mid-range devices
- < 50 MB APK size
- < 100 MB RAM usage
- < 1s load time

---


## 📞 Contact

For questions or support, please contact: [your-email@example.com]

---

**Made with ❤️ using Unity**
