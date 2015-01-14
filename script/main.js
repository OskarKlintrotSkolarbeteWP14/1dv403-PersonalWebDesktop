/**
 * Created by Oskar Klintrot on 2015-01-04.
 */
"use strict";

require.config({
    baseUrl: 'script/lib',
    paths: {
        //Libraries
        Mustache: "mustache",
        Random: "random",

        //Modules
        DesktopApp: "modules/DesktopApp",
        ImageViewer: "modules/ImageViewer",
        MemoryApp: "modules/MemoryApp",
        RSSReader: "modules/RSSReader",
        WindowCreator: "modules/WindowCreator"
    }
});

require(["DesktopApp"]);
