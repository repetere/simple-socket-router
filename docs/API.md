# Class

# Function

## `patchEmitter(emitter: Event Emitter, handler: Function)`

Catches all events on event emitter passed to the function

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| emitter | Event Emitter |  | websocket/socket.io(client/server)/event emitter to intercept all incoming events |
| handler | Function |  | socket.io like middleware (calls handler with packet and next) |

## `routerMiddleware(options.socket: Event emitter, options.router: object): function`

Returns socket.io like middleware function to handle incoming events based on their path

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options.socket | Event emitter |  | websocket/socket.io(client/server)/event emitter |
| options.router | object |  | routes object |

## `EventRouter(options.socket: Event emitter, options.router: object)`

Responds to events based on their route and a router

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options.socket | Event emitter |  | websocket/socket.io(client/server)/event emitter |
| options.router | object |  | routes object |