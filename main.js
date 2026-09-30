// Le catalogue partagé se trouve dans `project-content.js`.
const projects = Object.values(window.portfolioProjectCatalog);
/*
const legacyProjects = [
  {
    slug: "demoreel",
    title: "Demoreel",
    subtitle: "Sélection de projets",
    type: "Demoreel",
    role: "Montage et motion design",
    client: {},
    vimeo: "https://player.vimeo.com/video/832654295?dnt=1",
    text: [
      "Devil’s Sweet Tooth | Live in concrete | Kee Avil — montage",
      "Beyrouth plusieurs fois — réalisation, montage, colorisation",
      "Zug Island — montage",
      "Exobouchées 2 : Terre 2.0 — animation",
      "Exobouchées 5 : Les téléscopes du futur — animation",
      "Seuls | zouz — montage et colorisation",
      "See, my shadow | Live in concrete | Kee Avil — montage",
      "Évincés : Les aînés contre-attaquent — montage, motion design",
      "Perspective contractée : Le Tombeau de Gilles Groulx — montage",
      "Zéro Stress | Naomi — montage",
      "Chroniques de la vie ordinaire : Canal St-Martin — montage",
      "Chroniques de la vie ordinaire : Buttes-Chaumont — montage",
      "Chroniques de la vie ordinaire : Strasbourg – St-Denis — montage",
      "Division Couleur : DémoReel 2022 — motion design, vfx",
      "Cité mémoire | MEH | L’église de la Malbaie — graphisme, motion design, montage",
      "Come a Bit Closer (teaser) — montage",
      "Prix du Gouverneur général pour les arts et spectacles 2018 (trailer) — montage",
      "Come a Bit Closer : Tangente 2021 — réalisation, caméra, montage",
      "Bienvenue au Biodôme de Montréal — montage et colorisation",
      "HHHH | Live in concrete | Kee Avil — montage"
    ],
    credits: [
      { label: "Montage et motion design", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage", "motion"],
    palette: {
      base: "#1d1e24",
      accent: "#99a0ba",
      infoStart: "#313749",
      infoEnd: "#08090d",
    },
  },
  {
    slug: "langlois-dragonfly",
    title: "Robert Langlois - Dragonfly",
    subtitle: "Vidéoclip, 2026",
    type: "Vidéoclip",
    role: "Colorisation et effets visuels",
    client: {},
    vimeo: "https://player.vimeo.com/video/1223384431",
    text: [],
    credits: [
      { label: "Réalisation", value: "Philippe Léonard" },
      { label: "Colorisation et effets visuels", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#2a2726",
      accent: "#7c7b7b",
      infoStart: "#1a1e57",
      infoEnd: "#111111",
    },
  },
  {
    slug: "onf-bww",
    title: "Bread Will Walk",
    subtitle: "Bande-annonce, 2026",
    type: "Bande-annonce",
    role: "Montage",
    client: { label: "Production", value: "ONF" },
    vimeo: "https://player.vimeo.com/video/1223445570",
    text: [
      "« Une sœur dévouée prend la fuite avec son frère métamorphosé en étrange créature de pain. Une foule affamée les pourchasse. Les rues s’emmêlent, la raison s’émiette. L’amour peut-il l’emporter sur la faim ? » - site internet de l'ONF",
    ],
    credits: [
      { label: "Réalisation", value: "Alex Boya" },
      { label: "Coordination bande-annonce", value: "Marion Duhaime-Morissette" },
      { label: "Montage bande-annonce", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2726",
      accent: "#a78b75",
      infoStart: "#4d4036",
      infoEnd: "#111111",
    },
  },
  {
    slug: "onf-paradaiz",
    title: "Paradaïz",
    subtitle: "Bande-annonce, 2026",
    type: "Bande-annonce",
    role: "Montage",
    client: { label: "Production", value: "ONF" },
    vimeo: "https://player.vimeo.com/video/1223444825",
    text: [
      "« Bienvenue à Paradaïz : le lieu des limaces sans toit, des murs criblés de balles, des cigarettes qui s’enchaînent et des tomates explosives.» - site internet de l'ONF",
    ],
    credits: [
      { label: "Réalisation", value: "Matea Radic" },
      { label: "Montage bande-annonce", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2726",
      accent: "#a78b75",
      infoStart: "#4d4036",
      infoEnd: "#111111",
    },
  },
  {
    slug: "pc-cdn",
    title: "Crimes du nord",
    subtitle: "Série documentaire, 2026",
    type: "Série documentaire",
    role: "Motion design et conception graphique",
    client: { label: "Production", value: "Casadel Films / Historia" },
    vimeo: "https://player.vimeo.com/video/1223399273",
    text: [
      "« Montréal est considérée comme une petite ville à l’échelle planétaire et, pourtant, elle jouit d’une grande réputation dans l’univers du crime organisé mondial. Comment son histoire criminelle reflète-t-elle son ADN? À la croisée des chemins entre l’Europe et l’Amérique, le crime montréalais a été façonné par de nombreuses vagues d’immigration, une situation géographique unique et des mouvements sociaux importants.» - site internet d'Historia"
    ],
    credits: [
      { label: "Réalisation", value: "Alexis Chartrand" },
      { label: "Production", value: "Patrick Francke-Sirois"},
      { label: "Montage", value: "Cédric Froment" },
      { label: "Motion design et effets spéciaux", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#2a2726",
      accent: "#7c7b7b",
      infoStart: "#1a1e57",
      infoEnd: "#111111",
    },
  },
  {
    slug: "onf-tgwcp",
    title: "La jeune fille qui pleurait des perles",
    subtitle: "Bande-annonce, 2025",
    type: "Bande-annonce",
    role: "Montage",
    client: { label: "Production", value: "ONF" },
    vimeo: "https://player.vimeo.com/video/1119834616",
    text: [
      "« Épris d’une jeune fille dont les pleurs se transforment en perles, un garçon miséreux est confronté à un cruel dilemme entre l’amour et la fortune.» - site internet de l'ONF",
    ],
    credits: [
      { label: "Réalisation", value: "Chris Lavis, Maciek Szczerbowski" },
      { label: "Montage bande-annonce", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2726",
      accent: "#a78b75",
      infoStart: "#4d4036",
      infoEnd: "#111111",
    },
  },
    {
    slug: "stephanie-boulay",
    title: "Stéphanie Boulay",
    subtitle: "Vidéoclip, 2025",
    type: "Vidéoclip",
    role: "Montage",
    client: { label: "Label", value: "Simone records" },
    text: [
      "La chanson est parue sur l'album solo de Stéphanie Boulay, intitulé « Est-ce que quelqu’un me voit? ». Et oui, j'ai pleuré quelques fois moi aussi durant le montage de ce beau vidéoclip.",
    ],
    credits: [
      { label: "Réalisation", value: "Clara L'heureux-Garcia" },
      { label: "Montage", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2726",
      accent: "#a78b75",
      infoStart: "#4d4036",
      infoEnd: "#111111",
    },
  },
  window.portfolioProjectCatalog["donner-le-gout"],
  {
    slug: "onf-ledl",
    title: "Les enfants du large",
    subtitle: "Bande-annonce, 2025",
    type: "Bande-annonce",
    role: "Montage",
    client: { label: "Production", value: "ONF" },
    vimeo: "https://player.vimeo.com/video/1231003987",
    text: [
      "« Virginia Tangvald navigue sur les eaux troubles de son histoire familiale pour résoudre le mystère entourant la disparition de son frère et le naufrage de son père, le célèbre marin Peter Tangvald.» - site internet de l'ONF",
    ],
    credits: [
      { label: "Réalisation", value: "Virginia Tangvald" },
      { label: "Montage bande-annonce", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2726",
      accent: "#a78b75",
      infoStart: "#4d4036",
      infoEnd: "#111111",
    },
  },
  {
    slug: "elisapie",
    title: "Elisapie",
    subtitle: "Vidéoclip, 2024",
    type: "Vidéoclip",
    role: "Montage, colorisation et effets visuels",
    client: { label: "Label", value: "Bonsound" },
    vimeo: "https://player.vimeo.com/video/1053402314?h=ee18653680",
    text: [
      "Quviasukkuvit est une relecture en inuktitut de la chanson If It Makes You Happy, portée par une esthétique de « Hollywood hangover ».",
      "Le projet était pour moi l'occasion de brouiller les limites entre colorisation et effets visuels, afin de faire dialoguer les séquences de chorégraphie en studio avec les paysages intégrés au cadre.",
      "Le montage a été fait sur DaVinci Resolve, puis retravaillé dans After Effects avant une dernière passe de colorisation pour préciser ce rendu doux, légèrement imprécis et volontairement distorsionné.",
    ],
    credits: [
      { label: "Réalisation", value: "Philippe Léonard" },
      { label: "Montage, colorisation et effets visuels", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#1f2a31",
      accent: "#7aa1b5",
      infoStart: "#21313e",
      infoEnd: "#0a0d11",
    },
  },
  {
    slug: "frank-bourassa",
    title: "Frank Bourassa",
    subtitle: "Série documentaire, 2023",
    type: "Série documentaire",
    role: "Motion design et effets spéciaux",
    client: { label: "Diffuseur", value: "Crave" },
    vimeo: "https://player.vimeo.com/video/1082652788?h=223a1e7cb9",
    text: [
      "Frank Bourassa et ses faux millions raconte en trois épisodes l'histoire du faussaire de Trois-Rivières et de l'un des plus importants réseaux de faux billets au pays.",
      "Pour intégrer les preuves, les photographies et les éléments numériques, j'ai développé dans After Effects un pipeline permettant d'animer ces matériaux dans un espace 3D cohérent avec l'esthétique sombre du tournage.",
      "Le travail a aussi consisté à traiter les images d'écrans et de caméras de surveillance comme des objets filmés, afin de dynamiser des sources visuelles de qualité variable et de les harmoniser avec la séquence d'ouverture créée par Simon Meloche.",
    ],
    credits: [
      { label: "Réalisation", value: "Alexis Chartrand" },
      { label: "Production", value: "Patrick Francke-Sirois, David Francke-Robitaille" },
      { label: "Direction de la photographie", value: "Thierry Sirois, Louis Turcotte" },
      { label: "Montage", value: "Louis Chevalier" },
      { label: "Motion design et effets spéciaux", value: "Jérémie Carvalho" },
      { label: "Motion design additionnel", value: "Simon Meloche (Muxmo)" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#2b221d",
      accent: "#d28b55",
      infoStart: "#4c3422",
      infoEnd: "#120d09",
    },
  },
  {
    slug: "beautes-rebelles",
    title: "Beautés rebelles",
    subtitle: "Série documentaire, 2024",
    type: "Série documentaire",
    role: "Conception graphique et motion design",
    client: { label: "Diffuseur", value: "TV5" },
    vimeo: "https://player.vimeo.com/video/1082652587?h=4f1735eed5",
    text: [
      "Dans Beautés rebelles, Carla Beauvais parcourt le monde pour rencontrer des concours de beauté mettant de l'avant des personnes marginalisées et reconfigurant les normes qui définissent la beauté.",
      "La conception graphique cherchait à conjuguer élégance et rugosité, en travaillant des couleurs pastel, des éclats, des accidents, du grain et des textures capables de prolonger les intentions du projet.",
      "Cette série a été un terrain fort pour pousser le développement de luminosités et de textures uniques, pensées pour dynamiser les transitions et l'enchaînement des plans.",
    ],
    credits: [
      { label: "Réalisation", value: "Alexis B. Martin" },
      { label: "Idée originale", value: "Alix Dufresne" },
      { label: "Animation", value: "Carla Beauvais" },
      { label: "Production", value: "Caroline Bergoin, Patrick Francke-Sirois" },
      { label: "Conception graphique et motion design", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#251d29",
      accent: "#b68ccf",
      infoStart: "#41314d",
      infoEnd: "#0f0a12",
    },
  },
  {
    slug: "prison-esprit-saint",
    title: "La prison de l'Esprit-Saint",
    subtitle: "Série documentaire, 2024",
    type: "Série documentaire",
    role: "Conception graphique et motion design",
    client: { label: "Diffuseur", value: "Crave" },
    vimeo: "https://player.vimeo.com/video/1082651792?h=ccc23b56c3",
    text: [
      "Cette série documentaire issue du journalisme d'enquête suit Marie-Christine Bergeron à la rencontre d'anciens membres de la Mission de l'Esprit-Saint.",
      "Le parti pris typographique reposait sur une dichotomie entre deux régimes de vérité: d'un côté un langage plus archaïque et obscurantiste, de l'autre un registre journalistique plus sobre et actuel.",
      "Le graphisme et le motion design jouent sur les couches, la transparence, la lumière et la profondeur, avec un look développé dans After Effects puis consolidé par une passe de colorisation dans DaVinci Resolve.",
    ],
    credits: [
      { label: "Réalisation", value: "Isabelle Tincler" },
      { label: "Animation", value: "Marie-Christine Bergeron" },
      { label: "Production", value: "Maxime Landry" },
      { label: "Conception graphique et motion design", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#202226",
      accent: "#9da6b0",
      infoStart: "#343a43",
      infoEnd: "#0c0f14",
    },
  },
  {
    slug: "hanging-on-a-string",
    title: "Hanging on a String",
    subtitle: "Vidéoclip, 2024",
    type: "Vidéoclip",
    role: "Animation",
    client: {},
    vimeo: "https://player.vimeo.com/video/1086047361",
    text: [
      "Premier single de l'album du même nom, « Hanging on a String » est un vidéoclip réalisé par Annick Jean.",
    ],
    credits: [
      { label: "Réalisation", value: "Annick Jean" },
      { label: "Direction artistique", value: "Rodolphe St-Gelais" },
      { label: "Animation", value: "Rodolphe St-Gelais, Jérémie Carvalho, Max Vannienschoot" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#251819",
      accent: "#c46d70",
      infoStart: "#4b2c30",
      infoEnd: "#12090a",
    },
  },
  {
    slug: "zug-island",
    title: "Zug Island",
    subtitle: "Court-métrage documentaire, 2022 · 22 min",
    type: "Court-métrage documentaire",
    role: "Montage",
    client: { label: "Distributeur", value: "Les Films du 3 mars" },
    vimeo: "https://player.vimeo.com/video/1082651964?h=49b988fb41",
    text: [
      "« En quête d’un son mystérieux, un preneur de son fait la rencontre des habitants d’un quartier à l’abandon. » - site internet des Films du 3 mars",
    ],
    credits: [
      { label: "Réalisation", value: "Nicolas Lachapelle" },
      { label: "Production", value: "Guillaume Collin, Nicolas Lachapelle" },
      { label: "Colorisation", value: "Laurence Messier-Moreau" },
      { label: "Montage", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#1d2527",
      accent: "#6fa0a2",
      infoStart: "#253e42",
      infoEnd: "#0c1111",
    },
  },
  {
    slug: "evinces",
    title: "Évincés",
    subtitle: "Série documentaire, 2023",
    type: "Série documentaire",
    role: "Montage et motion design additionnel",
    client: { label: "Diffuseur", value: "Crave/Noovo" },
    vimeo: "https://player.vimeo.com/video/1082653574?h=61a83c7eda",
    text: [
      "Évincés retrace la lutte des aînés de la résidence Mont-Carmel après la distribution d'avis d'éviction, dans une démarche à la fois politique, intime et profondément collective.",
      "Avec plus de vingt entrevues et plus de quatre-vingts heures de matériel, le montage s'est étalé sur plusieurs mois pour faire émerger une progression claire de l'enquête.",
      "Afin d'appuyer cette enquête autrement que par de simples captures d'écran, j'ai intégré dans After Effects des articles et documents en 3D, avec flous et mouvements de caméra, pour prolonger l'approche documentaire par un travail graphique discret mais structurant.",
    ],
    credits: [
      { label: "Réalisation", value: "Alexis Chartrand" },
      { label: "Animation", value: "Noémi Mercier" },
      { label: "Production", value: "Patrick Francke-Sirois, Juliette Provost-Dubois, Noémi Mercier" },
      { label: "Montage et motion design additionnel", value: "Jérémie Carvalho" },
      { label: "Montage additionnel", value: "Louis Chevalier" },
      { label: "Motion design", value: "Bechir Mogaadi" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#2a2420",
      accent: "#b39374",
      infoStart: "#42342a",
      infoEnd: "#110c09",
    },
  },
  {
    slug: "tout-doux",
    title: "Tout doux",
    subtitle: "Campagne publicitaire, 2023",
    type: "Campagne publicitaire",
    role: "Motion design",
    client: { label: "Production", value: "Parade" },
    vimeo: "https://player.vimeo.com/video/890120953?h=eab5981268",
    text: [
      "Projet publicitaire réalisé pour Claude Bégin avec Parade. J'y ai assuré le motion design en continuité avec le montage et la colorisation du projet.",
    ],
    credits: [
      { label: "Réalisation / montage", value: "Phil Chagnon" },
      { label: "Colorisation", value: "Olivier Séguin-Dang" },
      { label: "Motion design", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#1f2028",
      accent: "#8f98d3",
      infoStart: "#2f3351",
      infoEnd: "#0d0f17",
    },
  },
  {
    slug: "ascension-pour-cafe-chaud",
    title: "Ascension pour café chaud",
    subtitle: "Motion design, 2023",
    type: "Motion design",
    role: "Habillage graphique",
    client: {},
    vimeo: "https://player.vimeo.com/video/881523758",
    text: [
      "Illustrateur et ami, Philmath a concentré son univers créatif autour des choses qu’il aime, soit le café, le jazz et le vélo. Dans le soucis de développer cet art de vivre, l’été 2023 fût pour nous l’occasion de succéder les affogatos, les discussions et les parties d’échec, tout en élaborant de petits projets d’animations. Cette vidéo en fait parti.",
    ],
    credits: [
      { label: "Animation", value: "Jérémie Carvalho" },
      { label: "Illustration et voix", value: "Philmath" },
    ],
    views: ["projects", "motion"],
    palette: {
      base: "#261f1a",
      accent: "#cc9e67",
      infoStart: "#463120",
      infoEnd: "#110a06",
    },
  },
  {
    slug: "zouz",
    title: "zouz - Seuls",
    subtitle: "Vidéoclip, 2023",
    type: "Vidéoclip",
    role: "Montage",
    client: { label: "Label", value: "Lazy At Work" },
    vimeo: "https://player.vimeo.com/video/1230974666",
    text: [],
    credits: [
      { label: "Réalisation", value: "Philippe Léonard" },
      { label: "Montage et colorisation", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#222127",
      accent: "#9d8ac0",
      infoStart: "#362f45",
      infoEnd: "#0f0c12",
    },
  },
  {
    slug: "chroniques-vie-ordinaire",
    title: "Chroniques de la vie ordinaire",
    subtitle: "Série documentaire, 2022",
    type: "Série documentaire",
    role: "Montage",
    client: { label: "Diffuseur", value: "TV5" },
    text: [
      "Après un premier cycle montréalais, Amélie Hardy poursuit Chroniques de la vie ordinaire à travers trois quartiers de Paris, dans une forme courte et intimiste.",
      "J'y ai assuré le montage, avec un travail orienté vers la lisibilité, la continuité entre les épisodes et la préservation de la sensibilité propre à chaque rencontre.",
    ],
    credits: [
      { label: "Réalisation", value: "Amélie Hardy" },
      { label: "Production", value: "Patrick Francke-Sirois" },
      { label: "Direction de la photographie", value: "Émile Desroches-Larouche" },
      { label: "Montage", value: "Jérémie Carvalho" },
    ],
    views: ["projects", "montage"],
    palette: {
      base: "#222127",
      accent: "#9d8ac0",
      infoStart: "#362f45",
      infoEnd: "#0f0c12",
    },
  },
  {
    slug: "naomi-zero-stress",
    title: "Naomi - Zéro stress",
    subtitle: "Vidéoclip, 2021",
    type: "Vidéoclip",
    role: "Montage",
    client: { label: "Label", value: "Bravo Musique" },
    text: [],
    credits: [{ label: "Montage", value: "Jérémie Carvalho" }],
    views: ["projects", "montage"],
    palette: {
      base: "#231b1c",
      accent: "#dd7e8a",
      infoStart: "#45252b",
      infoEnd: "#100708",
    },
  },
];
*/

