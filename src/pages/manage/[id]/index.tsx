import React, { useState } from 'react';
import DropdownInputField from '@/components/Fields/DropdownInputField';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Modal from '@/components/Modal/Modal';
import { getPropertyById } from '@/server/properties/getPropertyByIdApi';
import { deletePropertyById } from '@/server/properties/deletePropertyByIdApi';
import { OptionsObject, useSnackbar } from 'notistack';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Tabs from '@/components/Tabs/Tabs';
import PropertyDetailsSection from '../components/propertyDetailsSection';

interface PropertyDetailProps {
  property: {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    purchasePrice: number;
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

type CustomOptionsObject = OptionsObject<'notification'> & {
  icon?: React.ReactNode;
};

const PropertyDetailPage: NextPage<PropertyDetailProps> = ({
  property,
  error,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState(0);
  console.log('property: ', property);

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  if (error) {
    // Handle the case when no data is available
    return <p>No property data available.</p>;
  }

  const handleDropdownSelect = (option: string) => {
    if (option === 'Delete') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await deletePropertyById(id);
      router.push('/manage');
      enqueueSnackbar('Property deleted.', {
        variant: 'notification',
        icon: (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        ),
      } as CustomOptionsObject);
      setIsDeleteModalOpen(false);
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
      <div className="mx-auto border-b border-gray-900/10 pb-12">
        <div className="mb-6 flex justify-between items-center px-4 sm:px-0">
          <Breadcrumbs />
          <div className="ml-4">
            <DropdownInputField
              name="Manage"
              options={['Edit', 'Delete']}
              onSelect={handleDropdownSelect}
            />
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center px-4 sm:px-0">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Property Overview
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Manage all property details for {property.address}.
            </p>
          </div>
          <div>
            <Tabs
              tabs={[
                { name: 'Property Details' },
                { name: 'Photos' },
                { name: 'Tenant(s)' },
              ]}
              onTabClick={handleTabClick}
              currentTab={currentTab}
            />
          </div>
        </div>

        {/* TAB CONTENT HERE */}
        {currentTab === 0 && <PropertyDetailsSection property={property} />}
        {currentTab === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 place-items-center">
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
            <img
              className="hover:opacity-75"
              src={`${property.image}`}
            />
          </div>
        )}
        {currentTab === 2 && (
          <div className="mt-6 border-t border-gray-100">
            {/* Tenant(s) content */}
            Tenant(s) content
          </div>
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this property?"
        cancelText="Cancel"
        confirmText="Delete Property"
        onConfirm={() => handleDeleteProperty(property.id)}
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
