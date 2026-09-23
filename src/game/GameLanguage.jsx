import { useEffect, useState } from "react";

const STORAGE_KEY = "jadel-world-language";
const subscribers = new Set();

const DESKTOP_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 1100px)";

let language = "en";

try {
  language =
    localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
} catch {
  // تبديل اللغة يعمل حتى لو منع المتصفح التخزين.
}

// يحافظ على ترتيب الإنجليزية داخل النص العربي.
const ltr = (text) => `\u2066${text}\u2069`;

const translations = {
  "ESC = Back": `للرجوع اضغط ${ltr("ESC")}`,
  "Arrow Keys = Move": "للحركة استخدم الأسهم",
  "E = Enter Houses": `لدخول المنازل اضغط ${ltr("E")}`,
  "W = Water Flowers": `لسقي الزهور اضغط ${ltr("W")}`,
  "A = Change Language": `لتغيير اللغة اضغط ${ltr("A")}`,

  "GAME HOUSE": "منزل الألعاب",
  "CODE HOUSE": "منزل البرمجة",
  "ABOUT ME HOUSE": "منزلي الشخصي",
  "ABOUT HOUSE": "منزلي الشخصي",

  "Jadel Bader": "جادل بدر",
  "Software Engineer | Game Developer":
    "مهندسة برمجيات | مطوّرة ألعاب",

  EDUCATION: "التعليم",
  University: "الجامعة",
  SKILLS: "المهارات",
  "Technical Skills": "المهارات التقنية",
  CERTIFICATES: "الشهادات",
  "Courses & Hours": "الدورات والساعات",
  CONTACT: "التواصل",
  Links: "روابط التواصل",
  Email: "البريد الإلكتروني",
  "MY CV": "سيرتي الذاتية",

  "Bachelor of Software Engineering":
    "بكالوريوس هندسة البرمجيات",
  "University of Al-Jouf": "جامعة الجوف",
  "GPA: 4.49 / 5": `المعدل: ${ltr("4.49 / 5")}`,

  FRONTEND: "تطوير الواجهات",
  BACKEND: "تطوير الخوادم",
  "GAME DEV": "تطوير الألعاب",
  TOOLS: "الأدوات",
  Tools: "الأدوات",

  "CERTIFICATE 1": "الشهادة الأولى",
  "CERTIFICATE 2": "الشهادة الثانية",
  "CERTIFICATE 3": "الشهادة الثالثة",

  // تعليمات الحركة والدخول
  "Press W to water flower":
    `لسقي الزهرة اضغط ${ltr("W")}`,

  "Press E to enter Game House":
    `للدخول إلى منزل الألعاب اضغط ${ltr("E")}`,

  "Press E to enter Code House":
    `للدخول إلى منزل البرمجة اضغط ${ltr("E")}`,

  "Press E to enter About House":
    `للدخول إلى منزلي الشخصي اضغط ${ltr("E")}`,

  // أقسام المنزل الشخصي
  "Press E to view Education":
    `لعرض التعليم اضغط ${ltr("E")}`,

  "Press E to view Skills":
    `لعرض المهارات اضغط ${ltr("E")}`,

  "Press E to view Certificates":
    `لعرض الشهادات اضغط ${ltr("E")}`,
  "JavaScript Essentials 1": "أساسيات جافاسكربت 1",
  "Building APIs with Django": "بناء واجهات التطبيقات باستخدام جانغو",
  "Game Development Bootcamp": "معسكر تطوير الألعاب",
  "Open PDF": "فتح الملف",
  "Press E to view Contact":
    `لعرض وسائل التواصل اضغط ${ltr("E")}`,

  // التواصل
  "Press E to open GitHub":
    `لفتح ${ltr("GitHub")} اضغط ${ltr("E")}`,

  "Press E to open LinkedIn":
    `لفتح ${ltr("LinkedIn")} اضغط ${ltr("E")}`,

  "Press E to send Email":
    `لإرسال بريد إلكتروني اضغط ${ltr("E")}`,

  // المشاريع
  "Press E to view Luminous":
    `لعرض لعبة المنزل المضيء اضغط ${ltr("E")}`,

  "Press E to view Etfaqna":
    `لعرض اتفقنا اضغط ${ltr("E")}`,

  "Press E to open Nebras":
    `لفتح نبراس اضغط ${ltr("E")}`,

  "Press E to open Book Review":
    `لعرض مراجعات الكتب اضغط ${ltr("E")}`,

  "Press E to open Django Project":
    `لعرض مشروع ${ltr("Django")} اضغط ${ltr("E")}`,

  // اتفقنا
  ETFAQNA: "اتفقنا",
  Etfaqna: "اتفقنا",

  "Browser Game Project": "مشروع لعبة متصفح",
  "Browser-Based Team Game": "لعبة جماعية عبر المتصفح",
  "Browser-Based Team Game Prototype":
    "نموذج لعبة جماعية عبر المتصفح",

  "Current Version": "الإصدار الحالي",
  "Current features:": "المميزات الحالية:",
  "• Two-team gameplay": "• اللعب بفريقين",
  "• Online rooms": "• غرف لعب عبر الإنترنت",
  "• Team category selection": "• اختيار الفئات لكل فريق",
  "• Question categories": "• فئات متنوعة للأسئلة",
  "• Rounds and scoring": "• جولات ونظام نقاط",
  "• Timed challenges": "• تحديات بوقت محدد",
  "• Mobile-friendly experience": "• تجربة مناسبة للجوال",
  "• Improved game flow": "• تحسين سير اللعب",

  "Next Improvements": "التطويرات القادمة",
  "Planned updates:": "التحديثات المخطط لها:",
  "• Single-player mode": "• نمط اللعب الفردي",
  "• Mobile application": "• تطبيق للجوال",

  // التقنيات وأزرار المشاريع
  "Tech Stack": "التقنيات المستخدمة",

  "Tech Stack: HTML • CSS • JavaScript":
    `التقنيات: ${ltr("HTML • CSS • JavaScript")}`,

  "Press V or click to watch demo":
    `لمشاهدة العرض انقر هنا أو اضغط ${ltr("V")}`,

  "Press V to watch demo":
    `لمشاهدة العرض اضغط ${ltr("V")}`,

  "Press V to watch video":
    `لمشاهدة الفيديو اضغط ${ltr("V")}`,

  "Press P to open deck":
    `لفتح العرض التقديمي اضغط ${ltr("P")}`,

  "Press E to open demo":
    `لفتح التجربة اضغط ${ltr("E")}`,

  "Press G to open GitHub":
    `لفتح ${ltr("GitHub")} اضغط ${ltr("G")}`,

  // نبراس
  NEBRAS: "نبراس",

  "AI Sports Talent Discovery Platform":
    "منصة لاكتشاف المواهب الرياضية بالذكاء الاصطناعي",

  Description: "وصف المشروع",
  Features: "المميزات",
  "Project Links": "روابط المشروع",

  // مراجعات الكتب
  "BOOK REVIEW": "مراجعات الكتب",
  "BOOK REVIEW APP": "تطبيق مراجعات الكتب",
  "Web Application Project": "مشروع تطبيق ويب",

  "Press G\nOpen GitHub":
    `لفتح ${ltr("GitHub")}\nاضغط ${ltr("G")}`,

  "Press V\nWatch Demo Video":
    `لمشاهدة فيديو المشروع\nاضغط ${ltr("V")}`,

  // Django
  DJANGO: "جانغو",

  "DJANGO REST API":
    `واجهة برمجية باستخدام ${ltr("Django")}`,

  "Backend Development Project":
    "مشروع تطوير الواجهة الخلفية",

  "Create Books • Read Books • Update Books":
    "إضافة الكتب • عرض الكتب • تعديل الكتب",

  "Delete Books • JWT Authentication":
    `حذف الكتب • المصادقة باستخدام ${ltr("JWT")}`,

  // المنزل المضيء
  "AFTER THE LUMINOUS HOUSE": "ما بعد المنزل المضيء",
  "After The\nLuminous House": "ما بعد\nالمنزل المضيء",

  "First-Person Horror Experience":
    "تجربة رعب من منظور الشخص الأول",

  "Game Overview": "نبذة عن اللعبة",
  "Level Design": "تصميم المراحل",
  Lighting: "الإضاءة",

  // أوصاف المشاريع
  "A first-person horror project built\nin Unreal Engine 5.6.\n\nThe experience focuses on:\n• Atmosphere\n• Lighting\n• Exploration\n• A mysterious luminous house":
    [
      "مشروع رعب من منظور الشخص الأول",
      `باستخدام ${ltr("Unreal Engine 5.6")}.`,
      "",
      "تركّز التجربة على:",
      "• الأجواء المحيطة",
      "• الإضاءة",
      "• الاستكشاف",
      "• منزل مضيء وغامض",
    ].join("\n"),

  "Nebras is an AI-powered platform for\nsports talent discovery through video\nanalysis, digital profiles, and smart\nevaluation tools.":
    [
      "نبراس منصة بالذكاء الاصطناعي",
      "لاكتشاف المواهب الرياضية عبر تحليل",
      "الفيديو والملفات الرقمية وأدوات",
      "التقييم الذكية.",
    ].join("\n"),

  "A web application that allows users\nto register, log in, browse books,\nadd ratings, write reviews, and\nmanage their own reviews.":
    [
      "تطبيق ويب يتيح إنشاء حساب وتسجيل",
      "الدخول وتصفّح الكتب وإضافة التقييمات",
      "وكتابة المراجعات وإدارة المراجعات",
      "الخاصة بالمستخدم.",
    ].join("\n"),

  "Book Management API built with Django REST Framework.\nSupports CRUD operations and JWT authentication.":
    [
      `واجهة لإدارة الكتب مبنية باستخدام ${ltr("Django REST Framework")}.`,
      `تدعم الإضافة والعرض والتعديل والحذف والمصادقة باستخدام ${ltr("JWT")}.`,
    ].join("\n"),
};

