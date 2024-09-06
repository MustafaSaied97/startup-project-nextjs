import React from 'react';

const Table = ({ children, className }) => {
  return (
    <section className={`rounded-md border ${className}`}>
      <table className='w-full text-xs sm:text-sm'>{children}</table>
    </section>
  );
};

const TableHeader = ({ children }) => {
  return <thead className='hidden sm:table-header-group'>{children}</thead>;
};

const TableHeaderRow = ({ children, className }) => {
  return (
    <tr className={`border-b text-sm font-medium ${className}`} role='row'>
      {children}
    </tr>
  );
};

const TableHeaderCell = ({ children, className }) => {
  return (
    <th scope='col' className={`px-6 py-3 text-start ${className}`} role='columnheader'>
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children, className }) => {
  return (
    <tr
      className={`mb-4 rounded-lg border-b p-4 text-base sm:mb-0 sm:rounded-none sm:border-none sm:bg-transparent sm:p-0 ${className}`}
      role='row'
    >
      {children}
    </tr>
  );
};

const TableCell = ({ children, header, isMobileHeader = true, className }) => {
  return (
    <td
      className={`relative flex items-center ${isMobileHeader ? 'justify-between' : 'justify-center'} px-6 py-4 text-center sm:table-cell ${className}`}
      role='cell'
    >
      {isMobileHeader && (
        <p className='text-[clamp(0.7rem,_2.5vw,_1rem)] font-bold text-gray-500 sm:hidden' aria-hidden='true'>
          {header}
        </p>
      )}
      {children}
    </td>
  );
};

// Compound components for the Table
Table.Header = TableHeader;
Table.HeaderRow = TableHeaderRow;
Table.HeaderCell = TableHeaderCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
