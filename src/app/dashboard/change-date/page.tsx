import {  AddAnniDate, dashboard, loginPath } from "@/constants/routes";
import { getCurrentDate } from "@/features/others/actions/getCurrentDate";
import ChangeDateForm from "@/features/others/components/ChangeDateForm";
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
 
   const userId = session?.user.id;
 
   if (!userId) {
     redirect(loginPath);
   };
 
  
  const getCurrentAnniDate = await getCurrentDate(userId);

  if(!getCurrentAnniDate){
    redirect(AddAnniDate)
  }

  
  return (
    <div>
        <ChangeDateForm {...getCurrentAnniDate}/>
    </div>
  )
}

export default page