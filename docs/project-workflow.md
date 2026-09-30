# Ajouter un projet

Ce document resume la marche a suivre pour ajouter un nouveau projet au portfolio.

## Etape 1: ajouter le contenu

Ouvrir [`project-content.js`](../project-content.js) et ajouter un nouvel objet dans `portfolioProjectCatalog`.

Champs obligatoires:

- `slug`
- `updated` (date ISO `YYYY-MM-DD` utilisée par le sitemap)
- `title`
- `subtitle`
- `type`
- `role`
- `credits`
- `views`
- `palette`

Pour publier le projet dans les deux langues, ajouter aussi `locales.en` avec le titre, le sous-titre, le type, le role, les metadonnees, les credits et le texte anglais.

Champs optionnels:

- `client`: objet `{ label, value }` affiché dans les métadonnées de la fiche. Le label peut être adapté au contexte ou le champ peut être omis.
- `text`: tableau de paragraphes descriptifs; il peut être omis ou rester vide jusqu'à ce que le contenu soit prêt.

Exemple:

```js
{
  slug: "mon-nouveau-projet",
  updated: "2026-09-30",
  title: "Mon nouveau projet",
  subtitle: "Documentaire, 2026",
  type: "Documentaire",
  role: "Montage et motion design",
  client: { label: "Production", value: "Nom de la production" },
  text: [
    "Projet realise pour ...",
    "J'y ai assure ...",
  ],
  credits: [
    { label: "Réalisation", value: "Nom" },
    { label: "Montage et motion design", value: "Jérémie Carvalho" },
  ],
  views: ["projects", "montage", "motion"],
  palette: {
    base: "#1d1d1d",
    accent: "#9a8770",
    infoStart: "#3b3127",
    infoEnd: "#090909",
  },
}
```

## Etape 2: choisir ou le projet apparait

Le champ `views` controle la selection visible dans la grille:

- `projects`: vue principale
- `montage`: filtre Montage
- `motion`: filtre Motion design

## Etape 3: creer le dossier medias

Creer un dossier avec exactement le meme nom que le `slug`:

```text
assets/media/projects/mon-nouveau-projet/
```

Tu peux ensuite y déposer:

- `card-main.*`
- `cover-video.*` ou `cover-image.*`
- `gallery-01.*`
- `gallery-02.*`

Les noms et extensions reconnus sont documentés dans [`assets/README.md`](../assets/README.md). `card-hover` n'est pas pris en charge par le code actuel.

## Etape 4: verifier

- Si le média principal ou l'image de carte est absent, le placeholder reste visible.
- Les médias complémentaires absents ne créent aucun emplacement dans la galerie.
- Si le `slug` du projet et le nom du dossier ne correspondent pas, rien ne se chargera.
- Si tu veux changer l'ordre de la grille et de la navigation, deplace simplement l'objet dans `portfolioProjectCatalog`.

## Notes utiles

- Le panneau projet et la navigation precedent/suivant reutilisent l'ordre de `portfolioProjectCatalog`.
- Les filtres `Montage` et `Motion design` ne sont pas des pages differentes: ils reutilisent la meme grille avec une selection differente.
- Le projet peut avoir seulement une image de couverture si tu n'as pas encore la video.
- Après toute modification du catalogue, exécuter `node generate-site.js`, puis `node generate-site.js --check`.
- Le générateur crée les accueils `fr/` et `en/`; chaque projet du catalogue doit donc contenir le contenu explicite de `locales.en`.
- Le générateur crée aussi `sitemap.xml` et `robots.txt`; la date `updated` doit correspondre à la dernière modification éditoriale du projet.
