import Component from "./Component";
import html from '../static/components/EnvelopeLock.html';
import EnvelopeModal from './EnvelopeModal';

export default class EnvelopeLock extends Component{

    constructor(properties, itemGroupMap){
        let container = document.getElementsByTagName("body")[0];
        if(properties.container != null){
            container = properties.container;
        }
        super(html, container);
        this.properties =properties;
        this.itemGroupMap = itemGroupMap;
    }

    build(){
        super.build();
        let button = this._element.querySelector(".ui .button");
        let modalProperties = this.properties;
        modalProperties.itemGroupMap = this.itemGroupMap;
        let modal = new EnvelopeModal(modalProperties); 
        modal.build();        
        button.addEventListener("click",
        () => $("#" + modal.getId()).modal('show'));
    }

}