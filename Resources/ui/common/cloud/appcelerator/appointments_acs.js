var Cloud = require('ti.cloud');

function getAppointmentsACS(query, entry_local_id)
{
	Cloud.Objects.query({ classname: 'appointments', where: query }, 
		function (e) {
    		if (e.success) { 
    			for(var i=e.appointments.length-1;i > -1 ;i--) { 
				    var appointment = e.appointments[i];
				    var doctor = e.appointments[i].doctor;
				    var symptoms = e.appointments[i].symptoms;
					var appointment_local_id = insertAppointmentLocal(entry_local_id, appointment.date, appointment.time, appointment.diagnosis);
					updateAppointmentCompleteStatus(appointment_local_id, appointment.complete);
					updateAppointmentCloudIdLocal(appointment_local_id, appointment.id);
					insertDoctorForAppointmentLocal(appointment_local_id, doctor.name, doctor.location, doctor.street, doctor.city, doctor.state, doctor.zip, doctor.country);
					updateAppointmentCompleteStatus(appointment_local_id, appointment.complete);
					for(var j=0; j < symptoms.length; j++) {
						insertSymptomForAppointmentLocal(appointment_local_id, symptoms[j]);
					}
				}
				Ti.App.fireEvent('loadedAppointmentsFromCloud');
				 
			}
     		else alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	});
}


function updateAppointmentsACS()
{
	var user = getUserLocal(Titanium.App.Properties.getString('user'));
	user = user[0];
	
	var appointments = getAllAppointmentsLocal();
		
	for(var i=0;i < appointments.length; i++) {
		var doctors = getDoctorByAppointmentLocal(appointments[i].id);
		var doctor = doctors[0];
		appointments[i].doctor = doctor;
		
		var symptoms = getSymptomsOfAppointmentLocal(appointments[i].id);
		for(var j=0; j < symptoms.length; j++) {
			symptoms[j].user_id = user.cloud_id;
		}
		appointments[i].symptoms = symptoms;
		
		appointments[i].entry_id = getEntryLocal(appointments[i].entry_id)[0].cloud_id;
		 
		if(appointments[i].cloud_id) { 
			Cloud.Objects.update({
				    classname: 'appointments',
				    id: appointments[i].cloud_id,
				    fields: appointments[i],
				}, function (e) {
				    if (e.success) {
				 		
				    } else {
				        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				    }
			});
		}
		else {
			//appointments[i].user_id = user.cloud_id;
			//createObjectACS('appointments', appointments[i]);
		}
	}
}