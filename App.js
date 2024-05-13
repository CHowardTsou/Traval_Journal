import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import data from './data'


export default function App() {
    const [items, setItems] = React.useState(data)

    const handleDragStart = (e, index) => {
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

    const list = items.map((item,index) => (<div className='item' 
                                        draggable
                                        key={index}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, index)}> 
                                    <Card key={item.id} item={item}/>
                                </div>) )
    return(
        <div className="app">
            <Navbar />
            {list}
        </div>
    )
}