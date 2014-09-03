<!DOCTYPE html>
<html>
	<head>
		<title>Untitled Document</title>
		<link href="assets/css/style2.css" rel="stylesheet" type="text/css" />
	</head>
<body>

<div id="chart_container" >

	<div class="top_bar" >
		<ul class="top_bar_attr">
          <li>
            <input id="chart_title" type="text" placeholder="Chart Title" >
          </li>
        </ul>

	</div>

	<div  id="chart-area" >
			
	</div>

</div>

</body>
<script src="assets/js/chart2.js"></script>
<script type="text/javascript">
      window.onload = function () {
          var chart = new g_chart.chart("chart-area", {
              skin: "white",
              title:'chart 1',
              data: [              
	                  { label: "man unt", rate:7 },
	                  { label: "chelsea", rate:3  }, 
              ]
          });
      }
  </script>
</html>