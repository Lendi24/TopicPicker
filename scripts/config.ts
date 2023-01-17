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
            "#/editor/item/del": { title: "",       html: "/pages/remover.html",  func: ()=>{HtmlLoader.loadItemRemover()}            },

            "#/generate":        { title: "",       html: "/pages/generate.html", func: ()=>{HtmlLoader.loadPicker()}                 },
        }        
    }

    static GeneratorSettings = {
        nrOfOrganisers : 2,

        cooldownForPeople : 5,
        cooldownForTopics : 0,
    }
}
