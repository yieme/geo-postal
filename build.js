var path    = require('path')
var fs      = require('fs')
var srcDir  = path.join('.', 'src')
var dstDir  = path.join('.', 'dist')
var jsonDir = path.join(dstDir, 'json')
var jsDir   = path.join(dstDir, 'js')
var inspect = require('util').inspect;
var jsHead  = 'window.GeoPostal=';
var mkdirSync = fs.mkdirSync;


function jsify(obj, x) {
  return inspect(obj, {compact:true})
  .split('\n').join('')
  .split('{ ').join('{')
  .split(": '").join(":'")
  .split("\t").join('')
  .split(":        {").join(":{")
  .split(":       {").join(":{")
  .split(":      {").join(":{")
  .split(":     {").join(":{")
  .split(":    {").join(":{")
  .split(":   {").join(":{")
  .split(":  {").join(":{")
  .split("': {").join("':{")
  .split("':{").join("':{")
  .split("',        ").join("',")
  .split("',       ").join("',")
  .split("',      ").join("',")
  .split("',     ").join("',")
  .split("',    ").join("',")
  .split("',   ").join("',")
  .split("',  ").join("', ")
  .split(",        ").join(',')
  .split(",       ").join(',')
  .split(",      ").join(',')
  .split(",     ").join(',')
  .split(",    ").join(',')
  .split(",   ").join(',')
  .split(",  ").join(', ')
  .split(' }').join('}')
  .split(' }').join('}')
  .split('latitude: ').join('latitude:')
  .split('longitude: ').join('longitude:')
  .split(", country:'").join(",country:'")
  .split(", postal:'").join(",postal:'")
  .split(", city:").join(",city:")
  .split("'}, '").join("'},'");
}

var files    = fs.readdirSync(srcDir);
var allData  = {}
var cityData = {}
for (var i in files) {
  var filename = files[i];
  if (filename.indexOf('.json') > 0) {
    var dataText = fs.readFileSync(path.join(srcDir, filename), 'utf8')
    data = JSON.parse(dataText)
    var countryCode = data.id;
    var jsonCcDir = path.join(jsonDir, countryCode);
    var jsCcDir   = path.join(jsDir,   countryCode);
    try {
      mkdirSync(jsonCcDir);
      mkdirSync(jsCcDir);
    } catch(e) {}
    jsHead2 = '!function(w,g,c){w[g]=w[g]||{};w[g][c]=w[g][c]||{};w[g][c]';
    jsTail2 = "}(window,'GeoPostal','"+countryCode+"');";
    fs.writeFileSync(path.join(jsonDir, filename), JSON.stringify(data), 'utf8')
    allData[countryCode] = data;
    if (data.postal) {
      data = data.postal;
      for (let code in data) {
        if (code) {
          fs.writeFileSync(path.join(jsonCcDir, code + '.json'), JSON.stringify(data[code]), 'utf8')
          fs.writeFileSync(path.join(jsCcDir,   code + '.js'), jsHead2 + '["' + code + '"]=' + JSON.stringify(data[code]) + jsTail2, 'utf8')
        }
      } // endfor
    } // endif data.postal
  } // endif filename.indexOf('.json') > 0
}

fs.writeFileSync(path.join(jsonDir, 'geo-postal.json'),     JSON.stringify(allData, null, 2), 'utf8')
fs.writeFileSync(path.join(jsonDir, 'geo-postal.min.json'), JSON.stringify(allData), 'utf8')
fs.writeFileSync(path.join(jsDir,   'geo-postal.js'),       jsHead + inspect(allData) + ';', 'utf8')
fs.writeFileSync(path.join(jsDir,   'geo-postal.min.js'),   jsHead + jsify(allData) + ';', 'utf8')

var template = '!function(w,o){o=$data;(typeof module=="object")?module.exports=o:w.GeoPostal=o}(this);';

fs.writeFileSync('geo-postal.js',     template.replace('$data', JSON.stringify(allData, null, 2)), 'utf8')
fs.writeFileSync('geo-postal.min.js', template.replace('$data', JSON.stringify(allData)), 'utf8')

/*
          .replace("Alabama", "AL")
          .replace("Alaska", "AK")
          .replace("American Samoa", "AS")
          .replace("Arizona", "AZ")
          .replace("Arkansas", "AR")
          .replace("California", "CA")
          .replace("Colorado", "CO")
          .replace("Connecticut", "CT")
          .replace("Delaware", "DE")
          .replace("District of Columbia", "DC")
          .replace("Federated States of Micronesia", "FM")
          .replace("Florida", "FL")
          .replace("Georgia", "GA")
          .replace("Guam", "GU")
          .replace("Hawaii", "HI")
          .replace("Idaho", "ID")
          .replace("Illinois", "IL")
          .replace("Indiana", "IN")
          .replace("Iowa", "IA")
          .replace("Kansas", "KS")
          .replace("Kentucky", "KY")
          .replace("Louisiana", "LA")
          .replace("Maine", "ME")
          .replace("Marshall Islands", "MH")
          .replace("Maryland", "MD")
          .replace("Massachusetts", "MA")
          .replace("Michigan", "MI")
          .replace("Minnesota", "MN")
          .replace("Mississippi", "MS")
          .replace("Missouri", "MO")
          .replace("Montana", "MT")
          .replace("Nebraska", "NE")
          .replace("Nevada", "NV")
          .replace("New Hampshire", "NH")
          .replace("New Jersey", "NJ")
          .replace("New Mexico", "NM")
          .replace("New York", "NY")
          .replace("North Carolina", "NC")
          .replace("North Dakota", "ND")
          .replace("Northern Mariana Islands", "MP")
          .replace("Ohio", "OH")
          .replace("Oklahoma", "OK")
          .replace("Oregon", "OR")
          .replace("Palau", "PW")
          .replace("Pennsylvania", "PA")
          .replace("Puerto Rico", "PR")
          .replace("Rhode Island", "RI")
          .replace("South Carolina", "SC")
          .replace("South Dakota", "SD")
          .replace("Tennessee", "TN")
          .replace("Texas", "TX")
          .replace("Utah", "UT")
          .replace("Vermont", "VT")
          .replace("Virgin Islands", "VI")
          .replace("Virginia", "VA")
          .replace("Washington", "WA")
          .replace("West Virginia", "WV")
          .replace("Wisconsin", "WI")
          .replace("Wyoming", "WY")
*/
