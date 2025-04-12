import { formatarCpfCnpj } from "../../utils/formatarCpfCnpj";

describe("formatarCpfCnpj", () => {
  it("formata CPF corretamente (string)", () => {
    expect(formatarCpfCnpj("12345678901")).toBe("123.456.789-01");
  });

  it("formata CNPJ corretamente (string)", () => {
    expect(formatarCpfCnpj("12345678000199")).toBe("12.345.678/0001-99");
  });

  it("retorna string original se formato não for válido", () => {
    expect(formatarCpfCnpj("123432")).toBe("123432");
  });

  it("retorna string original se for passado caracteres ao inves de numeros", () => {
    expect(formatarCpfCnpj("cpf passado errado")).toBe("cpf passado errado");
  });
});
