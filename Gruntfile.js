module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jshint: {
            files: [
                './scripts/**/*.js'
            ],
            options: {
                asi: false,
                bitwise: true,
                boss: false,
                browser: true,
                camelcase: true,
                couch: true,
                curly: true,
                debug: false,
                devel: true,
                eqeqeq: true,
                eqnull: true,
                es5: false,
                evil: true,
                expr: false,
                forin: false,
                globalstrict: true,
                immed: true,
                indent: true,
                jquery: true,
                latedef: true,
                laxbreak: false,
                loopfunc: false,
                mootools: true,
                newcap: true,
                noarg: true,
                node: true,
                noempty: false,
                nonew: true,
                nomen: false,
                onevar: false,
                passfail: false,
                plusplus: true,
                prototypejs: true,
                regexdash: true,
                regexp: true,
                rhino: false,
                undef: true,
                //  safe"         : false,
                shadow: true,
                strict: false,
                sub: true,
                supernew: false,
                trailing: true,
                white: false,
                wsh: false,
                predef: [
                    "jasmine",
                    "describe",
                    "xdescribe",
                    "it",
                    "xit",
                    "beforeEach",
                    "afterEach",
                    "expect",
                    "spyOn",
                    "runs",
                    "waits",
                    "waitsFor",
                    "angular",
                    "google"
                ],
                ignores: [
                    './bower_components/**/*'
                ]
            }
        },
        copy: {
          release: {
            files: [
              // includes files within path
              // {expand: true, src: ['css/*'], dest: 'dist/css/', filter: 'isFile'},
              // {expand: true, src: ['img/*'], dest: 'dist/img/', filter: 'isFile'},
              // {expand: true, src: ['partials/*'], dest: 'dist/partials/', filter: 'isFile'},
              // {expand: true, src: ['scripts/*'], dest: 'dist/scripts/', filter: 'isFile'},
              {expand: true, src: ['**/*','!**/node_modules/**','!**/bower_components/**'], dest: 'dist/'},
            ],
          },
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('package',['copy:release'])
};

