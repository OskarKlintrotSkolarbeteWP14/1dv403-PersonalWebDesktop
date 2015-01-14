/**
 * Created by IDE on 2015-01-14.
 */
/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["WindowCreator"], function() {
    var Mustache = require('Mustache');
    var RSSReader = require('RSSReader');
    var ImageViewer = require('ImageViewer');
    var MemoryApp = require('MemoryApp');


    var WindowCreator = function(app, title, id, content){

        console.log("I'm WindowCreator")
        var obj = {
            TypeOfWindow: app,
            WindowID: "window-" + id,
            CloseButtonID: "close-button-" + id,
            IconURL: "https://openclipart.org/people/jhnri4/Images-icon.svg",
            Title: title,
            Content: content
        };

        function setupWindow(template){
            //Render the window
            var rendered = Mustache.render(template, obj);
            var desktop = document.querySelector("#desktop");
            desktop.insertAdjacentHTML('beforeend', rendered);

            //Find elements
            var thisWindow = desktop.querySelector(".window.window-" + id);
            var closeIcon = desktop.querySelector(".window-close.close-button-" + id);
            var header = desktop.querySelector(".header-window-" + id);
            var main = desktop.querySelector("main.window-" + id);
            var footer = desktop.querySelector(".window-" + id + " footer");
            var loading = footer.querySelector(".loading");
            var desktopMain = document.querySelector("body");

            //Add events
            closeIcon.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("Closed window " + id);
                thisWindow.remove();
                //If the main is empty, the reset the background image
                if (desktopMain.innerHTML.indexOf("noscript>\n</main") > -1) {
                    document.styleSheets[0].cssRules[2].style.backgroundImage = "url(http://subtlepatterns.com/patterns/footer_lodyas.png)";
                }
            });

            //Hide window when clicking on the header
            header.addEventListener("click", function(){
                thisWindow.classList.toggle("minimize");
                main.classList.toggle("hidden");
                footer.classList.toggle("hidden");
            });

            if (app === "image-viewer") {
                console.log("I'm calling ImageViewer");
                ImageViewer(main, loading, id);
            } else if (app === "memory-app") {
                console.log("I'm calling MemoryApp");
                MemoryApp(id, 2,3,"game1");
            } else if (app === "rss-reader-DN") {
                console.log("I'm calling RSSReader");
                window.RSSReader(main, loading, id, "http://www.dn.se/m/rss/senaste-nytt");
            } else if (app === "rss-reader-AB") {
                console.log("I'm calling RSSReader");
                window.RSSReader(main, loading, id, "http://www.aftonbladet.se/rss.xml");
            }



        };

        function init() {
            var xhrTemplate = new XMLHttpRequest();
            xhrTemplate.open('GET', 'template/Window.template', true);
            xhrTemplate.send(null);
            xhrTemplate.onreadystatechange = function () {
                if (xhrTemplate.readyState === 4 && xhrTemplate.status === 200) {
                    setupWindow(xhrTemplate.responseText);
                }
            };
        };

        init();


        //An example of how to get the mustache template with jQuery, keeping this for personal references
        /*        $.get('template/Window.template', function(template) {
         var rendered = Mustache.render(template, obj);
         $('#desktop').append(rendered);
         var closeIcon = document.querySelector(".window-close.close-button-" + id);
         closeIcon.addEventListener("click", function(e){
         console.log("Window ID: " + id);
         console.log(DesktopApp.imageWindowArray);
         e.preventDefault();
         })
         });*/

    };

    return WindowCreator;
});