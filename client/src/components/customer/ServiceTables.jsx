import React from 'react';

const serviceTables = () => {
  return (
    <div className='service-tables-container'>
      <div className='haircut-table'>
        <table>
          <h2 className='service-heading haircut-heading'>Haircut</h2>
          <tbody>
            <tr>
              <td>Women</td>
              <td>$21+</td>
            </tr>
            <tr>
              <td>Men</td>
              <td>$15</td>
            </tr>
            <tr>
              <td>Girls (9 and under)</td>
              <td>$15+</td>
            </tr>
            <tr>
              <td>Boys (9 and under)</td>
              <td>$13</td>
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
          <h2 className='service-heading color-heading'>Color</h2>
          <tbody>
            <tr>
              <td>Women</td>
              <td>$60+</td>
            </tr>
            <tr>
              <td>Men</td>
              <td>$50</td>
            </tr>
            <tr>
              <td>Highlights</td>
              <td>$80+</td>
            </tr>
            <tr>

              <td>Balayage/Ombre</td>
              <td>$150+</td>
            </tr>
            <tr>
              <td>Root Touch Up</td>
              <td>$55</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='perm-table'>
        <table>
          <h2 className='service-heading'>Perm</h2>
          <tbody>
            <tr>
              <td>Regular</td>
              <td>$55+</td>
            </tr>
            <tr>
              <td>Digital</td>
              <td>$120+</td>
            </tr>
            <tr>
              <td>Straight</td>
              <td>$150+</td>
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
          <h2 className='service-heading additional-heading'>Additional</h2>
          <tbody>
            <tr>
              <td>Shampoo</td>
              <td>$3-8</td>
            </tr>
            <tr>
              <td>Shampoo and blow dry</td>
              <td>$15+</td>
            </tr>
            <tr>
              <td>Treatment</td>
              <td>$40+</td>
            </tr>
            <tr>
              <td>Up-do</td>
              <td>$45+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default serviceTables;
