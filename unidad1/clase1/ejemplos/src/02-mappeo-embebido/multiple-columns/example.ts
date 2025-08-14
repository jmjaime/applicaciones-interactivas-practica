import { UserSQLPersistence, UserData } from "./user-persistence";

async function main() {
  const persistence = new UserSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: MÚLTIPLES COLUMNAS ===\n");

    // Datos de ejemplo
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

    // Crear usuarios
    console.log("📝 Creando usuarios...");
    const userIds = await persistence.createUsers(usersData);
    console.log(
      `✅ ${userIds.length} usuarios creados con IDs: [${userIds.join(", ")}]\n`
    );

    // Obtener todos los usuarios
    console.log("👥 Obteniendo todos los usuarios:");
    const allUsers = persistence.getAllUsers();
    allUsers.forEach((user) => {
      console.log(`ID: ${user.id} | ${user.nombre} (${user.email})`);
      console.log(
        `   📍 ${user.direccion.calle}, ${user.direccion.ciudad} ${user.direccion.codigoPostal}, ${user.direccion.pais}`
      );
    });

    // Buscar usuarios por ciudad
    console.log("\n🏙️ Usuarios en Buenos Aires:");
    const usuariosBuenosAires = persistence.getUsersByCity("Buenos Aires");
    usuariosBuenosAires.forEach((user) => {
      console.log(`   • ${user.nombre} - ${user.direccion.calle}`);
    });

    // Buscar usuarios por país
    console.log("\n🌍 Usuarios en Argentina:");
    const usuariosArgentina = persistence.getUsersByCountry("Argentina");
    usuariosArgentina.forEach((user) => {
      console.log(`   • ${user.nombre} - ${user.direccion.ciudad}`);
    });

    // Búsqueda por dirección
    console.log("\n🔍 Buscando direcciones que contengan 'Av':");
    const usuariosAvenues = persistence.searchUsersByAddress("Av");
    usuariosAvenues.forEach((user) => {
      console.log(`   • ${user.nombre} - ${user.direccion.calle}`);
    });

    // Obtener usuario específico
    console.log("\n👤 Obteniendo usuario con ID 1:");
    const user1 = persistence.getUserById(1);
    if (user1) {
      console.log(
        `   ${user1.nombre} - ${user1.direccion.calle}, ${user1.direccion.ciudad}`
      );
    }

    // Actualizar dirección
    console.log("\n✏️ Actualizando dirección del usuario con ID 1:");
    const updated = persistence.updateUserAddress(1, {
      calle: "Av. Corrientes 5678 (Actualizada)",
      ciudad: "Buenos Aires",
      codigoPostal: "C1043",
      pais: "Argentina",
    });

    if (updated) {
      console.log("   ✅ Dirección actualizada exitosamente");
      const updatedUser = persistence.getUserById(1);
      if (updatedUser) {
        console.log(`   Nueva dirección: ${updatedUser.direccion.calle}`);
      }
    }

    // Estadísticas por ciudad
    console.log("\n📊 Estadísticas por ciudad:");
    const cityStats = persistence.getCityStats();
    cityStats.forEach((stat) => {
      console.log(`   ${stat.ciudad}, ${stat.pais}: ${stat.count} usuario(s)`);
    });

    console.log("\n=== DETALLES TÉCNICOS ===");
    console.log("🏗️ Estructura de la tabla SQL:");
    console.log("CREATE TABLE usuarios (");
    console.log("    id INTEGER PRIMARY KEY AUTOINCREMENT,");
    console.log("    nombre TEXT NOT NULL,");
    console.log("    email TEXT UNIQUE NOT NULL,");
    console.log("    direccion_calle TEXT NOT NULL,");
    console.log("    direccion_ciudad TEXT NOT NULL,");
    console.log("    direccion_codigo_postal TEXT NOT NULL,");
    console.log("    direccion_pais TEXT NOT NULL,");
    console.log("    created_at DATETIME DEFAULT CURRENT_TIMESTAMP");
    console.log(");");

    console.log("\n📋 Características del mapeo:");
    console.log(
      "• Cada propiedad del objeto Address se mapea a una columna separada"
    );
    console.log("• Prefijo 'direccion_' para evitar conflictos de nombres");
    console.log("• Índices en columnas de dirección para búsquedas eficientes");
    console.log("• Prepared statements para mejor performance y seguridad");
    console.log("• Transacciones para operaciones batch");

    console.log("\n🔍 Ventajas del mapeo a múltiples columnas:");
    console.log("• Consultas SQL nativas muy eficientes");
    console.log("• Índices específicos por cada campo de dirección");
    console.log("• Validación de tipos a nivel de base de datos");
    console.log("• Ideal para objetos value objects pequeños y estables");

    console.log("\n⚠️ Consideraciones:");
    console.log("• Cambios en la estructura del objeto requieren migración");
    console.log("• Puede generar muchas columnas con objetos complejos");
    console.log("• No es adecuado para estructuras muy dinámicas");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
