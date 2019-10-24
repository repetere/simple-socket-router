import * as types from './types';
export declare const Router: types.Router;
/**
 * Catches all events on event emitter passed to the function
 * @param {Event Emitter} emitter - websocket/socket.io(client/server)/event emitter to intercept all incoming events
 * @param {Function} handler - socket.io like middleware (calls handler with packet and next)
 */
export declare function patchEmitter(emitter: types.socket, handler: types.handler): void;
/**
 * Returns socket.io like middleware function to handle incoming events based on their path
 * @param {Event emitter} options.socket - websocket/socket.io(client/server)/event emitter
 * @param {object} options.router - routes object
 * @see https://www.npmjs.com/package/routes
 * @return {function} router handler middleware function
 */
export declare function routerMiddleware({ socket, router, }: types.middlerwareOptions): (...args: any[]) => void;
/**
 * Responds to events based on their route and a router
 * @param {Event emitter} options.socket - websocket/socket.io(client/server)/event emitter
 * @param {object} options.router - routes object
 * @see https://www.npmjs.com/package/routes
 */
export declare function EventRouter({ socket, router, }: types.middlerwareOptions): void;
