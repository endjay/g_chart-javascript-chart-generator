/**
* code by gusti for piktochart test
*/

(function(){

	
     var chart_title = document.getElementById('chart_title');

     chart_title.onchange = function(){
     	

     	create_chart("chart-area", {
              skin: "white",
              title:this.value,
              data: [              
	                  { label: "man unt", rate:7 },
	                  { label: "chelsea", rate:3  }, 
              ]
          });
     }

	 function create_chart (container_id,opt) {

	 	

	 	var cc = document.getElementById(container_id);

	 	cc.innerHTML = '';
	 	

	 	var area = {

	 		'paddingLeft':50,
	 		'chartSpace':30,
	 		'paddingTop':50,
	 		'chartHeight':200,
	 		'chartWidth':200,
	 		'barWidth':50,
	 		
	 	}

	 	
	 	var color = [
	 		'#139076',
	 		'#F19B2C',
	 		'#2F81B7',
	 	]

	 	var setting = {
	 		'fontsize':12,
	 		'fontColor':'#FFFFFF'
	 	}

	 	var svgNS = "http://www.w3.org/2000/svg"; 
	 	var svg = document.createElementNS(svgNS,'svg');
	 	
	 	svg.setAttribute('height','100%');
	 	svg.setAttribute('width','100%');

	 	var baseline =  document.createElementNS(svgNS,'path');
	 	baseline.setAttribute('stroke','#8c8c8c');
	 	//d="M400,200 L50,200" stroke-dasharray="4"

	 	var baselineWidth = area.paddingLeft+(opt.data.length*area.barWidth)+(area.chartSpace*opt.data.length);
	 	baseline.setAttribute('d','M'+baselineWidth+','+(area.chartHeight+area.paddingTop)+' L'+area.paddingLeft+','+(area.chartHeight+area.paddingTop));
	 	baseline.setAttribute('stroke-dasharray','4');
	 	baseline.setAttribute('fill','none');

	 	svg.appendChild(baseline);

	 	// <text x="50" y="188" text-anchor="middle"  fill="#ffffff" opacity="1" font-size="12px" font-family="Arial" >
		//			 <tspan dy="11.34375" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">0</tspan>
		//		 </text>
		var numberSpace = area.chartHeight/opt.data.length;

		//console.log(area.chartHeight+area.paddingTop,numberSpace,area.chartHeight);
		var number = document.createElementNS(svgNS,'text');
		  number.setAttribute('x',area.paddingLeft);
		  number.setAttribute('y',(area.chartHeight+area.paddingTop));
		  number.setAttribute('text-anchor','middle');
		  number.setAttribute('fill',setting.fontColor);
		  number.setAttribute('font-size',setting.fontsize+'px');
		  number.innerHTML = 0;
		  svg.appendChild(number);

		 
		 var title = document.createElementNS(svgNS,'text'); 
		  title.setAttribute('x',area.chartWidth);
		  title.setAttribute('y',area.paddingTop/2);
		  title.setAttribute('text-anchor','middle');
		  title.setAttribute('fill',setting.fontColor);
		  title.setAttribute('font-size','14px');
		  title.innerHTML = opt.title;
		  svg.appendChild(title);	 
		 
		 var top = get_top_value(opt.data,convert_value);
		console.log(top);
		var p_number = top/opt.data.length;
		var mt = area.chartHeight+area.paddingTop-numberSpace;
		var pd = area.paddingLeft+area.chartSpace;

		for(var i = 0; i < opt.data.length; i++){
			//console.log(numberSpace);

	 	 var number = document.createElementNS(svgNS,'text');
		  number.setAttribute('x',area.paddingLeft);
		  number.setAttribute('y',mt);
		  number.setAttribute('text-anchor','middle');
		  number.setAttribute('fill',setting.fontColor);
		  number.setAttribute('font-size',setting.fontsize+'px');
		  number.innerHTML = p_number;
		  svg.appendChild(number);
		  //console.log(i,mt);
		  

		  var rect = document.createElementNS(svgNS,'rect');			 
		  rect.setAttribute('id','bar-'+opt.data[i].label);
		  rect.setAttribute('width',area.barWidth);
		  rect.setAttribute('height',(area.chartHeight/top)*opt.data[i].rate);
		  rect.setAttribute('style','fill:'+color[i])
		  rect.setAttribute('x',pd);
		  rect.setAttribute('y',area.chartHeight+area.paddingTop-(area.chartHeight/top)*opt.data[i].rate);
		  svg.appendChild(rect);

		  var animate1 = document.createElementNS(svgNS,'animate');
		  animate1.setAttribute('attributeName','height');
		  animate1.setAttribute('attributeType','XML');
		  animate1.setAttribute('begin','0s');
		  animate1.setAttribute('dur','1s');
		  animate1.setAttribute('fill','freeze');
		  animate1.setAttribute('from',0);
		  animate1.setAttribute('to',(area.chartHeight/top)*opt.data[i].rate);
		  rect.appendChild(animate1);

		  var animate2 = document.createElementNS(svgNS,'animate');
		   animate2.setAttribute('attributeName','y');
		  animate2.setAttribute('attributeType','XML');
		  animate2.setAttribute('begin','0s');
		  animate2.setAttribute('dur','1s');
		  animate2.setAttribute('fill','freeze');
		  animate2.setAttribute('from',area.chartHeight+area.paddingTop);
		  animate2.setAttribute('to',(area.chartHeight+area.paddingTop)-(area.chartHeight/top)*opt.data[i].rate);
		  rect.appendChild(animate2);
		 	
		  var label = document.createElementNS(svgNS,'text'); 
		  label.setAttribute('x',pd+20);
		  label.setAttribute('y',area.paddingTop+area.chartHeight+20);
		  label.setAttribute('text-anchor','middle');
		  label.setAttribute('fill',setting.fontColor);
		  label.setAttribute('font-size',setting.fontsize+'px');
		  label.innerHTML = opt.data[i].label;
		  svg.appendChild(label);	

		  pd +=area.chartSpace+area.barWidth;
		  mt = mt-numberSpace;
		  p_number += p_number;
		  
		} 

		//<rect id="bar-mu" x="100" y="130" width="50" height="70" style="fill:#F19B2C" r='0' rx="0" ry="0">
		//<animate attributeName="height" 
		//attributeType="XML" begin="0s" dur="1s" fill="freeze" from="0" to="70" /> 
		//	<animate attributeName="y" attributeType="XML" begin="0s" dur="1s" fill="freeze" from="200" to="130" /> 
		//</rect>

		 //var rect = document.createElementNS(svgNS,'rect');			 
		 //rect.setAttribute('id','bar-mu');

	 	cc.appendChild(svg);
	 	
	 	function get_top_value(data,callback){
	 		var max = 0
	 		var l = data.length;

	 		for(i=0; i<l; i++){
	 			if(data[i].rate > max){
	 				max = data[i].rate;
	 			}
	 			
	 		}
	 		//console.log(max)
	 		return callback(max);
	 	}

	 	function convert_value(v){
	 		//console.log(v);
	 	
	 		for(var i = 10 ; i < v; i+i){
	 			//console.log(i);
	 		}	
	 		console.log(i);
	 		return i;
	 	}

	 	return false;
	 	/* var ctx = cvs.getContext("2d");
	 	
	 	var active_skin = skin[opt.skin];
	 	var total_bar = opt.data.length;
	 	var xAxisLabel = [1,2,3,4,5,6,7,8,9,10];
	 	var yaxisLabel = [];
	 	var barW = 50;
	 	var barX = 50;
	 	ctx.fillStyle = '#ddd';
	 	ctx.fillRect(0,0,cvs.width,cvs.height);
	 	
	 	
	 	var b = cvs.height - (cvs.height/10);
	 	ctx.moveTo(0, cvs.height - b );
      	ctx.lineTo(cvs.width,cvs.height - b  );
	 	ctx.stroke();

	 	for(var i = 0; i<xAxisLabel.length; i++){
	 		console.log(b);
	 		ctx.moveTo(0,b);
      		ctx.lineTo(cvs.width,b);
      		ctx.fillText  (xAxisLabel[i],0,0);
      		b -= (cvs.height/10);
	 	}

	 	ctx.moveTo(0,cvs.height);
      	ctx.lineTo(0,0);
	 	ctx.stroke();
	 	ctx.fillStyle = active_skin.fillStyle;
	 	ctx.font         = 'bold 12px sans-serif'; 
	 	  // set text font
	 	
	 	ctx.textAlign = "center"; 

	 	
	 	//ctx.fillRect(0, 0, 800, 600);
	 	for(var i = 0 ; i< total_bar ; i++){
	 		var n = opt.data[i].rate * 10;
	 		var lbl = opt.data[i].label;
	 		
	 		ctx.fillRect(barX, cvs.height - n,barW,n);

    		ctx.fillText  (lbl,barX+20,cvs.height-n-10);
    		console.log(n);

	 		barX += barW + 30;
	 	}

	 	*/
	 }



	 var g_chart = {

	 	chart :function (container_id, opt) {
	 		var _chart = new create_chart(container_id,opt);

		}
	}

	 
	 window.g_chart = g_chart;

})();