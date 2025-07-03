// page.tsx

import { getApiDocs } from '@/src/utils/swagger';
import PageContent from './content';
import { notFound } from 'next/navigation';

export default async function Page() {
  if (process.env.NODE_ENV !== 'development') notFound();
  const spec = await getApiDocs();

  return <PageContent spec={spec} />;
}