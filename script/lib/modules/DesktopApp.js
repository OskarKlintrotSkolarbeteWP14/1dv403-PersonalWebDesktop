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
        "WindowCreator",
        "RSSReader"
    ],
    function(DesktopApp, Mustache, ImageViewer, MemoryApp,  WindowCreator, RSSReader) {
        var AppArray = [];
        var imageIcon = document.querySelector("#imageIcon");
        var memoryIcon = document.querySelector("#memoryIcon");
        var rss1Icon = document.querySelector("#rss1Icon");
        var rss2Icon = document.querySelector("#rss2Icon");

        imageIcon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("image-viewer", "Image Viewer", AppArray.length, "Fetching images from external source...");
        });

        memoryIcon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("memory-app", "Memory Game", AppArray.length, "Game on!");
        });

        rss1Icon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("rss-reader-DN", "RSS Reader", AppArray.length, "Fetching RSS Feed from external source...");
        });

        rss2Icon.addEventListener("click", function (e) {
            e.preventDefault();
            AppArray[AppArray.length] = new WindowCreator("rss-reader-AB", "RSS Reader", AppArray.length, "Fetching RSS Feed from external source...");
        });
});