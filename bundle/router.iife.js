var els=function(t){"use strict";var e=function(t){var e,n=[];return t instanceof RegExp?(e=t,t.toString()):(e=r(t,n),t),{re:e,src:t.toString(),keys:n}},r=function(t,e){return t=t.concat("/?").replace(/\/\(/g,"(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g,function(t,r,n,o,s,u){return"*"===t?(e.push(void 0),t):(e.push(o),r=r||"",(u?"":r)+"(?:"+(u?r:"")+(n||"")+(s||"([^/]+?)")+")"+(u||""))}).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.*)"),new RegExp("^"+t+"$","i")},n=function(t,e,r){for(var n,o=r||0,s=t.length;o<s;++o){var u=t[o],a=u.re,i=u.keys,c=[],h={};if(n=e.match(a)){var p=1;for(s=n.length;p<s;++p){var f=i[p-1],l="string"==typeof n[p]?unescape(n[p]):n[p];f?h[f]=l:c.push(l)}return{params:h,splats:c,route:u.src,next:o+1}}}},o=function(){return{routes:[],routeMap:{},addRoute:function(t,r){if(!t)throw new Error(" route requires a path");if(!r)throw new Error(" route "+t.toString()+" requires a callback");if(this.routeMap[t])throw new Error("path is already defined: "+t);var n=e(t);n.fn=r,this.routes.push(n),this.routeMap[t]=r},removeRoute:function(t){if(!t)throw new Error(" route requires a path");if(!this.routeMap[t])throw new Error("path does not exist: "+t);for(var e=[],r=0;r<this.routes.length;r++){var n=this.routes[r];n.src!==t&&e.push(n)}this.routes=e,delete this.routeMap[t]},match:function(t,e){var r=n(this.routes,t,e);return r&&(r.fn=this.routeMap[r.route],r.next=this.match.bind(this,t,r.next)),r}}};o.Route=e,o.pathToRegExp=r,o.match=n,o.Router=o;const s=o;function u({socket:t,router:e}){return function(r,n){const[o,s]=r,u=e.match(o),a={path:o,body:s,socket:t};let i=t=>t;const c={send(e){try{t.emit(o,i(e)),i=null}catch(e){t.emit("error",new Error("Response already sent"))}}};u&&(a.params=u.params,a.splats=u.splats,u.fn(a,c,u)),n()}}return t.Router=s,t.EventRouter=function({socket:t,router:e}){t.use?t.use(u({socket:t,router:e})):function(t,e){t._onevent=t.onevent;const r=()=>{};t.onevent=function(n){e(n.data,r);const o=new Array(arguments.length);for(var s=0;s<o.length;++s)o[s]=arguments[s];t._onevent&&t._onevent.apply(t,o)}}(t,u({socket:t,router:e}))},t}({});
