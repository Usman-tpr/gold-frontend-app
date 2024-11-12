const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return number;
    //   return number.toString();
  };
  
  const formatNumberWithCommas = (number) => {
    if (typeof number !== "number") {
      return "";
    }
    
    // Convert the number to a string and use a regular expression to insert commas
    return number.toLocaleString();
  };
  
  const stringConcat = (text, length) => {
    if (typeof text !== "string") {
      return "";
    }
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };
  
  export { formatNumber, stringConcat,formatNumberWithCommas };
  