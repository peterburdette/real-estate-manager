import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import TextInputField from '../Fields/TextInputField';
import SelectInputField from '../Fields/SelectInputField';
import CoverPhotoInputField from '../Fields/CoverPhotoInputField';

const AddPropertyForm = () => {
  return (
    <form>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Property Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide details about your property to manage your property
              efficiently and keep track of your real estate assets.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="col-span-full">
              <CoverPhotoInputField />
            </div>

            <div className="col-span-full">
              <TextInputField
                id="street-address"
                label="Street Address"
                name="street-address"
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <TextInputField
                id="city"
                label="City"
                name="city"
              />
            </div>

            <div className="sm:col-span-2">
              <TextInputField
                id="region"
                label="State / Province"
                name="region"
              />
            </div>

            <div className="sm:col-span-2">
              <TextInputField
                id="postal-code"
                label="ZIP / Postal code"
                name="postal-code"
              />
            </div>

            <div className="sm:col-span-3">
              <SelectInputField
                id="country"
                label="Country"
                name="country"
                options={['United States', 'Canada', 'Mexico']}
              />
            </div>

            <div className="col-span-full flex justify-end">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 mr-6"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPropertyForm;