function fixMojibake(value) {
  if (typeof value !== "string" || !/[ÃÂâ]/.test(value)) {
    return value;
  }

  try {
    return decodeURIComponent(escape(value));
  } catch (error) {
    return value;
  }
}

function normalizeContent(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeContent(entry));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeContent(entry)]),
    );
  }

  return fixMojibake(value);
}

const normalizedProjects = normalizeContent(projects);

const viewSections = [...document.querySelectorAll("[data-view]")];
const gridTargets = [...document.querySelectorAll("[data-grid]")];
const filterButtons = [...document.querySelectorAll("[data-filter-link]")];
const navButtons = [...document.querySelectorAll("[data-view-link]")];
const localeToggle = document.querySelector("[data-locale-toggle]");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const cardTemplate = document.getElementById("project-card-template");
const heroPlaceholder = document.querySelector(".hero__video-placeholder");
const heroVideo = heroPlaceholder?.querySelector(".hero__video");
const heroPoster = heroPlaceholder?.querySelector(".hero__poster");
const heroPlaceholderLabel = heroPlaceholder?.querySelector("span");
const heroRole = document.querySelector(".hero__role");
const portraitPlaceholder = document.querySelector(".portrait-placeholder");
const portraitImage = portraitPlaceholder?.querySelector(".portrait-placeholder__image");
const portraitPlaceholderLabel = portraitPlaceholder?.querySelector("span");
const contactAboutParagraphs = [...document.querySelectorAll(".contact-view__about p")];
const contactCopy = document.querySelector(".contact-view__copy");
const footerCopyright = document.querySelector(".site-footer__copyright");
const pageTitle = document.querySelector("head title");
const pageDescription = document.querySelector('meta[name="description"]');

