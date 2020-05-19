import Component from './Component';
import html from '../static/components/InspectModal.html';
import _ from 'semantic-ui-css';

export default class InspectModal extends Component{
    _images; 
    _slideIndex; 

    constructor(images){
        super(html, document.getElementsByTagName("body")[0]); 
        this._images = images;
        this._slideIndex = 0;
    }

    build(){
        super.build();
        let header = this._element.getElementsByClassName("header")[0];
        let headerButtons = header.getElementsByTagName("button");
        //previous button
        headerButtons[0].addEventListener("click", ()=>{
            this._slideIndex--; 
            this.updateSlide();
        });
        // next button 
        headerButtons[1].addEventListener("click", ()=>{
            this._slideIndex++; 
            this.updateSlide();
        }); 
        let content = this._element.getElementsByClassName("content")[0];
        this.addImages(content);
        this.updateSlide();
    }
    
    addImages(container){
        for(var image of this._images){
            let img = document.createElement("img");
            img.src = image;
            img.classList.add("ui","fluid", "image", "myslides");
            img.style.display = "none";
            container.append(img);
        }
    }
  

    updateSlide(){
        let slides = this._element.getElementsByClassName("mySlides");

        if(this._slideIndex >= slides.length){
            this._slideIndex = 0;
        }
        
        if(this._slideIndex < 0){
            this._slideIndex = slides.length - 1;
        }
        
        for(var i =0; i < slides.length; i++){
            slides[i].style.display= "none"; 
        }
        slides[this._slideIndex].style.display = "block"; 
    }
}