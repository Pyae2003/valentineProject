import FirstPage from "@/features/main/components/FirstPage";
import { GetSignUrl } from "@/lib/get-signUrl";

export default async function Home() {
  const framUrl = await GetSignUrl("onlyProfile/chitthu.jpg");

  if(!framUrl){
    return;
  };

  return (
    <>
      <FirstPage frameUrl={framUrl.signUrl} />
    </>
  );
}
