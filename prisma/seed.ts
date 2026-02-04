import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { prisma } from "@/lib";
import { title } from 'process';
dotenv.config();
const seed = async () => {
  try {
    const username = process.env.USERNAME;


    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error("Usename and date not found");
    }

    const exitingAdmin = await prisma.ourInfo.findUnique({
      where: {
        username,
      },
    });

    if (!exitingAdmin) {
      const saltRound = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash(password, saltRound);

      const admin = await prisma.ourInfo.create({
        data: {
          username,
          password: hashPassword,
        },
      });
      console.log(`✅ Admin created: ${admin.username}`);
    } else {
      console.log(`ℹ️ Admin already created: ${exitingAdmin.username}`);
    }
  } catch (error) {
    console.error("❌Admin Seeding failed:", error);
    process.exit(1);
  }
};



seed()

.finally(async () => {
  await prisma.$disconnect();
});