const overlay = document.querySelector(".project-overlay");
const overlayBackdrop = overlay?.querySelector(".project-overlay__backdrop");
const overlayGhost = overlay?.querySelector(".project-overlay__ghost");
const overlayPanel = overlay?.querySelector(".project-panel");
const overlayCloseButton = overlay?.querySelector(".project-panel__close");
const overlayScroll = overlay?.querySelector(".project-panel__scroll");
const overlayMedia = overlay?.querySelector(".project-panel__media-inner");
const overlayIframe = overlay?.querySelector(".project-panel__iframe");
const overlayVideo = overlay?.querySelector(".project-panel__video");
const overlayImage = overlay?.querySelector(".project-panel__image");
const overlayTitle = overlay?.querySelector(".project-panel__title");
const overlaySubtitle = overlay?.querySelector("[data-project-subtitle]");
const overlayMeta = overlay?.querySelector("[data-project-meta]");
const overlayText = overlay?.querySelector("[data-project-text]");
const overlayCredits = overlay?.querySelector("[data-project-credits]");
const overlayCreditsHeading = overlay?.querySelector(".project-panel__credits h3");
const overlayGallery = overlay?.querySelector("[data-project-gallery]");
const overlayNavButtons = [...document.querySelectorAll("[data-project-nav]")];
const overlayCloseButtons = [...document.querySelectorAll("[data-overlay-close]")];
const overlayMediaPlaceholderLabel = overlay?.querySelector(".project-panel__media-inner span");
const projectCardPlaceholderLabel = document.querySelector(".project-card__placeholder-label");

