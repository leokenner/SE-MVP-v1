


function treatmentOutcome(input)
{

	Ti.include('ui/common/helpers/dateTime.js');
	Ti.include('ui/common/helpers/list.js');
	Ti.include('ui/common/database/database.js');

var navGroupWindow = input.navGroupWindow;
var treatment = input.treatment;

var switcher_value = treatment.successful?treatment.successful:false;
	
var self = Titanium.UI.createWindow({
  backgroundColor:'white',
  title: 'Outcome',
  height: 'auto'
});
self.result = null;


var save_btn = Titanium.UI.createButton({
	systemButton: Ti.UI.iPhone.SystemButton.SAVE
});
self.rightNavButton = save_btn;

save_btn.addEventListener('click', function() {
	updateTreatmentSuccessStatus(treatment.id,switcher.value);
	deleteSideEffectsForTreatmentLocal(treatment.id);
	treatment.sideEffects.splice(0, treatment.sideEffects.length);
	
	for(var i=1;i < sectionSideEffects.rows.length;i++) {
		insertSideEffectForTreatmentLocal(treatment.id,sectionSideEffects.rows[i].children[0].value);
		treatment.sideEffects.push(sectionSideEffects.rows[i].children[0].value);
	}
	
	treatment.successful = switcher.value;
	self.result = treatment;
	var record_incident_id = getAppointmentLocal(treatment.appointment_id)[0].incident_id;
	updateRecordTimesForIncidentLocal(record_incident_id,timeFormatted(new Date()).date,timeFormatted(new Date()).time);
	navGroupWindow.getChildren()[0].close(self);
});

var table = Titanium.UI.createTableView({
	width: '99%',
	showVerticalScrollIndicator: false,
	rowHeight: 45,
	style: 1
});

var sectionSuccess = Ti.UI.createTableViewSection();
sectionSuccess.add(Ti.UI.createTableViewRow({ title: 'Successful?' ,  selectedBackgroundColor: 'white' }));
var switcher = Titanium.UI.createSwitch({ value: switcher_value, right: 10 });
sectionSuccess.rows[0].add(switcher);

var sectionSideEffects = Ti.UI.createTableViewSection({ headerTitle: 'Any side effects?' });
sectionSideEffects.add(Ti.UI.createTableViewRow({ height: 45, selectedBackgroundColor: 'white' }));
var sideEffects_field = Titanium.UI.createTextField({ hintText: 'List here, one per line', width: '99%', color: 'black', left: '1%' });
sectionSideEffects.rows[0].add(sideEffects_field);

var new_sideEffect;

for(var i=0;i < treatment.sideEffects.length; i++) {
		new_sideEffect = Titanium.UI.createTextField({ value: treatment.sideEffects[i], width: '99%', color: 'black', left: '1%' });
		
		new_sideEffect.addEventListener('blur', function(e) {
			if(e.value.length < 1) {
				var length = sectionSideEffects.rowCount;
				for(var i=length-1;i>0;i--) {
					if(sectionSideEffects.rows[i].children[0].value.length < 1) {	
						sectionSideEffects.remove(sectionSideEffects.rows[i]);
					}
				}
				table.data = [sectionSuccess, sectionSideEffects];
			} 
		}); 
		
		sectionSideEffects.add(Ti.UI.createTableViewRow({ height: 45, selectedBackgroundColor: 'white' }));
		sectionSideEffects.rows[sectionSideEffects.rowCount-1].add(new_sideEffect);
}


table.data = [sectionSuccess, sectionSideEffects];
self.add(table);



sideEffects_field.addEventListener('blur', function() {
	if(sideEffects_field.value.length > 0)   {
		for(var i=sectionSideEffects.rows.length-1;i > 0; i--)   {
			if(sideEffects_field.value.toLowerCase() == sectionSideEffects.rows[i].children[0].value.toLowerCase())   {
				sideEffects_field.value = '';
				return;
			}
		}
		new_sideEffect = Titanium.UI.createTextField({ value: sideEffects_field.value, width: '99%', color: 'black', left: '1%' });
		
		new_sideEffect.addEventListener('blur', function(e) {
			if(e.value.length < 1) {
				var length = sectionSideEffects.rowCount;
				for(var i=length-1;i>0;i--) {
					if(sectionSideEffects.rows[i].children[0].value.length < 1) {	
						sectionSideEffects.remove(sectionSideEffects.rows[i]);
					}
				}
				table.data = [sectionSuccess, sectionSideEffects];
			} 
		});  
		
		sectionSideEffects.add(Ti.UI.createTableViewRow({ height: 45, selectedBackgroundColor: 'white' }));
		sectionSideEffects.rows[sectionSideEffects.rowCount-1].add(new_sideEffect);
		sideEffects_field.value = '';
	}
	table.data = [sectionSuccess, sectionSideEffects];
});


return self;
	
}

module.exports = treatmentOutcome;
