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

    this.add
      .text(gameWidth / 2, 70, "CERTIFICATES", {
        fontSize: "34px",
        color: "#4b2e1f",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const certificates = [
      {
        label: "CERTIFICATE 1",
        title: "JavaScript Essentials 1",
        file: "javascript.pdf",
      },
      {
        label: "CERTIFICATE 2",
        title: "Building APIs with Django",
        file: "tuwaiq.pdf",
      },
      {
        label: "CERTIFICATE 3",
        title: "Game Development Bootcamp",
        file: "game-development.pdf",
      },
    ];

    certificates.forEach((certificate, index) => {
      this.createCertificateCard(
        gameWidth / 2 + (index - 1) * 420,
        gameHeight / 2,
        certificate
      );
    });

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  createCertificateCard(x, y, certificate) {
    const frame = this.add.rectangle(
      x,
      y,
      360,
      280,
      0x3b7a57
    );

    this.add.rectangle(
      x,
      y,
      320,
      240,
      0xf5e6c8
    );

    this.add
      .text(x, y - 85, certificate.label, {
        fontSize: "20px",
        color: "#6b4f3a",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(x, y - 10, certificate.title, {
        fontSize: "23px",
        color: "#4b2e1f",
        fontStyle: "bold",
        align: "center",
        wordWrap: {
          width: 275,
          useAdvancedWrap: true,
        },
      })
      .setOrigin(0.5);

    this.add.rectangle(
      x,
      y + 80,
      220,
      46,
      0x3b7a57
    );

    this.add
      .text(x, y + 80, "Open PDF", {
        fontSize: "19px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // البطاقة كاملة قابلة للنقر واللمس.
    const hitArea = this.add
      .rectangle(x, y, 360, 280, 0x000000, 0)
      .setInteractive({
        useHandCursor: true,
      });

    hitArea.on("pointerover", () => {
      frame.setFillStyle(0x285c40);
    });

    hitArea.on("pointerout", () => {
      frame.setFillStyle(0x3b7a57);
    });

    hitArea.on("pointerup", (pointer) => {
      // لا نفتح الملف إذا كانت الحركة سحبًا وليست نقرة.
      const distance = Math.hypot(
        pointer.x - pointer.downX,
        pointer.y - pointer.downY
      );

      if (distance > 12) return;

      const url = new URL(
        `${import.meta.env.BASE_URL}certificates/${certificate.file}`,
        window.location.origin
      );

      window.open(
        url.href,
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("AboutScene");
    }
  }
}