var readFile = require('ks-readfile');

module.exports = function readFiles(originalPaths) {

  var paths = originalPaths.slice(0);
  var contents = [];

  return new Promise(function(resolve, reject) {

    (function recurse() {

      var path = paths.shift();
      if (! path) {
        resolve(contents);
      }
      return readFile(path)
        .then(function(content) {
          contents.push(content);
          return recurse();
        })
        .catch(function(err) {
          return reject(err);
        });
    })();
  });
};
