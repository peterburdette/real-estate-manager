import React from 'react';
import { useSelector } from 'react-redux';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useRouter } from 'next/router';

const PropertyCardGrid = (props) => {
  // retrieves the current route
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {props.properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          currentRoute={currentPath}
        />
      ))}
    </ul>
  );
};

export default PropertyCardGrid;
