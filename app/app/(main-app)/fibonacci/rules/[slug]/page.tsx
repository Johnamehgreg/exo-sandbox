import PageClient from './components/page-client';

const RuleDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const id = (await params).slug;
  return <PageClient id={id} />;
};

export default RuleDetailsPage;
