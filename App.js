import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import data from './data'


export default function App() {
    const [items, setItems] = React.useState(data)
    const [draggedIndex, setDraggedIndex] = React.useState(null);

    const handleDragStart = (e, index) => {
        e.preventDefault()
        e.dataTransfer.setData('index', index);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, index) => {
        e.preventDefault();
        const droppedIndex = e.dataTransfer.getData('index');
        const newItems = [...items];
        const temp = newItems[index];
        newItems[index] = newItems[droppedIndex];
        newItems[droppedIndex] = temp;
        setItems(newItems);
      };

      const handleTouchStart = (index) => {
        setDraggedIndex(index);
      };
    
      const handleTouchMove = (e) => {
        e.preventDefault();
      };
      
      const handleTouchEnd = (index) => {
        if (draggedIndex !== null && draggedIndex !== index) {
          const newItems = [...items];
          const temp = newItems[index];
          newItems[index] = newItems[draggedIndex];
          newItems[draggedIndex] = temp;
          setItems(newItems);
        }
        setDraggedIndex(null);
      };

    const list = items.map((item,index) => (<div className='item' 
                                        draggable
                                        key={index}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onTouchStart={() => handleTouchStart(index)}
                                        onTouchMove={(e) => handleTouchMove(e)}
                                        onTouchEnd={() => handleTouchEnd(index)}
                                        > 
                                    <Card key={item.id} item={item}/>
                                </div>) )
    return(
        <div className="app">
            <Navbar />
            {list}
        </div>
    )
}