
function recordView(input)
{
	Ti.include('ui/common/database/database.js');
	
	
	var table = Ti.UI.createTableView({
		borderColor: 'black',
		height: 45,
	});

	
	if(input)
	{
		if(input.entry) { 
			var row = Ti.UI.createTableViewRow();
			var entryView = require('ui/common/views/entryView');
			input.entry.activities = getActivitiesForEntryLocal(input.entry.id);
			for(var i=0;i<input.entry.activities.length;i++) {
				input.entry.activities[i].goals = getGoalsOfActivityLocal(input.entry.activities[i].id);
			}
			input.entry.treatments = getTreatmentsForEntryLocal(input.entry.id);
			for(var i=0;i<input.entry.treatments.length;i++) {
				input.entry.treatments[i].symptoms = getSymptomsOfTreatmentLocal(input.entry.treatments[i].id);
				input.entry.treatments[i].sideEffects = getSideEffectsOfTreatmentLocal(input.entry.treatments[i].id);
			}
			entryView = new entryView(input.entry);
			row.add(entryView);
			
			row.setHeight(entryView.height);
			table.appendRow(row);
			table.setHeight(row.height+table.height);
			
			var full_record = getAppointmentsForIncidentLocal(input.entry.id);
			for(var i=0;i < full_record.length; i++) {
				var appointment = full_record[i];
				var doctor = getDoctorByAppointmentLocal(appointment.id);
				appointment.doctor = doctor[0];
				appointment.symptoms = getSymptomsOfAppointmentLocal(appointment.id);
				var treatments = getTreatmentsForAppointmentLocal(appointment.id);
				for(var i=0;i<treatments.length;i++) {
					treatments[i].symptoms = getSymptomsOfTreatmentLocal(treatments[i].id);
					treatments[i].sideEffects = getSideEffectsOfTreatmentLocal(treatments[i].id);
				}
				
				
				var appointmentView = require('ui/common/views/appointmentView');
				appointmentView = new appointmentView({ appointment: appointment, treatments: treatments });
			
				var row = Ti.UI.createTableViewRow();
				row.add(appointmentView);
				table.appendRow(row);
				table.setHeight(table.height+appointmentView.height);
				Ti.App.fireEvent('eventAdded');
			}
		}
		
		
	/*	if(input.incident) { 
			var row = Ti.UI.createTableViewRow();
			var incidentView = require('ui/common/views/incidentView');
			incidentView = new incidentView(input.incident);
			row.add(incidentView);
			
			row.setHeight(incidentView.height);
			table.appendRow(row);
			table.setHeight(200+table.height);
			
			var full_record = getAppointmentsForIncidentLocal(input.incident.id);
			for(var i=0;i < full_record.length; i++) {
				var appointment = full_record[i];
				var doctor = getDoctorByAppointmentLocal(appointment.id);
				appointment.doctor = doctor[0];
				appointment.symptoms = getSymptomsOfAppointmentLocal(appointment.id);
				var treatments = getTreatmentsForAppointmentLocal(appointment.id);
				for(var i=0;i<treatments.length;i++) {
					treatments[i].symptoms = getSymptomsOfTreatmentLocal(treatments[i].id);
					treatments[i].sideEffects = getSideEffectsOfTreatmentLocal(treatments[i].id);
				}
				
				
				var appointmentView = require('ui/common/views/appointmentView');
				appointmentView = new appointmentView({ appointment: appointment, treatments: treatments });
			
				var row = Ti.UI.createTableViewRow();
				row.add(appointmentView);
				table.appendRow(row);
				table.setHeight(table.height+appointmentView.height);
				Ti.App.fireEvent('eventAdded');
			}
		}  */
	}
	
	var footerView = Ti.UI.createView({ height: '45', width: '100%' });
	
	var newAppointment_btn = Ti.UI.createLabel({
		text: 'New Appointment',
		textAlign: 1,
		backgroundColor: 'white',
		font: { fontWeigth: 'bold' },
		color: 'black',
		width: '100%',
		height: 45,
		borderColor: 'black',
		left: 0
	});
	footerView.add(newAppointment_btn);
	
	newAppointment_btn.addEventListener('click', function() {
		var appointment_form = require('ui/common/forms/appointment_form');
		var appointment = { id: null, incident_id: input.incident.id };
		var treatments = null;
		appointment_form = new appointment_form({ appointment: appointment, treatments: treatments });
		appointment_form.open();
		
		appointment_form.addEventListener('close', function() {
			if(appointment_form.appointment != null || appointment_form.treatments != null) { 
				var appointment = require('ui/common/views/appointmentView');
				appointment = new appointment({ appointment: appointment_form.appointment, treatments: appointment_form.treatments });
			
				var row = Ti.UI.createTableViewRow();
				row.add(appointment);
				table.appendRow(row);
				table.setHeight(table.height+150);
				Ti.App.fireEvent('eventAdded');
			}
		});
	}); 
	
	table.setFooterView(footerView);
	
	return table;
}

module.exports = recordView;
