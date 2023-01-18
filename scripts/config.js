"use strict";
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///                                                 ///
///                   MAIN_CONFIG                   ///
///                                                 ///
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
class Config {
}
Config.SPA = {
    rootElement: 'spa-root',
    routes: {
        "#/home": { title: "", html: "/pages/landing.html", func: null },
        "#/editor": { title: "", html: "/pages/lists.html", func: () => { HtmlLoader.loadLists(); } },
        "#/editor/item": { title: "", html: "/pages/editor.html", func: () => { HtmlLoader.loadListEditor(); } },
        "#/generate": { title: "", html: "/pages/generate.html", func: () => { HtmlLoader.loadPicker(); } },
    }
};
Config.GeneratorSettings = {
    nrOfOrganisers: 2,
    cooldownForPeople: 5,
    cooldownForTopics: 0,
};
