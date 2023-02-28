# Features
This readme serves to get an overview of the development of the individual features of this project.

## Search
The search uses the Api of OpenAtlas. Search parameters are stored via the url. This makes it easier to share different search queries.  [query storage](./store/query.js) interprets the url and via `getQuery` the necessary data for the search query can be accessed. This can then be passed to the API to filter the desired entities.

## Data View
The data view contains four different view methods defined by the routes.
The 'layout' of the data view is located in the [data.vue](./pages/data.vue) file. The four different views can be changed with the component [VueToggler](./components/VueToggler.vue). This is done by simply changing the path. The four different view pages can be found in the subfolder of `./pages/data`.

## Collections
Collections are basically entities that have been given the type of a collection. The detail view of the collections is basically a redundant form of the detail view that contains only those entities that belong to the collection. This redundancy was necessary because collections need a permalink.

## Sourcebook
The sourcebook displays the pdf files of publications uploaded to openatlas.

# API
The api uses the swaggerfile as interface. With `$api` requests can be sent.
