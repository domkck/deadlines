/*global todomvc */var moduleService=function(e){return{get:function(t){e({method:"GET",url:"http://127.0.0.1:4567/modules"}).success(function(e,n,r,i){t(e)}).error(function(e,n,r,i){t([])})},post:function(t,n){e({method:"POST",url:"http://127.0.0.1:4567/modules",data:t}).success(function(e,t,r,i){n(e.module_model)}).error(function(e,t,r,i){console.log("Nay :(");n()})}}};todomvc.factory("moduleService",["$http",moduleService]);