import React from 'react';

const serviceMenu = () => {
  return (
    <div>
      <fieldset className='hair-services-fieldset haircut-fieldset'>
        <legend>Haircut</legend>
        <div className='service-option-container'>
          <input type='checkbox' value='Women Haircut' id='Women Haircut' className='services-option' />
          <label htmlFor='Women Haircut' className='appt-form-label'>Women</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Men Haircut' id='Men Haircut' className='services-option' />
          <label htmlFor='Men Haircut' className='appt-form-label'>Men</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Girls Haircut' id='Girls Haircut' className='services-option' />
          <label htmlFor='Girls Haircut' className='appt-form-label'>Girls (9 and under)</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Boys Haircut' id='Boys Haircut' className='services-option' />
          <label htmlFor='Boys Haircut' className='appt-form-label'>Boys (9 and under)</label>
        </div>
      </fieldset>
      <fieldset className='hair-services-fieldset color-fieldset'>
        <legend>Color</legend>
        <div className='service-option-container'>
          <input type='checkbox' value='Women Color' id='Women Color' className='services-option' />
          <label htmlFor='Women Color' className='appt-form-label'>Women</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Men Color' id='Men Color' className='services-option' />
          <label htmlFor='Men Color' className='appt-form-label'>Men</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Highlights' id='Highlights' className='services-option' />
          <label htmlFor='Highlights' className='appt-form-label'>Highlights</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Balayage/Ombre' id='Balayage/Ombre' className='services-option' />
          <label htmlFor='Balayage/Ombre' className='appt-form-label'>Balayage/Ombre</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Root Touch Up' id='Root Touch Up' className='services-option' />
          <label htmlFor='Root Touch Up' className='appt-form-label'>Root Touch Up</label>
        </div>
      </fieldset>
      <fieldset className='hair-services-fieldset perm-fieldset'>
        <legend>Perm</legend>
        <div className='service-option-container'>
          <input type='checkbox' value='Regular Perm' id='Regular Perm' className='services-option' />
          <label htmlFor='Regular Perm' className='appt-form-label'>Regular</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Digital Perm' id='Digital Perm' className='services-option' />
          <label htmlFor='Digital Perm' className='appt-form-label'>Digital</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Straight Perm' id='Straight Perm' className='services-option' />
          <label htmlFor='Straight Perm' className='appt-form-label'>Straight</label>
        </div>
      </fieldset>
      <fieldset className='hair-services-fieldset'>
        <legend>Additional</legend>
        <div className='service-option-container'>
          <input type='checkbox' value='Shampoo and Blow Dry' id='Shampoo and Blow Dry' className='services-option' />
          <label htmlFor='Shampoo and Blow Dry' className='appt-form-label'>Shampoo and Blow Dry</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Treatment' id='Treatment' className='services-option' />
          <label htmlFor='Treatment' className='appt-form-label'>Treatment</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Up-do' id='Up-do' className='services-option' />
          <label htmlFor='Up-do' className='appt-form-label'>Up-do</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Women Shampoo' id='Women Shampoo' className='services-option' />
          <label htmlFor='Women Shampoo' className='appt-form-label'>Women Shampoo</label>
        </div>
        <div className='service-option-container'>
          <input type='checkbox' value='Men Shampoo' id='Men Shampoo' className='services-option' />
          <label htmlFor='Men Shampoo' className='appt-form-label'>Men Shampoo</label>
        </div>
      </fieldset>
    </div>
  );
}

export default serviceMenu;