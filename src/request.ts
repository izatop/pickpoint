/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />

import * as util from 'util';
import debug from 'debug';
import request from 'request';
import * as DataType from './datatype';

interface RequestData {
    [key:string]:any;
}

interface RequestParameters {
    method?:string;
    url:string;
    data?:RequestData;
    session?:string;
}

export class Client {
    client:any;
    url:string;
    log:any;

    /**
     * This function will be called before any method.
     */
    private auth:<T>() => Promise<string>;

    /**
     * @param options
     */
    constructor(options:{test:boolean} = {test:false}) {
        this.url = "http://e-solution.pickpoint.ru/api/";
        if (options.test) {
            this.url = "http://e-solution.pickpoint.ru/apitest/";
        }

        this.client = request.defaults({
            baseUrl: this.url,
            timeout: 60000 // default pickpoint timeout is 60s
        });

        this.log = debug('pickpoint:request');
    }

    /**
     * @param callback
     */
    setSessionHandler(callback:<T>() => Promise<string>):void {
        this.auth = callback;
    }

    /**
     * @param datatype
     * @param result
     * @returns {{}}
     */
    private static apply<T>(datatype:new (data:any) => T, result:any):T {
        return new datatype(result);
    }

    /**
     * @param options
     * @returns {Promise<T>}
     */
    call<T>(options:RequestParameters):Promise<T> {
        return new Promise((resolve, reject) => {
            if (!options.data) {
                options.data = {};
            }

            if (options.session) {
                options.data['SessionId'] = options.session;
            }

            let req = {
                method: options.method || "GET",
                url: '/' + options.url.replace('^/', ''),
                body: options.data,
                json: true,
                headers: {
                    "Content-Type": "application/json"
                }
            };

            this.log("request: %s %s: %j", req.method, req.url, req.body);
            this.client(req, (error, response, body) => {
                this.log("response: %s %s [%s]: error %s", req.method, req.url, typeof body, error);

                if (error) {
                    return reject(error);
                }

                if (response.statusCode != 200) {
                    reject(new Error(`Unexpected response (${response.statusCode}): ${body}`));
                } else {
                    resolve(body);
                }
            });
        });
    }

    /**
     * @param options
     * @returns {Promise<T>}
     */
    private wrap<T>(options:RequestParameters):Promise<T> {
        if (typeof this.auth == "function") {
            return this.auth().then((session) => {
                options['session'] = session;
                return this.call(options);
            });
        }

        return this.call(options);
    }

    /**
     * This method sends authorized requests.
     *
     * @param datatype
     * @param url
     * @param data
     * @returns {Promise<T>}
     */
    post<T>(datatype:new (data:any) => T, url:string, data:any = {}):Promise<T> {
        return this.wrap({method: 'POST', url, data})
            .then(result => {
                return Client.apply(datatype, result);
            });
    }

    /**
     * This method sends unauthorized requests.
     *
     * @param datatype
     * @param url
     * @returns {Promise<T>}
     */
    get<T>(datatype:new (data:any) => T, url:string):Promise<T> {
        return this.call({method: 'GET', url})
            .then(result => {
                return Client.apply(datatype, result);
            });
    }
}
