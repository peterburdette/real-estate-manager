import React from 'react';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';

const PropertyDetailsSection = ({ property }: any) => {
  return (
    <div className="px-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Address
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              {property.address +
                ' ' +
                property.city +
                ', ' +
                property.state +
                ' ' +
                property.zip}
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Availability
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">{property.availability}</span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Amenities
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {property.amenities && property.amenities.length > 0 ? (
              property.amenities.map((amenity: string) => (
                <span
                  className="flex-grow"
                  key={amenity}
                >
                  {amenity}
                </span>
              ))
            ) : (
              <span>No amenities available</span>
            )}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Purchase Price
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              {useCurrencyFormatter(property.purchasePrice)}
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Property Value
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              {useCurrencyFormatter(property.propertyValue)}
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Monthly Rent Rate
          </dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              {useCurrencyFormatter(property.monthlyRentalIncome)}
            </span>
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Notes</dt>
          <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">{property.notes}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PropertyDetailsSection;
