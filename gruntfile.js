module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                sourceMap: false,
                sourceMapIncludeSources: false,
                banner: '/**\n * @link https://couchfriends.com\n * @license MIT\n */\n'
            },
            build: {
                src: [
                    'node_modules/matter-js/build/matter.js',
                    'src/Funky.js',
                    'src/Funky.Levels.js',
                    'src/Funky.Player.js',
                    'src/game.js'
                ],
                dest: 'build/game.js'
            }
        },
        copy: {
            main: {
                src: 'src/assets/*',
                dest: 'build/assets/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-copy');

};