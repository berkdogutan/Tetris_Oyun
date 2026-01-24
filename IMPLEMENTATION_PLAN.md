# ONE MORE MOVE - Implementation Plan

## Project Overview
**Game Title:** ONE MORE MOVE  
**Platform:** Android (Google Play)  
**Engine:** Unity 2D  
**Genre:** Casual Physics-Based Puzzle  
**Target:** Hyper-casual mobile audience  

---

## Development Phases

### ✅ PHASE 1: Project Setup & Foundation (Week 1)

#### 1.1 Unity Project Initialization
- [ ] Create new Unity 2D project
- [ ] Set up Android build settings
- [ ] Configure project structure and folders
- [ ] Set up version control (Git)
- [ ] Configure build pipeline

#### 1.2 Project Structure
```
Assets/
├── _Project/
│   ├── Scenes/
│   ├── Scripts/
│   │   ├── Core/
│   │   ├── Gameplay/
│   │   ├── UI/
│   │   ├── Managers/
│   │   └── Utilities/
│   ├── Prefabs/
│   ├── Materials/
│   ├── Sprites/
│   ├── Audio/
│   │   ├── SFX/
│   │   └── Music/
│   └── Animations/
└── Plugins/
    └── Android/
```

#### 1.3 Core Systems Architecture
- [ ] GameManager (singleton)
- [ ] ScoreManager
- [ ] LevelManager
- [ ] AudioManager
- [ ] UIManager
- [ ] AdManager (placeholder)

---

### ✅ PHASE 2: Core Gameplay Mechanics (Week 2)

#### 2.1 Player Controller
**Files:** `PlayerController.cs`, `PhysicsController.cs`

**Features:**
- [ ] Touch input detection
- [ ] Drag trajectory visualization
- [ ] Launch mechanics (power/direction)
- [ ] Physics-based movement (Rigidbody2D)
- [ ] Collision detection

**Key Components:**
```csharp
- OnTouchBegin() - Detect drag start
- OnTouchDrag() - Calculate trajectory
- OnTouchRelease() - Launch player
- CalculatePower() - Based on drag length
- CalculateDirection() - Based on drag vector
```

#### 2.2 Physics System
**Files:** `PhysicsConfig.cs`, `BounceBehavior.cs`

**Features:**
- [ ] Gravity settings
- [ ] Bounce mechanics
- [ ] Friction/drag configuration
- [ ] Physics materials

#### 2.3 Game Flow
**Files:** `GameStateManager.cs`

**States:**
- [ ] Ready (waiting for input)
- [ ] Aiming (dragging)
- [ ] Moving (physics active)
- [ ] Result (scoring)
- [ ] GameOver (options display)

---

### ✅ PHASE 3: Level Generation & Obstacles (Week 3)

#### 3.1 Procedural Level Generator
**Files:** `LevelGenerator.cs`, `ObstacleSpawner.cs`

**Features:**
- [ ] Procedural obstacle placement
- [ ] Safe zone generation
- [ ] Difficulty scaling algorithm
- [ ] Level seed system (for reproducibility)

**Obstacle Types:**
- [ ] Static barriers
- [ ] Moving obstacles
- [ ] Rotating hazards
- [ ] Bounce pads
- [ ] Death zones

#### 3.2 Scoring Zones
**Files:** `ScoringZone.cs`, `ZoneManager.cs`

**Features:**
- [ ] Multiple score zones (10, 50, 100, 500, 1000)
- [ ] Perfect landing detection
- [ ] Visual feedback on landing
- [ ] Multiplier zones

#### 3.3 Difficulty Progression
**Files:** `DifficultyScaler.cs`

**Algorithm:**
```
Level 1-10: Tutorial difficulty
Level 11-50: Gradual increase
Level 51+: Expert mode

Variables:
- Obstacle density (increases)
- Safe zone size (decreases)
- Physics randomness (increases slightly)
```

---

### ✅ PHASE 4: Scoring & Progression (Week 3)

#### 4.1 Score Calculation
**Files:** `ScoreManager.cs`, `ScoreCalculator.cs`

**Formula:**
```
Base Score = Distance × Precision Multiplier
Bonus Score = Perfect Landing + Risk Bonus
Final Score = (Base + Bonus) × Streak Multiplier

Precision Multiplier: 1.0 - 3.0 (center landing bonus)
Perfect Landing: +100 points
Risk Bonus: Based on obstacle proximity
Streak Multiplier: 1.0 + (consecutive_perfects × 0.1)
```

