'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('./request');

var _datatype = require('./datatype');

var DataType = _interopRequireWildcard(_datatype);

var _rate = require('./rate');

var _rate2 = _interopRequireDefault(_rate);

var Pickpoint = (function () {
    function Pickpoint(login, password) {
        var _this = this;

        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Pickpoint);

        this.options = options || {};
        if (false === this.options.hasOwnProperty('session')) {
            this.options.session = {
                lifetime: 3600
            };
        }
        this.client = new _request.Client({ test: options.test || false, timeout: options.timeout });
        this.credentials = { login: login, password: password };
        this.client.setSessionHandler(function () {
            return _this.login();
        });
    }

    _createClass(Pickpoint, [{
        key: 'login',
        value: function login() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                if (_this2.session && _this2.session.expires.getTime() > Date.now()) {
                    resolve(_this2.session.hash);
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
                            _this2.session = {
                                hash: result.SessionId,
                                expires: new Date(Date.now() + _this2.options.session.lifetime * 1000)
                            };
                            resolve(_this2.session.hash);
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
        key: 'createZLabels',
        value: function createZLabels(parameters) {
            return this.client.post(DataType.Response.File, 'makeZLabel', parameters);
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
    }, {
        key: 'getRate',
        value: function getRate(zone, factor, width, height, length, weight) {
            var discount = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

            return _rate2['default'].calculate(zone, factor, width, height, length, weight, discount);
        }
    }]);

    return Pickpoint;
})();

exports['default'] = function (login, password) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return new Pickpoint(login, password, options);
};

