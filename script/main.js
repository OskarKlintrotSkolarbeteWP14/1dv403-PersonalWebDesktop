/**
 * Created by Oskar Klintrot on 2015-01-04.
 */
"use strict";

require.config({
    paths: {
        //Libraries
        Require: "lib/require",
        jQuery: "lib/jquery-2.1.3",
        Mustache: "lib/mustache",

        //Modules
        ImageViewer: "lib/modules/ImageViewer",
        WebcamViewer: "lib/modules/WebcamViewer"
    }
});

require(["lib/modules/DesktopApp"]);
