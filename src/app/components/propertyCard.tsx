import React from "react";

interface PropertyType {
    id: number;
    image: string;
    title: string;
    location: string;
    price: string;
}

const handleOpenPropertyLink = () => {
    window.open('http://localhost:3000', '_blank', 'noopener,noreferrer')
}

const PropertyCard: React.FC<{property: PropertyType}> = ({property}) => { 

    return (
            <div
                className="property-card"
            >
                <img
                src={property.image_url}
                alt={property.title}
                />

                <div className="property-details">
                <h4>{property.title}</h4>

                <p>📍 {property.location}</p>

                <strong>{property.price}</strong>

                <button
                    onClick={handleOpenPropertyLink}
                >
                    View Property
                </button>
                </div>
            </div>
           );
};

export default PropertyCard;