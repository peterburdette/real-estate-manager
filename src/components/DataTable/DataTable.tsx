import React from 'react';

interface DataTableProps {
  data: any[];
  actions?: {
    label?: string;
    icon?: React.ReactNode; // This will accept any React node, including icons
    onClick: (id: string) => void;
  }[];
}

const DataTable: React.FC<DataTableProps> = ({ data, actions }) => {
  const formatColumnName = (name: string) => {
    // Split camelCase and capitalize words
    return name
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter out the "id" column from the list of columns to render
  const columns =
    data.length > 0
      ? Object.keys(data[0]).filter((column) => column !== 'id')
      : [];

  const handleActionClick = (id: string, onClick: (id: string) => void) => {
    onClick(id);
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatColumnName(column)}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {item[column]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {actions.map((action, actionIndex) =>
                      action.icon ? (
                        // Render the button with icon
                        <button
                          key={actionIndex}
                          type="button"
                          className={`rounded-full p-1 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                            action.label === 'Delete'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-600 text-gray-300'
                          }`}
                          style={{
                            marginRight:
                              actionIndex !== actions.length - 1 ? '8px' : '0',
                            display: 'inline-flex',
                          }}
                          onClick={() =>
                            handleActionClick(item.id, action.onClick)
                          }
                        >
                          <span className="sr-only">{action.label}</span>
                          <span
                            style={{
                              width: '1.3em',
                              height: '1.3em',
                              color: 'white',
                            }}
                          >
                            {action.icon}
                          </span>
                        </button>
                      ) : (
                        // Render the button label if no icon is provided
                        <button
                          key={actionIndex}
                          type="button"
                          style={{
                            marginRight:
                              actionIndex !== actions.length - 1 ? '8px' : '0',
                            display: 'inline-flex',
                          }}
                          onClick={() =>
                            handleActionClick(item.id, action.onClick)
                          }
                        >
                          <span>{action.label}</span>
                        </button>
                      )
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
