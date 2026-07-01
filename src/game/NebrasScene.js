import Phaser from "phaser";
import nebrasPreview from "../assets/nebras-preview.png";
export default class NebrasScene extends Phaser.Scene {
  constructor() {
    super("NebrasScene");
  }

  preload() {
    this.load.image("nebrasPreview", nebrasPreview);
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    const cardY = gameHeight / 2 + 60;

    this.cameras.main.setBackgroundColor("#e0f2fe");

    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0xbae6fd
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#0c4a6e",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 50, "NEBRAS", {
      fontSize: "38px",
      color: "#0c4a6e",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2, 95, "AI Sports Talent Discovery Platform", {
      fontSize: "20px",
      color: "#075985",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2, cardY, 900, 480, 0x0c4a6e);
    this.add.rectangle(gameWidth / 2, cardY, 840, 420, 0xf0f9ff);

    this.add.rectangle(gameWidth / 2 - 240, cardY - 20, 340, 260, 0x0284c7);

    this.add.image(gameWidth / 2 - 240, cardY - 20, "nebrasPreview")
      .setDisplaySize(305, 220);

    this.add.text(gameWidth / 2 + 130, cardY - 165, "Description", {
      fontSize: "24px",
      color: "#0c4a6e",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 - 10,
      cardY - 125,
      "Nebras is an AI-powered platform for\nsports talent discovery through video\nanalysis, digital profiles, and smart\nevaluation tools.",
      {
        fontSize: "17px",
        color: "#075985",
        lineSpacing: 8,
        align: "left",
      }
    );

    this.add.text(gameWidth / 2 + 130, cardY + 20, "Tech Stack", {
      fontSize: "24px",
      color: "#0c4a6e",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 + 130,
      cardY + 80,
      "React.js • Tailwind CSS\nNode.js • Express.js • MongoDB",
      {
        fontSize: "17px",
        color: "#075985",
        align: "center",
        lineSpacing: 8,
      }
    ).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2 + 130, cardY + 180, 260, 55, 0x0284c7);

    this.add.text(gameWidth / 2 + 130, cardY + 180, "Press E to open demo", {
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
      window.open("https://glittering-pastelito-6bf29b.netlify.app/", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("CodeWorldScene");
    }
  }
}