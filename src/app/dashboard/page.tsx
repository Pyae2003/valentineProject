import Dashboardd from '@/features/components/Dashboardd'

interface PageProps {
  searchParams: {
    title?: string;
  
  };
}
const page =async  ({searchParams} : PageProps) => {
  const query = await searchParams;
  const title = query.title ?? "Non";
  
  return (
    <div>
        <Dashboardd  title={title} />
    </div>
  )
}

export default page;