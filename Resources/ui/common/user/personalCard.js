


function personalCard() {
	Ti.include('ui/common/database/database.js');
	Ti.include('ui/common/helpers/dateTime.js');
	
	function normalView()
	{
		var child = getChildLocal(Titanium.App.Properties.getString('child'));
		child = child[0];
		
		name = child.first_name+' '+child.last_name;
		sex = child.sex?child.sex:'Unknown';
		calculated_age = (child.date_of_birth == null)?calculateAge(new Date(child.date_of_birth),new Date()):'Unknown';
		age.text = calculated_age;
		diagnosis.text = child.diagnosis?child.diagnosis:'Unknown';
	}

	var child = getChildLocal(Titanium.App.Properties.getString('child'));
	child = child[0];
	var user = getUserLocal(child.user_id);
	user = user[0];
	
	var relationship = getRelationshipLocal(Titanium.App.Properties.getString('user'), Titanium.App.Properties.getString('child'));
	relationship = {
		id: user.id,
		name: user.first_name+' '+user.last_name,
		relation: relationship?relationship:'Relation Unknow: Tap to change'
	}
	child.relationship = relationship; 
	
	var table = Ti.UI.createTableView({
		backgroundColor: 'white',
		borderColor: 'black',
		rowHeight: 45,
	});
	
	var row = Ti.UI.createTableViewRow({ title: 'Personal Card', backgroundColor: 'blue', color: 'white' });
	var right_btn = Ti.UI.createLabel({ 
		text: 'Edit', 
		backgroundColor: 'blue', 
		color: 'white', 
		borderColor: 'white', 
		width: '20%', 
		height: 45,
		font: { fontWeight: 'bold' },
		textAlign: 1,
		right: 0 
		});
		
	right_btn.addEventListener('click', function() { 
			var profile = require('ui/common/forms/profile_form');
			profile = new profile(child);
			profile.open();
			
			profile.addEventListener('close', function() {
				if(profile.result) {
					child = profile.result;
					
					name.text = profile.result.first_name+' '+profile.result.last_name;
					sex.text = child.sex?child.sex:'Unknown';
					age.text = child.date_of_birth?calculateAge(new Date(child.date_of_birth),new Date()):'Unknown';
					diagnosis.text = child.diagnosis?child.diagnosis:'Unknown';
				}
			}); 
		
	});	
		
	row.add(right_btn);
	table.appendRow(row);
	table.appendRow(Ti.UI.createTableViewRow({ title: 'Name' }));
	table.appendRow(Ti.UI.createTableViewRow({ title: 'Sex' }));
	table.appendRow(Ti.UI.createTableViewRow({ title: 'Age' }));
	table.appendRow(Ti.UI.createTableViewRow({ title: 'Diagnosis' }));
	
	var name = Ti.UI.createLabel({ text: child.first_name+' '+child.last_name, left: '45%', width: '55%' });
	var sex = Ti.UI.createLabel({ 
						text: child.sex?child.sex:'Unknown',
						left: '45%', 
						width: '55%' 
						});
						
	var calculated_age = child.date_of_birth?calculateAge(new Date(child.date_of_birth),new Date()):'Unknown';
	
						
	var age = Ti.UI.createLabel({ 
						text: calculated_age, 
						left: '45%', 
						width: '55%' 
						});
	var diagnosis = Ti.UI.createLabel({ 
						text: child.diagnosis?child.diagnosis:'Unknown',
						left: '45%', 
						width: '55%' 
						});
	
	table.sections[0].rows[1].add(name);
	table.sections[0].rows[2].add(sex);
	table.sections[0].rows[3].add(age);
	table.sections[0].rows[4].add(diagnosis);
	
	table.setHeight(table.sections[0].rows.length*45);
	
	Ti.App.addEventListener('changeUser', function() {
		normalView();
	});
	
	
	return table;
	
}

module.exports = personalCard;
