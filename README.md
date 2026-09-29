# Portfolio de Jérémie Carvalho

Site statique du portfolio de Jérémie Carvalho, monteur et motion designer à Montréal.
Le dépôt n'utilise ni framework, ni dépendance, ni système de build.

## Point d'entrée

La page publiée est [`index.html`](index.html). Elle charge directement:

- [`styles.css`](styles.css) pour la mise en page, les couleurs et la responsivité;
- [`main.js`](main.js) pour les projets, les traductions, les filtres, le panneau projet et le menu mobile;
- [`assets/`](assets/) pour les médias et les icônes locales.

## Aperçu local

Depuis la racine du dépôt, lancer un serveur statique:

```text
py -m http.server 8000
```

Puis ouvrir <http://localhost:8000/> dans un navigateur. Arrêter le serveur avec `Ctrl+C`.

Il est aussi possible d'ouvrir [`index.html`](index.html) directement, mais le serveur local est préférable pour reproduire le contexte d'un site servi par HTTP.

## Checklist de vérification

Après une mise à jour du contenu ou des médias:

- [ ] Exécuter `node --check main.js`.
- [ ] Vérifier sur desktop la grille principale, les filtres `Montage` et `Motion design`, puis la vue `Contact`.
- [ ] Ouvrir un projet et vérifier son média principal, ses médias complémentaires, sa fermeture et sa navigation `Précédent`/`Suivant`.
- [ ] Basculer la langue et confirmer que les libellés et le contenu visible changent.
- [ ] Réduire la fenêtre à une largeur mobile et vérifier le menu, la grille, la vue Contact et le panneau projet.
- [ ] Vérifier un projet auquel il manque un média complémentaire: aucun emplacement vide ne doit apparaitre.
- [ ] Confirmer que les slugs des projets correspondent aux dossiers dans `assets/media/projects/`.
- [ ] Confirmer que `ref/` est absent et qu'aucun fichier de production ne le référence.

## Structure des médias

Les médias de la page d'accueil se trouvent dans `assets/media/`:

```text
assets/
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

Les extensions reconnues sont définies dans `main.js`: `avif`, `webp`, `png`, `jpg` et `jpeg` pour les images; `mp4` et `webm` pour les vidéos. Un média principal ou une image de carte absente conserve le placeholder prévu par le site. Les médias complémentaires absents sont retirés de la galerie.

## Ajouter un projet

1. Ajouter un objet dans le tableau `projects` de [`main.js`](main.js), avec un `slug` unique et stable.
2. Créer `assets/media/projects/<slug>/` avec exactement le même slug.
3. Ajouter les médias nécessaires dans ce dossier. `card-main.*` alimente la carte; `cover-video.*` ou `cover-image.*` alimente le panneau projet; `gallery-01.*` et `gallery-02.*` sont optionnels.
4. Ajouter le projet aux vues voulues avec `views`: `projects`, `montage` et/ou `motion`.
5. Prévisualiser le site et vérifier la carte, le panneau projet et les médias manquants.

Les champs et l'ordre des projets sont détaillés dans [`docs/project-workflow.md`](docs/project-workflow.md). La règle principale est de modifier ensemble le `slug` dans `main.js` et le dossier média correspondant.

## Documentation connexe

- [`assets/README.md`](assets/README.md): inventaire et organisation des assets;
- [`docs/project-workflow.md`](docs/project-workflow.md): procédure d'ajout d'un projet;
- Les issues et spécifications de maintenance vivent dans GitHub Issues; elles ne font pas partie du site déployé.

## Contraintes du dépôt

Le site doit rester une page statique sans framework, gestionnaire de paquets, dépendance, CMS ou pipeline de build. Les médias de production sont conservés tels quels; leur optimisation est une tâche distincte.
