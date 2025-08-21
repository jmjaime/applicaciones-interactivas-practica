import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
// Nota: usamos Attendee como "usuario" del evento en este ejercicio
import { Attendee as EventUser } from "./entities/Attendee";
import { Event } from "./entities/Event";
import { Venue } from "./entities/Venue";
import { Ticket } from "./entities/Ticket";

// Ejercicio 04 – Lazy vs Eager
// Instrucciones: Implementá las funciones TODO enfocadas en cargar relaciones eficientemente.

export async function clearLazyEagerData(): Promise<void> {
  await AppDataSource.getRepository(Ticket).clear();
  await AppDataSource.getRepository(Event).clear();
  await AppDataSource.getRepository(Venue).clear();
  await AppDataSource.getRepository(EventUser).clear();
}

export async function seedBasicEvent(): Promise<{
  event: Event;
  venue: Venue;
}> {
  // TODO: crear un Venue y un Event asociado. Devolver ambos
  throw new Error("TODO: Implement seedBasicEvent");
}

export async function listEventsWithVenue(): Promise<Event[]> {
  // TODO: devolver eventos con su venue usando relations o leftJoinAndSelect
  throw new Error("TODO: Implement listEventsWithVenue");
}

export async function listEventsWithTicketsCount(): Promise<
  Array<{ id: number; title: string; tickets: number }>
> {
  // TODO: usar QueryBuilder para traer conteo de tickets por evento (LEFT JOIN + COUNT)
  throw new Error("TODO: Implement listEventsWithTicketsCount");
}
