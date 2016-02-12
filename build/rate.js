"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var rate = {
    boxes: [{
        name: "XS",
        width: 10,
        height: 36,
        length: 60,
        weight: 4.2,
        cost: 175,
        discount: 164
    }, {
        name: "S",
        width: 15,
        height: 36,
        length: 60,
        weight: 7.2,
        cost: 199,
        discount: 185
    }, {
        name: "M",
        width: 20,
        height: 36,
        length: 60,
        weight: 9.6,
        cost: 215,
        discount: 198
    }, {
        name: "L",
        width: 36,
        height: 36,
        length: 60,
        weight: 17.3,
        cost: 240,
        discount: 221
    }, {
        name: "XL",
        width: 36,
        height: 60,
        length: 60,
        weight: 30.2,
        cost: 289,
        discount: 269
    }, {
        name: "XXL",
        width: 60,
        height: 60,
        length: 60,
        weight: 50.4,
        cost: 399,
        discount: 357
    }],
    zones: [{
        zone: -1,
        cost: 0
    }, {
        zone: 0,
        cost: 8
    }, {
        zone: 1,
        cost: 11.7
    }, {
        zone: 2,
        cost: 19.5
    }, {
        zone: 3,
        cost: 34.2
    }, {
        zone: 4,
        cost: 46.8
    }, {
        zone: 5,
        cost: 87.1
    }, {
        zone: 6,
        cost: 162
    }, {
        zone: 7,
        cost: 185
    }, {
        zone: 8,
        cost: 270
    }]
};

