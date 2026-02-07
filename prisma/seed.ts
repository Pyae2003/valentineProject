import { prisma } from "@/lib";
import { serverEnv } from "@/config/env-server";
import { auth } from "@/lib/auth";
const seed = async () => {
      try {
        const { USERNAME: username, EMAIL: email, PASSWORD: password } = serverEnv;
    
        if (!username || !password || !email) {
          throw new Error("Missing credentials in environment variables");
        }
    
        const existingAdmin = await prisma.user.findUnique({ where: { email } });
    
        if (!existingAdmin) {
          await auth.api.signUpEmail({
            body: { email, password, username, name: "Admin" },
          });
          console.log(`✅ Admin created: ${username}`);
        } else {
          await auth.api.changePassword({
            body: {
              newPassword: password,
              currentPassword: "", 
              revokeOtherSessions: true,
            },
          });
          console.log(`ℹ️ Admin already exists, Password updated for: ${username}`);
        }
      } catch (error) {
        console.error("❌ Admin Seeding failed:", error);
        process.exit(1);
      }
    };

    
seed().finally(async () => {
  await prisma.$disconnect();
});