let overlayTrigger = null;
let overlayReturnUrl = null;
let galleryRenderId = 0;

const projectMap = new Map(normalizedProjects.map((project) => [project.slug, project]));
const mainScript = document.querySelector('script[src$="main.js"]');
const siteRootUrl = new URL("./", mainScript?.src ?? window.location.href);
const mediaManifest = window.portfolioMedia ?? {};

function getSiteAssetPath(relativePath) {
  return new URL(relativePath, siteRootUrl).pathname;
}

const siteAssets = {
  hero: {
    video: mediaManifest.hero?.video,
    image: mediaManifest.hero?.poster,
  },
  portrait: mediaManifest.portrait,
};

const state = {
  currentView: "projects",
  currentFilter: "projects",
  currentProject: null,
  currentLocale: "fr",
};

const siteCopy = {
  fr: {
    htmlLang: "fr",
    title: "Jérémie Carvalho",
    description:
      "Portfolio de Jérémie Carvalho, monteur et motion designer à Montréal. Découvrez une sélection de projets en montage et en motion design.",
    nav: {
      projects: "Jérémie Carvalho",
      montage: "Montage",
      motion: "Motion design",
      contact: "Contact",
    },
    heroPlaceholder: "Vidéo hero à intégrer",
    heroRole: "Monteur & motion designer — Montréal",
    portraitPlaceholder: "Portrait à intégrer",
    contactAbout: [
      "Monteur et motion designer résidant à Montréal.",
      "Je collabore avec des réalisateurs, artistes et équipes de production sur des projets documentaires, de fiction, des séries télé, des vidéoclips et autres.",
      "Ouvert à des collaborations récurrentes ou contractuelles.",
    ],
    contactCopy:
      "Pour discuter d’un projet ou d’une collaboration, vous pouvez me joindre par courriel.",
    copyright: "© 2026 Jérémie Carvalho. Tous droits réservés.",
    menuToggle: "Ouvrir la navigation",
    localeToggle: "Changer la langue",
    overlay: {
      panelLabel: "Aperçu du projet",
      close: "Fermer le projet",
      iframeTitle: "Vidéo du projet",
      mediaPlaceholder: "Média principal à intégrer",
      meta: ["Type", "Rôle", "Client"],
      credits: "Crédits",
      galleryLabel: "Médias complémentaires",
      prev: "Précédent",
      next: "Suivant",
    },
    card: {
      placeholder: "Image principale",
      openProject: "Ouvrir le projet",
    },
  },
  en: {
    htmlLang: "en",
    title: "Jeremie Carvalho",
    description:
      "Portfolio of Jeremie Carvalho, an editor and motion designer based in Montreal. Explore selected editing and motion design work.",
    nav: {
      projects: "Jeremie Carvalho",
      montage: "Editing",
      motion: "Motion design",
      contact: "Contact",
    },
    heroPlaceholder: "Hero video placeholder",
    heroRole: "Editor & motion designer — Montreal",
    portraitPlaceholder: "Portrait placeholder",
    contactAbout: [
      "Editor and motion designer based in Montreal.",
      "I collaborate with directors, artists, and production teams on documentaries, fiction, TV series, music videos, and other screen-based projects.",
      "Available for recurring collaborations and contract-based work.",
    ],
    contactCopy:
      "To discuss a project or collaboration, feel free to reach out by email.",
    copyright: "© 2026 Jeremie Carvalho. All rights reserved.",
    menuToggle: "Open navigation",
    localeToggle: "Change language",
    overlay: {
      panelLabel: "Project preview",
      close: "Close project",
      iframeTitle: "Project video",
      mediaPlaceholder: "Main media placeholder",
      meta: ["Type", "Role", "Client"],
      credits: "Credits",
      galleryLabel: "Supporting media",
      prev: "Previous",
      next: "Next",
    },
    card: {
      placeholder: "Main image",
      openProject: "Open project",
    },
  },
};

