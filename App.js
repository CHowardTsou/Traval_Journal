import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import data from './data'


export default function App() {
    const [items, setItems] = React.useState(data)
    const draggedItemIndex = React.useRef(null);

    const handleDragStart = (e, index) => {
        if (e.dataTransfer) { // Check if dataTransfer exists
            e.dataTransfer.setData('text/plain', ''); // Required for some browsers
        }
        draggedItemIndex.current = index;
      };
    
    const handleDragEnd = (e) => {
        draggedItemIndex.current = null;
      };
    //   const handleDragOver = (e) => {
    //     e.preventDefault();
    //   };
    
      const handleDrop = (e, index) => {
        if (draggedItemIndex.current !== null) {
            const droppedIndex = parseInt(e.dataTransfer.getData('index'), 10); // Parse data to integer
            const newItems = [...items];
            const temp = newItems[index];
            newItems[index] = newItems[draggedItemIndex.current];
            newItems[draggedItemIndex.current] = temp;
            setItems(newItems);
          }
      };

      const handleTouchStart = (index) => {
        draggedItemIndex.current = index;
      };
    
      const handleTouchMove = (e) => {
        
      };
      
      const handleTouchEnd = (index) => {
        if (draggedItemIndex.current !== null && draggedItemIndex.current !== index) {
            // Handle item reordering
          }
          draggedItemIndex.current = null;
      };

    const list = items.map((item,index) => (<div className='item' 
                                        draggable
                                        key={index}
                                        onMouseDown={(e) => handleDragStart(e, index)}
                                        onMouseUp={handleDragEnd}
                                        onTouchStart={() => handleTouchStart(index)}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={() => handleTouchEnd(index)}
                                        > 
                                    <Card key={item.id} item={item}/>
                                </div>) )
    return(
        <div className="app" onDrop={(e) => handleDrop(e)}>
            <Navbar />
            {list}
        </div>
    )
}