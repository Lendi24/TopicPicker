///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///                                                 ///
///                   MAIN_CONFIG                   ///
///                                                 ///
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

class Config {
    static SPA = {
        rootElement : 'spa-root',
        routes : {
            "#/home":            { title: "",       html: "/pages/landing.html",  func: null                                          },
            "#/editor":          { title: "",       html: "/pages/lists.html",    func: ()=>{HtmlLoader.loadLists()     }             },
            "#/editor/item":     { title: "",       html: "/pages/editor.html",   func: ()=>{HtmlLoader.loadListEditor()}             },
        }        
    }
}
