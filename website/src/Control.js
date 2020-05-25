 /*
* holds all of the interact js listeners. 
TODO: think of a cleaner way to implement this.
 */ 
import FieldItem from './FieldItem';
import interact from 'interactjs';

export default class Control{
    static getDragAngle(event) {
        var box = event.target.parentElement;
        var startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
        var center = {
          x: parseFloat(box.getAttribute('data-center-x')) || 0,
          y: parseFloat(box.getAttribute('data-center-y')) || 0
        };
        var angle = Math.atan2(center.y - event.clientY,
          center.x - event.clientX);
      
        return angle - startAngle;
    }
    
    static addListeners(){
        interact('.drag-resize-container')
        .resizable({
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: true, top: true },
      
          listeners: {
            move: FieldItem.resizeListener
          },
          modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
              outer: 'parent'
            }),
      
            // minimum size
            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 }
            })
          ],
      
          inertia: true
        })
        .draggable({
          listeners: { move: FieldItem.dragListener },
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ]
        })
        .dropzone({
          accept:'.drag-resize-container',
          overlap: 0.01,
          ondragenter: (event)=>{
            let draggedElement = event.relatedTarget; 
            let dragedOver = event.target; 
            let dragedOverZIndex =parseInt(dragedOver.style.zIndex,10);
            if(!dragedOverZIndex){
              dragedOver.style.zIndex = 0;
            }
            let draggedZ = dragedOverZIndex ? dragedOverZIndex + 1 : 1;
            draggedElement.style.zIndex = draggedZ;
          }
        });
        
      interact('.rotation-handle')
        .draggable({
          onstart: function(event) {
            var box = event.target.parentElement;
            var rect = box.getBoundingClientRect();
      
            // store the center as the element has css `transform-origin: center center`
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', Control.getDragAngle(event));
          },
          onmove: function(event) {
            var box = event.target.parentElement;
      
            var pos = {
              x: parseFloat(box.getAttribute('data-x')) || 0,
              y: parseFloat(box.getAttribute('data-y')) || 0
            };
      
            var angle = Control.getDragAngle(event);
      
            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
          },
          onend: function(event) {
            var box = event.target.parentElement;
      
            // save the angle on dragend
            box.setAttribute('data-angle', Control.getDragAngle(event));
          },
        });
    }
}