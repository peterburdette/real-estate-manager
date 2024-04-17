import React, { useEffect, useState } from 'react';
import PropertyCardGrid from '@/components/PropertyCardGrid/PropertyCardGrid';
// import ListView from '@/components/ListView/ListView'; // Import your ListView component
import { getProperties } from '@/server/properties/getPropertiesApi';
import {
  Bars4Icon,
  EyeIcon,
  PlusIcon,
  Squares2X2Icon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { getViewPropertiesToggleState } from '@/server/appState/getViewPropertiesToggleStateApi';
import { updateViewPropertiesToggleState } from '@/server/appState/putViewPropertiesToggleStateApi';
import { useRouter } from 'next/router';
import DataTable from '@/components/DataTable/DataTable';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';

interface ViewModeState {
  _id: string;
  id: string;
  viewMode: 'list' | 'grid';
}

interface ManageProps {
  data: any;
  viewModeState: ViewModeState[];
}

const ManagePage = ({ data, viewModeState }: ManageProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(
    viewModeState[0].viewMode
  );
  const router = useRouter();
  console.log('data: ', data);

  useEffect(() => {
    const updateDatabase = async () => {
      try {
        await updateViewPropertiesToggleState(viewModeState[0].id, viewMode);
      } catch (error: any) {
        console.error('Error updating view mode:', error.message);
      }
    };

    updateDatabase();
  }, [viewMode, viewModeState, updateViewPropertiesToggleState]);

  // Remove specific keys and combine address details
  const modifiedTableData = data.map((property: any) => {
    const {
      _id,
      id,
      image,
      amenities,
      address,
      city,
      state,
      zip,
      propertyValue,
      monthlyRentalIncome,
      notes,
      ...rest
    } = property;
    const combinedAddress = `${address}, ${city}, ${state} ${zip}`;

    // Format propertyValue and monthlyRentalIncome to USD
    const formattedPropertyValue = useCurrencyFormatter(propertyValue);
    const formattedMonthlyRentalIncome =
      useCurrencyFormatter(monthlyRentalIncome);

    return {
      id,
      address: combinedAddress,
      propertyValue: formattedPropertyValue,
      monthlyRentalIncome: formattedMonthlyRentalIncome,
      ...rest,
    };
  });

  const handleViewProperty = (id: string) => {
    router.push(`/manage/${id}`);
  };

  const handleDeleteProperty = (id: string) => {
    // Implement your logic for deleting a property here
    console.log('Delete property clicked with ID:', id);
  };

  const actions = [
    {
      label: 'View',
      icon: <EyeIcon />,
      onClick: (id: string) => handleViewProperty(id),
    },
    {
      label: 'Delete',
      icon: <TrashIcon />,
      onClick: (id: string) => handleDeleteProperty(id),
    },
  ];

  const handleViewModeClick = (newMode: 'list' | 'grid') => {
    setViewMode(newMode);
  };

  const handleAddNewProperty = () => {
    router.push('/add-property');
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto pb-12">
        <div className="mb-4 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
            <button
              type="button"
              className={`rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
              onClick={() => handleViewModeClick('list')}
            >
              <Bars4Icon
                className="h-5 w-5"
                aria-hidden="true"
              />
              <span className="sr-only">Use list view</span>
            </button>
            <button
              type="button"
              className={`ml-0.5 rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : ''
              }`}
              onClick={() => handleViewModeClick('grid')}
            >
              <Squares2X2Icon
                className="h-5 w-5"
                aria-hidden="true"
              />
              <span className="sr-only">Use grid view</span>
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={handleAddNewProperty}
          >
            <PlusIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
            Add Property
          </button>
        </div>
        {viewMode === 'list' ? (
          <DataTable
            data={modifiedTableData}
            actions={actions}
          />
        ) : (
          <PropertyCardGrid properties={data} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const data = await getProperties();
    const viewPropertiesToggleState = await getViewPropertiesToggleState();

    return {
      props: {
        data,
        viewModeState: viewPropertiesToggleState,
        error: false,
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

export default ManagePage;
