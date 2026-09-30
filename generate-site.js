const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const catalog = require("./project-content.js");

const rootDirectory = __dirname;
const siteOrigin = "https://jeremiecarvalho.com";
const projects = Object.values(catalog);
const imageExtensions = ["avif", "webp", "png", "jpg", "jpeg"];
const videoExtensions = ["mp4", "webm"];
const homepageImagePath = "assets/media/portrait/contact-portrait.png";
const socialProfiles = [
  "https://www.instagram.com/carvalho.jeremie/",
  "https://www.linkedin.com/in/j%C3%A9r%C3%A9mie-carvalho-469322177",
  "https://www.facebook.com/carvalho.jeremie/",
];

const routes = {
  fr: (project) => `fr/projets/${project.slug}`,
  en: (project) => `en/projects/${project.slug}`,
};

const translations = {
  type: {
    Demoreel: "Demo reel",
    "Vidéoclip": "Music video",
    "Série documentaire": "Documentary series",
    "Série culinaire": "Culinary series",
    "Court-métrage documentaire": "Documentary short",
    "Campagne publicitaire": "Advertising campaign",
    "Motion design": "Motion design",
  },
  role: {
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
  credit: {
    Réalisation: "Direction",
    "Direction de la photographie": "Cinematography",
    "Idée originale": "Original concept",
    Production: "Production",
    Animation: "Host",
    "Conception graphique et motion design": "Design and motion design",
    "Motion design et effets spéciaux": "Motion design and VFX",
    "Motion design additionnel": "Additional motion design",
    Montage: "Editing",
    "Montage additionnel": "Additional editing",
    "Montage et motion design additionnel": "Editing and additional motion design",
    "Montage, colorisation et effets visuels": "Editing, color and VFX",
    "Réalisation / montage": "Direction / editing",
    Colorisation: "Color",
    "Motion design": "Motion design",
    "Design graphique": "Graphic design",
    "Montage online": "Online editing",
    "Conception et montage": "Concept and editing",
    "Animation 2D": "2D animation",
    "Habillage graphique": "Graphic package",
    Scénario: "Written by",
  },
};

const labels = {
  fr: {
    home: "Jérémie Carvalho",
    language: "English",
    media: "Média principal",
    summary: "Résumé",
    role: "Rôle",
    client: "Client",
    credits: "Crédits",
    back: "Retour au portfolio",
    videoTitle: (title) => `Vidéo du projet ${title}`,
    noScriptVideo: "La vidéo intégrée nécessite JavaScript.",
  },
  en: {
    home: "Jeremie Carvalho",
    language: "Français",
    media: "Primary media",
    summary: "Summary",
    role: "Role",
    client: "Client",
    credits: "Credits",
    back: "Back to portfolio",
    videoTitle: (title) => `${title} project video`,
    noScriptVideo: "Embedded video requires JavaScript.",
  },
};

const homepageCopy = {
  fr: {
    updated: "2026-09-30",
    title: "Jérémie Carvalho",
    description:
      "Portfolio de Jérémie Carvalho, monteur et motion designer à Montréal. Découvrez une sélection de projets en montage et en motion design.",
    nav: {
      projects: "Jérémie Carvalho",
      montage: "Montage",
      motion: "Motion design",
      contact: "Contact",
    },
    locale: { toggle: "EN" },
    card: { placeholder: "Image principale" },
    menuToggle: "Ouvrir la navigation",
    primaryNav: "Navigation principale",
    headerSocial: "Liens sociaux",
    email: "Courriel",
    footerSocial: "Liens de bas de page",
    projectsView: "Projets",
    contactView: "Page contact",
    heroPlaceholder: "Vidéo hero à intégrer",
    heroRole: "Monteur & motion designer — Montréal",
    portraitPlaceholder: "Portrait à intégrer",
    contactAbout: [
      "Monteur et motion designer résidant à Montréal.",
      "Je collabore avec des réalisateurs, artistes et équipes de production sur des projets documentaires, de fiction, des séries télé, des vidéoclips et autres.",
      "Ouvert à des collaborations récurrentes ou contractuelles.",
    ],
    contactCopy: "Pour discuter d’un projet ou d’une collaboration, vous pouvez me joindre par courriel.",
    copyright: "© 2026 Jérémie Carvalho. Tous droits réservés.",
    overlay: {
      panelLabel: "Aperçu du projet",
      close: "Fermer le projet",
      iframeTitle: "Vidéo du projet",
      mediaPlaceholder: "Média principal à intégrer",
      credits: "Crédits",
      galleryLabel: "Médias complémentaires",
      navigation: "Navigation entre les projets",
      prev: "Précédent",
      next: "Suivant",
    },
  },
  en: {
    updated: "2026-09-30",
    title: "Jeremie Carvalho",
    description:
      "Portfolio of Jeremie Carvalho, an editor and motion designer based in Montreal. Explore selected editing and motion design work.",
    nav: {
      projects: "Jeremie Carvalho",
      montage: "Editing",
      motion: "Motion design",
      contact: "Contact",
    },
    locale: { toggle: "FR" },
    card: { placeholder: "Main image" },
    menuToggle: "Open navigation",
    primaryNav: "Main navigation",
    headerSocial: "Social links",
    email: "Email",
    footerSocial: "Footer links",
    projectsView: "Projects",
    contactView: "Contact page",
    heroPlaceholder: "Hero video placeholder",
    heroRole: "Editor & motion designer — Montreal",
    portraitPlaceholder: "Portrait placeholder",
    contactAbout: [
      "Editor and motion designer based in Montreal.",
      "I collaborate with directors, artists, and production teams on documentaries, fiction, TV series, music videos, and other screen-based projects.",
      "Available for recurring collaborations and contract-based work.",
    ],
    contactCopy: "To discuss a project or collaboration, feel free to reach out by email.",
    copyright: "© 2026 Jeremie Carvalho. All rights reserved.",
    overlay: {
      panelLabel: "Project preview",
      close: "Close project",
      iframeTitle: "Project video",
      mediaPlaceholder: "Main media placeholder",
      credits: "Credits",
      galleryLabel: "Supporting media",
      navigation: "Project navigation",
      prev: "Previous",
      next: "Next",
    },
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function replaceElementContent(html, marker, value) {
  const pattern = new RegExp(
    `(<[^>]*data-i18n="${escapeRegExp(marker)}"[^>]*>)[\\s\\S]*?(</[^>]+>)`,
  );

  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

function replaceLocalizedAttribute(html, attribute, marker, value) {
  const pattern = new RegExp(`<[^>]*data-i18n-${attribute}="${escapeRegExp(marker)}"[^>]*>`, "g");

  return html.replace(pattern, (tag) => tag.replace(new RegExp(`${attribute}="[^"]*"`), `${attribute}="${escapeHtml(value)}"`));
}

function toAssetPath(filePath) {
  return path.relative(rootDirectory, filePath).split(path.sep).join("/");
}

function readImageDimensions(filePath) {
  const data = fs.readFileSync(filePath);

  if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }

  if (data.toString("ascii", 0, 4) === "GIF8") {
    return { width: data.readUInt16LE(6), height: data.readUInt16LE(8) };
  }

  if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    if (data.toString("ascii", 12, 16) === "VP8X") {
      return {
        width: 1 + data.readUIntLE(24, 3),
        height: 1 + data.readUIntLE(27, 3),
      };
    }

    if (data.toString("ascii", 12, 16) === "VP8 " && data.subarray(23, 26).equals(Buffer.from([0x9d, 0x01, 0x2a]))) {
      return {
        width: data.readUInt16LE(26) & 0x3fff,
        height: data.readUInt16LE(28) & 0x3fff,
      };
    }
  }

  if (data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    const startOfFrameMarkers = new Set([
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
    ]);

    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = data[offset + 1];
      const length = data.readUInt16BE(offset + 2);

      if (startOfFrameMarkers.has(marker)) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
      }

      offset += 2 + length;
    }
  }

  return null;
}

