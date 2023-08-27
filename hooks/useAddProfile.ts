import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useAddProfile=()=>{
    const {data,mutate,error,isLoading}=useSWR('/api/addProfile',fetcher,        {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    return {
        data,
        error,
        isLoading,
        mutate,
    };
}
export default useAddProfile