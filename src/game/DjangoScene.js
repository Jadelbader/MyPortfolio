import Phaser from "phaser";

export default class DjangoScene extends Phaser.Scene {
  constructor() {
    super("DjangoScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const cardY = gameHeight / 2 + 80;

    this.cameras.main.setBackgroundColor("#dcfce7");

    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0xbbf7d0
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#14532d",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 50, "DJANGO REST API", {
      fontSize: "36px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2, 95, "Backend Development Project", {
      fontSize: "20px",
      color: "#166534",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Main card
    this.add.rectangle(gameWidth / 2, cardY, 900, 450, 0x166534);
    this.add.rectangle(gameWidth / 2, cardY, 840, 390, 0xf0fdf4);

    this.add.text(gameWidth / 2, cardY - 145, "Description", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY - 92,
      "Book Management API built with Django REST Framework.\nSupports CRUD operations and JWT authentication.",
      {
        fontSize: "17px",
        color: "#166534",
        align: "center",
        lineSpacing: 2,
      }
    ).setOrigin(0.5);

    this.add.text(gameWidth / 2, cardY - 5, "Features", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY + 45,
      "Create Books • Read Books • Update Books\nDelete Books • JWT Authentication",
      {
        fontSize: "16px",
        color: "#166534",
        align: "center",
        lineSpacing: 2,
      }
    ).setOrigin(0.5);

    this.add.text(gameWidth / 2, cardY + 105, "Tech Stack", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY + 148,
      "Python • Django • Django REST Framework\nSQLite • Postman",
      {
        fontSize: "16px",
        color: "#166534",
        align: "center",
        lineSpacing: 2,
      }
    ).setOrigin(0.5);

    this.add.rectangle(
      gameWidth / 2,
      cardY + 205,
      300,
      50,
      0x22c55e
    );

    this.add.text(gameWidth / 2, cardY + 205, "Press G to open GitHub", {
      fontSize: "17px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.gKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.G
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.gKey)) {
      window.open(
        "https://github.com/Jadelbader/BookReviewAPI",
        "_blank"
      );
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("CodeWorldScene");
    }
  }}