const fs = require('fs');


try {
    const data = require('./data.json');
    const games = data.games;
    const providers = data.providers;
    const groups = data.groups;
    module.exports = { games, providers, groups };
} catch (error) {
    console.log("Error during file read. ", error)
}