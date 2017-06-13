$(document).ready(function(){
	$("#students").focus();
});

var names = [];
var hours = 12;

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

$("#reshufflebtn").on("click", function(){
	validate();
});

function validate(){
	if(hours >= names.length){
		var temp = hours + 1;
		if(temp % 2 == 1){
			temp = hours + 2;
		}
		$("#error").text("Not enough students. Need at least " + temp + " students to continue.");
		$("#errorbar").css("display", "block");
		$("#results").html("");
		$("#btnbar").css("display","none");
		$("#footerbar").css("display","none");
	}else if(names.length % 2 == 1){
		$("#error").text("The number of students cannot be odd.");
		$("#errorbar").css("display", "block");
		$("#results").html("");
		$("#btnbar").css("display","none");
		$("#footerbar").css("display","none");
	}else{
		$("#errorbar").css("display", "none");
		$("#results").html("");
		sort();
	}
	
};

function sort(){
	names = $("#students").val().split(",");
	$.each(names, function(i, val){
		names[i] = $.trim(val)
	});
	
	for(var i = names.length - 1; i > 0; i--){
		var j = Math.floor(Math.random() * (i + 1));
	        var temp = names[i];
	        names[i] = names[j];
	        names[j] = temp;
	}
	
	var innerList = [];
	var outerList = [];
	
	for(var il = 0; il < names.length - 1; il++){
		innerList.push(il);
	}
	
	for(var ol = 0; ol < names.length - 1; ol++){
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
	for(var h = 0; h < names.length - 1; h++){
		hourList[h] = h;
	}
	for(var hh = hourList.length - 1; hh > 0; hh--){
		var jj = Math.floor(Math.random() * (hh + 1));
	        var temph = hourList[hh];
	        hourList[hh] = hourList[jj];
	        hourList[jj] = temph;
	}
	
	
	var outerList2 = [];
	for( var sl = 0; sl < outerList.length; sl++){
		var slicedList = [];
		for(var sl2 = 0; sl2 < hours; sl2++){
			slicedList.push(outerList[sl][hourList[sl2]]);
		}
		outerList2.push(slicedList);
	}
	
	var finalStudent2 = [];
	for(var fs2 = 0; fs2 < hours; fs2++){
		finalStudent2.push(finalStudent[hourList[fs2]]);
	}
		
	for (var z = 0; z < outerList2.length; z++) {
            for (var zz = 0; zz < outerList2[z].length; zz++) {
                outerList2[z][zz] = names[outerList2[z][zz]];
            }
        }

        for (var m = 0; m < finalStudent2.length; m++) {
            finalStudent2[m] = names[finalStudent2[m]];
        }
        
        $("#results").html("");
        for(var r = 0; r < outerList2.length; r++){
                $("#results").append("<div><b>"+names[r]+":</b></div>");
                for(var rr = 0; rr < outerList2[r].length; rr++){
                	$("#results").append("<div style='padding-left:15'>"+(rr+1)+" O'clock:  " + outerList2[r][rr] +"</div>");
                }
                $("#results").append("<br><br>");
        }
        $("#results").append("<div><b>"+names[names.length-1]+":</b></div>");
        for(var rrr = 0; rrr < finalStudent2.length; rrr++){
        	$("#results").append("<div style='padding-left:15'>"+(rrr+1)+" O'clock:  " + finalStudent2[rrr] + "</div>");
        }
        $.ajax({        
	       type: "POST",
	       url: "/bundles/util/print.php",
	       data: {names_array: names, outerList2: outerList2, finalStudent2: finalStudent2, hours:hours},
	       success: function() {
	                   
	       }
	});
	
	factorial();
        
	$("#btnbar").css("display","block");
	$("#footerbar").css("display","block");
        scrolldown();
};

function factorial(){
	var possibilities = names.length;
	for(var q = names.length - 1; q > names.length - hours - 1; q--){
		possibilities = possibilities * q;
	}
	possibilities = possibilities / 2;
	if(possibilities > 1000000000000000000){
		var pos = Math.floor(possibilities / 1000000000000000000);
		if(pos > 999){
			pos = 999;
			$("#poss").text("more than " + pos + " quintillion");
		}else{
			$("#poss").text(pos + " quintillion");
		}
	}
	else if(possibilities > 1000000000000000){
		var pos = Math.floor(possibilities / 1000000000000000);
		$("#poss").text(pos + " quadrillion");
	}
	else if(possibilities > 1000000000000){
		var pos = Math.floor(possibilities / 1000000000000);
		$("#poss").text(pos + " trillion");
	}
	else if(possibilities > 1000000000){
		var pos = Math.floor(possibilities / 1000000000);
		$("#poss").text(pos + " billion");
	}
	else if(possibilities > 1000000){
		var pos = Math.floor(possibilities / 1000000);
		$("#poss").text(pos + " million");
	}
	else{
		$("#poss").text(possibilities);
	}
}

function scrolldown(){
	var target = $('#results');
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	    $('html, body').animate({
	       scrollTop: target.offset().top - 70
	}, 750);
	}
	return false;
};