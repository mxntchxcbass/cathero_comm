import { QuestionDetail } from '@/components/QuestionDetail';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <main className="shell page contentPage">
      <QuestionDetail id={id} />
    </main>
  );
}
