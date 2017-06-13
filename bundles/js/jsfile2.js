
document.getElementById("submitBtn").onclick = splitFunction;
var numHours = 12;
var nameSplit = [];
var countcorrect = 0;
var bestcorrect = 0;
var matchHolder = "";

function splitFunction() {
    document.getElementById("eachStudent").innerHTML = "";
    nameSplit = document.getElementById("studentTextArea").value.split(",").sort();

    if (nameSplit.length < (numHours + 2)) {
        document.getElementById("warningBar").innerHTML = "Error: Not enough students. Need at least " + (numHours + 2) + " students to continue.";
    } else if (nameSplit.length % 2 === 1) {
        document.getElementById("warningBar").innerHTML = "Error: Odd number of students. Add or subtract 1 student to continue.";
    } else {
        document.getElementById("warningBar").innerHTML = "";

        document.getElementById("prefinstructions").style.display = "block";
        document.getElementById("genbuddiesBtn").style.display = "block";
        document.getElementById("secondline").style.display = "block";
        var buildtable = "<table cellpadding='5px'><thead><tr><td></td><td>Preference 1</td><td>Preference 2</td><td>Preference 3</td></tr></thead><tbody>";

        for (var a = 0; a < nameSplit.length; a++) {
            var optionlist = "<option value='blank'></options>";
            for (b = 0; b < nameSplit.length; b++) {
                if (b !== a) {
                    optionlist += "<option value='" + nameSplit[b] + "'>" + nameSplit[b] + "</option>";
                }
            }
            buildtable += "<tr style='height:35px'><td>" + nameSplit[a] + ": </td>\n\
            <td>\n\
                <select style='width:100%; height:100%' class='" + nameSplit[a] + "' id='" + nameSplit[a] + "'0'>\n\
                " + optionlist + "\n\
                </select></td>\n\
            <td>\n\
                <select style='width:100%; height:100%' class='" + nameSplit[a] + "' id='" + nameSplit[a] + "'1'>\n\
                " + optionlist + "\n\
                </select></td>\n\
            <td>\n\
                <select style='width:100%; height:100%' class='" + nameSplit[a] + "' id='" + nameSplit[a] + "'2'>\n\
                " + optionlist + "\n\
                </select></td>\n\
            </tr>";
        }
        buildtable += "</tbody></table>";
        document.getElementById("eachStudent").innerHTML += buildtable;
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

document.getElementById("genbuddiesBtn").onclick = prefshuffle;

function prefshuffle() {
    document.getElementById("calculating").style.display = "block";
    for (var loopthrough = 0; loopthrough < 10; loopthrough++) {
        //shuffle names using Durstenfeld Shuffle from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (var i = nameSplit.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = nameSplit[i];
            nameSplit[i] = nameSplit[j];
            nameSplit[j] = temp;
        }

        //creates list
        var firstList = [];
        for (var x = 1; x < nameSplit.length - 1; x++) {
            firstList.push(x);
        }

        //Creates list of lists
        var lists = [];
        for (var y = 1; y < nameSplit.length; y++) {
            lists.push(firstList);
        }

        //waterfalls each list in the list of lists
        for (var z = 1; z < lists.length; z++) {
            lists[z] = lists[z - 1].slice(0);
            for (var xx = 0; xx < lists[z].length; xx++) {
                lists[z][xx] -= 1;
                if (lists[z][xx] < 0) {
                    lists[z][xx] += (nameSplit.length - 1);
                    lists[z][xx] %= (nameSplit.length - 1);
                } else {
                    lists[z][xx] %= (nameSplit.length - 1);
                }

            }
        }

        var lastStud = [];
        //Subsitutes matching index with index of left out (final number)
        for (var yy = 0; yy < lists.length; yy++) {
            for (var zz = 0; zz < lists[yy].length; zz++) {
                if (lists[yy][zz] === yy) {
                    lists[yy][zz] = (nameSplit.length - 1);
                    lastStud.splice(zz, 0, yy);
                }
            }
        }


        //Pick 12 random numbers (hours) to choose as the 12 hours
        //Revised to pick the indicated number of hours randomly
        var random12List = [];
        random12List.push(Math.floor(Math.random() * (nameSplit.length - 2)));
        while (random12List.length < numHours) {
            var r = Math.floor(Math.random() * (nameSplit.length - 2));
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
                list12[v][w] = nameSplit[list12[v][w]];
            }
        }

        for (var ww = 0; ww < lastStud12.length; ww++) {
            lastStud12[ww] = nameSplit[lastStud12[ww]];
        }

        list12.push(lastStud12);
        countcorrect = 0;

        for (var m = 0; m < nameSplit.length; m++) {
            var match = document.getElementsByClassName(nameSplit[m]);

            for (mm = 0; mm < match.length; mm++) {
                for (var g = 0; g < list12[m].length; g++) {
                    if (match[mm].options[match[mm].selectedIndex].value === list12[m][g]) {
                        countcorrect++;
                    }
                }
                if (match[mm].options[match[mm].selectedIndex].value === "blank") {
                    countcorrect++;
                }

            }
        }
        document.getElementById("matches").style.display = "block";


        if (countcorrect > bestcorrect) {
            bestcorrect = countcorrect;
            document.getElementById("matches").innerHTML = "<b>Number of matches: " + countcorrect + " / " + (nameSplit.length * 3 + "</b>");
            var pagebreak = numHours + 3;
            var divided = Math.floor(50 / pagebreak);


            matchHolder = "";
            for (var aa = 0; aa < list12.length; aa++) {
                matchHolder += "<b>" + (nameSplit[aa] + ": </b><br>");
                for (var bb = 0; bb < list12[aa].length; bb++) {
                    matchHolder += "&nbsp;&nbsp;" + (bb + 1) + " O'clock: &nbsp;" + (list12[aa][bb] + "<br>");
                }
                matchHolder += "<br><br>";
                if ((aa + 1) % divided === 0) {
                    matchHolder += "<p class = 'pagebreaker' style='page-break-after:always;display:none'></p>";
                }
            }


            for (var mmm = 0; mmm < nameSplit.length; mmm++) {
                var matchm = document.getElementsByClassName(nameSplit[mmm]);
                for (kk = 0; kk < matchm.length; kk++) {
                    matchm[kk].style.backgroundColor = "white";
                }
            }

            for (var m = 0; m < nameSplit.length; m++) {
                var match = document.getElementsByClassName(nameSplit[m]);

                for (mm = 0; mm < match.length; mm++) {
                    for (var g = 0; g < list12[m].length; g++) {
                        if (match[mm].options[match[mm].selectedIndex].value === list12[m][g] || match[mm].options[match[mm].selectedIndex].value === "blank") {
                            match[mm].style.backgroundColor = 'rgb(153,255,153)';
                        }
                    }
                }
            }
        }
    }
    document.getElementById("calculating").style.display = "none";
    document.getElementById("spBar").style.display = "block";
    document.getElementById('results').innerHTML = matchHolder;


}

document.getElementById("reshuffleBtn").onclick = prefshuffle;

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