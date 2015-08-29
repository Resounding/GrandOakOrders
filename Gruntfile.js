/*global module */
module.exports = function (grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        open: {
            site: {
                path: 'http://localhost:52464/'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: ['app/**/*.js', 'app/**/*.html', 'app/styles/site.less']
            }
        },
        exec: {
            'server': {
                cmd: 'IISExpress.exe /Site:GrandOakOrders /config:.vs\\config\\applicationhost.config'
            }
        },
        touch: {
            src: ['Index.html']
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            all: {
                tasks: ['server', 'client', 'watch']
            }
        }
    });

    grunt.registerTask('server', ['exec:server']);
    grunt.registerTask('client', ['open:site']);
    grunt.registerTask('reload', ['touch']);

    // define the default task that can be run just by typing "grunt" on the command line
    // the array should contains the names of the tasks to run
    grunt.registerTask('default', ['concurrent:all']);
};