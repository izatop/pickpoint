/// <reference path="./request.ts" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('./request');

var _datatype = require('./datatype');

var DataType = _interopRequireWildcard(_datatype);

var API = (function () {
    function API(login, password) {
        var _this = this;

        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, API);

        this.client = new _request.Client();
        this.credentials = { login: login, password: password };
        this.client.setSessionHandler(function () {
            return _this.login();
        });
    }

    _createClass(API, [{
        key: 'login',
        value: function login() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                if (_this2.session) {
                    resolve(_this2.session);
                } else {
                    _this2.client.call({
                        method: 'POST',
                        url: 'login',
                        data: {
                            Login: _this2.credentials.login,
                            Password: _this2.credentials.password
                        }
                    }).then(function (result) {
                        if (result.ErrorMessage) {
                            reject(new Error(result.ErrorMessage));
                        } else if (result.SessionId) {
                            _this2.session = result.SessionId;
                            resolve(result.SessionId);
                        } else {
                            reject(new Error("Unknown error"));
                        }
                    })['catch'](function (error) {
                        return reject(error);
                    });
                }
            });
        }
    }, {
        key: 'logout',
        value: function logout() {
            return this.client.post(DataType.Response.Logout, 'logout');
        }
    }, {
        key: 'createParcelsRegistry',
        value: function createParcelsRegistry(parameters) {
            return this.client.post(DataType.Response.ParcelsRegistry, 'createsending', parameters);
        }
    }, {
        key: 'createParcelsRegistryMulti',
        value: function createParcelsRegistryMulti(parameters) {
            return this.client.post(DataType.Response.ParcelsRegistryMulti, 'CreateShipment', parameters);
        }
    }, {
        key: 'createParcelReturn',
        value: function createParcelReturn(parameters) {
            return this.client.post(DataType.Response.ReturnParcel, 'makereturn', parameters);
        }
    }, {
        key: 'getReturnInvoiceList',
        value: function getReturnInvoiceList(parameters) {
            return this.client.post(DataType.Response.ReturnInvoiceList, 'getreturninvoiceslist', parameters);
        }
    }, {
        key: 'getParcelHistory',
        value: function getParcelHistory(parameters) {
            return this.client.post(DataType.Response.ParcelHistory, 'tracksending', parameters);
        }
    }, {
        key: 'getParcel',
        value: function getParcel(parameters) {
            return this.client.post(DataType.Response.Parcel, 'sendinginfo', parameters);
        }
    }, {
        key: 'getParcelDeliveryCost',
        value: function getParcelDeliveryCost(parameters) {
            return this.client.post(DataType.Response.ParcelDeliveryCost, 'getdeliverycost', parameters);
        }
    }, {
        key: 'callCourier',
        value: function callCourier(parameters) {
            return this.client.post(DataType.Response.RegisteredCourier, 'courier', parameters);
        }
    }, {
        key: 'cancelCourier',
        value: function cancelCourier(parameters) {
            return this.client.post(DataType.Response.CancelledCourier, 'couriercancel', parameters);
        }
    }, {
        key: 'createRegistryPDF',
        value: function createRegistryPDF(parameters) {
            return this.client.post(DataType.Response.File, 'makereestr', parameters);
        }
    }, {
        key: 'createRegistry',
        value: function createRegistry(parameters) {
            return this.client.post(DataType.Response.Registry, 'makereestrnumber', parameters);
        }
    }, {
        key: 'getRegistry',
        value: function getRegistry(parameters) {
            return this.client.post(DataType.Response.File, 'getreestr', parameters);
        }
    }, {
        key: 'getRegistryByParcelNumber',
        value: function getRegistryByParcelNumber(parameters) {
            return this.client.post(DataType.Response.RegistryNumber, 'getreestrnumber', parameters);
        }
    }, {
        key: 'createLabels',
        value: function createLabels(parameters) {
            return this.client.post(DataType.Response.File, 'makelabel', parameters);
        }
    }, {
        key: 'getCities',
        value: function getCities() {
            return this.client.get(DataType.Response.CityList, 'citylist');
        }
    }, {
        key: 'getPostamatList',
        value: function getPostamatList() {
            return this.client.get(DataType.Response.PostamatList, 'postamatlist');
        }
    }, {
        key: 'getZones',
        value: function getZones(parameters) {
            return this.client.post(DataType.Response.Zones, 'getzone', parameters);
        }
    }, {
        key: 'getReturnDocuments',
        value: function getReturnDocuments(parameters) {
            return this.client.post(DataType.Response.ReturnDocuments, 'getreturn', parameters);
        }
    }, {
        key: 'calculate',
        value: function calculate(parameters) {
            return this.client.post(DataType.Response.Calculate, 'calctariff', parameters);
        }
    }]);

    return API;
})();

