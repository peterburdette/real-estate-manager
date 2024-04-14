import React, { useState } from 'react';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';
import DropdownInputField from '@/components/Fields/DropdownInputField';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Modal from '@/components/Modal/Modal';
import { getPropertyById } from '@/server/properties/getPropertyByIdApi';
import { deletePropertyById } from '@/server/properties/deletePropertyByIdApi';
import { useSnackbar } from 'notistack';

interface PropertyDetailProps {
  property: {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    propertyValue: number;
    monthlyRentalIncome: number;
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    availability: string;
    image: string;
    amenities: string[];
    notes: string;
  };
  error?: boolean;
}

const PropertyDetailPage: NextPage<PropertyDetailProps> = ({
  property,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    // Handle the case when no data is available
    return <p>No property data available.</p>;
  }

  const handleDropdownSelect = (option: string) => {
    if (option === 'Delete') {
      deletePropertyHandler(property.id);
    } else {
      setIsModalOpen(true);
    }
  };

  const deletePropertyHandler = async (id: string) => {
    try {
      await deletePropertyById(id);
      router.push('/manage');
      enqueueSnackbar('Property deleted.', { variant: 'notification' });
    } catch (error: any) {
      console.error('Error deleting property:', error.message);
      enqueueSnackbar('Error deleting property.', { variant: 'notification' });
    }
  };

  return (
    <>
      <div className="mx-auto border-b border-gray-900/10 pb-12">
        <div className="flex justify-between items-center px-4 sm:px-0">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Property Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="ml-4">
            <DropdownInputField
              name="Manage"
              options={['Edit', 'Delete']}
              onSelect={handleDropdownSelect}
            />
          </div>
        </div>

        {/* <div className="mt-6 relative h-60 overflow-hidden">
          <img
            src={property.image}
            alt="Property Image"
            className="w-full h-full object-cover"
          />
        </div> */}

        <div className="mt-6 border-t border-gray-100">
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
                Property Value
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  ${useCurrencyFormatter(property.propertyValue)}
                </span>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Monthly Rent Rate
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  ${useCurrencyFormatter(property.monthlyRentalIncome)}
                </span>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Notes
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{property.notes}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const propertyId = params!.id;

  // Check if params and params.id are available and params.id is a string
  if (!params || typeof propertyId !== 'string') {
    // Handle the case when params or params.id is not available or not a string
    return {
      props: {
        error: true,
      },
    };
  }

  try {
    const property = await getPropertyById(propertyId);

    return {
      props: {
        property,
      },
    };
  } catch (error: any) {
    console.error('Error fetching property data:', error.message);

    return {
      props: {
        error: true,
      },
    };
  }
};

export default PropertyDetailPage;
