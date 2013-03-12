


function appointmentView(input) {

Ti.include('ui/common/helpers/dateTime.js');

var appointment = input.appointment;
var treatments = input.treatments;


var status_text=(treatments.length > 0)?treatments.length+' treatments prescribed':
				(isValidDateTime(new Date(appointment.date+' '+appointment.time)))?'Scheduled':'Completed';
			
	
	var view = Ti.UI.createView({
		backgroundColor: '#0EA5E9',
		borderColor: 'black',
		height: 150,
		width: '100%'
	});
	
	
	var doctor = Ti.UI.createLabel({ 
		text: appointment.doctor.name?'Dr. '+appointment.doctor.name:'Doctor Unknown', 
		left: 5,
		font: { fontSize: 15 },
		color: 'black',
		width: '100%',
		height: 45,
		top: 0
	});
	
	var top_line = Ti.UI.createView({ width: '80%', height: 1, top: 45, left: 0, borderColor: 'black' });
	
	var date = Ti.UI.createLabel({
		text: appointment.date,
		textAlign: 1,
		font: { fontSize: 30, fontWeight: 'bold' },
		top: 60,
		width: '100%'
	});
	
	var bottom_line = Ti.UI.createView({ width: '80%', height: 1, bottom: 40, right: 0, borderColor: 'black' });
	
	var status = Ti.UI.createLabel({
		text: status_text,
		right: 5,
		bottom: 10,
		font: { fontSize: 15, },
		backgroundColor: 'none',
	});
 	
	view.add(doctor);
	view.add(top_line);
	view.add(date);
	view.add(bottom_line);
	view.add(status);
	
	view.addEventListener('click', function() {
		var appointmentWindow = require('ui/common/forms/appointment_form');
		appointmentWindow = new appointmentWindow({ appointment: appointment, treatments: treatments });
		appointmentWindow.open();
		
		appointmentWindow.addEventListener('close', function() {
				
			if(appointmentWindow.appointment != null || appointmentWindow.treatment != null)
			{
				appointment = appointmentWindow.appointment;
				treatments = appointmentWindow.treatments;
				doctor.text = appointment.doctor.name?'Dr. '+appointment.doctor.name:'Doctor Unknown';
				date.text = appointment.date;
				
				status_text = (treatments.length > 0)?treatments.length+' treatments prescribed':
								(isValidDateTime(new Date(appointment.date+' '+appointment.time)))?'Scheduled':'Completed';
				status.text = status_text;
			}
			
		});
	});

	
	return view;
	
}

module.exports = appointmentView;
