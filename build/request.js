'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _datatype = require('./datatype');

var DataType = _interopRequireWildcard(_datatype);

var Client = (function () {
    function Client(options) {
        _classCallCheck(this, Client);

        options = options || { test: false, timeout: 60 };
        this.url = "https://e-solution.pickpoint.ru/api/";
        if (options.test) {
            this.url = "https://e-solution.pickpoint.ru/apitest/";
        }
        this.client = _request2['default'].defaults({
            baseUrl: this.url,
            timeout: (options.timeout || 60) * 1000
        });
        this.log = (0, _debug2['default'])('pickpoint:request');
    }

    _createClass(Client, [{
        key: 'setSessionHandler',
        value: function setSessionHandler(callback) {
            this.auth = callback;
        }
    }, {
        key: 'call',
        value: function call(options, datatype) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (!options.data) {
                    options.data = {};
                }
                if (options.session) {
                    options.data['SessionId'] = options.session;
                }
                var req = {
                    method: options.method || "GET",
                    url: options.url.replace('^/', ''),
                    body: options.data,
                    json: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Encoding": "UTF-8"
                    }
                };
                if (datatype === DataType.Response.File) {
                    req.encoding = null;
                }
                _this.log("request: encoding %s, method %s url %s: %j", req.encoding, req.method, _this.url + req.url, req.body);
                _this.client(req, function (error, response, body) {
                    _this.log("response: %s %s [%s]: error %s", req.method, _this.url + req.url, typeof body, error);
                    if (error) {
                        return reject(error);
                    }
                    if (response.statusCode != 200) {
                        reject(new Error('Unexpected response (' + response.statusCode + '): ' + body));
                    } else {
                        resolve(body);
                    }
                });
            });
        }
    }, {
        key: 'wrap',
        value: function wrap(options, datatype) {
            var _this2 = this;

            if (typeof this.auth == "function") {
                return this.auth().then(function (session) {
                    options['session'] = session;
                    return _this2.call(options, datatype);
                });
            }
            return this.call(options, datatype);
        }
    }, {
        key: 'post',
        value: function post(datatype, url) {
            var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.wrap({ method: 'POST', url: url, data: data }, datatype).then(function (result) {
                return Client.apply(datatype, result);
            });
        }
    }, {
        key: 'get',
        value: function get(datatype, url) {
            return this.call({ method: 'GET', url: url }, datatype).then(function (result) {
                return Client.apply(datatype, result);
            });
        }
    }], [{
        key: 'apply',
        value: function apply(datatype, result) {
            return new datatype(result);
        }
    }]);

    return Client;
})();

exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,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Q0FBQztTQUNWOzs7ZUFsR21CLGVBQUksUUFBMkMsRUFBRSxNQUFVLEVBQUE7QUFDM0UsbUJBQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7OztXQTNDTCxNQUFBIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2luZGV4LmQudHNcIiAvPlxyXG5cclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcclxuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcclxuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XHJcbmltcG9ydCAqIGFzIERhdGFUeXBlIGZyb20gJy4vZGF0YXR5cGUnO1xyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3REYXRhIHtcclxuICAgIFtrZXk6c3RyaW5nXTphbnk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0UGFyYW1ldGVycyB7XHJcbiAgICBtZXRob2Q/OnN0cmluZztcclxuICAgIHVybDpzdHJpbmc7XHJcbiAgICBkYXRhPzpSZXF1ZXN0RGF0YTtcclxuICAgIHNlc3Npb24/OnN0cmluZztcclxuICAgIGVuY29kaW5nPzpzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBDbGllbnRPcHRpb25zIHtcclxuICAgIHRlc3Q6Ym9vbGVhbjtcclxuICAgIHRpbWVvdXQ6bnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcclxuICAgIGNsaWVudDphbnk7XHJcbiAgICB1cmw6c3RyaW5nO1xyXG4gICAgbG9nOmFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGFueSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXV0aDo8VD4oKSA9PiBQcm9taXNlPHN0cmluZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOkNsaWVudE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7dGVzdDogZmFsc2UsIHRpbWVvdXQ6IDYwfTtcclxuXHJcbiAgICAgICAgdGhpcy51cmwgPSBcImh0dHA6Ly9lLXNvbHV0aW9uLnBpY2twb2ludC5ydS9hcGkvXCI7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudGVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnVybCA9IFwiaHR0cDovL2Utc29sdXRpb24ucGlja3BvaW50LnJ1L2FwaXRlc3QvXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsaWVudCA9IHJlcXVlc3QuZGVmYXVsdHMoe1xyXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgdGltZW91dDogKG9wdGlvbnMudGltZW91dCB8fCA2MCkgKiAxMDAwIC8vIGRlZmF1bHQgcGlja3BvaW50IHRpbWVvdXQgaXMgNjBzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nID0gZGVidWcoJ3BpY2twb2ludDpyZXF1ZXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgc2V0U2Vzc2lvbkhhbmRsZXIoY2FsbGJhY2s6PFQ+KCkgPT4gUHJvbWlzZTxzdHJpbmc+KTp2b2lkIHtcclxuICAgICAgICB0aGlzLmF1dGggPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBkYXRhdHlwZVxyXG4gICAgICogQHBhcmFtIHJlc3VsdFxyXG4gICAgICogQHJldHVybnMge3t9fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhcHBseTxUPihkYXRhdHlwZTpEYXRhVHlwZS5SZXNwb25zZS5UeXBlSW50ZXJmYWNlPFQ+LCByZXN1bHQ6YW55KTpUIHtcclxuICAgICAgICByZXR1cm4gbmV3IGRhdGF0eXBlKHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FsbDxUPihvcHRpb25zOlJlcXVlc3RQYXJhbWV0ZXJzLCBkYXRhdHlwZT86RGF0YVR5cGUuUmVzcG9uc2UuVHlwZUludGVyZmFjZTxUPik6UHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGFbJ1Nlc3Npb25JZCddID0gb3B0aW9ucy5zZXNzaW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxOmFueSA9IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogb3B0aW9ucy51cmwucmVwbGFjZSgnXi8nLCAnJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiBvcHRpb25zLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1FbmNvZGluZ1wiOiBcIlVURi04XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJZiB3ZSBhd2FpdGluZyByZXNwb25zZSBhcyBSZXNwb25zZS5GaWxlIChsaWtlIGEgUERGKSB3ZSBtdXN0IHNldFxyXG4gICAgICAgICAgICAgKiBlbmNvZGluZyB0byBudWxsIGFuZCB3aWxsIGdpdmUgYSByZXF1ZXN0ZWQgZmlsZSBhcyBhIEJ1ZmZlci5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmICg8YW55PiBkYXRhdHlwZSA9PT0gRGF0YVR5cGUuUmVzcG9uc2UuRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmVxLmVuY29kaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2coXCJyZXF1ZXN0OiBlbmNvZGluZyAlcywgbWV0aG9kICVzIHVybCAlczogJWpcIiwgcmVxLmVuY29kaW5nLCByZXEubWV0aG9kLCB0aGlzLnVybCArIHJlcS51cmwsIHJlcS5ib2R5KTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQocmVxLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcInJlc3BvbnNlOiAlcyAlcyBbJXNdOiBlcnJvciAlc1wiLCByZXEubWV0aG9kLCB0aGlzLnVybCArIHJlcS51cmwsIHR5cGVvZiBib2R5LCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5leHBlY3RlZCByZXNwb25zZSAoJHtyZXNwb25zZS5zdGF0dXNDb2RlfSk6ICR7Ym9keX1gKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYm9keSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSBkYXRhdHlwZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgd3JhcDxUPihvcHRpb25zOlJlcXVlc3RQYXJhbWV0ZXJzLCBkYXRhdHlwZTpEYXRhVHlwZS5SZXNwb25zZS5UeXBlSW50ZXJmYWNlPFQ+KTpQcm9taXNlPFQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aCgpLnRoZW4oKHNlc3Npb24pID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3Nlc3Npb24nXSA9IHNlc3Npb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsKG9wdGlvbnMsIGRhdGF0eXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKG9wdGlvbnMsIGRhdGF0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHNlbmRzIGF1dGhvcml6ZWQgcmVxdWVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIHBvc3Q8VD4oZGF0YXR5cGU6RGF0YVR5cGUuUmVzcG9uc2UuVHlwZUludGVyZmFjZTxUPiwgdXJsOnN0cmluZywgZGF0YTphbnkgPSB7fSk6UHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcCh7bWV0aG9kOiAnUE9TVCcsIHVybCwgZGF0YX0sIGRhdGF0eXBlKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudC5hcHBseShkYXRhdHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyB1bmF1dGhvcml6ZWQgcmVxdWVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0PFQ+KGRhdGF0eXBlOkRhdGFUeXBlLlJlc3BvbnNlLlR5cGVJbnRlcmZhY2U8VD4sIHVybDpzdHJpbmcpOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoe21ldGhvZDogJ0dFVCcsIHVybH0sIGRhdGF0eXBlKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudC5hcHBseShkYXRhdHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJkOlxcd3d3XFxkZWxpdmVyeVxccGlja3BvaW50XFxidWlsZC10cyJ9