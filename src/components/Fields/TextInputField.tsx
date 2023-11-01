import React from 'react';

interface TextInputFieldProps {
  id: string;
  label: string;
  name: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ id, label, name }) => (
  <div className="col-span-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        type="text"
        name={name}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);

export default TextInputField;
