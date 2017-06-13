<?php
	session_start();
	if(!isset($_SESSION['names_array'])){
		header("Location: /regular/");
	}
	if(isset($_GET['c'])){
		if($_GET['c']=='1'){
			$cols=1;
			$colwidth = 12;
		}else if($_GET['c']=='2'){
			$cols=2;
			$colwidth = 6;
		}else{
			$cols=3;
			$colwidth = 4;
		}
	}else{
		$cols = 3;
		$colwidth = 4;
	}
	
?>
<html>
<head>
<title>Print - Clock Buddy Generator</title>
<link rel="stylesheet" href="bundles/css/bootstrap.min.css">
<script src="bundles/js/jquery.min.js"></script>
</head>
<body>
<div class="wrapper container">
<div class="hidden-print">
<div class="row text-center" style="padding-top:10">
	<div class="btn-group">
	  <a href="/regular/print/?c=1" class="btn btn-default" type="button" class="r" name="options" id="option1" autocomplete="off"> 1 Column</a>
	  <a href="/regular/print/?c=2" class="btn btn-default" type="button" class="r" name="options" id="option2" autocomplete="off"> 2 Columns</a>
	  <a href="/regular/print/?c=3" class="btn btn-default" type="button" class="r" name="options" id="option3" autocomplete="off"> 3 Columns</a>
	</div>
</div>
<br>
</div>
<div class="row">
<?php
	$names = $_SESSION['names_array'];
	$ol = $_SESSION['outerList2'];
	$fs = $_SESSION['finalStudent2'];
	$hrs = $_SESSION['hours'];
	
	$numbernames = count($names);
	
	echo "<div class='col-xs-".$colwidth."'>";
	$remain = $numbernames % $cols;
	$onelim = 0;
	$twolim = 0;
	
	if($remain == 1){
		$onelim += 1;
	}else if($remain == 2){
		$onelim += 1;
		$twolim += 1;
	}
	
	$onelim += floor($numbernames / $cols);
	$twolim += floor($numbernames / $cols) + $onelim;
	
	$lines = 0;
	$colcount = 1;
	for($r = 0; $r < count($ol); $r++){
		$lines += $hrs + 3;
		if($lines > 50 && $colcount < $cols){
			echo "</div><div class='col-xs-".$colwidth."'>";
			$colcount += 1;
			$lines = $hrs + 3;
		}else if($lines > 50){
			echo "</div></div><div><p style='page-break-after: always; page-break-inside: avoid;'></p></div><div class='row'><div class='col-xs-".$colwidth."'>";
			$colcount = 1;
			$lines = $hrs + 3;
		}
		
		echo "<div><b>".$names[$r].":</b></div>";
		for($rr = 0; $rr < count($ol[$r]); $rr++){
			echo "<div style='padding-left:15'>".($rr+1)." O'clock:  " . $ol[$r][$rr]."</div>";
		}
		echo "<br><br>";
	}
	
	$lines += $hrs + 3;
	if($lines > 50 && $colcount < $cols){
		echo "</div><div class='col-xs-".$colwidth."'>";
		$colcount += 1;
		$lines = $hrs + 3;
	}else if($lines > 50){
		echo "</div></div><div><p style='page-break-after: always; page-break-inside: avoid;'></p></div><div class='row'><div class='col-xs-".$colwidth."'>";
		$colcount = 1;
		$lines = $hrs + 3;
	}
		
	echo "<div><b>".$names[count($names)-1].":</b></div>";
	for($rrr = 0; $rrr < count($fs); $rrr++){
		echo "<div style='padding-left:15'>".($rrr+1)." O'clock:  " . $fs[$rrr]."</div>";
	}
	echo "</div>";
	
?>
</div>
</div>
<script>
	var cols = <?php echo $cols ?>;
	if(cols == 1){
		$(".r").removeClass("parent");
		$("#option1").addClass("active");
	}
	else if(cols == 2){
		$(".r").removeClass("parent");
		$("#option2").addClass("active");
	}else{
		$(".r").removeClass("parent");
		$("#option3").addClass("active");
	}
	
	
</script>
<script src="bundles/js/bootstrap.min.js"></script>
</body>
</html>