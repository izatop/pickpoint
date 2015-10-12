/// <reference path="../typings/tsd.d.ts" />

import * as assert from 'assert';

interface Box {
    name:string;
    width:number;
    height:number;
    length:number;
    weight:number;
    xyz?:number[];
    cost:number;
    discount:number;
}

interface Zone {
    zone:number;
    cost:number;
}

interface Rate {
    boxes: Box[];
    zones: Zone[];
}

var rate:Rate = {
    boxes: [
        {
            name: "XS",
            width: 10,
            height: 36,
            length: 60,
            weight: 4.2,
            cost: 175,
            discount: 164
        },
        {
            name: "S",
            width: 15,
            height: 36,
            length: 60,
            weight: 7.2,
            cost: 199,
            discount: 185
        },
        {
            name: "M",
            width: 20,
            height: 36,
            length: 60,
            weight: 9.6,
            cost: 215,
            discount: 198
        },
        {
            name: "L",
            width: 36,
            height: 36,
            length: 60,
            weight: 17.3,
            cost: 240,
            discount: 221
        },
        {
            name: "XL",
            width: 36,
            height: 60,
            length: 60,
            weight: 30.2,
            cost: 289,
            discount: 269
        },
        {
            name: "XXL",
            width: 60,
            height: 60,
            length: 60,
            weight: 50.4,
            cost: 399,
            discount: 357
        }
    ],
    zones: [
        {
            zone: -1,
            cost: 0
        },
        {
            zone: 0,
            cost: 8
        },
        {
            zone: 1,
            cost: 11.7
        },
        {
            zone: 2,
            cost: 19.5
        },
        {
            zone: 3,
            cost: 34.2
        },
        {
            zone: 4,
            cost: 46.8
        },
        {
            zone: 5,
            cost: 87.1
        },
        {
            zone: 6,
            cost: 162
        },
        {
            zone: 7,
            cost: 185
        },
        {
            zone: 8,
            cost: 270
        }
    ]
};

class Calculator {
    rate:Rate;
    zones:Map<number, number>;
    boxes:Box[];

    constructor(rate:Rate) {
        this.rate = rate;
        this.zones = new Map();
        this.boxes = [];

        rate.boxes.forEach((item) => {
            item.xyz = [item.width, item.height, item.length].sort();
            this.boxes.push(item);
        });

        rate.zones.forEach((item) => {
            this.zones.set(item.zone, item.cost);
        });
    }

    calculate(zone:number, factor:number, w:number, h:number, l:number, wt:number, discount:boolean = false):number {
        var box = this.getBox(w, h, l);
        var zoneCost = this.getZone(zone);

        assert.notStrictEqual(box, null, "A box doesn't match by dimensions");
        assert.notStrictEqual(zoneCost, null, "Unknown zone " + zone);

        let boxCost = discount ? box.discount : box.cost;
        let deliveryCost = zoneCost * wt;

        return (boxCost + deliveryCost) * factor;
    }

    getZone(zone:number):number {
        return this.zones.has(zone) ?
            this.zones.get(zone) : null;
    }

    getBox(w:number, h:number, l:number):Box {
        var xyz = [w, h, l].sort();
        for (let box of this.rate.boxes) {
            if (box.xyz[0] >= xyz[0] && box.xyz[1] >= xyz[1] && box.xyz[2] >= xyz[2]) {
                return box;
            }
        }

        return null;
    }
}

export default new Calculator(rate);