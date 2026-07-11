const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumber(input: string | number): string {
  return String(input).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPrice(input: string | number): string {
  const num = typeof input === "string" ? input.replace(/\D/g, "") : String(input);
  const formatted = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toPersianNumber(formatted);
}
