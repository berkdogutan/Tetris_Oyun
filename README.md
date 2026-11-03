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

### Play the browser prototypes (no setup)
The playable work so far lives in three standalone HTML files. Open any of them in a browser:

| File | What it is |
|------|------------|
| `game.html` | **NEON ZERO** – current main prototype: trickshot bonus, near-miss slow-mo, revives, leaderboard, demo "remove ads" |
| `one_more_move_test.html` | Timer-based variant with star rating, persistent progress and a demo premium pack |
| `prototype.html` | First prototype: 100 levels, larger zones, basic HUD |

### Mobile build (not available yet)
The mobile target is **undecided**. The docs describe a Unity 2D project, `oyun.rar` holds three Unity C# scripts
(`GameManager`, `PlayerController`, `ScoreManager`), while `codemagic.yaml` builds a Flutter APK and
`IMPLEMENTATION_FLUTTER.md` describes a Flutter/Flame rebuild. Neither a Unity nor a Flutter project is in this repository,
so there is nothing to build on a device yet.

---

## 📂 Project Structure

```
game.html                 # NEON ZERO browser prototype (main)
one_more_move_test.html   # timer / star-rating prototype
prototype.html            # first prototype
qa/test.js                # Playwright checks for the three prototypes
oyun.rar                  # archive: Unity C# scripts + copies of the docs
codemagic.yaml            # Flutter CI workflow (no Flutter project yet)
GDD.md, ROADMAP.md, IMPLEMENTATION_PLAN.md, IMPLEMENTATION_FLUTTER.md,
QUICK_START.md, START_HERE.md   # design and planning docs
```

The `Assets/_Project/...` Unity layout described in `QUICK_START.md` does not exist in this repository yet.

---

## 🎮 Features

### ✅ Implemented (browser prototypes)
- [x] Core drag-and-launch mechanics
- [x] Physics-based gameplay (gravity, wall / ceiling / obstacle bounces)
- [x] Procedural level generation (targets and obstacles scale with level)
- [x] Scoring system (zone values, trickshot bonus, near-miss slow-mo)
- [x] Game over screen with revives
- [x] Local leaderboard and best score (localStorage)
- [x] Sound effects (Web Audio), particles, screen shake
- [x] Automated gameplay checks (`qa/test.js`)

### 🚧 In Progress
- [ ] Decide the mobile engine (Unity vs Flutter/Flame) and port the prototype
- [ ] Rewarded ad integration (currently a `confirm()` demo, no AdMob)
- [ ] In-app purchases (currently a demo flag in localStorage)
- [ ] Visual polish & animations (real art assets)

### 📋 Planned
- [ ] Daily challenges
- [ ] Google Play Leaderboards

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

- **Prototypes:** plain HTML5 Canvas + JavaScript, Web Audio API, localStorage
- **Mobile engine:** to be decided – Unity 2D / C# (per GDD) or Flutter / Flame (per `IMPLEMENTATION_FLUTTER.md`)
- **Platform:** Android (Google Play)
- **Ads:** Google AdMob (planned, not integrated)
- **Analytics:** Firebase (planned)
- **Services:** Google Play Games Services (planned)

---

## 📖 Documentation

- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) - Detailed development roadmap
- [`ROADMAP.md`](./ROADMAP.md) - Week-by-week milestones
- [`GDD.md`](./GDD.md) - Complete game design document
- [`IMPLEMENTATION_FLUTTER.md`](./IMPLEMENTATION_FLUTTER.md) - Notes for a Flutter/Flame rebuild
- [`QUICK_START.md`](./QUICK_START.md) - Unity setup guide (for the future Unity port)
- `PUBLISH_GUIDE.md` - Google Play publishing guide (empty placeholder)

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

| Phase | Duration | Status | Notes |
|-------|----------|--------|-------|
| Foundation & Core Mechanics | 2 weeks | 🟢 Done (browser) | Drag-launch, physics, scoring, game over work in the HTML prototypes. Mobile port not started. |
| Content & Level Design | 2 weeks | 🟡 Partial | Procedural targets/obstacles scale with level; no designed levels or obstacle variety yet. |
| Visual & Audio Polish | 1 week | 🟡 Partial | Web Audio SFX, particles, shake and flash exist; no final art assets. |
| Monetization Integration | 2 weeks | ⚪ Pending | Ads and purchases are `confirm()` demos only. Blocked on the engine decision. |
| Optimization & Testing | 2 weeks | 🟡 Started | `qa/test.js` covers the core flows of all three prototypes. No device or performance testing. |
| Soft Launch | 1+ weeks | ⚪ Pending | No store assets, `PUBLISH_GUIDE.md` is empty. |

**Total Estimated Time:** 10-12 weeks (from the start of the mobile port)

*Status last reviewed: 2026-11-03.*

---

## 🧪 Testing

### Browser prototypes
`qa/test.js` drives the three HTML files in headless Chromium with Playwright: launching, hitting targets,
losing lives, game over and revives, timer expiry, leaderboard rendering, purchases, persistence across reload
and the mobile viewport.

```bash
npm install playwright@1.49.1
npx playwright install chromium
node qa/test.js
```

Screenshots are written to `qa/shots/`, results to `qa/results.json`.

### Mobile build
Not possible yet; see *Quick Start*. The Unity batch-mode commands and USB device steps will be added once a
Unity or Flutter project exists in the repository.

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

## 🐛 Known Issues

- The mobile engine is undecided; docs, `oyun.rar` and `codemagic.yaml` point at different stacks.
- Ads and in-app purchases are demos that only set a flag in localStorage.
- Progress and leaderboards are per browser (localStorage), there is no cloud save.
- `prototype.html` has no sound or revives; it is kept for reference.

---


## 📞 Contact

For questions or support, please contact: [your-email@example.com]

---

**Made with ❤️ – browser prototypes today, mobile build coming**
