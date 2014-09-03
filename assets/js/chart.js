/**
* code by gusti for piktochart test
*/




(function(){

	return false;
	 var support_canvas = !!document.createElement("canvas").getContext; 

	 var skin = {

	 	'white':{
	 		fillStyle : '#333',
	 	}

	 }

	 function draw(ctx,opt){

	 }
	 function create_chart (container_id,opt) {
	 	var cvs = document.getElementById(container_id);
	 	var ctx = cvs.getContext("2d");
	 	
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
	 }



	 var g_chart = {

	 	chart :function (container_id, opt) {
	 		var _chart = new create_chart(container_id,opt);

		}
	}

	 
	 window.g_chart = g_chart;

})();