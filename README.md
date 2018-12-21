# GitHub User Search

Simple project, which enables finding users of GitHub and listing their repos. 
Created just for demonstration purposes. 

## Install

```sh
npm i
```

## Usage

```sh
npm start
```

## Demo 

Current version of project, is available on:
https://react-app-horak.herokuapp.com/

## Notes 

Current status of a project:
https://trello.com/b/PwiSbDU7/github-user-search

##### Webpack Monitor

There is also Webpack Monitor for project available. 
To run it, some changes in `webpack.config.js` are required:

```js
new WebpackMonitor({
    capture: true,
    target: './monitor/myStatsStore.json',
    launch: true, // <-- this value has to be set on true 
    port: 3030,
})
```

##### Autocomplete

Autocomplete feature was applied based on snippet available on: 
https://material-ui.com/demos/autocomplete/ (version with react-autosuggest). 

## Browser support

Tested only on Chrome, but should work on all modern browsers.

## Test

For local automated tests, run `npm run test`.



