# ONE MORE MOVE - Quick Start Guide

## 🚀 Getting Started with Unity

### Prerequisites
1. **Unity Hub** - Download from [unity.com](https://unity.com)
2. **Unity 2022.3 LTS** - Install via Unity Hub
3. **Android Build Support** - Include when installing Unity
   - Android SDK & NDK Tools
   - OpenJDK

### Project Setup Steps

#### 1. Create New Unity Project
```bash
# Open Unity Hub
# Click "New Project"
# Select "2D Core" template
# Name: OneMoreMove
# Location: c:\Users\User\Desktop\oyun
```

#### 2. Configure Build Settings
```
File → Build Settings
- Switch Platform to "Android"
- Select "Build Settings" → "Player Settings"

Player Settings:
├── Company Name: [Your Name]
├── Product Name: One More Move
├── Package Name: com.yourcompany.onemmoremove
├── Version: 0.1.0
└── Minimum API Level: Android 5.0 (API 21)
```

#### 3. Import Project Scripts
The scripts are already created in `Assets/_Project/Scripts/`:
- ✅ `Core/GameManager.cs`
- ✅ `Gameplay/PlayerController.cs`
- ✅ `Managers/ScoreManager.cs`

#### 4. Set Up Main Scene

**Create Main Scene:**
1. Create new scene: `Assets/_Project/Scenes/Gameplay.unity`
2. Save current scene

**Camera Setup:**
```
Main Camera:
├── Position: (0, 0, -10)
├── Projection: Orthographic
├── Size: 5
└── Background: #1A1A2E (Dark Blue)
```

**Create Player:**
```
1. GameObject → 2D Object → Sprites → Circle
2. Name: "Player"
3. Add Components:
   - Rigidbody2D (Gravity Scale: 1, Kinematic: checked)
   - Circle Collider 2D
   - PlayerController script
4. Position: (0, -4, 0)
5. Scale: (0.5, 0.5, 1)
```

**Create Game Manager:**
```
1. GameObject → Create Empty
2. Name: "GameManager"
3. Add Component: GameManager script
```

**Create Score Manager:**
```
1. GameObject → Create Empty
2. Name: "ScoreManager"
3. Add Component: ScoreManager script
```

#### 5. Configure Physics
```
Edit → Project Settings → Physics 2D

Settings:
├── Gravity: (0, -9.81)
├── Default Material: Create "PlayerPhysicsMaterial"
│   ├── Friction: 0.3
│   └── Bounciness: 0.6
└── Layers: Create "Player", "Obstacle", "Scoring"
```

#### 6. Test the Basics
```
1. Press Play in Unity
2. Click and drag on the player
3. Release to launch
4. Check Console for debug messages
```

---

## 📝 Next Development Steps

### Phase 1: Core Prototype (This Week)

#### Step 1: Create Scoring Zones ✅ Ready to implement
```
File location: Assets/_Project/Scripts/Gameplay/ScoringZone.cs

What it does:
- Detects player landing
- Calculates distance from center
- Triggers score calculation
```

#### Step 2: Create Level Generator ✅ Ready to implement
```
File location: Assets/_Project/Scripts/Gameplay/LevelGenerator.cs

What it does:
- Procedurally spawns obstacles
- Creates scoring zones
- Scales difficulty
```

#### Step 3: Create Obstacles ✅ Ready to implement
```
File location: Assets/_Project/Scripts/Gameplay/Obstacle.cs

What it does:
- Static barriers
- Different shapes/sizes
- Collision physics
```

#### Step 4: Build UI ✅ Ready to implement
```
Files needed:
- Assets/_Project/Scripts/UI/GameplayUI.cs
- Assets/_Project/Scripts/UI/GameOverPanel.cs
- Assets/_Project/Scripts/UI/MainMenuUI.cs

What they do:
- Display score
- Show game over options
- Handle menu navigation
```

---

## 🎨 Asset Creation Guide

### Sprites Needed

#### Player Sprite
```
Size: 128x128px
Shape: Circle or simple geometric
Colors: Bright gradient (Purple to Cyan)
Export as: player.png
```

#### Obstacle Sprites
```
1. obstacle_square.png (128x128px) - Square barrier
2. obstacle_bar.png (256x64px) - Vertical/horizontal bar
3. obstacle_triangle.png (128x128px) - Triangle barrier
```

#### Zone Sprites
```
1. zone_10.png - Gray circle (128x128px)
2. zone_50.png - Blue circle (192x192px)
3. zone_100.png - Green circle (256x256px)
4. zone_500.png - Orange circle (320x320px)
5. zone_1000.png - Purple circle (192x192px)
```

### Creating Sprites in Unity
```
1. Import PNG files to Assets/_Project/Sprites/
2. Select each sprite
3. In Inspector:
   - Texture Type: Sprite (2D and UI)
   - Pixels Per Unit: 100
   - Filter Mode: Bilinear
   - Compression: None (for quality)
```

---

## 🔧 Common Unity Tasks

### Creating a Prefab
```
1. Set up GameObject in scene with all components
2. Drag from Hierarchy to Assets/_Project/Prefabs/
3. Now it's reusable across scenes
```

### Adding a Script Component
```
1. Select GameObject
2. Inspector → Add Component
3. Search for script name
4. Click to add
```

### Adjusting Rigidbody2D
```
Common settings:
├── Body Type: Dynamic (for moving objects)
├── Mass: 1 (default)
├── Linear Drag: 0.2 (air resistance)
├── Angular Drag: 0.05 (rotation resistance)
├── Gravity Scale: 1 (normal gravity)
└── Collision Detection: Continuous (for fast objects)
```

### Creating Layers
```
1. Edit → Project Settings → Tags and Layers
2. Add new layers:
   - Player (Layer 6)
   - Obstacle (Layer 7)  
   - ScoringZone (Layer 8)
3. Use for collision filtering
```

### Setting up Collision Matrix
```
Edit → Project Settings → Physics 2D → Layer Collision Matrix

Configure which layers collide:
✅ Player ↔ Obstacle
✅ Player ↔ ScoringZone (as trigger)
❌ Obstacle ↔ ScoringZone
```

---

## 🐛 Common Issues & Solutions

### Issue: Player won't launch
**Solution:**
- Check Rigidbody2D is NOT kinematic when launching
- Verify PlayerController is attached
- Check console for errors

### Issue: Trajectory line not showing
**Solution:**
- Ensure LineRenderer component exists
- Check trajectoryLine is not null in Inspector
- Verify material is assigned

### Issue: No collisions detected
**Solution:**
- Both objects need Collider2D components
- At least one needs Rigidbody2D
- Check Layer Collision Matrix

### Issue: Physics feels wrong
**Solution:**
- Adjust Gravity in Physics2D settings
- Tweak Rigidbody2D mass and drag
- Modify Physics Material bounciness

---

## 📊 Testing Checklist

### Core Mechanics
- [ ] Can drag player
- [ ] Trajectory shows correctly
- [ ] Player launches on release
- [ ] Physics feel satisfying
- [ ] Game state transitions work

### Game Flow
- [ ] Game starts in Ready state
- [ ] Transitions to Aiming on touch
- [ ] Transitions to Moving on release
- [ ] Can restart after game over

### Data
- [ ] Score saves/loads correctly
- [ ] High score updates
- [ ] Games played increments

---

## 🎯 Immediate Action Items

### To Do Right Now:
1. ✅ Open Unity Hub
2. ✅ Create new 2D project
3. ✅ Copy all scripts into Unity project
4. ✅ Set up Gameplay scene
5. ✅ Create player GameObject
6. ✅ Test basic drag-and-launch

### To Do This Week:
1. Create scoring zones
2. Implement basic obstacles
3. Build simple level generator
4. Add UI (score display)
5. Create game over screen

### To Do Next Week:
1. Polish visuals
2. Add sound effects
3. Implement difficulty scaling
4. Create main menu
5. Test on Android device

---

## 📚 Resources

### Unity Documentation
- [Rigidbody2D](https://docs.unity3d.com/Manual/class-Rigidbody2D.html)
- [Physics2D](https://docs.unity3d.com/Manual/Physics2DReference.html)
- [Input System](https://docs.unity3d.com/Manual/ConventionalGameInput.html)

### Tutorials
- [Unity 2D Physics Tutorial](https://learn.unity.com/tutorial/physics-2d)
- [Mobile Input](https://learn.unity.com/tutorial/mobile-touch-input)

### Assets
- [Google Fonts](https://fonts.google.com/) - Free fonts
- [Freesound](https://freesound.org/) - Free sound effects
- [Kenney.nl](https://kenney.nl/assets) - Free game assets

---

## 💡 Tips & Best Practices

### Performance
- Use object pooling for frequently spawned objects
- Limit particles to < 100 active at once
- Keep draw calls low (combine sprites)
- Profile regularly with Unity Profiler

### Code
- Use namespaces to organize scripts
- Comment complex logic
- Use events for decoupled communication
- Follow C# naming conventions

### Mobile
- Test on actual device early
- Design for touch (big touch targets)
- Consider various screen sizes
- Optimize for battery usage

---

**Ready to build?** Start with Step 1 above and let's create an amazing game! 🚀
