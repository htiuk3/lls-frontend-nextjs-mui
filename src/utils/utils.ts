export function withCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CONSTANTS = {
  imageHolder: "https://placehold.co/200x200.png"
}