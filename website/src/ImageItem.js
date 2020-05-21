import FieldItem from './FieldItem'; 
import InspectModal from './InspectModal';
import html from '../static/components/ImageItem.html';

export default class ImageItem extends FieldItem{
    _sideIndex;

    constructor(options={}){
        let container = document.getElementsByTagName("body")[0];
        let position = {x:0, y:0};
        let angle = 0;
        let size = {width: "120px", height:"120px"};
        if(options.container){
            container = options.container;
        }
        if(options.position){
            position = options.position;
        }
        if(options.angle){
            angle = options.angle;
        }

        if(options.size != null){
            size = options.size;
        }
       
        super(html, container, position, angle, size);
        this.options = options;
        this._sideIndex = 0; 
    }
    
    build(){
        super.build();
        this._buildImage();
        this._buildInspector();
        this._buildSides();
    }
    
    _buildSides(){
        let flipButton = this._rotationContainer.querySelector('.flipButton');
        
        if(this.options.sides){
            flipButton.addEventListener("click", ()=>{
                this._sideIndex++;
                if(this._sideIndex >= this.options.sides.length){
                    this._sideIndex = 0;
                } 
                this._setImage(this.options.sides[this._sideIndex]);
            });
        }
        else{
            flipButton.remove();
        }
    }

    _setImage(src){
        let image = this._element.getElementsByTagName("img")[0];
        image.src = src;
        
    }
    
    _buildImage(){
        if(this.options.image){
           this._setImage(this.options.image);
        }
        else{
            throw new Error("Unable to load image");
        }
        
    }

    _buildInspector(){
        let inspectElement = this._rotationContainer.querySelector('.inspector');
        if(this.options.inspectImages == null){
            inspectElement.remove();
        }
        else{
            let inspectModal = new InspectModal(this.options.inspectImages);
            inspectModal.build();
            inspectElement.addEventListener("click",
               () => $("#" + inspectModal.getId()).modal('show'));
        }
    }
    
}