import { EstadoPedido, siguienteEstado } from "./estado-pedido";

describe("siguienteEstado", () => {
  it("pasa de Pendiente a Enviado", () => {
    expect(siguienteEstado(EstadoPedido.Pendiente)).toBe(EstadoPedido.Enviado);
  });

  it("pasa de Enviado a Entregado", () => {
    expect(siguienteEstado(EstadoPedido.Enviado)).toBe(EstadoPedido.Entregado);
  });

  it("se queda en Entregado, que es el estado final", () => {
    expect(siguienteEstado(EstadoPedido.Entregado)).toBe(EstadoPedido.Entregado);
  });
});