const typeTranslations = {
  en: {
    Demoreel: "Demo reel",
    "Vidéoclip": "Music video",
    "Série documentaire": "Documentary series",
    "Série culinaire": "Culinary series",
    "Court-métrage documentaire": "Documentary short",
    "Campagne publicitaire": "Advertising campaign",
    "Motion design": "Motion design",
  },
};

const roleTranslations = {
  en: {
    Montage: "Editing",
    "Montage et motion design": "Editing and motion design",
    "Montage, colorisation et effets visuels": "Editing, color and VFX",
    "Motion design et effets spéciaux": "Motion design and VFX",
    "Conception graphique et motion design": "Design and motion design",
    "Animation 2D": "2D animation",
    "Montage et motion design additionnel": "Editing and additional motion design",
    "Motion design": "Motion design",
    "Habillage graphique": "Graphic package",
  },
};

const creditLabelTranslations = {
  en: {
    "Réalisation": "Direction",
    "Direction de la photographie": "Cinematography",
    "Idée originale": "Original concept",
    "Production": "Production",
    "Animation": "Host",
    "Conception graphique et motion design": "Design and motion design",
    "Motion design et effets spéciaux": "Motion design and VFX",
    "Motion design additionnel": "Additional motion design",
    "Montage": "Editing",
    "Montage additionnel": "Additional editing",
    "Montage et motion design additionnel": "Editing and additional motion design",
    "Montage, colorisation et effets visuels": "Editing, color and VFX",
    "Réalisation / montage": "Direction / editing",
    "Colorisation": "Color",
    "Motion design": "Motion design",
    "Design graphique": "Graphic design",
    "Montage online": "Online editing",
    "Conception et montage": "Concept and editing",
    "Animation 2D": "2D animation",
    "Habillage graphique": "Graphic package",
    "Scénario": "Written by",
  },
};

const localizedSiteCopy = normalizeContent(siteCopy);
const localizedTypeTranslations = normalizeContent(typeTranslations);
const localizedRoleTranslations = normalizeContent(roleTranslations);
const localizedCreditLabelTranslations = normalizeContent(creditLabelTranslations);

function getAssetCandidates(asset) {
  return asset?.src ? [getSiteAssetPath(asset.src)] : [];
}

function getSiteCopy(locale = state.currentLocale) {
  return localizedSiteCopy[locale] ?? localizedSiteCopy.fr;
}

function translateMappedValue(value, map, locale = state.currentLocale) {
  return map[locale]?.[value] ?? value;
}

function localizeSubtitle(subtitle, locale = state.currentLocale) {
  if (locale === "fr") {
    return subtitle;
  }

  const typeLabels = Object.keys(localizedTypeTranslations.en ?? {}).sort((a, b) => b.length - a.length);
  let localizedSubtitle = subtitle;

  typeLabels.forEach((label) => {
    if (localizedSubtitle.startsWith(label)) {
      localizedSubtitle = localizedSubtitle.replace(label, localizedTypeTranslations.en[label]);
    }
  });

  return localizedSubtitle;
}

function localizeCredits(credits, locale = state.currentLocale) {
  if (locale === "fr") {
    return credits;
  }

  return credits.map((credit) => ({
    ...credit,
    label: translateMappedValue(credit.label, localizedCreditLabelTranslations, locale),
  }));
}

function getLocalizedProject(project, locale = state.currentLocale) {
  const localizedContent = project.locales?.[locale] ?? {};

  return {
    ...project,
    ...localizedContent,
    title: localizedContent.title ?? project.title,
    subtitle: localizedContent.subtitle ?? localizeSubtitle(project.subtitle, locale),
    type: localizedContent.type ?? translateMappedValue(project.type, localizedTypeTranslations, locale),
    role: localizedContent.role ?? translateMappedValue(project.role, localizedRoleTranslations, locale),
    client: localizedContent.client ?? project.client,
    text: localizedContent.text ?? project.text,
    credits: localizedContent.credits ?? localizeCredits(project.credits, locale),
  };
}

function applyLocale({ rerenderGrid = true, updateHistory = true } = {}) {
  const copy = getSiteCopy();

  document.documentElement.lang = copy.htmlLang;
  if (pageTitle) {
    pageTitle.textContent = copy.title;
  }

  if (pageDescription) {
    pageDescription.setAttribute("content", copy.description);
  }

  menuToggle?.setAttribute("aria-label", copy.menuToggle);

  filterButtons.forEach((button) => {
    const key = button.dataset.filterLink;
    if (copy.nav[key]) {
      button.textContent = copy.nav[key];
    }
  });

  navButtons.forEach((button) => {
    const key = button.dataset.viewLink;
    if (copy.nav[key]) {
      button.textContent = copy.nav[key];
    }
  });

  if (localeToggle) {
    const alternateLocale = state.currentLocale === "fr" ? "en" : "fr";

    localeToggle.textContent = alternateLocale.toUpperCase();
    localeToggle.href = getHomePath(alternateLocale);
    localeToggle.setAttribute("aria-label", copy.localeToggle);
    localeToggle.setAttribute("title", copy.localeToggle);
  }

  if (heroPlaceholderLabel) {
    heroPlaceholderLabel.textContent = copy.heroPlaceholder;
  }

  if (heroRole) {
    heroRole.textContent = copy.heroRole;
  }

  if (portraitPlaceholderLabel) {
    portraitPlaceholderLabel.textContent = copy.portraitPlaceholder;
  }

  contactAboutParagraphs.forEach((paragraph, index) => {
    if (copy.contactAbout[index]) {
      paragraph.textContent = copy.contactAbout[index];
    }
  });

  if (contactCopy) {
    contactCopy.textContent = copy.contactCopy;
  }

  if (footerCopyright) {
    footerCopyright.textContent = copy.copyright;
  }

  if (overlayPanel) {
    overlayPanel.setAttribute("aria-label", copy.overlay.panelLabel);
  }

  overlayCloseButtons.forEach((button) => {
    button.setAttribute("aria-label", copy.overlay.close);
  });

  overlayIframe?.setAttribute("title", copy.overlay.iframeTitle);

  if (overlayMediaPlaceholderLabel) {
    overlayMediaPlaceholderLabel.textContent = copy.overlay.mediaPlaceholder;
  }

  if (overlayCreditsHeading) {
    overlayCreditsHeading.textContent = copy.overlay.credits;
  }

  if (overlayGallery) {
    overlayGallery.setAttribute("aria-label", copy.overlay.galleryLabel);
  }

  overlayNavButtons.forEach((button) => {
    button.textContent = button.dataset.projectNav === "prev" ? copy.overlay.prev : copy.overlay.next;
  });

  if (projectCardPlaceholderLabel) {
    projectCardPlaceholderLabel.textContent = copy.card.placeholder;
  }

  if (rerenderGrid) {
    renderGrids();
  }

  if (state.currentProject) {
    fillOverlay(state.currentProject);
    updateOverlayNavigation();
  }

  if (updateHistory) {
    syncUrl();
  }
}

