const gulp = require('gulp');
const connection = require('./dbConnection');
const getServerStatus = require('./get-status');
const shelljs = require('shelljs');

gulp.task('init', () => {
    // connect to Mysql database
    connection.connect(function(err) {
        if(!err) {
            console.log("Database is connected ... \n"); 
        } else {
            console.log("Error connecting database ... \n");
        }
    });
    shelljs.rm('rf', 'temp');
    shelljs.mkdir('-p', 'temp');
});

gulp.task('get-status', ['init'], () => {
    getServerStatus(connection);
});

gulp.task('disconnect-db', ['get-status'], () => {
    // connection.end();
    shelljs.rm('rf', 'temp');
    console.log('database is disconnected');
})

gulp.task('default', ['disconnect-db']);