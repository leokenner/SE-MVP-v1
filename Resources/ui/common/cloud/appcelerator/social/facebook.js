

Ti.Facebook.appid = '430480410336850';
Ti.Facebook.permissions = ['publish_actions'];
Ti.Facebook.addEventListener('login', function(f) {
    if(f.success) {
 		var user = externalAccountLoginACS();
 		if(!user.email) {
	   		Ti.API.info('first time user, need to get username and email from facebook: facebook.js');
	   		//var data = facebookGraphRequestACS('me',{},'GET'); 
	   		//updateUserACS(data);
	   		//updateUserLocal(user.local_id,user.first_name,user.last_name,data.email);	   		
	    }  
	    else {
	    	Ti.API.info('email and username already exist in cloud: facebook.js');
	    	//updateUserLocal(user.local_id,user.first_name,user.last_name,user.email);	
	    }
	  
	  Titanium.App.fireEvent('userLoggedIn');
    }		
    else {
    	alert('Error, please try again');
    }
});


function facebookGraphRequestACS(path, params, httpMethod)
{ 
	Ti.Facebook.requestWithGraphPath(path, params, httpMethod, function(e) {
		   			if(e.success) {
		   			 	var data= JSON.parse(e.result);
		    			updateUserACS(data);
		   			 }
		   			 else if(e.error) {
		   			 	Ti.API.info(e.error);
		   			 } 	
	});
}