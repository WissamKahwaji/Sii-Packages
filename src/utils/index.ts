export function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  // Check if the price is an integer
  if (Number.isInteger(price)) {
    return formattedPrice.replace(/\.000$/, ""); // Remove trailing .000
  }

  return formattedPrice;
}
