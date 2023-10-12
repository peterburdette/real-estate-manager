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
      <div className={`pb-32 ${styles.customBackgroundColor}`}>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Manage
            </h1>
          </div>
        </header>
      </div>

      <div className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <PropertyCardGrid properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default Manage;
