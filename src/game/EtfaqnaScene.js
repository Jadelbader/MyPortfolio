import Phaser from "phaser";

export default class EtfaqnaScene extends Phaser.Scene {
  constructor() {
    super("EtfaqnaScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    const cardX = gameWidth / 2;
    const cardY = gameHeight / 2 + 65;

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

    this.add.text(gameWidth / 2, 115, "Browser-Based Team Game", {
      fontSize: "20px",
      color: "#f9a8d4",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Main card
    this.add.rectangle(cardX, cardY, 920, 470, 0xbe185d);
    this.add.rectangle(cardX, cardY, 860, 410, 0x4c1d95);

    // Current version box
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
      cardY - 105,
      [
        "Current features:",
        "",
        "• Two-team gameplay",
        "• Online rooms",
        "• Team category selection",
        "• Question categories",
        "• Rounds and scoring",
        "• Timed challenges",
        "• Mobile-friendly experience",
        "• Improved game flow",
      ],
      {
        fontSize: "13px",
        color: "#ffffff",
        lineSpacing: 2,
      }
    );

    // Future improvements box
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
      cardY - 90,
      [
        "Planned updates:",
        "",
        "• Single-player mode",
        "• Mobile application",
      ],
      {
        fontSize: "16px",
        color: "#ffffff",
        lineSpacing: 4,
      }
    );

    // Tech stack
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
    const demoButton = this.add.rectangle(
      cardX,
      cardY + 180,
      300,
      55,
      0x1e1b4b
    );

    demoButton.setInteractive({
      useHandCursor: true,
    });

    const demoText = this.add.text(
      cardX,
      cardY + 180,
      "Press V or click to watch demo",
      {
        fontSize: "16px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    ).setOrigin(0.5);

    demoText.setInteractive({
      useHandCursor: true,
    });

    const openDemo = () => {
      window.open(
        "https://drive.google.com/file/d/1hH26Syp47SkocjUXKdiXqD4dmztgAbXS/view?usp=sharing",
        "_blank",
        "noopener,noreferrer"
      );
    };

    demoButton.on("pointerdown", openDemo);
    demoText.on("pointerdown", openDemo);

    demoButton.on("pointerover", () => {
      demoButton.setFillStyle(0x312e81);
    });

    demoButton.on("pointerout", () => {
      demoButton.setFillStyle(0x1e1b4b);
    });

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
        "https://drive.google.com/file/d/1hH26Syp47SkocjUXKdiXqD4dmztgAbXS/view?usp=sharing",
        "_blank",
        "noopener,noreferrer"
      );
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("GameWorldScene");
    }
  }
}