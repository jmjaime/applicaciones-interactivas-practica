import { EventEmitter } from "node:events";
import { Comment } from "../data";

// Nombre del evento → argumentos que lleva. Tipar los eventos es el
// equivalente a documentar el contrato entre quien publica y quien escucha.
type AppEvents = {
  "comment.created": [Comment];
};

// Bus de eventos en memoria: la versión más chica posible de un broker
// (RabbitMQ, Kafka, SQS). Mismo patrón publicar/suscribirse, sin red.
export const events = new EventEmitter<AppEvents>();
