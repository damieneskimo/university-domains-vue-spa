# University Domains (Vue SPA)
This project is a Vue Single Page Application (SPA) for displaying a list of universities. SPA will retrieve the data from API in the project: https://github.com/damieneskimo/university-domains. <br />
It uses Laravel Echo (https://github.com/laravel/echo) to listen for events (UniversityCacheDeleted, UniversityCacheUpdated) and update the UI in real time, without the need to refresh the page.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
