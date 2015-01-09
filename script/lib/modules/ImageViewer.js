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

        var setupWindow = function(template){
            //Render the window
            var rendered = Mustache.render(template, obj);
            var desktop = document.querySelector("#desktop");
            desktop.insertAdjacentHTML('beforeend', rendered);

            //Find elements
            var thisWindow = desktop.querySelector(".window.window-" + id);
            var closeIcon = desktop.querySelector(".window-close.close-button-" + id);
            var header = desktop.querySelector(".header-window-" + id);
            var main = desktop.querySelector(".window-content main");
            var footer = desktop.querySelector(".window-" + id + " footer");
            var loading = footer.querySelector(".loading");

            //Add events
            closeIcon.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("rtst" + id);
                thisWindow.remove();
            });

            header.addEventListener("click", function(){
                main.classList.toggle("hidden");
                footer.classList.toggle("hidden");
            });

            loadImageViewerApp(loading);
        };

        var loadImageViewerApp = function(loading){
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
                    renderImageViewerApp(imageArray);
                }
            };
        };

        var renderImageViewerApp = function (jsonArrayFromServer) {
            console.log(jsonArrayFromServer);

            var i = 0;
            var widthThumbArray = [];
            var maxThumbWidth = undefined;
            var heightThumbArray = [];
            var maxThumbHeight = undefined;
            var numberOfImages = jsonArrayFromServer.length;
            var thumbURL = [];
            var imgURL = [];

            //Save the data from server
            for(i = 0; i < jsonArrayFromServer.length; i++) {
                widthThumbArray[i] = jsonArrayFromServer[i].thumbWidth;
                heightThumbArray[i] = jsonArrayFromServer[i].thumbHeight;
                thumbURL[i] = jsonArrayFromServer[i].thumbURL;
                imgURL[i] = jsonArrayFromServer[i].URL;
            };

            //Max and min
            maxThumbWidth = Math.max.apply(null, widthThumbArray);
            maxThumbHeight = Math.max.apply(null, heightThumbArray);
            console.log(maxThumbWidth);
            console.log(maxThumbHeight);

        };

        var init = function () {
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

/*        $.get('template/Window.template', function(template) {
            var rendered = Mustache.render(template, obj);
            $('#desktop').append(rendered);
            var closeIcon = document.querySelector(".window-close.close-button-" + id);
            closeIcon.addEventListener("click", function(e){
                console.log("rtst" + id);
                console.log(DesktopApp.imageWindowArray);
                e.preventDefault();
            })
        });*/
    };
    return ImageViewer;
});