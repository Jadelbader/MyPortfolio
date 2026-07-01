import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {}

  create() {
    
    this.cameras.main.setBackgroundColor("#2d5a27");

    const tileSize = 40;
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    for (let x = 0; x < gameWidth; x += tileSize) {
      for (let y = 0; y < gameHeight; y += tileSize) {
        const color =
          ((x / tileSize + y / tileSize) % 2 === 0)
            ? 0x3f8f3f
            : 0x347a34;

        this.add.rectangle(x, y, tileSize, tileSize, color).setOrigin(0);
      }
    }

    this.createFence(gameWidth, gameHeight);

    this.add.text(25, 25, "Arrow Keys = Move", {
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.add.text(25, 55, "E = Enter Houses", {
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.add.text(25, 85, "W = Water Flowers", {
      fontSize: "18px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.createHouse(gameWidth / 2, 145, 0x8b5a2b, 0xc0392b, "GAME HOUSE");
    this.gameGate = this.add.rectangle(gameWidth / 2, 160, 90, 70, 0x000000, 0);

this.add.ellipse(
  gameWidth / 2 - 330,
  120,
  180,
  90,
  0x38bdf8
);

this.add.ellipse(
  gameWidth / 2 - 330,
  120,
  130,
  55,
  0x7dd3fc
);

this.createDuck(
  gameWidth / 2 - 250,
  120
);

    this.createHouse(gameWidth - 300, gameHeight / 2, 0x1d4ed8, 0x0f172a, "CODE HOUSE");
    this.codeGate = this.add.rectangle(gameWidth - 300, gameHeight / 2 + 15, 90, 70, 0x000000, 0);

    this.createBench(gameWidth - 430, gameHeight / 2 + 70);
    this.createBench(gameWidth - 170, gameHeight / 2 + 70);

    this.createHouse(300, gameHeight / 2, 0xbe185d, 0xc026d3, "ABOUT ME HOUSE");
    this.aboutGate = this.add.rectangle(300, gameHeight / 2 + 15, 90, 70, 0x000000, 0);

    this.createCar(170, gameHeight / 2 + 95);

    const treePositions = [
      [90, 170],
      [220, 300],
      [130, 460],
      [250, 650],
      [420, 180],
      [360, 430],
      [520, 680],
      [gameWidth - 90, 170],
      [gameWidth - 220, 300],
      [gameWidth - 130, 460],
      [gameWidth - 250, 650],
      [gameWidth - 420, 180],
      [gameWidth - 360, 430],
      [gameWidth - 520, 680],
      [gameWidth / 2 - 420, 120],
      [gameWidth / 2 + 420, 120],
      [gameWidth / 2 - 500, gameHeight - 120],
      [gameWidth / 2 + 500, gameHeight - 120],
    ];

    treePositions.forEach(([x, y]) => {
      this.createAppleTree(x, y);
    });

    this.flowers = [];

    const flowerPositions = [
      [150, 260],
      [210, 520],
      [330, 210],
      [430, 600],
      [570, 260],
      [640, 480],
      [750, 190],
      [820, 610],
      [930, 310],
      [980, 520],
      [1080, 230],
      [1150, 670],
      [1250, 390],
      [1320, 560],
      [1420, 210],
      [1500, 620],
      [gameWidth - 160, 260],
      [gameWidth - 250, 520],
      [gameWidth - 380, 210],
      [gameWidth - 470, 600],
      [gameWidth - 590, 320],
      [gameWidth - 700, 500],
      [gameWidth / 2 - 300, 260],
      [gameWidth / 2 + 300, 260],
      [gameWidth / 2 - 220, 430],
      [gameWidth / 2 + 220, 430],
      [gameWidth / 2 - 80, 560],
      [gameWidth / 2 + 80, 560],
      [gameWidth / 2, 260],
      [gameWidth / 2, 640],
      [260, gameHeight - 120],
      [gameWidth - 260, gameHeight - 120],
      [520, gameHeight - 180],
      [gameWidth - 520, gameHeight - 180],
      [gameWidth / 2 - 600, 350],
      [gameWidth / 2 + 600, 350],
    ];

    flowerPositions.forEach(([x, y]) => {
      this.createFlower(x, y);
    });

    const sheepPositions = [
      [170, 600],
      [320, 700],
      [480, 280],
      [650, 420],
      [760, 220],
      [900, 520],
      [gameWidth / 2 + 70, 330],
      [gameWidth - 650, 420],
      [gameWidth - 520, 250],
      [gameWidth - 360, 600],
      [gameWidth - 190, 700],
      [gameWidth - 260, 360],
    ];

    sheepPositions.forEach(([x, y]) => {
      this.createSheep(x, y);
    });

    this.createGoldenSheep(gameWidth - 120, 120);

    const butterflyPositions = [
      [240, 220],
      [430, 520],
      [620, 310],
      [gameWidth / 2 - 300, 230],
      [gameWidth / 2 + 300, 230],
      [gameWidth / 2 - 120, 520],
      [gameWidth / 2 + 150, 600],
      [gameWidth - 420, 520],
      [gameWidth - 250, 230],
    ];

    butterflyPositions.forEach(([x, y]) => {
      this.createButterfly(x, y);
    });

    this.player = this.createBeePlayer(gameWidth / 2, gameHeight / 2);
    

    this.interactText = this.add.text(gameWidth / 2, gameHeight - 80, "", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
    });
    this.interactText.setOrigin(0.5);
    this.interactText.setDepth(1000);

    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createFence(gameWidth, gameHeight) {
    const fenceColor = 0x8b5a2b;
    const postColor = 0x6b4423;

    for (let x = 40; x < gameWidth - 40; x += 70) {
      this.add.rectangle(x, 25, 12, 50, postColor);
      this.add.rectangle(x, gameHeight - 25, 12, 50, postColor);
    }

    this.add.rectangle(gameWidth / 2, 25, gameWidth - 80, 10, fenceColor);
    this.add.rectangle(gameWidth / 2, gameHeight - 25, gameWidth - 80, 10, fenceColor);

    for (let y = 60; y < gameHeight - 60; y += 70) {
      this.add.rectangle(25, y, 50, 12, postColor);
      this.add.rectangle(gameWidth - 25, y, 50, 12, postColor);
    }

    this.add.rectangle(25, gameHeight / 2, 10, gameHeight - 100, fenceColor);
    this.add.rectangle(gameWidth - 25, gameHeight / 2, 10, gameHeight - 100, fenceColor);
  }

  createHouse(x, y, bodyColor, roofColor, label) {
    this.add.rectangle(x, y, 95, 65, bodyColor);
    this.add.triangle(x, y - 65, 0, 65, 120, 65, 60, 0, roofColor);

    this.add.rectangle(x, y + 18, 22, 35, 0x4b2e1f);
    this.add.rectangle(x - 28, y - 8, 15, 15, 0x87ceeb);
    this.add.rectangle(x + 28, y - 8, 15, 15, 0x87ceeb);

    this.add.text(x, y + 52, label, {
      fontSize: "11px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);
  }

  createAppleTree(x, y) {
    this.add.circle(x, y, 30, 0x0f4d0f);
    this.add.rectangle(x, y + 34, 12, 22, 0x6b4423);

    this.add.circle(x - 10, y - 8, 4, 0xff0000);
    this.add.circle(x + 11, y + 3, 4, 0xff0000);
    this.add.circle(x + 4, y - 17, 4, 0xff0000);
  }

  createFlower(x, y) {
    const stem = this.add.rectangle(x, y + 8, 4, 16, 0x166534);
    const bud = this.add.circle(x, y, 6, 0x7f1d1d);

    this.flowers.push({
      x,
      y,
      stem,
      bud,
      watered: false,
    });
  }

  createSheep(x, y) {
    this.add.circle(x, y, 14, 0xffffff);
    this.add.circle(x + 12, y - 4, 7, 0x222222);
    this.add.rectangle(x - 7, y + 14, 4, 9, 0x222222);
    this.add.rectangle(x + 7, y + 14, 4, 9, 0x222222);
  }

  createGoldenSheep(x, y) {
    this.add.circle(x, y, 14, 0xfacc15);
    this.add.circle(x + 12, y - 4, 7, 0x92400e);
    this.add.rectangle(x - 7, y + 14, 4, 9, 0x92400e);
    this.add.rectangle(x + 7, y + 14, 4, 9, 0x92400e);
  }

  createButterfly(x, y) {
    this.add.circle(x - 6, y, 7, 0xff69b4);
    this.add.circle(x + 6, y, 7, 0xc084fc);
    this.add.rectangle(x, y, 4, 12, 0x111827);
  }

  createCar(x, y) {
    this.add.rectangle(x, y, 90, 30, 0xf97316);
    this.add.rectangle(x, y - 18, 45, 20, 0xfb923c);

    this.add.rectangle(x - 10, y - 18, 15, 12, 0x87ceeb);
    this.add.rectangle(x + 10, y - 18, 15, 12, 0x87ceeb);

    this.add.circle(x - 25, y + 18, 10, 0x111827);
    this.add.circle(x + 25, y + 18, 10, 0x111827);

    this.add.circle(x + 42, y - 3, 3, 0xfef08a);
    this.add.circle(x - 42, y - 3, 3, 0xff0000);
  }

  createBench(x, y) {
    this.add.rectangle(x, y, 60, 12, 0x8b5a2b);
    this.add.rectangle(x, y - 15, 60, 10, 0xa16207);

    this.add.rectangle(x - 20, y + 12, 5, 15, 0x6b4423);
    this.add.rectangle(x + 20, y + 12, 5, 15, 0x6b4423);
  }

  createDuck(x, y) {
    this.add.circle(x, y, 10, 0xfacc15);
    this.add.circle(x + 12, y - 5, 7, 0xfacc15);

    this.add.triangle(
      x + 22,
      y - 5,
      0,
      0,
      10,
      3,
      0,
      6,
      0xf97316
    );

    this.add.circle(x + 14, y - 7, 1.5, 0x000000);
  }
createBeePlayer(x, y) {
  const bee = this.add.container(x, y);

  const wing1 = this.add.ellipse(-8, -12, 18, 12, 0xffffff, 0.7);
  const wing2 = this.add.ellipse(8, -12, 18, 12, 0xffffff, 0.7);

  const body = this.add.ellipse(0, 0, 34, 24, 0xfacc15);

  const stripe1 = this.add.rectangle(-6, 0, 5, 22, 0x111827);
  const stripe2 = this.add.rectangle(5, 0, 5, 22, 0x111827);

  const head = this.add.circle(18, -2, 10, 0x111827);

  bee.add([
    wing1,
    wing2,
    body,
    stripe1,
    stripe2,
    head,
  ]);

  bee.setDepth(100);

  return bee;
}
  update() {
    const speed = 4;

    if (this.cursors.left.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown) this.player.x += speed;
    if (this.cursors.up.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown) this.player.y += speed;

    const nearGameGate =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.gameGate.x, this.gameGate.y) < 120;

    const nearCodeGate =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.codeGate.x, this.codeGate.y) < 120;

    const nearAboutGate =
      Phaser.Math.Distance.Between(this.player.x, this.player.y, this.aboutGate.x, this.aboutGate.y) < 120;

    const nearFlower = this.flowers.find((flower) => {
      return (
        !flower.watered &&
        Phaser.Math.Distance.Between(this.player.x, this.player.y, flower.x, flower.y) < 55
      );
    });

    if (nearFlower) {
      this.interactText.setText("Press W to water flower");

      if (Phaser.Input.Keyboard.JustDown(this.wKey)) {
        nearFlower.watered = true;

        const colors = [
          0xff69b4,
          0xffd700,
          0xffffff,
          0xc084fc,
          0xfb7185,
          0x38bdf8,
        ];

        const color = Phaser.Math.RND.pick(colors);

        nearFlower.bud.setFillStyle(color);
        nearFlower.bud.setRadius(12);

        this.add.circle(nearFlower.x - 9, nearFlower.y, 6, color);
        this.add.circle(nearFlower.x + 9, nearFlower.y, 6, color);
        this.add.circle(nearFlower.x, nearFlower.y - 9, 6, color);
        this.add.circle(nearFlower.x, nearFlower.y + 9, 6, color);
      }
    } else if (nearGameGate) {
      this.interactText.setText("Press E to enter Game House");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("GameWorldScene");
      }
    } else if (nearCodeGate) {
      this.interactText.setText("Press E to enter Code House");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("CodeWorldScene");
      }
    } else if (nearAboutGate) {
      this.interactText.setText("Press E to enter About House");

      if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        this.scene.start("AboutScene");
      }
    } else {
      this.interactText.setText("");
    }
  }
}