import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearLazyEagerData,
  seedBasicEvent,
  listEventsWithVenue,
  listEventsWithTicketsCount,
} from "./exercise";

describe("Ejercicio 04 - Lazy vs Eager", () => {
  beforeAll(async () => {
    await initializeDatabase("ej04");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearLazyEagerData();
  });

  it("crea evento con venue asociado", async () => {
    const { event, venue } = await seedBasicEvent();
    expect(event.id).toBeDefined();
    expect(venue.id).toBeDefined();
  });

  it("lista eventos con venue (una sola consulta con join)", async () => {
    await seedBasicEvent();
    const events = await listEventsWithVenue();
    expect(events.length).toBeGreaterThanOrEqual(1);
    expect(events[0].venue).toBeDefined();
  });

  it("trae conteo de tickets por evento con QueryBuilder", async () => {
    await seedBasicEvent();
    const counts = await listEventsWithTicketsCount();
    expect(counts.length).toBeGreaterThanOrEqual(1);
    expect(counts[0]).toHaveProperty("tickets");
  });
});
