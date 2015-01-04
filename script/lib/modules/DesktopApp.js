/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["Mustache", "jQuery", "Require", "ImageViewer", "WebcamViewer"], function(Mustache, jQuery, Require, ImageViewer, WebcamViewer) {

    var ImageViewerWindow = new ImageViewer("test");
    var ImageViewerWindow2 = new ImageViewer("hello world");
    var WebcamViewerWindow = new WebcamViewer();

});