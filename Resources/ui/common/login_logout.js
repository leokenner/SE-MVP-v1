

function loadDatabase()
{
	Ti.include('ui/common/database/database.js');
	
	//var parent_id = insertUserLocal(null, 'Adarsh', 'Hasija');
	var users = getAllUsersLocal();
	var user = users[0];
	Titanium.App.Properties.setString('user', user.id);
	
	getChildrenACS({ user_id: user.cloud_id });
	
	Ti.App.addEventListener('loadedAppointmentsFromCloud', function() {
		getActivitiesACS();
	});
	
	Ti.App.addEventListener('loadedTreatmentsFromCloud', function() { 
		var children = getAllChildrenLocal();
		if(children.length == 0) {
			var row_id = insertChildLocal(user.id, 'New', 'Child',null,null,null);
			Titanium.App.Properties.setString('child', row_id);
			createObjectACS('children', { id: row_id, user_id: user.id, first_name: 'New', last_name: 'Child' });
		}
		else {
			Titanium.App.Properties.setString('child', children[children.length-1].id);
		}
		Ti.App.fireEvent('databaseLoaded');  
	});  
}


function logout()
{	
	createRecordsACS();
	createEntriesACS();
	
	updateChildrenACS();
	updateRecordsACS();
	updateEntriesACS();
	updateAppointmentsACS();
	updateActivitiesACS();
	updateTreatmentsACS();  
	
	
	deleteAllTreatments();
	deleteAllActivities();  
	deleteAllAppointments();  
	deleteAllEntries();
	deleteAllRecords();
	deleteRelationshipsToUser(Titanium.App.Properties.getString('user'));  
	deleteChildByUserIdLocal(Titanium.App.Properties.getString('user'));  
	logoutUserACS();
}