#### 4.2 Data Persistence
**Files:** `DataManager.cs`, `PlayerData.cs`

**Saved Data:**
- [ ] High score
- [ ] Total games played
- [ ] Best streak
- [ ] Unlocked skins
- [ ] Ad removal status
- [ ] Daily challenge completion

---

### ✅ PHASE 5: UI Implementation (Week 4)

#### 5.1 Main Menu
**Scene:** `MainMenu.unity`

**Elements:**
- [ ] Game title
- [ ] Play button
- [ ] Daily challenge button
- [ ] Leaderboard button
- [ ] Settings button
- [ ] Shop button

#### 5.2 Gameplay UI
**Scene:** `Gameplay.unity`

**HUD Elements:**
- [ ] Current score (top)
- [ ] High score (subtle)
- [ ] Trajectory line (during aim)
- [ ] Power meter (visual feedback)

#### 5.3 Game Over Screen
**Files:** `GameOverPanel.cs`

**Elements:**
- [ ] Final score (large, animated)
- [ ] High score comparison
- [ ] Two primary buttons:
  - **Restart** (instant, no ad)
  - **One More Move** (rewarded ad + continue)
- [ ] Share button
- [ ] Secondary actions (menu, leaderboard)

**Button Layout:**
```
┌─────────────────────────┐
│     YOUR SCORE: 1250    │
│    BEST: 1450 ⭐        │
├─────────────────────────┤
│   [  RESTART  ]         │
│                         │
│   [ 🎬 ONE MORE MOVE ]  │
│   (Watch ad to continue)│
├─────────────────────────┤
│  Share  |  Leaderboard  │
└─────────────────────────┘
```

#### 5.4 UI Animations
**Files:** `UIAnimations.cs`, `TweenHelper.cs`

**Animations:**
- [ ] Score count-up effect
- [ ] Button pulse/scale
- [ ] Panel slide-in/out
- [ ] Particle burst on high score

---

### ✅ PHASE 6: Visual Design & Polish (Week 5)

#### 6.1 Visual Style
**Art Direction:**
- Minimalist geometric design
- Bright, saturated colors
- Smooth gradients
- Clean UI with rounded corners

**Color Palette:**
```
Primary: #6C5CE7 (Purple)
Secondary: #00B8D4 (Cyan)
Success: #00E676 (Green)
Danger: #FF3D00 (Red)
Background: #1A1A2E (Dark Blue)
UI Elements: #FFFFFF with 10% opacity
```

#### 6.2 Particle Effects
**Files:** `ParticleManager.cs`

**Effects:**
- [ ] Launch trail
- [ ] Landing impact
- [ ] Perfect landing burst
- [ ] Score popup particles

#### 6.3 Animations
- [ ] Player squash & stretch
- [ ] Obstacle idle animations
- [ ] UI transitions
- [ ] Camera shake on impact

---

### ✅ PHASE 7: Audio Implementation (Week 5)

#### 7.1 Sound Effects
**Files Required:**

- [ ] `launch.wav` - Launch sound
- [ ] `bounce.wav` - Bounce impact
- [ ] `perfect_landing.wav` - Perfect landing
- [ ] `game_over.wav` - Game over sting
- [ ] `button_click.wav` - UI interaction
- [ ] `score_tick.wav` - Score counting
- [ ] `high_score.wav` - New high score celebration

#### 7.2 Background Music
- [ ] Subtle ambient loop (30-60s)
- [ ] Low volume by default
- [ ] Crossfade transitions

#### 7.3 Audio Manager
**Files:** `AudioManager.cs`

**Features:**
- [ ] SFX volume control
- [ ] Music volume control
- [ ] Audio pooling for performance
- [ ] Haptic feedback integration

---

### ✅ PHASE 8: Monetization Integration (Week 6)

#### 8.1 Ad SDK Setup
**SDK:** Google AdMob for Unity

**Integration Steps:**
- [ ] Install AdMob Unity package
- [ ] Configure AdMob App ID
- [ ] Create ad unit IDs (rewarded, interstitial, banner)
- [ ] Implement test ads
- [ ] Set up ad loading/caching

#### 8.2 Rewarded Ads
**Files:** `AdManager.cs`, `RewardedAdController.cs`

**Placements:**
1. **One More Move** (Game Over)
   - Continues from last position
   - Grants one additional attempt
   - 90%+ fill rate required

