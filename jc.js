var preurl="";
var controller=null;
var gpc=false;
var gp;
var keys={w:false,a:false,s:false,d:false};
function wasdinput()  {
  var action;
  if(keys.w)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"w",
    code:"KeyW",
    keyCode:87,
    charCode:87,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(keys.a)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"a",
    code:"KeyA",
    keyCode:65,
    charCode:65,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(keys.s)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"s",
    code:"KeyS",
    keyCode:83,
    charCode:83,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(keys.d)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"d",
    code:"KeyD",
    keyCode:68,
    charCode:68,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(gp.buttons[0].pressed)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:" ",
    code:"Space",
    keyCode:32,
    charCode:32,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(gp.buttons[1].pressed)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"f",
    code:"KeyF",
    keyCode:70,
    charCode:70,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(gp.buttons[2].pressed)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"r",
    code:"KeyR",
    keyCode:82,
    charCode:82,
    bubbles:true
  });
  document.dispatchEvent(event);
  if(gp.buttons[11].pressed)  {
    action="keydown";
  } else  {
    action="keyup";
  }
  var event=new KeyboardEvent(action,{
    key:"Shift",
    code:"ShiftLeft",
    keyCode:16,
    charCode:16,
    bubbles:true
  });
  document.dispatchEvent(event);
}
function controllerloop()  {
  var x1=gp.axes[0];
  var y1=gp.axes[1];
  var x2=gp.axes[2];
  var y2=gp.axes[3];
  keys.w=y1<-0.3;
  keys.a=x1<-0.3;
  keys.s=y1>0.3;
  keys.d=x1>0.3;
  wasdinput();
  var m=Math.sqrt(x2*x2+y2*y2);
  var deadzone=0.2;
  if(m<deadzone)  {
    x2=0;
    y2=0;
  } else{
    var over=m-deadzone;
    var nover=over/(1-deadzone);
    var nx=x2/m;
    var ny=y2/m;
    x2=nx*nover;
    y2=ny*nover;
  }
  var event=new MouseEvent("mousemove",{
    movementX:x2*20,
    movementY:y2*20,
    view:window,
    cancelable:true,
    bubbles:true
  });
  document.getElementById("gameCanvas").dispatchEvent(event);
  var action;
  if(gp.buttons[7].value>0.8) {
    action="mousedown";
  } else  {
    action="mouseup";
  }
  var event=new MouseEvent(action,{
    button:0,
    view:window,
    cancelable:true,
    bubbles:true
  });
  document.getElementById("gameCanvas").dispatchEvent(event);
  if(gp.buttons[6].value>0.8) {
    action="mousedown";
  } else  {
    action="mouseup";
  }
  var event=new MouseEvent(action,{
    button:2,
    view:window,
    cancelable:true,
    bubbles:true
  });
  document.getElementById("gameCanvas").dispatchEvent(event);
}
function initcontroller()    {
  if(gpc) {
    gp=navigator.getGamepads()[controller.gamepad.index];
    setInterval(controllerloop,0);
  } else{
    setTimeout(initcontroller,10);
  }
}
function check()    {
  if(location.href.indexOf("play?game=")>=0)  {
    if(preurl!=location.href)   {
      initcontroller();
      preurl=location.href;
    }
  }
}
check();
var observer=new MutationObserver(function(mutations)   {
  check();
});
window.addEventListener("gamepadconnected",function(e){
  controller=e;
  gpc=true;
});
var config={attributes:true,childList:true,subtree:true};
observer.observe(document,config);