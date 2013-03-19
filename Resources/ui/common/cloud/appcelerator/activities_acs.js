var Cloud = require('ti.cloud');

function getActivitiesACS()
{
	var user = getUserLocal(Titanium.App.Properties.getString('user'));
	
	Cloud.Objects.query({ classname: 'activities', where: { user_id: user[0].cloud_id } }, 
		function (e) {
    		if (e.success) { 
    			for(var i=e.activities.length-1;i > -1 ;i--) { 
				    var activity = e.activities[i];
				    var goals = e.activities[i].goals;
				    
				    if(activity.appointment_id != null && activity.appointment_id != undefined) {
				    	var appointment = getAppointmentByCloudIdLocal(activity.appointment_id);
				    	activity.entry_id = null; 
						var activity_local_id = insertActivityLocal(activity.entry_id, '"'+appointment[0].id+'"', activity.main_activity, 
																activity.start_date, activity.end_date, activity.location, activity.frequency);
					}
					else {
						var entry = getEntryByCloudIdLocal(activity.entry_id);
						activity.appointment_id = null;
						var activity_local_id = insertActivityLocal('"'+entry[0].id+'"', activity.appointment_id, activity.main_activity, 
																activity.start_date, activity.end_date, activity.location, activity.frequency);
					}
					updateActivitySuccessStatus(activity_local_id, activity.successful);
					updateActivityEndNotes(activity_local_id, activity.end_notes);
					updateActivityCloudIdLocal(activity_local_id, activity.id);
					for(var j=0; j < goals.length; j++) {
						insertGoalForActivityLocal(activity_local_id, goals[j]);
					}
				}
				getTreatmentsACS(); 
			}
     		else alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	});
}


function updateActivitiesACS()
{
	var user = getUserLocal(Titanium.App.Properties.getString('user'));
	user = user[0];
	
	var activities = getAllActivitiesLocal();
		
	for(var i=0;i < activities.length; i++) {
		var goals = getGoalsOfActivityLocal(activities[i].id);
		for(var j=0; j < goals.length; j++) {
			goals[j].user_id = user.cloud_id;
		}
		activities[i].goals = goals;
		
		if(activities[i].appointment_id) activities[i].appointment_id = getAppointmentLocal(activities[i].appointment_id)[0].cloud_id;
		else activities[i].entry_id = getEntryLocal(activities[i].entry_id)[0].cloud_id;
		 
		if(activities[i].cloud_id) { 
			Cloud.Objects.update({
				    classname: 'activities',
				    id: activities[i].cloud_id,
				    fields: activities[i],
				}, function (e) {
				    if (e.success) {
				 		
				    } else {
				        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				    }
			});
		}
		else {
			//activities[i].user_id = user.cloud_id;
			//createObjectACS('activities', activities[i]);
		}
	}
}