import Loader from "./Loader";
import TypeMappings from './TypeMappings';
import Map from 'collections/map';
import Contol from './Control';
import Lock from "./Lock";
import EnvelopeLock from "./EnvelopeLock";

export default class EscapeRoom{
    _url;
    _loader;

    constructor(url){
        this._url = url;
        this._loader = new Loader(true, "Fetching escape room file");
        TypeMappings.initItemMap(); // initilizes the item map if not already done 
    }
    
    build(){
        this._loader.build();
        this.fetchEscapeRoom(); 
    }

    fetchEscapeRoom(){
        var self = this;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: self._url,
            success: function(data){
                self.loadRoom(data); 
            },
            error: function(){
                alert("Failed to load the escape room");
            }
        });
    }

    loadRoom(data){
        // TODO add JSON validation for the data
        this._loader.label = "Building the escape room";
        let itemGroupMap = this._getItemGroupMap(data);
        let itemGroups = data.start.spawns;
        // TODO ALLOW FOR DIFFERENT LOCK TYPES AND MORE THAN ONE LOCK
        let envelopLockProperties = data.locks.envelopeLock.properties;
        let lock = new EnvelopeLock(envelopLockProperties, itemGroupMap);
          lock.build();
        EscapeRoom.buildItems(itemGroups, itemGroupMap);
        Contol.addListeners();
        this._loader.isLoading = false;
       
    }
    
    static buildItem(itemComponent){
        itemComponent.build();
    }

    static removeItem(itemComponent){
        itemComponent.getElement().remove();
    }

    static doToItemGroups(itemGroups, itemGroupMap, funcAction){
        for(var index in itemGroups){
            let groupName = itemGroups[index];
            let groupItems = itemGroupMap.get(groupName); 
            for(var itemIndex in groupItems){
                funcAction(groupItems[itemIndex]); 
            }
        }
    }

    static buildItems(itemGroups, itemGroupMap){
        this.doToItemGroups(itemGroups, itemGroupMap, this.buildItem);
    }
    
    static removeItems(itemGroups, itemGroupMap){
        this.doToItemGroups(itemGroups, itemGroupMap, this.removeItem);
    }


    _getItemGroupMap(data){
        let groupMap = new Map();
        for(var group in data.groups){
            let groupComponents = [];
            let currentGroup = data.groups[group]; 
            for(var component in currentGroup){
                let currentCompnent = currentGroup[component];
                let componentObject;
                if(currentCompnent.type == "item"){
                    let itemJSON = data.items[currentCompnent.name]; 
                    componentObject = this.createItem(itemJSON);     
                    componentObject.position = currentCompnent.spawn;       
                }
                groupComponents.push(componentObject);
            }
            groupMap.set(group, groupComponents);
        }
        return groupMap;
    }
    
    createItem(itemJSON){
        let ItemType = TypeMappings.itemMap.get(itemJSON.type);
        let item = new ItemType(itemJSON.properties);
        return item;
    }
}