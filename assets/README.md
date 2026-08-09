# Assets

Le site est maintenant prepare pour charger automatiquement les medias suivants, sans modifier le code.

## Arborescence

```text
assets/
  docs/
    jeremie-carvalho-cv.pdf
  icons/
    social/
      mail.svg
      instagram.svg
      linkedin.svg
  media/
    hero/
      hero-video.mp4
      hero-poster.jpg
    portrait/
      contact-portrait.jpg
    projects/
      <slug>/
        card-main.jpg
        card-hover.png
        cover-video.mp4
        cover-image.jpg
        gallery-01.jpg
        gallery-02.jpg
```

## Raccourci

- `hero-video.*` alimente la bande video en haut de la page d'accueil.
- `hero-poster.*` sert d'image de secours si la video n'est pas encore presente.
- `contact-portrait.*` remplace automatiquement le placeholder de la page Contact.
- `card-main.*` est l'image visible au repos dans la grille.
- `card-hover.*` est l'image informative affichee au hover sur desktop et au tap sur mobile.
- `cover-video.*` ou `cover-image.*` alimente le media principal du panneau projet.
- `gallery-01.*` et `gallery-02.*` alimentent les medias complementaires du panneau projet.

## Slugs de projets

- `stephanie-boulay`
- `demoreel-2023`
- `elisapie`
- `frank-bourassa`
- `beautes-rebelles`
- `prison-esprit-saint`
- `hanging-on-a-string`
- `zug-island`
- `evinces`
- `tout-doux`
- `donner-le-gout`
- `ascension-pour-cafe-chaud`
- `chroniques-vie-ordinaire`
- `naomi-zero-stress`

## Formats recommandes

- Images: `avif`, `webp`, `png`, `jpg`, `jpeg`
- Videos: `mp4`, `webm`
- Icones: `svg`, `png`, `webp`

Le code essaie plusieurs extensions pour chaque nom, puis garde le placeholder si aucun fichier n'est trouve.

## Ajouter un nouveau projet

Pour qu'un nouveau projet apparaisse dans le site, il faut faire 2 choses:

1. Ajouter son contenu dans `main.js`
2. Creer son dossier media dans `assets/media/projects/`

### 1. Ajouter l'objet projet dans `main.js`

Chaque projet suit cette structure:

```js
{
  slug: "mon-nouveau-projet",
  title: "Mon nouveau projet",
  subtitle: "Vidéoclip, 2026",
  type: "Vidéoclip",
  role: "Montage",
  client: "Nom du client",
  text: [
    "Premier paragraphe court.",
    "Deuxième paragraphe court.",
  ],
  credits: [
    { label: "Réalisation", value: "Nom" },
    { label: "Montage", value: "Jérémie Carvalho" },
  ],
  views: ["projects", "montage"],
  palette: {
    base: "#1f1f1f",
    accent: "#8f8f8f",
    infoStart: "#2c2c2c",
    infoEnd: "#090909",
  },
}
```

### 2. Choisir les bonnes `views`

- `projects`: apparait dans la grille principale
- `montage`: apparait dans le filtre Montage
- `motion`: apparait dans le filtre Motion design

Exemples:

- `["projects", "montage"]`
- `["projects", "motion"]`
- `["projects", "montage", "motion"]`

### 3. Creer le dossier media du projet

Creer:

```text
assets/media/projects/mon-nouveau-projet/
```

Puis y deposer les fichiers utiles:

- `card-main.*`
- `card-hover.*`
- `cover-video.*` ou `cover-image.*`
- `gallery-01.*`
- `gallery-02.*`

### 4. Regles a garder

- Le `slug` doit rester stable: il sert a l'URL et au nom du dossier media.
- Les couleurs `palette` servent seulement aux placeholders et aux fonds de secours.
- Si un media manque, le site garde automatiquement son placeholder.
- Si tu renommes un `slug`, pense a renommer aussi son dossier dans `assets/media/projects/`.

### 5. Ou regarder

- Structure des medias: `assets/README.md`
- Contenu des projets: `main.js`
- Comportement de la grille et de l'overlay: `main.js`