2. **Double Score** (Game Over)
   - Optional reward
   - Doubles final score
   - Shows after high-score achievements

3. **Daily Bonus** (Main Menu)
   - Extra lives or cosmetic currency
   - Once per day

**Implementation:**
```csharp
public void ShowRewardedAd(AdPlacement placement, Action onSuccess, Action onFailed)
{
    // Load and show rewarded ad
    // Handle callbacks
    // Grant rewards
}
```

#### 8.3 In-App Purchases
**Files:** `IAPManager.cs`, `ShopController.cs`

**Products:**
- [ ] Remove Ads ($2.99) - permanent
- [ ] Skin Pack 1 ($0.99)
- [ ] Skin Pack 2 ($0.99)
- [ ] Ultimate Pack ($4.99) - all skins + no ads

**Store Configuration:**
- Use Unity IAP
- Google Play Billing Library v5+

---

### ✅ PHASE 9: Retention Features (Week 7)

#### 9.1 Daily Challenge
**Files:** `DailyChallengeManager.cs`

**Features:**
- [ ] Daily seed-based level
- [ ] Leaderboard for daily challenge
- [ ] Reward for completion (coins/premium currency)
- [ ] Notification reminder

#### 9.2 Leaderboard Integration
**SDK:** Google Play Games Services

**Features:**
- [ ] Global high score leaderboard
- [ ] Daily challenge leaderboard
- [ ] Friends-only leaderboard
- [ ] Achievements

**Achievements:**
- [ ] "First Try" - Score 100+ on first game
- [ ] "Perfectionist" - 10 perfect landings in a row
- [ ] "High Roller" - Score 5000+ in one game
- [ ] "Dedicated" - Play 7 days in a row

#### 9.3 Social Features
**Files:** `SocialManager.cs`

**Features:**
- [ ] Share score (native Android share)
- [ ] Screenshot with score overlay
- [ ] Invite friends (Google Play)

---

### ✅ PHASE 10: Optimization & Testing (Week 8)

#### 10.1 Performance Optimization
- [ ] Object pooling (obstacles, particles, UI)
- [ ] Texture atlasing
- [ ] Audio compression
- [ ] Reduce draw calls
- [ ] Profile with Unity Profiler

**Target Metrics:**
- 60 FPS on mid-range devices (2020+)
- < 50 MB APK size
- < 100 MB RAM usage
- < 1s load time

#### 10.2 Android Build Configuration
**Build Settings:**
```
Minimum API Level: Android 5.0 (API 21)
Target API Level: Android 13 (API 33)
IL2CPP: ARM64 (required for Play Store)
Compression: LZ4 (faster loading)
```

#### 10.3 Testing Checklist
- [ ] Low-end device testing (2GB RAM)
- [ ] Various screen sizes (16:9, 18:9, 19.5:9)
- [ ] Ad integration testing (test ads)
- [ ] IAP testing (sandbox environment)
- [ ] Play Games Services testing
- [ ] Offline mode functionality
- [ ] Battery/heat testing (30+ min sessions)

---

### ✅ PHASE 11: Google Play Preparation (Week 9)

#### 11.1 Store Listing Assets
**Required:**
- [ ] App Icon (512×512)
- [ ] Feature Graphic (1024×500)
- [ ] Screenshots (min 2, max 8)
  - Phone: 16:9 or 9:16
  - Tablet: optional
- [ ] Promo Video (optional, YouTube)

#### 11.2 Store Listing Copy
**Files:** `store_listing.md`

**Required Text:**
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] App title (30 chars)
- [ ] Category: Casual
- [ ] Content rating questionnaire

#### 11.3 Privacy & Compliance
- [ ] Privacy Policy URL
- [ ] Data safety form
- [ ] COPPA compliance (if targeting kids)
- [ ] GDPR compliance (EU users)
- [ ] Permissions justification

---

### ✅ PHASE 12: Soft Launch & Iteration (Week 10+)

#### 12.1 Soft Launch Strategy
**Countries:** Philippines, Singapore, or New Zealand  
**Goals:**
- Test retention (D1, D7, D30)
- Test monetization (ARPU, ad impressions)
- Gather user feedback
- Find bugs in production

#### 12.2 Analytics Integration
**SDK:** Firebase Analytics

**Key Events:**
- [ ] game_start
- [ ] game_over (with score)
- [ ] ad_watched (with placement)
- [ ] iap_purchase (with product)
- [ ] daily_challenge_complete
- [ ] share_score

