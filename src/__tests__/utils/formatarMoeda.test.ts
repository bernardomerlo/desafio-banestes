import { formatarMoeda } from "../../utils/formatarMoeda";

describe("formatarMoeda", () => {
  it("converte string para número corretamente", () => {
    expect(formatarMoeda("1.234,56")).toBe(1234.56);
  });

  it("retorna 0 caso valor seja vazios", () => {
    expect(formatarMoeda("")).toBe(0);
  });
});
