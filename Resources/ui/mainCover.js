

function mainCover() {
var Cloud = require('ti.cloud');


Ti.include('ui/common/database/database.js');
Ti.include('ui/common/cloud/appcelerator/users_acs.js');
Ti.include('ui/common/cloud/appcelerator/social/facebook.js');
Ti.include('ui/common/cloud/appcelerator/socialIntegrations.js');
Ti.include('ui/common/cloud/appcelerator/objects.js');
Ti.include('ui/common/cloud/appcelerator/children_acs.js');
Ti.include('ui/common/cloud/appcelerator/records_acs.js');
Ti.include('ui/common/cloud/appcelerator/entries_acs.js');
Ti.include('ui/common/cloud/appcelerator/appointments_acs.js');
Ti.include('ui/common/cloud/appcelerator/activities_acs.js');
Ti.include('ui/common/cloud/appcelerator/treatments_acs.js');	

	//create module instance
	var self = Ti.UI.createWindow({
		backgroundColor: 'white',
	});
	
	var fb_login_buttons = function() {
		if(Titanium.App.Properties.getObject('loggedInUser')) {
			var user = Titanium.App.Properties.getObject('loggedInUser');
			fblogin_existing.labels = ['Login as '+user.first_name+' '+user.last_name];
			existinguser_lbl.text = 'Not '+user.first_name+'?';
			fblogin_existing.show();
			existinguser_lbl.show();
		}
		else {   
			fblogin_existing.hide();
			existinguser_lbl.hide();
		}   
	}
	
	Ti.App.addEventListener('FBloginClosed', fb_login_buttons);
	
	self.addEventListener('focus', fb_login_buttons);
	
	var name = Ti.UI.createLabel({
		text: 'StarsEarth',
		textAlign: 1,
		top: 50,
		font: { fontSize: 40, fontFamily: 'DroidSans', },
		width: '100%',
	});
	self.add(name);
	
	var about = Ti.UI.createLabel({
		text: 'About',
		textAlign: 1,
		top: 100,
	});
	self.add(about);
	
	var starsearth_description = function() {
		var modalWindow = Ti.UI.createWindow({
			modal: 1,
			title: 'About StarsEarth',
			backgroundColor: 'white',
		});
		
		var done_btn = Ti.UI.createButton({
			systemButton: Titanium.UI.iPhone.SystemButton.DONE,
		});
		modalWindow.rightNavButton = done_btn;
		
		done_btn.addEventListener('click', function() {
			modalWindow.close();
		});
		
		var main_txt = Ti.UI.createLabel({
			top: 10,
			textAlign: 1,
			width: '95%',
			text: "StarsEarth is a mobile journal that allows you to track your child's development. "+
					"You can use StarsEarth to record issues that you see in your child's daily life, "+
					"from medical to social to academic. StarsEarth allows you to record any story, as "+
					"well as any event that takes place around that story, such as appointments with specialists, "+
					"or activities or treatments that have been planned to help solve the issue.\n\n"+
					"With StarsEarth, all the important information regarding your child's growth and development is "+
					"just a click away.",
		});
		modalWindow.add(main_txt);
		
		modalWindow.open();
	}
	
	name.addEventListener('click', starsearth_description);
	about.addEventListener('click', starsearth_description);
	
	var background_img = Ti.UI.createImageView({
		image: 'family.png',
		zIndex: 1,
		bottom: 0,
		left: 0,
	});
	self.add(background_img);
	
	var fblogin_existing = Titanium.UI.createButtonBar({
	height: 40,
	width: '70%',
	top: '30%',
	backgroundColor: 'blue',
	zIndex: 2,
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});
	fblogin_existing.hide();
	
	fblogin_existing.addEventListener('click', function() {
		if(!Titanium.Network.online) {
			alert('You are not connected to the internet');
			return;
		}
		if(Titanium.Facebook.loggedIn) { Ti.Facebook.logout(); }
		Ti.Facebook.authorize();
	});
	self.add(fblogin_existing);
	
	var existinguser_lbl = Titanium.UI.createLabel({
	height: 30,
	width: '70%',
	top: '45%',
	backgroundColor: 'none',
	color: 'blue',
	textAlign: 1,
	zIndex: 2,
	});
	self.add(existinguser_lbl);
	existinguser_lbl.hide();
	
	var fblogin_new = Titanium.UI.createButtonBar({
	labels:['Login with Facebook'],
	height: 40,
	width: '70%',
	top: '55%',
	backgroundColor: 'blue',
	zIndex: 2,
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});

	fblogin_new.addEventListener('click', function() {
		if(!Titanium.Network.online) {
			alert('You are not connected to the internet');
			return;
		}
		if(Titanium.Facebook.loggedIn) { Ti.Facebook.logout(); }
		Titanium.App.Properties.setObject('loggedInUser', null);
		var url = 'https://login.facebook.com';
		var client = Titanium.Network.createHTTPClient();
		client.clearCookies(url);
		Ti.Facebook.authorize();
	});
	self.add(fblogin_new);
	
	var login_btn = Titanium.UI.createButtonBar({
	labels:['Login'],
	height: 30,
	width: '25%',
	top: '70%',
	left: '20%',
	backgroundColor: 'blue',
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});	
	//self.add(login_btn);
	
	login_btn.addEventListener('click', function() {
		loginUserACS('abc@abc.com','abc123'); 	
	});
	
	
	var fb_button = Ti.Facebook.createLoginButton({
    bottom : '10%',
    zIndex: 2,
    style : Ti.Facebook.BUTTON_STYLE_WIDE,
	});

	//self.add(fb_button);  
	
	return self;
};

module.exports = mainCover;