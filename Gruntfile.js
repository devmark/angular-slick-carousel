
module.exports = function(grunt) {

    // add this at the beginning to time all grunt tasks
    require('time-grunt')(grunt);

    grunt.initConfig({
        src: {
            js: ['js/*.js']
        },

        test: {
            karmaConfig: 'test/unit/config/karma.conf.js',
            unit: ['test/unit/spec/**/*Spec.js']
        },
        karma: {
            unit: {
                configFile: '<%= test.karmaConfig %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
};
