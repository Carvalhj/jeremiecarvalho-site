# Assets

Cette arborescence contient les médias locaux du site. Les noms et formats des médias chargés automatiquement ci-dessous correspondent à la logique de [`main.js`](../main.js); le CV est décrit séparément comme une intégration future.

## Arborescence

```text
assets/
  docs/
    jeremie-carvalho-cv.pdf  (optionnel, intégration future)
  media/
    hero/
      hero-video.*
      hero-poster.*
    portrait/
      contact-portrait.*
    projects/
      <slug>/
        card-main.*
        cover-video.*
        cover-image.*
        gallery-01.*
        gallery-02.*
```

## Raccourci

- `hero-video.*` alimente la vidéo hero. Le code cherche les extensions vidéo reconnues.
- `hero-poster.*` sert d'image de secours si la vidéo hero n'est pas présente.
- `contact-portrait.*` remplace le placeholder de la page Contact.
- `card-main.*` est l'image visible au repos dans la grille.
- `cover-video.*` ou `cover-image.*` alimente le média principal du panneau projet.
- `gallery-01.*` et `gallery-02.*` alimentent les médias complémentaires du panneau projet.

`card-hover` n'est pas découvert par le code actuel et ne doit pas être ajouté comme média pris en charge.

## Slugs de projets

- `demoreel`
- `langlois-dragonfly`
- `onf-bww`
- `onf-paradaiz`
- `pc-cdn`
- `onf-tgwcp`
- `stephanie-boulay`
- `donner-le-gout`
- `onf-ledl`
- `elisapie`
- `frank-bourassa`
- `beautes-rebelles`
- `prison-esprit-saint`
- `hanging-on-a-string`
- `zug-island`
- `evinces`
- `tout-doux`
- `ascension-pour-cafe-chaud`
- `zouz`
- `chroniques-vie-ordinaire`
- `naomi-zero-stress`

## Formats recommandes

- Images: `avif`, `webp`, `png`, `jpg`, `jpeg`
- Vidéos: `mp4`, `webm`

Le code essaie ces extensions pour chaque nom, puis garde le placeholder si aucun fichier n'est trouvé. Les icônes sociales visibles dans la page sont intégrées directement dans `index.html`; les fichiers SVG éventuels de `assets/icons/social/` ne sont pas chargés automatiquement.

Le fichier `assets/docs/jeremie-carvalho-cv.pdf` est réservé à une intégration future. Le lien CV de la page est actuellement désactivé.

## Ajouter un nouveau projet

Pour qu'un nouveau projet apparaisse dans le site, il faut faire 2 choses:

1. Ajouter son contenu dans `main.js`.
2. Créer son dossier média dans `assets/media/projects/`.

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

Puis y déposer les fichiers utiles:

- `card-main.*`
- `cover-video.*` ou `cover-image.*`
- `gallery-01.*`
- `gallery-02.*`

### 4. Regles a garder

- Le `slug` doit rester stable: il sert à l'identifiant du projet et au nom du dossier média.
- Les couleurs `palette` servent seulement aux placeholders et aux fonds de secours.
- Si un média manque, le site garde automatiquement son placeholder.
- Si tu renommes un `slug`, renomme aussi son dossier dans `assets/media/projects/`.

### 5. Ou regarder

- Structure et contrat des médias: `assets/README.md`
- Contenu des projets: `main.js`
- Comportement de la grille et du panneau: `main.js`
- Aperçu et procédure générale: `../README.md`
