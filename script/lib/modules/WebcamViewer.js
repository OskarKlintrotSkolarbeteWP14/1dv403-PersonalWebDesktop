/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["WebcamViewer"], function() {
    var Mustache = require('Mustache');

    var WebcamViewer = function(){
        var obj = {
            TypeOfWindow: "webcam",
            IconURL: "https://openclipart.org/people/Ehecatl1138/Webcam.svg",
            Title: "Webcam Viewer",
            Content: "Självpoträtt!"
        };

        $.get('template/Window.template', function(template) {
            var rendered = Mustache.render(template, obj);
            $('#desktop').append(rendered);
        });
    }
    return WebcamViewer;
});