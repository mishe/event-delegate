(function () {
        function $(selector){
            return document.querySelectorAll(selector)||[];
        }

        function uniqID(string){
            string = string || '';
            return string + Math.random().toString(36).substr(2, 10);
        }

        function evalDateset(old,nd){
            if(old){
                return old+'|'+nd;
            }else{
                return nd;
            }
        }


        NodeList.prototype.on = function (event,selector,fn) {
            var self=Array.prototype.slice.call(this),eid=uniqID();
            window[eid]=fn;
            console.log(eid);

            if(typeof(selector)==='function'){
                fn=selector;
                selector='';
            }
            if(!selector){
                return self.forEach(function(el) {
                    el.dataset[event]=evalDateset(el.dataset[event],eid);
                    console.log(el.dataset[event]);
                    el.addEventListener(event, window[eid]);
                });
            }
            return self.forEach(function(el) {
                var oldFn=fn;
                if(selector){
                    window[eid]=function(e){
                       var els=$(selector),
                           len=els.length,
                           obj= e.target,
                           match;
                       for(var i=0;i<len;i++){
                           if(obj.matches(selector)){
                               oldFn();
                               e.stopPropagation();
                               break;
                           } else if(match=obj.closest(selector)){
                               for(var i=0;i<self.length;i++){
                                   if(self[i].contains(match)){
                                       oldFn();
                                       e.stopPropagation();
                                       break;
                                   }
                               }
                           }
                       }
                   }
                }
                el.dataset[event]=evalDateset(el.dataset[event],eid);
                console.log(el.dataset[event]);
                el.addEventListener(event, window[eid]);
            });
            return this;
        }
        NodeList.prototype.off=function(event,handle){
            var self=Array.prototype.slice.call(this);
            self.forEach(function(el){
                if(!event){
                    for(var k in el.dataset){
                        handle = el.dataset[k].split('|');
                        for (var i = 0; i < handle.length; i++)
                            el.removeEventListener(k, window[handle[i]]);
                    }
                }else {
                    if(handle){
                        el.removeEventListener(event, handle);
                    }else {
                        handle = el.dataset[event].split('|');
                        for (var i = 0; i < handle.length; i++)
                            el.removeEventListener(event, window[handle[i]]);
                    }
                }

            })
        }
        window.$=$;
}());
