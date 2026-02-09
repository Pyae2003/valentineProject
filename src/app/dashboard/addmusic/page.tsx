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
  console.log(session);
  if (!session) {
    redirect(loginPath);
  };

  return (
    <div>
      {!!session && (
        <div className="">
          <AddAudioForm />
        </div>
      )}
    </div>
  );
};

export default page;
