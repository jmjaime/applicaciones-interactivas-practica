import { UserSQLPersistence, UserData } from "./user-persistence";
import { paso } from "../../utils/demo";
import { preloadSqlJs } from "../../utils/sqlite";

function tabla(users: UserData[]) {
  console.table(
    users.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      calle: u.direccion.calle,
      ciudad: u.direccion.ciudad,
      pais: u.direccion.pais,
    }))
  );
}

async function main() {
  await preloadSqlJs();
  const persistence = new UserSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: MÚLTIPLES COLUMNAS ===");

    const usersData: UserData[] = [
      {
        nombre: "Juan Pérez",
        email: "juan@email.com",
        direccion: {
          calle: "Av. Corrientes 1234",
          ciudad: "Buenos Aires",
          codigoPostal: "C1043",
          pais: "Argentina",
        },
      },
      {
        nombre: "María García",
        email: "maria@email.com",
        direccion: {
          calle: "Calle Falsa 123",
          ciudad: "Madrid",
          codigoPostal: "28001",
          pais: "España",
        },
      },
      {
        nombre: "Carlos López",
        email: "carlos@email.com",
        direccion: {
          calle: "Av. Paulista 456",
          ciudad: "São Paulo",
          codigoPostal: "01310-100",
          pais: "Brasil",
        },
      },
      {
        nombre: "Ana Martínez",
        email: "ana@email.com",
        direccion: {
          calle: "Av. 9 de Julio 789",
          ciudad: "Buenos Aires",
          codigoPostal: "C1073",
          pais: "Argentina",
        },
      },
    ];

    await paso("Crear usuarios (Address → columnas direccion_*)", async () => {
      const userIds = await persistence.createUsers(usersData);
      console.log(`Creados con IDs: [${userIds.join(", ")}]`);
    });

    await paso("Todos los usuarios, direccion_* reconstruida como objeto", () => {
      tabla(persistence.getAllUsers());
    });

    await paso("Usuarios en Buenos Aires (WHERE sobre columna directa)", () => {
      tabla(persistence.getUsersByCity("Buenos Aires"));
    });

    await paso("Usuarios en Argentina", () => {
      tabla(persistence.getUsersByCountry("Argentina"));
    });

    await paso("Búsqueda por dirección que contenga 'Av'", () => {
      tabla(persistence.searchUsersByAddress("Av"));
    });

    await paso("Actualizar dirección del usuario 1", () => {
      const updated = persistence.updateUserAddress(1, {
        calle: "Av. Corrientes 5678 (Actualizada)",
        ciudad: "Buenos Aires",
        codigoPostal: "C1043",
        pais: "Argentina",
      });
      console.log(updated ? "✅ Actualizada" : "❌ No se pudo actualizar");
      const user1 = persistence.getUserById(1);
      if (user1) tabla([user1]);
    });

    await paso("Estadísticas por ciudad", () => {
      console.table(persistence.getCityStats());
    });

    await paso("Trade-offs del mapeo a múltiples columnas", () => {
      console.log("✅ Consultas SQL nativas eficientes, con índices por campo");
      console.log("✅ Validación de tipos a nivel de base de datos");
      console.log("✅ Ideal para value objects pequeños y estables");
      console.log("⚠️ Cambios en la estructura del objeto requieren migración");
      console.log("⚠️ Puede generar muchas columnas con objetos complejos");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
