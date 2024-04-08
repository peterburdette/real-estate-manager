const data = [
  {
    id: 1,
    date: '01/01/24',
    type: 'Reports',
    documentName: '2024 Tenants',
  },
  {
    id: 2,
    date: '02/01/24',
    type: 'Statements',
    documentName: '2024 Expenses',
  },
  {
    id: 3,
    date: '03/01/24',
    type: 'Statements',
    documentName: '2024 Ledger',
  },
];

const DataTable = () => {
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
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg border-b border-gray-300">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Date
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Document Name
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
              >
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((document) => (
              <tr key={document.id}>
                <td
                  className="border-t border-transparent
                  relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                >
                  <div className="font-medium text-gray-900">
                    {document.date}
                  </div>

                  <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                </td>
                <td className="border-t border-gray-200 hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  {document.type}
                </td>
                <td className="border-t border-gray-200 hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  {document.documentName}
                </td>
                <td className="border-t border-transparent relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Download
                  </button>
                  <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
