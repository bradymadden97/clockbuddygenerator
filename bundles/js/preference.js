$(document).ready(function(){
	$("#students").focus();
});

var names = [];
var hours = 12;
var npref = [];
var npreforig = [];
var namepairs = [];

var results = "";
var correctsum = 0;
var totalsum = 0;

$("#hrminus").on("click", function(){
	if(hours !== 1){
		hours -= 1;
	}
	$("#numhours").text(hours);
});
$("#hrplus").on("click", function(){
	hours += 1;
	$("#numhours").text(hours);
});

$("#students").on("keyup", function(){
	names = $("#students").val().split(",");
	$("#numstudents").text(names.length);	
});

$("#submitbtn").on("click", function(){
	validate();
	
});

$("#submitpref").on("click", function(){
	$("#temppadding").css("display", "none");
	multirun();

});

function validate(){
	if(hours >= names.length){
		var temp = hours + 1;
		if(temp % 2 == 1){
			temp = hours + 2;
		}
		$("#error").text("Not enough students. Need at least " + temp + " students to continue.");
		$("#errorbar").css("display", "block");
		$("#prefbox").css("display","none");
	}else if(names.length % 2 == 1){
		$("#error").text("The number of students cannot be odd.");
		$("#errorbar").css("display", "block");
		$("#prefbox").css("display","none");
	}else{
		$("#errorbar").css("display", "none");
		$.each(names, function(i, val){
			names[i] = $.trim(val)
		});
		$("#prefbox").css("display","block");
		$("#temppadding").css("display", "block");
		var scrollbuff = 568 + 42 * names.length;
		$(document.body).attr("data-offset", scrollbuff);
		$("#btnbar").attr("data-offset-top", scrollbuff);

		setpref();
	}
	
};

function setpref(){
	npref = names.sort();
	npreforig = npref;
	$("#preflocation").empty();
	$.each(npref, function(index, val){
		var options = "";
		$.each(npref,function(i,v){
			if(v != val){
				options += "<option value=" + v + ">" + v + "</option>";
			}
		});
		$("#preflocation").append("<div class='row' style='margin-bottom:10'><div class='col-xs-3' style='text-align:right;font-size:18'>"+val+": </div><div class='col-xs-9'><select class='js-example-basic-multiple-limit' multiple='multiple' id='"+index+"selectpref' style='width:100%'>" + options + "</select></div></div>");
	
	});
	
	$('.js-example-basic-multiple-limit').select2({
		maximumSelectionLength:3
	});

	scrolldown1();
	$("#0selectpref").focus();
};

