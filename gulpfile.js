// This is a task runner
let gulp = require('gulp');

// This is a node monitor: It monitors any change
let nodemon = require('gulp-nodemon');

// This helps us in testing
let gulpMocha = require('gulp-mocha');

// Used for executing our http calls 
let supertest = require('supertest');

// Used to manipulate the environment variables in gulp so that we can set up a test environment
// so that we can do an end to end testing including the database
let env = require('gulp-env'); 

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on("restart", function(){
        console.log("RESTARTING");
    })
});

gulp.task('test', function(){
    env({vars:  {ENV:'Testing'}});
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter:'nyan'}))
}); 