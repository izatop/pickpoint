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
    function Client(options) {
        _classCallCheck(this, Client);

        options = options || { test: false, timeout: 60 };
        this.url = "http://e-solution.pickpoint.ru/api/";
        if (options.test) {
            this.url = "http://e-solution.pickpoint.ru/apitest/";
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
//# sourceMappingURL=data:application/json;base64,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LFVBQUMsT0FBTyxFQUFBO0FBQzVCLDJCQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQzdCLDJCQUFPLE9BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QixDQUFDLENBQUM7YUFDTjtBQUVELG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7OztlQVVHLGNBQUksUUFBNEIsRUFBRSxHQUFVLEVBQWU7Z0JBQWIsSUFBSSx5REFBTyxFQUFFOztBQUMzRCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUN4QyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUE7QUFDUix1QkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6QyxDQUFDLENBQUM7U0FDVjs7O2VBU0UsYUFBSSxRQUE0QixFQUFFLEdBQVUsRUFBQTtBQUMzQyxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFDLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFBO0FBQ1IsdUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekMsQ0FBQyxDQUFDO1NBQ1Y7OztlQXZGbUIsZUFBSSxRQUE0QixFQUFFLE1BQVUsRUFBQTtBQUM1RCxtQkFBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjs7O1dBM0NMLE1BQUEiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW5kZXguZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxuaW1wb3J0ICogYXMgRGF0YVR5cGUgZnJvbSAnLi9kYXRhdHlwZSc7XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdERhdGEge1xyXG4gICAgW2tleTpzdHJpbmddOmFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3RQYXJhbWV0ZXJzIHtcclxuICAgIG1ldGhvZD86c3RyaW5nO1xyXG4gICAgdXJsOnN0cmluZztcclxuICAgIGRhdGE/OlJlcXVlc3REYXRhO1xyXG4gICAgc2Vzc2lvbj86c3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ2xpZW50T3B0aW9ucyB7XHJcbiAgICB0ZXN0OmJvb2xlYW47XHJcbiAgICB0aW1lb3V0Om51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudCB7XHJcbiAgICBjbGllbnQ6YW55O1xyXG4gICAgdXJsOnN0cmluZztcclxuICAgIGxvZzphbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGJlZm9yZSBhbnkgbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF1dGg6PFQ+KCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczpDbGllbnRPcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge3Rlc3Q6IGZhbHNlLCB0aW1lb3V0OiA2MH07XHJcblxyXG4gICAgICAgIHRoaXMudXJsID0gXCJodHRwOi8vZS1zb2x1dGlvbi5waWNrcG9pbnQucnUvYXBpL1wiO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy51cmwgPSBcImh0dHA6Ly9lLXNvbHV0aW9uLnBpY2twb2ludC5ydS9hcGl0ZXN0L1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSByZXF1ZXN0LmRlZmF1bHRzKHtcclxuICAgICAgICAgICAgYmFzZVVybDogdGhpcy51cmwsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IChvcHRpb25zLnRpbWVvdXQgfHwgNjApICogMTAwMCAvLyBkZWZhdWx0IHBpY2twb2ludCB0aW1lb3V0IGlzIDYwc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxvZyA9IGRlYnVnKCdwaWNrcG9pbnQ6cmVxdWVzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIHNldFNlc3Npb25IYW5kbGVyKGNhbGxiYWNrOjxUPigpID0+IFByb21pc2U8c3RyaW5nPik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdXRoID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZGF0YXR5cGVcclxuICAgICAqIEBwYXJhbSByZXN1bHRcclxuICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXBwbHk8VD4oZGF0YXR5cGU6bmV3IChkYXRhOmFueSkgPT4gVCwgcmVzdWx0OmFueSk6VCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBkYXRhdHlwZShyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxsPFQ+KG9wdGlvbnM6UmVxdWVzdFBhcmFtZXRlcnMpOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhWydTZXNzaW9uSWQnXSA9IG9wdGlvbnMuc2Vzc2lvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlcSA9IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogJy8nICsgb3B0aW9ucy51cmwucmVwbGFjZSgnXi8nLCAnJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiBvcHRpb25zLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZyhcInJlcXVlc3Q6ICVzICVzOiAlalwiLCByZXEubWV0aG9kLCByZXEudXJsLCByZXEuYm9keSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50KHJlcSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXCJyZXNwb25zZTogJXMgJXMgWyVzXTogZXJyb3IgJXNcIiwgcmVxLm1ldGhvZCwgcmVxLnVybCwgdHlwZW9mIGJvZHksIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmV4cGVjdGVkIHJlc3BvbnNlICgke3Jlc3BvbnNlLnN0YXR1c0NvZGV9KTogJHtib2R5fWApKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShib2R5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgd3JhcDxUPihvcHRpb25zOlJlcXVlc3RQYXJhbWV0ZXJzKTpQcm9taXNlPFQ+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aCgpLnRoZW4oKHNlc3Npb24pID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3Nlc3Npb24nXSA9IHNlc3Npb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyBhdXRob3JpemVkIHJlcXVlc3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhdHlwZVxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBwb3N0PFQ+KGRhdGF0eXBlOm5ldyAoZGF0YTphbnkpID0+IFQsIHVybDpzdHJpbmcsIGRhdGE6YW55ID0ge30pOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXAoe21ldGhvZDogJ1BPU1QnLCB1cmwsIGRhdGF9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudC5hcHBseShkYXRhdHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyB1bmF1dGhvcml6ZWQgcmVxdWVzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgZ2V0PFQ+KGRhdGF0eXBlOm5ldyAoZGF0YTphbnkpID0+IFQsIHVybDpzdHJpbmcpOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoe21ldGhvZDogJ0dFVCcsIHVybH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xpZW50LmFwcGx5KGRhdGF0eXBlLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6ImQ6XFx3d3dcXGRlbGl2ZXJ5XFxwaWNrcG9pbnRcXGJ1aWxkLXRzIn0=