import Control from './Control';
import ImageItem from './ImageItem';
var options = {
  image: 'https://semantic-ui.com/images/wireframe/image.png',
  inspectImages: ['https://semantic-ui.com/images/wireframe/image.png', 'https://www.w3schools.com/w3css/img_mountains.jpg'],
  sides:['https://semantic-ui.com/images/wireframe/image.png', 'https://www.w3schools.com/w3css/img_mountains.jpg'],
};
 
for(var i =0; i < 1; i++){
  let item = new ImageItem(options);
  item.build();
}

Control.addListeners();
