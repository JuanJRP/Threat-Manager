import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
    }
}

export default prisma;
