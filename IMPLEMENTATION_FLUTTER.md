# One More Move - Flutter Rebuild Implementation

This document outlines the rebuild of "One More Move" using Flutter and Flame.

## Tech Stack
- **Framework**: Flutter (Dart)
- **Engine**: Flame (2D Game Engine)
- **Persistence**: SharedPreferences
- **Design**: Minimalist, high-contrast, premium physics-based casual game.

## Key Features Implemented

### 1. Aiming System (Comfort Mode)
- **Constraint**: Aiming input is restricted to the bottom 50% of the screen.
- **Logic**: Pan interaction is only initiated if the starting touch is in the lower half.
- **Visuals**: The upper half is reserved for obstacle visuals and trajectory observation.

### 2. Physics & Control
- **Reduced Speed**: Ball velocity is scaled to 15% of the drag vector (0.15 modifier), providing "Comfort Mode" control.
- **Predictable Collisions**: Simplified elastic collision logic ensures the ball never gets stuck.

### 3. Progressive Leveling
- **Difficulty**: Increases every level by adding more targets and obstacles.
- **Backgrounds**: Noticeable color shift triggered on every level completion to signify progress.

### 4. Star System
- **Calculation**:
  - 1–2 shots → 5 stars
  - 3–5 shots → 4 stars
  - 6+ shots → 3 stars
- Saved persistently to track mastery.

### 5. Life & Revive System
- **Capacity**: Starts at 5 lives.
- **Leveling Bonus**: Every 10 levels, max life capacity increases (+1) up to a cap of 10.
- **Ad Revive**: Max 3 times per run using a rewarded ad simulation.

### 6. Monetization
- **Subscriptions**: Placeholder screens for 1, 3, and 12-month plans to remove ads.

## How to Test
1. **HTML Prototype**: Open `one_more_move_test.html` in any browser. It contains the 1:1 logic representation of the Flutter code.
2. **Flutter Project**: The source code is located in the `flutter_app/` directory.
   - Run `flutter pub get`
   - Run `flutter run`
