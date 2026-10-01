# Hero vidéo iOS: pourquoi l’image charge, mais la vidéo reste en pause

**Date de la recherche:** 2026-09-30  
**Périmètre:** diagnostic documentaire et inspection locale seulement. Aucun fichier d’application n’a été modifié.  
**Confiance globale:** élevée pour les faits locaux et les contrats d’API; moyenne pour la cause racine, qui reste non testée tant que le rejet de `play()` et la séquence des événements ne sont pas observés sur l’appareil.

**Mise à jour:** le diagnostic iPhone fourni après cette recherche a confirmé `NotAllowedError` après `loadeddata`. Le code traite maintenant ce rejet en conservant le poster; les descriptions du chargeur qui avale le rejet ci-dessous documentent l’état observé avant cette correction.

## Conclusion courte

Le dépôt ne donne pas à `<video>` un poster HTML. Il charge plutôt un `<img class="hero__poster">` séparé, puis garde le `<video>` caché jusqu’à `loadeddata`. Le poster peut donc apparaître même si la lecture vidéo n’a jamais commencé.

Le code de production appelle bien `play()` après `loadeddata`, mais ignore entièrement sa promesse rejetée. C’est le principal défaut diagnostique et l’explication la plus directe du symptôme « chargé mais en pause »: Safari/WebKit peut refuser l’autoplay ou arrêter la lecture, sans que le code révèle si la cause est `NotAllowedError`, une erreur de source ou un état de visibilité.

Les attributs `muted`, `autoplay` et `playsinline` sont présents et correspondent à la politique documentée de WebKit pour une vidéo silencieuse inline. Les observations actuelles rendent donc une simple absence d’attribut peu probable. La première hypothèse comportementale à tester est la course de visibilité: le `<video>` est initialement `hidden`, alors que l’attribut `autoplay` est déjà présent lorsque la source est assignée. La seconde est la structure précise du MP4: le fichier est H.264 sans audio, mais contient une piste de données `tmcd` de timecode. Ce n’est pas une preuve de défaut, seulement la variante de média la plus ciblée à comparer après avoir capturé l’erreur réelle.

## Faits vérifiés

### Dépôt et flux d’exécution

- `index.html:117-119`, `fr/index.html:117-119` et `en/index.html:117-119` déclarent `<video class="hero__video" muted autoplay loop playsinline preload="none" hidden></video>` et un `<img class="hero__poster" alt="" hidden />`. Le `<video>` n’a pas d’attribut `poster`.
- `media-manifest.js` fournit `assets/media/hero/hero-video.mp4` et `assets/media/hero/hero-poster.webp` comme deux assets distincts.
- `main.js:1024-1072` réinitialise le `<video>`, fixe `autoplay`, `defaultMuted`, `muted` et `playsInline`, passe `preload` à `metadata`, assigne `src`, puis appelle `load()`.
- Dans `main.js:1048-1059`, `loadeddata` rend le `<video>` visible, marque le conteneur comme rempli, masque l’image par `onSuccess`, puis appelle `element.play()`. Le rejet de la promesse est avalé par `catch(() => {})`, et les exceptions synchrones sont aussi ignorées.
- `main.js:1170-1179` force `shouldLoadHeroVideo = true`; le chemin actuel tente donc la vidéo sur mobile aussi. Le `README.md:44` décrit encore une désactivation avec `Save-Data` ou `prefers-reduced-motion`, mais cette logique n’existe plus dans `main.js`. Ce décalage documentaire n’explique pas à lui seul la pause, mais il faut éviter de l’utiliser comme description de la production actuelle.
- `styles.css:354-367` dimensionne la vidéo et l’image en `position: absolute`; `aria-hidden="true"` sur le conteneur n’est pas l’équivalent de `hidden` et ne devrait pas, à lui seul, rendre le média invisible.

### Média local

Inspection `ffprobe` de `assets/media/hero/hero-video.mp4`:

- conteneur ISO Base Media / MP4 (`mov,mp4,m4a,3gp,3g2,mj2`);
- une piste vidéo H.264/AVC `avc1.640020`, profil High, niveau 3.2, `1920x600`, `yuv420p`, 24 fps;
- aucune piste audio;
- une piste de données `tmcd` de timecode, une seule entrée, sans audio;
- durée `28.791667 s`, taille locale `3,605,326` octets.

La présence d’une piste `tmcd` est un fait local, pas un diagnostic. Apple recommande actuellement le MP4 encodé en H.264 pour les fichiers vidéo statiques ([Apple, *Delivering Video Content for Safari*](https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari.md), consulté le 2026-09-30), donc « MP4 + H.264 » n’est pas, en soi, une incompatibilité Safari.

### Production et observations de session

Les faits suivants étaient déjà établis dans cette session et sont conservés comme faits, non comme hypothèses:

- le poster/image du hero charge;
- l’asset MP4 de production est servi en `206 Partial Content` lorsqu’une plage est demandée;
- l’asset est un MP4 H.264;
- le comportement a été observé sur Safari iPhone et Firefox iOS;
- le `main.js` déployé appelle `play()` après `loadeddata` et avale le rejet.

Une vérification HTTP du 2026-09-30 sur `https://jeremiecarvalho.com/assets/media/hero/hero-video.mp4` a aussi observé:

- avec `Range: bytes=0-1023`: `206`, `Content-Type: video/mp4`, `Accept-Ranges: bytes`, `Content-Range: bytes 0-1023/3605326`, `Content-Length: 1024`;
- sans plage: `200`, `Content-Type: video/mp4`, `Accept-Ranges: bytes`, `Content-Length: 3605326`.

Cela confirme que le serveur répond correctement à cette requête de plage depuis cet environnement. Cela ne prouve pas que chaque requête émise par iPhone, chaque redirection, ni toute la séquence de lecture est correcte.

## Ce que les plateformes garantissent

### Autoplay iOS et WebKit

