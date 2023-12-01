import React from 'react';
import styles from './Manage.module.css';
import PropertyCardGrid from '../../components/PropertyCardGrid/PropertyCardGrid';
import { useSelector } from 'react-redux';
import connectDB from '../../server/db';
import Property from '../../models/property';

const Manage = ({ data }: { data: any }) => {
  console.log('data: ', data);
  return (
    <div className="min-h-full">
      <div className="mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <PropertyCardGrid properties={data} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  await connectDB();

  try {
    // Fetch all property data from the database
    const data = await Property.find({});

    // Pass property data to the component
    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
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
}

export default Manage;
