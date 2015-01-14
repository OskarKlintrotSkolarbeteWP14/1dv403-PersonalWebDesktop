/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(
    [
        "DesktopApp",
        "Mustache",
        "ImageViewer",
        "MemoryApp",
        "WindowCreator"
    ],
    function(DesktopApp, Mustache, ImageViewer, MemoryApp, WindowCreator) {
        var AppArray = [];
        var imageIcon = document.querySelector("#imageIcon");
        var memoryIcon = document.querySelector("#memoryIcon");

        imageIcon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("image-viewer", "Image Viewer", AppArray.length, "Fetching images from external source...");
        });

        memoryIcon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("memory-app", "Memory Game", AppArray.length, "Game on!");
        });
});