import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useGetStars=(id:string)=>{
    const {data,isLoading,error}=useSWR(id?`/api/stars/${id}`:null,fetcher)
    return {data,isLoading,error}
}
export default useGetStars