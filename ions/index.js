;

+
{ about:
    { is: "ionify.net"
    , by: "Michael Lee, iskitz.com, @iskitz"
    , in: "San Jose, California, USA, Earth"
    , at: "2015.10.23...25-07.00"
    },

  todo:
    [ "Create/find a module that can modify the DOM."
    ],


  id  : "ionify.net",
  get : ["interface", "data"],
  then: ["fill", "show"],


  fill:
    function fill (get) {
        if (!get) return console.log ("todo.ionify: pass gets to thens!");
        var data = get.data;
        get.interface.use (data);
    },


  show:
    function show (get) {
        if (!get) return console.log ("todo.ionify: pass gets to thens!");
        get.interface.activate();
    }
}//+ionify.net

;