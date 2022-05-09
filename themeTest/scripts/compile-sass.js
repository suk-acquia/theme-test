//  requiring path and fs modules
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

//  joining path of directory
const directoryPath = path.join(__dirname, '../scss');
//  passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const directories = [];

    // listing all files using forEach
    files.forEach(function (file) {
        // push the directory into the directories array
        const newFolder = directoryPath + '/' + file;
        directories.push(newFolder);
    });

    // start our sassCompile command
    let sassCompile = 'sass --watch ';

    directories.forEach(function (directory) {
        const cssDirectory = directory.replace('scss', 'css');

        if (fs.existsSync(directory + '/main.scss')) {
            sassCompile += directory + '/main.scss:' + cssDirectory + '/main.css ';
        }
    });

    console.log('<<<Watching main.scss files for changes!!!>>>');

    exec(sassCompile);
});
