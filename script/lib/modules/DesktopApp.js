/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(
    [
        "DesktopApp",
        "Mustache",
        "ImageViewer"
    ],
    function(DesktopApp, Mustache, ImageViewer) {
        var imageWindowArray = [];
        var imageIcon = document.querySelector("#imageIcon");

        imageIcon.addEventListener("click", function (e) {
            e.preventDefault();
            imageWindowArray[imageWindowArray.length] = new ImageViewer(imageWindowArray.length, "Fetching images from external source...");
        });
});