/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["ImageViewer"], function() {
    var Mustache = require('Mustache');

    var ImageViewer = function(content){
        var obj = {
            TypeOfWindow: "image-viewer",
            IconURL: "https://openclipart.org/people/jhnri4/Images_icon.svg",
            Title: "Image Viewer",
            Content: content
        };

        $.get('template/Window.template', function(template) {
            var rendered = Mustache.render(template, obj);
            $('#desktop').append(rendered);
        });
    }
    return ImageViewer;
});