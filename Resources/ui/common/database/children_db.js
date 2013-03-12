

function initChildrenDBLocal()
{ 
	db.execute('CREATE TABLE IF NOT EXISTS children (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, CLOUD_ID TEXT, USER_ID TEXT NOT NULL, FIRST_NAME TEXT, LAST_NAME TEXT, SEX TEXT, DATE_OF_BIRTH TEXT, DIAGNOSIS TEXT, FOREIGN KEY(USER_ID) REFERENCES users (ID))');
}


function insertChildLocal(first_name, last_name, sex, date_of_birth, diagnosis) 
{ 
	var sql = "INSERT INTO children (user_id, first_name, last_name, sex, date_of_birth, diagnosis) VALUES ("; 
	sql = sql + "'" + Titanium.App.Properties.getString('parent') + "', "; 	 
	sql = sql + "'" + first_name.replace("'", "''") + "', ";
	sql = sql + "'" + last_name.replace("'", "''") + "', "; 	
	sql = sql + "" + sex + ", ";
	sql = sql + "" + date_of_birth + ", "; 
	sql = sql + "" + diagnosis + ")";
	db.execute(sql); 
	
	return db.lastInsertRowId; 
}


function getAllChildrenLocal()
{
	var sql = "SELECT * FROM children";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
		      id: resultSet.fieldByName('id'),
		      user_id: resultSet.fieldByName('user_id'),
		   	  first_name: resultSet.fieldByName('first_name'),
		   	  last_name: resultSet.fieldByName('last_name'),
		   	  sex: resultSet.fieldByName('sex'),
		   	  date_of_birth: resultSet.fieldByName('date_of_birth'),
		   	  diagnosis: resultSet.fieldByName('diagnosis'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}

function getChildLocal(id) { 
	var sql = "SELECT * FROM children WHERE ID='"+id+"'";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
		      id: resultSet.fieldByName('id'),
		      user_id: resultSet.fieldByName('user_id'),
		   	  first_name: resultSet.fieldByName('first_name'),
		   	  last_name: resultSet.fieldByName('last_name'),
		   	  sex: resultSet.fieldByName('sex'),
		   	  date_of_birth: resultSet.fieldByName('date_of_birth'),
		   	  diagnosis: resultSet.fieldByName('diagnosis'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}


function updateChildLocal(id,first_name,last_name,sex,date_of_birth,diagnosis)
{
	var sql = "UPDATE children SET FIRST_NAME='"+first_name.replace("'", "''");    
	sql = sql + "', LAST_NAME='"+last_name.replace("'","''");
	sql = sql + "', SEX='"+sex;
	sql = sql + "', DATE_OF_BIRTH='"+date_of_birth;
	sql = sql + "', DIAGNOSIS='"+diagnosis;
	sql = sql + "' WHERE ID='"+id+"'";
	
	db.execute(sql);
} 