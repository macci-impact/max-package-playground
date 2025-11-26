# platform-assets-ui-template

This is a template repo designed to make setting up new Platform Assets UI repos simple and following similar conventions.

To use it:

1. Create a new repo in Github, and select this template from the Template Drop down options.
2. Find instances of the strings `your-project-name` and `your_project_name` and replace with your project name, e.g. 'checklist-assets'
3. If you are on core team, search and replace instances of `onboarding-ui` to `platform-ui`
4. If you want to use web components instead of UMD, move the following files:

   - src/main.ts-web-components -> src/main.ts
   - vite.config.ts-web-components > vite.config.ts

5. Add Repository secret for CI/CD https://github.com/ImpactInc/[your-repo-name]/settings/secrets/actions

   - NPM_AUTH_TOKEN
     - The token needed to retrieve npm packages from private repos
     - Used for UICL
     - Create a Github personal access token (GH > Settings > Developer Settings > Personal Access Tokens) and then use it for this secret

6. Add Repository variables
   https://github.com/ImpactInc/onboarding-assets-ui/settings/variables/actions

   - NODE_VERSION 20.11.1
   - APP_NAME_FOR_CDN: your-team-ui/your-repo Ex: onboarding-ui/checklist-assets

7. Request Anatoli to add the secret Repository for GSJS

   - The Google service account token need for your project to be able to deploy to Google Storage
   - Will need to be created by Anatoli

8. Add your environments with variables, e.g:

   - Production environment with a `BUCKET`: `production` variable
   - Stage6 environment with a `BUCKET`: `stage6`

9. Add a ruleset to protect the main branch with:

   - Require a Pull Request before merging with 1 required approval

10. Settings > General
    - Check 'Automatically delete head branches'

Now you can remove the above instructions from this doc, and then you have a template for your own README document to modify as desired. Continue with Project Setup section below.

---

# [your-project-name]

## Project Setup

1. Set your node to the current Node required for this repo by running:

```sh
nvm use
```

2. Google Authenticate

The first time you set up, you need to install the Google Cloud SDK and run an auth helper.

```sh
brew install --cask google-cloud-sdk
gcloud init
```

Each time you clone and npm install, you need to:

```sh
gcloud auth login
npx google-artifactregistry-auth

```

3. Install dependencies

```sh
npm i
```

# Overview

By default, the template repo is set up as a UI monorepo that produces named outputs like /landing-pages.js which are small, granularly deployed packages that leverage shared tooling, configuration and code.

## Development

In writing components, it is recommended to use the the Hook View Controller (HVC) pattern to best separate concerns and allow for easy testability and refactoring. (In Vue, this is Composable View Controller)

Hook / Composable (useGetHelloWorld.ts)

- Pure TS file which contains and/or imports functions from utility files
- Provides generic, reusable Vue refs and lifecycle methods
- E.g. can do a fetch onMounted, where the fetch comes from `util/fetch.ts`

View (HelloWorld.vue)

- Receives props from controller
- Handles display concerns
- Emits events like clicks up to controller to handle

Controller (HelloWorldController.vue):

- Provides the domain context
- Connects view and hook

### Storybook

Storybook is the primary environment used for building components.

Stories can be used to test View display and Controller and Hook logic, by using MSW which is wired in by default. See HelloWorld.stories.

```sh
npm run storybook
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Mocking

The project uses Mock Service Worked (MSW) to mock network requests.

- You can add additional handlers in `src/mocks/handlers.ts`
- Mocked requests are used both in Storybook and Vitest.
- Handlers can be overridden in Storybook to test different UI for different response scenarios, for example:

```
/**
 * Mocks creator not being available
 */
export const NotAvailable = {
  ...IsAvailable,
  parameters: {
    msw: {
      handlers: [
        http.get(IS_CREATOR_UPGRADE_AVAILABLE, () => {
          return HttpResponse.json(false);
        }),
      ],
    },
  },
};
```

### Images and other assets

Images should generally use SVG format and leverage one of the following patterns:

1. Bigger than icon?

   a. Create a folder for your project on ui.impact.com in [the assets folder](https://console.cloud.google.com/storage/browser/ui-impact-com/onboarding-ui/cross-sell/assets/)

   b. Add a source controlled copy of the asset, to be used for recovery in case the CDN image ever gets deleted or overwritten

   1. Add or use existing folder in project root called `cdn-assets`
   2. Put folders that match your CDN folders
   3. Add README.md to `cdn-assets` with the location of your project's CDN folder

2. Icon size, and doesn't need to be modified with CSS (e.g. use it exactly as is)?
   a. Insert via CSS using `content: url()`

```html
<span class="icon-circle-plus-orange"></span>
```

```css
.icon-circle-plus-orange {
  content: url("data:image/svg+xml,<svg ... svg stuff ></svg>");
}
```

3. Icon size, and needs to be modified with CSS?
   - Inline the image in the Vue template
   - Not preferred b/c more expensive to have this in DOM but a fine fallback option
   - For UICL Icons this is the way to do it for now
   - Once we upgrade to Vue 3, we can re-adopt the UICL Icon component

## Testing

### Run and watch Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run all tests once

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Build and deploy

The builds produce web component custom elements like <this-is-my-custom-element /> which are made available by including the loader file in the core page, e.g.

```
https://ui.assets.impact.com/onboarding-ui/mono/production/landing-pages-loader.js
```

To run a single build:

```sh
npm run build:lp // builds landing pages
```

Or to run all builds:

```sh
npm run build
```

New packages will need to be added to the build command via:

```sh
 && vite build -c src/my-package/vite.config.ts
```

## CI / CD

Several Github Actions support build and deploy processes.

- Node.js CI - Runs the unit tests when a PR is created
- Bucket deployment - Deploys a branch to the specified bucket in CDN on demand
- Storybook branch deployment — Deploys a storybook build from a specified branch to CDN

### Env friend

To speed dev, test and deploy cycles, we use a loader to specify which build artifact to load and use [tool.js](https://js-cdn.impact.com/npm/envfriend@0.0.16/dist/tool.js)

By default, when using env friend and a loader, the version deployed to `production` bucket on the CDN will be used to load the JS output file.

During CD, the build can also be deployed to different buckets e.g. `stage6`. Env friend can be set so that for the bundle in your project, the path to the JS output file is overridden with the environment you want to point to. Envfriend can also set an override to point to localhost.

Please see the following file for instructions on how to install and use the chrome extension for quickly setting the environment variable to control which
https://gist.github.com/anatolipr/103a9a99eb4b14f1b25291509666b7cb

The first example build is `landing-pages` so to set the envfriend do this:

```
__envfriend.overrideCurrentEnvironment('onboarding-ui/landing-pages', 'http://localhost:5173/dist');
```

An example of how to use this in production for a web component build would be:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Add-on integration service</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10"></script>
    <script src="[path-to-your-CDN]/loader.js"></script>
  </head>

  <body>
    <div id="app">
      <custom-integration></custom-integration>
    </div>
  </body>
</html>
```
