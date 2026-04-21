# JwPlots

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Environment Variables

The frontend reads configuration from Angular environment files in `src/environments`.

Files:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Configured values:

- `googleMapsApiKey`
- `defaultCity`
- `defaultMapCenter.lat`
- `defaultMapCenter.lng`
- `currentUser`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## GitHub Pages

This repo is configured for GitHub Pages deployment from the `gh-pages` branch.

- Build for Pages: `npm run build:gh-pages`
- Deploy to Pages: `npm run deploy:gh-pages`

The Pages build uses Angular's `github-pages` configuration with:

- base href: `/jw-plots/`
- output dir: `dist/jw-plots/browser`

If you rename the repository, update the `baseHref` value in `angular.json`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
