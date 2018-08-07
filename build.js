var path    = require('path')
var fs      = require('fs')
var srcDir  = path.join('.', 'src')
var dstDir  = path.join('.', 'dist')
var jsonDir = path.join(dstDir, 'json')
var jsDir   = path.join(dstDir, 'js')
var inspect = require('util').inspect;
var jsHead  = 'window.Postal=';
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
  .split('latitude: ').join('latitude:')
  .split('longitude: ').join('longitude:')
  .split(", country:'").join(",country:'")
  .split(", postal:'").join(",postal:'")
  .split(", c:").join(",c:")
  .split("'}, '").join("'},'")
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
    jsHead2 = 'window.Postal=window.Postal||{};Postal["'+countryCode+'"]=';
    fs.writeFileSync(path.join(jsonDir, filename), JSON.stringify(data), 'utf8')
    fs.writeFileSync(path.join(jsDir,   filename.replace('.json', '.js')), jsHead2 + jsify(data) + ';', 'utf8')
    allData[countryCode] = data;
    if (data.postal) {
      data = data.postal;
      let priorI = '',priorR='',priorC='';
      for (let i in data) {
        data[i] = {
          r: data[i].region,
          c: data[i].city
        }
        if (countryCode == 'US') {
          data[i].r = data[i].r
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
        }
        if (data[i].r == priorR && data[i].c == priorC) {
          data[i] = priorI
        } else {
          priorI = i;
          priorR = data[i].r;
          priorC = data[i].c;
        }
      }
      fs.writeFileSync(path.join(jsonDir + '-city', filename), JSON.stringify(data), 'utf8')
      fs.writeFileSync(path.join(jsDir   + '-city', filename.replace('.json', '.js')), jsHead + jsify(data) + ';', 'utf8') 
      cityData[countryCode] = data;
    }
  }
}


fs.writeFileSync(path.join(jsonDir, 'geo-postal.json'),     JSON.stringify(allData, null, 2), 'utf8')
fs.writeFileSync(path.join(jsonDir, 'geo-postal.min.json'), JSON.stringify(allData), 'utf8')
fs.writeFileSync(path.join(jsDir,   'geo-postal.js'),       jsHead + inspect(allData) + ';', 'utf8')
fs.writeFileSync(path.join(jsDir,   'geo-postal.min.js'),   jsHead + jsify(allData) + ';', 'utf8')

fs.writeFileSync(path.join(jsonDir + '-city', 'geo-postal.json'),     JSON.stringify(cityData, null, 2), 'utf8')
fs.writeFileSync(path.join(jsonDir + '-city', 'geo-postal.min.json'), JSON.stringify(cityData), 'utf8')
fs.writeFileSync(path.join(jsDir + '-city',   'geo-postal.js'),       jsHead + inspect(cityData) + ';', 'utf8')
fs.writeFileSync(path.join(jsDir + '-city',   'geo-postal.min.js'),   jsHead + jsify(cityData) + ';', 'utf8')

var template = '!function(w,o){o=$data;(typeof module=="object")?module.exports=o:w.GeoPostal=o}(this);';

fs.writeFileSync('geo-postal.js',     template.replace('$data', JSON.stringify(allData, null, 2)), 'utf8')
fs.writeFileSync('geo-postal.min.js', template.replace('$data', JSON.stringify(allData)), 'utf8')
