import Component from "./Component";
import html from "../static/components/EnvelopeButton.html"
import EscapeRoom from "./EscapeRoom";

export default class EnvelopeButton extends Component{
    
    constructor(properties){
        super(html, properties.container);
        this.properties = properties;    
    }
    
    build(){
        super.build();
        let button = this._element.querySelector('.ui .button'); 
        let label = document.createElement("p");
        label.innerHTML = this.properties.label;
        if(this.properties.color){
            button.classList.add(this.properties.color);
        }
        button.append(label); 
        button.addEventListener("click", ()=>{
            EscapeRoom.buildItems(this.properties.unlocks, this.properties.itemGroupMap);
            EscapeRoom.removeItems(this.properties.removes,this.properties.itemGroupMap);
            $('.ui.modal').modal('hide'); 
        });
    }
}