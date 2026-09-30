const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const catalog = require("./project-content.js");

const rootDirectory = __dirname;
const siteOrigin = "https://jeremiecarvalho.com";
const projects = Object.values(catalog);
const imageExtensions = ["avif", "webp", "png", "jpg", "jpeg"];

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

function findMedia(slug, basename) {
  const mediaDirectory = path.join(rootDirectory, "assets", "media", "projects", slug);
  const extension = imageExtensions.find((candidate) => fs.existsSync(path.join(mediaDirectory, `${basename}.${candidate}`)));

  return extension ? `${basename}.${extension}` : null;
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
  const fallback = imagePath
    ? `
           <noscript>
             <div class="project-page__media-fallback">
               <img src="${imagePath}" alt="${escapeHtml(content.title)}" />
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
           <img class="project-page__media-image" src="${imagePath}" alt="${escapeHtml(content.title)}" />
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
    <meta name="description" content="${escapeHtml(content.text[0] ?? content.title)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="fr" href="${siteOrigin}/${routes.fr(project)}/" />
    <link rel="alternate" hreflang="en" href="${siteOrigin}/${routes.en(project)}/" />
    <meta property="og:title" content="${escapeHtml(documentTitle)}" />
    <meta property="og:description" content="${escapeHtml(content.text[0] ?? content.title)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
${imageUrl ? `    <meta property="og:image" content="${imageUrl}" />\n` : ""}    <link rel="stylesheet" href="../../../styles.css" />
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
  const imagePath = projectImagePath(project, assetPrefix);
  const projectRoute = routes[locale](project).replace(`${locale}/`, "");
  const projectPath = root ? `./${routes[locale](project)}/` : `./${projectRoute}/`;
  const image = imagePath
    ? `<img class="project-card__image" src="${imagePath}" alt="" />`
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
    <link rel="alternate" hreflang="en" href="${homepageUrls.en}" />`;
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
      .replaceAll('src="./project-content.js"', 'src="../project-content.js"')
      .replaceAll('src="./main.js"', 'src="../main.js"');
  }

  return rendered;
}

function outputPath(project, locale) {
  return path.join(rootDirectory, routes[locale](project), "index.html");
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
}

function verify() {
  const homepage = fs.readFileSync(path.join(rootDirectory, "index.html"), "utf8");
  const localizedHomepages = {
    fr: fs.readFileSync(path.join(rootDirectory, "fr", "index.html"), "utf8"),
    en: fs.readFileSync(path.join(rootDirectory, "en", "index.html"), "utf8"),
  };

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
    });

    assert.ok(homepage.includes(`href="./fr/projets/${project.slug}/"`));
    assert.ok(localizedHomepages.fr.includes(`href="./projets/${project.slug}/"`));
    assert.ok(localizedHomepages.en.includes(`href="./projects/${project.slug}/"`));
  });
}

if (require.main === module) {
  if (process.argv.includes("--check")) {
    verify();
    console.log(`Ticket 4 localized pages are valid for ${projects.length} projects.`);
  } else {
    generate();
    console.log(`Generated French and English pages for ${projects.length} projects.`);
  }
}

module.exports = { generate, renderPage, verify };
