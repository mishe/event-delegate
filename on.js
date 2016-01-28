(function () {
        

        function $(selector){
            return document.querySelectorAll(selector)||[];
        }


        NodeList.prototype.on = function (event,selector,fn) {
            var self=Array.prototype.slice.call(this);
            if(typeof(selector)==='function'){
                fn=selector;
                selector='';
            }
            if(!selector){
                return self.forEach(function() {
                    this.addEventListener(event, fn);
                });
            }
            return self.forEach(function() {
                var oldFn=fn;
                if(selector){
                   fn=function(e){
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
                this.addEventListener(event, fn);
            });
            return this;
        }
        window.$=$;
    }());
