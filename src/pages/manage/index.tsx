import React from 'react';
// import styles from './Manage.module.css';
import PropertyCardGrid from '../../components/PropertyCardGrid/PropertyCardGrid';
import properties from '@/server/data';

const Manage = ({ data }: { data: any }) => {
  return (
    <div className="min-h-full">
      <div className="mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <PropertyCardGrid properties={data} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    // Fetch all property data from the database
    const data = properties;

    // Pass property data to the component
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
