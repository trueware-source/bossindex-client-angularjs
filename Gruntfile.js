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
              {expand: true, src: ['**/*','!**/node_modules/**','!**/bower_components/**'], dest: 'dist/'},
            ],
          },
        },
        aws_s3: {
          production: {
            options:{
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: 'ap-southeast-2',
              uploadConcurrency: 5, // 5 simultaneous uploads
              bucket: 'trueware-app',
            },
            files: [
              {expand: true, src: ['dist/**'], dest: 'dist/'},
            ],
          }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('package', ['copy:release'])
    grunt.registerTask('release', ['package','aws_s3:production'])
};

