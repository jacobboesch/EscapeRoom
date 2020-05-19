export default class Component{
    _htmlCode;
    _container;
    _element;
    _id;

    constructor(html, container=null){
        this._htmlCode = html;
        this._container = container;
        Component.id = Component.id ? Component.id + 1 : 1;
        this._id = Component.id;
    }

    getElement(){
        return this._element;
    }

    gethtml(){
        return this._htmlCode;
    }
    
    getContainer(){
        return this._container;
    }

    setContainer(container){
        this._container = container;
    }

    sethtml(html){
        this._htmlCode = html;
    }
    
    getId(){
        return this._id;
    }
    
    _placeInContainer(){
        if(this._container != null && this._element != null){
            this._container.append(this._element); 
        }
    }

    _removeElement(){
        if(this._element != null){
            this._element.remove();
        }
    }
    
    // builds the component
    build(){
        this._removeElement();
        let template = document.createElement("template");    
        template.innerHTML = this._htmlCode.trim();
        this._element = template.content.firstElementChild;
        this._element.setAttribute("id", this._id);
        this._placeInContainer();     
    }
   
}
