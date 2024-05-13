import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import data from './data'


export default function App() {
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        // Perform any necessary logic with draggedItem and target
        console.log('Dropped item:', draggedItem);
        console.log('Target:', target);
        setDraggedItem(null);
    };

    const list = data.map(item => (<div className='item' 
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, 'draggedItem')}
                                        onTouchStart={(e) => handleDragStart(e, 'draggedItem1')}
                                        onDragEnd={handleDragEnd}
                                        onTouchEnd={handleDragEnd}> 
                                    <Card key={item.id} item={item}/>
                                </div>) )
    return(
        <div className="app">
            <Navbar />
            {list}
        </div>
    )
}