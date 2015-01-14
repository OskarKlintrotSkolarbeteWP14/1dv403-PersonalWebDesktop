/**
 * Created by IDE on 2015-01-14.
 */
"use strict";

define(["MemoryApp"], function() {
    var RandomGenerator = require(['Random']);

    function MemoryApp(id, rows, cols, game){

        this.getRows = function() {
            return rows;
        };

        this.setRows = function(_rows) {
            rows = _rows;
        };

        this.getCols = function() {
            return cols;
        };

        this.setCols = function(_cols) {
            cols = _cols;
        };

        this.getGame = function() {
            return "#" + game;
        };

        this.setGame = function(_game) {
            game = _game;
        };

        this.Play = function() {

            var randomArray = [],

                firstBrick = [],

                secondBrick = [],

                solvedBricks = [],

                numberOfTries = 0,

                correctBricks = 0,

                numberOfBricks = null,

                div,

                that = this,

                rows = this.getRows(),
                cols = this.getCols(),
                game = this.getGame();

            //Set number of bricks
            numberOfBricks = rows * cols;

            //Get an array with random numbers
            randomArray = RandomGenerator.getPictureArray(rows, cols);
            for (var i = 0; i < randomArray.length; i++) {
                if (randomArray[i] === 0) {
                    throw new Error("Ett memory måste bestå av ett jämnt antal brickor!");
                }
            }


            var renderMemory = function(rows, cols, game){

                //Find where to put the table containing the memory
                var divWrap = document.querySelector("#games");

                var gameDivId = game.replace("#", '');

                var divMemory = document.createElement("div");
                divMemory.className = "memory";
                divMemory.id = gameDivId;

                //Create tags
                var p = document.createElement("p");
                var div = document.createElement("div");
                var table = document.createElement("table");
                var tbody = document.createElement("tbody");
                var footer = document.createElement("footer");

                //Display the number of the game
                var games = ["Första", "Andra", "Tredje", "Fjärde", "Femte", "Sjätte", "Sjunde", "Åttonde", "Nionde", "Tionde"];
                var gameNumber = parseInt(game.replace("#game", ''));
                p.innerHTML = games[gameNumber-1] + " spelet";


                //Arrays to be used for the table
                var tableContentArray = [];
                var aArray = [];
                var imgArray = [];

                //Create the table
                for (var i = 0; i < rows; i++) {
                    tableContentArray[i] = document.createElement("tr");
                    imgArray[i] = document.createElement("img");
                    aArray[i] = document.createElement("a");
                    for (var j = 0; j < cols; j++) {
                        tableContentArray[i][j] = document.createElement("td");
                        imgArray[i][j] = document.createElement("img");
                        aArray[i][j] = document.createElement("a");
                        aArray[i][j].href ="#";
                        imgArray[i][j].src = "../3-gameon/memory/pics/0.png";
                        aArray[i][j].appendChild(imgArray[i][j]);
                        tableContentArray[i][j].appendChild(aArray[i][j]);
                    }
                }

                //Append childs to create a table with the memory
                for (var k = 0; k < rows; k++) {
                    tbody.appendChild(tableContentArray[k]);
                    for (var l = 0; l < cols; l++) {
                        tbody.appendChild(tableContentArray[k][l]);
                    }
                }

                footer.innerHTML = "Antal försök: 0";
                table.appendChild(tbody);
                divMemory.appendChild(p);
                divMemory.appendChild(table);
                divMemory.appendChild(footer);
                divWrap.appendChild(divMemory);

                playGame(tableContentArray, imgArray, aArray, rows, cols);
            };

            function playGame(tableContentArray, imgArray, aArray, rows, cols){
                var k = 0;
                var l = 0;

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        var memoryPic = "../3-gameon/memory/pics/" + randomArray[k] + ".png";
                        onClickFunction(memoryPic, i, j);
                        k++;
                    }
                }

                function onClickFunction(memoryPic, i ,j) {
                    aArray[i][j].onclick = function(e) {
                        e.preventDefault();
                        if (l === 0) {
                            imgArray[i][j].src = memoryPic;
                            firstBrick[0] = imgArray[i][j].src;
                            firstBrick[1] = i;
                            firstBrick[2] = j;

                            l++;
                        } else if (l === 1) {
                            l++;

                            imgArray[i][j].src = memoryPic;
                            secondBrick[0] = imgArray[i][j].src;
                            secondBrick[1] = i;
                            secondBrick[2] = j;

                            compareBricks();
                        }
                    };
                }

                function tryAgain(timer) {
                    if (timer) {
                        setTimeout(function(){
                            turnBricks();
                            l = 0;
                        }, 1000);
                    }
                    else {
                        turnBricks();
                        l = 0;
                    }

                }

                function compareBricks(turn) {
                    var i = 0;
                    var j = 0;
                    var tempI = -1;
                    var tempJ = -1;
                    var timer = true;

                    if (firstBrick[0] === secondBrick[0]) {
                        //Add class if the bricks are the same so they
                        //don't get turned over...
                        tempI = firstBrick[1];
                        tempJ = firstBrick[2];
                        imgArray[tempI][tempJ].className = "solved";

                        //...and remove the a-tag so the
                        //user can't click on them again.
                        tableContentArray[tempI][tempJ].appendChild(imgArray[tempI][tempJ]);
                        tableContentArray[tempI][tempJ].removeChild(aArray[tempI][tempJ]);

                        //Do the same to the second brick
                        tempI = secondBrick[1];
                        tempJ = secondBrick[2];
                        aArray[tempI][tempJ].removeAttribute("href");
                        imgArray[tempI][tempJ].className = "solved";
                        tableContentArray[tempI][tempJ].appendChild(imgArray[tempI][tempJ]);
                        tableContentArray[tempI][tempJ].removeChild(aArray[tempI][tempJ]);

                        counter(true, true);

                        tryAgain();


                    }
                    else {
                        counter(true, false);
                        tryAgain(timer);
                    }


                }

                function turnBricks() {
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                            if (imgArray[i][j].className != "solved") {
                                imgArray[i][j].src = "../3-gameon/memory/pics/0.png";
                            }

                        }
                    }
                }

                function counter(tries, correct) {

                    var where = game + " footer";

                    if (tries) {
                        numberOfTries++;
                    }
                    if (correct) {
                        correctBricks += 2;
                    }
                    if (correctBricks === numberOfBricks) {
                        document.querySelector(where).innerHTML = "Du löste det på " + numberOfTries + " försök";
                    } else {
                        document.querySelector(where).innerHTML = "Antal försök: " + numberOfTries;
                    }
                }
            }
            //Render the memory
            renderMemory(rows, cols, game);


        };

    }
});