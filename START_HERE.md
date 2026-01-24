# 🚀 IMMEDIATE ACTION PLAN - ONE MORE MOVE

## ✅ What's Been Completed

### Documentation ✅
- [x] **README.md** - Project overview and features
- [x] **GDD.md** - Complete game design document (21KB)
- [x] **IMPLEMENTATION_PLAN.md** - 12-phase development plan (15KB)
- [x] **QUICK_START.md** - Unity setup and beginner's guide (8KB)
- [x] **ROADMAP.md** - 12-week timeline with milestones (16KB)

### Project Structure ✅
- [x] **Folder hierarchy** - Complete Unity project structure
  - Assets/_Project/{Scenes, Scripts, Prefabs, Sprites, Audio, etc.}
  - Documentation folder
  - Plugins folder

### Core Scripts ✅
- [x] **GameManager.cs** - Game state, scoring, data persistence (singleton)
- [x] **PlayerController.cs** - Drag-to-launch, trajectory, physics
- [x] **ScoreManager.cs** - Score calculation, multipliers, bonuses

### Visual Mockups ✅
- [x] **Main Menu UI** - Designed and generated
- [x] **Game Over Screen** - Designed and generated  
- [x] **Gameplay Screen** - Designed and generated

---

## 🎯 NEXT STEPS - DO THIS NOW

### Step 1: Set Up Unity Project (30 minutes)

#### 1.1 Install Unity
```
1. Download Unity Hub from unity.com
2. Install Unity 2022.3 LTS
3. Include Android Build Support module
   ✓ Android SDK & NDK Tools
   ✓ OpenJDK
```

#### 1.2 Create Unity Project
```
1. Open Unity Hub
2. Click "New Project"
3. Select "2D Core" template
4. Project Name: OneMoreMove
5. Location: c:\Users\User\Desktop\oyun
6. Click "Create Project"
```

**⚠️ IMPORTANT:** Create the project IN the existing `oyun` folder, not in a subfolder!

#### 1.3 Copy Scripts into Unity
```
Unity should detect the existing folder structure:
  ✓ Assets/_Project/Scripts/Core/GameManager.cs
  ✓ Assets/_Project/Scripts/Gameplay/PlayerController.cs
  ✓ Assets/_Project/Scripts/Managers/ScoreManager.cs
  
Wait for Unity to compile...
```

---

### Step 2: Configure Android Build Settings (10 minutes)

```
1. File → Build Settings
2. Select "Android" 
3. Click "Switch Platform"
4. Click "Player Settings"

Configure:
  Company Name: [Your Name]
  Product Name: One More Move
  Package Name: com.yourcompany.onemoremove
  Version: 0.1.0
  
  Other Settings:
  └─ Minimum API Level: Android 5.0 (API 21)
  └─ Scripting Backend: IL2CPP
  └─ Target Architectures: ARM64 ✓
```

---

### Step 3: Create Gameplay Scene (20 minutes)

#### 3.1 Create Scene
```
1. File → New Scene
2. Save as: Assets/_Project/Scenes/Gameplay.unity
```

#### 3.2 Configure Camera
```
Select "Main Camera":
  Position: (0, 0, -10)
  Projection: Orthographic
  Size: 5
  Background: #1A1A2E
```

#### 3.3 Create Game Manager
```
1. GameObject → Create Empty
2. Name: "GameManager"
3. Add Component → Scripts → GameManager
```

#### 3.4 Create Score Manager
```
1. GameObject → Create Empty
2. Name: "ScoreManager"
3. Add Component → Scripts → ScoreManager
```

#### 3.5 Create Player
```
1. GameObject → 2D Object → Sprites → Circle
2. Name: "Player"
3. Position: (0, -4, 0)
4. Scale: (0.5, 0.5, 1)
5. Add Component → Rigidbody2D
   - Gravity Scale: 1
   - Body Type: Kinematic (checked)
6. Add Component → Circle Collider 2D
   - Radius: 0.5
7. Add Component → Scripts → PlayerController
```

#### 3.6 Create Ground (Temporary)
```
1. GameObject → 2D Object → Sprites → Square
2. Name: "Ground"
3. Position: (0, -4.5, 0)
4. Scale: (10, 0.2, 1)
5. Add Component → Box Collider 2D
```

---

### Step 4: Test Basic Gameplay (5 minutes)

```
1. Click Play button in Unity
2. Click and drag on the player circle
3. You should see:
   ✓ Trajectory line appears
   ✓ Player stretches slightly
   ✓ Console shows "Started dragging"
4. Release mouse
5. You should see:
   ✓ Player launches
   ✓ Physics active
   ✓ Console shows "Launched with force: ..."
6. Click Stop to exit Play mode
```

**Expected output in Console:**
```
[GameManager] Initializing...
[GameManager] Initialization complete
[GameManager] Loaded player data - High Score: 0, Games Played: 0
[PlayerController] Started dragging
[PlayerController] Released - launching!
[PlayerController] Launched with force: (X, Y)
[GameManager] State changed: Ready -> Aiming
[GameManager] State changed: Aiming -> Moving
```

---

