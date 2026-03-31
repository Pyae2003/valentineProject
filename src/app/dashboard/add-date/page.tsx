import { dashboard, loginPath } from "@/constants/routes";
import AddDateForm from "@/features/others/components/AddDateForm";
import { prisma } from "@/lib";

import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";

const page = async () => {
  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (!session) {
    redirect(loginPath);
  }

  const userId = session?.user.id;

  if (!userId) {
    redirect(loginPath);
  }

  const profile = await prisma.ourDate.findUnique({
    where: { userId: userId },
  });

  if (profile) {
    redirect(dashboard);
  }

  return (
    <div>
      <AddDateForm />
    </div>
  );
};

export default page;
