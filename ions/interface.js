;

+
{ about:
    { it: "ionify.net user interface"
    , by: "Michael Lee, iskitz.com, @iskitz"
    , in: "San Jose, California, USA, Earth"
    , at: "2016.11.13-08...2015.10.23-07.00"
    },
  todo:
    [ "No scroll main view"
    , "vertical section list on left, carousel on right"
    , "Use text characters for ionify faces"
    , "Low-opacity Large Background face(s)"
    , "Small faces introduce concepts in carousel"
    , "Carousel auto-scrolls when idle, back to last chosen position when becoming active"
    ],


  id  : "interface",
  get : ["layout", "labels", "colors", "media"],
  then: "render",

  title: document.title = "+['o . o'];",

  activate:
    function activate () {
      //show +enable interaction
    },

  render:
    function render (get) {
      // apply layout, etc.
      // add to DOM but disabled
    },

  use:
    function use (data) {
      // fill fields with data
    }
}

;