function findMediaFile(directory, basename, extensions) {
  const mediaDirectory = path.join(rootDirectory, directory);
  const extension = extensions.find((candidate) => fs.existsSync(path.join(mediaDirectory, `${basename}.${candidate}`)));

  return extension ? path.join(mediaDirectory, `${basename}.${extension}`) : null;
}

function mediaAsset(directory, basename, extensions, { dimensions = false } = {}) {
  const filePath = findMediaFile(directory, basename, extensions);

  if (!filePath) {
    return null;
  }

  const asset = { src: toAssetPath(filePath) };
  if (dimensions) {
    Object.assign(asset, readImageDimensions(filePath) ?? {});
  }

  return asset;
}

function projectMediaAssets(project) {
  const directory = `assets/media/projects/${project.slug}`;

  return {
    cardMain: mediaAsset(directory, "card-main", imageExtensions, { dimensions: true }),
    coverVideo: mediaAsset(directory, "cover-video", videoExtensions),
    coverImage: mediaAsset(directory, "cover-image", imageExtensions, { dimensions: true }),
    gallery: [1, 2].map((index) =>
      mediaAsset(directory, `gallery-${String(index).padStart(2, "0")}`, imageExtensions, { dimensions: true }),
    ),
  };
}

function buildMediaManifest() {
  return {
    hero: {
      video: mediaAsset("assets/media/hero", "hero-video", videoExtensions),
      poster: mediaAsset("assets/media/hero", "hero-poster", imageExtensions, { dimensions: true }),
    },
    portrait: mediaAsset("assets/media/portrait", "contact-portrait", imageExtensions, { dimensions: true }),
    projects: Object.fromEntries(projects.map((project) => [project.slug, projectMediaAssets(project)])),
  };
}

