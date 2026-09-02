# Spec: repo propre et comprehensible

Label: `ready-for-agent`
Type: maintenance

## Problem Statement

Le depot contient un petit site statique de portfolio, sans dependances ni systeme de build. Il fonctionne avec une page HTML, une feuille de styles, un fichier JavaScript de contenu et de comportement, ainsi que des medias locaux.

Le depot est actuellement propre du point de vue Git, mais il est difficile a reprendre plus tard: il n'y a pas de README a la racine, la documentation des medias est partiellement obsolete, certaines conventions ne correspondent plus au code, et des restes de CSS subsistent. Les fichiers de reference externes dans `ref/` ne font pas partie du site et peuvent etre supprimes definitivement.

## Solution

Rendre le depot auto-explicatif et coherent sans le transformer en application:

- conserver une architecture statique sans framework, dependance ou pipeline de build;
- supprimer definitivement le dossier de references `ref/`;
- ajouter une documentation racine courte qui explique le site, son fonctionnement et les operations courantes;
- etablir une seule convention fiable pour les projets et leurs medias;
- corriger les incoherences entre les slugs, les dossiers et la documentation;
- supprimer ou actualiser les indications qui ne correspondent plus au comportement reel;
- proteger le depot contre les fichiers locaux et temporaires avec des regles d'ignore minimales;
- verifier le site avec une checklist manuelle simple plutot qu'introduire une suite de tests disproportionnee.

## User Stories

1. As a future maintainer, I want to understand immediately that the repository is a zero-dependency static site, so that I do not search for a missing framework or build command.
2. As a future maintainer, I want to know which file controls the page structure, styling, project content, translations, and interactions, so that I can make a small change safely.
3. As a future maintainer, I want clear instructions for adding a project, so that the project data and its media folder remain synchronized.
4. As a future maintainer, I want the documented project list to match the projects declared by the site, so that I can trust the documentation.
5. As a future maintainer, I want every project slug to match its media directory, so that card images and project media load without silent fallback errors.
6. As a future maintainer, I want the documented media names and formats to match what the code actually discovers, so that I do not prepare unused files.
7. As a future maintainer, I want unsupported media features to be removed from the instructions or explicitly marked as future work, so that the repository does not promise behavior it does not provide.
8. As a future maintainer, I want the repository to exclude operating-system, editor, and temporary files, so that accidental local artifacts do not pollute the project.
9. As a future maintainer, I want the research captures removed from the working repository, so that the published site contains only production material and project documentation.
10. As a future maintainer, I want the remaining CSS to describe the current markup, so that unused selectors do not obscure the visual system.
11. As a portfolio owner, I want existing production images, the hero video, project data, navigation, contact view, language switch, and project overlay preserved, so that cleanup does not change the site experience.
12. As a portfolio owner, I want a short manual verification checklist, so that I can confirm the site after future content or media updates without maintaining an application test stack.

## Implementation Decisions

- The site remains plain HTML, CSS, and JavaScript. No framework, package manager, bundler, CMS, or automated build is introduced.
- The production entrypoint remains the existing home page, with the current stylesheet and JavaScript behavior preserved.
- Project content remains data-driven and keeps one stable slug per project. A slug and its media directory are treated as one maintenance unit.
- The current project collection and the media directory inventory become the basis for the canonical documentation. The mismatch between `zouz` and `zooz` must be resolved explicitly rather than guessed.
- The documented media contract includes only names supported by the implementation. `card-hover` is not treated as available unless the behavior is deliberately implemented later.
- A root README documents purpose, structure, local preview, project updates, media naming, and the role of the scratch tracker.
- A minimal ignore file covers only local operating-system, editor, and temporary artifacts relevant to this repository.
- The reference archive is removed from the repository. Its external captures, copied vendor markup, and prototype code are not production dependencies.
- Orphaned production CSS selectors are removed only after checking that no current markup or behavior depends on them.
- Existing local media is retained. Media optimization is separate from repository cleanup and must not replace source assets without a deliberate content decision.
- The local scratch folder is used for this maintenance spec and future task breakdowns; it is not part of the deployed site.

## Testing Decisions

- Tests verify observable behavior, not the internal arrangement of functions or CSS selectors.
- Run the JavaScript syntax check on the production script.
- Confirm that every project declared by the site has a corresponding media directory, with the slug mismatch resolved.
- Confirm that documented media names correspond to the asset discovery behavior.
- Preview the home page locally and check the projects view, Montage filter, Motion design filter, Contact view, project overlay, previous/next navigation, language toggle, and mobile menu.
- Check the site at desktop and mobile widths, including a project with missing optional media so that the placeholder behavior remains intentional.
- Confirm that the deleted reference directory is absent from the repository and that no production file refers to it.
- No automated browser test suite is required for this small static site unless repeated regressions justify adding one later.

## Out of Scope

- Redesigning the portfolio or changing its visual direction.
- Rewriting project copy, credits, social links, or contact information except where required to correct a documented maintenance inconsistency.
- Adding project detail pages, a CMS, a backend, a contact form, analytics, or a deployment platform.
- Adding a framework, bundler, package manager, type system, or broad automated test infrastructure.
- Optimizing or converting all media assets.
- Rewriting Git history or changing branches, remotes, hosting, or deployment settings.
- Restoring or preserving the `ref/` archive in another production location.

## Further Notes

- The audit found 21 project entries and 21 project media directories. The directory named `zooz` is the exception to the slug convention because the data uses `zouz`.
- The tracked repository is approximately 66.8 MB, mostly media. This is acceptable for the current portfolio scope, but large PNGs and the hero video should be considered separately for delivery performance.
- The existing workflow documentation contains absolute paths from a previous computer and must be rewritten with repository-relative links.
- The current repository has no root README, no ignore file, no package manifest, and no build configuration. Those absences are intentional constraints for this spec, not missing application infrastructure.
