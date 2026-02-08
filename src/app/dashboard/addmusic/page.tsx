import { loginPath } from "@/constants/routes";
import AddAudioForm from "@/features/audios/components/AddAudioForm";
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
  };

  return (
    <div>
      {!!session && (
        <div className="flex items-center justify-center m-12">
          <AddAudioForm />
        </div>
      )}
    </div>
  );
};

export default page;
