import { redirect } from "next/navigation"
import { getUrlAction } from "@/actions/url";
import { toast } from "sonner";

const page = async ({params} : {params : Promise<{url : string}>}) => {
    const url = (await params).url;
    const res = await getUrlAction({shortUrl : url});

    if(res.success && res.url){
        redirect(res.url);
    }
    else{
        toast.success(res.message);
        redirect('/');
    }
}

export default page
