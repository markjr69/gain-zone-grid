export function formatShs(value: number): string {
  return `${Math.round(value).toLocaleString("en-US")} Shs`;
}
