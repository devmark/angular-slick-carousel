
module.exports = function(grunt) {

    // add this at the beginning to time all grunt tasks
    require('time-grunt')(grunt);

    grunt.initConfig({
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },
                files: {
                    'dist/slick.min.js': ['dist/slick.js'],
                    'example/angular-slick-carousel/slick.min.js': ['example/angular-slick-carousel/slick.js']
                }
            }
        },
        src: {
            js: ['js/*.js']
        },

        coffee: {
            dist: {
                files: {
                    'dist/slick.js': 'src/slick.coffee',
                    'example/angular-slick-carousel/slick.js': 'src/slick.coffee'
                }
            }
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
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('dist', ['coffee', 'uglify']);
};
