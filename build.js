var path   = require('path')
var fs     = require('fs')
var srcDir = path.join('.', 'src')
var dstDir = path.join('.', 'dist')

var files = fs.readdirSync(srcDir);
var allData = {}
for (var i in files) {
  var filename = files[i];
  if (filename.indexOf('.json') > 0) {
    var dataText = fs.readFileSync(path.join(srcDir, filename), 'utf8')
    data = JSON.parse(dataText)
    fs.writeFileSync(path.join(dstDir, filename), JSON.stringify(data), 'utf8')
    allData[data.id] = data;
  }
}

var allDataString = JSON.stringify(allData, null, 2)
var allDataMinString = JSON.stringify(allData)

fs.writeFileSync(path.join(dstDir, 'geo-postal.json'), allDataString, 'utf8')
fs.writeFileSync(path.join(dstDir, 'geo-postal.min.json'), allDataMinString, 'utf8')

var template = '!function(w,o){o=$data;(typeof module=="object")?module.exports=o:w.GeoPostal=o}(this);';

fs.writeFileSync('geo-postal.js', template.replace('$data', allDataString), 'utf8')
fs.writeFileSync('geo-postal.min.js', template.replace('$data', allDataMinString), 'utf8')
