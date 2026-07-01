import Phaser from "phaser";

export default class EtfaqnaScene extends Phaser.Scene {
  constructor() {
    super("EtfaqnaScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    const cardX = gameWidth / 2;
    const cardY = gameHeight / 2 + 55;

    this.cameras.main.setBackgroundColor("#2e1065");

    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0x2e1065
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 65, "ETFAQNA", {
      fontSize: "38px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      110,
      "Browser-Based Team Game Prototype",
      {
        fontSize: "20px",
        color: "#f9a8d4",
        fontStyle: "bold",
      }
    ).setOrigin(0.5);

    // Card
    this.add.rectangle(cardX, cardY, 920, 470, 0xbe185d);
    this.add.rectangle(cardX, cardY, 860, 410, 0x4c1d95);

    // Left box
    this.add.rectangle(
      cardX - 230,
      cardY - 45,
      360,
      250,
      0x2e1065
    );

    this.add.text(cardX - 230, cardY - 145, "Current Version", {
      fontSize: "24px",
      color: "#f9a8d4",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      cardX - 380,
      cardY - 100,
      "Etfaqna is a browser-based\nteam game prototype.\n\nCurrent features:\n• Two-team gameplay\n• Rounds and scoring\n• Browser interaction\n• Timed challenges",
      {
        fontSize: "15px",
        color: "#ffffff",
        lineSpacing: 7,
      }
    );

    // Right box
    this.add.rectangle(
      cardX + 230,
      cardY - 45,
      360,
      250,
      0x2e1065
    );

    this.add.text(cardX + 230, cardY - 145, "Next Improvements", {
      fontSize: "24px",
      color: "#f9a8d4",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      cardX + 80,
      cardY - 100,
      "Planned updates:\n• Online rooms\n• Team category selection\n• Question categories\n• Better mobile experience\n• Improved game flow",
      {
        fontSize: "15px",
        color: "#ffffff",
        lineSpacing: 8,
      }
    );

    this.add.text(
      cardX,
      cardY + 115,
      "Tech Stack: HTML • CSS • JavaScript",
      {
        fontSize: "18px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    ).setOrigin(0.5);

    // Demo button
    this.add.rectangle(
      cardX,
      cardY + 180,
      300,
      55,
      0x1e1b4b
    );

    this.add.text(
      cardX,
      cardY + 180,
      "Press V to watch demo",
      {
        fontSize: "18px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    ).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.vKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.V
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.vKey)) {
      window.open(
        "https://drive.google.com/file/d/1ZtUWny2N3JmNhM0Pnqqmnmtw0SjijhJ4/view?usp=sharing",
        "_blank"
      );
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("GameWorldScene");
    }
  }
}