# 3D Rubik's Cube Learning Game 🎲

A high-performance, polished, browser-based 3D Rubik's Cube (3×3×3) built with **Three.js**, **Vite**, and **cubejs** (Kociemba Two-Phase Algorithm).

Designed for cubers of all levels: learn standard move notation, practice speedcubing with a live millisecond timer, turn faces via interactive 3D drag gestures or keyboard shortcuts, and get professional-grade solving hints and auto-play walkthroughs.

---

## 🚀 Features

- **Realistic 3D Speedcube Model**:
  - 27 individually modeled beveled cubies with rounded edges and matte black plastic cores.
  - 54 outward-facing vinyl sticker tiles with standard Western competition colors:
    - **Up (U)**: White ($+Y$)
    - **Down (D)**: Yellow ($-Y$)
    - **Front (F)**: Green ($+Z$)
    - **Back (B)**: Blue ($-Z$)
    - **Left (L)**: Orange ($-X$)
    - **Right (R)**: Red ($+X$)
  - Emissive sticker glow highlights for interactive hints.

- **Intuitive Camera & Navigation**:
  - Smooth OrbitControls with left-drag orbit, scroll-wheel zoom, and polar angle constraints to prevent disorienting camera flips.
  - One-click camera perspective buttons: **Front**, **Back**, **Left**, **Right**, **Top**, **Bottom**, and **Reset View** (smooth spherical camera trajectory).
  - Synchronized 3D Orientation Gizmo in the top corner displaying the 6 Western faces. Clicking any face on the gizmo aligns the camera.