function translate(value) {
  if (language !== "ar") return value;

  if (Object.hasOwn(translations, value)) {
    return translations[value];
  }

  return value
    .split("\n")
    .map((line) => translations[line] ?? line)
    .join("\n");
}

function subscribe(callback) {
  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };
}

function toggleLanguage() {
  language = language === "en" ? "ar" : "en";

  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // التخزين اختياري.
  }

  subscribers.forEach((callback) => callback());
}

// إضافة سطر اللغة داخل اللعبة بنفس تنسيق التعليمات الموجودة.
function addLanguageInstruction(scene) {
 if (scene.sys.settings.key !== "MainScene") return;
  const instructions = scene.children.list.find(
    (object) =>
      object.type === "Text" &&
      object.text === "W = Water Flowers"
  );

  const backInstruction = scene.children.list.find(
    (object) =>
      object.type === "Text" &&
      object.text === "ESC = Back"
  );

  const anchor = instructions ?? backInstruction;

  if (!anchor) return;

  const hint = scene.add.text(
    anchor.x,
    anchor.y + 30,
    "A = Change Language",
    {
      fontFamily: anchor.style.fontFamily,
      fontSize: anchor.style.fontSize,
      fontStyle: anchor.style.fontStyle,
      color: anchor.style.color,
    }
  );

  hint.setDepth(anchor.depth);

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);

  function updateVisibility() {
    hint.setVisible(desktopQuery.matches);
  }

  updateVisibility();

  desktopQuery.addEventListener("change", updateVisibility);

  scene.events.once("shutdown", () => {
    desktopQuery.removeEventListener(
      "change",
      updateVisibility
    );
  });
}

