import Phaser from "phaser";

export default class CertificatesScene extends Phaser.Scene {
  constructor() {
    super("CertificatesScene");
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

    this.add.text(gameWidth / 2, 70, "CERTIFICATES", {
      fontSize: "34px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.createEmptyCertificateCard(
      gameWidth / 2 - 420,
      gameHeight / 2,
      "CERTIFICATE 1"
    );

    this.createEmptyCertificateCard(
      gameWidth / 2,
      gameHeight / 2,
      "CERTIFICATE 2"
    );

    this.createEmptyCertificateCard(
      gameWidth / 2 + 420,
      gameHeight / 2,
      "CERTIFICATE 3"
    );

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  createEmptyCertificateCard(x, y, label) {
    this.add.rectangle(x, y, 360, 260, 0x3b7a57);
    this.add.rectangle(x, y, 315, 215, 0xf5e6c8);

    this.add.text(x, y, label, {
      fontSize: "20px",
      color: "#6b4f3a",
      fontStyle: "bold",
    }).setOrigin(0.5);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("AboutScene");
    }
  }
}