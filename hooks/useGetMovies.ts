import fetcher from "@/lib/fetcher";
import useSWR from 'swr'

const useGetMovies=()=>{
    const{data,error,isLoading}=useSWR('/api/GetMovies',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });
    return {data,error,isLoading}
}
export default useGetMovies