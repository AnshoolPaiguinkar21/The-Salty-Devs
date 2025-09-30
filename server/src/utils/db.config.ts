import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

if (!global.__db) {
    global.__db = new PrismaClient( {datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error'],});
}

db = global.__db;

export {db};

/*const prisma = new PrismaClient({
    log: ["query"]
});

export default prisma; */