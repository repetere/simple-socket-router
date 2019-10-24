/// <reference types="node" />
import { EventEmitter } from "events";
export interface handler {
    (data: any, next: () => void): void;
}
export interface emitter extends EventEmitter {
    _onevent: any;
    onevent: any;
}
export interface socket extends emitter {
    use?: any;
}
export interface middlerwareOptions {
    socket: socket;
    router: Router;
}
export declare type matchedRoute = {
    params: {};
    splats: string[];
    route: string;
    next: number;
    fn: any;
};
export declare type routerRequest = {
    path: string;
    body: any;
    socket: any;
    params?: any;
    splats?: any;
};
export interface Router {
    routes: Array<any>;
    routeMap: {};
    addRoute: (path: string, fn: any) => void;
    removeRoute: (path: string) => void;
    match: (pathname: string, startAt?: number) => matchedRoute | undefined;
}
export declare type packet = [string, any];
export declare type dataPacket = {
    data: any;
};
