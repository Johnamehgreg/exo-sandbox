
import { Session } from 'next-auth';
import PageContent from "./page-content";


type Props = {
    session: Session | null;
};


const PageClient = ({ session }: Props) => {
    return (
        <PageContent {...{ session, }} />
    )
}

export default PageClient;
