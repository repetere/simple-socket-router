import { Router, EventRouter, routerMiddleware,patchEmitter, } from './router';
import { expect, } from 'chai';
import { EventEmitter } from 'events';
const mockCallback = jest.fn(x => {
  // console.log('jest func arguments', arguments);
  return x;
});

const router = new Router();
router.addRoute("/articles/:title?", mockCallback);
describe('Simple Socket Router', () => {
  describe('Router', () => {
    it('should match routes', () => {
      const articleRoute = router.match("/articles");
      expect(articleRoute.params.title).to.eql(undefined);
      const articleRouteTitle = router.match("/articles/never-gonna-let-you-down");
      expect(articleRouteTitle.params.title).to.eql('never-gonna-let-you-down');
      // console.log(router.match("/posts/show/1.json"));
    });
  });
  describe('EventRouter', () => {
    describe('routerMiddleware',  () => {
      it('should handle matched route callbacks', done => {
        try {
          const pathname = "/posts/show/1.json";
          const actionCallback = jest.fn((req, res, match) => {
            res.send(true);
          });
          router.addRoute("/:controller/:action/:id.:format?", actionCallback);
    
          const socket = new EventEmitter();
          socket.on(pathname, (data) => {
            expect(data).to.be.ok;
            done();
          });
          const handler = routerMiddleware({ socket, router });
          const packet = [pathname, { author: 'bob', profile: 'n/a' }];
          const next = jest.fn(x => x);
          handler(packet, next);
          expect(actionCallback.mock.calls.length).to.eql(1);
          expect(next.mock.calls.length).to.eql(1);
         
        } catch (e) {
          done(e);
        }
      });
    });
    describe('patchEmitter',  () => {
      it('should handle matched route callbacks', done => {
        try {
          const pathname = "/data/packet/20.json";
          const actionCallback = jest.fn((req, res, match) => {
            res.send(true);
          });
          router.addRoute("/data/:call/:id.:format?", actionCallback);
    
          const socket = new EventEmitter();
          socket.on(pathname, (data) => {
            expect(data).to.be.ok;
            done();
          });
          const handler = routerMiddleware({ socket, router });
          const packet = {
            data: [pathname, { author: 'bob', profile: 'n/a' }],
          };
          patchEmitter(socket, handler);
          socket.onevent(packet);
         
        } catch (e) {
          done(e);
        }
      });
    });
    describe('EventRouter',  () => {
      it('should handle matched route callbacks', done => {
        try {
          const socket = new EventEmitter();
          EventRouter({ socket, router });
          expect(socket.onevent).to.be.a('function');
          done();
         
        } catch (e) {
          done(e);
        }
      });
    });
  });
})