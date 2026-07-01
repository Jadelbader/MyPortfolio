import Phaser from "phaser";

export default class LuminousScene extends Phaser.Scene {
  constructor() {
    super("LuminousScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#111827");
    this.add.rectangle(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 0x111827);

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 70, "AFTER THE LUMINOUS HOUSE", {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2, 115, "First-Person Horror Experience", {
      fontSize: "20px",
      color: "#15b1fa",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const cardX = gameWidth / 2;
    const cardY = gameHeight / 2 + 60;

    this.add.rectangle(cardX, cardY, 900, 460, 0x7f1d1d);
    this.add.rectangle(cardX, cardY, 840, 400, 0x1f2937);

    this.add.rectangle(cardX - 220, cardY - 40, 390, 270, 0x111827);

    this.add.text(cardX - 220, cardY - 150, "Game Overview", {
      fontSize: "24px",
      color: "#15b1fa",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      cardX - 385,
      cardY - 105,
      "A first-person horror project built\nin Unreal Engine 5.6.\n\nThe experience focuses on:\n• Atmosphere\n• Lighting\n• Exploration\n• A mysterious luminous house",
      {
        fontSize: "15px",
        color: "#e5e7eb",
        lineSpacing: 6,
      }
    );

    this.add.rectangle(cardX + 220, cardY - 45, 320, 230, 0x111827);

    this.add.text(cardX + 220, cardY - 130, "Tools", {
      fontSize: "24px",
      color: "#15b1fa",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      cardX + 220,
      cardY - 35,
      "Unreal Engine 5.6\nSequencer\nLevel Design\nLighting",
      {
        fontSize: "17px",
        color: "#e5e7eb",
        align: "center",
        lineSpacing: 12,
      }
    ).setOrigin(0.5);

    this.add.rectangle(cardX - 170, cardY + 170, 270, 55, 0xdc2626);
    this.add.text(cardX - 170, cardY + 170, "Press V to watch video", {
      fontSize: "17px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.rectangle(cardX + 170, cardY + 170, 270, 55, 0x2563eb);
    this.add.text(cardX + 170, cardY + 170, "Press P to open deck", {
      fontSize: "17px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.vKey)) {
      window.open("https://drive.google.com/file/d/1_AS94XI8LMD-WPhRGMvemQ66Bt5dlOJQ/view?usp=sharing", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
      window.open("https://docs.google.com/presentation/d/1581BmhJ0SYrdpMfHi6JXfo7RPYuNTcYi/edit?usp=sharing&ouid=106046245347361748523&rtpof=true&sd=true", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("GameWorldScene");
    }
  }
}