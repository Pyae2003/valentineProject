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

interface SignedUrlResult {
  signUrl: string;
}


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
  
  // ✅ SAFE SIGNED URL FETCH
  const results = await Promise.allSettled([
    GetSignUrl("onlyProfile/chitthu.jpg"),
    GetSignUrl("onlyProfile/IMG_0754.jpeg"),
    GetSignUrl("onlyProfile/kaungmalay.jpg"),
    GetSignUrl("onlyProfile/kaungmalay2.jpg"),
  ]);

  const getSafeUrl = (result: PromiseSettledResult<SignedUrlResult | null>) => {
    if (result.status === "fulfilled" && result.value?.signUrl) {
      return result.value.signUrl;
    }
    return "/kaungmalay3.jpg";
  };

  const dashboardProp = {
    title,
    girlUrl: getSafeUrl(results[0]),
    boyUrl: getSafeUrl(results[1]),
    soloUrl: getSafeUrl(results[2]),
    coupleUrl: getSafeUrl(results[3]),
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