- **Multiple Turning Methods**:
  - **Drag-to-Turn via Raycasting**: Click and drag across any sticker to turn that layer in the direction of your mouse or finger drag.
  - **18 On-Screen Move Buttons**: Dedicated buttons for $U, D, L, R, F, B$, their primes ($'$), and double turns ($2$).
  - **Keyboard Shortcuts**: Single-key turns for speedcubers with modifier keys for counter-clockwise and 180° turns.
  - **Move History & Undo/Redo**: Live move badge timeline, move counter, and full undo/redo stack (`Ctrl+Z`, `Ctrl+Y`).

- **WCA-Compliant Scrambler & Speedcubing Timer**:
  - Generates 22-move random legal scrambles (no consecutive moves on the same face, no same-axis ping-ponging).
  - Fluid $60\,\text{ms}$ rapid scramble animation on the 3D cube.
  - Timer arms automatically and starts on the user's first turn.
  - Tracks minutes:seconds:milliseconds, move count, and persists Personal Best (PB) times to `localStorage`.
  - Solved detection with celebratory multi-cannon confetti bursts (`canvas-confetti`) and victory summary modal.

- **Kociemba Two-Phase Optimal Solver & 3-Level Hints**:
  - Powered by `cubejs`, finding near-optimal solutions (typically $\le 20$ moves).
  - **Level 1 (Nudge)**: Illuminates the required layer with a cyan emissive glow directly on the 3D cube without revealing the move notation.
  - **Level 2 (Move)**: Displays the move notation (e.g. `Next Move: R'`) and a plain-English explanation of the move's objective.
  - **Level 3 (Show)**: Enables step-by-step ("Apply Next") or full "Auto-Play" through the solution with adjustable playback speed ($0.5\times$, $1\times$, $2\times$).
  - Dynamic hint re-computation: if you make a move manually or deviate, the solver automatically recalculates from the new state.
  - **Beginner Mode (Layer-by-Layer)**: Classifies and guides through White Cross, White Corners, Middle Layer, Yellow Cross, Yellow Corners, and Permutation (PLL).

- **Web Audio Sound Effects**:
  - Native Web Audio synthesizer generating mechanical speedcube plastic turn clicks and solve fanfares. Mute/unmute toggle in the header.

---

## ⌨️ Controls & Shortcuts

| Action | Control / Shortcut |
| :--- | :--- |
| **Orbit View** | Left-click + Drag on background |
| **Zoom In / Out** | Mouse scroll wheel or 2-finger pinch |
| **Drag-to-Turn Layer** | Left-click on any sticker + Drag along face |
| **Clockwise Turns** | <kbd>U</kbd>, <kbd>D</kbd>, <kbd>L</kbd>, <kbd>R</kbd>, <kbd>F</kbd>, <kbd>B</kbd> |
| **Counter-Clockwise ($'$)** | <kbd>Shift</kbd> + <kbd>U</kbd>, <kbd>D</kbd>, <kbd>L</kbd>, <kbd>R</kbd>, <kbd>F</kbd>, <kbd>B</kbd> |
| **Half Turns ($2$)** | <kbd>Alt</kbd> + <kbd>U</kbd>, <kbd>D</kbd>, <kbd>L</kbd>, <kbd>R</kbd>, <kbd>F</kbd>, <kbd>B</kbd> |
| **Undo Move** | <kbd>Ctrl+Z</kbd> / <kbd>Cmd+Z</kbd> |
| **Redo Move** | <kbd>Ctrl+Y</kbd> / <kbd>Cmd+Y</kbd> / <kbd>Ctrl+Shift+Z</kbd> |
| **Camera View Presets** | Click Front, Back, Left, Right, Top, Bottom, or Reset View |

---

## 🛠️ Project Structure

```
rubiks-cube-game/
├── index.html                   # HTML entry point with UI overlay layout
├── styles.css                   # Glassmorphism dark-mode stylesheet
├── package.json                 # Scripts and dependencies
├── src/
│   ├── main.js                  # Application orchestrator, scene loop, and state wiring
│   ├── cube/
│   │   ├── constants.js         # Western colors, 3D normals, Kociemba 54-facelet mapping
│   │   ├── cubie.js             # Beveled 3D cubie geometries, sticker generation, materials
│   │   ├── cubeModel.js         # 27 cubie mesh management, layer rotation pivot, easing
│   │   ├── cubeState.js         # Logical single source of truth (cubejs wrapper, history)
│   │   ├── interactionController.js # Raycasting and 3D screen-tangent drag-to-turn
│   │   ├── keyboardController.js    # Keyboard shortcuts & modifier mapping
│   │   └── scrambleGenerator.js     # WCA-compliant scramble generator
│   ├── camera/
│   │   ├── cameraController.js  # OrbitControls & smooth spherical camera animations
│   │   └── orientationGizmo.js  # Synchronized 3D mini orientation cube
│   ├── solver/
│   │   ├── solverService.js     # Kociemba two-phase optimal solver wrapper
│   │   ├── moveExplanations.js  # Plain-English move guides & CFOP stage classifier
│   │   └── hintManager.js       # 3-level hint coordination & dynamic recomputation
│   ├── ui/
│   │   ├── viewPanel.js         # Camera view buttons
│   │   ├── movePanel.js         # 18 standard move buttons
│   │   ├── timerPanel.js        # Speedcube timer, moves counter, best time display
│   │   ├── solverPanel.js       # Solution timeline, hint levels, auto-play controls
│   │   ├── historyPanel.js      # Move history timeline & undo/redo buttons
│   │   └── celebrationModal.js  # Solved celebration modal & confetti
│   └── audio/
│       └── soundEffects.js      # Web Audio mechanical clicks & solve fanfare
└── tests/
    ├── stage1.test.js           # 3D model geometry & color scheme verification
    ├── stage2.test.js           # Commutativity, inverses, four R turns, undo/redo
    ├── stage3.test.js           # Scrambler constraints, timer math, reset logic
    ├── stage4.test.js           # Kociemba solver execution & stage classification
    └── stage5.test.js           # Sound effects toggle & state verification
```

---

## 💻 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the project directory
cd rubiks-cube-game

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The game will start at `http://localhost:5173/`.

### Run Unit Tests
```bash
npm test
```
Runs the Vitest test suite across all 5 stages (21 unit tests).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle inside `dist/`.

---

## 🧪 Testing Summary

All 21 unit tests pass:
1. **Model & Colors**: 27 cubies, 54 outward stickers, 6 centers, 12 edges, 8 corners, 1 core, exact Western hex colors.
2. **Move Logic**: $R R' = I$, $R^4 = I$, $R2 \times 2 = I$, all 6 faces and double turns, undo/redo stacks.
3. **Scrambling & Solved**: WCA non-consecutive constraint, non-solved post-scramble state, reverse-inversion restoration, reset logic.
4. **Solver & Hints**: Solves simple commutators ($R U R' U'$), solves full 20-move Kociemba scrambles, CFOP stage classifier.
5. **Audio & Polish**: Web Audio toggles, persistent settings.
