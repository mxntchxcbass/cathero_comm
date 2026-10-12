import {GuideDetail} from '@/components/GuideDetail';export default function Page({params}:{params:{id:string}}){return <main className="shell page contentPage"><GuideDetail id={params.id}/></main>}
