import { redirect } from 'next/navigation';
import { loginPath } from '@/constants/routes';
import Dashboardd from '@/features/main/components/Dashboardd';
import { getSession } from '@/Utils/get-sessions';

interface PageProps {
  searchParams: {
    title?: string;

  };
}
const page = async ({ searchParams }: PageProps) => {
  const query = await searchParams;
  const title = query.title ?? "Non";
  const session = await getSession;
  // console.log(session)

  if (!session) {
    redirect(loginPath);
  }
  return (
    <div>
      {
        !!session && <Dashboardd title={title} />
      }
    </div>
  )
}

export default page;