'use client';

import PageContent from "./page-content";
type Props = {
    id: string;
  };


const PageClient = ({ id }: Props) => {
    return (
       <PageContent id={id} />
    )
}

export default PageClient;
