var Cloud = require('ti.cloud');

function getEntriesACS(query, record_local_id, latest_date, latest_time)
{
	Cloud.Objects.query({ classname: 'entries', where: query }, 
		function (e) {
    		if (e.success) { 
    			for(var i=e.entries.length-1;i > -1 ;i--) { 
				    var entry = e.entries[i];
					var entry_local_id = insertEntryLocal(record_local_id, entry.main_entry, entry.date, entry.location);
					updateEntryCloudIdLocal(entry_local_id, entry.id);
					updateRecordLocal(record_local_id, entry_local_id, 'entry', latest_date, latest_time);
					getAppointmentsACS({ user_id: query.user_id, entry_id: entry.id, }, entry_local_id);
					
				}
			}
     		else alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	});
}


function updateEntriesACS()
{
	var user = getUserLocal(Titanium.App.Properties.getString('user'));
	user = user[0];
	
	var entries = getAllEntriesLocal();
		
	for(var i=0;i < entries.length; i++) {	
		
		//entries[i].local_id = entries[i].id;
		entries[i].record_id = getRecordByIdLocal(entries[i].record_id)[0].cloud_id;
		 
		if(entries[i].cloud_id) {
			Cloud.Objects.update({
				    classname: 'entries',
				    id: entries[i].cloud_id,
				    fields: entries[i],
				}, function (e) {
				    if (e.success) {
				 		
				    } else {
				        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e))+' entries');
				    }
			});
		}
		else {
			//entries[i].local_id = entries[i].id;
			//entries[i].user_id = user.cloud_id;
			//createObjectACS('entries', entries[i]);
		}
	}
}


function createEntriesACS()
{
	var entries = getAllEntriesLocal();
	
	for(var i=0; i < entries.length; i++) {
		if(!entries[i].cloud_id) {
			createObjectACS('entries', entries[i]);
		}
	}
}