import React from 'react';
import DataTable from '@/components/DataTable/DataTable';

const DownloadsPage = () => {
  const documents = [
    {
      document: 'Lease Agreement',
      category: 'Legal Documents',
      fileType: 'PDF',
      size: '1.5 MB',
    },
    {
      document: 'Tenant Application Form',
      category: 'Applications',
      fileType: 'Word',
      size: '0.8 MB',
    },
    {
      document: 'Property Inspection Report',
      category: 'Inspections',
      fileType: 'PDF',
      size: '2.2 MB',
    },
    {
      document: 'Maintenance Request Form',
      category: 'Maintenance',
      fileType: 'PDF',
      size: '0.6 MB',
    },
    {
      document: 'Tenant Welcome Guide',
      category: 'Guides',
      fileType: 'PDF',
      size: '3.0 MB',
    },
  ];
  const actions = [
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Download
    </button>,
  ];

  return (
    <div className="mx-auto border-b border-gray-900/10 pb-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Reports and Documents
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Welcome to Download Center. Here, you can access all the essential
            reports and documents related to your properties and tenants.
            Whether you need financial statements, lease agreements, maintenance
            logs, or other important files, you'll find everything you need
            right here. To download a document, simply click on the respective
            link below.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download All
          </button>
        </div>
      </div>

      <DataTable
        data={documents}
        actions={actions}
      />
    </div>
  );
};

export default DownloadsPage;
