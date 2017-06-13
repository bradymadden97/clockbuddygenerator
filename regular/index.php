<?php
	session_start();
	unset($_SESSION['names_array']);
	unset($_SESSION['outerList2']);
	unset($_SESSION['finalStudent2']);
	unset($_SESSION['hours']);
?>

<html>
<head>
<title>Regular Generator - Clock Buddy Generator</title>
<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
<link rel="stylesheet" href="bundles/css/bootstrap.min.css">
<link rel="stylesheet" href="bundles/css/regularstyle.css">
<script src="bundles/js/jquery.min.js"></script>

</head>
<body data-spy="scroll" data-target="#btnbar" data-offset="395">

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
			<p><h3>Regular Generator</h3>
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
			<button id="submitbtn" class="btn btn-default btn-lg" style="background-color:#8fc6ff; color:#fff; padding:15px 100px; border-color:#76b9ff">Generate</button>
		</div>
	</div>
	<hr>
	
	<div id="btnbar" class="btnbar" data-spy="affix" data-offset-top="395" style="display:none">
		<div  style="display:none" class="text-center"><b>1 of <span id="poss"></span> possibilities</b></div>
		<a type="button" id="reshufflebtn" class="btn btn-primary btn-lg btn-block hoverbtn" style="background-color:#8fc6ff; color:#fff; border-color:#76b9ff">Reshuffle</a>
		<a type="button" target="_blank" href="regular/print/" class="btn btn-default btn-lg btn-block hoverbtn" >Print</a>
	</div>
	<div style="padding-left:10%" id="results">
	</div>
	<div id="footerbar" style="display:none">
	<br><br><hr><div style='text-align:center'>generated by clockbuddygenerator</div><br></div>
</div>
<script src="bundles/js/bootstrap.min.js"></script>
<script src="bundles/js/regular.js"></script>
</body>
</html>