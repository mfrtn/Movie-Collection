const { PrismaClient, Role } = require("@prisma/client");

const db = new PrismaClient();

module.exports = { db, Role };
