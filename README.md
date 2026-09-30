# Portfolio de Jérémie Carvalho

Site statique du portfolio de Jérémie Carvalho, monteur et motion designer à Montréal.
Le dépôt n'utilise ni framework, ni dépendance, ni système de build.

## Point d'entrée

Les accueils canoniques sont [`fr/index.html`](fr/index.html) et [`en/index.html`](en/index.html). [`index.html`](index.html) reste l'entrée historique française et pointe ses métadonnées vers `/fr/`. Les pages chargent directement:

- [`styles.css`](styles.css) pour la mise en page, les couleurs et la responsivité;
- [`project-content.js`](project-content.js) pour le contenu partagé des pages projet et de l'overlay;
- [`main.js`](main.js) pour les traductions, les filtres, le panneau projet et le menu mobile;
- [`assets/`](assets/) pour les médias et les icônes locales.

Les pages projet sont produites par [`generate-site.js`](generate-site.js), un outil d'auteur Node.js qui ne devient pas une dépendance du site publié.

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
- [ ] Exécuter `node generate-site.js --check` pour vérifier les pages statiques générées et leur fallback overlay.
- [ ] Vérifier sur desktop la grille principale, les filtres `Montage` et `Motion design`, puis la vue `Contact`.
- [ ] Ouvrir un projet et vérifier son média principal, ses médias complémentaires, sa fermeture et sa navigation `Précédent`/`Suivant`.
- [ ] Basculer la langue et confirmer que les libellés et le contenu visible changent.
- [ ] Réduire la fenêtre à une largeur mobile et vérifier le menu, la grille, la vue Contact et le panneau projet.
- [ ] Vérifier un projet auquel il manque un média complémentaire: aucun emplacement vide ne doit apparaitre.
- [ ] Confirmer que les slugs des projets correspondent aux dossiers dans `assets/media/projects/`.
- [ ] Vérifier les accueils `/fr/` et `/en/`, puis le lien du sélecteur vers l'alternative linguistique.
- [ ] Vérifier `sitemap.xml`, `robots.txt`, les aperçus Open Graph et les données structurées des pages représentatives.
- [ ] Confirmer que `ref/` est absent et qu'aucun fichier de production ne le référence.

Après une modification de [`project-content.js`](project-content.js), régénérer les pages avec `node generate-site.js`, puis relancer `node generate-site.js --check`.

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

1. Ajouter un objet dans le catalogue de [`project-content.js`](project-content.js), avec un `slug` unique et stable et une traduction complète dans `locales.en`.
2. Créer `assets/media/projects/<slug>/` avec exactement le même slug.
3. Ajouter les médias nécessaires dans ce dossier. `card-main.*` alimente la carte; `cover-video.*` ou `cover-image.*` alimente le panneau projet; `gallery-01.*` et `gallery-02.*` sont optionnels.
4. Ajouter le projet aux vues voulues avec `views`: `projects`, `montage` et/ou `motion`.
5. Régénérer les accueils et les pages avec `node generate-site.js`.
6. Prévisualiser les deux langues et vérifier la carte, le panneau projet, le sélecteur de langue et les médias manquants.

Les champs et l'ordre des projets sont détaillés dans [`docs/project-workflow.md`](docs/project-workflow.md). La règle principale est de modifier ensemble le `slug` dans `project-content.js` et le dossier média correspondant.

## Documentation connexe

- [`assets/README.md`](assets/README.md): inventaire et organisation des assets;
- [`docs/project-workflow.md`](docs/project-workflow.md): procédure d'ajout d'un projet;
- Les issues et spécifications de maintenance vivent dans GitHub Issues; elles ne font pas partie du site déployé.

## Contraintes du dépôt

Le site doit rester une page statique sans framework, gestionnaire de paquets, dépendance runtime, CMS ou pipeline de build. Le générateur Node.js est limité à la publication des fichiers HTML. Les médias de production sont conservés tels quels; leur optimisation est une tâche distincte.
