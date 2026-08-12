# Guide de Publication des Packages NPM

Ce guide décrit la procédure complète pour publier les packages `@quanty-ui/tokens` et `@quanty-ui/cli` sur npm.

## Prérequis

- Compte npm actif
- Accès en écriture au scope `@quanty-ui`
- Authentification 2FA configurée (recommandée)

## 1. Connexion à npm

Si vous n'êtes pas déjà connecté, commencez par vous authentifier :

```bash
npm login
```

Cette commande ouvrira un lien dans votre navigateur pour vous authentifier. Suivez les instructions à l'écran.

Pour vérifier que vous êtes connecté :

```bash
npm whoami
```

## 2. Publication du package `@quanty-ui/tokens`

### Étapes

1. **Naviguer vers le dossier tokens**
   ```bash
   cd packages/tokens
   ```

2. **Incrémenter la version (si nécessaire)**
   ```bash
   npm version patch  # +0.0.1
   npm version minor  # +0.1.0
   npm version major  # +1.0.0
   ```

3. **Publier le package**
   ```bash
   npm publish --access public
   ```

4. **Authentifier la publication**
   - Un lien d'authentification s'affichera dans le terminal
   - Ouvrez le lien dans votre navigateur
   - Autorisez la publication
   - Le package sera publié automatiquement

### Vérification

Le package est disponible à : https://www.npmjs.com/package/@quanty-ui/tokens

Installation :
```bash
npm install @quanty-ui/tokens
```

## 3. Publication du package `@quanty-ui/cli`

### Étapes

1. **Naviguer vers le dossier cli**
   ```bash
   cd packages/cli
   ```

2. **Construire le package (si nécessaire)**
   ```bash
   npm run build
   ```

3. **Incrémenter la version**
   ```bash
   npm version patch  # +0.0.1
   npm version minor  # +0.1.0
   npm version major  # +1.0.0
   ```

4. **Publier le package**
   ```bash
   npm publish --access public
   ```

5. **Authentifier la publication**
   - Un lien d'authentification s'affichera dans le terminal
   - Ouvrez le lien dans votre navigateur
   - Autorisez la publication
   - Le package sera publié automatiquement

### Vérification

Le package est disponible à : https://www.npmjs.com/package/@quanty-ui/cli

Installation globale :
```bash
npm install -g @quanty-ui/cli
```

Utilisation avec npx :
```bash
npx @quanty-ui/cli init
npx @quanty-ui/cli add button
```

## 4. Avertissements courants

### `repository.url was normalized`

npm corrige automatiquement le format de l'URL du repository :
- De : `https://github.com/user/repo`
- Vers : `git+https://github.com/user/repo.git`

Cet avertissement est sans conséquence. Pour le corriger :
```bash
npm pkg fix
```

### `bin script name was cleaned`

npm nettoie automatiquement les noms de scripts dans `bin`. Cet avertissement est également sans conséquence.

## 5. Commandes rapides

### Publier tokens (depuis la racine)
```bash
cd packages/tokens && npm version patch && npm publish --access public
```

### Publier CLI (depuis la racine)
```bash
cd packages/cli && npm run build && npm version patch && npm publish --access public
```

## 6. Versions publiées

### Historique

| Package | Version actuelle | Date |
|---------|-----------------|------|
| @quanty-ui/tokens | 0.1.3 | 2026-03-31 |
| @quanty-ui/cli | 0.1.2 | 2026-03-31 |

## 7. Checklist avant publication

- [ ] Code testé et fonctionnel
- [ ] Build réussi (pour le CLI)
- [ ] Version incrémentée
- [ ] CHANGELOG mis à jour (si applicable)
- [ ] README à jour
- [ ] Connexion npm active
- [ ] Accès 2FA disponible

## 8. Dépannage

### Erreur 401 Unauthorized

Vous n'êtes pas connecté à npm :
```bash
npm login
```

### Erreur 403 Forbidden

Vous n'avez pas les droits sur le scope `@quanty-ui`. Contactez le propriétaire du scope.

### Package déjà publié avec cette version

Incrémentez la version avant de republier :
```bash
npm version patch
```

## 9. Liens utiles

- npmjs.com : https://www.npmjs.com
- @quanty-ui/tokens : https://www.npmjs.com/package/@quanty-ui/tokens
- @quanty-ui/cli : https://www.npmjs.com/package/@quanty-ui/cli
- Documentation npm : https://docs.npmjs.com/