WebKit documente depuis iOS 10 que les vidéos sans piste audio, ou dont la propriété `muted` vaut `true`, peuvent démarrer sans geste utilisateur. Il documente aussi `playsinline` pour la lecture inline sur iPhone et précise que l’autoplay est lié à la visibilité à l’écran ([WebKit, *New `<video>` Policies for iOS*](https://webkit.org/blog/6784/new-video-policies-for-ios/), consulté le 2026-09-30).

La documentation Apple actuelle reprend les points pertinents: `preload="metadata"` charge assez de métadonnées; `play()` peut démarrer sans geste si la vidéo n’a pas de piste audio ou si `muted` vaut `true`; et l’autoplay iOS/macOS exige aussi `playsinline` ([Apple, *Delivering Video Content for Safari*](https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari.md), consulté le 2026-09-30). Apple indique également que la lecture s’arrête si la vidéo n’est plus visible à l’écran ou dans le viewport.

**Application au dépôt — confiance élevée:** les trois conditions d’intention sont bien présentes. **Confiance moyenne:** la condition de visibilité au moment exact où WebKit évalue l’autoplay n’est pas instrumentée. Le `<video>` commence avec `hidden`, et sa visibilité n’est rétablie qu’au moment de `loadeddata`.

### Firefox iOS n’est pas une comparaison avec Gecko desktop

Le dépôt officiel Mozilla de Firefox iOS indique que ses scripts utilisateur sont injectés dans un `WKWebView` ([Mozilla, `firefox-ios/firefox-ios/README.md`](https://raw.githubusercontent.com/mozilla-mobile/firefox-ios/main/firefox-ios/README.md), consulté le 2026-09-30). La politique Apple impose par ailleurs aux apps de navigation iOS l’usage de WebKit et de JavaScript WebKit, sauf entitlements spécifiques ([Apple, *App Review Guidelines*, 2.5.6](https://developer.apple.com/app-store/review/guidelines/#software-requirements), consulté le 2026-09-30).

**Conséquence — confiance élevée:** Safari iOS et Firefox iOS partagent la famille d’exécution WebKit/WKWebView pour cette page; un échec identique dans les deux apps pointe davantage vers la politique iOS, le cycle de vie média, le média ou le serveur que vers une différence Gecko/WebKit. Cela ne permet pas d’affirmer que leurs versions exactes, réglages ou intégrations natives sont identiques.

### Poster, `loadeddata`, `playing` et `play()` ne sont pas le même état

Le standard WHATWG définit `poster` comme une image que l’agent peut afficher lorsqu’aucune donnée vidéo n’est disponible ([WHATWG HTML, section `video`](https://html.spec.whatwg.org/multipage/media.html#the-video-element), consulté le 2026-09-30). Ici, cette mécanique native n’est pas utilisée: l’image est un élément frère.

Selon MDN, `loadeddata` signifie que la frame à la position courante, souvent la première, est disponible; cela correspond au moins à `HAVE_CURRENT_DATA`, pas au démarrage effectif de la lecture ([MDN, `loadeddata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event), consulté le 2026-09-30; [MDN, `readyState`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState), consulté le 2026-09-30). L’événement `playing`, au contraire, est émis après le démarrage ou la reprise réelle ([MDN, `playing`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event), consulté le 2026-09-30).

`play()` retourne une promesse résolue lorsque la lecture a réellement démarré et rejetée si elle ne peut pas démarrer. MDN cite notamment `NotAllowedError` pour une politique de permission/autoplay et `NotSupportedError` pour une source non supportée ([MDN, `HTMLMediaElement.play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play), consulté le 2026-09-30). La recommandation MDN et celle de WebKit sont de prendre une décision à partir de cette promesse, pas de présumer que l’appel a fonctionné.

**Point critique pour ce dépôt — confiance élevée:** le code considère `loadeddata` comme un succès vidéo, masque le poster séparé, puis ignore la seule information qui pourrait distinguer permission refusée, source non supportée, échec réseau ou arrêt ultérieur. Si `loadeddata` n’arrive jamais, l’image peut rester visible; si `loadeddata` arrive mais `play()` est rejeté, l’image séparée devrait déjà être masquée et la première frame vidéo pourrait rester affichée en pause. Le terme « poster visible » doit donc être corrélé avec les événements réels plutôt qu’avec le seul réseau de l’image.

## Hypothèses classées

Les niveaux ci-dessous expriment la plausibilité et la valeur de test, pas une cause confirmée.

### 1. Course `hidden` / visibilité / autoplay — confiance moyenne

Le `<video>` est `hidden` dans le HTML. `resetVideoElement()` le cache encore, puis `src` et `load()` sont appelés alors que `autoplay` est déjà vrai. WebKit documente que l’autoplay doit être visible à l’écran et qu’un élément caché peut ne pas démarrer automatiquement ([WebKit, politique iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/), consulté le 2026-09-30). Le handler enlève `hidden` juste avant `play()`, ce qui peut suffire pour l’appel explicite, mais le dépôt ne vérifie pas si le démarrage automatique initial a été bloqué ni si l’élément a effectivement un rectangle visible à cet instant.

**Evidence prédite:** le journal montre `loadeddata`, puis `play()` rejeté ou aucun `playing` dans le chemin actuel; une fixture qui garde la vidéo rendue avant `src/load`, ou qui retente après une frame de rendu/observation de visibilité, change le résultat sans changer le fichier. Si le même rejet persiste avec une vidéo déjà visible, cette hypothèse descend fortement.

### 2. Rejet d’autoplay masqué — confiance élevée comme défaut d’observabilité, inconnue comme cause

Le code peut très bien recevoir `NotAllowedError`, mais le rejet est détruit. L’absence d’un bouton visible ne change pas cette nécessité de mesurer l’état: la solution produit peut conserver une image statique sans afficher de contrôle, mais le diagnostic doit d’abord connaître l’erreur.

**Evidence prédite:** `play()` donne un nom de `DOMException`; `paused === true`; aucun `playing`. `NotAllowedError` ferait monter la politique/visibilité au premier rang. `NotSupportedError` ou un `MediaError` ferait monter la variante média.

### 3. `loadeddata` est pris pour « lecture commencée » — confiance élevée comme erreur de contrat

`loadeddata` ne promet pas une lecture continue. `HAVE_CURRENT_DATA` peut ne contenir qu’une frame, alors que `playing` et la résolution de `play()` sont les observations appropriées du démarrage ([MDN `loadeddata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event), [MDN `playing`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event), consultés le 2026-09-30).

**Evidence prédite:** `loadeddata` survient, `play()` est résolu ou émet `play`, mais `playing` est absent ou suivi rapidement de `waiting`/`pause`. Le problème serait alors un manque de données futures, un arrêt de visibilité ou une interruption de cycle de vie, pas le chargement de l’image.

### 4. Particularité du MP4: piste `tmcd` ou métadonnées de lecture — confiance faible à moyenne

Le fichier est compatible avec la recommandation générale Apple H.264/MP4 et ne contient pas d’audio. Il contient néanmoins une piste `tmcd` de timecode que la page n’utilise pas. Les sources primaires consultées ne disent pas que `tmcd` bloque Safari iOS; ce serait donc une hypothèse de compatibilité ciblée, pas une conclusion.

**Evidence prédite:** une copie de test avec la piste `tmcd` retirée, et avec les métadonnées optimisées pour lecture progressive, émet `playing` alors que l’asset actuel ne le fait pas, à code et conditions identiques. Si les deux variantes ont exactement la même séquence d’événements, cette piste est écartée.

### 5. Réponse HTTP partielle correcte en apparence mais insuffisante dans la séquence réelle — confiance faible à moyenne

`206` est le bon statut pour une réponse à une plage, mais le contrat de plage dépend aussi de `Content-Range`, `Content-Length`, du type MIME et de la cohérence des offsets. MDN décrit `Accept-Ranges`, `Content-Range` et le rôle de `206` ([MDN, *HTTP range requests*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests), consulté le 2026-09-30); RFC 9110 définit les sémantiques normatives des plages ([RFC 9110, section 14](https://www.rfc-editor.org/rfc/rfc9110.html#name-range-requests), consulté le 2026-09-30).

La vérification de session montre que l’endpoint répond correctement à une plage simple. Elle ne couvre pas les requêtes exactes de l’iPhone, les redirections, une interruption, un cache intermédiaire ou une plage ultérieure. Cette hypothèse ne doit pas être prioritaire avant la capture de `play()` et des événements.

### 6. Économie de données ou réglage système — confiance faible, uniquement conditionnelle

MDN note que `loadeddata` peut ne pas être émis sur mobile/tablette lorsque le mode économiseur de données est actif ([MDN, `loadeddata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event), consulté le 2026-09-30). Aucun élément de cette session ne prouve que ce réglage est actif sur l’iPhone concerné. Ce n’est pas une explication à retenir sans une reproduction contrôlée avec le réglage explicitement comparé.

## Ce qui est peu probable ou déjà insuffisant

- « Il manque `muted` » est contredit par le HTML et par `loadVideoAsset()`, qui fixent l’attribut/propriété et `defaultMuted` avant `src`.
- « Il manque `playsinline` » est contredit par le HTML et par `element.playsInline = true`.
- « Le serveur ne supporte pas les plages » est contredit par la réponse production `206` avec `Content-Range` et `Accept-Ranges` observée dans cette session. Il reste à vérifier la séquence réelle de l’appareil, mais ce n’est plus un bon premier test générique.
- « Safari iOS ne permet jamais l’autoplay » est faux pour une vidéo silencieuse et inline selon WebKit et Apple. Une préférence ou un état particulier peut encore bloquer, mais la politique historique générale ne suffit pas à expliquer le cas.
- « Firefox iOS apporte Gecko » est une mauvaise comparaison: l’app officielle injecte ses scripts dans `WKWebView`; l’implémentation native exacte peut différer, mais le moteur web n’est pas celui de Firefox desktop.

## Voies qui préservent le produit

Ces voies ne nécessitent pas d’ajouter immédiatement un bouton Play visible:

- Conserver le poster comme état de repli et ne le masquer qu’après `playing` ou après une promesse `play()` résolue. En cas de refus d’autoplay, le rendu reste une image stable plutôt qu’une vidéo silencieusement figée.
- Rendre le résultat de `play()` observable dans le diagnostic et traiter séparément `NotAllowedError`, `NotSupportedError` et les `MediaError` de chargement. Cela améliore la robustesse sans imposer d’interface visible.
- Tester une variante MP4 minimale: H.264 vidéo seulement, piste `tmcd` supprimée, métadonnées préparées pour la lecture progressive. Ne retenir cette variante en production que si elle change l’état `playing` dans le test contrôlé.
- Tester le même asset avec une visibilité établie avant `src/load`, puis avec l’assignation dynamique actuelle. Si seule la première séquence fonctionne, ajuster le moment du chargement/affichage plutôt que le format.
- Si l’autoplay reste interdit dans un contexte donné, accepter le poster statique comme comportement accessible et prévisible. Un geste utilisateur ou un contrôle visible pourrait être une décision produit distincte; il n’est pas recommandé de l’ajouter pour masquer l’incertitude technique.

## Plan de tests priorisé

### 1. Capturer la cause exacte, sans modifier le produit

Sur l’appareil iPhone avec Web Inspector, utiliser une fixture ou une instrumentation temporaire non publiée qui écoute `loadstart`, `loadedmetadata`, `loadeddata`, `canplay`, `play`, `playing`, `waiting`, `stalled`, `pause`, `suspend`, `error`, `abort` et `emptied`. À l’instant de `play()`, consigner `error?.code/message`, le nom de l’exception rejetée, `readyState`, `networkState`, `paused`, `currentTime`, `duration`, `buffered`, `seekable`, `muted`, `defaultMuted`, `autoplay`, `playsInline`, `hidden`, `getClientRects().length`, `document.visibilityState` et la présence dans le viewport.

**Décision:**

- aucun `loadeddata`: investiguer chargement/décodage/réponse avant l’autoplay;
- `loadeddata` puis `NotAllowedError`: investiguer visibilité, politique et état iOS;
- `play()` résolu mais aucun `playing`: investiguer la séquence d’événements, interruption ou état de cycle de vie;
- `playing` puis `pause`/`waiting`: investiguer visibilité, données futures et arrêt système;
- `NotSupportedError` ou `MediaError`: comparer le fichier et les plages, pas l’interface.

### 2. Tester la visibilité et le cycle de vie

Dans une fixture identique, comparer la vidéo initialement visible avant l’assignation de `src` avec la séquence actuelle `hidden -> src/load -> loadeddata -> visible -> play`. Répéter après un `requestAnimationFrame`, dans le viewport, au premier plan, puis après retour depuis l’arrière-plan.

**Evidence attendue:** une différence uniquement sur le moment où l’élément devient visible confirmerait une course de politique/lifecycle; aucune différence déplacerait l’attention vers le rejet ou le média.

### 3. Comparer declaratif et dynamique

Avec le même asset et le même ensemble `muted autoplay loop playsinline`, comparer un `<video src="...">` statique avec l’assignation JavaScript actuelle. Comparer aussi le résultat de l’autoplay déclaratif avec un appel explicite `play()` dont la promesse est observée.

**Evidence attendue:** seul le cas statique qui émet `playing` pointerait vers le cycle de vie actuel; les deux échecs avec la même erreur pointeraient vers une condition iOS ou média.

### 4. Vérifier la séquence HTTP depuis l’iPhone

Dans Web Inspector, relever chaque requête du MP4 et non seulement une requête `curl`: méthode, URL finale, redirections, `Range`, statut, `Content-Type`, `Content-Range`, `Content-Length`, `Accept-Ranges`, éventuel `Content-Encoding`, interruptions et retransmissions.

**Evidence attendue:** des offsets non contigus, une taille totale incohérente, un mauvais MIME ou une réponse différente sur l’appareil ferait remonter l’hypothèse réseau; des plages cohérentes avec `loadeddata` la ferait descendre.

### 5. A/B du fichier, après les tests d’état

Créer hors production une variante de test sans `tmcd`, en gardant la vidéo H.264 et les dimensions identiques, puis comparer les événements et la promesse de `play()` dans la même fixture. Tester séparément une variante avec métadonnées placées pour lecture progressive.

**Evidence attendue:** seulement une différence reproductible sur l’état `playing` justifie une modification d’asset. Si le rejet demeure `NotAllowedError`, réencoder ne résout pas la cause.

### 6. Comparer les réglages iOS de façon contrôlée

Répéter sur le même appareil avec les réglages d’économie de données/Low Data Mode explicitement documentés, puis avec la même page au premier plan et après navigation retour. Ce test vient en dernier, car il doit expliquer un état observé (`loadeddata` absent ou lecture suspendue), pas servir de supposition générale.

## Questions non résolues

- `loadeddata` est-il réellement émis sur l’iPhone concerné?
- Quelle est la valeur exacte de `error.code` et quel est le nom de la promesse rejetée par `play()`?
- Le poster visible est-il le `<img>` frère, ou une description visuelle d’une première frame vidéo en pause? Le code actuel ne permet pas au `<video>` d’avoir un poster natif.
- Le `<video>` a-t-il un rectangle visible et intersectant le viewport lorsque l’autoplay et `play()` sont évalués?
- La piste `tmcd` est-elle acceptée et ignorée normalement par les deux versions WebKit concernées?
- Les requêtes effectuées par Safari et Firefox iOS ont-elles exactement les mêmes plages et réponses que la requête `curl` de session?
- Quelles sont les versions iOS, Safari et Firefox iOS, et le réglage Low Data Mode était-il actif?
- Le comportement est-il identique après un rechargement froid, un retour arrière et un retour depuis l’arrière-plan?

## Sources principales

Toutes les sources web ci-dessous ont été consultées le **2026-09-30**.

- [WebKit — New `<video>` Policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [WebKit — Auto-Play Policy Changes for macOS](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)
- [Apple — Delivering Video Content for Safari](https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari.md)
- [Apple — Safari HTML5 Audio and Video Guide, introduction](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Introduction/Introduction.html)
- [Apple — Safari HTML5 Audio and Video Guide, Audio and Video HTML](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html)
- [Mozilla — Firefox for iOS README, source officielle](https://raw.githubusercontent.com/mozilla-mobile/firefox-ios/main/firefox-ios/README.md)
- [Apple — App Review Guidelines, 2.5.6](https://developer.apple.com/app-store/review/guidelines/#software-requirements)
- [Mozilla Support — Firefox for iOS FAQ](https://support.mozilla.org/en-US/kb/firefox-ios-faq) *(page inaccessible during this session because Support returned a JavaScript client challenge; not used as evidence)*
- [WHATWG — The `video` element](https://html.spec.whatwg.org/multipage/media.html#the-video-element)
- [WHATWG — `HTMLMediaElement.play()`](https://html.spec.whatwg.org/multipage/media.html#dom-media-play-dev)
- [WHATWG — `loadeddata` event](https://html.spec.whatwg.org/multipage/media.html#event-media-loadeddata)
- [WHATWG — `playing` event](https://html.spec.whatwg.org/multipage/media.html#event-media-playing)
- [MDN — `HTMLMediaElement.play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
- [MDN — `loadeddata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event)
- [MDN — `playing` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event)
- [MDN — `readyState`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)
- [MDN — `<video>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)
- [MDN — Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- [MDN — HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)
- [IETF — RFC 9110, range requests](https://www.rfc-editor.org/rfc/rfc9110.html#name-range-requests)

Les pages MDN sont utilisées ici comme documentation de l’API et comme index vers les clauses WHATWG; les règles de plateforme et de lecture iOS sont ancrées d’abord dans WebKit et Apple. La seule source mainteneur utilisée pour le détail Firefox iOS est le dépôt officiel Mozilla, car l’FAQ Support Mozilla était protégée par une vérification JavaScript lors de la consultation.
