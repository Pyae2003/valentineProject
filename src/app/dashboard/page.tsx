import { redirect } from 'next/navigation';
import { loginPath } from '@/constants/routes';
import Dashboardd from '@/features/main/components/Dashboardd';
import { getSession } from '@/Utils/get-sessions';
import { GetSignUrl } from '@/lib/get-signUrl';

interface PageProps {
  searchParams: {
    title?: string;

  };
};

export const dynamic = "force-dynamic";


const page = async ({ searchParams }: PageProps) => {
  const query = await searchParams;
  const title = query.title ?? "Non";

  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (!session) {
    redirect(loginPath);
  };
  
  const [girlUrl, boyUrl, soloUrl, coupleUrl] = await Promise.all([
    GetSignUrl("onlyProfile/chitthu.jpg"),
    GetSignUrl("onlyProfile/IMG_0754.jpeg"),
    GetSignUrl("onlyProfile/kaungmalay.jpg"),
    GetSignUrl("onlyProfile/kaungmalay2.jpg"),
  ]);

  if(!girlUrl || !boyUrl || !soloUrl || !coupleUrl){
    return;
  }

  const dashboardProp = {
    title,
    girlUrl : girlUrl.signUrl,
    boyUrl : boyUrl.signUrl,
    soloUrl : soloUrl.signUrl,
    coupleUrl : coupleUrl.signUrl
  };

  return (
    <div>
      {
        !!session && <Dashboardd {...dashboardProp} />
      }
    </div>
  )
}

export default page;