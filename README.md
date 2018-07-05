# geo-postal

Geographic data by ISO Country Code and Postal code

NodeJS or Browser

## NodeJS

```sh
npm i geo-postal --save
```

```js
var GeoPostal = require('geo-postal')
console.log(GeoPostal.AE) /* {
  "id": "AE",
  "country": "United Arab Emirates",
  "postal": {
    "": {
      "code": "",
      "region": "Dubayy",
      "city": "Dubai",
      "latitude": 25.25817,
      "longitude": 55.30472
    }
  }
}*/
```

## Browser

```js
<script src="https://rawgit.com/yieme/geo-postal/master/dist/geo-postal.min.js"></script>
<script>
  console.log(GeoPostal.AE) 
</script>
```

## JSON data

All data `dist/geo-postal.json` 

Individual country `.json` files are in the `dist/` folder by ISO country ID

## Build the data

```sh
npm run build
```

## License

MIT