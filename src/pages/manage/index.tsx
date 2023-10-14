import React from 'react';
import styles from './Manage.module.css';
import PropertyCardGrid from '../../components/PropertyCardGrid/PropertyCardGrid';
import { useSelector } from 'react-redux';

const Manage = () => {
  // the global 'state' is passed in by the redux 'store' => it will pick out all of the 'properties' from the state
  // 'properties' contains the current global state
  const properties = useSelector((state: any) => state.properties);

  return (
    <div className="min-h-full">
      <div className="mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <PropertyCardGrid properties={properties} />
      </div>
    </div>
  );
};

export default Manage;
