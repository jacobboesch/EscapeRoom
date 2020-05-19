import Component from './Component';
import '../static/css/RotationHandle.css';

export default class RotationHandle extends Component{
    
    constructor(container){
        let html = "<div>&circlearrowright;</div>"; 
        super(html, container);
    }

    build(){
        super.build();
        this._element.classList.add("rotation-handle");
    }
}