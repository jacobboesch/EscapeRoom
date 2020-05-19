import Control from './Control';
import ImageItem from './ImageItem';
var options = {
  image: 'https://semantic-ui.com/images/wireframe/image.png',
  inspectImages: [
    {
      image:'https://semantic-ui.com/images/wireframe/image.png',
      label: "Wire Frame"
    },
    {
      image: 'https://www.w3schools.com/w3css/img_mountains.jpg', 
      label: "Mountain"
    }
  ],
  sides:['https://semantic-ui.com/images/wireframe/image.png', 'https://www.w3schools.com/w3css/img_mountains.jpg'],
};
 
for(var i =0; i < 1; i++){ 
  let item = new ImageItem(options);
  item.build();
}

Control.addListeners();