var Calculator = (function () {
    function Calculator(rate) {
        var _this = this;

        _classCallCheck(this, Calculator);

        this.rate = rate;
        this.zones = new Map();
        this.boxes = [];
        rate.boxes.forEach(function (item) {
            item.xyz = [item.width, item.height, item.length].sort();
            _this.boxes.push(item);
        });
        rate.zones.forEach(function (item) {
            _this.zones.set(item.zone, item.cost);
        });
    }

    _createClass(Calculator, [{
        key: "calculate",
        value: function calculate(zone, factor, w, h, l, wt) {
            var discount = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

            var box = this.getBox(w, h, l);
            var zoneCost = this.getZone(zone);
            assert.notStrictEqual(box, null, "A box doesn't match by dimensions");
            assert.notStrictEqual(zoneCost, null, "Unknown zone " + zone);
            var boxCost = discount ? box.discount : box.cost;
            var deliveryCost = zoneCost * wt;
            return (boxCost + deliveryCost) * factor;
        }
    }, {
        key: "getZone",
        value: function getZone(zone) {
            return this.zones.has(zone) ? this.zones.get(zone) : null;
        }
    }, {
        key: "getBox",
        value: function getBox(w, h, l) {
            var xyz = [w, h, l].sort();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.rate.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var box = _step.value;

                    if (box.xyz[0] >= xyz[0] && box.xyz[1] >= xyz[1] && box.xyz[2] >= xyz[2]) {
                        return box;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }
    }]);

    return Calculator;
})();

exports["default"] = new Calculator(rate);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QkFBQyxJQUFXLEVBQUE7QUFDZixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25DOzs7ZUFFSyxnQkFBQyxDQUFRLEVBQUUsQ0FBUSxFQUFFLENBQVEsRUFBQTtBQUMvQixnQkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7QUFDM0IscUNBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyw4SEFBRTt3QkFBeEIsR0FBRzs7QUFDUix3QkFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0RSwrQkFBTyxHQUFHLENBQUM7cUJBQ2Q7aUJBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7O1dBL0NMLFVBQUE7OztxQkFrRGUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDIiwiZmlsZSI6InJhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgKiBhcyBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcclxuXHJcbmludGVyZmFjZSBCb3gge1xyXG4gICAgbmFtZTpzdHJpbmc7XHJcbiAgICB3aWR0aDpudW1iZXI7XHJcbiAgICBoZWlnaHQ6bnVtYmVyO1xyXG4gICAgbGVuZ3RoOm51bWJlcjtcclxuICAgIHdlaWdodDpudW1iZXI7XHJcbiAgICB4eXo/Om51bWJlcltdO1xyXG4gICAgY29zdDpudW1iZXI7XHJcbiAgICBkaXNjb3VudDpudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBab25lIHtcclxuICAgIHpvbmU6bnVtYmVyO1xyXG4gICAgY29zdDpudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSYXRlIHtcclxuICAgIGJveGVzOiBCb3hbXTtcclxuICAgIHpvbmVzOiBab25lW107XHJcbn1cclxuXHJcbnZhciByYXRlOlJhdGUgPSB7XHJcbiAgICBib3hlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJYU1wiLFxyXG4gICAgICAgICAgICB3aWR0aDogMTAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzYsXHJcbiAgICAgICAgICAgIGxlbmd0aDogNjAsXHJcbiAgICAgICAgICAgIHdlaWdodDogNC4yLFxyXG4gICAgICAgICAgICBjb3N0OiAxNzUsXHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAxNjRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJTXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiAxNSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNixcclxuICAgICAgICAgICAgbGVuZ3RoOiA2MCxcclxuICAgICAgICAgICAgd2VpZ2h0OiA3LjIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDE5OSxcclxuICAgICAgICAgICAgZGlzY291bnQ6IDE4NVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIk1cIixcclxuICAgICAgICAgICAgd2lkdGg6IDIwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2LFxyXG4gICAgICAgICAgICBsZW5ndGg6IDYwLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6IDkuNixcclxuICAgICAgICAgICAgY29zdDogMjE1LFxyXG4gICAgICAgICAgICBkaXNjb3VudDogMTk4XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTFwiLFxyXG4gICAgICAgICAgICB3aWR0aDogMzYsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzYsXHJcbiAgICAgICAgICAgIGxlbmd0aDogNjAsXHJcbiAgICAgICAgICAgIHdlaWdodDogMTcuMyxcclxuICAgICAgICAgICAgY29zdDogMjQwLFxyXG4gICAgICAgICAgICBkaXNjb3VudDogMjIxXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiWExcIixcclxuICAgICAgICAgICAgd2lkdGg6IDM2LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwLFxyXG4gICAgICAgICAgICBsZW5ndGg6IDYwLFxyXG4gICAgICAgICAgICB3ZWlnaHQ6IDMwLjIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDI4OSxcclxuICAgICAgICAgICAgZGlzY291bnQ6IDI2OVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlhYTFwiLFxyXG4gICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNjAsXHJcbiAgICAgICAgICAgIGxlbmd0aDogNjAsXHJcbiAgICAgICAgICAgIHdlaWdodDogNTAuNCxcclxuICAgICAgICAgICAgY29zdDogMzk5LFxyXG4gICAgICAgICAgICBkaXNjb3VudDogMzU3XHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIHpvbmVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB6b25lOiAtMSxcclxuICAgICAgICAgICAgY29zdDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICBjb3N0OiA4XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHpvbmU6IDEsXHJcbiAgICAgICAgICAgIGNvc3Q6IDExLjdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgem9uZTogMixcclxuICAgICAgICAgICAgY29zdDogMTkuNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB6b25lOiAzLFxyXG4gICAgICAgICAgICBjb3N0OiAzNC4yXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHpvbmU6IDQsXHJcbiAgICAgICAgICAgIGNvc3Q6IDQ2LjhcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgem9uZTogNSxcclxuICAgICAgICAgICAgY29zdDogODcuMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB6b25lOiA2LFxyXG4gICAgICAgICAgICBjb3N0OiAxNjJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgem9uZTogNyxcclxuICAgICAgICAgICAgY29zdDogMTg1XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHpvbmU6IDgsXHJcbiAgICAgICAgICAgIGNvc3Q6IDI3MFxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmNsYXNzIENhbGN1bGF0b3Ige1xyXG4gICAgcmF0ZTpSYXRlO1xyXG4gICAgem9uZXM6TWFwPG51bWJlciwgbnVtYmVyPjtcclxuICAgIGJveGVzOkJveFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJhdGU6UmF0ZSkge1xyXG4gICAgICAgIHRoaXMucmF0ZSA9IHJhdGU7XHJcbiAgICAgICAgdGhpcy56b25lcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmJveGVzID0gW107XHJcblxyXG4gICAgICAgIHJhdGUuYm94ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLnh5eiA9IFtpdGVtLndpZHRoLCBpdGVtLmhlaWdodCwgaXRlbS5sZW5ndGhdLnNvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5ib3hlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByYXRlLnpvbmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lcy5zZXQoaXRlbS56b25lLCBpdGVtLmNvc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZSh6b25lOm51bWJlciwgZmFjdG9yOm51bWJlciwgdzpudW1iZXIsIGg6bnVtYmVyLCBsOm51bWJlciwgd3Q6bnVtYmVyLCBkaXNjb3VudDpib29sZWFuID0gZmFsc2UpOm51bWJlciB7XHJcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuZ2V0Qm94KHcsIGgsIGwpO1xyXG4gICAgICAgIHZhciB6b25lQ29zdCA9IHRoaXMuZ2V0Wm9uZSh6b25lKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGJveCwgbnVsbCwgXCJBIGJveCBkb2Vzbid0IG1hdGNoIGJ5IGRpbWVuc2lvbnNcIik7XHJcbiAgICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKHpvbmVDb3N0LCBudWxsLCBcIlVua25vd24gem9uZSBcIiArIHpvbmUpO1xyXG5cclxuICAgICAgICBsZXQgYm94Q29zdCA9IGRpc2NvdW50ID8gYm94LmRpc2NvdW50IDogYm94LmNvc3Q7XHJcbiAgICAgICAgbGV0IGRlbGl2ZXJ5Q29zdCA9IHpvbmVDb3N0ICogd3Q7XHJcblxyXG4gICAgICAgIHJldHVybiAoYm94Q29zdCArIGRlbGl2ZXJ5Q29zdCkgKiBmYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wm9uZSh6b25lOm51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy56b25lcy5oYXMoem9uZSkgP1xyXG4gICAgICAgICAgICB0aGlzLnpvbmVzLmdldCh6b25lKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Qm94KHc6bnVtYmVyLCBoOm51bWJlciwgbDpudW1iZXIpOkJveCB7XHJcbiAgICAgICAgdmFyIHh5eiA9IFt3LCBoLCBsXS5zb3J0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgYm94IG9mIHRoaXMucmF0ZS5ib3hlcykge1xyXG4gICAgICAgICAgICBpZiAoYm94Lnh5elswXSA+PSB4eXpbMF0gJiYgYm94Lnh5elsxXSA+PSB4eXpbMV0gJiYgYm94Lnh5elsyXSA+PSB4eXpbMl0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBib3g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ2FsY3VsYXRvcihyYXRlKTsiXSwic291cmNlUm9vdCI6ImQ6XFx3d3dcXGRlbGl2ZXJ5XFxwaWNrcG9pbnRcXGJ1aWxkLXRzIn0=