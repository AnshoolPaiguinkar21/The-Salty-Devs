import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}
const isTest = process.env.NODE_ENV === 'test';

if (!global.__db) {
    global.__db = new PrismaClient( {datasources: {
    db: {
      url: isTest ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
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