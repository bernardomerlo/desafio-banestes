export function formatarMoeda(str: string | number | null | undefined): number {
  if (str === null || str === undefined) return 0;

  if (typeof str === "number") return str;

  return (
    Number(
      str
        .replace(/\s/g, "")
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", "."),
    ) || 0
  );
}
