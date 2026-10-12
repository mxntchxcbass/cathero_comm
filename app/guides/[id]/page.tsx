import { GuideDetail } from '@/components/GuideDetail';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <main className="shell page contentPage">
      <GuideDetail id={id} />
    </main>
  );
}
