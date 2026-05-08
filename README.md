# Site de vente - Peugeot 308 Phase 2 Allure

Site statique pret a deployer sur Netlify, Vercel, GitHub Pages ou n'importe quel hebergement classique.

## Fichiers principaux

- `index.html` : page unique de presentation.
- `styles.css` : design responsive.
- `script.js` : envoi du formulaire.
- `google-apps-script.gs` : endpoint a coller dans Google Apps Script pour alimenter Google Sheets.
- `assets/` : images utilisees par le site.

## Activer Google Sheets

1. Cree un Google Sheet.
2. Va dans `Extensions > Apps Script`.
3. Colle le contenu de `google-apps-script.gs`.
4. Deploie en tant qu'application web avec acces `Tout le monde`.
5. Copie l'URL de l'application web.
6. Dans `script.js`, remplace `const GOOGLE_SCRIPT_URL = "";` par cette URL.

Sans URL Apps Script, le formulaire garde la derniere demande dans le navigateur pour eviter une erreur visible pendant les tests.
