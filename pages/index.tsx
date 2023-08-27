import { getSession } from "next-auth/react"
import { NextPageContext } from "next"
import Profile from './Profile';
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    
    if (!session) {
        return {
            redirect: {
                destination: '/Auth',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}
const Home = () => {
    return (
        <Profile />
    )
};
export default Home;
