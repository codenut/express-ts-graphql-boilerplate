import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const ormConfig = {
  type: "postgres",
  host: process.env.DB_HOST || "sample_db",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  synchronize: false,
  logging: true,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations/",
    entitiesDir: "src/models/"
  },
  namingStrategy: new SnakeNamingStrategy()
};

export default ormConfig;
