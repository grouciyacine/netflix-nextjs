import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useGetProfiles=()=>{
    const {data,isLoading,error}=useSWR('api/profiles',fetcher)
    return {data,isLoading,error}
}
export default useGetProfiles 