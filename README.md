# Shahi Kingdoms Database

# About

Shahi Kingdoms Database is a presentation webapp for the [Shahi](https://shahimaterialculture.univie.ac.at/) Project.


At the moment we are still in development phase.

Shahi Kingdoms Database is an [OpenAtlas](https://openatlas.eu) projects and therefore [OpenAtlasDiscovery](https://github.com/craws/OpenAtlasDiscovery) was used as basi

# Licensing

All code unless otherwise noted is licensed under the terms of the MIT License (MIT).
Please refer to the file COPYING in the root directory of this repository.

All documentation and images unless otherwise noted are licensed under the terms of Creative Commons
Attribution-ShareAlike 4.0 International License.
To view a copy of this license, visit 
[http://creativecommons.org/licenses/by-sa/4.0/](http://creativecommons.org/licenses/by-sa/4.0/)

# Technology

The web application is built using the [nuxtjs](https://nuxtjs.org/) framework based
on [Vuejs](https://vuejs.org/)

# Setup

Whilst the application ultimately runs in the browser and can be served from any web server
developing and deploying it requires [NodeJS](https://nodejs.org/en/about/releases/)
(minimum v10, current LTS is recommended).

After cloning the repository, install all dependencies in the application root with
```bash
$ npm install
```


## For Development

Serve with hot reload at localhost:3000
```
$ npm run dev
```

## For Deployment

Get all the media files from the backend and put them into the `/static/entity_files` folder. Their names should be the same as the entity ids in the database, followed by the file extension. For example, if the entity id is `123`, the image should be named `123.jpg`.

Generate the project files to /dist
```
$ npm run export
```

The resulting files in the /dist folder can be served from any web server or be exposed through
nuxt using
```
npm run start
```
When you are serving the application from your own server (ie Apache) you need to configure it
accordingly to avoid 404 responses on dynamically generated routes. Some examples can be found
in the [Vue Router Documentation](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) 


For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Using the generated container image

Nuxt.js by default binds to localhost. This is not going to work in a container environment because in such an environment the service has to bind to an ip address assigned to that containber.
This repository is setup to bind to any address if the container is run in an environment where the variable GITLAB_ENVIRONMENT_NAME is set (the value does not matter).
E. g. for the latest master branch image on Windows or Linux using docker you can run the service like this

```bash
docker run --rm -it -p 8080:8080 -e PORT=8080 -e GITLAB_ENVIRONMENT_NAME=something registry.gitlab.com/acdh-oeaw/shahi/shahi-frontend/master 
```
