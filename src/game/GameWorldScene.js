import Phaser from "phaser";

export default class GameWorldScene extends Phaser.Scene {
  constructor() {
    super("GameWorldScene");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.cameras.main.setBackgroundColor("#2b1d14");

    
    this.add.rectangle(
      gameWidth / 2,
      gameHeight / 2,
      gameWidth,
      gameHeight,
      0x5b3a29
    );

   
    this.add.rectangle(
      gameWidth / 2,
      190,
      gameWidth,
      380,
      0x3b2418
    );

    
    for (let x = 0; x < gameWidth; x += 80) {
      this.add.rectangle(x, 190, 8, 380, 0x4a2d1f);
    }

    
    this.add.rectangle(
      gameWidth / 2,
      380,
      gameWidth,
      10,
      0x2a160f
    );

    this.add.text(30, 30, "ESC = Back", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(gameWidth / 2 - 120, 45, "GAME HOUSE", {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    
    this.luminousProject = this.add.rectangle(
      gameWidth / 2 - 260,
      210,
      270,
      140,
      0xbe185d
    );

    this.add.rectangle(
      gameWidth / 2 - 260,
      210,
      240,
      110,
      0x312e81
    );

    this.add.text(
      gameWidth / 2 - 260,
      180,
      "After The\nLuminous House",
      {
        fontSize: "18px",
        color: "#ffffff",
        fontStyle: "bold",
        align: "center",
      }
    ).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 - 260,
      245,
      "Unreal Engine 5.6",
      {
        fontSize: "13px",
        color: "#ddd6fe",
        align: "center",
      }
    ).setOrigin(0.5);

    
    this.etfaqnaProject = this.add.rectangle(
      gameWidth / 2 + 260,
      210,
      270,
      140,
      0xbe185d
    );

    this.add.rectangle(
      gameWidth / 2 + 260,
      210,
      240,
      110,
      0x581c87
    );

    this.add.text(
      gameWidth / 2 + 260,
      185,
      "Etfaqna",
      {
        fontSize: "24px",
        color: "#ffffff",
        fontStyle: "bold",
        align: "center",
      }
    ).setOrigin(0.5);

    this.add.text(
      gameWidth / 2 + 260,
      245,
      "Browser Game Project",
      {
        fontSize: "13px",
        color: "#f3e8ff",
        align: "center",
      }
    ).setOrigin(0.5);


this.add.rectangle(
  gameWidth / 2,
  gameHeight / 2 + 210,
  700,
  220,
  0x7f1d1d
);

this.add.rectangle(
  gameWidth / 2,
  gameHeight / 2 + 210,
  620,
  150,
  0x991b1b
);




this.add.rectangle(
  gameWidth / 2 - 230,
  gameHeight / 2 + 200,
  160,
  70,
  0x1e3a8a
);

this.add.rectangle(
  gameWidth / 2 - 230,
  gameHeight / 2 + 145,
  160,
  35,
  0x2563eb
);

this.add.rectangle(
  gameWidth / 2 - 300,
  gameHeight / 2 + 195,
  30,
  80,
  0x1e3a8a
);

this.add.rectangle(
  gameWidth / 2 - 160,
  gameHeight / 2 + 195,
  30,
  80,
  0x1e3a8a
);




this.add.rectangle(
  gameWidth / 2 + 230,
  gameHeight / 2 + 200,
  160,
  70,
  0x1e3a8a
);

this.add.rectangle(
  gameWidth / 2 + 230,
  gameHeight / 2 + 145,
  160,
  35,
  0x2563eb
);

this.add.rectangle(
  gameWidth / 2 + 160,
  gameHeight / 2 + 195,
  30,
  80,
  0x1e3a8a
);

this.add.rectangle(
  gameWidth / 2 + 300,
  gameHeight / 2 + 195,
  30,
  80,
  0x1e3a8a
);




this.add.rectangle(
  gameWidth / 2,
  gameHeight / 2 + 205,
  120,
  70,
  0x6b4423
);

this.add.rectangle(
  gameWidth / 2,
  gameHeight / 2 + 205,
  95,
  45,
  0x8b5a2b
);


this.add.rectangle(
  gameWidth / 2 - 360,
  gameHeight / 2 + 230,
  35,
  45,
  0xd97706
);

this.add.circle(
  gameWidth / 2 - 360,
  gameHeight / 2 + 185,
  22,
  0x16a34a
);

this.add.circle(
  gameWidth / 2 - 345,
  gameHeight / 2 + 200,
  18,
  0x22c55e
);

this.add.circle(
  gameWidth / 2 - 375,
  gameHeight / 2 + 200,
  18,
  0x22c55e
);




this.add.rectangle(
  gameWidth / 2 + 360,
  gameHeight / 2 + 230,
  35,
  45,
  0xd97706
);

this.add.circle(
  gameWidth / 2 + 360,
  gameHeight / 2 + 185,
  22,
  0x16a34a
);

this.add.circle(
  gameWidth / 2 + 345,
  gameHeight / 2 + 200,
  18,
  0x22c55e
);

this.add.circle(
  gameWidth / 2 + 375,
  gameHeight / 2 + 200,
  18,
  0x22c55e
);
    this.player = this.createGirlPlayer(
  gameWidth / 2,
  gameHeight - 120
);
    this.player.setDepth(100);

    this.interactText = this.add.text(
      gameWidth / 2 - 160,
      gameHeight - 70,
      "",
      {
        fontSize: "20px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );

    this.backKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.eKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );

    this.cursors = this.input.keyboard.createCursorKeys();
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

  girl.add([
    hair,
    face,
    eye1,
    eye2,
    dress,
    arm1,
    arm2,
    leg1,
    leg2
  ]);

  girl.setDepth(100);

  return girl;
}
  update() {
    const speed = 4;

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    const nearLuminousProject =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.luminousProject.x,
        this.luminousProject.y
      ) < 240;

    const nearEtfaqnaProject =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.etfaqnaProject.x,
        this.etfaqnaProject.y
      ) < 240;

    if (nearLuminousProject) {
      this.interactText.setText("Press E to view Luminous");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("LuminousScene");
      }
    } else if (nearEtfaqnaProject) {
      this.interactText.setText("Press E to view Etfaqna");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("EtfaqnaScene");
      }
    } else {
      this.interactText.setText("");
    }

    if (Phaser.Input.Keyboard.JustDown(this.backKey)) {
      this.scene.start("MainScene");
    }
  }
}