function getProjectAssetSet(project) {
  const media = mediaManifest.projects?.[project.slug] ?? {};

  return {
    cardMain: media.cardMain,
    coverVideo: media.coverVideo,
    coverImage: media.coverImage,
    gallery: media.gallery ?? [],
  };
}

function setImageMetadata(element, asset, { loading = "lazy" } = {}) {
  if (!element || !asset) {
    return;
  }

  if (asset.width && asset.height) {
    element.width = asset.width;
    element.height = asset.height;
  }

  element.decoding = "async";
  element.loading = loading;
}

function resetImageElement(element) {
  if (!element) {
    return;
  }

  element.hidden = true;
  element.removeAttribute("src");
  element.onload = null;
  element.onerror = null;
}

function resetVideoElement(element) {
  if (!element) {
    return;
  }

  videoLoadTokens.set(element, (videoLoadTokens.get(element) ?? 0) + 1);
  element.pause();
  element.hidden = true;
  element.removeAttribute("src");
  element.removeAttribute("poster");
  element.onloadeddata = null;
  element.onerror = null;
  element.load();
}

const videoLoadTokens = new WeakMap();

function resetIframeElement(element) {
  if (!element) {
    return;
  }

  element.hidden = true;
  element.removeAttribute("src");
}

function clearOverlayMedia() {
  resetIframeElement(overlayIframe);
  resetVideoElement(overlayVideo);
  resetImageElement(overlayImage);
  setFilledState(overlayMedia, false);
  galleryRenderId += 1;
  if (overlayGallery) {
    overlayGallery.innerHTML = "";
    overlayGallery.hidden = true;
  }
}

function setFilledState(container, isFilled) {
  container?.classList.toggle("is-filled", isFilled);
}

function loadImageAsset(element, candidates, { container = null, onSuccess = null, onError = null } = {}) {
  resetImageElement(element);

  const queue = candidates.filter(Boolean);

  if (!element || !queue.length) {
    setFilledState(container, false);
    onError?.();
    return;
  }

  const tryCandidate = (index) => {
    if (index >= queue.length) {
      setFilledState(container, false);
      onError?.();
      return;
    }

    const source = queue[index];

    element.onload = () => {
      element.hidden = false;
      setFilledState(container, true);
      onSuccess?.(source);
    };

    element.onerror = () => {
      resetImageElement(element);
      tryCandidate(index + 1);
    };

    element.hidden = false;
    element.src = source;
  };

  tryCandidate(0);
}

function loadVideoAsset(element, candidates, { container = null, onSuccess = null, onError = null } = {}) {
  resetVideoElement(element);

  const queue = candidates.filter(Boolean);

  if (!element || !queue.length) {
    setFilledState(container, false);
    onError?.();
    return;
  }

  element.autoplay = true;
  element.defaultMuted = true;
  element.muted = true;
  element.playsInline = true;

  const tryCandidate = (index) => {
    if (index >= queue.length) {
      setFilledState(container, false);
      onError?.();
      return;
    }

    const source = queue[index];
    const loadToken = videoLoadTokens.get(element);
    const isCurrentLoad = () => videoLoadTokens.get(element) === loadToken;

    element.onloadeddata = () => {
      if (!isCurrentLoad()) {
        return;
      }

      const playPromise = element.play();
      const showVideo = () => {
        if (!isCurrentLoad()) {
          return;
        }

        element.hidden = false;
        setFilledState(container, true);
        onSuccess?.(source);
      };
      const fallbackToNextCandidate = () => {
        if (!isCurrentLoad()) {
          return;
        }

        resetVideoElement(element);
        tryCandidate(index + 1);
      };

      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(showVideo).catch(fallbackToNextCandidate);
        return;
      }

      showVideo();
    };

    element.onerror = () => {
      if (!isCurrentLoad()) {
        return;
      }

      resetVideoElement(element);
      tryCandidate(index + 1);
    };

    element.preload = "metadata";
    element.src = source;
    element.load();
  };

  tryCandidate(0);
}

function loadMediaBox({
  container = null,
  iframeElement = null,
  iframeSrc = "",
  videoElement = null,
  imageElement = null,
  videoAsset = null,
  imageAsset = null,
} = {}) {
  setFilledState(container, false);
  resetIframeElement(iframeElement);
  resetVideoElement(videoElement);
  resetImageElement(imageElement);
  setImageMetadata(imageElement, imageAsset, { loading: "eager" });

  const videoCandidates = getAssetCandidates(videoAsset);
  const imageCandidates = getAssetCandidates(imageAsset);

  if (iframeElement && iframeSrc) {
    iframeElement.src = iframeSrc;
    iframeElement.hidden = false;
    setFilledState(container, true);
    return;
  }

  const loadImageFallback = () => {
    if (!imageElement) {
      setFilledState(container, false);
      return;
    }

    loadImageAsset(imageElement, imageCandidates, { container });
  };

  if (videoElement && videoCandidates.length) {
    loadImageAsset(imageElement, imageCandidates, { container });
    loadVideoAsset(videoElement, videoCandidates, {
      container,
      onSuccess: () => {
        resetImageElement(imageElement);
      },
      onError: loadImageFallback,
    });
    return;
  }

  loadImageFallback();
}

function createGalleryItem(alt) {
  const item = document.createElement("div");
  const image = document.createElement("img");

  item.className = "project-panel__gallery-item";
  image.className = "project-panel__gallery-image";
  image.alt = alt;
  image.hidden = true;

  item.append(image);

  return { item, image };
}

function renderProjectGallery(project) {
  if (!overlayGallery) {
    return;
  }

       const assetSet = getProjectAssetSet(project);
  const renderId = galleryRenderId + 1;
  const localizedProject = getLocalizedProject(project);

  galleryRenderId = renderId;
  overlayGallery.innerHTML = "";
  overlayGallery.hidden = true;
  const loadedItems = [];

  assetSet.gallery.forEach((asset, index) => {
    const { item, image } = createGalleryItem(`${localizedProject.title} ${index + 1}`);
    setImageMetadata(image, asset);

    loadImageAsset(image, getAssetCandidates(asset), {
      container: item,
      onSuccess: () => {
        if (renderId !== galleryRenderId) {
          return;
        }

        loadedItems[index] = item;
        overlayGallery.replaceChildren(...loadedItems.filter(Boolean));
        overlayGallery.hidden = false;
      },
    });
  });
}