### Step 5: Create First Scoring Zone (30 minutes)

Create this new script:

**File:** `Assets/_Project/Scripts/Gameplay/ScoringZone.cs`

```csharp
using UnityEngine;

namespace OneMoreMove.Gameplay
{
    [RequireComponent(typeof(CircleCollider2D))]
    public class ScoringZone : MonoBehaviour
    {
        [SerializeField] private int zoneValue = 100;
        [SerializeField] private Color zoneColor = Color.green;
        
        private CircleCollider2D zoneCollider;
        
        private void Awake()
        {
            zoneCollider = GetComponent<CircleCollider2D>();
            zoneCollider.isTrigger = true;
            
            // Set visual color
            SpriteRenderer sr = GetComponent<SpriteRenderer>();
            if (sr != null)
            {
                sr.color = zoneColor;
            }
        }
        
        private void OnTriggerEnter2D(Collider2D other)
        {
            if (other.CompareTag("Player"))
            {
                // Calculate distance from center
                float distance = Vector2.Distance(transform.position, other.transform.position);
                
                // Create landing data
                Managers.LandingData landingData = new Managers.LandingData
                {
                    zoneValue = zoneValue,
                    distanceFromCenter = distance,
                    landingPosition = other.transform.position,
                    landingVelocity = other.GetComponent<Rigidbody2D>().velocity.magnitude
                };
                
                // Calculate score
                var result = Managers.ScoreManager.Instance.CalculateScore(landingData);
                
                Debug.Log($"[ScoringZone] Scored {result.finalScore} points!");
                
                // Update game manager
                Core.GameManager.Instance.AddScore(result.finalScore, result.isPerfect);
                
                // Transition to game over
                Core.GameManager.Instance.SetGameState(Core.GameState.GameOver);
            }
        }
    }
}
```

Then in Unity:
```
1. GameObject → 2D Object → Sprites → Circle
2. Name: "Zone_100"
3. Position: (0, 2, 0)
4. Scale: (2, 2, 1)
5. Color: Green
6. Add Component → Circle Collider 2D
   - Is Trigger: ✓ (checked)
7. Add Component → Scripts → ScoringZone
   - Zone Value: 100
   - Zone Color: Green
8. Tag: Create new tag "Player" and assign to Player object
```

---

### Step 6: Test Complete Game Loop (5 minutes)

```
1. Click Play
2. Drag player and aim at the green zone
3. Release to launch
4. Player should:
   ✓ Launch toward zone
   ✓ Enter the zone (trigger)
   ✓ Score is calculated
   ✓ Console shows score breakdown
   ✓ Game state becomes "GameOver"
```

**Expected Console Output:**
```
[ScoreManager] Score Breakdown:
  Base: 100
  Precision: x2.0
  Perfect Bonus: +0
  Risk Bonus: +0
  Streak: x1.0 (0)
  FINAL: 200
[ScoringZone] Scored 200 points!
[GameManager] Score: 200 | Perfect Streak: 0
[GameManager] Game Over! Final Score: 200
[GameManager] Player data saved
```

---

## 🎯 After Completing These Steps

You will have:
- ✅ Fully functional Unity project
- ✅ Working drag-to-launch mechanic
- ✅ Trajectory visualization
- ✅ Scoring system working
- ✅ Complete game loop (ready → aim → launch → score → game over)

---

## 📋 WEEK 1 TODO LIST

Now that basics work, continue with:

### Day 3-4: More Content
- [ ] Create 5 scoring zones (10, 50, 100, 500, 1000 points)
- [ ] Create 3 basic obstacle prefabs
- [ ] Add restart button in UI

### Day 5-6: Level Generation
- [ ] Implement LevelGenerator.cs
- [ ] Procedural obstacle placement
- [ ] Test 20+ generated levels

### Day 7: Device Testing
- [ ] Build APK
- [ ] Test on Android device
- [ ] Fix any device-specific issues

---

## 🚨 Common Issues & Fixes

### "Can't find GameManager.Instance"
**Fix:** Make sure GameManager object exists in scene with script attached

### "Trajectory line not showing"
**Fix:** 
1. Player object needs LineRenderer component
2. Check trajectory line is enabled during drag
3. Verify gradient colors are set

### "Player won't launch"
**Fix:**
1. Rigidbody2D must be NOT kinematic when launching
2. Check force calculation in PlayerController
3. Verify Physics2D gravity is enabled

### "No collision with zone"
**Fix:**
1. Zone must have CircleCollider2D with "Is Trigger" checked
2. Player must have Rigidbody2D
3. Player must be tagged "Player"

---

## 💪 You've Got This!

Everything you need is ready:
- ✅ Complete documentation
- ✅ Core scripts written
- ✅ UI designs created
- ✅ Step-by-step guide
- ✅ Clear roadmap

**Next step:** Open Unity and follow Step 1 above! 🚀

**Estimated time to first playable:** 1-2 hours

**Questions?** Check:
- QUICK_START.md for Unity basics
- GDD.md for game design details
- IMPLEMENTATION_PLAN.md for technical details
- ROADMAP.md for timeline

---

**Let's build ONE MORE MOVE! 🎮**
