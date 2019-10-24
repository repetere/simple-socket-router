# simple-socket-router [![Coverage Status](https://coveralls.io/repos/github/repetere/simple-socket-router/badge.svg?branch=master)](https://coveralls.io/github/repetere/simple-socket-router?branch=master) [![Build Status](https://travis-ci.org/repetere/simple-socket-router.svg?branch=master)](https://travis-ci.org/repetere/simple-socket-router)
Simple express-like socket routing for websockets, event emitters and socket.io 

This is a simple way to avoid having to write a bunch of `event.on` handlers for larger applications. You can simply define routes and pass in your event emitter/websocket/socket.io(client|sever) and handle routes that way

## Example

This works for both socket servers and clients
```javascript
// SERVER CODE
import {Router,EventRouter} from 'simple-socket-router';
import Server from 'socket.io';
const ioServer = new Server();
// Router - npm module 'routes';
const router = new Router();
router.addRoute('/test/users', function(req, res){
  console.log('Got data from client Handler');
  res.send('ok');
});
router.addRoute('/account/:username', async (req, res)=>{
  console.log('In Account Handler');
  const user = await db.getUser(req.params.user);
  res.send({user);
});

ioServer.on('connection',socket=>{
  EventRouter({router,socket});
})
```

```javascript
// Client CODE
import {Router,EventRouter} from 'simple-socket-router';
import io from 'socket.io-client';
const socket = io('http://localhost');
// Router - npm module 'routes';
const router = new Router();
router.addRoute('/live/updates', function(req, res){
  console.log('Got message from server',{update:req.body});
});

socket.on('connect',()=>{
  EventRouter({router,socket});
})
```
