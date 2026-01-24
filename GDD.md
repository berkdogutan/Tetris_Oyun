# ONE MORE MOVE - Game Design Document

**Version:** 1.0  
**Last Updated:** 2026-01-23  
**Platform:** Google Play (Android)  
**Genre:** Casual, Physics-Based, Puzzle  

---

## 📋 Table of Contents

1. [Game Overview](#game-overview)
2. [Core Concept](#core-concept)
3. [Gameplay Mechanics](#gameplay-mechanics)
4. [Level Design](#level-design)
5. [Scoring System](#scoring-system)
6. [Visual Design](#visual-design)
7. [Audio Design](#audio-design)
8. [Monetization](#monetization)
9. [Retention Features](#retention-features)
10. [Technical Specifications](#technical-specifications)

---

## 🎮 Game Overview

### Vision Statement
Create a highly addictive, minimal casual mobile game that players can enjoy in short bursts throughout the day, with a "one more try" loop that maximizes engagement and monetization.

### Target Audience
- **Primary:** Casual mobile gamers (18-45 years old)
- **Secondary:** Hyper-casual enthusiasts who love quick, rewarding gameplay
- **Demographics:** Global, with initial focus on English-speaking markets

### Key Differentiators
- ⚡ **Ultra-Fast Gameplay:** 5-10 seconds per round
- 🎯 **One Move Strategy:** Every attempt matters
- 🔄 **Instant Replay:** No loading, no friction
- 💎 **Rewarded Progression:** Ads feel like a feature, not a burden

---

## 🎯 Core Concept

### The Hook
> "You have ONE move. Make it count."

### Game Loop
```
START → AIM → LAUNCH → RESULT → DECISION → LOOP
```

1. **START:** Player sees a fresh level instantly
2. **AIM:** Drag to set direction and power
3. **LAUNCH:** Release to shoot
4. **RESULT:** Immediate feedback on landing
5. **DECISION:** Restart or watch ad for "One More Move"
6. **LOOP:** Repeat with slight variation

### Session Flow
- **Ultra-Short Session:** 30 seconds - 2 minutes
- **Frequency:** 5-10 sessions per day
- **Total Daily Playtime:** 10-20 minutes

---

## 🕹️ Gameplay Mechanics

### Core Interaction

#### Input System
1. **Touch Down:** Detect drag start position
2. **Drag:** Draw trajectory line, calculate power
3. **Release:** Launch player object with calculated force

#### Physics Parameters
```
Gravity: -9.81 (realistic)
Drag: 0.2 (slight air resistance)
Bounce: 0.6 (satisfying bounce without too much chaos)
Friction: 0.3 (slowdown on surfaces)
```

#### Trajectory Visualization
- Dotted line showing predicted path
- Color changes based on power (green → yellow → red)
- Maximum drag distance: 300 pixels
- Power scales linearly with drag length

### Player Object
- **Shape:** Simple sphere or cube
- **Size:** 32x32 pixels
- **Mass:** 1.0 (standard physics mass)
- **Collision:** Circle collider, layer "Player"

### Obstacles

#### Static Barriers
- Block direct paths
- Force strategic bounces
- Density increases with level

#### Moving Obstacles
- Horizontal or vertical movement
- Predictable patterns
- Introduced after level 10

#### Rotating Hazards
- Spinning bars or platforms
- Timing-based challenge
- Introduced after level 25

#### Bounce Pads
- Redirect player trajectory
- Strategic placement
- Can help or hinder

#### Death Zones
- Instant game over
- Red visual indicator
- Placed at boundaries

### Game States

```csharp
public enum GameState {
    Ready,      // Waiting for input
    Aiming,     // Player is dragging
    Moving,     // Physics active
    Scoring,    // Calculating result
    GameOver    // Show options
}
```

---

## 🏗️ Level Design

### Procedural Generation

#### Algorithm
1. **Seed System:** Use level number as seed for reproducibility
2. **Zone Placement:** Generate scoring zones first
3. **Obstacle Spawning:** Fill space based on difficulty
4. **Validation:** Ensure level is possible (raycasts check for paths)

#### Level Layout
```
┌─────────────────────────────────┐
│  PLAYER START (bottom center)   │
│              ⬇️                  │
│         [Obstacles]              │
│    [Moving] [Static] [Bounce]   │
│         [Obstacles]              │
│              ⬆️                  │
│    [   SCORING ZONES   ]        │
│   [10] [50] [100] [500] [1000]  │
└─────────────────────────────────┘
```

### Difficulty Progression

#### Early Game (Levels 1-10)
- **Obstacle Count:** 2-5
- **Safe Zone Size:** Large (30% of screen)
- **Moving Obstacles:** None
- **Goal:** Tutorial, build confidence

#### Mid Game (Levels 11-50)
- **Obstacle Count:** 5-12
- **Safe Zone Size:** Medium (15% of screen)
- **Moving Obstacles:** 1-2
- **Goal:** Steady challenge increase

#### Late Game (Levels 51+)
- **Obstacle Count:** 12-20
- **Safe Zone Size:** Small (5% of screen)
- **Moving Obstacles:** 2-4
- **Goal:** Expert difficulty, maximum engagement

### Difficulty Formula
```csharp
int obstacleCount = 2 + (level / 5);
float safeZoneSize = 0.3f - (level * 0.003f);
int movingObstacles = Mathf.Max(0, (level - 10) / 15);
```

---

## 🏆 Scoring System

### Base Score Calculation

```
Base Score = Distance × Precision Multiplier
```

#### Distance
- Measured in pixels from start position
- Normalized to 0-1000 range

#### Precision Multiplier
- **Center Landing:** 3.0x (within 10px of zone center)
- **Good Landing:** 2.0x (within 25px)
- **Normal Landing:** 1.0x (anywhere in zone)

### Bonus Scoring

#### Perfect Landing
- **Condition:** Land exactly in center of highest zone
- **Bonus:** +100 points
- **Visual:** Gold burst effect

#### Risk Bonus
- **Calculation:** Points based on proximity to obstacles during flight
- **Formula:** `riskBonus = obstacleProximityScore × 10`
- **Max Bonus:** +200 points

#### Streak Multiplier
- **Condition:** Consecutive perfect landings
- **Formula:** `1.0 + (consecutivePerfects × 0.1)`
- **Max Multiplier:** 3.0x (20 perfects in a row)

### Final Score
```
Final Score = (Base + Perfect Bonus + Risk Bonus) × Streak Multiplier
```

### Scoring Zones

| Zone | Points | Color | Size |
|------|--------|-------|------|
| Mini | 10 | Gray | 40px |
| Small | 50 | Blue | 60px |
| Medium | 100 | Green | 80px |
| Large | 500 | Orange | 100px |
| Mega | 1000 | Purple | 60px (rare) |

---

## 🎨 Visual Design

### Art Style
- **Genre:** Minimalist, Geometric
- **Mood:** Vibrant, Energetic, Modern
- **Inspiration:** Monument Valley, Duet, Twisty Road

### Color Palette

#### Primary Colors
```css
--color-primary: #6C5CE7;      /* Purple */
--color-secondary: #00B8D4;    /* Cyan */
--color-accent: #FF6B6B;       /* Coral */
```

#### Functional Colors
```css
--color-success: #00E676;      /* Green */
--color-danger: #FF3D00;       /* Red */
--color-warning: #FFD600;      /* Yellow */
```

#### UI Colors
```css
--color-bg-dark: #1A1A2E;      /* Dark Blue */
--color-bg-medium: #16213E;    /* Medium Dark */
--color-text-primary: #FFFFFF; /* White */
--color-text-secondary: rgba(255,255,255,0.7);
```

### UI Design

#### Typography
- **Primary Font:** "Outfit" (Google Fonts)
- **Title Size:** 48pt, Bold
- **Body Size:** 18pt, Regular
- **Button Size:** 24pt, SemiBold

#### Button Style
```css
border-radius: 30px;
padding: 20px 40px;
background: linear-gradient(135deg, #6C5CE7 0%, #A855F7 100%);
box-shadow: 0 8px 24px rgba(108, 92, 231, 0.4);
```

#### Panel Style
```css
background: rgba(26, 26, 46, 0.95);
border-radius: 24px;
border: 2px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
```

### Animations

#### UI Transitions
- **Duration:** 0.3s
- **Easing:** Ease-out
- **Effects:** Slide, fade, scale

#### Gameplay Effects
- **Launch Trail:** Gradient particle trail
- **Landing Impact:** Radial burst particles
- **Score Popup:** Bounce-in with scale animation

### Visual Feedback

#### Success States
- Green flash
- Particle burst
- Screen shake (subtle)
- Score count-up animation

#### Failure States
- Red flash
- Slower particle fall
- Sad sound effect
- Gentle fade to game over

---

## 🔊 Audio Design

### Sound Effects

#### Gameplay SFX
| Event | Sound | Description |
|-------|-------|-------------|
| Touch Down | `touch.wav` | Soft click |
| Charging | `charge_loop.wav` | Rising pitch hum |
| Launch | `launch.wav` | Whoosh with bass |
| Bounce | `bounce.wav` | Boing (pitch varies with velocity) |
| Landing | `land_normal.wav` | Thud |
| Perfect Landing | `land_perfect.wav` | Chime + sparkle |
| Game Over | `gameover.wav` | Descending chime |

#### UI SFX
| Event | Sound | Description |
|-------|-------|-------------|
| Button Click | `click.wav` | Crisp tap |
| Panel Open | `panel_open.wav` | Swoosh |
| Panel Close | `panel_close.wav` | Reverse swoosh |
| Score Tick | `score_tick.wav` | Soft tick (rapid) |
| High Score | `highscore.wav` | Celebration fanfare |

### Background Music
- **Style:** Ambient, Electronic, Lo-fi
- **Tempo:** 80-110 BPM
- **Mood:** Calm but energizing
- **Length:** 60-90 second loop
- **Volume:** 20% (subtle, non-intrusive)

### Audio Settings
- **SFX Volume:** 0-100% (default 80%)
- **Music Volume:** 0-100% (default 40%)
- **Haptic Feedback:** On/Off toggle

---

## 💰 Monetization

### Primary: Rewarded Ads

#### Placement 1: One More Move (Game Over)
- **Trigger:** Game over screen, primary CTA
- **Reward:** Continue from last checkpoint
- **Expected Frequency:** 40-60% of game overs
- **eCPM Target:** $8-15

#### Placement 2: Double Score (Game Over)
- **Trigger:** After achieving new high score
- **Reward:** 2x final score
- **Expected Frequency:** 15-25% of game overs
- **eCPM Target:** $10-18

#### Placement 3: Daily Bonus (Main Menu)
- **Trigger:** Once per day
- **Reward:** Cosmetic currency or free skin
- **Expected Frequency:** 1 per day per user
- **eCPM Target:** $5-10

### Secondary: In-App Purchases

#### Product Catalog
| Product | Price | Description | Expected Conversion |
|---------|-------|-------------|---------------------|
| Remove Ads | $2.99 | Permanent, no rewarded ads removed | 2-5% |
| Skin Pack 1 | $0.99 | 3 cosmetic skins | 1-3% |
| Skin Pack 2 | $0.99 | 3 cosmetic skins | 1-3% |
| Ultimate Pack | $4.99 | All skins + no ads | 0.5-1% |

### Revenue Projections (Per 1000 DAU)

#### Ad Revenue
```
Daily Ad Impressions: 1000 DAU × 2.5 avg impressions = 2,500
eCPM: $10
Daily Ad Revenue: $25
Monthly: $750
```

#### IAP Revenue
```
Daily Purchases: 1000 DAU × 0.03 conversion × $2 avg = $60
Monthly: $1,800
```

#### Total Monthly Revenue (1K DAU)
```
Ads: $750
IAP: $1,800
Total: $2,550
ARPU (monthly): $2.55
```

### Ad Integration Strategy

#### Ad Network Mediation
1. **Primary:** Google AdMob
2. **Fallback:** Unity Ads
3. **Mediation:** AppLovin MAX or ironSource

#### Ad Loading
- Preload rewarded ads on app start
- Reload after every ad shown
- Show loading indicator if ad not ready

#### User Experience
- Never force ads (only rewarded)
- Always show ad availability before offering
- Provide alternative (restart without ad)

---

## 🎯 Retention Features

### Daily Challenge

#### Concept
- Same level for all players (daily seed)
- One attempt only
- Leaderboard ranking
- Reward for participation

#### Rewards
- **Top 10%:** 100 coins + exclusive badge
- **Top 50%:** 50 coins
- **Participation:** 25 coins

### Leaderboards

#### Types
1. **All-Time High Score:** Global, lifetime
2. **Weekly High Score:** Resets Monday
3. **Daily Challenge:** Daily rotation
4. **Friends Only:** Social comparison

#### Integration
- Google Play Games Services
- Automatic submission on game over
- View leaderboard from main menu

### Achievements

| Achievement | Description | Reward |
|-------------|-------------|--------|
| First Try | Score 100+ on first game | 50 coins |
| Sharpshooter | 5 perfect landings in a row | 100 coins |
| Perfectionist | 10 perfect landings in a row | 250 coins |
| High Roller | Score 5000+ in one game | 500 coins |
| Dedicated | Play 7 days in a row | Exclusive skin |
| Century Club | Play 100 games total | 200 coins |
| Ad Enthusiast | Watch 50 rewarded ads | 300 coins |

### Social Features

#### Share Score
- Native Android share intent
- Screenshot with score overlay
- Text: "I just scored [X] in One More Move! Can you beat it?"
- Deep link to download game

#### Invite Friends
- Google Play Games friend invites
- Reward: 100 coins per friend who installs

---

## 🛠️ Technical Specifications

### Platform Requirements

#### Minimum Requirements
- **OS:** Android 5.0 (API 21)
- **RAM:** 1 GB
- **Storage:** 50 MB
- **Processor:** Dual-core 1.0 GHz

#### Target Requirements
- **OS:** Android 10+ (API 29+)
- **RAM:** 2 GB+
- **Storage:** 100 MB
- **Processor:** Quad-core 1.5 GHz+

### Performance Targets

| Metric | Target | Minimum |
|--------|--------|---------|
| Frame Rate | 60 FPS | 30 FPS |
| Load Time | < 1s | < 3s |
| APK Size | < 50 MB | < 100 MB |
| RAM Usage | < 100 MB | < 200 MB |
| Battery Drain | < 5%/hour | < 10%/hour |

### Tech Stack

#### Engine
- **Unity:** 2022.3 LTS
- **Rendering:** Universal Render Pipeline (URP)
- **Scripting:** C#

#### SDKs & Services
- **Ads:** Google AdMob Unity Plugin
- **Analytics:** Firebase Analytics
- **IAP:** Unity IAP
- **Leaderboards:** Google Play Games Services
- **Cloud Save:** Google Play Games Services

#### Build Settings
- **Scripting Backend:** IL2CPP
- **API Compatibility:** .NET Standard 2.1
- **Target Architecture:** ARM64
- **Compression:** LZ4 (faster loading)
- **Stripping Level:** Medium

### Data Storage

#### PlayerPrefs (Local)
```csharp
- HighScore (int)
- TotalGamesPlayed (int)
- BestStreak (int)
- SFXVolume (float)
- MusicVolume (float)
- HapticEnabled (bool)
- RemoveAdsPurchased (bool)
- UnlockedSkins (string[])
```

#### Cloud Save (Google Play)
```json
{
  "highScore": 5420,
  "totalGamesPlayed": 342,
  "bestStreak": 15,
  "unlockedSkins": ["blue", "red", "gold"],
  "achievements": ["first_try", "sharpshooter"],
  "lastPlayed": "2026-01-23T20:15:00Z"
}
```

### Analytics Events

#### Key Events
```csharp
// Session Events
Analytics.LogEvent("session_start");
Analytics.LogEvent("session_end", new Dictionary<string, object> {
    { "duration", sessionDuration },
    { "games_played", gamesThisSession }
});

// Gameplay Events
Analytics.LogEvent("game_start", new Dictionary<string, object> {
    { "level", currentLevel }
});

Analytics.LogEvent("game_over", new Dictionary<string, object> {
    { "score", finalScore },
    { "level", currentLevel },
    { "duration", gameDuration }
});

Analytics.LogEvent("perfect_landing");
Analytics.LogEvent("new_high_score", new Dictionary<string, object> {
    { "score", newHighScore }
});

// Monetization Events
Analytics.LogEvent("ad_rewarded_request", new Dictionary<string, object> {
    { "placement", adPlacement }
});

Analytics.LogEvent("ad_rewarded_complete", new Dictionary<string, object> {
    { "placement", adPlacement },
    { "revenue", estimatedRevenue }
});

Analytics.LogEvent("iap_purchase", new Dictionary<string, object> {
    { "product_id", productId },
    { "price", price },
    { "currency", "USD" }
});
```

---

## 📱 User Interface Specification

### Screen Flow

```
App Launch
    ↓
Main Menu
    ├→ Play → Gameplay → Game Over
    │                        ↓
    │                    [Restart / One More Move]
    │                        ↓
    │                    (loop back to appropriate state)
    ├→ Daily Challenge → (Same as Gameplay)
    ├→ Leaderboard
    ├→ Achievements
    ├→ Shop
    └→ Settings
```

### Main Menu Layout

```
┌───────────────────────────────┐
│                               │
│      ONE MORE MOVE            │
│         🎯                    │
│                               │
│   ┌─────────────────────┐    │
│   │     🎮  PLAY        │    │
│   └─────────────────────┘    │
│                               │
│   [📅 Daily] [🏆 Board]      │
│   [🎨 Shop]  [⚙️ Settings]   │
│                               │
│   High Score: 5,420           │
└───────────────────────────────┘
```

### Gameplay HUD Layout

```
┌───────────────────────────────┐
│ 🏆 Best: 5420    Score: 1250  │ <- Top bar
│                               │
│        (Gameplay Area)        │
│                               │
│          [Player]             │
│       ←trajectory→            │
│                               │
│      [🎯 Scoring Zones]       │
└───────────────────────────────┘
```

### Game Over Screen Layout

```
┌───────────────────────────────┐
│        GAME OVER              │
│                               │
│    ⭐ YOUR SCORE ⭐           │
│         1,250                 │
│                               │
│    Best: 5,420 🏆            │
│                               │
│  ┌───────────────────────┐   │
│  │     🔄 RESTART        │   │
│  └───────────────────────┘   │
│                               │
│  ┌───────────────────────┐   │
│  │  🎬 ONE MORE MOVE     │   │
│  │  (Watch ad)           │   │
│  └───────────────────────┘   │
│                               │
│  [📤 Share]  [🏆 Leaderboard] │
└───────────────────────────────┘
```

---

## 🧪 Testing Strategy

### QA Checklist

#### Functionality
- [ ] Core drag-and-launch mechanics work smoothly
- [ ] Physics behave consistently across devices
- [ ] Scoring calculation is accurate
- [ ] High score saves correctly
- [ ] All UI buttons respond properly

#### Monetization
- [ ] AdMob test ads load and display
- [ ] Rewarded ad callbacks trigger correctly
- [ ] "One More Move" grants continuation
- [ ] IAP flows complete successfully
- [ ] "Remove Ads" disables forced ads

#### Performance
- [ ] Maintains 60 FPS on mid-range devices
- [ ] No memory leaks during extended play
- [ ] APK size under target (50 MB)
- [ ] Load times under 1 second

#### Compatibility
- [ ] Works on various screen sizes (16:9, 18:9, 19.5:9)
- [ ] Compatible with Android 5.0 - 14
- [ ] Handles interruptions (calls, notifications)
- [ ] Offline mode works (no internet required for gameplay)

### Beta Testing
- **Platform:** Google Play Internal Testing
- **Testers:** 20-50 users
- **Duration:** 2 weeks
- **Focus:** Bug finding, retention metrics, ad engagement

---

## 🚀 Launch Strategy

### Soft Launch Markets
- **Primary:** Philippines
- **Secondary:** Singapore, New Zealand
- **Duration:** 2-4 weeks
- **Goal:** Validate retention and monetization before global launch

### KPIs to Track
- **Retention:** D1, D7, D30
- **Monetization:** ARPU, ad impressions per DAU, IAP conversion
- **Engagement:** Session length, sessions per DAU
- **Quality:** Crash rate, negative reviews

### Global Launch Criteria
- D1 Retention > 40%
- D7 Retention > 15%
- ARPDAU > $0.03
- Crash rate < 1%
- Average rating > 4.0

---

## 📈 Post-Launch Roadmap

### Version 1.1 (1 month post-launch)
- Bug fixes based on user feedback
- Additional cosmetic skins
- Seasonal theme (if applicable)

### Version 1.2 (2 months post-launch)
- New game mode: "Time Attack"
- Expanded daily challenges
- Friend challenge feature

### Version 1.3 (3 months post-launch)
- Tournament system
- Battle pass (seasonal progression)
- Enhanced visual effects

---

## 🎓 Lessons from Similar Games

### Success Patterns
- **Duet:** Simple two-button controls, perfect difficulty curve
- **Flappy Bird:** Instant restart, frustration + satisfaction balance
- **Crossy Road:** Character collection, daily challenges
- **One More Brick:** "One more" psychology, rewarded ads feel rewarding

### Common Pitfalls to Avoid
- ❌ Too many features at launch (focus on core loop)
- ❌ Forced interstitial ads (kills retention)
- ❌ Unclear gameplay (needs instant understanding)
- ❌ Poor performance optimization (casual games must be smooth)

---

**END OF GAME DESIGN DOCUMENT**

This document is a living specification and will be updated as the game evolves based on player feedback and market performance.
