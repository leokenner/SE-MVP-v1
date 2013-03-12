


function initAppointmentsDBLocal()
{
	Ti.include('ui/common/database/database.js');
	
	db.execute('CREATE TABLE IF NOT EXISTS appointments (ID INTEGER PRIMARY KEY AUTOINCREMENT, INCIDENT_ID INTEGER NOT NULL, DATE TEXT NOT NULL, TIME TEXT NOT NULL, COMPLETE INTEGER, DIAGNOSIS TEXT, FOREIGN KEY(INCIDENT_ID) REFERENCES incidents (ID))');
	db.execute('CREATE TABLE IF NOT EXISTS appointment_doctors (APPOINTMENT_ID INTEGER NOT NULL, NAME TEXT, LOCATION TEXT, STREET TEXT, CITY TEXT, STATE TEXT, ZIP INTEGER, COUNTRY TEXT, FOREIGN KEY(APPOINTMENT_ID) REFERENCES appointments (ID))');
	db.execute('CREATE TABLE IF NOT EXISTS appointment_symptoms (APPOINTMENT_ID INTEGER NOT NULL, SYMPTOM TEXT NOT NULL, FOREIGN KEY(APPOINTMENT_ID) REFERENCES appointments (ID))');

}


function insertAppointmentLocal(incident_id,date, time, diagnosis) 
{ 
	var sql = "INSERT INTO appointments (incident_id, date, time, diagnosis) VALUES ("; 
	sql = sql + "'" + incident_id + "', ";
	sql = sql + "'" + date.replace("'", "''") + "', ";
	sql = sql + "'" + time.replace("'", "''") + "', ";	 
	sql = sql + "'" + diagnosis + "')";
	db.execute(sql); 
	
	return db.lastInsertRowId; 
}


function insertDoctorForAppointmentLocal(appointment_id, name, location, street, city, state, zip, country) 
{ 
	var sql = "INSERT INTO appointment_doctors (appointment_id, name, location, street, city, state, zip, country) VALUES ("; 
	sql = sql + "'" + appointment_id + "', ";
	sql = sql + "'" + name.replace("'", "''") + "', ";
	sql = sql + "'" + location + "', ";
	sql = sql + "'" + street + "', ";
	sql = sql + "'" + city + "', ";
	sql = sql + "'" + state + "', ";
	sql = sql + "'" + zip + "', "; 	 
	sql = sql + "'" + country + "')";
	db.execute(sql); 
	
	return db.lastInsertRowId; 
}

function insertSymptomForAppointmentLocal(appointment_id, symptom)
{
	var sql = "INSERT INTO appointment_symptoms (appointment_id, symptom) VALUES (";
	sql = sql + "'" + appointment_id + "', ";
	sql = sql + "'" + symptom.replace("'", "''") + "')"; 
	db.execute(sql); 
	
	return db.lastInsertRowId;
}






function getAllAppointmentsLocal()
{
	var sql = "SELECT * FROM appointments ORDER BY date ASC";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
			  id: resultSet.fieldByName('id'),
			  incident_id: resultSet.fieldByName('incident_id'),
		   	  diagnosis: resultSet.fieldByName('diagnosis'),
		   	  date: resultSet.fieldByName('date'),
		   	  time: resultSet.fieldByName('time'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}


function getAppointmentsForIncidentLocal(incident_id) 
{ 
	var sql = "SELECT * FROM appointments WHERE INCIDENT_ID='"+incident_id+"'"; 
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
			  id: resultSet.fieldByName('id'),
			  incident_id: resultSet.fieldByName('incident_id'),
		   	  diagnosis: resultSet.fieldByName('diagnosis'),
		   	  date: resultSet.fieldByName('date'),
		   	  time: resultSet.fieldByName('time'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}



function getAppointmentLocal(appointment_id) 
{ 
	var sql = "SELECT * FROM appointments WHERE ID='"+appointment_id+"'"; 
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
			  id: resultSet.fieldByName('id'),
			  incident_id: resultSet.fieldByName('incident_id'),
		   	  diagnosis: resultSet.fieldByName('diagnosis'),
		   	  date: resultSet.fieldByName('date'),
		   	  time: resultSet.fieldByName('time'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}



function getDoctorByAppointmentLocal(appointment_id) 
{
	var sql = "SELECT * FROM appointment_doctors WHERE APPOINTMENT_ID='"+appointment_id+"'";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
			  appointment_id: resultSet.fieldByName('appointment_id'),
			  name: resultSet.fieldByName('name'),
			  location: resultSet.fieldByName('location'),
		      street: resultSet.fieldByName('street'),
		      city: resultSet.fieldByName('city'),
		   	  state: resultSet.fieldByName('state'),
		   	  zip: resultSet.fieldByName('zip'),
		   	  country: resultSet.fieldByName('country'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}


function getSymptomsOfAppointmentLocal(appointment_id) 
{
	var sql = "SELECT * FROM appointment_symptoms WHERE APPOINTMENT_ID='"+appointment_id+"'";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) { 
    	results.push(resultSet.fieldByName('symptom'));
		resultSet.next();
    }
    resultSet.close();		

	return results;
}


function updateAppointmentLocal(appointment_id,date,time,diagnosis) 
{ 
	var sql = "UPDATE appointments SET DATE='"+date.replace("'","''")+"', ";
	sql = sql + "TIME='"+time.replace("'","''")+"', ";
	sql = sql + "DIAGNOSIS='"+diagnosis+"' ";
	sql = sql + "WHERE ID='"+appointment_id+"'"; 
	
	db.execute(sql); 
	
	return db.lastInsertRowId; 
}

function updateDoctorForAppointmentLocal(id, name, location, street, city ,state, zip, country) 
{ 
	var sql = "UPDATE appointment_doctors SET NAME='"+name.replace("'","''")+"', ";
	sql = sql + "LOCATION='"+location+"', ";
	sql = sql + "STREET='"+street+"', ";
	sql= sql + "CITY='"+city+"', ";
	sql= sql + "STATE='"+state+"', ";
	sql= sql + "ZIP='"+zip+"', ";
	sql = sql + "COUNTRY='"+country+"' "; 
	sql = sql + "WHERE APPOINTMENT_ID='"+id+"'"; 
	
	db.execute(sql); 
	
	return db.lastInsertRowId; 
}

function updateAppointmentCompleteStatus(appointment_id, complete_status)
{
	if(success_status == true) {
		var sql = "UPDATE complete SET COMPLETE=1 ";
	}
	else {
		var sql = "UPDATE complete SET COMPLETE=0 ";
	}

	sql = sql + "WHERE ID='"+appointment_id+"'"; 
	
	db.execute(sql);
}


function deleteAppointmentsTableLocal()
{
	var sql = "DROP TABLE IF EXISTS appointments";
	db.execute(sql);
}


function deleteAppointmentLocal(id)
{
	var sql = "DELETE FROM appointments WHERE ID='"+id+ "'";
	db.execute(sql);
}

function deleteDoctorForAppointmentLocal(appointment_id)
{
	var sql = "DELETE FROM appointment_doctors WHERE APPOINTMENT_ID = '"+appointment_id+"'";
	db.execute(sql);
}

function deleteSymptomsForAppointmentLocal(appointment_id)
{
	var sql = "DELETE FROM appointment_symptoms WHERE APPOINTMENT_ID = '"+appointment_id+"'";
	db.execute(sql);
}