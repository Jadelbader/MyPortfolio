import Phaser from "phaser";

const SOUND_PATHS = {
  ambience: "/sounds/ambience.mp3",
  water: "/sounds/water.mp3",
  door: "/sounds/door.mp3",
  click: "/sounds/click.mp3",
  footsteps: "/sounds/footsteps.mp3",
  gameMusic: "/sounds/game-music.mp3",
  codeMusic: "/sounds/code-music.mp3",
  aboutMusic: "/sounds/about-music.mp3",
};

let currentMusic = null;
let currentMusicKey = null;
let ambienceSound = null;
let footstepsSound = null;

export function preloadSounds(scene) {
  Object.entries(SOUND_PATHS).forEach(([key, path]) => {
    if (!scene.cache.audio.exists(key)) {
      scene.load.audio(key, path);
    }
  });
}

function unlockAudio(scene, callback) {
  if (!scene.sound.locked) {
    callback();
    return;
  }

  scene.sound.once(Phaser.Sound.Events.UNLOCKED, callback);
}

export function playEffect(scene, key, volume = 0.5) {
  if (!scene.cache.audio.exists(key)) return;

  unlockAudio(scene, () => {
    scene.sound.play(key, { volume });
  });
}

export function startAmbience(scene) {
  if (!scene.cache.audio.exists("ambience")) return;

  stopCurrentMusic();

  const beginAmbience = () => {
    if (ambienceSound?.isPlaying) return;

    ambienceSound = scene.sound.add("ambience", {
      loop: true,
      volume: 0,
    });

    ambienceSound.play();

    scene.tweens.add({
      targets: ambienceSound,
      volume: 0.8,
      duration: 500,
    });
  };

  if (scene.sound.locked) {
    scene.sound.once(Phaser.Sound.Events.UNLOCKED, beginAmbience);
    scene.input.once("pointerdown", beginAmbience);
    scene.input.keyboard?.once("keydown", beginAmbience);
  } else {
    beginAmbience();
  }

}

export function stopAmbience(scene) {
  if (!ambienceSound) return;

  const soundToStop = ambienceSound;
  ambienceSound = null;
  scene.tweens.add({
    targets: soundToStop,
    volume: 0,
    duration: 300,
    onComplete: () => {
      soundToStop.stop();
      soundToStop.destroy();
    },
  });
}

export function playHouseMusic(scene, musicKey) {
  if (!scene.cache.audio.exists(musicKey)) return;

  stopAmbience(scene);

  if (currentMusicKey === musicKey && currentMusic?.isPlaying) {
    return;
  }

  stopCurrentMusic();

  unlockAudio(scene, () => {
    currentMusicKey = musicKey;

    currentMusic = scene.sound.add(musicKey, {
      loop: true,
      volume: 0,
    });

    currentMusic.play();

    scene.tweens.add({
      targets: currentMusic,
      volume: 0.15,
      duration: 500,
    });
  });
}

export function stopCurrentMusic() {
  if (!currentMusic) return;

  currentMusic.stop();
  currentMusic.destroy();

  currentMusic = null;
  currentMusicKey = null;
}

export function startFootsteps(scene) {
  if (!scene.cache.audio.exists("footsteps")) return;
  if (footstepsSound?.isPlaying) return;

  unlockAudio(scene, () => {
    if (footstepsSound?.isPlaying) return;

    footstepsSound = scene.sound.add("footsteps", {
      loop: true,
      volume: 0.25,
    });

    footstepsSound.play();
  });
}

export function stopFootsteps() {
  if (!footstepsSound) return;

  footstepsSound.stop();
  footstepsSound.destroy();
  footstepsSound = null;
}

export function transitionToScene(
  scene,
  targetScene,
  effectKey = "click",
  duration = 250
) {
  playEffect(scene, effectKey, 0.5);
  stopFootsteps();

  scene.cameras.main.fadeOut(duration, 0, 0, 0);

  scene.cameras.main.once(
    Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
    () => {
      scene.scene.start(targetScene);
    }
  );
}

export function enterHouse(scene, targetScene) {
  playEffect(scene, "door", 0.55);

  stopAmbience(scene);
  stopFootsteps();

  scene.cameras.main.fadeOut(300, 0, 0, 0);

  scene.cameras.main.once(
    Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
    () => {
      scene.scene.start(targetScene);
    }
  );
}

export function openExternalLink(scene, url) {
  playEffect(scene, "click", 0.45);

  window.open(url, "_blank", "noopener,noreferrer");
}