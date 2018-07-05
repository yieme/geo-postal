var path   = require('path')
var fs     = require('fs')
var srcDir = path.join('.', 'src')
var dstDir = path.join('.', 'dist')
var pack   = require('./package.json')
var ver    = pack.version.replace('1.0.0', '')

var files = fs.readdirSync(srcDir);
for (var i in files) {
  var filename = files[i];
  if (filename.indexOf('.json') > 0) {
    var part = filename.split('.')
    if (part[0].length == 2) {
      var dataText = fs.readFileSync(path.join(srcDir, filename), 'utf8')
      data = JSON.parse(dataText)
      console.log('git add ' + path.join(srcDir, filename) 
      + '&& git add ' + path.join(dstDir, filename) 
      + '&& git commit -m "' + (data.country + ' ' + ver).trim() + '"')
    }
  }
}