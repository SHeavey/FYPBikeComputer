var glob_rid_id = "";


$(document).ready(function(){

// GET All the Ride in our database ( THis will only return meta data).
$.ajax({
    type: 'GET',
    url: '/api/rides',
    dataType: 'json',
    error: function (data) {
        console.log("error");
    },
    success : function (data, res) { //console.log(data);
		var ix = 1;
        data.data.forEach(function(ride){
            // generate the html row for each ride and append to the table.
            var row = '<tr id="'+ ride._id +'"><td>'+ ix +'</td><td>'+ ride.d_id +'</td><td>'+ ride.name +'</td><td>'+ ride.cond +'</td><td>'+ get_formated_date(ride.s_time) +'</td><td><a href="/view/'+ ride._id +'" class="btn btn-primary btn-xs glyphicon  glyphicon-fullscreen">View</a></td><td><button  onClick="edit_ride(\''+ ride._id +'\')" class="btn btn-primary btn-xs glyphicon glyphicon-edit"> Edit</button></td></tr>';
            
			$("#rides_table tbody").append(row);
        });
    }
 });
 
 
 $('#modal_edit .cond').select2();
 
 
});

 
 // Function to Open the modal edit window
function edit_ride(ride_id){
	glob_rid_id =  ride_id;  //Set the glob ride id to this current ride id
	
	var name =  $("#" + ride_id + " td:eq(2)").html();  //extract the name from the selected row
	var cond =  $("#" + ride_id + " td:eq(3)").html();   // ...............
	var s_time =  $("#" + ride_id + " td:eq(4)").html();  //................
	
	$('#modal_edit .name').val(name);	 // Set the name in the modal window
	$('#modal_edit .cond').val(cond.split(', ')).trigger('change');   //..................
	$('#modal_edit .s_time').html(s_time); //..................
	
	$('#modal_edit').modal('show');  //Open the modal popup window 

}
 
 
//Update the ride conditon andd ride Name through ajax post request to the ride api
function  update_ride(event){
		
		event.preventDefault(); //Prevent the default form submission
		
		
		var before_content = $("#" + glob_rid_id + " td:eq(6)").html(); // Grab the initial Html content
		$("#" + glob_rid_id + " td:eq(6)").html('processing'); // Set an indicator that we are processing the update
		
		
		$("button, a").prop('disabled', true);  //disable all click item while processing request
		
		var name = $('#modal_edit .name').val();	
		var cond = $('#modal_edit .cond').val().join(', ');
		
		var fdata = JSON.stringify({"name" : name, "cond" : cond, "ride_id" : glob_rid_id});  //Post data to be sent to server
		$('#modal_edit').modal('hide'); //Hide the modal
		
		$.ajax({
			type: 'POST',
			url: '/api/ride',
			data: fdata,
			dataType: 'json',
			contentType: 'application/json',
			error: function (data) {
				console.log("error__");
				$("button, a").prop('disabled', false);  //enable click item
				$("#" + glob_rid_id + " td:eq(6)").html(before_content); // restore the init html
			},
			success : function (data, res) {
				$("button, a").prop('disabled', false);  //enable click item
				$("#" + glob_rid_id + " td:eq(6)").html(before_content); // restore the init html
				
				if(data.status == "success"){// if update was successfull
					//Update the ride table
					$("#" + glob_rid_id+ " td:eq(2)").html(name);
					$("#" + glob_rid_id + " td:eq(3)").html(cond);
				}
				else{
					console.log(data.status);
					
					}
				
				
			}
		});	
			
	
}
 


function  delete_ride(np){
	
	if(np == 0){// First time user click delete. Lets asked user to confirm the delete action
		$('#modal_delete').modal('show');
		return
	}
	
	$('#modal_delete').modal('hide'); // Hide the delete modal
	
	var before_content = $("#" + glob_rid_id + " td:eq(6)").html(); // Grab the initial Html content
	$("#" + glob_rid_id + " td:eq(6)").html('processing'); // Set an indicator that we are processing the removal
	
	
	$("button, a").prop('disabled', true);  //disable click item
	
	
	
	$.ajax({
			type: 'DELETE',
			url: '/api/ride/' + glob_rid_id,
			dataType: 'json',
			error: function (data) {
				console.log("error");
				$("button, a").prop('disabled', false);  //enable click item
				$("#" + glob_rid_id + " td:eq(5)").html(before_content); // restore the init html
			},
			success : function (data, res) {
				$("button, a").prop('disabled', false);  //enable click item
				$("#" + glob_rid_id + " td:eq(6)").html(before_content); // restore the init html
				
				if(data.status == "success"){// if update was successfull
					//Remove the ride
					$("#" + glob_rid_id).remove();
									}
				else{
					console.log(data.status);
					
					}
				
				
			}
		});	
	
	
	}
	
	
	

function get_formated_date(timestamp){
	
	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	
	date = new Date(timestamp * 1000);
	
	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " @" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	
	
	}
