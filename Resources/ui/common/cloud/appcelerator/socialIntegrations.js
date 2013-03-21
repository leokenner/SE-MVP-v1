


function externalAccountLoginACS() 
{ 
	Cloud.SocialIntegrations.externalAccountLogin({
	    			type: 'facebook',
	   				 token: Ti.Facebook.accessToken
				}, function (g) {
	   				 if (g.success) {
	   				 	initDBLocal();
	   				 	Ti.API.info('local database initialized: socialIntegrations.js');
	   				 	
	   				 	deleteAllTreatments();
						deleteAllActivities();  
						deleteAllAppointments();  
						deleteAllEntries();
						deleteAllRecords();
						deleteAllRelationships();
						deleteAllChildren();
						deleteAllUsers();
	   				 						
	   			 		var user = g.users[0];
	   			 		user.first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
	   			 		user.last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);
	   			 		var user_id = insertUserLocal('"'+user.id+'"', user.first_name, user.last_name);
	   			 		Ti.App.fireEvent('userLoggedIn');
	    			}
	    			else {
	    			}
	   });
}