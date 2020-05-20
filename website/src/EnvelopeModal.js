import Component from "./Component";
import html from "../static/components/EnvelopeModal.html";
import EnvelopeButton from "./EnvelopeButton";
import _ from 'semantic-ui-css';
export default class EnvelopeModal extends Component{
    
    constructor(properties){
        super(html, document.getElementsByTagName("body")[0]);
        this.properties = properties;
    }
    
    build(){
        super.build();
        let content = this._element.querySelector('.content');
        let buttonContainer = content.querySelector('.ui .grid');
    
        let buttons = this.properties.buttons;
        for(var buttonIndex in buttons){
            let button = new EnvelopeButton(
                {
                    container: buttonContainer,
                    itemGroupMap: this.properties.itemGroupMap,
                    label: buttons[buttonIndex].label,
                    color: buttons[buttonIndex].color,
                    unlocks: buttons[buttonIndex].unlocks, 
                    removes: buttons[buttonIndex].removes
                }
            );
            button.build();
        }
    }
}