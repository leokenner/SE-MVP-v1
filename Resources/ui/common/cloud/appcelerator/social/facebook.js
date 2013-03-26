

Ti.Facebook.appid = '430480410336850';
Ti.Facebook.permissions = ['publish_actions', 'user_likes'];
Ti.Facebook.addEventListener('login', function(f) {
    if(f.success) {
 		var user = externalAccountLoginACS();
	  
    }		
    else {
    	Ti.App.fireEvent('FBloginClosed')
    }
});


function facebookGraphRequestACS(path, params, httpMethod)
{ 
	Ti.Facebook.requestWithGraphPath(path, params, httpMethod, function(e) {
		   			if(e.success) {
		   			 	var data= JSON.parse(e.result);
		   			 	alert(data);
		    			//updateUserACS(data);
		   			 }
		   			 else if(e.error) {
		   			 	Ti.API.info(e.error);
		   			 } 	
	});
}

function facebookDialog(type, data)
{
	Titanium.Facebook.dialog(type, data, function(e) {
	    if(e.success && e.result) {
	        alert("Success! New Post ID: " + e.result);
	    } else {
	        if(e.error) {
	            alert(e.error);
	        } else {
	            alert("User canceled dialog.");
	        }
	    }
	});
}
