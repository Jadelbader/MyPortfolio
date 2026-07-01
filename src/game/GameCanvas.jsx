import { useEffect } from "react";
import Phaser from "phaser";

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
import CertificatesScene from "./CertificatesScene.js";

function GameCanvas() {
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: "game-container",
      backgroundColor: "#0f172a",
      scene: [
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
      ],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container"></div>;
}

export default GameCanvas;