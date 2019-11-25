import React from 'react';
import { services } from '../shared/services';

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
    if (key.includes('Image')) {
      tables.push(
        <img src={services[key]} />);
    } else {
      tables.push(
        <table key={key} className='table-pairs'>
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
  }

  for (let i = 0; i < tables.length; i += 3) {
    tables.splice(i, 0, <br key={i} />);
  }

  return (
    <div className='service-tables-container'>
      {tables}
    </div>
  );
}

export default serviceTables;
