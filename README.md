# pickpoint

This is a pickpoint.ru API for NodeJS.

## Install & Use

```
npm install pickpoint --save
```

Usage:

```js
var Pickpoint = require('./build/index.js');
var api = new Pickpoint('apitest', 'apitest', {test: true});
api.getCities().then(function (cities) {
    console.log(cities);
});
```

## Available methods

 * logout
 * createParcelsRegistry
 * createParcelsRegistryMulti
 * createParcelReturn
 * getReturnInvoiceList
 * getParcelHistory
 * getParcel
 * getParcelDeliveryCost
 * callCourier
 * cancelCourier
 * createRegistryPDF
 * createRegistry
 * getRegistry
 * getRegistryByParcelNumber
 * createLabels
 * getCities
 * getPostamatList
 * getZones
 * getReturnDocuments
 
Full implementation of Pickpoint API coming soon...