function findMedia(slug, basename) {
  const filePath = findMediaFile(`assets/media/projects/${slug}`, basename, imageExtensions);

  return filePath ? path.basename(filePath) : null;
}

function localizeSubtitle(subtitle, locale) {
  if (locale === "fr") return subtitle;

  return Object.entries(translations.type)
    .sort(([first], [second]) => second.length - first.length)
    .reduce((value, [source, target]) => value.replace(source, target), subtitle);
}

function localizeProject(project, locale) {
  const localized = project.locales?.[locale] ?? {};
  const isEnglish = locale === "en";

  return {
    ...project,
    ...localized,
    subtitle: localized.subtitle ?? localizeSubtitle(project.subtitle, locale),
    type: localized.type ?? (isEnglish ? translations.type[project.type] ?? project.type : project.type),
    role: localized.role ?? (isEnglish ? translations.role[project.role] ?? project.role : project.role),
    text: localized.text ?? project.text ?? [],
    credits: localized.credits ?? (project.credits ?? []).map((credit) => ({
      ...credit,
      label: isEnglish ? translations.credit[credit.label] ?? credit.label : credit.label,
    })),
  };
}

function projectImagePath(project, prefix) {
  const filename = findMedia(project.slug, "card-main");
  return filename ? `${prefix}assets/media/projects/${project.slug}/${filename}` : null;
}

function personSchema(locale) {
  const copy = homepageCopy[locale];

  return {
    "@type": "Person",
    "@id": `${siteOrigin}/#person`,
    name: copy.title,
    url: `${siteOrigin}/${locale}/`,
    jobTitle: copy.heroRole,
    sameAs: socialProfiles,
  };
}

function projectSchema(project, content, locale, canonicalUrl, imageUrl) {
  const schema = {
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#project`,
    name: content.title,
    description: content.text[0] ?? content.title,
    genre: content.type,
    inLanguage: locale,
    url: canonicalUrl,
    contributor: {
      "@type": "Role",
      roleName: content.role,
      contributor: { "@id": `${siteOrigin}/#person` },
    },
  };

  if (imageUrl) {
    schema.image = imageUrl;
  }

  return schema;
}

