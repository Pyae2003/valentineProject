import { dashboard } from '@/constants/routes';
import { Login } from '@/features/auth/components/Login'
import { getSession } from '@/Utils/get-sessions'
import { redirect } from 'next/navigation';

const page = async () => {

  const session = await getSession();

  if(session){
    redirect(dashboard)
  };

  return (
    <div className='mt-10 flex items-center justify-center '>
      {
        !session && (
          <Login />
        )
      }
    </div>
  )
}

export default page