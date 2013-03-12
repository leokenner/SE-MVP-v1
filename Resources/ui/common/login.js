

function login()
{
	Ti.include('ui/common/database/database.js');
	
	initDBLocal();
	//var parent_id = insertUser(null, 'Adarsh', 'Hasija');
	var parent_id = getAllUsersLocal();
	Ti.App.Properties.setString('parent', parent_id[0].id);
	
	var children = getAllChildrenLocal();
	if(children.length == 0) {
		var row_id = insertChildLocal('New', 'Child',null,null,null);
		Titanium.App.Properties.setString('child', row_id);
	}
	else {
		Titanium.App.Properties.setString('child', children[0].id);
	}
}
