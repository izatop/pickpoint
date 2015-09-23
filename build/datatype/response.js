"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response;
exports.Response = Response;
(function (Response) {
    var Type = (function () {
        function Type(message) {
            _classCallCheck(this, Type);

            if (message.ErrorMessage) {
                throw new Error(message.ErrorMessage);
            }
            this.apply(message);
        }

        _createClass(Type, [{
            key: "apply",
            value: function apply(message) {
                this.message = message;
            }
        }]);

        return Type;
    })();

    Response.Type = Type;

    var Logout = (function (_Type) {
        _inherits(Logout, _Type);

        function Logout() {
            _classCallCheck(this, Logout);

            _get(Object.getPrototypeOf(Logout.prototype), "constructor", this).apply(this, arguments);
        }

        _createClass(Logout, [{
            key: "apply",
            value: function apply(message) {
                this.success = message.Success;
            }
        }]);

        return Logout;
    })(Type);

    Response.Logout = Logout;

    var ParcelsRegistry = (function (_Type2) {
        _inherits(ParcelsRegistry, _Type2);

        function ParcelsRegistry() {
            _classCallCheck(this, ParcelsRegistry);

            _get(Object.getPrototypeOf(ParcelsRegistry.prototype), "constructor", this).apply(this, arguments);
        }

        return ParcelsRegistry;
    })(Type);

    Response.ParcelsRegistry = ParcelsRegistry;

    var ParcelsRegistryMulti = (function (_Type3) {
        _inherits(ParcelsRegistryMulti, _Type3);

        function ParcelsRegistryMulti() {
            _classCallCheck(this, ParcelsRegistryMulti);

            _get(Object.getPrototypeOf(ParcelsRegistryMulti.prototype), "constructor", this).apply(this, arguments);
        }

        return ParcelsRegistryMulti;
    })(Type);

    Response.ParcelsRegistryMulti = ParcelsRegistryMulti;

    var ReturnParcel = (function (_Type4) {
        _inherits(ReturnParcel, _Type4);

        function ReturnParcel() {
            _classCallCheck(this, ReturnParcel);

            _get(Object.getPrototypeOf(ReturnParcel.prototype), "constructor", this).apply(this, arguments);
        }

        return ReturnParcel;
    })(Type);

    Response.ReturnParcel = ReturnParcel;

    var ReturnInvoiceList = (function (_Type5) {
        _inherits(ReturnInvoiceList, _Type5);

        function ReturnInvoiceList() {
            _classCallCheck(this, ReturnInvoiceList);

            _get(Object.getPrototypeOf(ReturnInvoiceList.prototype), "constructor", this).apply(this, arguments);
        }

        return ReturnInvoiceList;
    })(Type);

    Response.ReturnInvoiceList = ReturnInvoiceList;

    var ParcelHistory = (function (_Type6) {
        _inherits(ParcelHistory, _Type6);

        function ParcelHistory() {
            _classCallCheck(this, ParcelHistory);

            _get(Object.getPrototypeOf(ParcelHistory.prototype), "constructor", this).apply(this, arguments);
        }

        return ParcelHistory;
    })(Type);

    Response.ParcelHistory = ParcelHistory;

    var Parcel = (function (_Type7) {
        _inherits(Parcel, _Type7);

        function Parcel() {
            _classCallCheck(this, Parcel);

            _get(Object.getPrototypeOf(Parcel.prototype), "constructor", this).apply(this, arguments);
        }

        return Parcel;
    })(Type);

    Response.Parcel = Parcel;

    var ParcelDeliveryCost = (function (_Type8) {
        _inherits(ParcelDeliveryCost, _Type8);

        function ParcelDeliveryCost() {
            _classCallCheck(this, ParcelDeliveryCost);

            _get(Object.getPrototypeOf(ParcelDeliveryCost.prototype), "constructor", this).apply(this, arguments);
        }

        return ParcelDeliveryCost;
    })(Type);

    Response.ParcelDeliveryCost = ParcelDeliveryCost;

    var RegisteredCourier = (function (_Type9) {
        _inherits(RegisteredCourier, _Type9);

        function RegisteredCourier() {
            _classCallCheck(this, RegisteredCourier);

            _get(Object.getPrototypeOf(RegisteredCourier.prototype), "constructor", this).apply(this, arguments);
        }

        return RegisteredCourier;
    })(Type);

    Response.RegisteredCourier = RegisteredCourier;

    var CancelledCourier = (function (_Type10) {
        _inherits(CancelledCourier, _Type10);

        function CancelledCourier() {
            _classCallCheck(this, CancelledCourier);

            _get(Object.getPrototypeOf(CancelledCourier.prototype), "constructor", this).apply(this, arguments);
        }

        return CancelledCourier;
    })(Type);

    Response.CancelledCourier = CancelledCourier;

    var File = (function (_Type11) {
        _inherits(File, _Type11);

        function File() {
            _classCallCheck(this, File);

            _get(Object.getPrototypeOf(File.prototype), "constructor", this).apply(this, arguments);
        }

        return File;
    })(Type);

    Response.File = File;

    var Registry = (function (_Type12) {
        _inherits(Registry, _Type12);

        function Registry() {
            _classCallCheck(this, Registry);

            _get(Object.getPrototypeOf(Registry.prototype), "constructor", this).apply(this, arguments);
        }

        return Registry;
    })(Type);

    Response.Registry = Registry;

    var RegistryNumber = (function (_Type13) {
        _inherits(RegistryNumber, _Type13);

        function RegistryNumber() {
            _classCallCheck(this, RegistryNumber);

            _get(Object.getPrototypeOf(RegistryNumber.prototype), "constructor", this).apply(this, arguments);
        }

        return RegistryNumber;
    })(Type);

    Response.RegistryNumber = RegistryNumber;

    var CityList = (function (_Type14) {
        _inherits(CityList, _Type14);

        function CityList() {
            _classCallCheck(this, CityList);

            _get(Object.getPrototypeOf(CityList.prototype), "constructor", this).apply(this, arguments);
        }

        return CityList;
    })(Type);

    Response.CityList = CityList;

    var PostamatList = (function (_Type15) {
        _inherits(PostamatList, _Type15);

        function PostamatList() {
            _classCallCheck(this, PostamatList);

            _get(Object.getPrototypeOf(PostamatList.prototype), "constructor", this).apply(this, arguments);
        }

        return PostamatList;
    })(Type);

    Response.PostamatList = PostamatList;

    var Zones = (function (_Type16) {
        _inherits(Zones, _Type16);

        function Zones() {
            _classCallCheck(this, Zones);

            _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).apply(this, arguments);
        }

        return Zones;
    })(Type);

    Response.Zones = Zones;

    var ReturnDocuments = (function (_Type17) {
        _inherits(ReturnDocuments, _Type17);

        function ReturnDocuments() {
            _classCallCheck(this, ReturnDocuments);

            _get(Object.getPrototypeOf(ReturnDocuments.prototype), "constructor", this).apply(this, arguments);
        }

        return ReturnDocuments;
    })(Type);

    Response.ReturnDocuments = ReturnDocuments;
})(Response || (exports.Response = Response = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhdHlwZS9SZXNwb25zZS50cyJdLCJuYW1lcyI6WyJSZXNwb25zZSIsIlJlc3BvbnNlLlR5cGUiLCJSZXNwb25zZS5UeXBlLmNvbnN0cnVjdG9yIiwiUmVzcG9uc2UuVHlwZS5hcHBseSIsIlJlc3BvbnNlLkxvZ291dCIsIlJlc3BvbnNlLkxvZ291dC5hcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFjLFFBQVEsQ0F1RHJCOztBQXZERCxDQUFBLFVBQWMsUUFBUSxFQUFDO1FBQ25CQSxJQUFBQTtBQUVJQyxpQkFGSkQsSUFBQUEsQ0FFZ0JDLE9BQVNBLEVBQUFBO2tDQUZ6QkQsSUFBQUE7O0FBR1FFLGdCQUFJQSxPQUFPQSxDQUFDQSxZQUFZQSxFQUFFQTtBQUN0QkEsc0JBQU1BLElBQUlBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2FBQ3pDQTtBQUVEQSxnQkFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7U0FDdkJBOztxQkFSTEYsSUFBQUE7O21CQVVTQyxlQUFDQSxPQUFTQSxFQUFBQTtBQUNYRSxvQkFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0E7YUFDMUJBOzs7ZUFaTEgsSUFBQUE7OztBQUFhQSxZQUFBQSxDQUFBQSxJQUFJQSxHQUFBQSxJQWFoQkEsQ0FBQUE7O1FBRURBLE1BQUFBO2tCQUFBQSxNQUFBQTs7aUJBQUFBLE1BQUFBO2tDQUFBQSxNQUFBQTs7dUNBQUFBLE1BQUFBOzs7cUJBQUFBLE1BQUFBOzttQkFHU0ksZUFBQ0EsT0FBOEJBLEVBQUFBO0FBQ2hDQyxvQkFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7YUFDbENBOzs7ZUFMTEwsTUFBQUE7T0FBNEJBLElBQUlBOztBQUFuQkEsWUFBQUEsQ0FBQUEsTUFBTUEsR0FBQUEsTUFNbEJBLENBQUFBOztRQUVEQSxlQUFBQTtrQkFB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QTs7QUFBckJBLFlBQUFBLENBQUFBLFFBQVFBLEdBQUFBLFFBQTBDQSxDQUFBQTs7UUFFL0RBLFlBQUFBO2tCQUFBQSxZQUFBQTs7aUJBQUFBLFlBQUFBO2tDQUFBQSxZQUFBQTs7dUNBQUFBLFlBQUFBOzs7ZUFBQUEsWUFBQUE7T0FBa0NBLElBQUlBOztBQUF6QkEsWUFBQUEsQ0FBQUEsWUFBWUEsR0FBQUEsWUFBOENBLENBQUFBOztRQUV2RUEsS0FBQUE7a0JBQUFBLEtBQUFBOztpQkFBQUEsS0FBQUE7a0NBQUFBLEtBQUFBOzt1Q0FBQUEsS0FBQUE7OztlQUFBQSxLQUFBQTtPQUEyQkEsSUFBSUE7O0FBQWxCQSxZQUFBQSxDQUFBQSxLQUFLQSxHQUFBQSxLQUF1Q0EsQ0FBQUE7O1FBRXpEQSxlQUFBQTtrQkFBQUEsZUFBQUE7O2lCQUFBQSxlQUFBQTtrQ0FBQUEsZUFBQUE7O3VDQUFBQSxlQUFBQTs7O2VBQUFBLGVBQUFBO09BQXFDQSxJQUFJQTs7QUFBNUJBLFlBQUFBLENBQUFBLGVBQWVBLEdBQUFBLGVBQWlEQSxDQUFBQTtDQUNoRkEsQ0FBQUEsQ0F2RGEsUUFBUSxhQUFSLFFBQVEsR0FBUixRQUFRLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0F1RHJCIiwiZmlsZSI6ImRhdGF0eXBlL3Jlc3BvbnNlLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6ImQ6XFx3d3dcXGRlbGl2ZXJ5XFxwaWNrcG9pbnRcXGJ1aWxkLXRzIn0=