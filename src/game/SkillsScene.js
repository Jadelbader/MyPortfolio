import Phaser from "phaser";

export default class SkillsScene extends Phaser.Scene {
  constructor() {
    super("SkillsScene");
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

    this.add.text(gameWidth / 2, 70, "SKILLS", {
      fontSize: "34px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.createSkillCard(
      gameWidth / 2 - 250,
      240,
      "FRONTEND",
      ["HTML", "CSS", "JavaScript", "React"]
    );

    this.createSkillCard(
      gameWidth / 2 + 250,
      240,
      "BACKEND",
      ["Django", "Node.js", "PHP", "MySQL"]
    );

    this.createSkillCard(
      gameWidth / 2 - 250,
      520,
      "GAME DEV",
      ["Unreal Engine", "Phaser", "", ""]
    );

    this.createSkillCard(
      gameWidth / 2 + 250,
      520,
      "TOOLS",
      ["Git", "GitHub", "Postman", "Figma"]
    );

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  createSkillCard(x, y, title, items) {
    this.add.rectangle(x, y, 340, 220, 0x3b7a57);

    this.add.rectangle(x, y, 300, 180, 0x6b4f3a);

    this.add.text(x, y - 65, title, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      x,
      y + 5,
      items.join("\n"),
      {
        fontSize: "17px",
        color: "#d9f99d",
        align: "center",
        lineSpacing: 8,
      }
    ).setOrigin(0.5);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("AboutScene");
    }
  }
}