function hydrateStaticAssets() {
  const shouldLoadHeroVideo = true;

  loadMediaBox({
    container: heroPlaceholder,
    videoElement: shouldLoadHeroVideo ? heroVideo : null,
    imageElement: heroPoster,
    videoAsset: shouldLoadHeroVideo ? siteAssets.hero.video : null,
    imageAsset: siteAssets.hero.image,
  });

  setImageMetadata(portraitImage, siteAssets.portrait);
  loadImageAsset(portraitImage, getAssetCandidates(siteAssets.portrait), { container: portraitPlaceholder });
}

function getProjectsForView(view) {
  return normalizedProjects.filter((project) => project.views.includes(view));
}

function closeMenu() {
  if (!menuToggle || !primaryNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.classList.remove("is-open");
  primaryNav.classList.remove("is-open");
}

function renderGrids() {
  gridTargets.forEach((target) => {
    const filter = state.currentFilter;
    const items = getProjectsForView(filter);
    const copy = getSiteCopy();

    target.innerHTML = "";

    items.forEach((project) => {
      const localizedProject = getLocalizedProject(project);
      const fragment = cardTemplate.content.cloneNode(true);
      const card = fragment.querySelector(".project-card");
      const restSurface = fragment.querySelector(".project-card__surface--rest");
      const image = fragment.querySelector(".project-card__image");
      const srLabel = fragment.querySelector(".project-card__sr-label");
      const placeholderLabel = fragment.querySelector(".project-card__placeholder-label");
      const title = fragment.querySelector(".project-card__title");
      const type = fragment.querySelector(".project-card__type");
      const role = fragment.querySelector(".project-card__role");
       const assetSet = getProjectAssetSet(project);

      card.dataset.project = project.slug;
      card.dataset.filter = filter;
      card.href = getProjectPath(project);
      card.style.setProperty("--project-base", project.palette.base);
      card.style.setProperty("--project-accent", project.palette.accent);

      title.textContent = localizedProject.title;
      type.textContent = localizedProject.type;
      role.textContent = localizedProject.role;
      srLabel.textContent = `${copy.card.openProject} ${localizedProject.title}`;
      placeholderLabel.textContent = copy.card.placeholder;

       setImageMetadata(image, assetSet.cardMain);
       loadImageAsset(image, getAssetCandidates(assetSet.cardMain), { container: restSurface });

      card.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedProject = projectMap.get(event.currentTarget.dataset.project);

        if (!selectedProject) {
          return;
        }

        openProject(selectedProject, {
          trigger: event.currentTarget,
          pushState: true,
        });
      });

      target.appendChild(fragment);
    });
  });
}

function setView(view, { pushState = true, closeProject = true } = {}) {
  state.currentView = view;

  viewSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.view === view);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewLink === view);
  });

  filterButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      view === "projects" && button.dataset.filterLink === state.currentFilter,
    );
  });

  if (closeProject && state.currentProject) {
    hideOverlay({ updateHistory: false });
  }

  if (pushState) {
    syncUrl();
  }

  closeMenu();
}

function setFilter(filter, { pushState = true, forceProjectsView = true } = {}) {
  state.currentFilter = filter;

  if (forceProjectsView) {
    state.currentView = "projects";
  }

  renderGrids();

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filterLink === filter);
  });

  navButtons.forEach((button) => {
    button.classList.remove("is-active");
  });

  if (pushState) {
    syncUrl();
  }

  closeMenu();
}

function renderProjectMeta(project) {
  if (!overlayMeta) {
    return;
  }

  const copy = getSiteCopy();
  const entries = [
    { label: copy.overlay.meta[0], value: project.type },
    { label: copy.overlay.meta[1], value: project.role },
    project.client,
  ].filter(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      String(entry.label ?? "").trim() &&
      String(entry.value ?? "").trim(),
  );

  overlayMeta.innerHTML = "";
  entries.forEach((entry) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("dt");
    const value = document.createElement("dd");

    label.textContent = entry.label;
    value.textContent = entry.value;
    wrapper.append(label, value);
    overlayMeta.appendChild(wrapper);
  });
}

function fillOverlay(project) {
  const localizedProject = getLocalizedProject(project);
  const assetSet = getProjectAssetSet(project);

  overlayTitle.textContent = localizedProject.title;
  overlaySubtitle.textContent = localizedProject.subtitle ?? "";

  renderProjectMeta(localizedProject);

  overlayText.innerHTML = "";
  localizedProject.text.forEach((paragraph) => {
    const node = document.createElement("p");
    node.textContent = paragraph;
    overlayText.appendChild(node);
  });

  overlayCredits.innerHTML = "";
  localizedProject.credits.forEach((credit) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("dt");
    const value = document.createElement("dd");

    label.textContent = credit.label;
    value.textContent = credit.value;
    wrapper.append(label, value);
    overlayCredits.appendChild(wrapper);
  });

  overlayPanel.style.setProperty("--project-base", project.palette.base);
  overlayMedia.style.setProperty("--project-base", project.palette.base);

  loadMediaBox({
    container: overlayMedia,
    iframeElement: overlayIframe,
    iframeSrc: project.vimeo ?? "",
    videoElement: overlayVideo,
    imageElement: overlayImage,
    videoAsset: assetSet.coverVideo,
    imageAsset: assetSet.coverImage,
  });

  renderProjectGallery(project);
}

function animateGhostFromCard(trigger) {
  if (!overlayGhost || !trigger) {
    return;
  }

  const startRect = trigger.getBoundingClientRect();
  const targetRect = overlayMedia.getBoundingClientRect();

  overlayGhost.style.transition = "none";
  overlayGhost.style.top = `${startRect.top}px`;
  overlayGhost.style.left = `${startRect.left}px`;
  overlayGhost.style.width = `${startRect.width}px`;
  overlayGhost.style.height = `${startRect.height}px`;
  overlayGhost.style.borderRadius = `${window.getComputedStyle(trigger).borderRadius}`;
  overlayGhost.style.opacity = "1";
  overlayGhost.style.setProperty("--project-base", trigger.style.getPropertyValue("--project-base"));
  overlayGhost.classList.add("is-animating");

  requestAnimationFrame(() => {
    overlayGhost.style.transition = "";
    overlayGhost.style.top = `${targetRect.top}px`;
    overlayGhost.style.left = `${targetRect.left}px`;
    overlayGhost.style.width = `${targetRect.width}px`;
    overlayGhost.style.height = `${targetRect.height}px`;
    overlayGhost.style.borderRadius = `${window.getComputedStyle(overlayMedia.parentElement).borderRadius}`;
    overlayGhost.style.opacity = "0";
  });

  window.setTimeout(() => {
    overlayGhost.classList.remove("is-animating");
    overlayGhost.style.opacity = "0";
  }, 260);
}

