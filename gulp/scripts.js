'use strict';

var gulp = require('gulp');
var through = require('through2');
var falafel = require('falafel');
var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(paths.src + '/{app,components}/**/*.ts')
    .pipe($.typescript())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(angularify({
      moduleName:'b2'
    }))
    .pipe(gulp.dest(paths.tmp + '/serve/'))
    .pipe($.size())
});

function angularify(opts) {

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // do nothing
    }

    if (file.isBuffer()) {
      var contents = file.contents.toString();
      contents = transform(contents,opts.moduleName);
      // console.log(contents);
      file.contents = new Buffer(contents.toString());
    }

    this.push(file);

    return cb();
  });

  // returning the file stream
  return stream;
};

function transform(contents,moduleName){
   return falafel(contents, {tolerant: true}, function (node) {
     registerControllerToModule(node,moduleName);
   }).toString();
}

function registerControllerToModule(node,moduleName){
 var decls, decl;
 if (node.type === 'VariableDeclaration' &&
     (decls = node.declarations) && decls.length === 1 &&
     (decl = decls[0]) && decl.id.name.match(/.*Controller/)) {
     if(decl.init.type === 'CallExpression'){
       var constructor = decl.init.callee.body.body[0];
       var constructorParams = constructor.params.map(function(param){
         return '\''+param.name + '\'';
       });
       var controllerName = decl.id.name;
       constructorParams.push(controllerName);
       var source = '\n    ';
       source += 'angular.module(\''+ moduleName +'\')';
       source += '.controller(\''+controllerName+'\',['+constructorParams.join('\,')+']);';
       node.update(node.source()+source);
     }
   return true;
 }
 return false;
}
