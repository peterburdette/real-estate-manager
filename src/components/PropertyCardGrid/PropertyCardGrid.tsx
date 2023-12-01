import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useRouter } from 'next/router';

const PropertyCardGrid = (props: any) => {
  // retrieves the current route
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      {props.properties.map((property: any) => (
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
