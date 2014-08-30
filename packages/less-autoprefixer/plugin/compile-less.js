var fs = Npm.require('fs');
var path = Npm.require('path');
var less = Npm.require('less');
var Future = Npm.require('fibers/future');
var autoprefixer = Npm.require('autoprefixer-core');
var configFile = "autoprefixer-config-dev.json"; // path to configuration file for autoprefixer


Plugin.registerSourceHandler("less", {archMatching: 'web'}, function (compileStep) {
  var source = compileStep.read().toString('utf8');
  var options = {
    filename: compileStep.inputPath,
    // Use fs.readFileSync to process @imports. This is the bundler, so
    // that's not going to cause concurrency issues, and it means that (a)
    // we don't have to use Futures and (b) errors thrown by bugs in less
    // actually get caught.
    syncImport: true,
    paths: [path.dirname(compileStep._fullInputPath)] // for @import
  };

  var parser = new less.Parser(options);
  var astFuture = new Future;
  var sourceMap = null;
  try {
    parser.parse(source, astFuture.resolver());
    var ast = astFuture.wait();

    var css = ast.toCSS({
      sourceMap: true,
      writeSourceMap: function (sm) {
        sourceMap = JSON.parse(sm);
      }
    });
  } catch (e) {
    // less.Parser.parse is supposed to report any errors via its
    // callback. But sometimes, it throws them instead. This is
    // probably a bug in less. Be prepared for either behavior.
    compileStep.error({
      message: "Less compiler error: " + e.message,
      sourcePath: e.filename || compileStep.inputPath,
      line: e.line,
      column: e.column + 1
    });
    return;
  }

  var autoprefixerOptions;
  try {
    // synchronously read the configuration file
    autoprefixerOptions = JSON.parse(fs.readFileSync(configFile).toString('utf8'));
    if (!autoprefixerOptions)
      console.log(" \n less-autoprefixer: Cannot read the config file: " + configFile);
  } catch (e) {
    // handle `file not found` error, set a fallback
    autoprefixerOptions = {
      "browsers": ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "BlackBerry 10", "Android 4", "ios 5", "Explorer 10"]
    };
    if (e.code === 'ENOENT') {
      console.log( '\n less-autoprefixer: Cannot find ' + configFile + ' file in the project root! Falling back to default options.');
    } else {
      throw e;
    }
  }
  // run autoprefixer on compiled css with custom options passed
  css = autoprefixer(autoprefixerOptions).process(css).css;


  if (sourceMap) {
    sourceMap.sources = [compileStep.inputPath];
    sourceMap.sourcesContent = [source];
    sourceMap = JSON.stringify(sourceMap);
  }

  compileStep.addStylesheet({
    path: compileStep.inputPath + ".css",
    data: css,
    sourceMap: sourceMap
  });
});;

// Register import.less files with the dependency watcher, without actually
// processing them. There is a similar rule in the stylus package.
Plugin.registerSourceHandler("import.less", function () {
  // Do nothing
});

// Backward compatibility with Meteor 0.7
Plugin.registerSourceHandler("lessimport", function () {});
