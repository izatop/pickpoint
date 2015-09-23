var Pickpoint = require('./build/index.js');
var api = new Pickpoint('apitest', 'apitest', {test: true});
var error = (e) => { console.log(e.stack); };

/*api.getCities().then(function (result) {
    "use strict";
    console.log(result);
}).catch(error);*/

api.logout().then(function (result) {
    "use strict";
    console.log(result);
}).catch(error);
