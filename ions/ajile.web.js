;

+
{ re:
    { is: "ajile.web: a judiciously ionic linguistic engine, for the web"
    , by: "Michael Lee, iskitz.net, @iskitz"
    , in: "San Jose, California, USA, Earth"
    , at: "2015.10.23...12.07-08.00"
    },

  todo:
    [ "Add 'on' action to support sharing 'gets'"
    , "Use 'on' to observe and share 'get's in a single object to all 'then' handlers"
    , "Add auto-loading (aka bootstrap) option to load ion"
    ],


  id  : "ajile",
  is  : ["loader"],             // ion type that can be found and tested for an expected api
  api : ["get", "load", "on"],  // api: shared data + functionality


  valueOf:
    function ajile () {
        this.activate();
    },


  activate:
    function activate () {
        var location = this.location;

        switch (true) {
            case !activate.done:
                activate.done = true;
                this.senseLocation ();
                this.get ({get: location.engine, then: {activate:this}});
                break;

            case activate.done:                    //td: replace with +{on:"ajile", do:...}
                this.valueOf = Object.prototype.valueOf;
                this + {get: [location.ions, location.start]};
                activate.done = false;
                break;
        } //switch
    }, //activate()


  get:
    function onGet (ion) {
        var next  = ion.get
          , last  = next.length
          , thing = 0
          , path
          , jess
          ;

        next.constructor != Array && (next = [next]) && (last = 1);

        for (var then=ion.then; thing < last; ++thing) {
            path = next [thing];
            jess = {url:path};

            if (thing == last - 1) {              //hack: Change to +{on:ion.get, load:ion.then}
                if (typeof then == "string") {
                    jess.then         = {};
                    jess.then [then]  = ion;
                }
                else {
                    jess.then = then;
                    jess.jem  = ion;
                }
            }

            this.load (jess);
        } //for
    }, //get()


  load:
    function load (ion) {
        +
        [ "todo: check for 'as:type'"
        , "todo: check for file extension if no 'as:type' found"
        , "todo: call type-specific loader, i.e. script, css, image, etc."
        ]
        ;

        ion && (!ion.as || (ion.as == "js")) && this.loadScript (ion);
    },


  loadScript:
    function loadScript (ion) {
        (typeof ion != "object") && (ion = {url:ion});

        var document      = this.document
          , url           = ion.url
          , then          = ion.then
          , script        = document.createElement ("script")
          ; script.async  = !!ion.async
          ; script.defer  = !!ion.defer
          ; script.type   = this.TYPES [ion.as]
          ;

        switch (true) {
            case (typeof then == "function"):
                script.onload = function onload () {
                    ion.then();
                };
                break;

            case (then && then.constructor == Array):
                script.onload = function onload () {
                    var tLast = then.length
                      , t     = -1
                      ; ion   = ion.jem
                      ;
                    while (++t < tLast) ion [then [t]] ();
                };
                break;

            case (typeof then == "object"):
                script.onload = function onload () {
                    for (var method in then) {
                        then [method] [method] ();
                    }
                };
        }//switch

        !this.MATCH.PATH.JS.test (url) && (url += ".js");

        script.src  = this.MATCH.URL.PROTOCOL.test (url)
                          ? url
                          : this.location.path + "./" + url
                          ;

        document.head.appendChild (script);
    },


  on:
    function onOn (ion) {
    },


  senseLocation:
    function senseLocation () {
        var document = this.document
          , script
          ;

        switch (true) {
            case !document:
                break;

            case !! document.currentScript:
                script = document.currentScript;
                break;

            case typeof document.querySelector == "function":
                script = 'script[src*="/ajile.web."], script[src*="/net.ajile.web."]';
                script = document.querySelector (script);
                break;

            case typeof document.getElementsByTagName == "function":
                script = document.getElementsByTagName ("script");
                script && (script = script [script.length - 1]);
                break;

            case !! document.scripts:
                script = document.scripts [document.scripts.length - 1];
                break;
        }//switch

        if (!script) return;

        var MATCH     = this.MATCH
          , location  = this.location
          , url
          ;
        location.ajile  = url = script.src || "./";
        location.path   = url.substring (0, url.search (MATCH.PATH.AJILE) + 1);
        location.query  = url.substring (0, url.search (MATCH.URL.QUERY));
    }, //senseLocation()


  LOADERS:
    { loadScript: "ajile"
    },
  TYPES:
    { css       : "text/css"
    , js        : "text/javascript"
    , undefined : "text/javascript"
    },


  MATCH:
    { PATH:
        { AJILE   : (/\W(net\.ajile\.web|ajile\.web)/)
        , IONS    : (/ions=?(local|remote|both)?/i)
        , JS      : (/\.js$/)
        , PARENT  : (/(.*\/)[^\/]+/)
        , RELATIVE: (/(\/\.\/)|(\/[^\/]*\/\.\.\/)/)
        },

      URL:
        { PATH    : (/(.*\/)[^\/]+/)
        , PROTOCOL: (/^(.+:)?\/\//)
        , QUERY   : (/\?/)
        }
    },


  document: this && this.document,

  location:
    { engine: "ionify"
    , ajile : null
    , ions  : "ions"
    , path  : null
    , query : null
    , start : "index"
    }

}//+ajile

;