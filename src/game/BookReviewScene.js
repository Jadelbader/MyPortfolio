import Phaser from "phaser";

export default class BookReviewScene extends Phaser.Scene {
  constructor() {
    super("BookReviewScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const cardY = gameHeight / 2 + 60;

    this.cameras.main.setBackgroundColor("#f3e8ff");
    this.add.rectangle(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 0xe9d5ff);

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#581c87",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 50, "BOOK REVIEW APP", {
      fontSize: "36px",
      color: "#581c87",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2, 95, "Web Application Project", {
      fontSize: "20px",
      color: "#7e22ce",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2, cardY, 900, 480, 0x581c87);
    this.add.rectangle(gameWidth / 2, cardY, 840, 420, 0xfaf5ff);

    this.add.text(gameWidth / 2 - 240, cardY - 145, "Project Links", {
      fontSize: "24px",
      color: "#581c87",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2 - 240, cardY - 55, 300, 80, 0x7e22ce);
    this.add.text(gameWidth / 2 - 240, cardY - 55, "Press G\nOpen GitHub", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    this.add.rectangle(gameWidth / 2 - 240, cardY + 65, 300, 80, 0xa855f7);
    this.add.text(gameWidth / 2 - 240, cardY + 65, "Press V\nWatch Demo Video", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2 + 130, cardY - 165, "Description", {
      fontSize: "24px",
      color: "#581c87",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 - 10,
      cardY - 125,
      "A web application that allows users\nto register, log in, browse books,\nadd ratings, write reviews, and\nmanage their own reviews.",
      {
        fontSize: "17px",
        color: "#6b21a8",
        lineSpacing: 8,
        align: "left",
      }
    );

    this.add.text(gameWidth / 2 + 130, cardY + 25, "Tech Stack", {
      fontSize: "24px",
      color: "#581c87",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 + 130,
      cardY + 85,
      "PHP • MySQL\nHTML • CSS • JavaScript",
      {
        fontSize: "17px",
        color: "#6b21a8",
        align: "center",
        lineSpacing: 8,
      }
    ).setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.gKey)) {
      window.open("https://github.com/Jadelbader/BOOK-REVIEW-PROJECT", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.vKey)) {
      window.open("https://drive.google.com/file/d/1PMOCLlp3HaeoU4C5hnMpKSi9CvmmbRf7/view?usp=sharing", "_blank");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("CodeWorldScene");
    }
  }
}