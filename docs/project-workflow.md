# Ajouter un projet

Ce document resume la marche a suivre pour ajouter un nouveau projet au portfolio.

## Etape 1: ajouter le contenu

Ouvrir [`main.js`](../main.js) et ajouter un nouvel objet dans le tableau `projects`.

Champs obligatoires:

- `slug`
- `title`
- `subtitle`
- `type`
- `role`
- `client`
- `text`
- `credits`
- `views`
- `palette`

Exemple:

```js
{
  slug: "mon-nouveau-projet",
  title: "Mon nouveau projet",
  subtitle: "Documentaire, 2026",
  type: "Documentaire",
  role: "Montage et motion design",
  client: "Nom du client",
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

- Si les medias sont absents, le placeholder reste visible.
- Si le `slug` du projet et le nom du dossier ne correspondent pas, rien ne se chargera.
- Si tu veux changer l'ordre de la grille, deplace simplement l'objet dans le tableau `projects`.

## Notes utiles

- Le panneau projet et la navigation precedent/suivant reutilisent l'ordre du tableau `projects`.
- Les filtres `Montage` et `Motion design` ne sont pas des pages differentes: ils reutilisent la meme grille avec une selection differente.
- Le projet peut avoir seulement une image de couverture si tu n'as pas encore la video.
