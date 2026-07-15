import {
  enterHouse,
  transitionToScene,
  openExternalLink,
} from "./SoundManager";

export function goToHouse(scene, targetScene) {
  enterHouse(scene, targetScene);
}

export function goBack(scene, targetScene = "MainScene") {
  transitionToScene(scene, targetScene, "click");
}

export function openProject(scene, targetScene) {
  transitionToScene(scene, targetScene, "click");
}

export function openWebsite(scene, url) {
  openExternalLink(scene, url);
}