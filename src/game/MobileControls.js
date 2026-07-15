import Phaser from "phaser";

export function addMobileControls(scene, options = {}) {
  const isSmallScreen =
    window.matchMedia("(max-width: 1100px)").matches;

  const controls = {
    left: false,
    right: false,
    up: false,
    down: false,
    ePressed: false,
    wPressed: false,
    backPressed: false,
    gPressed: false,
    vPressed: false,
    pPressed: false,
    resetTaps() {
      this.ePressed = false;
      this.wPressed = false;
      this.backPressed = false;
      this.gPressed = false;
      this.vPressed = false;
      this.pPressed = false;
    },
  };

  if (!isSmallScreen) return controls;

  const {
    arrows = false,
    e = false,
    w = false,
    back = false,
    g = false,
    v = false,
    p = false,
  } = options;

  const camera = scene.cameras.main;

  const makeButton = (x, y, label, onDown, onUp) => {
    const button = scene.add.container(x, y);

    button
      .setDepth(999999)
      .setScrollFactor(0);

    const bg = scene.add.circle(
      0,
      0,
      34,
      0x111827,
      0.82
    );

    bg.setStrokeStyle(3, 0xffffff, 0.9);

    const text = scene.add.text(0, 0, label, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    button.add([bg, text]);

    button.setSize(76, 76);

    button.setInteractive({
      useHandCursor: true,
    });

    button.on("pointerdown", (pointer) => {
      pointer.event?.preventDefault();
      button.setScale(0.92);
      bg.setAlpha(1);
      onDown();
    });

    const release = (pointer) => {
      pointer?.event?.preventDefault();
      button.setScale(1);
      bg.setAlpha(0.82);
      onUp();
    };

    button.on("pointerup", release);
    button.on("pointerout", release);
    button.on("pointerupoutside", release);

    return button;
  };

  const tapButton = (x, y, label, keyName) => {
    makeButton(
      x,
      y,
      label,
      () => {
        controls[keyName] = true;
      },
      () => {}
    );
  };

  const positionControls = () => {
    const width = camera.width;
    const height = camera.height;

    return {
      leftX: 76,
      rightX: 166,
      centerX: 121,
      upY: height - 168,
      middleY: height - 88,
      downY: height - 8,
      actionY: height - 88,
      actionX: width - 76,
      backX: 58,
      backY: 58,
    };
  };

  const pos = positionControls();

  if (arrows) {
    makeButton(
      pos.leftX,
      pos.middleY,
      "←",
      () => {
        controls.left = true;
      },
      () => {
        controls.left = false;
      }
    );

    makeButton(
      pos.rightX,
      pos.middleY,
      "→",
      () => {
        controls.right = true;
      },
      () => {
        controls.right = false;
      }
    );

    makeButton(
      pos.centerX,
      pos.upY,
      "↑",
      () => {
        controls.up = true;
      },
      () => {
        controls.up = false;
      }
    );

    makeButton(
      pos.centerX,
      pos.downY,
      "↓",
      () => {
        controls.down = true;
      },
      () => {
        controls.down = false;
      }
    );
  }

  let actionX = pos.actionX;
  const gap = 88;

  if (e) {
    tapButton(actionX, pos.actionY, "E", "ePressed");
    actionX -= gap;
  }

  if (w) {
    tapButton(actionX, pos.actionY, "W", "wPressed");
    actionX -= gap;
  }

  if (g) {
    tapButton(actionX, pos.actionY, "G", "gPressed");
    actionX -= gap;
  }

  if (v) {
    tapButton(actionX, pos.actionY, "V", "vPressed");
    actionX -= gap;
  }

  if (p) {
    tapButton(actionX, pos.actionY, "P", "pPressed");
    actionX -= gap;
  }

  if (back) {
    tapButton(
      pos.backX,
      pos.backY,
      "↩",
      "backPressed"
    );
  }

  scene.events.once(
    Phaser.Scenes.Events.SHUTDOWN,
    () => {
      controls.left = false;
      controls.right = false;
      controls.up = false;
      controls.down = false;
      controls.resetTaps();
    }
  );

  return controls;
}