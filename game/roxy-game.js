/*
  Roxy's Churu Run — a small Mario-style platformer.
  Pure canvas 2D + vanilla JS, no dependencies. Roxy is drawn from
  images/Roxy.png when it's available; until then (or if it fails to
  load) a simple drawn cat is used instead, so the game always works.
*/

(function () {
  "use strict";

  const CANVAS_W = 960;
  const CANVAS_H = 540;
  const GROUND_Y = 480;
  const GRAVITY = 0.6;
  const JUMP_VELOCITY = -12.2;
  const MOVE_SPEED = 4.2;
  const PLAYER_W = 46;
  const PLAYER_H = 50;
  const CHURU_RADIUS = 16;
  const TOTAL_LIVES = 3;

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  // ---- Roxy sprite (with graceful fallback) --------------------------------
  const roxyImg = new Image();
  let roxyImgReady = false;
  roxyImg.onload = () => { roxyImgReady = true; };
  roxyImg.onerror = () => { roxyImgReady = false; };
  roxyImg.src = "../images/Roxy.png";

  function drawFallbackCat(x, y, w, h, facing) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.scale(facing, 1);
    ctx.translate(-w / 2, -h / 2);
    // body
    ctx.fillStyle = "#b06a3a";
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.62, w * 0.42, h * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    // head
    ctx.beginPath();
    ctx.ellipse(w * 0.62, h * 0.32, w * 0.32, h * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    // ears
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.14);
    ctx.lineTo(w * 0.5, h * -0.08);
    ctx.lineTo(w * 0.62, h * 0.14);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w * 0.72, h * 0.1);
    ctx.lineTo(w * 0.86, h * -0.1);
    ctx.lineTo(w * 0.92, h * 0.16);
    ctx.fill();
    // face stripe
    ctx.fillStyle = "#f3e3d3";
    ctx.beginPath();
    ctx.ellipse(w * 0.68, h * 0.38, w * 0.16, h * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    // eye
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(w * 0.74, h * 0.3, w * 0.045, 0, Math.PI * 2);
    ctx.fill();
    // tail
    ctx.strokeStyle = "#b06a3a";
    ctx.lineWidth = w * 0.16;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(w * 0.12, h * 0.62);
    ctx.quadraticCurveTo(-w * 0.25, h * 0.5, -w * 0.1, h * 0.1);
    ctx.stroke();
    ctx.restore();
  }

  function drawRoxy(x, y, w, h, facing) {
    if (roxyImgReady && roxyImg.naturalWidth) {
      const aspect = roxyImg.naturalWidth / roxyImg.naturalHeight;
      const drawH = h;
      const drawW = h * aspect;
      const offsetX = x + (w - drawW) / 2;
      ctx.save();
      if (facing === -1) {
        ctx.translate(offsetX + drawW / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(roxyImg, -drawW / 2, y, drawW, drawH);
      } else {
        ctx.drawImage(roxyImg, offsetX, y, drawW, drawH);
      }
      ctx.restore();
    } else {
      drawFallbackCat(x, y, w, h, facing);
    }
  }

  // ---- Level data -----------------------------------------------------
  // Coordinates are in the same virtual units as the canvas (960x540),
  // scrolled horizontally by a camera as Roxy moves through the level.
  function buildLevels() {
    return [
      // ---------------- Level 1 ----------------
      {
        width: 2200,
        ground: [{ x: 0, width: 2200 }],
        platforms: [
          { x: 520, y: 372, width: 130, height: 20 },
          { x: 1080, y: 340, width: 150, height: 20 },
          { x: 1650, y: 380, width: 140, height: 20 }
        ],
        cords: [
          { x: 320, width: 60 },
          { x: 560, width: 60 },
          { x: 800, width: 70 },
          { x: 1040, width: 60 },
          { x: 1300, width: 70 },
          { x: 1560, width: 60 },
          { x: 1820, width: 70 }
        ],
        churus: [
          { x: 260, y: 430 }, { x: 420, y: 430 }, { x: 585, y: 330 },
          { x: 690, y: 430 }, { x: 900, y: 430 }, { x: 1145, y: 298 },
          { x: 1400, y: 430 }, { x: 1500, y: 430 }, { x: 1715, y: 338 },
          { x: 1950, y: 430 }, { x: 2050, y: 430 }
        ],
        goal: { x: 2130, y: GROUND_Y }
      },

      // ---------------- Level 2 ----------------
      {
        width: 2800,
        ground: [
          { x: 0, width: 900 },
          { x: 1000, width: 600 },
          { x: 1700, width: 1100 }
        ],
        platforms: [
          { x: 560, y: 360, width: 130, height: 20 },
          { x: 900, y: 400, width: 110, height: 20 },
          { x: 1250, y: 350, width: 140, height: 20 },
          { x: 1600, y: 400, width: 110, height: 20 },
          { x: 1980, y: 330, width: 150, height: 20 },
          { x: 2350, y: 380, width: 140, height: 20 }
        ],
        cords: [
          { x: 260, width: 60 }, { x: 480, width: 60 }, { x: 700, width: 70 },
          { x: 1040, width: 60 }, { x: 1260, width: 60 }, { x: 1480, width: 60 },
          { x: 1780, width: 70 }, { x: 2020, width: 60 }, { x: 2260, width: 70 },
          { x: 2500, width: 70 }
        ],
        churus: [
          { x: 200, y: 430 }, { x: 400, y: 430 }, { x: 625, y: 318 },
          { x: 800, y: 430 }, { x: 955, y: 358 }, { x: 1150, y: 430 },
          { x: 1320, y: 308 }, { x: 1450, y: 430 }, { x: 1655, y: 358 },
          { x: 1850, y: 430 }, { x: 2055, y: 288 }, { x: 2200, y: 430 },
          { x: 2420, y: 338 }, { x: 2600, y: 430 }, { x: 2700, y: 430 }
        ],
        goal: { x: 2730, y: GROUND_Y }
      },

      // ---------------- Level 3 ----------------
      {
        width: 3400,
        ground: [
          { x: 0, width: 700 },
          { x: 800, width: 500 },
          { x: 1400, width: 600 },
          { x: 2100, width: 1300 }
        ],
        platforms: [
          { x: 420, y: 370, width: 110, height: 20 },
          { x: 860, y: 400, width: 100, height: 20 },
          { x: 1000, y: 330, width: 100, height: 20 },
          { x: 1150, y: 400, width: 100, height: 20 },
          { x: 1460, y: 360, width: 120, height: 20 },
          { x: 1700, y: 310, width: 120, height: 20 },
          { x: 1950, y: 380, width: 110, height: 20 },
          { x: 2200, y: 420, width: 100, height: 20 },
          { x: 2380, y: 340, width: 100, height: 20 },
          { x: 2560, y: 400, width: 100, height: 20 },
          { x: 2800, y: 350, width: 130, height: 20 },
          { x: 3050, y: 400, width: 120, height: 20 }
        ],
        cords: [
          { x: 220, width: 60 }, { x: 460, width: 60 },
          { x: 830, width: 55 }, { x: 940, width: 55 },
          { x: 1150, width: 60 },
          { x: 1440, width: 60 }, { x: 1560, width: 55 },
          { x: 1780, width: 60 }, { x: 1980, width: 60 },
          { x: 2170, width: 60 }, { x: 2400, width: 60 },
          { x: 2650, width: 65 }, { x: 2900, width: 65 },
          { x: 3150, width: 65 }
        ],
        churus: [
          { x: 160, y: 430 }, { x: 340, y: 430 }, { x: 475, y: 328 },
          { x: 620, y: 430 }, { x: 895, y: 358 }, { x: 1035, y: 288 },
          { x: 1185, y: 358 }, { x: 1330, y: 430 }, { x: 1495, y: 318 },
          { x: 1620, y: 430 }, { x: 1735, y: 268 }, { x: 1900, y: 430 },
          { x: 1985, y: 338 }, { x: 2150, y: 430 }, { x: 2235, y: 378 },
          { x: 2415, y: 298 }, { x: 2595, y: 358 }, { x: 2760, y: 430 },
          { x: 2835, y: 308 }, { x: 3020, y: 430 }, { x: 3085, y: 358 },
          { x: 3300, y: 430 }
        ],
        goal: { x: 3330, y: GROUND_Y }
      }
    ];
  }

  const LEVELS = buildLevels();

  // Flatten each level's ground segments + platforms into one collidable
  // "surfaces" list, and give ground segments a tall filled height.
  function prepareLevel(level) {
    const surfaces = [];
    level.ground.forEach((g) => {
      surfaces.push({ x: g.x, y: GROUND_Y, width: g.width, height: CANVAS_H - GROUND_Y + 40, isGround: true });
    });
    level.platforms.forEach((p) => {
      surfaces.push({ x: p.x, y: p.y, width: p.width, height: p.height, isGround: false });
    });
    const cords = level.cords.map((c) => ({
      x: c.x,
      y: GROUND_Y - 22,
      width: c.width,
      height: 22
    }));
    const churus = level.churus.map((c) => ({ x: c.x, y: c.y, collected: false }));
    return { ...level, surfaces, cords, churus };
  }

  // ---- Game state -----------------------------------------------------
  let state = "start"; // start | playing | levelComplete | gameOver | win
  let levelIndex = 0;
  let current = prepareLevel(LEVELS[0]);
  let camera = 0;
  let score = 0;
  let lives = TOTAL_LIVES;
  let churuTotalThisLevel = current.churus.length;

  const player = {
    x: 40,
    y: GROUND_Y - PLAYER_H,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: 1
  };

  function resetPlayerToLevelStart() {
    player.x = 40;
    player.y = GROUND_Y - PLAYER_H;
    player.vx = 0;
    player.vy = 0;
    player.facing = 1;
    camera = 0;
  }

  function loadLevel(index) {
    levelIndex = index;
    current = prepareLevel(LEVELS[index]);
    churuTotalThisLevel = current.churus.length;
    resetPlayerToLevelStart();
  }

  function restartGame() {
    score = 0;
    lives = TOTAL_LIVES;
    loadLevel(0);
  }

  // ---- Input ------------------------------------------------------------
  const keys = { left: false, right: false, jump: false };
  let jumpPressedEdge = false;

  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
    if (["ArrowUp", "w", "W", " "].includes(e.key)) {
      if (!keys.jump) jumpPressedEdge = true;
      keys.jump = true;
      e.preventDefault();
    }
  });
  window.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
    if (["ArrowUp", "w", "W", " "].includes(e.key)) keys.jump = false;
  });

  function bindTouchButton(id, onDown, onUp) {
    const el = document.getElementById(id);
    if (!el) return;
    const down = (e) => { e.preventDefault(); onDown(); };
    const up = (e) => { e.preventDefault(); onUp(); };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointerleave", up);
    el.addEventListener("pointercancel", up);
  }

  bindTouchButton("btn-left", () => (keys.left = true), () => (keys.left = false));
  bindTouchButton("btn-right", () => (keys.right = true), () => (keys.right = false));
  bindTouchButton(
    "btn-jump",
    () => {
      if (!keys.jump) jumpPressedEdge = true;
      keys.jump = true;
    },
    () => (keys.jump = false)
  );

  // ---- Overlay UI ---------------------------------------------------------
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayText = document.getElementById("overlay-text");
  const overlayButton = document.getElementById("overlay-button");

  const overlayControls = document.querySelector(".overlay-controls");

  function showOverlay(title, text, buttonLabel, showControls) {
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    overlayButton.textContent = buttonLabel;
    overlayControls.hidden = !showControls;
    overlay.hidden = false;
  }
  function hideOverlay() {
    overlay.hidden = true;
  }

  overlayButton.addEventListener("click", () => {
    if (state === "start") {
      state = "playing";
      hideOverlay();
    } else if (state === "levelComplete") {
      if (levelIndex + 1 < LEVELS.length) {
        loadLevel(levelIndex + 1);
        state = "playing";
        hideOverlay();
      }
    } else if (state === "gameOver" || state === "win") {
      restartGame();
      state = "playing";
      hideOverlay();
    }
  });

  showOverlay(
    "Roxy's Churu Run",
    "Help Roxy collect churus and reach the yarn ball at the end of each level — watch out for computer cords along the way!",
    "Start Game",
    true
  );

  // ---- Collision helpers ------------------------------------------------
  function rectsOverlap(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }

  function loseLife() {
    lives -= 1;
    if (lives <= 0) {
      state = "gameOver";
      showOverlay("Game Over", `Roxy needs a nap. Final score: ${score}.`, "Try Again");
    } else {
      resetPlayerToLevelStart();
      current.churus.forEach((c) => (c.collected = false));
      score = Math.max(0, score - churusCollectedScore());
    }
  }

  function churusCollectedScore() {
    return current.churus.filter((c) => c.collected).length * 10;
  }

  // ---- Update loop ------------------------------------------------------
  function update() {
    if (state !== "playing") return;

    // Horizontal movement
    player.vx = 0;
    if (keys.left) {
      player.vx = -MOVE_SPEED;
      player.facing = -1;
    }
    if (keys.right) {
      player.vx = MOVE_SPEED;
      player.facing = 1;
    }
    player.x += player.vx;
    player.x = Math.max(0, Math.min(player.x, current.width - PLAYER_W));

    // Jump
    if (jumpPressedEdge && player.onGround) {
      player.vy = JUMP_VELOCITY;
      player.onGround = false;
    }
    jumpPressedEdge = false;

    // Gravity
    const prevBottom = player.y + PLAYER_H;
    player.vy += GRAVITY;
    player.y += player.vy;

    // Landing collision (only when falling onto a surface's top edge)
    player.onGround = false;
    if (player.vy >= 0) {
      const newBottom = player.y + PLAYER_H;
      current.surfaces.forEach((s) => {
        const withinX = player.x + PLAYER_W > s.x && player.x < s.x + s.width;
        if (withinX && prevBottom <= s.y + 1 && newBottom >= s.y) {
          player.y = s.y - PLAYER_H;
          player.vy = 0;
          player.onGround = true;
        }
      });
    }

    // Fell into a pit
    if (player.y > CANVAS_H + 40) {
      loseLife();
      return;
    }

    // Cord collisions (hazards)
    const playerBox = { x: player.x + 8, y: player.y + 8, width: PLAYER_W - 16, height: PLAYER_H - 12 };
    for (const cord of current.cords) {
      if (rectsOverlap(playerBox, cord)) {
        loseLife();
        return;
      }
    }

    // Churu collection
    current.churus.forEach((c) => {
      if (c.collected) return;
      const dx = player.x + PLAYER_W / 2 - c.x;
      const dy = player.y + PLAYER_H / 2 - c.y;
      if (Math.sqrt(dx * dx + dy * dy) < CHURU_RADIUS + PLAYER_W / 2 - 6) {
        c.collected = true;
        score += 10;
      }
    });

    // Goal reached
    const goalBox = { x: current.goal.x - 18, y: current.goal.y - 60, width: 36, height: 60 };
    if (rectsOverlap({ x: player.x, y: player.y, width: PLAYER_W, height: PLAYER_H }, goalBox)) {
      if (levelIndex + 1 < LEVELS.length) {
        state = "levelComplete";
        showOverlay(
          `Level ${levelIndex + 1} Complete!`,
          `Score: ${score} · Churus collected: ${current.churus.filter((c) => c.collected).length}/${churuTotalThisLevel}`,
          "Next Level"
        );
      } else {
        state = "win";
        showOverlay(
          "You Did It!",
          `Roxy made it through all 3 levels! Final score: ${score}.`,
          "Play Again"
        );
      }
    }

    // Camera follows player, clamped to level bounds
    camera = Math.max(0, Math.min(player.x - CANVAS_W / 2 + PLAYER_W / 2, current.width - CANVAS_W));
  }

  // ---- Drawing ------------------------------------------------------------
  function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, "#cfe8f5");
    grad.addColorStop(1, "#f5f0fa");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // soft parallax circles ("clouds")
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    for (let i = 0; i < 6; i++) {
      const cx = (i * 320 - camera * 0.3) % (CANVAS_W + 400) - 200;
      ctx.beginPath();
      ctx.ellipse(cx, 70 + (i % 3) * 30, 60, 24, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawSurfaces() {
    current.surfaces.forEach((s) => {
      const x = s.x - camera;
      if (x + s.width < 0 || x > CANVAS_W) return;
      if (s.isGround) {
        ctx.fillStyle = "#caa06b";
        ctx.fillRect(x, s.y, s.width, Math.min(s.height, CANVAS_H - s.y));
        ctx.fillStyle = "#a97e4c";
        ctx.fillRect(x, s.y, s.width, 8);
      } else {
        ctx.fillStyle = "#8f6b4a";
        ctx.fillRect(x, s.y, s.width, s.height);
        ctx.fillStyle = "#d9c39f";
        ctx.fillRect(x, s.y, s.width, 4);
      }
    });
  }

  function drawCord(cord) {
    const x = cord.x - camera;
    if (x + cord.width < 0 || x > CANVAS_W) return;
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    const midY = cord.y + cord.height / 2;
    ctx.moveTo(x, cord.y + cord.height);
    ctx.quadraticCurveTo(x + cord.width * 0.25, cord.y - 4, x + cord.width * 0.5, midY);
    ctx.quadraticCurveTo(x + cord.width * 0.75, cord.y + cord.height + 4, x + cord.width, cord.y);
    ctx.stroke();
    // little plug ends
    ctx.fillStyle = "#333333";
    ctx.fillRect(x - 3, cord.y + cord.height - 6, 8, 8);
    ctx.fillRect(x + cord.width - 5, cord.y - 2, 8, 8);
  }

  function drawChuru(c) {
    if (c.collected) return;
    const x = c.x - camera;
    if (x < -30 || x > CANVAS_W + 30) return;
    const bob = Math.sin((Date.now() / 260 + c.x) % (Math.PI * 2)) * 4;
    const y = c.y + bob;
    // pouch
    ctx.fillStyle = "#d8d8d8";
    ctx.beginPath();
    ctx.roundRect(x - 9, y - 16, 18, 22, 6);
    ctx.fill();
    ctx.fillStyle = "#f2a341";
    ctx.beginPath();
    ctx.roundRect(x - 9, y - 2, 18, 8, 3);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - 3, y - 22, 6, 8);
  }

  function drawGoal() {
    const x = current.goal.x - camera;
    if (x < -60 || x > CANVAS_W + 60) return;
    const y = current.goal.y;
    // pole
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 90);
    ctx.stroke();
    // yarn ball
    ctx.fillStyle = "#c0508a";
    ctx.beginPath();
    ctx.arc(x, y - 100, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8f3868";
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(x, y - 100, 20, (i / 5) * Math.PI * 2, (i / 5) * Math.PI * 2 + 2.4);
      ctx.stroke();
    }
  }

  function drawPlayer() {
    drawRoxy(player.x - camera, player.y, PLAYER_W, PLAYER_H, player.facing);
  }

  function drawPaw(cx, cy, size) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(cx, cy + size * 0.15, size * 0.5, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    const toePositions = [-0.5, -0.17, 0.17, 0.5];
    toePositions.forEach((t) => {
      ctx.beginPath();
      ctx.ellipse(cx + t * size, cy - size * 0.45, size * 0.16, size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawHUD() {
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, CANVAS_W, 40);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Inter, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(`Level ${levelIndex + 1}/${LEVELS.length}`, 16, 20);
    ctx.fillText(`Score: ${score}`, 190, 20);
    const collected = current.churus.filter((c) => c.collected).length;
    ctx.fillText(`Churus: ${collected}/${churuTotalThisLevel}`, 340, 20);
    ctx.fillText("Lives:", 560, 20);
    for (let i = 0; i < Math.max(0, lives); i++) {
      drawPaw(628 + i * 26, 20, 9);
    }
  }

  function draw() {
    drawBackground();
    drawSurfaces();
    current.cords.forEach(drawCord);
    current.churus.forEach(drawChuru);
    drawGoal();
    drawPlayer();
    drawHUD();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // Test hook only — lets automated checks inspect/drive game state
  // without affecting normal play. No UI surfaces this.
  window.__roxyDebug = {
    getState: () => ({
      state,
      levelIndex,
      score,
      lives,
      playerX: player.x,
      playerY: player.y,
      onGround: player.onGround,
      churusCollected: current.churus.filter((c) => c.collected).length,
      churuTotal: churuTotalThisLevel
    }),
    teleportNearGoal: () => {
      player.x = current.goal.x - PLAYER_W - 4;
      player.y = GROUND_Y - PLAYER_H;
      player.vy = 0;
    },
    teleportOntoCord: (i) => {
      const cord = current.cords[i];
      player.x = cord.x;
      player.y = GROUND_Y - PLAYER_H;
      player.vy = 0;
    },
    teleportOntoChuru: (i) => {
      const churu = current.churus[i];
      player.x = churu.x - PLAYER_W / 2;
      player.y = churu.y - PLAYER_H / 2;
      player.vy = 0;
    }
  };
})();