function homepageSchema(locale) {
  const homepageUrl = `${siteOrigin}/${locale}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(locale),
      {
        "@type": "ItemList",
        "@id": `${homepageUrl}#projects`,
        name: homepageCopy[locale].nav.projects,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: localizeProject(project, locale).title,
          url: `${siteOrigin}/${routes[locale](project)}/`,
        })),
      },
    ],
  };
}

function renderCredits(credits) {
  return credits
    .map(
      (credit) => `
              <div>
                <dt>${escapeHtml(credit.label)}</dt>
                <dd>${escapeHtml(credit.value)}</dd>
              </div>`,
    )
    .join("");
}

function renderText(text) {
  return text.map((paragraph) => `              <p>${escapeHtml(paragraph)}</p>`).join("\n");
}

function renderPrimaryMedia(project, content, copy) {
  const imagePath = projectImagePath(project, "../../../");
  const imageAsset = projectMediaAssets(project).cardMain;
  const imageDimensions = imageAsset?.width && imageAsset?.height
    ? ` width="${imageAsset.width}" height="${imageAsset.height}"`
    : "";
  const fallback = imagePath
    ? `
           <noscript>
             <div class="project-page__media-fallback">
                <img src="${imagePath}" alt="${escapeHtml(content.title)}"${imageDimensions} />
                <p>${copy.noScriptVideo}</p>
              </div>
           </noscript>`
    : "";

  if (project.vimeo) {
    return `
         <div class="project-page__media-frame">
           <iframe
             src="${escapeHtml(project.vimeo)}"
             title="${escapeHtml(copy.videoTitle(content.title))}"
             allow="autoplay; fullscreen; picture-in-picture"
             allowfullscreen
           ></iframe>${fallback}
         </div>`;
  }

  if (imagePath) {
    return `
         <div class="project-page__media-frame">
           <img class="project-page__media-image" src="${imagePath}" alt="${escapeHtml(content.title)}"${imageDimensions} decoding="async" fetchpriority="high" />
         </div>`;
  }

  return `
         <div class="project-page__media-frame">
           <p>${copy.noScriptVideo}</p>
         </div>`;
}

function renderPage(project, locale) {
  const content = localizeProject(project, locale);
  const copy = labels[locale];
  const route = routes[locale](project);
  const canonicalUrl = `${siteOrigin}/${route}/`;
  const alternateLocale = locale === "fr" ? "en" : "fr";
  const alternateUrl = `${siteOrigin}/${routes[alternateLocale](project)}/`;
  const homeUrl = `../../../${locale}/`;
  const imagePath = projectImagePath(project, "");
  const imageUrl = imagePath ? `${siteOrigin}/${imagePath}` : "";
  const documentTitle = `${content.title} | ${copy.home}`;
  const description = content.text[0] ?? content.title;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [personSchema(locale), projectSchema(project, content, locale, canonicalUrl, imageUrl)],
  };
  const client = content.client?.value
    ? `
           <div>
             <dt>${copy.client}</dt>
             <dd>${escapeHtml(content.client.value)}</dd>
           </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(documentTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="fr" href="${siteOrigin}/${routes.fr(project)}/" />
    <link rel="alternate" hreflang="en" href="${siteOrigin}/${routes.en(project)}/" />
    <meta property="og:title" content="${escapeHtml(documentTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:locale" content="${locale === "fr" ? "fr_CA" : "en_CA"}" />
    <meta property="og:locale:alternate" content="${locale === "fr" ? "en_CA" : "fr_CA"}" />
${imageUrl ? `    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:alt" content="${escapeHtml(content.title)}" />
` : ""}    <script type="application/ld+json">${serializeJsonLd(schema)}</script>
    <link rel="stylesheet" href="../../../styles.css" />
  </head>
  <body>
    <main class="project-page">
      <nav class="project-page__nav" aria-label="${copy.home}">
        <a href="${homeUrl}">${copy.back}</a>
        <a href="${alternateUrl}">${copy.language}</a>
      </nav>

      <header class="project-page__header">
        <p class="project-page__eyebrow">${escapeHtml(content.type)}</p>
        <h1>${escapeHtml(content.title)}</h1>
        <p class="project-page__subtitle">${escapeHtml(content.subtitle)}</p>
      </header>

      <section class="project-page__media" aria-labelledby="project-media-title">
        <h2 id="project-media-title">${copy.media}</h2>${renderPrimaryMedia(project, content, copy)}
      </section>

      <section class="project-page__details" aria-labelledby="project-summary-title">
        <h2 id="project-summary-title">${copy.summary}</h2>
        <dl class="project-page__meta">
          <div>
            <dt>${copy.role}</dt>
            <dd>${escapeHtml(content.role)}</dd>
          </div>${client}
        </dl>
        ${content.text.length ? `<div class="project-page__text">\n${renderText(content.text)}\n         </div>` : ""}
      </section>

      <section class="project-page__credits" aria-labelledby="project-credits-title">
        <h2 id="project-credits-title">${copy.credits}</h2>
        <dl class="project-page__meta project-page__meta--credits">
${renderCredits(content.credits)}
        </dl>
      </section>
    </main>
  </body>
</html>
`;
}

