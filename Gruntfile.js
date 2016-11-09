module.exports = function(grunt) {

    grunt.initConfig({
        clean: ['build/*'],
        bower_concat: {
            all: {
                dest: {
                    js: 'build/bower.js',
                    css: 'static/bower.css'
                },
                dependencies: {
                    'angular': ['jquery']
                },
                mainFiles: {
                    'angular-ui': ['build/angular-ui.js'],
                    'bootstrap': [
                        'dist/js/bootstrap.js',
                        'dist/css/bootstrap.css',
                        'dist/css/bootstrap-theme.css'
                    ]
                }
            }
        },
        uglify: {
            bower: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: 'build/main.js.map',
                    mangle: true,
                    compress: true
                },
                files: {
                    'static/main.min.js': 'build/main.js'
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';',
                sourceMap: true
            },
            dist: {
                // the files to concatenate
                src: [
                    'app/bower_components/jquery/dist/jquery.js',
                    'app/bower_components/moment/moment.js',
                    'app/bower_components/moment-timezone/moment-timezone.js',
                    'app/bower_components/bootstrap-daterangepicker/daterangepicker.js',
                    'app/bower_components/api-check/dist/api-check.js',
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap.js',
                    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'app/bower_components/angular-cookies/angular-cookies.js',
                    'app/bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
                    'app/bower_components/angular-file-upload/dist/angular-file-upload.js',
                    'app/bower_components/angular-formly/dist/formly.js',
                    'app/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
                    'app/bower_components/angular-moment/angular-moment.js',
                    'app/bower_components/angular-resource/angular-resource.js',
                    'app/bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
                    'app/bower_components/angular-ui/build/angular-ui.js',
                    'app/bower_components/angular-ui-router/release/angular-ui-router.js',
                    'app/bower_components/angular-wizard/dist/angular-wizard.js',
                    'app/bower_components/angular-xeditable/dist/js/xeditable.js',
                    'app/bower_components/angularjs-slider/dist/rzslider.js',
                    'app/bower_components/ng-rollbar/ng-rollbar.js',
                    'app/bower_components/rangy/rangy-core.js',
                    'app/bower_components/rangy/rangy-classapplier.js',
                    'app/bower_components/rangy/rangy-highlighter.js',
                    'app/bower_components/rangy/rangy-selectionsaverestore.js',
                    'app/bower_components/rangy/rangy-serializer.js',
                    'app/bower_components/rangy/rangy-textrange.js',
                    'app/bower_components/textAngular/dist/textAngular-sanitize.js',
                    'app/bower_components/textAngular/dist/textAngularSetup.js',
                    'app/bower_components/textAngular/dist/textAngular.js',
                    'app/bower_components/angular-file-upload/angular-file-upload.js',
                    'app/bower_components/checklist-model/checklist-model.js',
                    'build/templates.js',
                    'app/scripts/main.js',
                    'build/config.js',
                    'app/scripts/controllers/*.js',
                    'app/scripts/services/*.js'
                ],
                // the location of the resulting JS file
                dest: 'build/main.js'
            }
        },
        html2js: {
            options: {
                base: 'app',
                module: 'Commissions.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            }
            ,
            main: {
                src: [
                    'app/templates/*.html',
                    'app/templates/formly/*.html'
                ],
                dest: 'build/templates.js'
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'gitsha',
                            replace: '<%= gitinfo.local.branch.current.SHA %>'
                        },
                        {
                            match: 'environment',
                            replace: 'development'
                        }
                    ]
                },
                files: [
                    {
                        expand: false,
                        flatten: true,
                        src: 'app/scripts/config.js',
                        dest: 'build/config.js'
                    }
                ]
            }
        },
        gitinfo: {},
        copy: {
            main: {
                expand: true,
                cwd: 'app/static/',
                src: '**',
                dest: 'static/'
            }
        }
    });
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'gitinfo',
        'bower_concat',
        'clean',
        'html2js',
        'replace',
        'concat',
        'uglify',
        'copy'
    ]);
}