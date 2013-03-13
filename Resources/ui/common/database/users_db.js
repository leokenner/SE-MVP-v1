


function initUsersDBLocal()
{ 
	db.execute('CREATE TABLE IF NOT EXISTS users (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, CLOUD_ID TEXT, FIRST_NAME TEXT NOT NULL, LAST_NAME TEXT NOT NULL, EMAIL TEXT)'); 
}

function insertUserLocal(cloud_id,first_name, last_name) 
{ 	
	var sql = "INSERT INTO users (cloud_id, first_name, last_name) VALUES ("; 
	sql = sql + "" + cloud_id + ", ";
	sql = sql + "'" + first_name.replace("'", "''") + "', "; 	 
	sql = sql + "'" + last_name.replace("'", "''") + "')"; 
	db.execute(sql); 
	
	return db.lastInsertRowId; 
	
}

function getAllUsersLocal() {
	var sql = "SELECT * FROM users";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
		      id: resultSet.fieldByName('id'),
		   	  first_name: resultSet.fieldByName('first_name'),
		   	  last_name: resultSet.fieldByName('last_name'),
		   	  email: resultSet.fieldByName('email'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}


function getUserLocal(id) {
	var sql = "SELECT * FROM users WHERE ID='"+id+"'";
	
	var results = [];
	var resultSet = db.execute(sql);
    while (resultSet.isValidRow()) {
			results.push({
		      id: resultSet.fieldByName('id'),
		   	  first_name: resultSet.fieldByName('first_name'),
		   	  last_name: resultSet.fieldByName('last_name'),
		   	  email: resultSet.fieldByName('email'),
	        });
	resultSet.next();
    }
    resultSet.close();		

	return results;
}