function renderCard(project, locale, { root = false } = {}) {
  const content = localizeProject(project, locale);
  const assetPrefix = root ? "./" : "../";
  const imageAsset = projectMediaAssets(project).cardMain;
  const imagePath = imageAsset ? `${assetPrefix}${imageAsset.src}` : null;
  const projectRoute = routes[locale](project).replace(`${locale}/`, "");
  const projectPath = root ? `./${routes[locale](project)}/` : `./${projectRoute}/`;
  const image = imagePath
    ? `<img class="project-card__image" src="${imagePath}" alt="" width="${imageAsset.width ?? 1}" height="${imageAsset.height ?? 1}" loading="lazy" decoding="async" sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 25vw" />`
    : `<img class="project-card__image" alt="" hidden />`;

  return `
              <article class="project-card-shell">
                <a
                  class="project-card"
                  href="${projectPath}"
                  data-project="${escapeHtml(project.slug)}"
                  aria-haspopup="dialog"
                >
                  <span class="project-card__surface project-card__surface--rest" aria-hidden="true">
                    ${image}
                  <span class="project-card__placeholder-label">${locale === "en" ? "Main image" : "Image principale"}</span>
                  </span>
                  <span class="project-card__info" aria-hidden="true">
                    <strong class="project-card__title">${escapeHtml(content.title)}</strong>
                    <span class="project-card__meta">
                      <span class="project-card__type">${escapeHtml(content.type)}</span>
                      <span class="project-card__role">${escapeHtml(content.role)}</span>
                    </span>
                  </span>
                  <span class="sr-only project-card__sr-label">${locale === "en" ? "Open project" : "Ouvrir le projet"} ${escapeHtml(content.title)}</span>
                </a>
              </article>`;
}

