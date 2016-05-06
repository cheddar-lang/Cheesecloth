module.exports = function(grunt) {
    
    // Hack to hide run headers
    grunt.log.header = function() {};

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015'],
                plugins: []
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.es6'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },
        copy: {
            main: {
                options: {
                    mode: "777"
                },
                expand: true,
                cwd: 'src/',
                src: [
                    'bin/cpm'
                ],
                dest: 'dist/'
            }
        }
    });

    grunt.registerTask('default', ['copy', 'babel']);
};