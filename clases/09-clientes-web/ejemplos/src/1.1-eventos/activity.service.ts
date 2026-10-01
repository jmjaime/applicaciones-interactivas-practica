import { activities, newId } from "../data";

// Interruptor para simular que el módulo de Actividad está caído (en un
// sistema distribuido: otro servicio que no responde).
let down = false;

export const activityService = {
  setDown(value: boolean) {
    down = value;
  },
  register(type: "COMMENT", sourceId: string) {
    if (down) throw new Error("Activity no disponible");
    const activity = { id: newId(), type, sourceId, read: false, createdAt: new Date() };
    activities.push(activity);
    return activity;
  },
};