function renderHomepage(homepage, locale, { root = false } = {}) {
  const startMarker = "<!-- PROJECT_CARDS_START -->";
  const endMarker = "<!-- PROJECT_CARDS_END -->";
  const start = homepage.indexOf(startMarker);
  const end = homepage.indexOf(endMarker);

  assert.ok(start >= 0 && end > start, "homepage project card markers are missing");

  const copy = homepageCopy[locale];
  let rendered = `${homepage.slice(0, start + startMarker.length)}${projects
    .map((project) => renderCard(project, locale, { root }))
    .join("\n")}${homepage.slice(end)}`;

  rendered = rendered.replace(/<html lang="[^"]+">/, `<html lang="${locale}">`);
  rendered = replaceElementContent(rendered, "title", copy.title);
  rendered = replaceLocalizedAttribute(rendered, "content", "description", copy.description);
  rendered = replaceElementContent(rendered, "nav.projects", copy.nav.projects);
  rendered = replaceElementContent(rendered, "nav.montage", copy.nav.montage);
  rendered = replaceElementContent(rendered, "nav.motion", copy.nav.motion);
  rendered = replaceElementContent(rendered, "nav.contact", copy.nav.contact);
  rendered = replaceElementContent(rendered, "locale.toggle", copy.locale.toggle);
  rendered = replaceElementContent(rendered, "card.placeholder", copy.card.placeholder);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "menuToggle", copy.menuToggle);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "primaryNav", copy.primaryNav);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "headerSocial", copy.headerSocial);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "email", copy.email);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "footerSocial", copy.footerSocial);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "projectsView", copy.projectsView);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "contactView", copy.contactView);
  rendered = replaceElementContent(rendered, "heroPlaceholder", copy.heroPlaceholder);
  rendered = replaceElementContent(rendered, "heroRole", copy.heroRole);
  rendered = replaceElementContent(rendered, "portraitPlaceholder", copy.portraitPlaceholder);
  copy.contactAbout.forEach((value, index) => {
    rendered = replaceElementContent(rendered, `contactAbout.${index}`, value);
  });
  rendered = replaceElementContent(rendered, "contactCopy", copy.contactCopy);
  rendered = replaceElementContent(rendered, "copyright", copy.copyright);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "overlay.panelLabel", copy.overlay.panelLabel);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "overlay.close", copy.overlay.close);
  rendered = replaceLocalizedAttribute(rendered, "title", "overlay.iframeTitle", copy.overlay.iframeTitle);
  rendered = replaceElementContent(rendered, "overlay.mediaPlaceholder", copy.overlay.mediaPlaceholder);
  rendered = replaceElementContent(rendered, "overlay.credits", copy.overlay.credits);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "overlay.galleryLabel", copy.overlay.galleryLabel);
  rendered = replaceLocalizedAttribute(rendered, "aria-label", "overlay.navigation", copy.overlay.navigation);
  rendered = replaceElementContent(rendered, "overlay.prev", copy.overlay.prev);
  rendered = replaceElementContent(rendered, "overlay.next", copy.overlay.next);

  const homepageUrls = {
    fr: `${siteOrigin}/fr/`,
    en: `${siteOrigin}/en/`,
  };
  const languageLinks = `<!-- HOMEPAGE_LOCALE_LINKS -->
    <link rel="canonical" href="${homepageUrls[locale]}" />
    <link rel="alternate" hreflang="fr" href="${homepageUrls.fr}" />
    <link rel="alternate" hreflang="en" href="${homepageUrls.en}" />
    <meta property="og:title" content="${escapeHtml(copy.title)}" />
    <meta property="og:description" content="${escapeHtml(copy.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${homepageUrls[locale]}" />
    <meta property="og:image" content="${siteOrigin}/${homepageImagePath}" />
    <meta property="og:image:alt" content="${escapeHtml(copy.title)}" />
    <meta property="og:locale" content="${locale === "fr" ? "fr_CA" : "en_CA"}" />
    <meta property="og:locale:alternate" content="${locale === "fr" ? "en_CA" : "fr_CA"}" />
    <script type="application/ld+json">${serializeJsonLd(homepageSchema(locale))}</script>`;
  rendered = rendered.replace(
    /<!-- HOMEPAGE_LOCALE_LINKS -->[\s\S]*?(?=\s*<link rel="stylesheet")/,
    languageLinks,
  );

  const alternateLocale = locale === "fr" ? "en" : "fr";
  const localeLink = root ? `./${alternateLocale}/` : `../${alternateLocale}/`;
  rendered = rendered.replace(
    /(<a[^>]*data-locale-toggle[^>]*href=")[^"]*("[^>]*>)/,
    `$1${localeLink}$2`,
  );

  if (!root) {
    rendered = rendered
      .replaceAll('href="./styles.css"', 'href="../styles.css"')
      .replaceAll('src="./media-manifest.js"', 'src="../media-manifest.js"')
      .replaceAll('src="./project-content.js"', 'src="../project-content.js"')
      .replaceAll('src="./main.js"', 'src="../main.js"');
  }

  return rendered;
}

