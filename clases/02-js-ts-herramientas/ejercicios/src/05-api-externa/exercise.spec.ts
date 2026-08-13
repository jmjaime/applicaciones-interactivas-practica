import request from "supertest";
import { app } from "../app";

describe("GET /clima/:ciudad/resumen", () => {
  const fetchMock = jest.spyOn(global, "fetch");

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          results: [{ latitude: -31.4, longitude: -64.2, name: "Córdoba" }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          current_weather: { temperature: 18.4, windspeed: 12.1, weathercode: 1 },
        }),
      } as Response);
  });

  it("arma un resumen legible con la ciudad, temperatura y viento redondeados", async () => {
    const res = await request(app).get("/clima/cordoba/resumen");

    expect(res.status).toBe(200);
    expect(res.body.ciudad).toBe("Córdoba");
    expect(res.body.resumen).toBe("18°C en Córdoba, viento 12 km/h");
  });

  it("propaga el 404 si la ciudad no existe", async () => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ results: [] }),
    } as Response);

    const res = await request(app).get("/clima/asdasdasd/resumen");
    expect(res.status).toBe(404);
  });
});
