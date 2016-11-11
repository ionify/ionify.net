;

+
{ about:
    { it: "ionify: implicit object notation interpreted for you"
    , by: "Michael Lee, @iskitz, iskitz.com"
    , in: "San Jose, California, USA, Earth"
    , at: "2015.10.23...12.06-07.00"
    },

  todo:
    [ "Enable defining a context grammar:"
          +{ id :"on",
             api:
                [ {on: "value"}
                , {do: "value"}
                , {go: "value"}
                , {"?":"value"}
                ]
           }
          +{do:"action", before:"other", always:true, when:function boolean(){}}

    , "Enable id:['list', 'of', 'ids']"
    ],


  id: "ionify",
  as: ["language"],    // a language engine ion


  valueOf:
    function valueOf () {
        this.activate();
    },


  activate:
    function activate () {
        this.ions.ionify  = this;
        this.undo.Object  = {valueOf: Object.prototype.valueOf};
        Object.prototype.valueOf = this.on ();
    },


  api:
    function onAPI (ion) {
        var api   = ion.api
          , id    = ion.id
          , ions  = this.ions
          , words = this.words
          , word
          ;

        api.constructor != Array && (api = [api]);
        ions [id] = ion;

        for (var next=0, last=api.length; next < last; next++) {
            word = api [next];
            words [word] = id;
        }
    },


  deactivate:
    function deactivate () {
        Object.prototype.valueOf = this.undo.Object.valueOf;
    },


  on:
    function on$ () {
        var ionify  = this
          , ions    = ionify.ions
          , words   = ionify.words
          ;

        function on () {
            var ion, word
              ;
            for (word in words) {
                if (this [word] || word in this) {
                    ion = ions [words [word]];
                    ion [word] (this);
                }
            }
        }

        return (ionify.on = on);
    },


  ions:
    { ionify: null
    },

  undo:
    {// all things that may need to be restored
    },

  words:
    { api:"ionify"
    }
}
;