function sort(){
	

	var innerList = [];
	var outerList = [];

	for(var il = 0; il < npref.length - 1; il++){
		innerList.push(il);
	}
	
	for(var ol = 0; ol < npref.length - 1; ol++){
		outerList.push(innerList);
	}
	
	for(var w = 1; w < outerList.length; w++){
		outerList[w] = outerList[w - 1].slice(0);
		for(var ww = 0; ww < outerList[w].length; ww++){
			outerList[w][ww] -=1;
			if (outerList[w][ww] < 0){
				outerList[w][ww] += (names.length - 1);
				outerList[w][ww] %= (names.length - 1);
			} else {
				outerList[w][ww] %= (names.length - 1);
			}
		}
	}

	var finalStudent = [];
	for(var f = 0; f < outerList.length; f++){
		for(var ff = 0; ff < outerList[f].length; ff++ ){
			if(outerList[f][ff] === f){
				outerList[f][ff] = names.length - 1;
				finalStudent[ff] = f;
			}
		}
	}
	
	var hourList = [];
	var hourCorrect = [];
	for(var h = 0; h < npref.length - 1; h++){
		hourList[h] = h;
		hourCorrect[h] = 0;
	}

	var outerList2 = [];
	for( var sl = 0; sl < outerList.length; sl++){
		var slicedList = [];
		for(var sl2 = 0; sl2 < hourList.length; sl2++){
			for(var hrrank = 0; hrrank < [sl].length; hrrank++){
				if(namepairs[sl][hrrank] == npref[outerList[sl][hourList[sl2]]]){
					hourCorrect[sl2] += 1;
				}
			}
			slicedList.push(outerList[sl][hourList[sl2]]);
		}
		outerList2.push(slicedList);
	}
	
	var finalStudent2 = [];
	for(var fs2 = 0; fs2 < hourList.length; fs2++){
		for(var hrrank = 0; hrrank < namepairs[namepairs.length-1].length; hrrank++){
			if(namepairs[namepairs.length-1][hrrank] == npref[finalStudent[hourList[fs2]]]){
				hourCorrect[fs2] += 1;
			}
		}
		finalStudent2.push(finalStudent[hourList[fs2]]);
	}

	hourSorted = [];
	for(var i = 0; i < hourCorrect.length; i++){
		hourSorted[i] = [hourCorrect[i] , i];
	}

	hourSorted = hourSorted.sort().reverse();
	hourChopped = [];
	for(var i = 0; i < hours; i++){
		hourChopped[i] = hourSorted[i][1];
	}

	var finStudChop = [];
	for( var sl = 0; sl < outerList.length; sl++){
		var slicedList = [];
		for(var sl2 = 0; sl2 < hours; sl2++){
			slicedList.push(outerList[sl][hourChopped[sl2]]);
		}
		finStudChop.push(slicedList);
	}
	
	var finStud2Chop = [];
	for(var fs2 = 0; fs2 < hours; fs2++){
		finStud2Chop.push(finalStudent[hourChopped[fs2]]);
	}
		
	for (var z = 0; z < finStudChop.length; z++) {
            for (var zz = 0; zz < finStudChop[z].length; zz++) {
                finStudChop[z][zz] = npref[finStudChop[z][zz]];
            }
        }

        for (var m = 0; m < finStud2Chop.length; m++) {
            finStud2Chop[m] = npref[finStud2Chop[m]];
        }
	
	var res = "";
	for(var r = 0; r < finStudChop.length; r++){
                res += "<div><b>"+npref[r]+":</b></div>";
                for(var rr = 0; rr < finStudChop[r].length; rr++){
                	res += "<div style='padding-left:15'>"+(rr+1)+" O'clock:  " + finStudChop[r][rr] +"</div>";
                }
                res += "<br><br>";
        }
        res += "<div><b>"+npref[npref.length-1]+":</b></div>";
        for(var rrr = 0; rrr < finStud2Chop.length; rrr++){
        	res += "<div style='padding-left:15'>"+(rrr+1)+" O'clock:  " + finStud2Chop[rrr] + "</div>";
        }
	
	//sum of correct
	var cs = 0;
	for(var i = 0; i < hourChopped.length; i++){
		cs += hourCorrect[hourChopped[i]];
	}
	
	//sum of total
	var ts = 0;
	for(var i = 0; i < namepairs.length; i++){
		for(var j = 0; j < namepairs[i].length; j++){
			if(namepairs[i][j] == ""){
				break;
			}else{
				ts += 1;
			}
		}
	}
	
	if(cs > correctsum){
		correctsum = cs;
		totalsum = ts;
		results = res;
	}

};

function multirun(){
	$("#results").empty();
	results = "";
	correctsum = 0;
	totalsum = 0;
	$.each(npref, function(index, val){
		var r = $('#'+index+'selectpref').select2('val');
		if(!r) r = "";
		namepairs[index] = r.toString().split(",");
	});
	sort();
	
	for(var i = 0; i < npref.length - 1; i++){
		var temp = [];
		temp = namepairs[i];
		namepairs[i] = namepairs[npref.length - 1];
		namepairs[npref.length - 1] = temp;

		var t = npref[i];
		npref[i] = npref[npref.length - 1];
		npref[npref.length - 1] = t;

		
		sort();

		//switch back
		temp = namepairs[i];
		namepairs[i] = namepairs[npref.length - 1];
		namepairs[npref.length - 1] = temp;

		t = npref[i];
		npref[i] = npref[npref.length - 1];
		npref[npref.length - 1] = t;
	}
	$("#results").append(results);
	$("#btnbar").css("display","block");
	$("#correctmatches").text(correctsum);
	$("#totalmatches").text(totalsum);
	scrolldown2();
		
};

function scrolldown1(){
	var target = $('#choosepref');
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	    $('html, body').animate({
	       scrollTop: target.offset().top - 70
	}, 750);
	}
	return false;
};

function scrolldown2(){
	var target = $('#results');
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	    $('html, body').animate({
	       scrollTop: target.offset().top - 70
	}, 750);
	}
	return false;
};