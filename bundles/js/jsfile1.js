var namesSplit = [];
var numHours = 12;

document.getElementById("submitBtn").onclick = runShuffle;
function runShuffle() {
    document.getElementById("results").innerHTML = "";
    namesSplit = document.getElementById("studentTextArea").value.split(",");
    if (namesSplit.length < (numHours + 2)) {
        document.getElementById("warningBar").innerHTML = "Error: Not enough students. Need at least " + (numHours + 2) + " students to continue.";
    } else if (namesSplit.length % 2 === 1) {
        document.getElementById("warningBar").innerHTML = "Error: Odd number of students. Add or subtract 1 student to continue.";
    } else {
        document.getElementById("warningBar").innerHTML = "";


        //Shuffle Names array, used Durstenfeld Shuffle from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (var i = namesSplit.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = namesSplit[i];
            namesSplit[i] = namesSplit[j];
            namesSplit[j] = temp;
        }

        //Creates list
        var firstList = [];
        for (var x = 1; x < namesSplit.length - 1; x++) {
            firstList.push(x);
        }

        //Creates list of lists
        var lists = [];
        for (var y = 1; y < namesSplit.length; y++) {
            lists.push(firstList);
        }

        //"Waterfalls" each list, decreases by one each time
        for (var z = 1; z < lists.length; z++) {
            lists[z] = lists[z - 1].slice(0);
            for (var xx = 0; xx < lists[z].length; xx++) {
                lists[z][xx] -= 1;
                if (lists[z][xx] < 0) {
                    lists[z][xx] += (namesSplit.length - 1);
                    lists[z][xx] %= (namesSplit.length - 1);
                } else {
                    lists[z][xx] %= (namesSplit.length - 1);
                }

            }
        }

        var lastStud = [];
        //Subsitutes matching index with index of left out (final number)
        for (var yy = 0; yy < lists.length; yy++) {
            for (var zz = 0; zz < lists[yy].length; zz++) {
                if (lists[yy][zz] === yy) {
                    lists[yy][zz] = (namesSplit.length - 1);
                    lastStud.splice(zz, 0, yy);
                }
            }
        }


        //Pick 12 random numbers (hours) to choose as the 12 hours
        //Revised to pick the indicated number of hours randomly
        var random12List = [];
        random12List.push(Math.floor(Math.random() * (namesSplit.length - 2)));
        while (random12List.length < numHours) {
            var r = Math.floor(Math.random() * (namesSplit.length - 2));
            var check = 0;
            for (var s = 0; s < random12List.length; s++) {
                if (r === random12List[s]) {
                    check = 1;
                }
            }
            if (check === 0) {
                random12List.push(r);
            }
        }

        //Grab those 12 hours from the large double array
        var list12 = [];
        for (var t = 0; t < lists.length; t++) {
            var indivlist = [];
            for (var u = 0; u < random12List.length; u++) {
                indivlist.push(lists[t][random12List[u]]);
            }
            list12.push(indivlist);
        }

        //Do the same for the last person's array
        var lastStud12 = [];
        for (var uu = 0; uu < random12List.length; uu++) {
            lastStud12.push(lastStud[random12List[uu]]);
        }


        for (var v = 0; v < list12.length; v++) {
            for (var w = 0; w < list12[v].length; w++) {
                list12[v][w] = namesSplit[list12[v][w]];
            }
        }

        for (var ww = 0; ww < lastStud12.length; ww++) {
            lastStud12[ww] = namesSplit[lastStud12[ww]];
        }

        document.getElementById("spBar").style.display = "block";

        var pagebreak = numHours + 3;
        var divided = Math.floor(50 / pagebreak);

        for (var aa = 0; aa < list12.length; aa++) {
            document.getElementById("results").innerHTML += "<b>" + (namesSplit[aa] + ": </b><br>");
            for (var bb = 0; bb < list12[aa].length; bb++) {
                document.getElementById("results").innerHTML += "&nbsp;&nbsp;" + (bb + 1) + " O'clock: &nbsp;" + (list12[aa][bb] + "<br>");
            }
            document.getElementById("results").innerHTML += "<br><br>";
            if ((aa + 1) % divided === 0) {
                document.getElementById("results").innerHTML += "<p style='page-break-after:always;display:none'></p>";
            }
        }


        document.getElementById("results").innerHTML += "<b>" + ((namesSplit[namesSplit.length - 1]) + ": </b><br>");
        for (var bbb = 0; bbb < lastStud12.length; bbb++) {
            document.getElementById("results").innerHTML += "&nbsp;&nbsp;" + (bbb + 1) + " O'clock: &nbsp;" + (lastStud12[bbb] + "<br>");
        }
        document.getElementById("results").innerHTML += "<br><br>";
    }
}
;

document.getElementById("studentTextArea").onkeyup = function (event) {
    namesSplit = document.getElementById("studentTextArea").value.split(",");
    document.getElementById("numStudentsBar").innerHTML = "Number of Students: " + namesSplit.length;
};


document.getElementById("minusHours").onclick = function () {
    if (numHours !== 1) {
        numHours -= 1;
        document.getElementById("hourSpan").innerHTML = numHours;
    }
};

document.getElementById("plusHours").onclick = function () {
    numHours += 1;
    document.getElementById("hourSpan").innerHTML = numHours;
};

document.getElementById("reshuffleBtn").onclick = runShuffle;

document.getElementById("printBtn").onclick = function () {
    var open = document.getElementsByClassName("pagebreaker");
    for (var o = 0; o < open.length; o++) {
        open[o].style.display = "block";
    }

    var finprint = document.getElementById("results").outerHTML;

    var close = document.getElementsByClassName("pagebreaker");
    for (var cl = 0; cl < close.length; cl++) {
        close[cl].style.display = "none";
    }

    var myWindow = window.open();
    var doc = myWindow.document;
    doc.open();
    doc.write("<html><head><title>results generated by clockbuddygenerator.com</title></head><body>" + finprint + "</body></html>");
    doc.documentURI = "resultspage.html";
    doc.close();

};
