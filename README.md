# Gestionnaire de Visites Médicales (Offline SPA)

Une application web autonome (Single Page Application) pour la gestion des visites médicales périodiques en entreprise. Conçue pour fonctionner hors ligne, sans serveur, avec une base de données locale sécurisée.

## Fonctionnalités Clés

*   **Tableau de bord intelligent** : Vue d'ensemble des visites à venir (15 jours), retards, et cas positifs en cours.
*   **Gestion des Travailleurs** : Ajout, modification, et recherche par département/lieu de travail.
*   **Cycle d'Examen Complet** : 
    *   Création d'examen -> Commande Labo (Copro-parasitologie).
    *   Saisie des résultats (Positif/Négatif).
    *   Si **Négatif** : Génération automatique du certificat d'aptitude et calcul de la prochaine échéance (+6 mois).
    *   Si **Positif** : Protocole de traitement, marquage "Inapte" ou "Apte Partiel", et planification de contre-visite (+7/10 jours).
*   **Documents Imprimables** : Modèles automatiques pour les Convocations et les Certificats d'Aptitude.
*   **Base de Données Locale** : Toutes les données sont stockées dans le navigateur (IndexedDB). Rien n'est envoyé sur internet.
*   **Sauvegarde** : Export et Import des données (JSON) pour sécuriser vos dossiers ou changer d'ordinateur.

## Installation & Utilisation

### Option A : Utilisation Directe (Recommandé)
1.  Allez dans le dossier `dist`.
2.  Ouvrez le fichier `index.html` avec un navigateur récent (Chrome, Edge, Firefox).
3.  L'application est prête ! Les données seront sauvegardées automatiquement dans ce navigateur.

### Option B : Développement / Modification
1.  Assurez-vous d'avoir Node.js installé.
2.  Ouvrez un terminal dans le dossier du projet.
3.  Installez les dépendances :
    ```bash
    npm install
    ```
4.  Lancez le mode développement :
    ```bash
    npm run dev
    ```
5.  Pour recréer la version "Fichier Unique" (`dist/index.html`) :
    ```bash
    npm run build
    ```

## Utilisation Quotidienne

1.  **Matin** : Ouvrez l'application. Vérifiez le tableau de bord pour les "À faire (15 jours)".
2.  **Convocations** : Allez sur la fiche d'un travailleur "À faire", cliquez sur "Convocation" et imprimez.
3.  **Visite** : Quand le travailleur arrive, cliquez sur "Nouvel Examen".
4.  **Résultats** : Une fois les résultats du labo reçus, ouvrez l'examen en cours, saisissez le résultat.
    *   Si négatif : Validez pour imprimer le certificat.
    *   Si positif : Saisissez le traitement et la date de contre-visite.

## Sauvegarde
Pensez à faire un "Export" régulièrement (bouton en haut de la liste des travailleurs) et à stocker le fichier JSON en lieu sûr.

## Nouvelles fonctionnalités et améliorations
- **PWA (Progressive Web App):** L'application peut maintenant être installée sur un appareil et fonctionne mieux hors-ligne.
- **Export/Import chiffré:** Dans `Paramètres` vous pouvez maintenant exporter les données chiffrées (AES-GCM) avec un mot de passe et réimporter des sauvegardes chiffrées.
- **Tests et CI:** Des tests unitaires (Vitest) et une action GitHub CI ont été ajoutés. Les PRs seront validées automatiquement.
- **ESLint & Prettier:** Les règles de linting et de formatage sont installées; utilisez `npm run lint` et `npm run format`.
- **Responsive Sidebar:** La barre latérale est responsive et peut être masquée sur mobile.
- **Print Disabled:** Les templates d'impression ont été retirés temporairement (désactivés) par défaut — utilisez import/export JSON pour générer des documents si nécessaire.