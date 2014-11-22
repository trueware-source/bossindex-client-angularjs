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
        ignores: [
                './bower_components/**/*'
        ]
    },
    copy: {
      release: {
        files: [
          {expand: true, src: ['**/*','!**/node_modules/**','!**/bower_components/**', '!karma.conf.js', '!package.json', '!bower.json'], dest: 'dist/'},
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
          {expand: true, cwd: 'dist/', src: ['**/*']},
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
  //deployment inspiration http://dev-blog.cloud-spinners.com/2014/02/complete-grunt-deployment-workflow-for.html
  grunt.registerTask('release', ['package','aws_s3:production'])
};

