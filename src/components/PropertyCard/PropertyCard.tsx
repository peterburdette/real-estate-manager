import React from 'react';
import Link from 'next/link';

// 'useDispatch' allows this component to utilize the 'useDispatch()' function to dispatch actions to the store
import { useDispatch } from 'react-redux';
// importing the 'deleteProperty' from 'propertySlice' so the 'deleteProperty()' function can be passed as an 'action' into 'dispatch()'
import { deleteProperty } from '../../app/reducers/propertySlice';
import styles from './PropertyCard.module.css';
import { EyeIcon, XMarkIcon } from '@heroicons/react/20/solid';

const PropertyCard = (props: any) => {
  const dispatch = useDispatch();

  const deletePropertyHandler = () => {
    dispatch(deleteProperty({ id: props.property.id }));
  };

  return (
    <li
      key={props.property.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-3">
        <Link href={`/manage/${props.property.id}`}>
          <img
            src={props.property.image}
            alt=""
            className={`${styles.cardImg} pointer-events-none object-cover group-hover:opacity-75`}
          />
        </Link>

        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {props.property.address}
          <br />
          {props.property.city}, {props.property.state} {props.property.zip}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">
            {props.property.bedrooms} bds {props.property.bathrooms} ba &mdash;{' '}
            {props.property.squareFeet} sqft
          </dd>
          <dt className="sr-only">Availability</dt>
          <dd className="mt-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 ${
                props.property.availability === 'Available'
                  ? 'bg-green-50 text-green-700 ring-green-600/20'
                  : 'bg-red-50 text-red-700 ring-red-600/20'
              }`}
            >
              {props.property.availability}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              className={`relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 ${styles.button}`}
              role="button"
              href={`/manage/${props.property.id}`}
            >
              <EyeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <span
              className={`relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 ${styles.button}`}
              onClick={deletePropertyHandler}
            >
              <XMarkIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PropertyCard;
