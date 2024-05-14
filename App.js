import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import data from './data'


export default function App() {
    const [items, setItems] = React.useState(data)
    const draggedItemIndex = React.useRef(null);
    const touchStartY = React.useRef(null);

    const handleDragStart = (e, index) => {
        if (e.dataTransfer) { // Check if dataTransfer exists
            e.dataTransfer.setData('text/plain', index); // Required for some browsers
        }
        draggedItemIndex.current = index;
      };
    
    const handleDragEnd = () => {
        draggedItemIndex.current = null;
      };
    
      const handleDrop = (e, index) => {
        if (draggedItemIndex.current !== null) {
            const newItems = [...items];
            const temp = newItems[index];
            newItems[index] = newItems[draggedItemIndex.current];
            newItems[draggedItemIndex.current] = temp;
            setItems(newItems);
          }
      };

      const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior for onDragOver
      };

      const handleTouchStart = (index, touchEvent) => {
        draggedItemIndex.current = index;
        touchStartY.current = touchEvent.touches[0].clientY;
      };
      
      // console.error has not been solved yet => Unable to preventDefault inside passive event listener invocation.
      const handleTouchMove = (index, touchEvent) => {
        touchEvent.preventDefault(); // Prevent default behavior for onTouchMove
        const touchY = touchEvent.touches[0].clientY;
        if (draggedItemIndex.current !== null && Math.abs(touchY - touchStartY.current) > 20) {
          // Move the item only if touch movement is significant
          const newItems = [...items];
          const draggedIndex = draggedItemIndex.current;
          const delta = touchY - touchStartY.current;
          const newIndex = delta < 0 ? index - 1 : index + 1;
          if (newIndex >= 0 && newIndex < newItems.length && newIndex !== draggedIndex) {
            // Swap items
            [newItems[draggedIndex], newItems[newIndex]] = [newItems[newIndex], newItems[draggedIndex]];
            setItems(newItems);
            draggedItemIndex.current = newIndex;
            touchStartY.current = touchY;
          }
        }
      };
      
      const handleTouchEnd = () => {
        draggedItemIndex.current = null;
        touchStartY.current = null;
      };

    const list = items.map((item,index) => (<div className='item' 
                                        draggable
                                        key={index}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={handleDragOver} // Add onDragOver event handler
                                        
                                        onTouchStart={(touchEvent) => handleTouchStart(index, touchEvent)}
                                        onTouchMove={(touchEvent) => handleTouchMove(index, touchEvent)}
                                        onTouchEnd={handleTouchEnd}
                                        > 
                                    <Card key={item.id} item={item}/>
                                </div>) )
    return(
        <div className="app" >
            <Navbar />
            {list}
        </div>
    )
}