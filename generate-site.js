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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
  const homeUrl = locale === "en" ? "../../../?lang=en" : "../../../";
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

function renderCard(project) {
  const content = localizeProject(project, "fr");
  const imagePath = projectImagePath(project, "./");
  const image = imagePath
    ? `<img class="project-card__image" src="${imagePath}" alt="" />`
    : `<img class="project-card__image" alt="" hidden />`;

  return `
              <article class="project-card-shell">
                <a
                  class="project-card"
                  href="./fr/projets/${project.slug}/"
                  data-project="${escapeHtml(project.slug)}"
                  aria-haspopup="dialog"
                >
                  <span class="project-card__surface project-card__surface--rest" aria-hidden="true">
                    ${image}
                    <span class="project-card__placeholder-label">Image principale</span>
                  </span>
                  <span class="project-card__info" aria-hidden="true">
                    <strong class="project-card__title">${escapeHtml(content.title)}</strong>
                    <span class="project-card__meta">
                      <span class="project-card__type">${escapeHtml(content.type)}</span>
                      <span class="project-card__role">${escapeHtml(content.role)}</span>
                    </span>
                  </span>
                  <span class="sr-only project-card__sr-label">Ouvrir le projet ${escapeHtml(content.title)}</span>
                </a>
              </article>`;
}

function renderHomepage() {
  const homepagePath = path.join(rootDirectory, "index.html");
  const homepage = fs.readFileSync(homepagePath, "utf8");
  const startMarker = "<!-- PROJECT_CARDS_START -->";
  const endMarker = "<!-- PROJECT_CARDS_END -->";
  const start = homepage.indexOf(startMarker);
  const end = homepage.indexOf(endMarker);

  assert.ok(start >= 0 && end > start, "homepage project card markers are missing");

  return `${homepage.slice(0, start + startMarker.length)}${projects.map(renderCard).join("\n")}${homepage.slice(end)}`;
}

function outputPath(project, locale) {
  return path.join(rootDirectory, routes[locale](project), "index.html");
}

function generate() {
  fs.writeFileSync(path.join(rootDirectory, "index.html"), renderHomepage());

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
  assert.equal((homepage.match(/data-project=/g) ?? []).length, projects.length, "homepage catalog is incomplete");

  projects.forEach((project) => {
    const mediaDirectory = path.join(rootDirectory, "assets", "media", "projects", project.slug);
    assert.ok(fs.existsSync(mediaDirectory), `${project.slug} media directory is missing`);

    ["fr", "en"].forEach((locale) => {
      const generated = fs.readFileSync(outputPath(project, locale), "utf8");
      const content = localizeProject(project, locale);
      const route = routes[locale](project);

      assert.equal(generated, renderPage(project, locale), `${locale}/${project.slug} page is stale`);
      assert.ok(generated.includes(`<h1>${escapeHtml(content.title)}</h1>`));
      assert.ok(generated.includes(escapeHtml(content.role)));
      content.text.forEach((paragraph) => assert.ok(generated.includes(escapeHtml(paragraph))));
      content.credits.forEach((credit) => assert.ok(generated.includes(escapeHtml(credit.value))));
      assert.ok(generated.includes(`href="${siteOrigin}/${route}/"`));
      assert.ok(generated.includes(`href="${siteOrigin}/${routes[locale === "fr" ? "en" : "fr"](project)}/"`));
      assert.ok(generated.includes(`href="${locale === "en" ? "../../../?lang=en" : "../../../"}"`));
    });

    assert.ok(homepage.includes(`href="./fr/projets/${project.slug}/"`));
  });
}

if (require.main === module) {
  if (process.argv.includes("--check")) {
    verify();
    console.log(`Ticket 3 static pages are valid for ${projects.length} projects.`);
  } else {
    generate();
    console.log(`Generated French and English pages for ${projects.length} projects.`);
  }
}

module.exports = { generate, renderPage, verify };
