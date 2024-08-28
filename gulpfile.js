const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const clean = require("gulp-clean");
const plumber = require("gulp-plumber");

gulp.task("styles", () => {
    return gulp
        .src("src/sass/style.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 2 version"] }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest("src/css"));
});
gulp.task("html", () => {
    return gulp.src("./src/*.html").pipe(browserSync.stream());
});
gulp.task("build", () => {
    return gulp
        .src("./src/js/main.js")
        .pipe(plumber())
        .pipe(
            webpack({
                mode: "development",
                output: {
                    filename: "script.js",
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "@babel/preset-env",
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest("src"))
        .on("end", browserSync.reload);
});

gulp.task("server", () => {
    browserSync.init({
        server: "./src/",
        port: 4000,
        notify: true,
    });
});
gulp.watch("./src/js/**/*.*", gulp.parallel("build"));
gulp.watch("./src/sass/**/*.scss", gulp.parallel("styles"));
gulp.watch("./src/*.html", gulp.parallel("html"));

gulp.task("default", gulp.parallel("server", "build", "styles", "html"));
//пушим в папку Dist
gulp.task("buildprodact", () => {
    return gulp
        .src("./src/script.js")
        .pipe(
            webpack({
                mode: "production",
                output: {
                    filename: "script.js",
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "@babel/preset-env",
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest("dist"))
        .on("end", browserSync.reload);
});

gulp.task("file", () => {
    return gulp
        .src(
            ["src/**/*.html", "src/css/**/*", "src/fonts/**/*", "src/images/**/*", "src/icons/**/*"],

            {
                base: "src",
                encoding: false,
            }
        )

        .pipe(gulp.dest("dist"));
});
gulp.task("clean", () => {
    return gulp.src("dist/*").pipe(clean());
});

gulp.task("test", gulp.series("clean", "file", "buildprodact"));
