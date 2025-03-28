'use client';

import { useProject } from '@/hooks/query/chat';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import PageContent from './page-content';

type Props = {
  session: Session | null;
};

const PageClient = ({ session }: Props) => {
  const { projects, isLoading: isLoadingProjects } = useProject({
    userId: session?.user?._id || '',
  });
  const [timeZoneData, setTimeZoneData] = useState(null);

  useEffect(() => {
    const fetchTimeZone = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setTimeZoneData(data);
      } catch (error) {
        console.error('Error fetching timezone:', error);
      }
    };

    fetchTimeZone();
  }, []);

  const sortedProjectList = projects
    ?.filter((fItem) => fItem?.description)
    ?.sort((a, b) => {
      const aCompleted = a?.completed ? 1 : 0;
      const bCompleted = b?.completed ? 1 : 0;
      return bCompleted - aCompleted;
    });

  const totalCompletedProjects =
    sortedProjectList?.filter((item) => item?.completed)?.length || 0;
  const totalFailedProjects =
    sortedProjectList?.filter((item) => !item?.completed)?.length || 0;

  return (
    <PageContent
      projects={sortedProjectList}
      {...{
        session,
        timeZoneData,
        totalCompletedProjects,
        totalFailedProjects,
        isLoadingProjects,
      }}
    />
  );
};

export default PageClient;
