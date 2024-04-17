import React, { useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { OptionsObject, useSnackbar } from 'notistack';
import { deletePropertyById } from '@/server/properties/deletePropertyByIdApi';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';

type CustomOptionsObject = OptionsObject<'notification'> & {
  icon?: React.ReactNode;
};

const PropertyCardGrid = (props: any) => {
  const [properties, setProperties] = useState(props.properties);
  const { enqueueSnackbar } = useSnackbar();

  const deletePropertyHandler = async (id: string) => {
    try {
      await deletePropertyById(id);
      // Update the state to remove the deleted property
      setProperties((prevProperties: any) =>
        prevProperties.filter((property: any) => property.id !== id)
      );
      enqueueSnackbar('Property deleted.', {
        variant: 'notification',
        icon: (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ),
      } as CustomOptionsObject);
    } catch (error: any) {
      console.error('Error deleting property:', error.message);
      enqueueSnackbar('Error deleting property.', {
        variant: 'notification',
        icon: (
          <ExclamationCircleIcon
            className="h-6 w-6 text-red-400"
            aria-hidden="true"
          />
        ),
      } as CustomOptionsObject);
    }
  };

  return (
    <>
      <div
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-8xl"
      >
        {properties.map((property: any) => (
          <PropertyCard
            key={property.id}
            property={property}
            onDelete={deletePropertyHandler}
          />
        ))}
      </div>
    </>
  );
};

export default PropertyCardGrid;
