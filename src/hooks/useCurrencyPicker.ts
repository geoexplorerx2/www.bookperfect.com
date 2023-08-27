export const useCurrencyPicker = (currency:any) => {
    switch (currency) {
      case 'EUR':
        return "€" 
      case 'USD':
        return "$"  
      case 'TRY':
        return "₺" 
      case 'GBP':
        return "£"  
      default:
        break;
    }
  };

  export default useCurrencyPicker