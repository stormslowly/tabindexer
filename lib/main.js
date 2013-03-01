tabs = require("tabs");

tabs.on
('ready', 
    function 
    onReady(tab){
        //var restTabs= require("tabs");      
        refreshTitle(tabs,null); 
    }
)

tabs.on(
    'activate',
    function onActivate(tab){
        refreshTitle(tabs,null); 
    }
)

tabs.on(
    'close',
    function onClose(tab){
        refreshTitle(tabs,tab); 
    }
)

function refreshTitle(allTabs,closedTab){
    
    arryTabs = new Array();
    for each(var tab in allTabs){
    	arryTabs.push(tab);
    }
    arryTabs.sort(indexComparer);
    
    var teamNo = 1;
    for each (var tab in arryTabs){
			if(tab!=closedTab){
				var title =removePrefix(tab.title);
        if(teamNo>=1 & teamNo<=8){
            tab.title = "("+teamNo +")" + title;
            teamNo++;
        }else{
        	tab.title = title;
        }
    	}
    }    	
    if(teamNo>9){
        var lastTab = arryTabs[arryTabs.length -1];
        lastTab.title =  "("+9+")" +removePrefix(lastTab.title);
    }
    //active tabs has no index
    allTabs.activeTab.title = removePrefix(allTabs.activeTab.title);
}


function removePrefix(title){
	teamFlag = title.match(/\(\d{1}\)/);
	if(!teamFlag){
		return title;
	}
	
	if(title.indexOf(teamFlag)==0){
		return title.substring(3);
	}
	else{
		return title;
	}
}

function indexComparer(t1,t2){
	return t1.index - t2.index;	
}

