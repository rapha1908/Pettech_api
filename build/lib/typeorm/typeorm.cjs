"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/typeorm/typeorm.ts
var typeorm_exports = {};
__export(typeorm_exports, {
  appDataSource: () => appDataSource
});
module.exports = __toCommonJS(typeorm_exports);
var import_typeorm = require("typeorm");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envScheme = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envScheme.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/typeorm/migration/1744977784424-ProductAutoGenerateUUID.ts
var ProductAutoGenerateUUID1744977784424 = class {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    await queryRunner.query(
      `ALTER TABLE product
       ALTER COLUMN id SET DEFAULT uuid_generate_v4();
      `
    );
  }
  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE product
       ALTER COLUMN id DROP DEFAULT;
      `
    );
  }
};

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: ["src/entities/*.ts"],
  migrations: [ProductAutoGenerateUUID1744977784424],
  logging: env.NODE_ENV === "development"
});
appDataSource.initialize().then(() => {
  console.log("Database connection established");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appDataSource
});
