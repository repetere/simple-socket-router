import RoutesModule from 'routes';

const Router = RoutesModule;

/**
 * Catches all events on event emitter passed to the function
 * @param {Event Emitter} emitter - websocket/socket.io(client/server)/event emitter to intercept all incoming events
 * @param {Function} handler - socket.io like middleware (calls handler with packet and next) 
 */
function patchEmitter(emitter, handler) {
  emitter._onevent = emitter.onevent;
  const next = () => { };
  // Replace the onevent function with a handler that captures all messages
  emitter.onevent = function (packet) {
    handler(packet.data, next);
    // DO NOT USE https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    // emitter._onevent.apply(emitter, Array.prototype.slice.call(arguments));
    const args = new Array(arguments.length);
    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    emitter._onevent.apply(emitter, args);
  };
}

/**
 * Returns socket.io like middleware function to handle incoming events based on their path
 * @param {Event emitter} options.socket - websocket/socket.io(client/server)/event emitter
 * @param {object} options.router - routes object 
 * @see https://www.npmjs.com/package/routes
 * @return {function} router handler middleware function
 */
function routerMiddleware({ socket, router,  }) {
  return function routeHandler(packet, next) {
    // console.log({ packet, socket });
    const [path, body,] = packet;
    const match = router.match(path);
    const req = { path, body, socket, };
    let cb = (data) => data;
    const res = {
      send(data) {
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
function EventRouter({ socket, router,  }) {
  if (socket.use) {
    socket.use(routerMiddleware({ socket, router,  }));
  } else {
    patchEmitter(socket, routerMiddleware({ socket, router,  }));
  }
}

export { Router, EventRouter };
