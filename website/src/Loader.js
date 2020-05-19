import html from '../static/components/Loader.html'; 
import Component from './Component'; 

export default class Loader extends Component{
    _label; 
    _isLoading;
    _loader; 

    constructor(isLoading=true, label="Loading",
        container=document.getElementsByTagName("body")[0]){
        super(html, container);
        this._label = label;
        this._isLoading = isLoading;
    }
    
    build(){
        super.build();
        this._loader = this._element.querySelector('.loader');  
        this._element.style.padding = "26%";
        this.updateLoader();
    }
    
    updateLoader(){
        if(this._loader){
            this._loader.innerHTML = this._label;
            if(this._isLoading){
                this._element.style.display = 'block';
            }else{
                this._element.style.display = 'none';
            }
        }    
    }

    set label(label){
        this._label = label;
        this.updateLoader(); 
    }
    
    get label(){
        return this._label;
    }

    set isLoading(isLoading){
        this._isLoading = isLoading; 
        this.updateLoader();
    } 

    get isLoading(){
        return this._isLoading; 
    }
}