/*
 * ترجمة نصوص المشهد دون تغيير الكاميرا
 * أو مكان الشخصية أو الأصوات.
 */
export function localizeScene(scene) {
  addLanguageInstruction(scene);

  const records = [];
  const visited = new Set();

  function visit(object) {
    if (!object || visited.has(object)) return;

    visited.add(object);

    if (object.type === "Text") {
      const originalSetText = object.setText;

      const record = {
        object,
        originalSetText,
        source: object.text,
        fontFamily: object.style.fontFamily,
        fontSize: object.style.fontSize,
        align: object.style.align,
        rtl: object.style.rtl,
        width: object.width,
        height: object.height,
        lastSource: null,
        lastLanguage: null,
      };

      function render() {
        if (!object.scene) return;

        if (
          record.lastSource === record.source &&
          record.lastLanguage === language
        ) {
          return;
        }

        record.lastSource = record.source;
        record.lastLanguage = language;

        const output = translate(record.source);

        const isArabic =
          language === "ar" &&
          /[\u0600-\u06FF]/.test(output);

        object.setRTL(isArabic ? true : record.rtl);

        object.setFontFamily(
          isArabic
            ? "Tahoma, Arial, sans-serif"
            : record.fontFamily
        );

        object.setFontSize(record.fontSize);

        object.setAlign(
          isArabic
            ? record.align === "center"
              ? "center"
              : "right"
            : record.align
        );

        originalSetText.call(object, output);

        // الحفاظ على مساحة النص الأصلية قدر الإمكان.
        if (
          isArabic &&
          record.width > 0 &&
          record.height > 0
        ) {
          for (let attempt = 0; attempt < 3; attempt += 1) {
            const ratio = Math.min(
              1,
              record.width / Math.max(1, object.width),
              (record.height * 1.15) /
                Math.max(1, object.height)
            );

            if (ratio >= 0.99) break;

            object.setFontSize(
              parseFloat(object.style.fontSize) *
                ratio *
                0.98
            );
          }
        }
      }

      // يشمل رسائل الاقتراب التي تتغير أثناء الحركة.
      object.setText = function (value) {
        record.source = Array.isArray(value)
          ? value.join("\n")
          : String(value ?? "");

        render();

        return this;
      };

      record.render = render;
      records.push(record);

      render();
    }

    if (Array.isArray(object.list)) {
      object.list.forEach(visit);
    }
  }

  scene.children.list.forEach(visit);

  const unsubscribe = subscribe(() => {
    records.forEach((record) => record.render());
  });

  scene.events.once("shutdown", () => {
    unsubscribe();

    records.forEach(({ object, originalSetText }) => {
      if (object.scene) {
        object.setText = originalSetText;
      }
    });
  });
}

