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
//# sourceMappingURL=data:application/json;base64,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LE9BQU8sQ0FBQyxDQUFDO2lCQUM3QixDQUFDLENBQUM7YUFDTjtBQUVELG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7OztlQVVHLGNBQUksUUFBNEIsRUFBRSxHQUFVLEVBQWU7Z0JBQWIsSUFBSSx5REFBTyxFQUFFOztBQUMzRCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQyxDQUN4QyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUE7QUFDUix1QkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6QyxDQUFDLENBQUM7U0FDVjs7O2VBU0UsYUFBSSxRQUE0QixFQUFFLEdBQVUsRUFBQTtBQUMzQyxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFDLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFBO0FBQ1IsdUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekMsQ0FBQyxDQUFDO1NBQ1Y7OztlQXZGbUIsZUFBSSxRQUE0QixFQUFFLE1BQVUsRUFBQTtBQUM1RCxtQkFBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjs7O1dBekNMLE1BQUEiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW5kZXguZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xyXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxuaW1wb3J0ICogYXMgRGF0YVR5cGUgZnJvbSAnLi9kYXRhdHlwZSc7XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdERhdGEge1xyXG4gICAgW2tleTpzdHJpbmddOmFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3RQYXJhbWV0ZXJzIHtcclxuICAgIG1ldGhvZD86c3RyaW5nO1xyXG4gICAgdXJsOnN0cmluZztcclxuICAgIGRhdGE/OlJlcXVlc3REYXRhO1xyXG4gICAgc2Vzc2lvbj86c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcclxuICAgIGNsaWVudDphbnk7XHJcbiAgICB1cmw6c3RyaW5nO1xyXG4gICAgbG9nOmFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGFueSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXV0aDo8VD4oKSA9PiBQcm9taXNlPHN0cmluZz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOnt0ZXN0OmJvb2xlYW59ID0ge3Rlc3Q6ZmFsc2V9KSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcImh0dHA6Ly9lLXNvbHV0aW9uLnBpY2twb2ludC5ydS9hcGkvXCI7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudGVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnVybCA9IFwiaHR0cDovL2Utc29sdXRpb24ucGlja3BvaW50LnJ1L2FwaXRlc3QvXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsaWVudCA9IHJlcXVlc3QuZGVmYXVsdHMoe1xyXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgdGltZW91dDogNjAwMDAgLy8gZGVmYXVsdCBwaWNrcG9pbnQgdGltZW91dCBpcyA2MHNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2cgPSBkZWJ1ZygncGlja3BvaW50OnJlcXVlc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBzZXRTZXNzaW9uSGFuZGxlcihjYWxsYmFjazo8VD4oKSA9PiBQcm9taXNlPHN0cmluZz4pOnZvaWQge1xyXG4gICAgICAgIHRoaXMuYXV0aCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGRhdGF0eXBlXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJucyB7e319XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGFwcGx5PFQ+KGRhdGF0eXBlOm5ldyAoZGF0YTphbnkpID0+IFQsIHJlc3VsdDphbnkpOlQge1xyXG4gICAgICAgIHJldHVybiBuZXcgZGF0YXR5cGUocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FsbDxUPihvcHRpb25zOlJlcXVlc3RQYXJhbWV0ZXJzKTpQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNlc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVsnU2Vzc2lvbklkJ10gPSBvcHRpb25zLnNlc3Npb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZXEgPSB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyArIG9wdGlvbnMudXJsLnJlcGxhY2UoJ14vJywgJycpLFxyXG4gICAgICAgICAgICAgICAgYm9keTogb3B0aW9ucy5kYXRhLFxyXG4gICAgICAgICAgICAgICAganNvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2coXCJyZXF1ZXN0OiAlcyAlczogJWpcIiwgcmVxLm1ldGhvZCwgcmVxLnVybCwgcmVxLmJvZHkpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudChyZXEsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwicmVzcG9uc2U6ICVzICVzIFslc106IGVycm9yICVzXCIsIHJlcS5tZXRob2QsIHJlcS51cmwsIHR5cGVvZiBib2R5LCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5leHBlY3RlZCByZXNwb25zZSAoJHtyZXNwb25zZS5zdGF0dXNDb2RlfSk6ICR7Ym9keX1gKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYm9keSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHdyYXA8VD4ob3B0aW9uczpSZXF1ZXN0UGFyYW1ldGVycyk6UHJvbWlzZTxUPiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGgoKS50aGVuKChzZXNzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zWydzZXNzaW9uJ10gPSBzZXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChvcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc2VuZHMgYXV0aG9yaXplZCByZXF1ZXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGF0YXR5cGVcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgcG9zdDxUPihkYXRhdHlwZTpuZXcgKGRhdGE6YW55KSA9PiBULCB1cmw6c3RyaW5nLCBkYXRhOmFueSA9IHt9KTpQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHttZXRob2Q6ICdQT1NUJywgdXJsLCBkYXRhfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDbGllbnQuYXBwbHkoZGF0YXR5cGUsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc2VuZHMgdW5hdXRob3JpemVkIHJlcXVlc3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhdHlwZVxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGdldDxUPihkYXRhdHlwZTpuZXcgKGRhdGE6YW55KSA9PiBULCB1cmw6c3RyaW5nKTpQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKHttZXRob2Q6ICdHRVQnLCB1cmx9KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudC5hcHBseShkYXRhdHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJkOlxcd3d3XFxkZWxpdmVyeVxccGlja3BvaW50XFxidWlsZC10cyJ9