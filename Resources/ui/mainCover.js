

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
	
	var table = Ti.UI.createTableView({
		style: 1,
		backgroundColor: 'white',
		top: '10%',
		width: '70%',
		rowHeight: 45,
	});
	
	
	var lastName_row = Ti.UI.createTableViewRow();
	var last_name = Ti.UI.createTextField({ hintText: 'Last Name', width: '100%', left: 0, });
	lastName_row.add(last_name);
	var firstName_row = Ti.UI.createTableViewRow();
	var first_name = Ti.UI.createTextField({ hintText: 'First Name', width: '100%', left: 0, });
	firstName_row.add(first_name);
	var email_row = Ti.UI.createTableViewRow();
	var email = Ti.UI.createTextField({ hintText: 'Email address', width: '100%', left: 0, });
	email_row.add(email);
	var password_row = Ti.UI.createTableViewRow();
	var password = Titanium.UI.createTextField({ hintText: 'Password', width: '100%', left: 0, passwordMask: true, });
	password_row.add(password);
	var passwordConfirm_row = Ti.UI.createTableViewRow();
	var password_confirm = Ti.UI.createTextField({ hintText: 'Password', width: '100%', left: 0, passwordMask: 1, });
	passwordConfirm_row.add(password_confirm);
	
	table.appendRow(lastName_row);
	table.appendRow(firstName_row);
	table.appendRow(email_row);
	table.appendRow(password_row);
	table.appendRow(passwordConfirm_row);
	self.add(table);
	
	var fb_button = Ti.Facebook.createLoginButton({
    top : '45%',
    style : Ti.Facebook.BUTTON_STYLE_WIDE
	});

	self.add(fb_button);
	
	var login_btn = Titanium.UI.createButtonBar({
	labels:['Login'],
	height: 30,
	width: '25%',
	top: '70%',
	left: '20%',
	backgroundColor: 'blue',
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});
	
	var createUser_btn = Titanium.UI.createButtonBar({
	labels:['New User'],
	height: 30,
	width: '25%',
	top: '70%',
	left: '60%',
	backgroundColor: 'blue',
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});
	
	self.add(login_btn);
	self.add(createUser_btn);
	
	login_btn.addEventListener('click', function() {
		email.value = 'abc@abc.com';
		password.value = 'abc123';
		if(!loginUserACS(email.value,password.value)) {		
		}
		
	/*	var user = createUserACS(last_name.value, first_name.value, email.value, password.value, password_confirm.value);
		
		if(user != null) {
			if(loginUserACS(email.value, password.value)) {
				alert('Login Successful');
			}
			else {
				alert('Login failed');
			}
		}
		else {
			alert('Creation failed');
		} */
		
	});
	
	
	var fblogin_btn = Titanium.UI.createButtonBar({
	labels:['Login with Facebook'],
	height: 30,
	width: '50%',
	top: '55%',
	backgroundColor: 'blue',
	style: Titanium.UI.iPhone.SystemButtonStyle.BAR
	});

	fblogin_btn.addEventListener('click', function() {		
		Ti.Facebook.authorize();
	});
	
	self.add(fblogin_btn);
	
	return self;
};

module.exports = mainCover;