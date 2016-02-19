'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Response;
exports.Response = Response;
(function (Response) {
    var Type = (function () {
        function Type(message) {
            _classCallCheck(this, Type);

            if (typeof message == "object" && message.ErrorMessage) {
                throw new Error(message.ErrorMessage);
            }
            this.apply(message);
        }

        _createClass(Type, [{
            key: 'apply',
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

            _get(Object.getPrototypeOf(Logout.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Logout, [{
            key: 'apply',
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

            _get(Object.getPrototypeOf(ParcelsRegistry.prototype), 'constructor', this).apply(this, arguments);
        }

        return ParcelsRegistry;
    })(Type);

    Response.ParcelsRegistry = ParcelsRegistry;

    var ParcelsRegistryMulti = (function (_Type3) {
        _inherits(ParcelsRegistryMulti, _Type3);

        function ParcelsRegistryMulti() {
            _classCallCheck(this, ParcelsRegistryMulti);

            _get(Object.getPrototypeOf(ParcelsRegistryMulti.prototype), 'constructor', this).apply(this, arguments);
        }

        return ParcelsRegistryMulti;
    })(Type);

    Response.ParcelsRegistryMulti = ParcelsRegistryMulti;

    var ReturnParcel = (function (_Type4) {
        _inherits(ReturnParcel, _Type4);

        function ReturnParcel() {
            _classCallCheck(this, ReturnParcel);

            _get(Object.getPrototypeOf(ReturnParcel.prototype), 'constructor', this).apply(this, arguments);
        }

        return ReturnParcel;
    })(Type);

    Response.ReturnParcel = ReturnParcel;

    var ReturnInvoiceList = (function (_Type5) {
        _inherits(ReturnInvoiceList, _Type5);

        function ReturnInvoiceList() {
            _classCallCheck(this, ReturnInvoiceList);

            _get(Object.getPrototypeOf(ReturnInvoiceList.prototype), 'constructor', this).apply(this, arguments);
        }

        return ReturnInvoiceList;
    })(Type);

    Response.ReturnInvoiceList = ReturnInvoiceList;

    var ParcelHistory = (function (_Type6) {
        _inherits(ParcelHistory, _Type6);

        function ParcelHistory() {
            _classCallCheck(this, ParcelHistory);

            _get(Object.getPrototypeOf(ParcelHistory.prototype), 'constructor', this).apply(this, arguments);
        }

        return ParcelHistory;
    })(Type);

    Response.ParcelHistory = ParcelHistory;

    var Parcel = (function (_Type7) {
        _inherits(Parcel, _Type7);

        function Parcel() {
            _classCallCheck(this, Parcel);

            _get(Object.getPrototypeOf(Parcel.prototype), 'constructor', this).apply(this, arguments);
        }

        return Parcel;
    })(Type);

    Response.Parcel = Parcel;

    var ParcelDeliveryCost = (function (_Type8) {
        _inherits(ParcelDeliveryCost, _Type8);

        function ParcelDeliveryCost() {
            _classCallCheck(this, ParcelDeliveryCost);

            _get(Object.getPrototypeOf(ParcelDeliveryCost.prototype), 'constructor', this).apply(this, arguments);
        }

        return ParcelDeliveryCost;
    })(Type);

    Response.ParcelDeliveryCost = ParcelDeliveryCost;

    var RegisteredCourier = (function (_Type9) {
        _inherits(RegisteredCourier, _Type9);

        function RegisteredCourier() {
            _classCallCheck(this, RegisteredCourier);

            _get(Object.getPrototypeOf(RegisteredCourier.prototype), 'constructor', this).apply(this, arguments);
        }

        return RegisteredCourier;
    })(Type);

    Response.RegisteredCourier = RegisteredCourier;

    var CancelledCourier = (function (_Type10) {
        _inherits(CancelledCourier, _Type10);

        function CancelledCourier() {
            _classCallCheck(this, CancelledCourier);

            _get(Object.getPrototypeOf(CancelledCourier.prototype), 'constructor', this).apply(this, arguments);
        }

        return CancelledCourier;
    })(Type);

    Response.CancelledCourier = CancelledCourier;

    var File = (function (_Type11) {
        _inherits(File, _Type11);

        function File() {
            _classCallCheck(this, File);

            _get(Object.getPrototypeOf(File.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(File, [{
            key: 'apply',
            value: function apply(message) {
                if (message instanceof Buffer && message.length < 1024 && message.toString('utf-8').substr(0, 5) == 'Error') {
                    this.message = { error: message.toString('utf-8') };
                } else if (message instanceof Buffer) {
                    this.message = { buffer: message };
                } else {
                    this.message = { error: 'I don\'t known what the happening: ' + message };
                }
            }
        }]);

        return File;
    })(Type);

    Response.File = File;

    var Registry = (function (_Type12) {
        _inherits(Registry, _Type12);

        function Registry() {
            _classCallCheck(this, Registry);

            _get(Object.getPrototypeOf(Registry.prototype), 'constructor', this).apply(this, arguments);
        }

        return Registry;
    })(Type);

    Response.Registry = Registry;

    var RegistryNumber = (function (_Type13) {
        _inherits(RegistryNumber, _Type13);

        function RegistryNumber() {
            _classCallCheck(this, RegistryNumber);

            _get(Object.getPrototypeOf(RegistryNumber.prototype), 'constructor', this).apply(this, arguments);
        }

        return RegistryNumber;
    })(Type);

    Response.RegistryNumber = RegistryNumber;

    var CityList = (function (_Type14) {
        _inherits(CityList, _Type14);

        function CityList() {
            _classCallCheck(this, CityList);

            _get(Object.getPrototypeOf(CityList.prototype), 'constructor', this).apply(this, arguments);
        }

        return CityList;
    })(Type);

    Response.CityList = CityList;

    var PostamatList = (function (_Type15) {
        _inherits(PostamatList, _Type15);

        function PostamatList() {
            _classCallCheck(this, PostamatList);

            _get(Object.getPrototypeOf(PostamatList.prototype), 'constructor', this).apply(this, arguments);
        }

        return PostamatList;
    })(Type);

    Response.PostamatList = PostamatList;

    var Zones = (function (_Type16) {
        _inherits(Zones, _Type16);

        function Zones() {
            _classCallCheck(this, Zones);

            _get(Object.getPrototypeOf(Zones.prototype), 'constructor', this).apply(this, arguments);
        }

        return Zones;
    })(Type);

    Response.Zones = Zones;

    var ReturnDocuments = (function (_Type17) {
        _inherits(ReturnDocuments, _Type17);

        function ReturnDocuments() {
            _classCallCheck(this, ReturnDocuments);

            _get(Object.getPrototypeOf(ReturnDocuments.prototype), 'constructor', this).apply(this, arguments);
        }

        return ReturnDocuments;
    })(Type);

    Response.ReturnDocuments = ReturnDocuments;

    var Calculate = (function (_Type18) {
        _inherits(Calculate, _Type18);

        function Calculate() {
            _classCallCheck(this, Calculate);

            _get(Object.getPrototypeOf(Calculate.prototype), 'constructor', this).apply(this, arguments);
        }

        return Calculate;
    })(Type);

    Response.Calculate = Calculate;
})(Response || (exports.Response = Response = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhdHlwZS9yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQWMsUUFBUSxDQTBFckI7O0FBMUVELENBQUEsVUFBYyxRQUFRLEVBQUM7UUFLbkIsSUFBQTtBQUVJLGlCQUZKLElBQUEsQ0FFZ0IsT0FBYSxFQUFBO2tDQUY3QixJQUFBOztBQUdRLGdCQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO0FBQ3BELHNCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QztBQUVELGdCQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZCOztxQkFSTCxJQUFBOzttQkFVUyxlQUFDLE9BQWEsRUFBQTtBQUNmLG9CQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUMxQjs7O2VBWkwsSUFBQTs7O0FBQWEsWUFBQSxDQUFBLElBQUksR0FBQSxJQWFoQixDQUFBOztRQUVELE1BQUE7a0JBQUEsTUFBQTs7aUJBQUEsTUFBQTtrQ0FBQSxNQUFBOzt1Q0FBQSxNQUFBOzs7cUJBQUEsTUFBQTs7bUJBR1MsZUFBQyxPQUE4QixFQUFBO0FBQ2hDLG9CQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDbEM7OztlQUxMLE1BQUE7T0FBNEIsSUFBSTs7QUFBbkIsWUFBQSxDQUFBLE1BQU0sR0FBQSxNQU1sQixDQUFBOztRQUVELGVBQUE7a0JBQUEsZUFBQTs7aUJBQUEsZUFBQTtrQ0FBQSxlQUFBOzt1Q0FBQSxlQUFBOzs7ZUFBQSxlQUFBO09BQXFDLElBQUk7O0FBQTVCLFlBQUEsQ0FBQSxlQUFlLEdBQUEsZUFBaUQsQ0FBQTs7UUFFN0Usb0JBQUE7a0JBQUEsb0JBQUE7O2lCQUFBLG9CQUFBO2tDQUFBLG9CQUFBOzt1Q0FBQSxvQkFBQTs7O2VBQUEsb0JBQUE7T0FBMEMsSUFBSTs7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WUFBQSxDQUFBLFFBQVEsR0FBQSxRQUEwQyxDQUFBOztRQUUvRCxZQUFBO2tCQUFBLFlBQUE7O2lCQUFBLFlBQUE7a0NBQUEsWUFBQTs7dUNBQUEsWUFBQTs7O2VBQUEsWUFBQTtPQUFrQyxJQUFJOztBQUF6QixZQUFBLENBQUEsWUFBWSxHQUFBLFlBQThDLENBQUE7O1FBRXZFLEtBQUE7a0JBQUEsS0FBQTs7aUJBQUEsS0FBQTtrQ0FBQSxLQUFBOzt1Q0FBQSxLQUFBOzs7ZUFBQSxLQUFBO09BQTJCLElBQUk7O0FBQWxCLFlBQUEsQ0FBQSxLQUFLLEdBQUEsS0FBdUMsQ0FBQTs7UUFFekQsZUFBQTtrQkFBQSxlQUFBOztpQkFBQSxlQUFBO2tDQUFBLGVBQUE7O3VDQUFBLGVBQUE7OztlQUFBLGVBQUE7T0FBcUMsSUFBSTs7QUFBNUIsWUFBQSxDQUFBLGVBQWUsR0FBQSxlQUFpRCxDQUFBOztRQUU3RSxTQUFBO2tCQUFBLFNBQUE7O2lCQUFBLFNBQUE7a0NBQUEsU0FBQTs7dUNBQUEsU0FBQTs7O2VBQUEsU0FBQTtPQUErQixJQUFJOztBQUF0QixZQUFBLENBQUEsU0FBUyxHQUFBLFNBQTJDLENBQUE7Q0FDcEUsQ0FBQSxDQTFFYSxRQUFRLGFBQVIsUUFBUSxHQUFSLFFBQVEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQTBFckIiLCJmaWxlIjoiZGF0YXR5cGUvcmVzcG9uc2UuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiZDpcXHd3d1xcZGVsaXZlcnlcXHBpY2twb2ludFxcYnVpbGQtdHMifQ==