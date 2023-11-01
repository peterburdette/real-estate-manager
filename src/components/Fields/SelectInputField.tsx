import React from 'react';

interface SelectInputFieldProps {
  id: string;
  label: string;
  name: string;
  options: string[];
}

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  id,
  label,
  name,
  options,
}) => (
  <>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <select
        id={id}
        name={name}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  </>
);

export default SelectInputField;
