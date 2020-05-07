import React from 'react';

const serviceTables = () => {
  return (
    <div className='service-tables-container'>
      <div className='haircut-table'>
        <table>
          <thead>
            <tr>
              <th>Haircut</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Women</td>
              <td>$18 and up</td>
            </tr>
            <tr>
              <td>Men</td>
              <td>$12</td>
            </tr>
            <tr>
              <td>Girls (9 and under)</td>
              <td>$15 and up</td>
            </tr>
            <tr>
              <td>Boys (9 and under)</td>
              <td>$10</td>
            </tr>
          </tbody>
        </table>
        <div className='service-image'>
          <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5836.jpg' />
          <div className='table-img-overlay-right'>
            <div className='table-img-overlay-text'>Haircuts</div>
          </div>
        </div>
      </div>
      <div className='color-table'>
        <div className='service-image'>
          <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5751.jpg' />
          <div className='table-img-overlay-color'>
            <div className='table-img-overlay-text'>Coloring</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Women</td>
              <td>$55 and up</td>
            </tr>
            <tr>
              <td>Men</td>
              <td>$40</td>
            </tr>
            <tr>
              <td>Highlights</td>
              <td>$70 and up</td>
            </tr>
            <tr>

              <td>Balayage/Ombre</td>
              <td>$150 and up</td>
            </tr>
            <tr>
              <td>Root Touch Up</td>
              <td>$50</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='perm-table'>
        <table>
          <thead>
            <tr>
              <th>Perm</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular</td>
              <td>$50 and up</td>
            </tr>
            <tr>
              <td>Digital</td>
              <td>$100 and up</td>
            </tr>
            <tr>
              <td>Straight</td>
              <td>$140 and up</td>
            </tr>
          </tbody>
        </table>
        <div className='service-image'>
          <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5859.jpg' />
          <div className='table-img-overlay-right'>
            <div className='table-img-overlay-text'>Perms</div>
          </div>
        </div>
      </div>
      <div className='additional-table'>
        <div className='service-image'>
          <img src='https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5912.jpg' />
          <div className='table-img-overlay-left'>
            <div className='table-img-overlay-text'>Additional</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Additional</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shampoo and blow dry</td>
              <td>$15</td>
            </tr>
            <tr>
              <td>Treatment</td>
              <td>$35 and up</td>
            </tr>
            <tr>
              <td>Up-do</td>
              <td>$40</td>
            </tr>
            <tr>
              <td>Shampoo</td>
              <td>$4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default serviceTables;