exports['default'] = API;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBUEkiLCJBUEkuY29uc3RydWN0b3IiLCJBUEkubG9naW4iLCJBUEkubG9nb3V0IiwiQVBJLmNyZWF0ZVBhcmNlbHNSZWdpc3RyeSIsIkFQSS5jcmVhdGVQYXJjZWxzUmVnaXN0cnlNdWx0aSIsIkFQSS5jcmVhdGVQYXJjZWxSZXR1cm4iLCJBUEkuZ2V0UmV0dXJuSW52b2ljZUxpc3QiLCJBUEkuZ2V0UGFyY2VsSGlzdG9yeSIsIkFQSS5nZXRQYXJjZWwiLCJBUEkuZ2V0UGFyY2VsRGVsaXZlcnlDb3N0IiwiQVBJLmNhbGxDb3VyaWVyIiwiQVBJLmNhbmNlbENvdXJpZXIiLCJBUEkuY3JlYXRlUmVnaXN0cnlQREYiLCJBUEkuY3JlYXRlUmVnaXN0cnkiLCJBUEkuZ2V0UmVnaXN0cnkiLCJBUEkuZ2V0UmVnaXN0cnlCeVBhcmNlbE51bWJlciIsIkFQSS5jcmVhdGVMYWJlbHMiLCJBUEkuZ2V0Q2l0aWVzIiwiQVBJLmdldFBvc3RhbWF0TGlzdCIsIkFQSS5nZXRab25lcyIsIkFQSS5nZXRSZXR1cm5Eb2N1bWVudHMiLCJBUEkuY2FsY3VsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O3VCQUVxQixXQUFXOzt3QkFDTixZQUFZOztJQUExQixRQUFROztJQU9wQixHQUFBO0FBS0lBLGFBTEosR0FBQSxDQUtnQkEsS0FBWUEsRUFBRUEsUUFBZUEsRUFBa0JBOzs7WUFBaEJBLE9BQU9BLHlEQUFPQSxFQUFFQTs7OEJBTC9ELEdBQUE7O0FBTVFDLFlBQUlBLENBQUNBLE1BQU1BLEdBQUdBLHFCQUFZQSxDQUFDQTtBQUMzQkEsWUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsRUFBQ0EsS0FBS0EsRUFBTEEsS0FBS0EsRUFBRUEsUUFBUUEsRUFBUkEsUUFBUUEsRUFBQ0EsQ0FBQ0E7QUFDckNBLFlBQUlBLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsWUFBQUE7QUFBUUEsbUJBQU9BLE1BQUtBLEtBQUtB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RUE7OztlQVFpQnBCLDRCQUFDQSxVQUEwQ0EsRUFBQUE7QUFDekRxQixtQkFBT0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZUFBZUEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7U0FDdkZBOzs7ZUFXUXJCLG1CQUFDQSxVQUEwQ0EsRUFBQUE7QUFDaERzQixtQkFBT0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsRUFBRUEsWUFBWUEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7U0FDbEZBOzs7V0FoUkwsR0FBQTs7O3FCQUFBLEdBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9yZXF1ZXN0LnRzXCIgLz5cclxuXHJcbmltcG9ydCB7Q2xpZW50fSBmcm9tICcuL3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBEYXRhVHlwZSBmcm9tICcuL2RhdGF0eXBlJztcclxuXHJcbmludGVyZmFjZSBDcmVkZW50aWFscyB7XHJcbiAgICBsb2dpbjpzdHJpbmc7XHJcbiAgICBwYXNzd29yZDpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSSB7XHJcbiAgICBjbGllbnQ6Q2xpZW50O1xyXG4gICAgY3JlZGVudGlhbHM6Q3JlZGVudGlhbHM7XHJcbiAgICBzZXNzaW9uOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2dpbjpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZywgb3B0aW9uczphbnkgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xyXG4gICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSB7bG9naW4sIHBhc3N3b3JkfTtcclxuICAgICAgICB0aGlzLmNsaWVudC5zZXRTZXNzaW9uSGFuZGxlcigoKSA9PiB7IHJldHVybiB0aGlzLmxvZ2luKCkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L3QsNGH0LDQu9CwINGB0LXQsNC90YHQsCDRgNCw0LHQvtGC0YsuINCSINC30LDQv9GA0L7RgdC1INC+0YLQv9GA0LDQstC70Y/QtdC80YHRjyDQu9C+0LPQuNC9INC4INC/0LDRgNC+0LvRjCxcclxuICAgICAqINCyINGB0LvRg9GH0LDQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0LgsINCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRjyDRg9C90LjQutCw0LvRjNC90YvQuSDQvdC+0LzQtdGAINGB0LXRgdGB0LjQuCwg0LrQvtGC0L7RgNGL0Lkg0LTQtdC50YHRgtCy0LjRgtC10LvQtdC9INCyINGC0LXRh9C10L3QuNC4INGD0YHRgtCw0L3QvtCy0LvQtdC90L3QvtCz0L4g0LLRgNC10LzQtdC90LguXHJcbiAgICAgKiDQktGB0Y8g0LTQsNC70YzQvdC10LnRiNCw0Y8g0YDQsNCx0L7RgtCwINCy0LXQtNC10YLRgdGPINC90LAg0L7RgdC90L7QstCw0L3QuNC4INC90L7QvNC10YDQsCDRgdC10YHRgdC40LguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dpbigpOlByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNlc3Npb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuY2FsbDx7RXJyb3JNZXNzYWdlPzpzdHJpbmcsIFNlc3Npb25JZD86c3RyaW5nfT4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2xvZ2luJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2luOiB0aGlzLmNyZWRlbnRpYWxzLmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYXNzd29yZDogdGhpcy5jcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuRXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVzdWx0LkVycm9yTWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LlNlc3Npb25JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24gPSByZXN1bHQuU2Vzc2lvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5TZXNzaW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmtub3duIGVycm9yXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0LfQsNCy0LXRgNGI0LXQvdC40Y8g0YHQtdCw0L3RgdCwINGA0LDQsdC+0YLRiy5cclxuICAgICAqINCSINC30LDQv9GA0L7RgdC1INC+0YLQv9GA0LDQstC70Y/QtdGC0YHRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDRgdC10YHRgdC40LguINCSINC+0YLQstC10YIg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINC/0YDQuNC30L3QsNC6INGD0YHQv9C10YjQvdC+0YHRgtC4INCy0YvQv9C+0LvQvdC10L3QuNGPLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBsb2dvdXQoKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkxvZ291dD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLkxvZ291dCwgJ2xvZ291dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINGA0LXQs9C40YHRgtGA0LDRhtC40Lgg0L7RgtC/0YDQsNCy0LvQtdC90LjQuS4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCxcclxuICAgICAqINGB0L7QtNC10YDQttCw0YnQsNGPINC90L7QvNC10YAg0YHQtdGB0YHQuNC4INC4INGB0L/QuNGB0L7QuiDQvtC/0LjRgdCw0L3QuNC5INC+0YLQv9GA0LDQstC70LXQvdC40LksINC60L7RgtC+0YDRi9C1INGC0YDQtdCx0YPQtdGC0YHRjyDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjC5cclxuICAgICAqXHJcbiAgICAgKiDQktC90LjQvNCw0L3QuNC1ISDQkiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LLQuNC0INC+0YLQv9GA0LDQstC70LXQvdC40Y8gKNC90LDQu9C+0LbQtdC90L3QvtC1L9C/0YDQtdC00L7Qv9C70LDRh9C10L3QvdC+0LUpINC90LUg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LfQvdCw0YfQtdC90LjRjiDQsiDQv9C+0LvQtSBTdW0sXHJcbiAgICAgKiDQv9GA0LjQvtGA0LjRgtC10YIg0L7RgtC00LDQtdGC0YHRjyDQt9C90LDRh9C10L3QuNGOINCyIFN1bS4g0KLQviDQtdGB0YLRjCwg0LXRgdC70Lgg0YPQutCw0LfQsNC90LAg0L3QtSDQvdGD0LvQtdCy0LDRjyDQv9C+0LvQvtC20LjRgtC10LvRjNC90LDRjyDRgdGD0LzQvNCwLCDQvtGC0L/RgNCw0LLQu9C10L3QuNC1INCx0YPQtNC10YJcclxuICAgICAqINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvdC+INC60LDQuiDQvdCw0LvQvtC20LXQvdC90YvRhSDQv9C70LDRgtC10LYg0Lgg0L3QsNC+0LHQvtGA0L7Rgi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBhcmNlbHNSZWdpc3RyeShwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUGFyY2Vsc1JlZ2lzdHJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbHNSZWdpc3RyeT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbHNSZWdpc3RyeSwgJ2NyZWF0ZXNlbmRpbmcnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDRgNC10LPQuNGB0YLRgNCw0YbQuNC4INC+0YLQv9GA0LDQstC70LXQvdC40LkuINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsXHJcbiAgICAgKiDRgdC+0LTQtdGA0LbQsNGJ0LDRjyDQvdC+0LzQtdGAINGB0LXRgdGB0LjQuCDQuCDRgdC/0LjRgdC+0Log0L7Qv9C40YHQsNC90LjQuSDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LCDQutC+0YLQvtGA0YvQtSDRgtGA0LXQsdGD0LXRgtGB0Y8g0LfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNGC0YwuXHJcbiAgICAgKlxyXG4gICAgICog0JLQvdC40LzQsNC90LjQtSEg0JIg0YHQu9GD0YfQsNC1INC10YHQu9C4INCy0LjQtCDQvtGC0L/RgNCw0LLQu9C10L3QuNGPICjQvdCw0LvQvtC20LXQvdC90L7QtS/Qv9GA0LXQtNC+0L/Qu9Cw0YfQtdC90L3QvtC1KSDQvdC1INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC30L3QsNGH0LXQvdC40Y4g0LIg0L/QvtC70LUgU3VtLFxyXG4gICAgICog0L/RgNC40L7RgNC40YLQtdGCINC+0YLQtNCw0LXRgtGB0Y8g0LfQvdCw0YfQtdC90LjRjiDQsiBTdW0uINCi0L4g0LXRgdGC0YwsINC10YHQu9C4INGD0LrQsNC30LDQvdCwINC90LUg0L3Rg9C70LXQstCw0Y8g0L/QvtC70L7QttC40YLQtdC70YzQvdCw0Y8g0YHRg9C80LzQsCwg0L7RgtC/0YDQsNCy0LvQtdC90LjQtSDQsdGD0LTQtdGCXHJcbiAgICAgKiDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0L3QviDQutCw0Log0L3QsNC70L7QttC10L3QvdGL0YUg0L/Qu9Cw0YLQtdC2INC4INC90LDQvtCx0L7RgNC+0YIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVQYXJjZWxzUmVnaXN0cnlNdWx0aShwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUGFyY2Vsc1JlZ2lzdHJ5TXVsdGkpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUGFyY2Vsc1JlZ2lzdHJ5TXVsdGk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5QYXJjZWxzUmVnaXN0cnlNdWx0aSwgJ0NyZWF0ZVNoaXBtZW50JywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0YHQvtC30LTQsNC90LjRjyDQvtGC0L/RgNCw0LLQu9C10L3QuNGPINC60LvQuNC10L3RgtGB0LrQvtCz0L4g0LLQvtC30LLRgNCw0YLQsCDQvdCwINC+0YHQvdC+0LLQtSDQvtCx0YvRh9C90L7Qs9C+INC+0YLQv9GA0LDQstC70LXQvdC40Y8uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVQYXJjZWxSZXR1cm4ocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlJldHVyblBhcmNlbCk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZXR1cm5QYXJjZWw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5SZXR1cm5QYXJjZWwsICdtYWtlcmV0dXJuJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGB0L/QuNGB0LrQsCDQstC+0LfQstGA0LDRgtC90YvRhSDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LCDQutC+0YLQvtGA0YvQtSDRgNCw0L3QtdC1INC90LUg0L/RgNC+0YXQvtC00LjQu9C4INGH0LXRgNC10LcgUGlja1BvaW50LlxyXG4gICAgICog0JIg0LfQsNC/0YDQvtGB0LUg0L7RgtC/0YDQsNCy0LvRj9C10YLRgdGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuCDQuCDQuNC90YLQtdGA0LLQsNC7INC00LDRgiwg0LfQsCDQutC+0YLQvtGA0YvQtSDQvdC10L7QsdGF0L7QtNC40LzQviDQv9C+0LvRg9GH0LjRgtGMINGB0L/QuNGB0L7Qui5cclxuICAgICAqINCSINC+0YLQstC10YIg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINGB0L/QuNGB0L7QuiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5INGBINC/0LDRgNCw0LzQtdGC0YDQsNC80LgsINC70LjQsdC+INC+0YjQuNCx0LrQsC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFJldHVybkludm9pY2VMaXN0KHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5SZXR1cm5JbnZvaWNlTGlzdCk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZXR1cm5JbnZvaWNlTGlzdD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlJldHVybkludm9pY2VMaXN0LCAnZ2V0cmV0dXJuaW52b2ljZXNsaXN0JywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC40YHRgtC+0YDQuNC4INC40LfQvNC10L3QtdC90LjRjyDRgdGC0LDRgtGD0YHQsCDQvtGC0L/RgNCw0LLQu9C10L3QuNGPLiDQkiDQt9Cw0L/RgNC+0YHQtSDQvtGC0L/RgNCw0LLQu9GP0LXRgtGB0Y8g0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YBcclxuICAgICAqINGB0LXRgdGB0LjQuCDQuCDQvdC+0LzQtdGAINC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCSINC+0YLQstC10YIg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINC40YHRgtC+0YDQuNGPINGB0YLQsNGC0YPRgdC+0LIg0L7RgtC/0YDQsNCy0LvQtdC90LjRjy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFBhcmNlbEhpc3RvcnkocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlBhcmNlbEludm9pY2VIaXN0b3J5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbEhpc3Rvcnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5QYXJjZWxIaXN0b3J5LCAndHJhY2tzZW5kaW5nJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC40L3RhNC+0YDQvNCw0YbQuNC4INC/0L4g0L7RgtC/0YDQsNCy0LvQtdC90LjRjiDQvtGC0L/RgNCw0LLQu9C10L3QuNGPLiDQkiDQt9Cw0L/RgNC+0YHQtSDQvtGC0L/RgNCw0LLQu9GP0LXRgtGB0Y8g0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YBcclxuICAgICAqINGB0LXRgdGB0LjQuCDQuCDQvdC+0LzQtdGAINC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCSINC+0YLQstC10YIg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINC/0YDQuNC30L3QsNC6INGD0YHQv9C10YjQvdC+0YHRgtC4INCy0YvQv9C+0LvQvdC10L3QuNGPLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGFyY2VsKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5QYXJjZWxJbnZvaWNlKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbCwgJ3NlbmRpbmdpbmZvJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGB0YLQvtC40LzQvtGB0YLQuCDQtNC+0YHRgtCw0LLQutC4INC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCSINC30LDQv9GA0L7RgdC1INC+0YLQv9GA0LDQstC70Y/QtdGC0YHRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDRgdC10YHRgdC40LhcclxuICAgICAqINC4INGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LiDQkiDQvtGC0LLQtdGCINCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRjyDRgdC/0LjRgdC+0Log0L3QvtC80LXRgNC+0LIg0L7RgtC/0YDQsNCy0LvQtdC90LjQuSDRgdC+INGB0YLQvtC40LzQvtGB0YLRj9C80Lgg0LTQvtGB0YLQsNCy0L7Qui5cclxuICAgICAqINCh0YLQvtC40LzQvtGB0YLRjCDQtNC+0YHRgtCw0LLQutC4INGB0YLQsNC90L7QstC40YLRgdGPINC00L7RgdGC0YPQv9C90LAg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0LTQtdC90Ywg0L/QvtGB0LvQtSDRgNC10LPQuNGB0YLRgNCw0YbQuNC4INC+0YLQv9GA0LDQstC70LXQvdC40Y8uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJjZWxEZWxpdmVyeUNvc3QocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlBhcmNlbERlbGl2ZXJ5Q29zdCk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5QYXJjZWxEZWxpdmVyeUNvc3Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5QYXJjZWxEZWxpdmVyeUNvc3QsICdnZXRkZWxpdmVyeWNvc3QnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINCy0YvQt9C+0LLQsCDQutGD0YDRjNC10YDQsC4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCwg0YHQvtC00LXRgNC20LDRidCw0Y8g0L3QvtC80LXRgCDRgdC10YHRgdC40LhcclxuICAgICAqINC4INC+0L/QuNGB0LDQvdC40Y8g0LDQtNGA0LXRgdCwINC30LDQsdC+0YDQsCwg0LLRgNC10LzQtdC90Lgg0LfQsNCx0L7RgNCwLCDQutC+0LvQuNGH0LXRgdGC0LLQsCDQvNC10YHRgiDQuCDQvtCx0YnQuNC5INCy0LXRgS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNhbGxDb3VyaWVyKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5DYWxsQ291cmllcik6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZWdpc3RlcmVkQ291cmllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlJlZ2lzdGVyZWRDb3VyaWVyLCAnY291cmllcicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC+0YLQvNC10L3RiyDQstGL0LfQvtCy0LAg0LrRg9GA0YzQtdGA0LAuINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsINGB0L7QtNC10YDQttCw0YnQsNGPINC90L7QvNC10YAg0YHQtdGB0YHQuNC4XHJcbiAgICAgKiDQuCDQvdC+0LzQtdGAINCy0YvQt9C+0LLQsCDQutGD0YDRjNC10YDQsC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNhbmNlbENvdXJpZXIocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNhbmNlbENvdXJpZXIpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuQ2FuY2VsbGVkQ291cmllcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLkNhbmNlbGxlZENvdXJpZXIsICdjb3VyaWVyY2FuY2VsJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGA0LXQtdGB0YLRgNCwINCyINGE0L7RgNC80LDRgtC1IHBkZi5cclxuICAgICAqINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsINGB0L7QtNC10YDQttCw0YnQsNGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuCDQuCDRgdC/0LjRgdC+0Log0L3QvtC80LXRgNC+0LIg0L7RgtC/0YDQsNCy0LvQtdC90LjQuS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVJlZ2lzdHJ5UERGKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5DcmVhdGVSZWdpc3RyeSk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5GaWxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuRmlsZSwgJ21ha2VyZWVzdHInLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINGA0LXQtdGB0YLRgNCwINC4INC/0L7Qu9GD0YfQtdC90LjRjyDQvdC+0LzQtdGA0LAg0YDQtdC10YHRgtGA0LAuXHJcbiAgICAgKiDQndCwINCy0YXQvtC0INC/0YDQuNC90LjQvNCw0LXRgtGB0Y8g0YHRgtGA0YPQutGC0YPRgNCwLCDRgdC+0LTQtdGA0LbQsNGJ0LDRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDRgdC10YHRgdC40Lgg0Lgg0YHQv9C40YHQvtC6INC90L7QvNC10YDQvtCyINC+0YLQv9GA0LDQstC70LXQvdC40LkuXHJcbiAgICAgKiDQndCwINCy0YvRhdC+0LQg0LLRi9C00LDQtdGC0YHRjyDRgdC/0LjRgdC+0Log0L3QvtC80LXRgNC+0LIg0YHQvtC30LTQsNC90L3Ri9GFINGA0LXQtdGB0YLRgNC+0LIg0LjQu9C4INGB0L7QvtCx0YnQtdC90LjQtSDQvtCxINC+0YjQuNCx0LrQtS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVJlZ2lzdHJ5KHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5DcmVhdGVSZWdpc3RyeSk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZWdpc3RyeT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlJlZ2lzdHJ5LCAnbWFrZXJlZXN0cm51bWJlcicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDRgNC10LXRgdGC0YDQsCDQsiDRhNC+0YDQvNCw0YLQtSBwZGYuINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsXHJcbiAgICAgKiDRgdC+0LTQtdGA0LbQsNGJ0LDRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDRgdC10YHRgdC40Lgg0Lgg0L3QvtC80LXRgCDQvtGC0L/RgNCw0LLQu9C10L3QuNGPINC40LvQuCDQvdC+0LzQtdGAINGA0LXQtdGB0YLRgNCwLiDQldGB0LvQuCDRg9C60LDQt9Cw0L3QvdC+0LUg0L7RgtC/0YDQsNCy0LvQtdC90LjQtVxyXG4gICAgICog0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQvdC4INCyINC+0LTQvdC+0Lwg0YDQtdC10YHRgtGA0LUg0LjQu9C4INC90LXRgiDRgNC10LXRgdGC0YDQsCDRgSDRg9C60LDQt9Cw0L3QvdGL0Lwg0L3QvtC80LXRgNC+0LwsINCy0LXRgNC90LXRgtGB0Y8g0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQtdC1INGB0L7QvtCx0YnQtdC90LjQtS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFJlZ2lzdHJ5KHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5SZWdpc3RyeSk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5GaWxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuRmlsZSwgJ2dldHJlZXN0cicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDQvdC+0LzQtdGA0LAg0YDQtdC10YHRgtGA0LAuINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsINGB0L7QtNC10YDQttCw0YnQsNGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuFxyXG4gICAgICog0Lgg0L3QvtC80LXRgCDQvtGC0L/RgNCw0LLQu9C10L3QuNGPLiDQldGB0LvQuCDRg9C60LDQt9Cw0L3QvdC+0LUg0L7RgtC/0YDQsNCy0LvQtdC90LjQtSDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINC90Lgg0LIg0L7QtNC90L7QvCDRgNC10LXRgdGC0YDQtSDQuNC70Lgg0L3QtdGCINGA0LXQtdGB0YLRgNCwINGBINGD0LrQsNC30LDQvdC90YvQvCDQvdC+0LzQtdGA0L7QvCxcclxuICAgICAqINCy0LXRgNC90LXRgtGB0Y8g0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQtdC1INGB0L7QvtCx0YnQtdC90LjQtS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFJlZ2lzdHJ5QnlQYXJjZWxOdW1iZXIocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlBhcmNlbEludm9pY2UpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUmVnaXN0cnlOdW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5SZWdpc3RyeU51bWJlciwgJ2dldHJlZXN0cm51bWJlcicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDRjdGC0LjQutC10YLQvtC6INC+0YLQv9GA0LDQstC70LXQvdC40Lkg0LIg0YTQvtGA0LzQsNGC0LUgcGRmLiDQndCwINCy0YXQvtC0INC/0YDQuNC90LjQvNCw0LXRgtGB0Y8g0YHRgtGA0YPQutGC0YPRgNCwLCDRgdC+0LTQtdGA0LbQsNGJ0LDRj1xyXG4gICAgICog0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0YHQtdGB0YHQuNC4INC4INGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlTGFiZWxzKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5DcmV0YWVMYWJlbHMpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuRmlsZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLkZpbGUsICdtYWtlbGFiZWwnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YHQv9C40YHQutCwINCz0L7RgNC+0LTQvtCyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBnZXRDaXRpZXMoKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkNpdHlMaXN0PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldChEYXRhVHlwZS5SZXNwb25zZS5DaXR5TGlzdCwgJ2NpdHlsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGB0L/QuNGB0LrQsCDQv9C+0YHRgtCw0LzQsNGC0L7Qsi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UG9zdGFtYXRMaXN0KCk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5Qb3N0YW1hdExpc3Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0KERhdGFUeXBlLlJlc3BvbnNlLlBvc3RhbWF0TGlzdCwgJ3Bvc3RhbWF0bGlzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDRgdC/0LjRgdC60LAg0LfQvtC9LlxyXG4gICAgICog0JXRgdC70Lgg0L/QvtC70LUgVG9QVCDQvdC1INGD0LrQsNC30LDQvdC+LCDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0YHQv9C40YHQvtC6INC30L7QvSDQv9C+INCy0YHQtdC8INC/0YPQvdC60YLQsNC8INCy0YvQtNCw0YfQuC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFpvbmVzKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5ab25lc1F1ZXJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlpvbmVzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuWm9uZXMsICdnZXR6b25lJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC90L7QvNC10YDQsCDQstC+0LfQstGA0LDRgtC90L7QuSDQvdCw0LrQu9Cw0LTQvdC+0Lkg0LgsINC10YHQu9C4INC10YHRgtGMLCDQvdC+0LzQtdGA0LAg0LDQutGC0LAg0LLQvtC30LLRgNCw0YLQsC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFJldHVybkRvY3VtZW50cyhwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUmV0dXJuSW52b2ljZXMpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUmV0dXJuRG9jdW1lbnRzPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUmV0dXJuRG9jdW1lbnRzLCAnZ2V0cmV0dXJuJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGB0YLQvtC40LzQvtGB0YLQuCDQtNC+0YHRgtCw0LLQutC4LiDQn9GA0Lgg0YDQsNGB0YfQtdGC0LUg0YPRh9C40YLRi9Cy0LDRjtGC0YHRjyDRgdC70LXQtNGD0Y7RidC40LUg0L7Qs9GA0LDQvdC40YfQtdC90LjRjzpcclxuICAgICAqICAgICAg0LPQsNCx0LDRgNC40YLRiyDRg9C60LDQt9GL0LLQsNGO0YLRgdGPINC+0LHRidC40LUg0L3QsCDQstGB0LUg0LzQtdGB0YLQsCxcclxuICAgICAqICAgICAg0LLQtdGBINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINGB0YfQuNGC0LDQtdGC0YHRjyAxINC60LMsXHJcbiAgICAgKiAgICAgINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0YLQvtC70YzQutC+INGC0LDRgNC40YQg0LfQsCDQu9C+0LPQuNGB0YLQuNC60YMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNhbGN1bGF0ZVF1ZXJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkNhbGN1bGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLkNhbGN1bGF0ZSwgJ2NhbGN0YXJpZmYnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiZDpcXHd3d1xcZGVsaXZlcnlcXHBpY2twb2ludFxcYnVpbGQtdHMifQ==