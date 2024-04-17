import React from 'react';

interface DataTableProps {
  data: any[];
  actions?: (string | JSX.Element)[];
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

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

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
                    {actions.map((action, actionIndex) => (
                      <React.Fragment key={actionIndex}>
                        {typeof action === 'string' ? (
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            style={{
                              marginRight:
                                actionIndex !== actions.length - 1
                                  ? '8px'
                                  : '0',
                            }}
                          >
                            {action}
                          </a>
                        ) : (
                          <div
                            style={{
                              display: 'inline-block',
                              marginRight:
                                actionIndex !== actions.length - 1
                                  ? '8px'
                                  : '0',
                            }}
                          >
                            {action}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
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
