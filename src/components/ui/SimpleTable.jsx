import React from 'react';

const SimpleTable = ({ columns = [], data = [], rowKey = 'id', isMobileHeader = true }) => {
  return (
    <section className='rounded-md border'>
      <table className='w-full text-xs sm:text-sm'>
        <thead className='hidden border-b text-sm font-medium sm:table-header-group'>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope='col' className='px-6 py-3 text-start'>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[rowKey]}
              className='mb-4 rounded-lg border-b p-4 text-base sm:mb-0 sm:rounded-none sm:border-none sm:bg-transparent sm:p-0'
              role='row'
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`relative flex items-center ${isMobileHeader ? 'justify-between' : 'justify-center'} px-6 py-4 text-center sm:table-cell`}
                  role='cell'
                >
                  {isMobileHeader && (
                    <p className='text-[clamp(0.7rem,_2.5vw,_1rem)] font-bold text-gray-500 sm:hidden' aria-hidden='true'>
                      {column.header}
                    </p>
                  )}
                  {column.renderCell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SimpleTable;
