import Phaser from "phaser";

export default class ContactScene extends Phaser.Scene {
  constructor() {
    super("ContactScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#d6a86c");

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#4b2e1f",
      fontStyle: "bold",
    });

    this.add.text(gameWidth / 2, 70, "CONTACT", {
      fontSize: "34px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.githubCard = this.createContactCard(
      gameWidth / 2 - 350,
      gameHeight / 2,
      "<>",
      "GitHub",
      "jadelbader123"
    );

    this.linkedinCard = this.createContactCard(
      gameWidth / 2,
      gameHeight / 2,
      "in",
      "LinkedIn",
      "Jadel Bader"
    );

    this.emailCard = this.createContactCard(
      gameWidth / 2 + 350,
      gameHeight / 2,
      "@",
      "Email",
      "jadelbader123@gmail.com"
    );

    this.player = this.createGirlPlayer(gameWidth / 2, gameHeight - 120);

    this.interactText = this.add.text(gameWidth / 2, gameHeight - 70, "", {
      fontSize: "20px",
      color: "#4b2e1f",
      fontStyle: "bold",
    });
    this.interactText.setOrigin(0.5);

    this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createContactCard(x, y, icon, title, value) {
    this.add.rectangle(x, y, 300, 220, 0x3b7a57);
    this.add.rectangle(x, y, 260, 180, 0xf5e6c8);

    this.add.text(x, y - 45, icon, {
      fontSize: "42px",
      color: "#3b7a57",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(x, y + 5, title, {
      fontSize: "24px",
      color: "#4b2e1f",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.add.text(x, y + 45, value, {
      fontSize: "16px",
      color: "#6b4f3a",
    }).setOrigin(0.5);

    return this.add.rectangle(x, y, 300, 220, 0x000000, 0);
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

    const nearGithub =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.githubCard.x, this.githubCard.y) < 180;

    const nearLinkedin =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.linkedinCard.x, this.linkedinCard.y) < 180;

    const nearEmail =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.emailCard.x, this.emailCard.y) < 180;

    if (nearGithub) {
      this.interactText.setText("Press E to open GitHub");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        window.open("https://github.com/Jadelbader", "_blank");
      }
    } else if (nearLinkedin) {
      this.interactText.setText("Press E to open LinkedIn");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        window.open("https://www.linkedin.com/in/jadel-bader-aldghami-", "_blank");
      }
    } else if (nearEmail) {
      this.interactText.setText("Press E to send Email");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        window.open("mailto:jadelbader123@gmail.com", "_blank");
      }
    } else {
      this.interactText.setText("");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("AboutScene");
    }
  }
}