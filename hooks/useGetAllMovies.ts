import fetcher from "@/lib/fetcher";
import useSWR from "swr";
const useGetAllMovies = () => {
    const { data, error, isLoading } = useSWR("/api/GetAllMovies", fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });
    return { data, error, isLoading };
};
export default useGetAllMovies