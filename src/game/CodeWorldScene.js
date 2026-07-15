import Phaser from "phaser";
import {
  preloadSounds,
  playHouseMusic,
  startFootsteps,
  stopFootsteps,
} from "./SoundManager";
import { openProject, goBack } from "./SceneHelpers";

export default class CodeWorldScene extends Phaser.Scene {
  constructor() {
    super("CodeWorldScene");
  }

  preload() {
    preloadSounds(this);
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#2e1065");

    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0x3b0764
    );

    this.add.rectangle(
      gameWidth / 2,
      190,
      gameWidth,
      380,
      0x581c87
    );

    for (let x = 70; x < gameWidth; x += 130) {
      for (let y = 90; y < 340; y += 90) {
        this.add.circle(x, y, 7, 0xfacc15);
      }
    }

    this.add.rectangle(
      gameWidth / 2,
      380,
      gameWidth,
      10,
      0x1e1b4b
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(gameWidth / 2 - 125, 50, "CODE HOUSE", {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.nebrasProject = this.createProjectCorner(
      gameWidth / 2 - 430,
      435,
      "NEBRAS",
      0x2563eb,
      0xfacc15
    );

    this.bookProject = this.createProjectCorner(
      gameWidth / 2,
      435,
      "BOOK REVIEW",
      0x7e22ce,
      0xffffff
    );

    this.djangoProject = this.createProjectCorner(
      gameWidth / 2 + 430,
      435,
      "DJANGO",
      0x15803d,
      0xfacc15
    );

    this.player = this.createGirlPlayer(
      gameWidth / 2,
      gameHeight - 120
    );

    this.player.setDepth(100);

    this.interactText = this.add.text(
      gameWidth / 2 - 180,
      gameHeight - 70,
      "",
      {
        fontSize: "20px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.eKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasMoving = false;

    playHouseMusic(this, "codeMusic");
  }

  createProjectCorner(x, y, label, sofaColor, vaseColor) {
    this.add.text(x, 340, label, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.rectangle(x, y, 165, 70, sofaColor);
    this.add.rectangle(x, y - 42, 165, 28, 0x312e81);
    this.add.rectangle(x - 72, y, 24, 80, sofaColor);
    this.add.rectangle(x + 72, y, 24, 80, sofaColor);

    this.add.rectangle(x, y + 92, 105, 52, 0x92400e);
    this.add.rectangle(x, y + 92, 82, 32, 0xb45309);

    this.add.rectangle(x, y + 52, 28, 42, vaseColor);
    this.add.circle(x, y + 22, 17, 0x22c55e);
    this.add.circle(x - 13, y + 32, 13, 0x16a34a);
    this.add.circle(x + 13, y + 32, 13, 0x16a34a);

    return this.add.rectangle(x, y + 55, 130, 150, 0x000000, 0);
  }

  createGirlPlayer(x, y) {
    const girl = this.add.container(x, y);

    const hair = this.add.circle(0, -20, 18, 0x4b2e1f);
    const face = this.add.circle(0, -16, 12, 0xf8d5b8);
    const eye1 = this.add.circle(-4, -18, 1.5, 0x000000);
    const eye2 = this.add.circle(4, -18, 1.5, 0x000000);
    const dress = this.add.rectangle(0, 12, 24, 32, 0xff69b4);
    const arm1 = this.add.rectangle(-16, 10, 12, 4, 0xf8d5b8);
    const arm2 = this.add.rectangle(16, 10, 12, 4, 0xf8d5b8);
    const leg1 = this.add.rectangle(-6, 34, 5, 14, 0x111827);
    const leg2 = this.add.rectangle(6, 34, 5, 14, 0x111827);

    girl.add([
      hair,
      face,
      eye1,
      eye2,
      dress,
      arm1,
      arm2,
      leg1,
      leg2,
    ]);

    girl.setDepth(100);

    return girl;
  }

  update() {
    const speed = 4;

    const isMoving =
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown;

    if (isMoving && !this.wasMoving) {
      startFootsteps(this);
    }

    if (!isMoving && this.wasMoving) {
      stopFootsteps();
    }

    this.wasMoving = isMoving;

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    const nearNebras =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.nebrasProject.x,
        this.nebrasProject.y
      ) < 180;

    const nearBook =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.bookProject.x,
        this.bookProject.y
      ) < 180;

    const nearDjango =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.djangoProject.x,
        this.djangoProject.y
      ) < 180;

    if (nearNebras) {
      this.interactText.setText("Press E to open Nebras");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        openProject(this, "NebrasScene");
      }
    } else if (nearBook) {
      this.interactText.setText("Press E to open Book Review");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        openProject(this, "BookReviewScene");
      }
    } else if (nearDjango) {
      this.interactText.setText("Press E to open Django Project");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        openProject(this, "DjangoScene");
      }
    } else {
      this.interactText.setText("");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      goBack(this);
    }
  }
}