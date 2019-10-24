// @ts-ignore
import RoutesModule from 'routes/index';
import * as types from './types';
export const Router:types.Router = RoutesModule;

/**
 * Catches all events on event emitter passed to the function
 * @param {Event Emitter} emitter - websocket/socket.io(client/server)/event emitter to intercept all incoming events
 * @param {Function} handler - socket.io like middleware (calls handler with packet and next) 
 */
export function patchEmitter(emitter:types.socket, handler:types.handler) {
  emitter._onevent = emitter.onevent;
  const next = () => { };
  // Replace the onevent function with a handler that captures all messages
  emitter.onevent = function (packet: types.dataPacket) {
    handler(packet.data, next);
    // DO NOT USE https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    // emitter._onevent.apply(emitter, Array.prototype.slice.call(arguments));
    const args = new Array(arguments.length);
    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    if(emitter._onevent) emitter._onevent.apply(emitter, args);
  };
}

/**
 * Returns socket.io like middleware function to handle incoming events based on their path
 * @param {Event emitter} options.socket - websocket/socket.io(client/server)/event emitter
 * @param {object} options.router - routes object 
 * @see https://www.npmjs.com/package/routes
 * @return {function} router handler middleware function
 */
export function routerMiddleware({ socket, router,  }:types.middlerwareOptions):(...args: any[])=>void {
  return function routeHandler(packet:types.packet, next:()=>void) {
    // console.log({ packet, socket });
    const [path, body,] = packet;
    const match = router.match(path);
    const req:types.routerRequest = { path, body, socket, };
    let cb:any = (data:any) => data;
    const res = {
      send(data:any) {
        try {
          socket.emit(path, cb(data));
          cb = null;
        } catch (e) {
          socket.emit('error', new Error('Response already sent'));
        }
      },
    };
    if (match) {
      req.params = match.params;
      req.splats = match.splats;
      match.fn(req, res, match);
    }
    next();
  };
}

/**
 * Responds to events based on their route and a router
 * @param {Event emitter} options.socket - websocket/socket.io(client/server)/event emitter
 * @param {object} options.router - routes object 
 * @see https://www.npmjs.com/package/routes
 */
export function EventRouter({ socket, router,  }:types.middlerwareOptions) {
  if (socket.use) {
    socket.use(routerMiddleware({ socket, router,  }));
  } else {
    patchEmitter(socket, routerMiddleware({ socket, router,  }));
  }
}