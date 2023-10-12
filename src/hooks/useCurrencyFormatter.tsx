import React from 'react';

const useCurrencyFormatter = (num: number) => {
  const convertCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return convertCurrency(num);
};

export default useCurrencyFormatter;
