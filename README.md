# pickpoint

This is a client library for Pickpoint API.

## Install

```
npm install pickpoint --save
```

## Usage:

Simple example

```js
const Pickpoint = require('pickpoint');
const api = new Pickpoint(
    'apitest', // login
    'apitest', // password
    {
        test: true, // it will set API url to http://e-solution.pickpoint.ru/apitest/
        session: {
            lifetime: 3600 // how often call login
        },
        timeout: 60 // API timeout
    }
);

api.getCities()
    .then(console.log)
    .catch(console.error);
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
 * createZLabels
 * getCities
 * getPostamatList
 * getZones
 * getReturnDocuments

Full description of API parameters you can see in Pickpoint integration docs.