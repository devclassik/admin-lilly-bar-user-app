export const formatCurrency = (amount = 0, locale = "en-NG", currency = "NGN") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  export const formatNumber = (number = 0, locale = "en-NG", options = {}) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(number);
  };
  