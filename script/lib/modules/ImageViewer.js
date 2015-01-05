/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";



define(["ImageViewer"], function() {
    var Mustache = require('Mustache');
    var DesktopApp = require(['DesktopApp']);

    var ImageViewer = function(id, content){
        var obj = {
            TypeOfWindow: "image-viewer",
            ID: "close-button-" + id,
            IconURL: "https://openclipart.org/people/jhnri4/Images_icon.svg",
            Title: "Image Viewer",
            Content: content
        };

/*        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var rendered = Mustache.render(xhr.responseText, obj);
            var desktop = document.querySelector("#desktop");
            desktop.insertAdjacentHTML('beforeend', rendered);
            var closeIcon = document.querySelector(".window-close.close-button-" + id);
            closeIcon.addEventListener("click", function(e){
                console.log("rtst" + id);
                console.log(DesktopApp.imageWindowArray);
            e.preventDefault();
            })
        };
        xhr.open('GET', 'template/Window.template', true);
        xhr.send(null);*/

        $.get('template/Window.template', function(template) {
            var rendered = Mustache.render(template, obj);
            $('#desktop').append(rendered);
            var closeIcon = document.querySelector(".window-close.close-button-" + id);
            closeIcon.addEventListener("click", function(e){
                console.log("rtst" + id);
                console.log(DesktopApp.imageWindowArray);
                e.preventDefault();
            })
        });
    };
    return ImageViewer;
});