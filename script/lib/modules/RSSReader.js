/**
 * Created by IDE on 2015-01-14.
 */

"use strict";

define(["RSSReader"], function() {

    var RSSReader = function(main, loading, id, url){

        console.log("RSSReader " + id + " here!");

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url='+escape(url), true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 2) {
                loading.classList.remove("hidden");
            }
            if (xhr.readyState === 4  && xhr.status === 200) {
                loading.classList.add("hidden");
                main.innerHTML = xhr.responseText;
            }
        };
    };

    return RSSReader;

});