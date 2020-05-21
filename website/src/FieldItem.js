
import Component from './Component';
import RotationHandle from './RotationHandle';
import '../static/css/FieldItem.css';
/*
Note: your html element coresponding to this component must have
a dragResizeContainer labeled with the css class drag-resize-container
and a rotationContainer with the css class rotation-container.
*/
export default class FieldItem extends Component{
    _position;
    _angle;
    _dragResizeContainer;
    _rotationContainer;
    _size;

    constructor(html, container=null, position={x: 0, y:0}, angle=0,
        size={width: "120px", height: "120px"}){
        super(html, container);
        this._position = position;
        this._angle = angle;
        this._dragResizeContainer = null;
        this._rotationContainer = null;
        this._size = size;
    }
    
    _getDragResizeContainer(){
        if(this._element.className.includes("drag-resize-container")){
            return this._element;
        }
        else{
            return this._element.querySelector(".drag-resize-container");
        }
    }

    build(){
        super.build();
        this._dragResizeContainer = this._getDragResizeContainer();
        this._dragResizeContainer.style.width = this._size.width;
        this._dragResizeContainer.style.height = this._size.height;
        
        this._rotationContainer = this._dragResizeContainer.querySelector('.rotation-container');
        let rotationHandle = new RotationHandle(this._rotationContainer);
        rotationHandle.build();
       
        // translate the object to the correct position. 
        this.updateElementPosition();        
    }

 

    // method called when drag action occurs
    static dragListener(event){
        var target = event.target;

        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      
        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px) ';
        
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    static resizeListener(event){
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
      
        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px';
      
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';
      
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    

    updateElementPosition(){
        if(this._element != null){
            // translate the element
            this._element.style.webkitTransform =
            this._element.style.transform =
                'translate(' + this._position.x + 'px, ' 
                    + this._position.y + 'px)';
            this._rotationContainer.style.transform = 'rotate(' + 
                    this._angle + 'rad' + ')';
            this._element.setAttribute("data-x", this._position.x);
            this._element.setAttribute("data-y", this._position.y);
            this._rotationContainer.setAttribute("data-angle", this._angle);
        }
    }

    get dragResizeContainer(){
        return this._dragResizeContainer;
    }

    set dragResizeContainer(element){
        this._dragResizeContainer = element;
    }

    get rotationContainer(){ 
        return this._rotationContainer;
    }

    set rotationContainer(element){
        this._rotationContainer = element;
    }

    set position(position){
        this._position.x = position.x;
        this._position.y = position.y;
        this.updateElementPosition();
    }
    
    get position(){
        return this._position;
    }

    set x(x){
        this._position.x = x;
    }

    set y(y){
        this._position.y = y;
    }

    get x(){
        return this._position.x; 
    }

    get y(){
        return this._position.y;
    }

    set angle(angle){
        this.angle = angle;
    }

    get angle(){
        return this.angle;
    }

}