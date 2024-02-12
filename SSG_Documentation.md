# Overview

This is the documentation for the SSG (Simple Static Generator). The SSG is a tool to generate a static version of the Shahi Kingdoms Database. The static version can be served from any web server and does not require a backend. The SSG is based on v2 of [Nuxt.js](https://nuxtjs.org/), a framework based on [Vue.js](https://vuejs.org/).

# Setup

Clone the repository and install all dependencies in the application root with
```bash
$ npm install
```

If not already present, you will need to get the media files from the Backend and add them in a folder called `entity_files` under `dist`. So that the path to a file will be `dist/entity_files/*id*.*`. This is the path used for images and co during the generation step. More details later on.

In the `package.json` file, you'll find the `export` script which runs the `nuxt generate` command. Running this script will generate the static site.

In the `nuxt.config.js` file, you'll find the `generate` object. This is where you can configure the generator.

The `routes` property is used to manually specify routes that are not automatically crawled. Additionally, we use it to provide the payload to the routes in the generating step to speed up the process. Further, we use it to remap the routes that would normally point to images in the backend to instead point to the local files.
Additionally in `pages/_q.vue` there is some mapping happening to get the the proper descriptions of the depcitions. *This could also be relevant for the feedback from Jan 2024 regarding the license description.*


# ToDo's / Feedback

## Jan 2024

Required:
 - Category Toolbar - (All artifacts | archaeological sites | stationary structures | etc.) It is the main structure of our database, and essential for understanding the material.

Important:
 - Advanced search without AND/OR but in the different properties of the entities
 - License Description - Currently misssing on for image licenses

