import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useGetOneMovie=(id:string)=>{
    const {data,error,isLoading}=useSWR(`/api/movie/${id}`,fetcher)
    return {data,error,isLoading}
}
export default useGetOneMovie