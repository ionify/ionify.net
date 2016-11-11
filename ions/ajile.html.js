;

/*eslint-env browser */

+
{ id  : 'about.html.dom@ajile.net',
  what: "jsonXD Sensor: DOM for HTML",
  whom:
    { 'Mike Lee': ['creator'    , '@iskitz' , 'iskitz.com']
    , '..name..': ['contributor', '@twitter', 'web.site'  ]
    },
  when:
    { created: '2007.09.15.17.20-04.00.earth'
    , updated: '2015.02.07-08.00.earth'
    },
  more:
    [ 'http://ajile.net/about/dom/html'
    , 'http://about.ajile.net/LICENSE.TYPE.VERSION'
    ],
  todo:
    [ "Bugs"
    , "   id: Can't use 'net.ajile.dom.html' until id-to-path resolution is implemented"
    , "   Opera doesn't support document.createElement ('style')"
    , "      fix: Supports links + data URLs + document.write in older versions."
    , "Core"
    , "   Implement a use: method that overrides net.ajile.use|load"
    , "Nodes"
    , "   Convert jsonXD as:html items to HTML text"
    , "   makeDataURI: data:object && es5 && '+'+JSON.stringify (data) && text/javascript"
    , "   Integrate CSS library like jQuery for DOM manipulation"
    , "Visual"
    , "   Immediately show loading message + spinner + optional progress"
    , "   Immediately display content when ready"
    , "   Use .web file extension!"
    ]
}

+
{ id: 'html.dom@ajile.net'||'html.dom'||'net.ajile.dom.html',
  to:
    { all:
        [ 'addBody', 'addCSS', 'addElement', 'addLink', 'addScript', 'getDataURI'
        ]
    },

  addBody:
    function addBody (html)
    {   document.body.innerHTML += html
    },

  addCSS:
    function addCSS (css)
    {   var node = document.createElement ('style');

        if (node)
        {   node.innerHTML = css
        ;   document.head.appendChild (node)
        ;   return
        }

        var type    = 'text/css'
          , dataURI = this.getDataURI ({type:type, text:css, base64:false})
          ;
        this.addLink ({type:type, href:dataURI, rel:'stylesheet'});
    },//addCSS

  addElement:
    (function create$addElement ()
    {   var tag    = '<tag attributes>nodes<\/tag>'
          , tagRE  = (/tag/gi)
          , textRE = (/nodes/)
          ;
        function addElement (node) {
            if (!node && typeof node != 'object')
                return;

            var name = node.keys()[0]
              , html = tag.replace (tagRE, name)
              ;
        }
        return addElement;
    })(),

  addLink:
    function addLink (link)
    {   if (!link) return
    ;   var node = document.createElement ('link')
    ;   node.type = link.type
    ;   node.rel  = link.rel
    ;   node.href = link.href
    ;   document.head.appendChild (node)
    },

  addScript:
    function addScript (code)
    {   var script = document.createElement ('script')
    ;   script.innerHTML = code
    ;   document.head.appendChild (script)
    },

  getDataURI:
    function getDataURI (data)
    {   typeof data != 'object' && (data = {text:data});

        var type = data.type || 'text/plain'
          , text = data.text || ''
          , uri  = 'data:'+type
          ;

        if ((data.base64 || typeof data.base64 == 'undefined'))// && this.has.es3)
        {   uri += ';base64'
        ;   text = btoa (encodeURIComponent (escape (text)))
        }

        return uri + ',' + text;
    }//getDataURI

}//html.dom@ajile.net

;