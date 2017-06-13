<?php

?>

<html>
<head>
<title>Preference Generator - Clock Buddy Generator</title>
<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<link rel="stylesheet" href="bundles/css/preferencestyle.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

</head>
<body data-spy="scroll" data-target="#btnbar">
<div class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<div class="row">
		<div class="col-xs-1"></div>
		<div class="col-xs-10">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/">Clock Buddy Generator</a>
			</div>
			<div class="navbar-collapse collapse" id="navbar" aria-expanded="false" style="height: 1px">
				<div>
					<ul class="nav navbar-nav">
						<li>
							<a href="/generators">Generators</a>
						</li>
					</ul>
					<ul class="nav navbar-nav">
						<li>
							<a href="https://github.com/bradymadden97/clockbuddygenerator">Github</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
<div class="wrapper container">
	<div class="row">
		<div class="col-sm-offset-1">
			<p><h3>Preference Generator</h3>
			Enter each student name, separated by a comma:
			</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-offset-1 col-sm-5">
			<textarea id="students" class="form-control" rows="7"></textarea>
		</div>
		<div class="col-sm-4">
			<h4>Number of students: <b><span id="numstudents">0</span></b></h4>
			<hr>
			<h4>Number of hours: <b><span id="numhours">12</span></b></h4>
			<button class="btn btn-default btn-lg" id="hrminus" style="width:100; margin-right:10"><span class="glyphicon glyphicon-minus"></span></button>
			<button class="btn btn-default btn-lg" id="hrplus" style="width:100"><span class="glyphicon glyphicon-plus"></span></button>
						
		</div>
	</div>
	<div id="errorbar" class="row" style="display:none">
		<div class="col-sm-offset-3 col-sm-6 text-center" style="margin-top:10px">
			<div class="alert alert-danger">
				<span id="error"></span>
			</div>
		</div>
	</div>
	<div class="row" style="margin-top:30px">
		<div class="col-sm-offset-1 col-sm-10 text-center">
			<button id="submitbtn" class="btn btn-default btn-lg" style="background-color:#8fc6ff; color:#fff; padding:15px 100px; border-color:#76b9ff">Add Preferences</button>
		</div>
	</div>
	<hr>
	<div id="prefbox" style="display:none">
		<div class="row">
			<div class="col-sm-offset-1 col-sm-6"><div style="font-size:20" id="choosepref">Enter up to three preferences per student:</div><br></div>
		</div>
		<div class="row">
			<div class="col-sm-offset-1 col-sm-8" id="preflocation">
				
				
			</div>
		</div>
		<div class="row" style="margin-top:30px">
			<div class="col-sm-offset-1 col-sm-10 text-center">
				<button id="submitpref" class="btn btn-default btn-lg" style="background-color:#8fc6ff; color:#fff; padding:15px 100px; border-color:#76b9ff">Generate</button>
			</div>
		</div>
	<hr>
	<div id="temppadding"><br><br><br><br><br><br><br><br></div>

	<div id="btnbar" class="btnbar" data-spy="affix" data-offset-top="0" style="display:none">
		<div  style="display:none" class="text-center"><b>1 of <span id="poss"></span> possibilities</b></div>
		<div class="panel panel-default">
			<div class="panel-body">
				<h4><b><span id="correctmatches"> </span>&nbsp;/&nbsp;<span id="totalmatches"> </span></b>&nbsp;matches</b></h4>
				<div id="personresults">
				
				</div>
			</div>
		</div>
		<a type="button" target="_blank" href="print/" class="btn btn-default btn-lg btn-block hoverbtn" >Print</a>
		
	</div>

	
	<div id="resbox">
		<div class="row">
			<div class="col-sm-offset-1 col-sm-8" id="results">

			</div>
		</div>
	</div>
</div>
<script>
	$('.js-example-basic-multiple-limit').select2({
	maximumSelectionLength:3
	});
</script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script src="bundles/js/preference.js"></script>
</body>
</html>