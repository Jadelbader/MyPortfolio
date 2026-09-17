import Phaser from "phaser";

export default class DjangoScene extends Phaser.Scene {
  constructor() {
    super("DjangoScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const cardY = gameHeight / 2 + 60;

    this.cameras.main.setBackgroundColor("#dcfce7");

    this.add.rectangle(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 0xbbf7d0);

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

    this.add.rectangle(gameWidth / 2, cardY, 900, 480, 0x166534);
    this.add.rectangle(gameWidth / 2, cardY, 840, 420, 0xf0fdf4);

    this.add.text(gameWidth / 2, cardY - 155, "Description", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY - 95,
      "Book Management API built with Django REST Framework.\nSupports CRUD operations and JWT authentication.",
      {
        fontSize: "18px",
        color: "#166534",
        align: "center",
        lineSpacing: 8,
      }
    ).setOrigin(0.5);

    this.add.text(gameWidth / 2, cardY + 5, "Features", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY + 70,
      "Create Books • Read Books • Update Books • Delete Books • JWT Authentication",
      {
        fontSize: "17px",
        color: "#166534",
        align: "center",
      }
    ).setOrigin(0.5);

    this.add.text(gameWidth / 2, cardY + 130, "Tech Stack", {
      fontSize: "24px",
      color: "#14532d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2,
      cardY + 175,
      "Python • Django • Django REST Framework • SQLite • Postman",
      {
        fontSize: "17px",
        color: "#166534",
        align: "center",
      }
    ).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2, cardY + 235, 300, 55, 0x22c55e);

    this.add.text(gameWidth / 2, cardY + 235, "Press G to open GitHub", {
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.gKey)) {
      window.open("https://github.com/Jadelbader/BookReviewAPI", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("CodeWorldScene");
    }
  }}