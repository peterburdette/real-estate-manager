import React from 'react';
import Link from 'next/link';
import styles from './PropertyCard.module.css';
import { EyeIcon, XMarkIcon } from '@heroicons/react/20/solid';

const PropertyCard = ({ property, onDelete }: any) => {
  return (
    <li
      key={property.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-3">
        <Link href={`/manage/${property.id}`}>
          <img
            src={property.image}
            alt=""
            className={`${styles.cardImg} pointer-events-none object-cover group-hover:opacity-75`}
          />
        </Link>

        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {property.address}
          <br />
          {property.city}, {property.state} {property.zip}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">
            {property.bedrooms} bds {property.bathrooms} ba &mdash;{' '}
            {property.squareFeet} sqft
          </dd>
          <dt className="sr-only">Availability</dt>
          <dd className="mt-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 ${
                property.availability === 'Available'
                  ? 'bg-green-50 text-green-700 ring-green-600/20'
                  : 'bg-red-50 text-red-700 ring-red-600/20'
              }`}
            >
              {property.availability}
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
              href={`/manage/${property.id}`}
            >
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <span
              className={`relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 ${styles.button}`}
              onClick={() => onDelete(property.id)}
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PropertyCard;
