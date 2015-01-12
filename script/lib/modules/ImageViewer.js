/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["ImageViewer"], function() {
    var Mustache = require('Mustache');
    //var DesktopApp = require(['DesktopApp']);

    var ImageViewer = function(id, content){

        var obj = {
            TypeOfWindow: "image-viewer",
            WindowID: "window-" + id,
            CloseButtonID: "close-button-" + id,
            IconURL: "https://openclipart.org/people/jhnri4/Images-icon.svg",
            Title: "Image Viewer",
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

            loadImageViewerApp(main, loading);
        };

        function loadImageViewerApp(main, loading){
            var imageArray;

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/', true);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 2) {
                    loading.classList.remove("hidden");
                }
                if (xhr.readyState === 4  && xhr.status === 200) {
                    loading.classList.add("hidden");
                    imageArray = JSON.parse(xhr.responseText);
                    renderImageViewerApp(main, imageArray);
                }
            };
        };

        function renderImageViewerApp(main, jsonArrayFromServer) {
            //console.log(jsonArrayFromServer);

            var i;
            var j;
            var k;
            var widthThumbArray = [];
            var maxThumbWidth;
            var heightThumbArray = [];
            var maxThumbHeight;
            var thumbURL = [];
            var imgURL = [];
            var aArray = [];
            var imgArray = [];

            //Save the data from server
            for(i = 0; i < jsonArrayFromServer.length; i++) {
                widthThumbArray[i] = jsonArrayFromServer[i].thumbWidth;
                heightThumbArray[i] = jsonArrayFromServer[i].thumbHeight;
                thumbURL[i] = jsonArrayFromServer[i].thumbURL;
                imgURL[i] = jsonArrayFromServer[i].URL;
            }
            //Max and min
            maxThumbWidth = Math.max.apply(null, widthThumbArray);
            maxThumbHeight = Math.max.apply(null, heightThumbArray);
            document.styleSheets[0].cssRules[23].style.width=maxThumbWidth + "px";
            document.styleSheets[0].cssRules[23].style.height=maxThumbHeight + "px";

            //Function for setting event on a-tag when rendering the images
            function onClickFunction(j){
                aArray[j].addEventListener("click", function(e){
                    e.preventDefault();
                    document.styleSheets[0].cssRules[2].style.backgroundImage = "url(" + jsonArrayFromServer[j].URL + ")";
                });
            }

            //Render the images
            for (j = 0; j < jsonArrayFromServer.length; j++) {
                aArray[j] = document.createElement("a");
                imgArray[j] = document.createElement("img");
                aArray[j].href = "#";
                onClickFunction(j);
                imgArray[j].src = jsonArrayFromServer[j].thumbURL;
                aArray[j].appendChild(imgArray[j]);
            }

            //Clear the main
            main.innerHTML = "";

            //Append the images to the main in the window
            for (k = 0; k < aArray.length; k++) {
                main.appendChild(aArray[k]);
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

    return ImageViewer;
});