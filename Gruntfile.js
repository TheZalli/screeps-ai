module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-screeps');

	grunt.initConfig({
		screeps: {
			options: {
				email: 'misterzalli@gmail.com',
				password: 'CodePass8',
				branch: 'test',
				ptr: false
			},
			dist: {
				src: ['src/*.js']
			}
		}
	});
}
