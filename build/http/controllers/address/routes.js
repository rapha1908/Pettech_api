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

// src/http/controllers/address/routes.ts
var routes_exports = {};
__export(routes_exports, {
  AddressRoutes: () => AddressRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

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

// src/lib/pg/db.ts
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error) {
      console.error("Error connecting to dataBase:", error);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/pg/address.repository.ts
var AddressRepository = class {
  async create({
    street,
    city,
    state,
    zip_code,
    person_id
  }) {
    const result = await database.clientInstance?.query(
      "INSERT INTO address (street, city, state, zip_code, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [street, city, state, zip_code, person_id]
    );
    return result?.rows[0];
  }
  async findAddressByPersonId(personId, page, limit) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT address.*, person.* 
      FROM address
      JOIN person ON address.person_id = person.id
      WHERE person.id = $1
      LIMIT $2 OFFSET $3
    `;
    const result = await database.clientInstance?.query(
      query,
      [personId, limit, offset]
    );
    return result?.rows || [];
  }
};

// src/use-cases/create-address.ts
var CreateAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  handler(address) {
    return this.addressRepository.create(address);
  }
};

// src/use-cases/factory/make-create-address-use-case.ts
function MakeCreateAddressUseCase() {
  const addressRepository = new AddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  return createAddressUseCase;
}

// src/http/controllers/address/create.ts
var import_zod2 = require("zod");
async function create(request, replay) {
  const registerBodySchema = import_zod2.z.object({
    street: import_zod2.z.string(),
    city: import_zod2.z.string(),
    zip_code: import_zod2.z.string(),
    state: import_zod2.z.string(),
    person_id: import_zod2.z.coerce.number()
  });
  const { street, city, zip_code, state, person_id } = registerBodySchema.parse(
    request.body
  );
  const createAddressUseCase = MakeCreateAddressUseCase();
  const address = await createAddressUseCase.handler({
    street,
    city,
    zip_code,
    state,
    person_id
  });
  return replay.status(201).send(address);
}

// src/use-cases/find-address-by-person.ts
var FindAddressByPersonPersonUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async handler(personId, page, limit) {
    return this.addressRepository.findAddressByPersonId(personId, page, limit);
  }
};

// src/use-cases/factory/make-find-address-by-person.ts
function MakeFindAddressByPerson() {
  const addressRepository = new AddressRepository();
  const findAddressByPersonUseCase = new FindAddressByPersonPersonUseCase(
    addressRepository
  );
  return findAddressByPersonUseCase;
}

// src/http/controllers/address/find-address.ts
var import_zod3 = require("zod");
async function findAddress(request, replay) {
  const registerParamsSchema = import_zod3.z.object({
    personId: import_zod3.z.coerce.number()
  });
  const registerQuerySchema = import_zod3.z.object({
    page: import_zod3.z.coerce.number(),
    limit: import_zod3.z.coerce.number()
  });
  const { personId } = registerParamsSchema.parse(request.params);
  const { page, limit } = registerQuerySchema.parse(request.query);
  const findAddressByPersonUseCase = MakeFindAddressByPerson();
  const address = await findAddressByPersonUseCase.handler(
    personId,
    page,
    limit
  );
  return replay.status(200).send(address);
}

// src/http/controllers/address/routes.ts
async function AddressRoutes(app) {
  app.post("/address", create);
  app.get("/address/person/:personId", findAddress);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressRoutes
});
