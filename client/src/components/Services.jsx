import React from 'react';

function services() {
  const services = {
    Color: {
      'Full Color': '$55 and up',
      'Highlights': '$70 and up',
      'Balayage/Ombre': '$150 and up',
      'Root Touch Up': '$50'
    },
    Perm: {
      'Regular': '$50 and up',
      'Digital': '$100 and up',
      'Straight': '$140 and up'
    },
    Other: {
      'Up-do': '$40',
      'Treatment': '$35 and up'
    },
    Women: {
      'Haircut': '$18 and up',
      'Kids (9 and under)': '$15 and up',
      'with shampoo': '+ $4',
      'Shampoo and blow dry': '$15'
    },
    Men: {
      'Haircut': '$12',
      'Kids (9 and under)': '$10',
      'with shampoo': '+ $3',
      'Full Color (includes cut)': '$40'
    },
  };

  const tables = [];

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
    <div className='services-container'>
      {tables}
    </div>
  );
}

export default services;
