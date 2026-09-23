import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "../App.css";
import LanguageButton, { localizeScene } from "./GameLanguage";
import MainScene from "./MainScene";
import GameWorldScene from "./GameWorldScene";
import LuminousScene from "./LuminousScene";
import CodeWorldScene from "./CodeWorldScene";
import EtfaqnaScene from "./EtfaqnaScene";
import NebrasScene from "./NebrasScene";
import BookReviewScene from "./BookReviewScene";
import DjangoScene from "./DjangoScene";
import AboutScene from "./AboutScene";
import EducationScene from "./EducationScene";
import SkillsScene from "./SkillsScene";
import ContactScene from "./ContactScene";
import CertificatesScene from "./CertificatesScene";

const WORLD_WIDTH = 1600;
const WORLD_HEIGHT = 900;

const SCENES = [
  MainScene,
  GameWorldScene,
  LuminousScene,
  CodeWorldScene,
  EtfaqnaScene,
  NebrasScene,
  BookReviewScene,
  DjangoScene,
  AboutScene,
  EducationScene,
  SkillsScene,
  ContactScene,
  CertificatesScene,
];

const ACTIONS = [
  ["eKey", "E", "تفاعل"],
  ["wKey", "W", "اسقِ الزهور"],
  ["gKey", "G", "افتح GitHub"],
  ["vKey", "V", "افتح الفيديو"],
  ["pKey", "P", "تفاعل P"],
];

