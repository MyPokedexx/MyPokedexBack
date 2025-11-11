# MyPokedexBack
Pokedex Backend 

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Authentification_BSK
Ce repository propose une solution d’authentification robuste et modulaire destinée aux architectures backend modernes en TypeScript. Il s’appuie principalement sur JWT pour la gestion des sessions, inclut la gestion des rôles et permissions (RBAC), et assure une intégration facile avec des frameworks populaires comme Express ou NestJS.

Cette base est idéale pour l’intégration rapide dans tout projet backend nécessitant une sécurité solide, la gestion des comptes utilisateurs, et des contrôles d’accès granulaires.

## Fonctionnalités principales

+ Authentification par JWT : génération, vérification et refresh des tokens.

+ Gestion des utilisateurs : inscription, connexion, récupération de profil.

+ Gestion des rôles (RBAC) : attribution de rôles, contrôle d’accès par permissions.

+ Sécurité des endpoints : protection par middleware, validation des inputs.

+ Exemples de endpoints : routes pour login, signup, logout, gestion du profil utilisateur.

+ Tests unitaires et d’intégration : structure Jest pour assurer la fiabilité du module.

+ Documentation API : modèle Swagger/OpenAPI pour faciliter l’usage et l’intégration.

## Stack technique

- TypeScript (Typage fort, robustesse)
- Express/NestJS (Exposition des routes)
- Passport/NestJS (JWT Authentification, sécurité)
- Bcrypt( Hash des mots de passe)
- RBAC/CASL (Gestion des rôles et permissions)
- Jest (Tests unitaires et intégration)