function updateOverlayNavigation() {
  const collection = getProjectsForView(state.currentFilter);
  const index = collection.findIndex((project) => project.slug === state.currentProject?.slug);

  overlayNavButtons.forEach((button) => {
    const direction = button.dataset.projectNav;
    const hasTarget =
      direction === "prev" ? index > 0 : index > -1 && index < collection.length - 1;

    button.disabled = !hasTarget;
    button.setAttribute("aria-disabled", hasTarget ? "false" : "true");
    button.style.opacity = hasTarget ? "1" : "0.35";
  });
}

const focusableSelector =
  'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return [...container.querySelectorAll(focusableSelector)].filter(
    (element) =>
      !element.hidden &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.getClientRects().length > 0,
  );
}

function openProject(project, { trigger = null, pushState = true, replaceState = false } = {}) {
  if (!state.currentProject) {
    overlayReturnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  state.currentProject = project;
  if (trigger) {
    overlayTrigger = trigger;
  }

  clearOverlayMedia();
  fillOverlay(project);
  updateOverlayNavigation();

  overlay.hidden = false;
  document.body.classList.add("is-overlay-open");
  overlayScroll.scrollTop = 0;

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
    overlayCloseButton?.focus({ preventScroll: true });

    if (trigger) {
      animateGhostFromCard(trigger);
    }
  });

  if (pushState) {
    syncUrl({ replace: replaceState });
  }
}

function hideOverlay({ updateHistory = true } = {}) {
  const restoreTarget = overlayTrigger;

  overlayTrigger = null;
  overlayReturnUrl = null;
  overlay.classList.remove("is-visible");
  document.body.classList.remove("is-overlay-open");
  clearOverlayMedia();

  window.setTimeout(() => {
    if (!overlay.classList.contains("is-visible")) {
      overlay.hidden = true;

      if (restoreTarget?.isConnected && !restoreTarget.disabled) {
        restoreTarget.focus({ preventScroll: true });
      }
    }
  }, 240);

  state.currentProject = null;

  if (updateHistory) {
    syncUrl();
  }
}

function closeProjectFromHistory() {
  if (state.currentProject) {
    if (overlayReturnUrl) {
      const returnUrl = overlayReturnUrl;
      overlayReturnUrl = null;
      window.history.replaceState({}, "", returnUrl);
      hideOverlay({ updateHistory: false });
      return;
    }

    window.history.back();
    return;
  }

  hideOverlay({ updateHistory: false });
}

function syncUrl({ replace = false } = {}) {
  const updateHistory = replace ? "replaceState" : "pushState";

  if (state.currentProject) {
    window.history[updateHistory]({}, "", getProjectPath(state.currentProject));
    return;
  }

  const params = new URLSearchParams();

  if (state.currentView !== "projects") {
    params.set("view", state.currentView);
  }

  if (state.currentFilter !== "projects") {
    params.set("filter", state.currentFilter);
  }

  const query = params.toString();
  const nextUrl = `${getHomePath()}${query ? `?${query}` : ""}`;
  window.history[updateHistory]({}, "", nextUrl);
}

function getHomePath(locale = state.currentLocale) {
  return `/${locale}/`;
}

function getProjectPath(project, locale = state.currentLocale) {
  const section = locale === "fr" ? "projets" : "projects";
  return `/${locale}/${section}/${project.slug}/`;
}

function parseUrlState() {
  const params = new URLSearchParams(window.location.search);
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const pathLocale = ["fr", "en"].includes(pathSegments[0]) ? pathSegments[0] : null;
  const pathSection = pathSegments[1];
  const pathProject = pathLocale && ["projets", "projects"].includes(pathSection)
    ? pathSegments[2]
    : null;
  const requestedLocale = params.get("lang");
  const requestedView = params.get("view");
  const requestedFilter = params.get("filter");
  const requestedProject = params.get("project");

  const validLocale = ["fr", "en"].includes(requestedLocale) ? requestedLocale : "fr";
  const validView = ["projects", "contact"].includes(requestedView) ? requestedView : "projects";
  const validFilter = ["projects", "montage", "motion"].includes(requestedFilter)
    ? requestedFilter
    : "projects";

  return {
    locale: pathLocale ?? validLocale,
    view: validView,
    filter: validFilter,
    project: pathProject ?? requestedProject,
  };
}

function applyUrlState() {
  const route = parseUrlState();
  state.currentLocale = route.locale;
  setView(route.view, { pushState: false, closeProject: true });
  setFilter(route.filter, { pushState: false, forceProjectsView: route.view === "projects" });

  if (!route.project) {
    return;
  }

  const project = projectMap.get(route.project);

  if (!project || !project.views.includes(route.filter)) {
    return;
  }

  openProject(project, { pushState: false });
}

function goToAdjacentProject(direction) {
  const collection = getProjectsForView(state.currentFilter);
  const index = collection.findIndex((project) => project.slug === state.currentProject?.slug);

  if (index === -1) {
    return;
  }

  const nextIndex = direction === "prev" ? index - 1 : index + 1;
  const nextProject = collection[nextIndex];

  if (!nextProject) {
    return;
  }

  openProject(nextProject, { pushState: true, replaceState: true });
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.classList.toggle("is-open", isOpen);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView("projects", { pushState: false, closeProject: true });
    setFilter(button.dataset.filterLink);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.viewLink);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

overlayCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeProjectFromHistory();
  });
});

overlayNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToAdjacentProject(button.dataset.projectNav);
  });
});

overlayBackdrop?.addEventListener("click", () => {
  closeProjectFromHistory();
});

document.addEventListener("keydown", (event) => {
  if (!state.currentProject) {
    return;
  }

  if (event.key === "Tab") {
    const focusableElements = getFocusableElements(overlayPanel);

    if (!focusableElements.length) {
      event.preventDefault();
      overlayCloseButton?.focus({ preventScroll: true });
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!overlayPanel.contains(document.activeElement)) {
      event.preventDefault();
      firstElement.focus({ preventScroll: true });
    } else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus({ preventScroll: true });
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus({ preventScroll: true });
    }

    return;
  }

  if (event.key === "Escape") {
    closeProjectFromHistory();
  }

  if (event.key === "ArrowLeft") {
    goToAdjacentProject("prev");
  }

  if (event.key === "ArrowRight") {
    goToAdjacentProject("next");
  }
});

window.addEventListener("popstate", () => {
  if (state.currentProject) {
    hideOverlay({ updateHistory: false });
  }

  applyUrlState();
});

hydrateStaticAssets();
applyUrlState();
applyLocale({ rerenderGrid: true, updateHistory: false });
