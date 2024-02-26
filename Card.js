import React from 'react'

export default function Card(props) {
    
    return (
        <div className="card">
            <img src={props.item.imageUrl} alt={props.item.title} />
            <div className="card-right">
                <div className="location">
                    <i className="fa-solid fa-location-dot"></i>
                    <h3>{props.item.location.toUpperCase()}</h3>
                    <a href={props.item.googleMapUrl}>View on Google Maps</a>
                </div>
                <h1>{props.item.title}</h1>
                <p className="date">{props.item.startDate} - {props.item.endDate}</p>
                <p className="description">{props.item.description}</p>
            </div>
        </div>
    )
}