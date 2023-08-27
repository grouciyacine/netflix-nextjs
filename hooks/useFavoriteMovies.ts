import fetcher from "@/lib/fetcher";
import useSWR from 'swr'

const useFavoriteMovies=()=>{
    const{data,error,isLoading,mutate}=useSWR('/api/GetFavoritesMovies',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });
    return {data,error,isLoading,mutate};
}
export default useFavoriteMovies;