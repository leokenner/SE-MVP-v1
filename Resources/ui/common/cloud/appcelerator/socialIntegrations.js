


function externalAccountLoginACS() 
{ 
	Cloud.SocialIntegrations.externalAccountLogin({
	    			type: 'facebook',
	   				 token: Ti.Facebook.accessToken
				}, function (g) {
	   				 if (g.success) {
	   				 	initDBLocal();
	   				 	Ti.API.info('local database initialized: socialIntegrations.js');
	   				 						
	   			 		var user = g.users[0];
	   			 		var user_id = insertUserLocal(user.id, user.first_name, user.last_name);
	   			 		Ti.App.Properties.setString('user', user_id);
	   			 		user.local_id = user_id;
	   			 		return user;
	    			}
	    			else {
	    			}
	   });
}