// زر اللمس فقط، مع اختصار A لجميع المشاهد.
export default function LanguageButton() {
  const [currentLanguage, setCurrentLanguage] =
    useState(language);

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setCurrentLanguage(language);
    });

    function handleKeyDown(event) {
      const target = event.target;

      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        target?.isContentEditable ||
        target?.closest?.("input, textarea, select")
      ) {
        return;
      }

      if (event.code === "KeyA") {
        event.preventDefault();
        toggleLanguage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unsubscribe();

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const isArabic = currentLanguage === "ar";

  return (
    <>
      <style>{`
        .game-language-touch {
          position: absolute;
          top: max(12px, env(safe-area-inset-top));
          right: calc(max(12px, env(safe-area-inset-right)) + 72px);
          z-index: 40;
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin: 0;
          padding: 0;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.65);
          color: #ffffff;
          font: bold 21px Tahoma, Arial, sans-serif;
          cursor: pointer;
          touch-action: manipulation;
          pointer-events: auto;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .game-language-touch:focus-visible {
          outline: 3px solid #facc15;
          outline-offset: 4px;
        }

        @media ${DESKTOP_QUERY} {
          .game-language-touch {
            display: none;
          }
        }
      `}</style>

      <button
        type="button"
        className="game-language-touch"
        onClick={toggleLanguage}
        aria-label={
          isArabic
            ? "Switch to English"
            : "التبديل إلى العربية"
        }
      >
        {isArabic ? "EN" : "ع"}
      </button>
    </>
  );
}