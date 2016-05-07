const exec = require('child_process').exec;

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
            bin: {
                options: {
                    mode: "777"
                },
                expand: true,
                cwd: 'src/',
                src: [
                    'bin/cpm'
                ],
                dest: 'dist/'
            },
            
            cpmrc: {
                expand: true,
                cwd: 'src/tmp',
                src: ['.cpmrc'],
                dest: process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
            },
            
            memeify: {
                expand: true,
                cwd: 'dist',
                dest: 'dist/',
                src: ['lib/*.js'],
                rename: (PATH, NAME) => PATH + NAME
                    .replace('install', 'juic')
                    .replace('help', 'halp')
                    .replace('config', 'juicr')
            }
        }
    });
    
    const DEFAULT = ['copy:bin', 'babel'];
    
    grunt.registerTask('default', DEFAULT, () => {
        grunt.task.run(DEFAULT);
        
        if (grunt.option('memeify') === true)
            grunt.task.run('copy:memeify');
    });
    grunt.registerTask('install', 'installs and initalizes cpm files and directories', () => {
        grunt.task.run(DEFAULT.concat([
            'copy:cpmrc'
        ]));
        
        if (grunt.option('alias') === true)
            exec(
                `echo -e "alias sudo='sudo '\nalias cpm='${__dirname}/dist/bin/cpm'" >> $([[ -f ~/.bash_profile ]] && echo ~/.bash_profile || echo ~/.bashrc)`,
                { shell: '/bin/bash' }
            );
        
    });
};