**KPIs to Track:**
- Retention: D1, D7, D30
- Session length (avg)
- Session frequency (per day)
- ARPU (Average Revenue Per User)
- Ad impression per session
- IAP conversion rate

#### 12.3 A/B Testing
**Test Variables:**
- Difficulty curve
- Ad placement frequency
- UI button text/colors
- Score multipliers

---

## File Structure Reference

```
OneMoreMove/
├── Assets/
│   └── _Project/
│       ├── Scenes/
│       │   ├── MainMenu.unity
│       │   ├── Gameplay.unity
│       │   └── Loading.unity
│       ├── Scripts/
│       │   ├── Core/
│       │   │   ├── GameManager.cs
│       │   │   ├── GameStateManager.cs
│       │   │   └── DataManager.cs
│       │   ├── Gameplay/
│       │   │   ├── PlayerController.cs
│       │   │   ├── PhysicsController.cs
│       │   │   ├── LevelGenerator.cs
│       │   │   ├── ObstacleSpawner.cs
│       │   │   ├── ScoringZone.cs
│       │   │   └── DifficultyScaler.cs
│       │   ├── UI/
│       │   │   ├── UIManager.cs
│       │   │   ├── MainMenuUI.cs
│       │   │   ├── GameplayUI.cs
│       │   │   ├── GameOverPanel.cs
│       │   │   └── UIAnimations.cs
│       │   ├── Managers/
│       │   │   ├── ScoreManager.cs
│       │   │   ├── AudioManager.cs
│       │   │   ├── AdManager.cs
│       │   │   ├── IAPManager.cs
│       │   │   ├── SocialManager.cs
│       │   │   └── DailyChallengeManager.cs
│       │   └── Utilities/
│       │       ├── ObjectPool.cs
│       │       ├── TweenHelper.cs
│       │       └── Extensions.cs
│       ├── Prefabs/
│       │   ├── Player.prefab
│       │   ├── Obstacles/
│       │   ├── Zones/
│       │   └── UI/
│       ├── Materials/
│       ├── Sprites/
│       ├── Audio/
│       └── Animations/
├── ProjectSettings/
├── Packages/
└── Documentation/
    ├── GDD.md (this master prompt)
    ├── IMPLEMENTATION_PLAN.md (this file)
    ├── API_REFERENCE.md
    └── STORE_LISTING.md
```

---

## Development Priorities

### Must Have (MVP)
✅ Core drag-and-launch mechanics  
✅ Basic physics system  
✅ Procedural level generation  
✅ Scoring system  
✅ Game over flow with restart  
✅ Rewarded ad integration (One More Move)  
✅ High score persistence  

### Should Have (Soft Launch)
✅ Visual polish and animations  
✅ Sound effects and music  
✅ Daily challenge  
✅ Google Play Leaderboard  
✅ IAP (Remove Ads)  
✅ Share functionality  

### Nice to Have (Post-Launch)
⭐ Cosmetic skins  
⭐ Additional game modes  
⭐ Seasonal events  
⭐ Friend challenges  
⭐ Cloud save  

---

## Time Estimate

**Total Development Time:** 10-12 weeks

- Weeks 1-2: Foundation & Core Mechanics
- Weeks 3-5: Content & Polish
- Weeks 6-7: Monetization & Retention
- Weeks 8-9: Optimization & Submission
- Week 10+: Soft Launch & Iteration

**Team Size:** 1-2 developers, 1 artist (optional)

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Poor retention | High | A/B test difficulty, add more feedback |
| Low ad fill rate | High | Use mediation, multiple ad networks |
| Physics inconsistency | Medium | Fixed timestep, deterministic physics |
| Performance issues | Medium | Early profiling, object pooling |
| Google Play rejection | Low | Follow all policies, test thoroughly |

---

## Success Metrics (Soft Launch Goals)

- **D1 Retention:** > 40%
- **D7 Retention:** > 15%
- **Avg Session Length:** 2-4 minutes
- **Avg Sessions/Day:** 3-5
- **Ad Impression/Session:** 1.5-2.5
- **ARPU (Day 1):** $0.03-0.08

---

## Next Steps

1. ✅ Create Unity project
2. ✅ Set up folder structure
3. ✅ Implement core player controller
4. ✅ Build first playable prototype
5. ✅ Gather feedback and iterate

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-23  
**Owner:** Development Team  
