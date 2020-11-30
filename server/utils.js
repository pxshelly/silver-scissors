const sanitizeAppt = (appt) => {
  if (typeof appt !== 'object' || !appt) {
    return null;
  };
  const requiredFields = {
    customer_name: true,
    stylist: true,
    hair_services: true,
    appt_date: true,
    appt_time: true,
    telephone: true,
    textable: true,
    appt_status: true
  }
  const orderedFields = ['user_id', 'customer_name', 'stylist', 'hair_services', 'appt_date', 'appt_time', 'email', 'telephone', 'textable', 'notes', 'pictures', 'price', 'duration_hours', 'duration_minutes', 'appt_status', 'approved_by'];
  if (appt.id) {
    orderedFields.push('id');
  }
  return orderedFields.reduce((sanitizedAppt, currentField) => {
    if (currentField === 'telephone') {
      sanitizedAppt[currentField] = Number(appt[currentField].replace(/[^0-9]*/gm, ''));
    } else if (appt[currentField] !== undefined) {
      sanitizedAppt[currentField] = appt[currentField];
    } else if (requiredFields[currentField] && appt[currentField] === undefined) {
      return null;
    } else {
      sanitizedAppt[currentField] = null;
    }
    return sanitizedAppt;
  }, {});
};

module.exports = { sanitizeAppt };