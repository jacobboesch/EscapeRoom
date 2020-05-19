var Map = require('collections/map');
import ImageItem from './ImageItem';

export default class TypeMappings{   
    static itemMap;
    
    static initItemMap(){
        if(TypeMappings.itemMap == null){
            TypeMappings.itemMap = new Map();
            TypeMappings.itemMap.set("ImageItem", ImageItem); 
        } 
    }
}