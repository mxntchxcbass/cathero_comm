import {EditPostForm} from '@/components/EditPostForm';
type PageProps={params:Promise<{id:string}>};
export default async function Page({params}:PageProps){const {id}=await params;return <main className="shell page narrowPage"><EditPostForm type="question" id={id}/></main>}
