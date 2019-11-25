const services = {
  Haircut: {
    'Women Haircut': '$18 and up',
    'Men Haircut': '$12',
    'Girls (9 and under)': '$15 and up',
    'Boys (9 and under)': '$10'
  },
  haircutImage: 'https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5751.jpg',
  colorImage: 'https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5836.jpg',
  Color: {
    'Women Full Color': '$55 and up',
    'Men Full Color' : '$40',
    'Highlights': '$70 and up',
    'Balayage/Ombre': '$150 and up',
    'Root Touch Up': '$50',
  },
  Perm: {
    'Regular Perm': '$50 and up',
    'Digital Perm': '$100 and up',
    'Straight Perm': '$140 and up',
  },
  permImage: 'https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5859.jpg',
  additionalImage: 'https://silver-scissors.s3-us-west-1.amazonaws.com/IMG_5912.jpg',
  Additional: {
    'Shampoo and blow dry': '$15',
    'Treatment': '$35 and up',
    'Up-do': '$40',
    'Women Shampoo': '+ $4',
    'Men Shampoo': '+ $3'
  }
};

module.exports = { services };