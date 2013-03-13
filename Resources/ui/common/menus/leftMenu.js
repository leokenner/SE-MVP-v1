


function leftMenu()
{
	Ti.include('ui/common/database/database.js');
	
	var users = getAllUsersLocal();
	var parent = {
		id: users[0].id,
		first_name: users[0].first_name,
		last_name: users[0].last_name,
		email: users[0].email
	}
	
	var window = Titanium.UI.createWindow({
  		title: parent.first_name+' '+parent.last_name,
  		barColor: 'blue',
  		top: 0,
  		left: 0,
  		width: 260,
  		zIndex: 1
	});
	
	var navGroupWindow = require('ui/handheld/ApplicationNavGroup');
	navGroupWindow = new navGroupWindow(window);
	
	leftMenu_table = Ti.UI.createTableView({
		backgroundColor: 'yellow',
		borderColor: 'black',
		rowHeight: 45
	});
	
	
	var sectionChildren = Ti.UI.createTableViewSection({ headerTitle: 'Children' });	
	var sectionOther = Ti.UI.createTableViewSection({ headerTitle: ' ' });
	sectionOther.add(Ti.UI.createTableViewRow({ title: 'Logout' }));
	leftMenu_table.data = [sectionChildren, sectionOther];
	window.add(leftMenu_table);
	

function insertChildren()
{
	var children = getAllChildrenLocal();
	var tableViewRow = [];
	
	sectionChildren = Ti.UI.createTableViewSection({ headerTitle: 'Children' });
	
    	for(var i=0;i<children.length;i++)
    	{    
    		var child = children[i];		
    		tableViewRow[i] = Ti.UI.createTableViewRow();	
        	tableViewRow[i].title = child.first_name+' '+child.last_name;
        	tableViewRow[i].child_id = child.id;
        	tableViewRow[i].addEventListener('click', function(e) {
        		Titanium.App.Properties.setString('child', e.rowData.child_id); 
        		Ti.App.fireEvent('changeUser'); 
        		});      	
            sectionChildren.add(tableViewRow[i]); 
        }
        var row = Ti.UI.createTableViewRow({ title: 'Create New Child' });
        row.addEventListener('click', function() {
        	var row_id = insertChildLocal('New','Child',null,null,null);
        	Titanium.App.Properties.setString('child', row_id);
        	Ti.App.fireEvent('changeUser');
        });
        sectionChildren.add(row);  	
        leftMenu_table.data = [sectionChildren,sectionOther];
}

	
sectionChildren.addEventListener('click', function(e) {
	/*	// Create a new child and return
		if(e.row.title == 'Create New Child') 
		{
			var row_id = insertChild('New', 'Child');
			insertChildren();
			Titanium.App.Properties.setString('child', row_id);
		}	*/			
});

Ti.App.addEventListener('showMenu', function() {
		insertChildren();
	});
	
	
	return navGroupWindow;
}

module.exports = leftMenu;