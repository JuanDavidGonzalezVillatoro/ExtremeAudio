export function calcDiscountedPrice(price, discount) {
    if (!discount) return price;
  
    const discountAmount = (price * discount) / 100;
    const total = price - discountAmount;
    const finalPrice = total.toFixed(2);
    
    return finalPrice;
  }