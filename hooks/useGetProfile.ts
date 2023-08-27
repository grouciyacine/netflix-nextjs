import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useGetProfile=(id:string)=>{
    const {data,error,isLoading}=useSWR(id?`/api/profile/${id}`:null,fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    });
    return {data,error,isLoading}
}
export default useGetProfile