/// <reference path="../typings/tsd.d.ts" />

declare module "request" {
    import * as http from 'http';

    export default RequestAPI;

    function RequestAPI(uri: string, options?: any, callback?: (error: any, response: http.IncomingMessage, body: any) => void);
    function RequestAPI(uri: string, callback?: (error: any, response: http.IncomingMessage, body: any) => void);
    function RequestAPI(options: any, callback?: (error: any, response: http.IncomingMessage, body: any) => void);
    module RequestAPI {
        export function defaults(options:any):void;
    }
}

declare module "debug" {
    export default function debug(namespace:string):(formatter:string, ...args:any[]) => void;

    module debug {
        export function Debugger(formatter:string, ...args:any[]);
    }
}