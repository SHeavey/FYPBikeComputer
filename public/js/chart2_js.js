	
	
	var cond_val = [];    //The frequency of the ride condition
	var cond_label = []; // Names of the ride condition
	
	var conditions_ray = {}  //Hold colections of conditions and their frequency
	
	
	
$(document).ready(function(){	
	
	/* When all document are loaded, fetch the ride data of this ride and process all charts **/
	
	//GET All the Ride condition .
$.ajax({
    type: 'GET',
    url: '/api/conditions',
    dataType: 'json',
    error: function (data) {
        console.log("error");
    },
    success : function (data, res) { //console.log(data);
      //alert(JSON.stringify(data));
  /*	This is how the group data look like	
		[
		  { _id: '---', count: 1 },
		  { _id: 'Dry, Wet', count: 3 },
		  { _id: 'Windy', count: 1 }
		]
	*/	
        data.forEach(function(cond){ //from $cond in controller
			
            conditions = cond._id.split(", ");  //conver thr conditions to array  ['windy', 'wet', ...]
			count = cond.count;  //Frequency of this grouping
			conditions.forEach(function(condition){
				if(condition in conditions_ray){ //check if cond is already in array
					
					conditions_ray[condition] += count;//if so increase count
					
					}
				else{
					
					conditions_ray[condition] = count;//if not, put = to count
					
					}
			});
			
        });
       // ['dry' : 5, '']
       //1 ['dry', 'wet']
        //2 {5, 6}
		for(var key in conditions_ray){ //
            
			cond_label.push(key);//1
			cond_val.push(conditions_ray[key]);//2
			
		}
		
		plot_charts(); // Plot the bar chart
    }
 
 });		
			
    
 });




function  plot_charts(){
	
	// Distance graph
	var ctx = document.getElementById('chart_canvas').getContext('2d');
	
const data = {
	labels:	cond_label,
    datasets: [{
        fill: false,
        label: 'Ride Conditions',
        data: cond_val,
        borderColor: '#005315',   // color of the line
		borderWidth: 1,    // It determine the thickness of the plot line
       
    }]
}
const options = {
    type: 'bar',
    data: data,
    options: {
        fill: false,
        responsive: false,
		scales: {
            xAxes: [{
                
				display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Conditions",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true, // where should the tick begin. min value or zero
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Frequency",
                }
            }]
        }
    }   
}
const chart = new Chart(ctx, options);
	

	}




