import { loginPath } from '@/constants/routes';
import AddImage from '@/features/VideoAndImage/components/AddImage'
import { getSession } from '@/Utils/get-sessions';
import { redirect } from 'next/navigation';

const page =async () => {
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
    <div className="w-full flex items-center justify-center my-10">
        {
          !!session && (
            <AddImage/>
          )
        }
    </div>
  )
}

export default page