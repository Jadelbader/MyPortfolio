import Phaser from "phaser";

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super("AboutScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#f5e6c8");

    this.add.rectangle(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 0xd6a86c);
    this.add.rectangle(gameWidth / 2, 190, gameWidth, 380, 0xf5e6c8);
    this.add.rectangle(gameWidth / 2, 380, gameWidth, 10, 0x3b7a57);

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#4b2e1f",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 75, "ABOUT HOUSE", {
      fontSize: "36px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.circle(gameWidth / 2, 175, 48, 0x3b7a57);
    this.add.circle(gameWidth / 2, 155, 23, 0x4b2e1f);
    this.add.rectangle(gameWidth / 2, 212, 76, 48, 0x6b4f3a);

    this.add.text(gameWidth / 2, 270, "Jadel Bader", {
      fontSize: "30px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(gameWidth / 2, 315, "Software Engineer | Game Developer", {
      fontSize: "20px",
      color: "#3b7a57",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const cardY = gameHeight / 2 + 220;

    this.educationCard = this.createInfoCard(
      gameWidth / 2 - 480,
      cardY,
      "EDUCATION",
      "University"
    );

    this.skillsCard = this.createInfoCard(
      gameWidth / 2 - 160,
      cardY,
      "SKILLS",
      "Technical Skills"
    );

    this.certificatesCard = this.createInfoCard(
      gameWidth / 2 + 160,
      cardY,
      "CERTIFICATES",
      "Courses & Hours"
    );

    this.contactCard = this.createInfoCard(
      gameWidth / 2 + 480,
      cardY,
      "CONTACT",
      "Links"
    );

    this.player = this.createGirlPlayer(gameWidth / 2, gameHeight - 120);
    this.player.setDepth(100);

    this.interactText = this.add.text(gameWidth / 2, 430, "", {
      fontSize: "20px",
      color: "#3b7a57",
      fontStyle: "bold",
    });

    this.interactText.setOrigin(0.5);
    this.interactText.setDepth(1000);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createInfoCard(x, y, title, subtitle) {
    this.add.rectangle(x, y, 270, 150, 0x3b7a57);
    this.add.rectangle(x, y, 235, 115, 0x6b4f3a);

    this.add.text(x, y - 25, title, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(x, y + 25, subtitle, {
      fontSize: "15px",
      color: "#d9f99d",
      fontStyle: "bold",
    }).setOrigin(0.5);

    return this.add.rectangle(x, y, 270, 150, 0x000000, 0);
  }

  createGirlPlayer(x, y) {
    const girl = this.add.container(x, y);

    const hair = this.add.circle(0, -20, 18, 0x4b2e1f);
    const face = this.add.circle(0, -16, 12, 0xf8d5b8);
    const eye1 = this.add.circle(-4, -18, 1.5, 0x000000);
    const eye2 = this.add.circle(4, -18, 1.5, 0x000000);
    const dress = this.add.rectangle(0, 12, 24, 32, 0xff69b4);
    const arm1 = this.add.rectangle(-16, 10, 12, 4, 0xf8d5b8);
    const arm2 = this.add.rectangle(16, 10, 12, 4, 0xf8d5b8);
    const leg1 = this.add.rectangle(-6, 34, 5, 14, 0x111827);
    const leg2 = this.add.rectangle(6, 34, 5, 14, 0x111827);

    girl.add([hair, face, eye1, eye2, dress, arm1, arm2, leg1, leg2]);
    girl.setDepth(100);

    return girl;
  }

  update() {
    const speed = 4;

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    const nearEducation =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.educationCard.x, this.educationCard.y) < 180;

    const nearSkills =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.skillsCard.x, this.skillsCard.y) < 180;

    const nearCertificates =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.certificatesCard.x, this.certificatesCard.y) < 180;

    const nearContact =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.contactCard.x, this.contactCard.y) < 180;

    if (nearEducation) {
      this.interactText.setText("Press E to view Education");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("EducationScene");
      }
    } else if (nearSkills) {
      this.interactText.setText("Press E to view Skills");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("SkillsScene");
      }
    } else if (nearCertificates) {
      this.interactText.setText("Press E to view Certificates");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("CertificatesScene");
      }
    } else if (nearContact) {
      this.interactText.setText("Press E to view Contact");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("ContactScene");
      }
    } else {
      this.interactText.setText("");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("MainScene");
    }
  }
}