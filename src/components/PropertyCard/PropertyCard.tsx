import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PropertyCard = ({ property, onDelete }: any) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewClick = () => {
    router.push(`/manage/${property.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden sm:max-w-md sm:mx-auto md:w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="shrink-0">
        <div
          className="mb-3 tracking-wide"
          style={{ margin: '10px', position: 'absolute' }}
        >
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 ring-1 ring-inset ring-green-600/20 ${
              property.availability === 'Available'
                ? 'bg-green-50 text-green-700 text-xs ring-green-600/20'
                : 'bg-red-50 text-red-700 text-xs ring-red-600/20'
            }`}
          >
            {property.availability}
          </span>
        </div>
        <img
          className="h-48 w-full object-cover"
          src={`${property.image}`}
          alt={`${property.address}`}
        />
      </div>
      <div className="p-8">
        <div className="block mt-1 text-md leading-tight font-medium text-black">
          {property.address} {property.city}, {property.state} {property.zip}
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {property.bedrooms} bds {property.bathrooms} ba &mdash;{' '}
          {property.squareFeet} sqft
        </p>
      </div>
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={handleViewClick}
          >
            View Property
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
