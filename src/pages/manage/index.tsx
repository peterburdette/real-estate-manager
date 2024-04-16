import React, { useState } from 'react';
import PropertyCardGrid from '@/components/PropertyCardGrid/PropertyCardGrid';
// import ListView from '@/components/ListView/ListView'; // Import your ListView component
import { getProperties } from '@/server/properties/getPropertiesApi';
import { Bars4Icon, Squares2X2Icon } from '@heroicons/react/24/solid';

const Manage = ({ data }: { data: any }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleListViewClick = () => {
    setViewMode('list');
  };

  const handleGridViewClick = () => {
    setViewMode('grid');
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto pb-12">
        <div className="mb-4 py-4 flex items-center border-b border-gray-200">
          <div className="items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
            <button
              type="button"
              className={`rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
              onClick={handleListViewClick}
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
              onClick={handleGridViewClick}
            >
              <Squares2X2Icon
                className="h-5 w-5"
                aria-hidden="true"
              />
              <span className="sr-only">Use grid view</span>
            </button>
          </div>
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

    return {
      props: {
        data,
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

export default Manage;
