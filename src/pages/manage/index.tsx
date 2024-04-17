import React, { useEffect, useState } from 'react';
import PropertyCardGrid from '@/components/PropertyCardGrid/PropertyCardGrid';
// import ListView from '@/components/ListView/ListView'; // Import your ListView component
import { getProperties } from '@/server/properties/getPropertiesApi';
import { Bars4Icon, PlusIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { getViewPropertiesToggleState } from '@/server/appState/getViewPropertiesToggleStateApi';
import { updateViewPropertiesToggleState } from '@/server/appState/putViewPropertiesToggleStateApi';
import { useRouter } from 'next/router';

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
            New Property
          </button>
        </div>
        {viewMode === 'list' ? (
          'list view'
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
