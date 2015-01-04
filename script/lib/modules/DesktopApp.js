/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(
    [
        "Mustache",
        "jQuery",
        "ImageViewer",
        "WebcamViewer"
    ],
    function(Mustache, jQuery, ImageViewer, WebcamViewer) {

    var ImageViewerWindow = new ImageViewer("test");
    var ImageViewerWindow2 = new ImageViewer("hello world");
    var WebcamViewerWindow = new WebcamViewer();

});