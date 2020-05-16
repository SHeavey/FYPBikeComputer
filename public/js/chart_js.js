	
	
	var speed_series = [];    //Initialize Time Series data for speed
	var distance_series = []; //...............
	var average_series =  [];  //....................
	var maximum_series =  [] ; //....................
    
	
	
	
	var name = ""
	var cond = "";
    

$(document).ready(function(){	 //jQuery detecting ready state
	
	/* When all document are loaded, fetch the ride data of this ride and process all charts **/
	
	$.ajax({ //all ajax syntaxs
    type: 'GET',
    url: '/api/ride/' + ride_id,
    dataType: 'json',
    error: function (data) {
        console.log("error");
    },
    success : function (data, res) { 
		
		
		$("#ride_title").html("Ride: " + data.name + " | " + data.cond + " condition  @ " + get_formated_date(data.s_time));  //set the Ride title
		
		data.data.forEach(rdata => {
		
		var time_n = rdata['time'];
		var speed = rdata['speed'];
		var distance = rdata['distance']; 
		var average = rdata['average'];
		var rpm = rdata['rpm'];
		var maximum = rdata['maximum'];
		
		
		speed_series.push({x: time_n, y: speed}); //append to the speed_time dataset;
		distance_series.push({x: time_n, y: distance}); //append to the distance_time dataset;
		average_series.push({x: time_n, y: average}); //append to the average_time dataset;
		maximum_series.push({x: time_n, y: maximum}); //append to the max_time dataset;
		
		//append row data to the table
		var row_data = '<tr><td>'+ get_formated_date_2(time_n) + '</td><td>'+ speed + '</td><td>'+ rpm + '</td><td>'+ distance + '</td><td>'+ average + ' </td><td>'+ maximum + '</td></tr>';
		
		$("#table_canvas table tbody").append(row_data);
		
		});
		
		$(".chart_ch").hide();  //Hide all charts and table (chart_ch is a common class to them);
		
		plot_charts(); // Plot all charts
		
    }
 });
 
   
 
  /* Register click listener for the nav link   */
  $("#this_nav a").on('click', function(){
	  
	  $("#this_nav a").removeClass('active'); //removeClass jQuery function
	  $(this).addClass('active');  //Make this nav link active
	  
	  $(".chart_ch").hide();  //Hide all charts and table;
	  
	  $("#g" + this.id + "_canvas").show(); //Show this chart or table. # on its own will always run
	  
	  
	  });
	
    
 });   
    


function  plot_charts(){
	
	// Distance graph
	var ctx = document.getElementById('distance_canvas').getContext('2d');
	
const data = {
    datasets: [{
        fill: false,
        label: 'Distance vs Time Graph',
        data: distance_series,
        borderColor: '#005315',   // color of the line
		borderWidth: 1.4,    // It determine the thickness of the plot line
        lineTension: 1,  //0, 2, 3  It determine the line curve
		pointRadius : 2,   // It determine the radious of the point marker
		pointHoverRadius : 3, 
    }]
}
const options = {
    type: 'line',
    data: data,
    options: {
        fill: false,
        responsive: true,
		scales: {
            xAxes: [{
                type: 'time',
				time: {
							//unit: 'millisecond'
							displayFormats:{
								'hour' : 'hh:mm;ss',
								//'minute' : 'mm:ss',  chartjs time series has more options
								
								}
						},
				distribution: 'series',
				//distribution: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Time",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true, // determin where the y tick should start from. zero or the minimum y value
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Distance",
                }
            }]
        }
    }
}
const chart = new Chart(ctx, options);
	

    
//Speed Graph
var ctx = document.getElementById('speed_canvas').getContext('2d');
	
const data_2 = {
    datasets: [{
        fill: false,
        label: 'Speed vs Time Graph',
        data: speed_series,
        borderColor: '#005315',   // color of the line
		borderWidth: 1.4,    // It determine the thickness of the plot line
        lineTension: 1,  //0, 2, 3  It determine the line curve
		pointRadius : 2,   // It determine the radious of the point marker
		pointHoverRadius : 3, 
    }]
}
const options_2 = {
    type: 'line',
    data: data_2,
    options: {
        fill: false,
        responsive: true,
		scales: {
            xAxes: [{
                type: 'time',
				time: {
							//unit: 'millisecond'
							displayFormats:{
								'hour' : 'hh:mm;ss',
								//'minute' : 'mm:ss',  chartjs time series has more options
								
								}
						},
				distribution: 'series',
				//distribution: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Time",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true, // determin where the y tick should start from. zero or the minimum y value
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Speed",
                }
            }]
        }
    }
}
const chart_2 = new Chart(ctx, options_2);
	




//Average Speed, Max Speed, Graph
var ctx = document.getElementById('average_canvas').getContext('2d');
	
const data_3 = {
    datasets: [{
        fill: false,
        label: 'Average Speed vs Time Series',
        data: average_series,
        borderColor: '#00F',   // color of the line
		borderWidth: 1.4,    // It determine the thickness of the plot line
        lineTension: 1,  //0, 2, 3  It determine the line curve
		pointRadius : 2,   // It determine the radious of the point marker
		pointHoverRadius : 3, 
    },
		{
        fill: false,
        label: 'Max Speed',
        data: maximum_series,
        borderColor: '#F00',   // color of the line
		borderWidth: 1.4,    // It determine the thickness of the plot line
        lineTension: 1,  //0, 2, 3  It determine the line curve
		pointRadius : 2,   // It determine the radious of the point marker
		pointHoverRadius : 3, 
    }]
}
const options_3 = {
    type: 'line',
    data: data_3,
    options: {
        fill: false,
        responsive: true,
		scales: {
            xAxes: [{
                type: 'time',
				time: {
							//unit: 'millisecond'
							displayFormats:{
								'hour' : 'hh:mm;ss',
								//'minute' : 'mm:ss',  chartjs time series has more options
								
								}
						},
				distribution: 'series',
				//distribution: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Time",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,  // determin where the y tick should start from. zero or the minimum y value
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Speed",
                }
            }]
        }
    }
}
const chart_3 = new Chart(ctx, options_3);	
	

	$("#speed")[0].click();  //click on the speed nav tab to show the speed chart by default
	
	$("#page_loader").hide(); //hide the page loader layer
	
	}






function get_formated_date(timestamp){
	
	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	
	date = new Date(timestamp * 1000);
	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " @" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	
	
	}
	
function get_formated_date_2(raw_date){
	
	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	
	date = new Date(raw_date);
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	}