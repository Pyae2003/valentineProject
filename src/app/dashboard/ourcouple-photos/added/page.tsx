import { loginPath } from '@/constants/routes';
import AddCoupleImage from '@/features/VideoAndImage/couplephotos/components/AddCoupleImage'
import { getSession } from '@/Utils/get-sessions'
import { redirect } from 'next/navigation';
import React from 'react'

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

    return (
        <div className="w-full flex items-center justify-center my-10">
            {
                !!session && (
                    <AddCoupleImage />
                )
            }
        </div>
    )
}

export default page