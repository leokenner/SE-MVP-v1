

function entry_form(input)
{
	Ti.include('ui/common/helpers/dateTime.js');
	Ti.include('ui/common/helpers/list.js');
	Ti.include('ui/common/database/database.js');
	
	var entry = {
		id: input.id?input.id:null,
		record_id: input.record_id?input.record_id:null,
		main_entry: input.main_entry?input.main_entry:null,
		date: input.date?input.date:timeFormatted(new Date).date,
		time: input.time?input.time:timeFormatted(new Date).time,
		goals: input.goals?input.goals:[],
		activities: input.activities?input.activities:[],
		treatments: input.treatments?input.treatments:[],
	}
	
	var goals_string='';
	for(var i=0;i < entry.goals.length; i++) {
		goals_string += entry.goals[i];
		if(i != entry.goals.length -1) goals_string += ', ';
	}
	
		
	var win = Ti.UI.createWindow({
		title: 'Incident',
		backgroundColor: 'white'
	});
	win.hideTabBar();
	
	var navGroupWindow = require('ui/handheld/ApplicationNavGroup');
	navGroupWindow = new navGroupWindow(win);
	navGroupWindow.result = null;
	
	var cancel_btn = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.CANCEL
	});
	win.leftNavButton = cancel_btn;
	
	cancel_btn.addEventListener('click', function() {
		navGroupWindow.close();
	});
	
	var save_btn = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.SAVE
	});
	win.rightNavButton = save_btn;
	
	save_btn.addEventListener('click', function() {
		if(table.scrollable == false) { return; }
		
		if(main_entry.value == null || main_entry.value == '') {
			alert('You do not seem to have entered anything for entry. Please re-check');
			return;
		}
		
		if(entry.record_id == null) {
			entry.record_id = insertRecordLocal(Titanium.App.Properties.getString('child'));
			entry.id = insertEntryLocal(entry.record_id,main_entry.value,entry.date,location.value);
			updateRecordLocal(entry.record_id,entry.id,'entry',timeFormatted(new Date()).date,timeFormatted(new Date()).time);		
		}
		else if(entry.id == null) {
			entry.id = insertEntryLocal(entry.record_id,main_entry.value,entry.date,location.value);
			updateRecordLocal(entry.record_id,Titanium.App.Properties.getString('child'),entry.id,'entry',timeFormatted(new Date()).date,timeFormatted(new Date()).time);
		}
		else {
			updateEntryLocal(entry.id,main_entry.value,entry.date,location.value);
		}
		deleteGoalsForEntryLocal(entry.id);
		entry.goals.splice(0, entry.goals.length);
		if(goals_field.value != null) {
			if(goals_field.value.length > 1) {
				var final_goals = goals_field.value.split(',');
				for(var i=0;i < final_goals.length; i++) {
					if(final_goals[i].length < 2) continue;
					final_goals[i] = final_goals[i].replace(/^\s\s*/, '');  // Remove Preceding white space
					insertGoalForEntryLocal(entry.id,final_goals[i]);
					entry.goals.push(final_goals[i]);
				}
			}
		}
		
		entry.main_entry = main_entry.value;
		entry.location = location.value;
		navGroupWindow.result = entry;
		navGroupWindow.close();
	});
	
	
	var table = Ti.UI.createTableView({
		style: 1,
		showVerticalScrollIndicator: false,
		rowHeight: 45,
	});
	
	var sectionDate = Ti.UI.createTableViewSection({ headerTitle: 'When did it happen?'});
	sectionDate.add(Ti.UI.createTableViewRow({ title: 'Date' }));
	var dateTime = Titanium.UI.createLabel({ text: entry.date, width: '50%', left: '35%' });
	sectionDate.rows[0].add(dateTime);
	
	var sectionMain = Ti.UI.createTableViewSection({ headerTitle: 'Main entry(required)'});
	sectionMain.add(Ti.UI.createTableViewRow({ height: 160 })); 
	var main_entry = Titanium.UI.createTextArea({ hintText: 'Enter here', value: entry.main_entry, width: '100%', top: 5, font: { fontSize: 17 }, height: 140, borderRadius: 10 });
	sectionMain.rows[0].add(main_entry);
	
	var sectionLocation = Ti.UI.createTableViewSection({ headerTitle: 'Where did it occur?' });
	sectionLocation.add(Ti.UI.createTableViewRow({ title: 'Location' }));
	var location = Titanium.UI.createTextField({ hintText: 'eg: home', value: entry.location, width: '50%', left: '35%' });
	sectionLocation.rows[0].add(location);
	
	var sectionGoals = Ti.UI.createTableViewSection({ headerTitle: '*Goals (list using commas)' });
	sectionGoals.add(Ti.UI.createTableViewRow({ height: 90, selectedBackgroundColor: 'white' }));
	var goals_field = Titanium.UI.createTextArea({ hintText: 'Seperate each goal by comma', value: goals_string, width: '100%', top: 5, font: { fontSize: 17 }, height: 70, borderRadius: 10 });
	sectionGoals.rows[0].add(goals_field);
	
	
	table.data = [sectionDate, sectionMain, sectionLocation];
	
	win.add(table);
	

dateTime.addEventListener('click', function(e) {
	
	modalPicker = require('ui/common/helpers/modalPicker');
	var modalPicker = new modalPicker(Ti.UI.PICKER_TYPE_DATE,'incident',dateTime.text); 

	if(win.leftNavButton != null) { 
		win.leftNavButton.setTouchEnabled(false);
	}
	win.rightNavButton.setTouchEnabled(false); 
	win.setTouchEnabled(false);
	table.scrollable = false;

	modalPicker.open();


	modalPicker.addEventListener('close', function() {
		var newDate = timeFormatted(modalPicker.result);
		entry.date = newDate.date;
		dateTime.text = newDate.date;
		win.setTouchEnabled(true);
		if(win.leftNavButton != null) { 
			win.leftNavButton.setTouchEnabled(true);
		}
		win.rightNavButton.setTouchEnabled(true); 
		table.scrollable = true;
	});
});


return navGroupWindow;	
	
}

module.exports = entry_form;
