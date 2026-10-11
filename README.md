# Frascold Cooling Management Platform

Angular 22 application for managing Frascold CoolingHubs and their refrigeration items.

## Run the fake API

Install the dependencies, then start the API from the project root:

```bash
npm install
npm run api
```

This runs json-server 0.17.4 with `server/db.json` at `http://localhost:3000`.
The application reads `/cooling-hubs` and `/refrigeration-items` from this API.

## Run the application

In a second terminal:

```bash
npm start
```

Open `http://localhost:4200`. Sample refrigeration components are loaded from the matching
endpoint at `https://api.sampleapis.com/refrigeration` when a cooling type is selected.

## Project structure

The application is organized by bounded context and layered architecture:

- `src/app/shared`: layout, language switching, and shared infrastructure.
- `src/app/preservation`: CoolingHubs, RefrigerationItems, overview state, and registration.
- `src/app/refrigeration`: SampleAPI components and cooling type selection.
- `src/environments`: API base URLs and the Logo.dev token.
- `server/db.json`: json-server data for the fake API.

The interface defaults to English and supports English and Spanish. It uses Angular Material,
standalone components, Angular Signals, HttpClient, Angular Router, and ngx-translate.
