/**
 * Created by Oskar Klintrot on 2015-01-04.
 */
"use strict";

require.config({
    baseUrl: 'script/lib',
    paths: {
        //Libraries
        Mustache: "mustache",

        //Modules
        DesktopApp: "modules/DesktopApp",
        ImageViewer: "modules/ImageViewer",
        WebcamViewer: "modules/WebcamViewer"
    }
});

require(["DesktopApp"]);
