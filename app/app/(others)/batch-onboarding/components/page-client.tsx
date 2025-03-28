'use client';

import PageContent from "./page-content";
import { Session } from 'next-auth';


type Props = {
    session: Session | null;
  };


const PageClient = ({ session }: Props) => {
    return (
        <PageContent {...{ session, }} />
    )
}

export default PageClient;
