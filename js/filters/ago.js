app.filter(
  "ago",
  function($filter) {
    return function(delta) {
      if(delta==null)
        return "";
      //var delta = Date.now() - date;
      delta/=1000;
      if(delta<10)
        return "seconds ago";
      if(delta<60)
        return Math.floor(delta/10)*10+" second"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=60;
      if(delta<60)
        return Math.floor(delta)+" minute"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=60;
      if(delta<24)
        return Math.floor(delta)+" hour"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=24;
      if(delta<7)
        return Math.floor(delta)+" day"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=7;
      if(delta<4)
        return Math.floor(delta)+" week"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=4;
      if(delta<12)
        return Math.floor(delta)+" month"+((Math.floor(delta)>1)?("s"):(""))+" ago";
      delta/=12;
        return Math.floor(delta)+" year"+((Math.floor(delta)>1)?("s"):(""))+" ago";
    }
  }
);
