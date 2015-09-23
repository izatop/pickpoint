/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var Client = (function () {
    function Client() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? { test: false } : arguments[0];

        _classCallCheck(this, Client);

        this.url = "http://e-solution.pickpoint.ru/api/";
        if (options.test) {
            this.url = "http://e-solution.pickpoint.ru/apitest/";
        }
        this.client = _request2['default'].defaults({
            baseUrl: this.url,
            timeout: 60000
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
        value: function call(options) {
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
                    url: '/' + options.url.replace('^/', ''),
                    body: options.data,
                    json: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                _this.log("request: %s %s: %j", req.method, req.url, req.body);
                _this.client(req, function (error, response, body) {
                    _this.log("response: %s %s [%s]: error %s", req.method, req.url, typeof body, error);
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
        value: function wrap(options) {
            var _this2 = this;

            if (typeof this.auth == "function") {
                return this.auth().then(function (session) {
                    options['session'] = session;
                    return _this2.call(options);
                });
            }
            return this.call(options);
        }
    }, {
        key: 'post',
        value: function post(datatype, url) {
            var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.wrap({ method: 'POST', url: url, data: data }).then(function (result) {
                return Client.apply(datatype, result);
            });
        }
    }, {
        key: 'get',
        value: function get(datatype, url) {
            return this.call({ method: 'GET', url: url }).then(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsIkNsaWVudC5jb25zdHJ1Y3RvciIsIkNsaWVudC5zZXRTZXNzaW9uSGFuZGxlciIsIkNsaWVudC5jYWxsIiwiQ2xpZW50LndyYXAiLCJDbGllbnQucG9zdCIsIkNsaWVudC5nZXQiLCJDbGllbnQuYXBwbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3FCQUlrQixPQUFPOzs7O3VCQUNMLFNBQVM7Ozs7SUFjN0IsTUFBQTtBQWFJQSxhQWJKLE1BQUEsR0FhcURBO1lBQXJDQSxPQUFPQSx5REFBa0JBLEVBQUNBLElBQUlBLEVBQUNBLEtBQUtBLEVBQUNBOzs4QkFickQsTUFBQTs7QUFjUUMsWUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EscUNBQXFDQSxDQUFDQTtBQUNqREEsWUFBSUEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUE7QUFDZEEsZ0JBQUlBLENBQUNBLEdBQUdBLEdBQUdBLHlDQUF5Q0EsQ0FBQ0E7U0FDeERBO0FBRURBLFlBQUlBLENBQUNBLE1BQU1BLEdBQUdBLHFCQUFRQSxRQUFRQSxDQUFDQTtBQUMzQkEsbUJBQU9BLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBO0FBQ2pCQSxtQkFBT0EsRUFBRUEsS0FBS0E7U0FDakJBLENBQUNBLENBQUNBO0FBRUhBLFlBQUlBLENBQUNBLEdBQUdBLEdBQUdBLHdCQUFNQSxtQkFBbUJBLENBQUNBLENBQUNBO0tBQ3pDQTs7aUJBekJMLE1BQUE7O2VBOEJxQkQsMkJBQUNBLFFBQWlDQSxFQUFBQTtBQUMvQ0UsZ0JBQUlBLENBQUNBLElBQUlBLEdBQUdBLFFBQVFBLENBQUNBO1NBQ3hCQTs7O2VBZUdGLGNBQUlBLE9BQXlCQSxFQUFBQTs7O0FBQzdCRyxtQkFBT0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDL0JBLG9CQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQTtBQUNmQSwy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QUFDM0NNLG1CQUFPQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxFQUFIQSxHQUFHQSxFQUFDQSxDQUFDQSxDQUNqQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsTUFBTUEsRUFBQUE7QUFDUkEsdUJBQU9BLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO2FBQ3pDQSxDQUFDQSxDQUFDQTtTQUNWQTs7O2VBdkZtQk4sZUFBSUEsUUFBNEJBLEVBQUVBLE1BQVVBLEVBQUFBO0FBQzVETyxtQkFBT0EsSUFBSUEsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7U0FDL0JBOzs7V0F6Q0wsTUFBQSIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbmRleC5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XHJcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XHJcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBEYXRhVHlwZSBmcm9tICcuL2RhdGF0eXBlJztcclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0RGF0YSB7XHJcbiAgICBba2V5OnN0cmluZ106YW55O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdFBhcmFtZXRlcnMge1xyXG4gICAgbWV0aG9kPzpzdHJpbmc7XHJcbiAgICB1cmw6c3RyaW5nO1xyXG4gICAgZGF0YT86UmVxdWVzdERhdGE7XHJcbiAgICBzZXNzaW9uPzpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGllbnQge1xyXG4gICAgY2xpZW50OmFueTtcclxuICAgIHVybDpzdHJpbmc7XHJcbiAgICBsb2c6YW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgYW55IG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdXRoOjxUPigpID0+IFByb21pc2U8c3RyaW5nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6e3Rlc3Q6Ym9vbGVhbn0gPSB7dGVzdDpmYWxzZX0pIHtcclxuICAgICAgICB0aGlzLnVybCA9IFwiaHR0cDovL2Utc29sdXRpb24ucGlja3BvaW50LnJ1L2FwaS9cIjtcclxuICAgICAgICBpZiAob3B0aW9ucy50ZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXJsID0gXCJodHRwOi8vZS1zb2x1dGlvbi5waWNrcG9pbnQucnUvYXBpdGVzdC9cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gcmVxdWVzdC5kZWZhdWx0cyh7XHJcbiAgICAgICAgICAgIGJhc2VVcmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiA2MDAwMCAvLyBkZWZhdWx0IHBpY2twb2ludCB0aW1lb3V0IGlzIDYwc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxvZyA9IGRlYnVnKCdwaWNrcG9pbnQ6cmVxdWVzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIHNldFNlc3Npb25IYW5kbGVyKGNhbGxiYWNrOjxUPigpID0+IFByb21pc2U8c3RyaW5nPik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdXRoID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZGF0YXR5cGVcclxuICAgICAqIEBwYXJhbSByZXN1bHRcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXBwbHk8VD4oZGF0YXR5cGU6bmV3IChkYXRhOmFueSkgPT4gVCwgcmVzdWx0OmFueSk6VCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBkYXRhdHlwZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxsPFQ+KG9wdGlvbnM6UmVxdWVzdFBhcmFtZXRlcnMpOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhWydTZXNzaW9uSWQnXSA9IG9wdGlvbnMuc2Vzc2lvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlcSA9IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogJy8nICsgb3B0aW9ucy51cmwucmVwbGFjZSgnXi8nLCAnJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiBvcHRpb25zLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZyhcInJlcXVlc3Q6ICVzICVzOiAlalwiLCByZXEubWV0aG9kLCByZXEudXJsLCByZXEuYm9keSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50KHJlcSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXCJyZXNwb25zZTogJXMgJXMgWyVzXTogZXJyb3IgJXNcIiwgcmVxLm1ldGhvZCwgcmVxLnVybCwgdHlwZW9mIGJvZHksIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmV4cGVjdGVkIHJlc3BvbnNlICgke3Jlc3BvbnNlLnN0YXR1c0NvZGV9KTogJHtib2R5fWApKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShib2R5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgd3JhcDxUPihvcHRpb25zOlJlcXVlc3RQYXJhbWV0ZXJzKTpQcm9taXNlPFQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aCgpLnRoZW4oKHNlc3Npb24pID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3Nlc3Npb24nXSA9IHNlc3Npb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyBhdXRob3JpemVkIHJlcXVlc3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhdHlwZVxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBwb3N0PFQ+KGRhdGF0eXBlOm5ldyAoZGF0YTphbnkpID0+IFQsIHVybDpzdHJpbmcsIGRhdGE6YW55ID0ge30pOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXAoe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudC5hcHBseShkYXRhdHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyB1bmF1dGhvcml6ZWQgcmVxdWVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0PFQ+KGRhdGF0eXBlOm5ldyAoZGF0YTphbnkpID0+IFQsIHVybDpzdHJpbmcpOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoe21ldGhvZDogJ0dFVCcsIHVybH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xpZW50LmFwcGx5KGRhdGF0eXBlLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6ImQ6XFx3d3dcXGRlbGl2ZXJ5XFxwaWNrcG9pbnRcXGJ1aWxkLXRzIn0=