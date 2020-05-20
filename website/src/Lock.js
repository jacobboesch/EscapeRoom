import EscapeRoom from "./EscapeRoom";

export default class Lock{
    
    constructor(options, itemGroupMap){
        this.options = options;
        this.itemGroupMap = itemGroupMap;
    }

    unlock(){
        let destroyList = this.options.removes;
        EscapeRoom.removeItems(destroyList, this.itemGroupMap);
        let createList = this.options.unlocks;
        EscapeRoom.buildItems(createList, this.itemGroupMap);
    }
}