;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Ozs7cUJBd1RBLFVBQXlCLEtBQVksRUFBRSxRQUFlLEVBQXlCO1FBQXZCLE9BQU8seURBQWMsRUFBRTs7QUFDM0UsV0FBTyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ2xEOztBQUFBLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9yZXF1ZXN0LnRzXCIgLz5cclxuXHJcbmltcG9ydCB7Q2xpZW50fSBmcm9tICcuL3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBEYXRhVHlwZSBmcm9tICcuL2RhdGF0eXBlJztcclxuaW1wb3J0IHJhdGUgZnJvbSAnLi9yYXRlJztcclxuXHJcbmludGVyZmFjZSBDcmVkZW50aWFscyB7XHJcbiAgICBsb2dpbjpzdHJpbmc7XHJcbiAgICBwYXNzd29yZDpzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBBUElPcHRpb25zIHtcclxuICAgIHRlc3Q/OmJvb2xlYW47XHJcbiAgICBzZXNzaW9uPzoge1xyXG4gICAgICAgIGxpZmV0aW1lPzpudW1iZXI7XHJcbiAgICB9LFxyXG4gICAgdGltZW91dD86bnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQVBJU2Vzc2lvbiB7XHJcbiAgICBoYXNoOnN0cmluZztcclxuICAgIGV4cGlyZXM6RGF0ZTtcclxufVxyXG5cclxuY2xhc3MgUGlja3BvaW50IHtcclxuICAgIGNsaWVudDpDbGllbnQ7XHJcbiAgICBjcmVkZW50aWFsczpDcmVkZW50aWFscztcclxuICAgIHNlc3Npb246QVBJU2Vzc2lvbjtcclxuICAgIG9wdGlvbnM6QVBJT3B0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2dpbjpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZywgb3B0aW9uczpBUElPcHRpb25zID0ge30pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBpZiAoZmFsc2UgPT09IHRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2Vzc2lvbicpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zZXNzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgbGlmZXRpbWU6IDM2MDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCh7dGVzdDogb3B0aW9ucy50ZXN0IHx8IGZhbHNlLCB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXR9KTtcclxuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzID0ge2xvZ2luLCBwYXNzd29yZH07XHJcbiAgICAgICAgdGhpcy5jbGllbnQuc2V0U2Vzc2lvbkhhbmRsZXIoKCkgPT4geyByZXR1cm4gdGhpcy5sb2dpbigpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC90LDRh9Cw0LvQsCDRgdC10LDQvdGB0LAg0YDQsNCx0L7RgtGLLiDQkiDQt9Cw0L/RgNC+0YHQtSDQvtGC0L/RgNCw0LLQu9GP0LXQvNGB0Y8g0LvQvtCz0LjQvSDQuCDQv9Cw0YDQvtC70YwsXHJcbiAgICAgKiDQsiDRgdC70YPRh9Cw0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtC4LCDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0YPQvdC40LrQsNC70YzQvdGL0Lkg0L3QvtC80LXRgCDRgdC10YHRgdC40LgsINC60L7RgtC+0YDRi9C5INC00LXQudGB0YLQstC40YLQtdC70LXQvSDQsiDRgtC10YfQtdC90LjQuCDRg9GB0YLQsNC90L7QstC70LXQvdC90L7Qs9C+INCy0YDQtdC80LXQvdC4LlxyXG4gICAgICog0JLRgdGPINC00LDQu9GM0L3QtdC50YjQsNGPINGA0LDQsdC+0YLQsCDQstC10LTQtdGC0YHRjyDQvdCwINC+0YHQvdC+0LLQsNC90LjQuCDQvdC+0LzQtdGA0LAg0YHQtdGB0YHQuNC4LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9naW4oKTpQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlc3Npb24gJiYgdGhpcy5zZXNzaW9uLmV4cGlyZXMuZ2V0VGltZSgpID4gRGF0ZS5ub3coKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNlc3Npb24uaGFzaCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudC5jYWxsPHtFcnJvck1lc3NhZ2U/OnN0cmluZywgU2Vzc2lvbklkPzpzdHJpbmd9Pih7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9naW46IHRoaXMuY3JlZGVudGlhbHMubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkOiB0aGlzLmNyZWRlbnRpYWxzLnBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5FcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXN1bHQuRXJyb3JNZXNzYWdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuU2Vzc2lvbklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IHJlc3VsdC5TZXNzaW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVzOiBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5vcHRpb25zLnNlc3Npb24ubGlmZXRpbWUgKiAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNlc3Npb24uaGFzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlVua25vd24gZXJyb3JcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQt9Cw0LLQtdGA0YjQtdC90LjRjyDRgdC10LDQvdGB0LAg0YDQsNCx0L7RgtGLLlxyXG4gICAgICog0JIg0LfQsNC/0YDQvtGB0LUg0L7RgtC/0YDQsNCy0LvRj9C10YLRgdGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuC4g0JIg0L7RgtCy0LXRgiDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0L/RgNC40LfQvdCw0Log0YPRgdC/0LXRiNC90L7RgdGC0Lgg0LLRi9C/0L7Qu9C90LXQvdC40Y8uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGxvZ291dCgpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuTG9nb3V0PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuTG9nb3V0LCAnbG9nb3V0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0YDQtdCz0LjRgdGC0YDQsNGG0LjQuCDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LiDQndCwINCy0YXQvtC0INC/0YDQuNC90LjQvNCw0LXRgtGB0Y8g0YHRgtGA0YPQutGC0YPRgNCwLFxyXG4gICAgICog0YHQvtC00LXRgNC20LDRidCw0Y8g0L3QvtC80LXRgCDRgdC10YHRgdC40Lgg0Lgg0YHQv9C40YHQvtC6INC+0L/QuNGB0LDQvdC40Lkg0L7RgtC/0YDQsNCy0LvQtdC90LjQuSwg0LrQvtGC0L7RgNGL0LUg0YLRgNC10LHRg9C10YLRgdGPINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGMLlxyXG4gICAgICpcclxuICAgICAqINCS0L3QuNC80LDQvdC40LUhINCSINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQstC40LQg0L7RgtC/0YDQsNCy0LvQtdC90LjRjyAo0L3QsNC70L7QttC10L3QvdC+0LUv0L/RgNC10LTQvtC/0LvQsNGH0LXQvdC90L7QtSkg0L3QtSDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQt9C90LDRh9C10L3QuNGOINCyINC/0L7Qu9C1IFN1bSxcclxuICAgICAqINC/0YDQuNC+0YDQuNGC0LXRgiDQvtGC0LTQsNC10YLRgdGPINC30L3QsNGH0LXQvdC40Y4g0LIgU3VtLiDQotC+INC10YHRgtGMLCDQtdGB0LvQuCDRg9C60LDQt9Cw0L3QsCDQvdC1INC90YPQu9C10LLQsNGPINC/0L7Qu9C+0LbQuNGC0LXQu9GM0L3QsNGPINGB0YPQvNC80LAsINC+0YLQv9GA0LDQstC70LXQvdC40LUg0LHRg9C00LXRglxyXG4gICAgICog0LfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNC90L4g0LrQsNC6INC90LDQu9C+0LbQtdC90L3Ri9GFINC/0LvQsNGC0LXQtiDQuCDQvdCw0L7QsdC+0YDQvtGCLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUGFyY2Vsc1JlZ2lzdHJ5KHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5QYXJjZWxzUmVnaXN0cnkpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUGFyY2Vsc1JlZ2lzdHJ5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUGFyY2Vsc1JlZ2lzdHJ5LCAnY3JlYXRlc2VuZGluZycsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINGA0LXQs9C40YHRgtGA0LDRhtC40Lgg0L7RgtC/0YDQsNCy0LvQtdC90LjQuS4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCxcclxuICAgICAqINGB0L7QtNC10YDQttCw0YnQsNGPINC90L7QvNC10YAg0YHQtdGB0YHQuNC4INC4INGB0L/QuNGB0L7QuiDQvtC/0LjRgdCw0L3QuNC5INC+0YLQv9GA0LDQstC70LXQvdC40LksINC60L7RgtC+0YDRi9C1INGC0YDQtdCx0YPQtdGC0YHRjyDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjC5cclxuICAgICAqXHJcbiAgICAgKiDQktC90LjQvNCw0L3QuNC1ISDQkiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LLQuNC0INC+0YLQv9GA0LDQstC70LXQvdC40Y8gKNC90LDQu9C+0LbQtdC90L3QvtC1L9C/0YDQtdC00L7Qv9C70LDRh9C10L3QvdC+0LUpINC90LUg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0LfQvdCw0YfQtdC90LjRjiDQsiDQv9C+0LvQtSBTdW0sXHJcbiAgICAgKiDQv9GA0LjQvtGA0LjRgtC10YIg0L7RgtC00LDQtdGC0YHRjyDQt9C90LDRh9C10L3QuNGOINCyIFN1bS4g0KLQviDQtdGB0YLRjCwg0LXRgdC70Lgg0YPQutCw0LfQsNC90LAg0L3QtSDQvdGD0LvQtdCy0LDRjyDQv9C+0LvQvtC20LjRgtC10LvRjNC90LDRjyDRgdGD0LzQvNCwLCDQvtGC0L/RgNCw0LLQu9C10L3QuNC1INCx0YPQtNC10YJcclxuICAgICAqINC30LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDQvdC+INC60LDQuiDQvdCw0LvQvtC20LXQvdC90YvRhSDQv9C70LDRgtC10LYg0Lgg0L3QsNC+0LHQvtGA0L7Rgi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBhcmNlbHNSZWdpc3RyeU11bHRpKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5QYXJjZWxzUmVnaXN0cnlNdWx0aSk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5QYXJjZWxzUmVnaXN0cnlNdWx0aT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbHNSZWdpc3RyeU11bHRpLCAnQ3JlYXRlU2hpcG1lbnQnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC+0YLQv9GA0LDQstC70LXQvdC40Y8g0LrQu9C40LXQvdGC0YHQutC+0LPQviDQstC+0LfQstGA0LDRgtCwINC90LAg0L7RgdC90L7QstC1INC+0LHRi9GH0L3QvtCz0L4g0L7RgtC/0YDQsNCy0LvQtdC90LjRjy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBhcmNlbFJldHVybihwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUmV0dXJuUGFyY2VsKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlJldHVyblBhcmNlbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlJldHVyblBhcmNlbCwgJ21ha2VyZXR1cm4nLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YHQv9C40YHQutCwINCy0L7Qt9Cy0YDQsNGC0L3Ri9GFINC+0YLQv9GA0LDQstC70LXQvdC40LksINC60L7RgtC+0YDRi9C1INGA0LDQvdC10LUg0L3QtSDQv9GA0L7RhdC+0LTQuNC70Lgg0YfQtdGA0LXQtyBQaWNrUG9pbnQuXHJcbiAgICAgKiDQkiDQt9Cw0L/RgNC+0YHQtSDQvtGC0L/RgNCw0LLQu9GP0LXRgtGB0Y8g0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0YHQtdGB0YHQuNC4INC4INC40L3RgtC10YDQstCw0Lsg0LTQsNGCLCDQt9CwINC60L7RgtC+0YDRi9C1INC90LXQvtCx0YXQvtC00LjQvNC+INC/0L7Qu9GD0YfQuNGC0Ywg0YHQv9C40YHQvtC6LlxyXG4gICAgICog0JIg0L7RgtCy0LXRgiDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0YHQv9C40YHQvtC6INC+0YLQv9GA0LDQstC70LXQvdC40Lkg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuCwg0LvQuNCx0L4g0L7RiNC40LHQutCwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmV0dXJuSW52b2ljZUxpc3QocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlJldHVybkludm9pY2VMaXN0KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlJldHVybkludm9pY2VMaXN0PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUmV0dXJuSW52b2ljZUxpc3QsICdnZXRyZXR1cm5pbnZvaWNlc2xpc3QnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjRgdGC0L7RgNC40Lgg0LjQt9C80LXQvdC10L3QuNGPINGB0YLQsNGC0YPRgdCwINC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCSINC30LDQv9GA0L7RgdC1INC+0YLQv9GA0LDQstC70Y/QtdGC0YHRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgFxyXG4gICAgICog0YHQtdGB0YHQuNC4INC4INC90L7QvNC10YAg0L7RgtC/0YDQsNCy0LvQtdC90LjRjy4g0JIg0L7RgtCy0LXRgiDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0LjRgdGC0L7RgNC40Y8g0YHRgtCw0YLRg9GB0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNGPLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UGFyY2VsSGlzdG9yeShwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUGFyY2VsSW52b2ljZUhpc3RvcnkpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUGFyY2VsSGlzdG9yeT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbEhpc3RvcnksICd0cmFja3NlbmRpbmcnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQvdGE0L7RgNC80LDRhtC40Lgg0L/QviDQvtGC0L/RgNCw0LLQu9C10L3QuNGOINC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCSINC30LDQv9GA0L7RgdC1INC+0YLQv9GA0LDQstC70Y/QtdGC0YHRjyDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgFxyXG4gICAgICog0YHQtdGB0YHQuNC4INC4INC90L7QvNC10YAg0L7RgtC/0YDQsNCy0LvQtdC90LjRjy4g0JIg0L7RgtCy0LXRgiDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8g0L/RgNC40LfQvdCw0Log0YPRgdC/0LXRiNC90L7RgdGC0Lgg0LLRi9C/0L7Qu9C90LXQvdC40Y8uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJjZWwocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlBhcmNlbEludm9pY2UpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuUGFyY2VsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUGFyY2VsLCAnc2VuZGluZ2luZm8nLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YHRgtC+0LjQvNC+0YHRgtC4INC00L7RgdGC0LDQstC60Lgg0L7RgtC/0YDQsNCy0LvQtdC90LjRjy4g0JIg0LfQsNC/0YDQvtGB0LUg0L7RgtC/0YDQsNCy0LvRj9C10YLRgdGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuFxyXG4gICAgICog0Lgg0YHQv9C40YHQvtC6INC90L7QvNC10YDQvtCyINC+0YLQv9GA0LDQstC70LXQvdC40LkuINCSINC+0YLQstC10YIg0LLQvtC30LLRgNCw0YnQsNC10YLRgdGPINGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5INGB0L4g0YHRgtC+0LjQvNC+0YHRgtGP0LzQuCDQtNC+0YHRgtCw0LLQvtC6LlxyXG4gICAgICog0KHRgtC+0LjQvNC+0YHRgtGMINC00L7RgdGC0LDQstC60Lgg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0LTQvtGB0YLRg9C/0L3QsCDQvdCwINGB0LvQtdC00YPRjtGJ0LjQuSDQtNC10L3RjCDQv9C+0YHQu9C1INGA0LXQs9C40YHRgtGA0LDRhtC40Lgg0L7RgtC/0YDQsNCy0LvQtdC90LjRjy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldFBhcmNlbERlbGl2ZXJ5Q29zdChwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUGFyY2VsRGVsaXZlcnlDb3N0KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbERlbGl2ZXJ5Q29zdD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlBhcmNlbERlbGl2ZXJ5Q29zdCwgJ2dldGRlbGl2ZXJ5Y29zdCcsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0LLRi9C30L7QstCwINC60YPRgNGM0LXRgNCwLiDQndCwINCy0YXQvtC0INC/0YDQuNC90LjQvNCw0LXRgtGB0Y8g0YHRgtGA0YPQutGC0YPRgNCwLCDRgdC+0LTQtdGA0LbQsNGJ0LDRjyDQvdC+0LzQtdGAINGB0LXRgdGB0LjQuFxyXG4gICAgICog0Lgg0L7Qv9C40YHQsNC90LjRjyDQsNC00YDQtdGB0LAg0LfQsNCx0L7RgNCwLCDQstGA0LXQvNC10L3QuCDQt9Cw0LHQvtGA0LAsINC60L7Qu9C40YfQtdGB0YLQstCwINC80LXRgdGCINC4INC+0LHRidC40Lkg0LLQtdGBLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FsbENvdXJpZXIocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNhbGxDb3VyaWVyKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlJlZ2lzdGVyZWRDb3VyaWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUmVnaXN0ZXJlZENvdXJpZXIsICdjb3VyaWVyJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L7RgtC80LXQvdGLINCy0YvQt9C+0LLQsCDQutGD0YDRjNC10YDQsC4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCwg0YHQvtC00LXRgNC20LDRidCw0Y8g0L3QvtC80LXRgCDRgdC10YHRgdC40LhcclxuICAgICAqINC4INC90L7QvNC10YAg0LLRi9C30L7QstCwINC60YPRgNGM0LXRgNCwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FuY2VsQ291cmllcihwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuQ2FuY2VsQ291cmllcik6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5DYW5jZWxsZWRDb3VyaWVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuQ2FuY2VsbGVkQ291cmllciwgJ2NvdXJpZXJjYW5jZWwnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YDQtdC10YHRgtGA0LAg0LIg0YTQvtGA0LzQsNGC0LUgcGRmLlxyXG4gICAgICog0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCwg0YHQvtC00LXRgNC20LDRidCw0Y8g0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0YHQtdGB0YHQuNC4INC4INGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUmVnaXN0cnlQREYocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNyZWF0ZVJlZ2lzdHJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkZpbGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5GaWxlLCAnbWFrZXJlZXN0cicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8g0YDQtdC10YHRgtGA0LAg0Lgg0L/QvtC70YPRh9C10L3QuNGPINC90L7QvNC10YDQsCDRgNC10LXRgdGC0YDQsC5cclxuICAgICAqINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsINGB0L7QtNC10YDQttCw0YnQsNGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuCDQuCDRgdC/0LjRgdC+0Log0L3QvtC80LXRgNC+0LIg0L7RgtC/0YDQsNCy0LvQtdC90LjQuS5cclxuICAgICAqINCd0LAg0LLRi9GF0L7QtCDQstGL0LTQsNC10YLRgdGPINGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDRgdC+0LfQtNCw0L3QvdGL0YUg0YDQtdC10YHRgtGA0L7QsiDQuNC70Lgg0YHQvtC+0LHRidC10L3QuNC1INC+0LEg0L7RiNC40LHQutC1LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUmVnaXN0cnkocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNyZWF0ZVJlZ2lzdHJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlJlZ2lzdHJ5PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuUmVnaXN0cnksICdtYWtlcmVlc3RybnVtYmVyJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGA0LXQtdGB0YLRgNCwINCyINGE0L7RgNC80LDRgtC1IHBkZi4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCxcclxuICAgICAqINGB0L7QtNC10YDQttCw0YnQsNGPINC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINGB0LXRgdGB0LjQuCDQuCDQvdC+0LzQtdGAINC+0YLQv9GA0LDQstC70LXQvdC40Y8g0LjQu9C4INC90L7QvNC10YAg0YDQtdC10YHRgtGA0LAuINCV0YHQu9C4INGD0LrQsNC30LDQvdC90L7QtSDQvtGC0L/RgNCw0LLQu9C10L3QuNC1XHJcbiAgICAgKiDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINC90Lgg0LIg0L7QtNC90L7QvCDRgNC10LXRgdGC0YDQtSDQuNC70Lgg0L3QtdGCINGA0LXQtdGB0YLRgNCwINGBINGD0LrQsNC30LDQvdC90YvQvCDQvdC+0LzQtdGA0L7QvCwg0LLQtdGA0L3QtdGC0YHRjyDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC10LUg0YHQvtC+0LHRidC10L3QuNC1LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVnaXN0cnkocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlJlZ2lzdHJ5KTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkZpbGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5GaWxlLCAnZ2V0cmVlc3RyJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC90L7QvNC10YDQsCDRgNC10LXRgdGC0YDQsC4g0J3QsCDQstGF0L7QtCDQv9GA0LjQvdC40LzQsNC10YLRgdGPINGB0YLRgNGD0LrRgtGD0YDQsCwg0YHQvtC00LXRgNC20LDRidCw0Y8g0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0YHQtdGB0YHQuNC4XHJcbiAgICAgKiDQuCDQvdC+0LzQtdGAINC+0YLQv9GA0LDQstC70LXQvdC40Y8uINCV0YHQu9C4INGD0LrQsNC30LDQvdC90L7QtSDQvtGC0L/RgNCw0LLQu9C10L3QuNC1INC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0L3QuCDQsiDQvtC00L3QvtC8INGA0LXQtdGB0YLRgNC1INC40LvQuCDQvdC10YIg0YDQtdC10YHRgtGA0LAg0YEg0YPQutCw0LfQsNC90L3Ri9C8INC90L7QvNC10YDQvtC8LFxyXG4gICAgICog0LLQtdGA0L3QtdGC0YHRjyDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC10LUg0YHQvtC+0LHRidC10L3QuNC1LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVnaXN0cnlCeVBhcmNlbE51bWJlcihwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuUGFyY2VsSW52b2ljZSk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZWdpc3RyeU51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5wb3N0KERhdGFUeXBlLlJlc3BvbnNlLlJlZ2lzdHJ5TnVtYmVyLCAnZ2V0cmVlc3RybnVtYmVyJywgcGFyYW1ldGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGN0YLQuNC60LXRgtC+0Log0L7RgtC/0YDQsNCy0LvQtdC90LjQuSDQsiDRhNC+0YDQvNCw0YLQtSBwZGYuINCd0LAg0LLRhdC+0LQg0L/RgNC40L3QuNC80LDQtdGC0YHRjyDRgdGC0YDRg9C60YLRg9GA0LAsINGB0L7QtNC10YDQttCw0YnQsNGPXHJcbiAgICAgKiDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgCDRgdC10YHRgdC40Lgg0Lgg0YHQv9C40YHQvtC6INC90L7QvNC10YDQvtCyINC+0YLQv9GA0LDQstC70LXQvdC40LkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkZpbGU+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVMYWJlbHMocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LkNyZXRhZUxhYmVscyk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5GaWxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuRmlsZSwgJ21ha2VsYWJlbCcsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDRjdGC0LjQutC10YLQvtC6INC+0YLQv9GA0LDQstC70LXQvdC40Lkg0LIg0YTQvtGA0LzQsNGC0LUgcGRmLiDQndCwINCy0YXQvtC0INC/0YDQuNC90LjQvNCw0LXRgtGB0Y8g0YHRgtGA0YPQutGC0YPRgNCwLCDRgdC+0LTQtdGA0LbQsNGJ0LDRj1xyXG4gICAgICog0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0YHQtdGB0YHQuNC4INC4INGB0L/QuNGB0L7QuiDQvdC+0LzQtdGA0L7QsiDQvtGC0L/RgNCw0LLQu9C10L3QuNC5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5GaWxlPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlWkxhYmVscyhwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuQ3JldGFlTGFiZWxzKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLkZpbGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5GaWxlLCAnbWFrZVpMYWJlbCcsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JrQvtC80LDQvdC00LAg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90LAg0LTQu9GPINC/0L7Qu9GD0YfQtdC90LjRjyDRgdC/0LjRgdC60LAg0LPQvtGA0L7QtNC+0LIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldENpdGllcygpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuQ2l0eUxpc3Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0KERhdGFUeXBlLlJlc3BvbnNlLkNpdHlMaXN0LCAnY2l0eWxpc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YHQv9C40YHQutCwINC/0L7RgdGC0LDQvNCw0YLQvtCyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBnZXRQb3N0YW1hdExpc3QoKTpQcm9taXNlPERhdGFUeXBlLlJlc3BvbnNlLlBvc3RhbWF0TGlzdD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5nZXQoRGF0YVR5cGUuUmVzcG9uc2UuUG9zdGFtYXRMaXN0LCAncG9zdGFtYXRsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmtC+0LzQsNC90LTQsCDQv9GA0LXQtNC90LDQt9C90LDRh9C10L3QsCDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINGB0L/QuNGB0LrQsCDQt9C+0L0uXHJcbiAgICAgKiDQldGB0LvQuCDQv9C+0LvQtSBUb1BUINC90LUg0YPQutCw0LfQsNC90L4sINCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRjyDRgdC/0LjRgdC+0Log0LfQvtC9INC/0L4g0LLRgdC10Lwg0L/Rg9C90LrRgtCw0Lwg0LLRi9C00LDRh9C4LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Wm9uZXMocGFyYW1ldGVyczpEYXRhVHlwZS5SZXF1ZXN0LlpvbmVzUXVlcnkpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuWm9uZXM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5ab25lcywgJ2dldHpvbmUnLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0L3QvtC80LXRgNCwINCy0L7Qt9Cy0YDQsNGC0L3QvtC5INC90LDQutC70LDQtNC90L7QuSDQuCwg0LXRgdC70Lgg0LXRgdGC0YwsINC90L7QvNC10YDQsCDQsNC60YLQsCDQstC+0LfQstGA0LDRgtCwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmV0dXJuRG9jdW1lbnRzKHBhcmFtZXRlcnM6RGF0YVR5cGUuUmVxdWVzdC5SZXR1cm5JbnZvaWNlcyk6UHJvbWlzZTxEYXRhVHlwZS5SZXNwb25zZS5SZXR1cm5Eb2N1bWVudHM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQucG9zdChEYXRhVHlwZS5SZXNwb25zZS5SZXR1cm5Eb2N1bWVudHMsICdnZXRyZXR1cm4nLCBwYXJhbWV0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCa0L7QvNCw0L3QtNCwINC/0YDQtdC00L3QsNC30L3QsNGH0LXQvdCwINC00LvRjyDQv9C+0LvRg9GH0LXQvdC40Y8g0YHRgtC+0LjQvNC+0YHRgtC4INC00L7RgdGC0LDQstC60LguINCf0YDQuCDRgNCw0YHRh9C10YLQtSDRg9GH0LjRgtGL0LLQsNGO0YLRgdGPINGB0LvQtdC00YPRjtGJ0LjQtSDQvtCz0YDQsNC90LjRh9C10L3QuNGPOlxyXG4gICAgICogICAgICDQs9Cw0LHQsNGA0LjRgtGLINGD0LrQsNC30YvQstCw0Y7RgtGB0Y8g0L7QsdGJ0LjQtSDQvdCwINCy0YHQtSDQvNC10YHRgtCwLFxyXG4gICAgICogICAgICDQstC10YEg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0YHRh9C40YLQsNC10YLRgdGPIDEg0LrQsyxcclxuICAgICAqICAgICAg0YDQsNGB0YHRh9C40YLRi9Cy0LDQtdGC0YHRjyDRgtC+0LvRjNC60L4g0YLQsNGA0LjRhCDQt9CwINC70L7Qs9C40YHRgtC40LrRgy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShwYXJhbWV0ZXJzOkRhdGFUeXBlLlJlcXVlc3QuQ2FsY3VsYXRlUXVlcnkpOlByb21pc2U8RGF0YVR5cGUuUmVzcG9uc2UuQ2FsY3VsYXRlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnBvc3QoRGF0YVR5cGUuUmVzcG9uc2UuQ2FsY3VsYXRlLCAnY2FsY3RhcmlmZicsIHBhcmFtZXRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHpvbmVcclxuICAgICAqIEBwYXJhbSBmYWN0b3JcclxuICAgICAqIEBwYXJhbSB3aWR0aFxyXG4gICAgICogQHBhcmFtIGhlaWdodFxyXG4gICAgICogQHBhcmFtIGxlbmd0aFxyXG4gICAgICogQHBhcmFtIHdlaWdodFxyXG4gICAgICogQHBhcmFtIGRpc2NvdW50XHJcbiAgICAgKi9cclxuICAgIGdldFJhdGUoem9uZTpudW1iZXIsIGZhY3RvcjpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgbGVuZ3RoOm51bWJlciwgd2VpZ2h0Om51bWJlciwgZGlzY291bnQ6Ym9vbGVhbiA9IGZhbHNlKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiByYXRlLmNhbGN1bGF0ZSh6b25lLCBmYWN0b3IsIHdpZHRoLCBoZWlnaHQsIGxlbmd0aCwgd2VpZ2h0LCBkaXNjb3VudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChsb2dpbjpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZywgb3B0aW9uczpBUElPcHRpb25zID0ge30pIHtcclxuICAgIHJldHVybiBuZXcgUGlja3BvaW50KGxvZ2luLCBwYXNzd29yZCwgb3B0aW9ucyk7XHJcbn07Il0sInNvdXJjZVJvb3QiOiJkOlxcd3d3XFxkZWxpdmVyeVxccGlja3BvaW50XFxidWlsZC10cyJ9