function renderMediaManifest() {
  return `window.portfolioMedia = ${serializeJsonLd(buildMediaManifest())};`;
}

function outputPath(project, locale) {
  return path.join(rootDirectory, routes[locale](project), "index.html");
}

function sitemapEntries() {
  return [
    ...["fr", "en"].map((locale) => ({
      url: `${siteOrigin}/${locale}/`,
      lastmod: homepageCopy[locale].updated,
    })),
    ...projects.flatMap((project) =>
      ["fr", "en"].map((locale) => ({
        url: `${siteOrigin}/${routes[locale](project)}/`,
        lastmod: project.updated,
      })),
    ),
  ];
}

function renderSitemap() {
  const urls = sitemapEntries()
    .map(
      ({ url, lastmod }) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /
Sitemap: ${siteOrigin}/sitemap.xml
`;
}

function generate() {
  const homepage = fs.readFileSync(path.join(rootDirectory, "index.html"), "utf8");
  fs.writeFileSync(path.join(rootDirectory, "index.html"), renderHomepage(homepage, "fr", { root: true }));

  ["fr", "en"].forEach((locale) => {
    const destination = path.join(rootDirectory, locale, "index.html");
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, renderHomepage(homepage, locale));
  });

  projects.forEach((project) => {
    ["fr", "en"].forEach((locale) => {
      const destination = outputPath(project, locale);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, renderPage(project, locale));
    });
  });

  fs.writeFileSync(path.join(rootDirectory, "sitemap.xml"), renderSitemap());
  fs.writeFileSync(path.join(rootDirectory, "robots.txt"), renderRobots());
  fs.writeFileSync(path.join(rootDirectory, "media-manifest.js"), `${renderMediaManifest()}\n`);
}

function verify() {
  const homepage = fs.readFileSync(path.join(rootDirectory, "index.html"), "utf8");
  const localizedHomepages = {
    fr: fs.readFileSync(path.join(rootDirectory, "fr", "index.html"), "utf8"),
    en: fs.readFileSync(path.join(rootDirectory, "en", "index.html"), "utf8"),
  };
  const sitemap = fs.readFileSync(path.join(rootDirectory, "sitemap.xml"), "utf8");
  const robots = fs.readFileSync(path.join(rootDirectory, "robots.txt"), "utf8");
  const mediaManifest = fs.readFileSync(path.join(rootDirectory, "media-manifest.js"), "utf8");

  assert.equal((homepage.match(/data-project=/g) ?? []).length, projects.length, "homepage catalog is incomplete");
  assert.equal((localizedHomepages.fr.match(/data-project=/g) ?? []).length, projects.length, "French homepage catalog is incomplete");
  assert.equal((localizedHomepages.en.match(/data-project=/g) ?? []).length, projects.length, "English homepage catalog is incomplete");

  ["fr", "en"].forEach((locale) => {
    const generated = localizedHomepages[locale];
    const alternateLocale = locale === "fr" ? "en" : "fr";
    const homepageUrl = `${siteOrigin}/${locale}/`;

    assert.ok(generated.includes(`<html lang="${locale}">`));
    assert.ok(generated.includes(`<link rel="canonical" href="${homepageUrl}" />`));
    assert.ok(generated.includes(`hreflang="${alternateLocale}"`));
    assert.ok(generated.includes(`href="../${alternateLocale}/"`));
    assert.ok(generated.includes(`<meta property="og:url" content="${homepageUrl}" />`));
    assert.ok(generated.includes(`<meta property="og:image" content="${siteOrigin}/${homepageImagePath}" />`));
    assert.ok(generated.includes(`<meta property="og:locale" content="${locale === "fr" ? "fr_CA" : "en_CA"}" />`));
    assert.ok(generated.includes('type="application/ld+json"'));
    assert.ok(generated.includes('"@type":"Person"'));
    assert.ok(generated.includes('"@type":"ItemList"'));
    assert.ok(generated.includes('<video class="hero__video" muted autoplay loop playsinline preload="none" hidden></video>'));
    assert.ok(!generated.includes("?lang="));
  });

  assert.ok(homepage.includes('href="./en/"'));
  assert.ok(localizedHomepages.fr.includes('href="../en/"'));
  assert.ok(localizedHomepages.en.includes('href="../fr/"'));

  projects.forEach((project) => {
    const mediaDirectory = path.join(rootDirectory, "assets", "media", "projects", project.slug);
    assert.ok(fs.existsSync(mediaDirectory), `${project.slug} media directory is missing`);

    ["fr", "en"].forEach((locale) => {
      const generated = fs.readFileSync(outputPath(project, locale), "utf8");
      const content = localizeProject(project, locale);
      const route = routes[locale](project);

      if (locale === "en") {
        assert.ok(project.locales?.en, `${project.slug} is missing an explicit English translation`);
      }

      assert.equal(generated, renderPage(project, locale), `${locale}/${project.slug} page is stale`);
      assert.ok(generated.includes(`<h1>${escapeHtml(content.title)}</h1>`));
      assert.ok(generated.includes(escapeHtml(content.role)));
      content.text.forEach((paragraph) => assert.ok(generated.includes(escapeHtml(paragraph))));
      content.credits.forEach((credit) => assert.ok(generated.includes(escapeHtml(credit.value))));
      assert.ok(generated.includes(`href="${siteOrigin}/${route}/"`));
      assert.ok(generated.includes(`href="${siteOrigin}/${routes[locale === "fr" ? "en" : "fr"](project)}/"`));
      assert.ok(generated.includes(`href="../../../${locale}/"`));
      assert.ok(generated.includes(`<meta property="og:url" content="${siteOrigin}/${route}/" />`));
      assert.ok(generated.includes('type="application/ld+json"'));
      assert.ok(generated.includes('"@type":"CreativeWork"'));
      assert.ok(generated.includes(`"inLanguage":"${locale}"`));
      const imagePath = projectImagePath(project, "");
      if (imagePath) {
        assert.ok(generated.includes(`<meta property="og:image" content="${siteOrigin}/${imagePath}" />`));
      }
    });

    assert.ok(homepage.includes(`href="./fr/projets/${project.slug}/"`));
    assert.ok(localizedHomepages.fr.includes(`href="./projets/${project.slug}/"`));
    assert.ok(localizedHomepages.en.includes(`href="./projects/${project.slug}/"`));
  });

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(
    sitemapUrls,
    sitemapEntries().map(({ url }) => url),
    "sitemap must contain only canonical generated URLs",
  );
  sitemapEntries().forEach(({ lastmod }) => {
    assert.match(lastmod, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(sitemap.includes(`<lastmod>${lastmod}</lastmod>`));
  });
  assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
  assert.ok(robots.includes("Allow: /"));
  const generatedMediaManifest = mediaManifest
    .replace(/^window\.portfolioMedia = /, "")
    .replace(/;\s*$/, "");
  assert.deepEqual(JSON.parse(generatedMediaManifest), buildMediaManifest(), "media manifest is stale");
}

if (require.main === module) {
  if (process.argv.includes("--check")) {
    verify();
    console.log(`Ticket 5 discovery metadata is valid for ${projects.length} projects.`);
  } else {
    generate();
    console.log(`Generated French and English pages, sitemap, and robots.txt for ${projects.length} projects.`);
  }
}

module.exports = { generate, renderPage, verify };
