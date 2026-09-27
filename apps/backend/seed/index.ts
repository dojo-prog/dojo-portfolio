import { pool } from "../src/infrastructure/database/db";
import { seedEducation } from "./education/seed";
import { seedExperiences } from "./experiences/seed";
import { seedSkills } from "./skills/seed";
import { seedUsers } from "./users/seed";

const startSeed = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await seedUsers(client);
    await seedSkills(client);
    await seedExperiences(client);
    await seedEducation(client);

    await client.query("COMMIT");

    console.log("\nSeeding complete\n");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Encounterd Seeding error:", error);
  } finally {
    client.release();
  }
};

startSeed();
