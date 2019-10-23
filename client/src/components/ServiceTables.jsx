import React from 'react';
import { services } from './services';

function serviceTables() {
  const createTableRows = (table) => {
    const keys = Object.keys(table);
    const values = Object.values(table);
    
    const tableRows = keys.map((key, i) => {
      return (
        <tr key={i}>
          <td key={key}>{key}</td>
          <td key={values[i]}>{values[i]}</td>
        </tr>
      );
    });
    
    return tableRows;
  };

  const tables = [];

  for (let key in services) {
    tables.push(
      <table key={key}>
        <thead>
          <tr>
            <th>{key}</th>
            <th>{'Price'}</th>
          </tr>
        </thead>
        <tbody>
          {createTableRows(services[key])}
        </tbody>
      </table>
    );
  }

  return (
    <div className='service-tables-container'>
      {tables}
    </div>
  );
}

export default serviceTables;
