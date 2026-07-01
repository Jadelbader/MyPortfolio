import Phaser from "phaser";

export default class EducationScene extends Phaser.Scene {
  constructor() {
    super("EducationScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#f5e6c8");

    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0xd6a86c
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#4b2e1f",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 70, "EDUCATION", {
      fontSize: "34px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const cardX = gameWidth / 2;
    const cardY = gameHeight / 2;

    this.add.rectangle(cardX, cardY, 720, 380, 0x3b7a57);
    this.add.rectangle(cardX, cardY, 660, 320, 0xf5e6c8);

    this.createStar(cardX + 270, cardY - 125);

    this.add.text(cardX, cardY - 65, "Bachelor of Software Engineering", {
      fontSize: "27px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(cardX, cardY + 10, "University of Al-Jouf", {
      fontSize: "24px",
      color: "#3b7a57",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(cardX, cardY + 90, "GPA: 4.49 / 5", {
      fontSize: "24px",
      color: "#6b4f3a",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  createStar(x, y) {
    const points = [];

    for (let i = 0; i < 10; i++) {
      const angle = Phaser.Math.DegToRad(i * 36 - 90);
      const radius = i % 2 === 0 ? 42 : 18;

      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      );
    }

    this.add.polygon(x, y, points, 0xfacc15);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("AboutScene");
    }
  }
}