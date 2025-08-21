import "reflect-metadata";
import { DataSource } from "typeorm";

export let AppDataSource: DataSource;

function resolveEntities(scope?: string): any[] {
  const s = (scope || process.env.EJ_SCOPE || "ej01,ej02")
    .split(",")
    .map((x) => x.trim());

  const entities: any[] = [];

  if (s.includes("ej01")) {
    // Ejercicio 1
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Library } = require("../ejercicio-01-entities/entities/Library");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {
      BookGenre,
    } = require("../ejercicio-01-entities/entities/BookGenre");
    entities.push(Library, BookGenre);
  }

  if (s.includes("ej02")) {
    // Ejercicio 2
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Doctor } = require("../ejercicio-02-restrictions/entities/Doctor");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {
      Patient,
    } = require("../ejercicio-02-restrictions/entities/Patient");
    entities.push(Doctor, Patient);
  }

  if (s.includes("ej03")) {
    const { Chef } = require("../ejercicio-03-relations/entities/Chef");
    const {
      Restaurant,
    } = require("../ejercicio-03-relations/entities/Restaurant");
    const { Menu } = require("../ejercicio-03-relations/entities/Menu");
    const { Dish } = require("../ejercicio-03-relations/entities/Dish");
    const {
      Ingredient,
    } = require("../ejercicio-03-relations/entities/Ingredient");
    entities.push(Chef, Restaurant, Menu, Dish, Ingredient);
  }

  if (s.includes("ej04")) {
    const { Event } = require("../ejercicio-04-lazy-eager/entities/Event");
    const { Venue } = require("../ejercicio-04-lazy-eager/entities/Venue");
    const {
      Attendee,
    } = require("../ejercicio-04-lazy-eager/entities/Attendee");
    const { Ticket } = require("../ejercicio-04-lazy-eager/entities/Ticket");
    entities.push(Event, Venue, Attendee, Ticket);
  }

  if (s.includes("ej05")) {
    const {
      Category,
    } = require("../ejercicio-05-transacciones/entities/Category");
    const { Member } = require("../ejercicio-05-transacciones/entities/Member");
    const { Book } = require("../ejercicio-05-transacciones/entities/Book");
    const { Loan } = require("../ejercicio-05-transacciones/entities/Loan");
    const { Fine } = require("../ejercicio-05-transacciones/entities/Fine");
    const {
      Payment,
    } = require("../ejercicio-05-transacciones/entities/Payment");
    entities.push(Category, Member, Book, Loan, Fine, Payment);
  }

  if (s.includes("ej06")) {
    const { Student } = require("../ejercicio-06-embedded/entities/Student");
    entities.push(Student);
  }

  if (s.includes("ej07")) {
    const {
      Department,
    } = require("../ejercicio-07-query-builder/entities/Department");
    const {
      Employee,
    } = require("../ejercicio-07-query-builder/entities/Employee");
    const {
      Project,
    } = require("../ejercicio-07-query-builder/entities/Project");
    const { Skill } = require("../ejercicio-07-query-builder/entities/Skill");
    const { Task } = require("../ejercicio-07-query-builder/entities/Task");
    entities.push(Department, Employee, Project, Skill, Task);
  }

  if (s.includes("ej08")) {
    // Herencia
    const TPH = require("../ejercicio-08-inheritance/table-per-hierarchy/entities");
    const TPC = require("../ejercicio-08-inheritance/table-per-class/entities");
    const JT = require("../ejercicio-08-inheritance/joined-table/entities");
    // TPH
    entities.push(TPH.Vehicle, TPH.Car, TPH.Motorcycle, TPH.Truck);
    // TPC (no hay base mapeada, solo concretas)
    entities.push(TPC.Car, TPC.Motorcycle, TPC.Truck);
    // JT (base + detalles)
    entities.push(
      JT.Vehicle,
      JT.CarDetail,
      JT.MotorcycleDetail,
      JT.TruckDetail
    );
  }

  if (s.includes("ej09")) {
    // Optimización
    const { User } = require("../ejercicio-09-optimization/entities/User");
    const {
      Category,
    } = require("../ejercicio-09-optimization/entities/Category");
    const {
      Product,
    } = require("../ejercicio-09-optimization/entities/Product");
    const { Order } = require("../ejercicio-09-optimization/entities/Order");
    const {
      OrderItem,
    } = require("../ejercicio-09-optimization/entities/OrderItem");
    const { Review } = require("../ejercicio-09-optimization/entities/Review");
    entities.push(User, Category, Product, Order, OrderItem, Review);
  }

  // Podrás agregar más scopes (ej03, ej04, ...) cuando los ejercicios estén listos
  return entities;
}

export const initializeDatabase = async (scope?: string) => {
  try {
    AppDataSource = new DataSource({
      type: "sqlite",
      database: `ejercicios-${
        scope || process.env.EJ_SCOPE || "ej01,ej02"
      }.sqlite`,
      synchronize: true,
      logging: true,
      entities: resolveEntities(scope),
    });
    await AppDataSource.initialize();
    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

export const closeDatabase = async () => {
  try {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("✅ Conexión a la base de datos cerrada");
    }
  } catch (error) {
    console.error("❌ Error al cerrar la conexión:", error);
  }
};