export default function GameCanvas() {
  const hostRef = useRef(null);
  const controlsRef = useRef(null);

  const [view, setView] = useState({
    ready: false,
    moving: false,
    back: false,
    cv: false,
    actions: [],
  });

  useEffect(() => {
    const host = hostRef.current;

    let game;
    let activeScene = null;
    let alive = true;
    let unlockingSound = false;

    const heldDirections = new Map();

    function releaseAll() {
      for (const key of heldDirections.values()) {
        key.reset();
      }

      heldDirections.clear();
    }

    function unlockSound() {
      const sound = game?.sound;
      const context = sound?.context;

      if (!context || unlockingSound) return;

      if (context.state === "running" && !sound.locked) {
        return;
      }

      unlockingSound = true;

      // الاستدعاء يبدأ أثناء اللمسة الفعلية.
      context
        .resume()
        .then(() => {
          if (!alive || context.state !== "running") return;

          // يترك Phaser يرسل حدث UNLOCKED في تحديثه التالي.
          if (sound.locked) {
            sound.unlocked = true;
          }
        })
        .catch((error) => {
          console.warn("Audio could not start:", error);
        })
        .finally(() => {
          unlockingSound = false;
        });
    }

    function arrangeCamera(scene, reset = false) {
      if (!scene?.cameras?.main) return;

      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      const fit = Math.min(
        width / WORLD_WIDTH,
        height / WORLD_HEIGHT
      );

      const compact = width < 1100 || height < 600;

      let visualScale = fit;

      if (compact) {
        visualScale = scene.player
          ? Math.max(
              0.85,
              width / WORLD_WIDTH,
              height / WORLD_HEIGHT
            )
          : Math.max(fit, 1);
      }

      const camera = scene.cameras.main;

      camera.setZoom(
        visualScale / (width / WORLD_WIDTH),
        visualScale / (height / WORLD_HEIGHT)
      );

      camera.stopFollow();

      if (!compact) {
        camera.removeBounds();
        camera.centerOn(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
        return;
      }

      camera.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

      if (scene.player) {
        camera.startFollow(scene.player, true, 1, 1);
      } else if (reset) {
        camera.centerOn(
          WORLD_WIDTH / 2,
          camera.height / (2 * camera.zoomY)
        );
      }
    }

    function showControls(scene) {
  if (!alive) return;

  setView({
    isHome: scene.sys.settings.key === "MainScene",
    ready: true,
    moving: Boolean(scene.player),
    back: Boolean(scene.backKey),
    cv: scene.sys.settings.key === "AboutScene",
    actions: ACTIONS.filter(
      ([property]) => Boolean(scene[property])
    ),
  });
}

    const responsiveScenes = SCENES.map(
      (OriginalScene) =>
        class extends OriginalScene {
          create(...args) {
            super.create(...args);
            localizeScene(this);
            releaseAll();
            activeScene = this;

            this.interactText?.setVisible(false);

            arrangeCamera(this, true);
            showControls(this);

            let dragging = false;

            this.input.on(
              "pointerdown",
              (_pointer, objects) => {
                dragging =
                  !this.player && objects.length === 0;
              }
            );

            this.input.on("pointermove", (pointer) => {
              if (!dragging || !pointer.isDown) return;

              const camera = this.cameras.main;

              camera.scrollX -=
                (pointer.x - pointer.prevPosition.x) /
                camera.zoomX;

              camera.scrollY -=
                (pointer.y - pointer.prevPosition.y) /
                camera.zoomY;
            });

            const stopDragging = () => {
              dragging = false;
            };

            this.input.on("pointerup", stopDragging);
            this.input.on("pointerupoutside", stopDragging);
            this.input.on("gameout", stopDragging);

            this.input.on(
              "wheel",
              (_pointer, _objects, deltaX, deltaY) => {
                if (this.player) return;

                const camera = this.cameras.main;

                camera.scrollX += deltaX / camera.zoomX;
                camera.scrollY += deltaY / camera.zoomY;
              }
            );

            this.events.once("shutdown", () => {
              releaseAll();

              if (activeScene === this) {
                activeScene = null;
              }
            });
          }

          update(time, delta) {
            super.update?.(time, delta);
        const hint = this.interactText?.text || "";

if (alive && activeScene === this) {
  setView((current) => {
    if (current.hint === hint) return current;

    return {
      ...current,
      hint,
    };
  });
}
            if (!this.player) return;

            this.player.x = Phaser.Math.Clamp(
              this.player.x,
              45,
              WORLD_WIDTH - 45
            );

            this.player.y = Phaser.Math.Clamp(
              this.player.y,
              45,
              WORLD_HEIGHT - 50
            );
          }
        }
    );

    controlsRef.current = {
      unlockSound,

      press(direction, pointerId) {
        unlockSound();

        const key = activeScene?.cursors?.[direction];

        if (!key || heldDirections.has(pointerId)) return;

        heldDirections.set(pointerId, key);
        key.onDown(new KeyboardEvent("keydown"));
      },

      release(pointerId) {
        const key = heldDirections.get(pointerId);
        heldDirections.delete(pointerId);

        if (
          key &&
          ![...heldDirections.values()].includes(key)
        ) {
          key.onUp(new KeyboardEvent("keyup"));
        }
      },

      action(property) {
        unlockSound();

        const scene = activeScene;
        const key = scene?.[property];

        if (!scene?.sys.isActive() || !key) return;

        key.onDown(new KeyboardEvent("keydown"));

        try {
          // فتح الروابط أثناء نقرة المستخدم نفسها.
          scene.update(scene.time.now, 0);
        } finally {
          key.onUp(new KeyboardEvent("keyup"));
        }
      },
    };

    game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: host,
      width: WORLD_WIDTH,
      height: WORLD_HEIGHT,
      backgroundColor: "#0f172a",

      render: {
        antialias: true,
        pixelArt: false,
      },

      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
      },

      input: {
        activePointers: 3,
      },

      fps: {
        target: 60,
        limit: 60,
      },

      scene: responsiveScenes,
    });

    function resize() {
      if (!alive || !game.canvas) return;

      game.scale.refresh();
      arrangeCamera(activeScene);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    function visibilityChanged() {
      if (document.hidden) releaseAll();
    }

    window.addEventListener("blur", releaseAll);
    document.addEventListener(
      "visibilitychange",
      visibilityChanged
    );

    return () => {
      alive = false;
      observer.disconnect();
      releaseAll();

      window.removeEventListener("blur", releaseAll);
      document.removeEventListener(
        "visibilitychange",
        visibilityChanged
      );

      controlsRef.current = null;
      game.destroy(true);
    };
  }, []);

  function directionButton(direction, symbol, label) {
    return (
      <button
        type="button"
        className={`floating-button direction-${direction}`}
        aria-label={label}
        onPointerDown={(event) => {
          event.preventDefault();

          event.currentTarget.setPointerCapture(
            event.pointerId
          );

          controlsRef.current?.press(
            direction,
            event.pointerId
          );
        }}
        onPointerUp={(event) =>
          controlsRef.current?.release(event.pointerId)
        }
        onPointerCancel={(event) =>
          controlsRef.current?.release(event.pointerId)
        }
        onLostPointerCapture={(event) =>
          controlsRef.current?.release(event.pointerId)
        }
        onContextMenu={(event) => event.preventDefault()}
      >
        {symbol}
      </button>
    );
  }

  return (
    <main
      className="game-page"
      onPointerDownCapture={() =>
        controlsRef.current?.unlockSound()
      }
      onPointerUpCapture={() =>
        controlsRef.current?.unlockSound()
      }
    >
      <div id="game-container" ref={hostRef} />
      <div hidden={!view.isHome}>
  <LanguageButton />
      </div>
      {view.ready && (
        <div className="floating-controls">
          {view.hint && (
  <div
  className="interaction-hint"
  dir="auto"
  style={{
    unicodeBidi: "plaintext",
    fontFamily: "Tahoma, Arial, sans-serif",
  }}
>
  {view.hint}
</div>
)}
          {view.back && (
            <button
              type="button"
              className="floating-button back-button"
              aria-label="رجوع"
              onClick={() =>
                controlsRef.current?.action("backKey")
              }
            >
              ↩
            </button>
          )}

          {view.cv && (
            <a
              className="floating-button cv-button"
              href="/Jadel-Bader-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فتح السيرة الذاتية"
            >
              CV
            </a>
          )}

          {view.moving && (
            <div className="direction-pad">
              {directionButton("up", "↑", "أعلى")}
              {directionButton("left", "←", "يسار")}
              {directionButton("down", "↓", "أسفل")}
              {directionButton("right", "→", "يمين")}
            </div>
          )}

          <div className="action-buttons">
            {view.actions.map(
              ([property, letter, label]) => (
                <button
                  type="button"
                  key={property}
                  className="floating-button"
                  aria-label={label}
                  onClick={() =>
                    controlsRef.current?.action(property)
                  }
                >
                  {letter}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
}