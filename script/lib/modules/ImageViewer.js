/**
 * Created by Oskar Klintrot on 2015-01-03.
 */
"use strict";

define(["ImageViewer"], function() {
    var Mustache = require('Mustache');

    var ImageViewer = function(main, loading, id){

        console.log("ImageViewer " + id + " here!");

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
            document.styleSheets[0].cssRules[24].style.maxWidth=maxThumbWidth + "px";
            document.styleSheets[0].cssRules[24].style.maxHeight=maxThumbHeight + "px";
            document.styleSheets[0].cssRules[25].style.width=maxThumbWidth + "px";
            document.styleSheets[0].cssRules[25].style.height=maxThumbHeight + "px";

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

    return ImageViewer;
});