'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase';
import {EmptyState} from './EmptyState';

type Guide={id:string;title:string;body:string;created_at:string;profiles:{nickname:string}|null};
type Question={id:string;title:string;body:string;accepted_answer_id:string|null;created_at:string;profiles:{nickname:string}|null};

export function HomeCommunityFeed(){
  const [guides,setGuides]=useState<Guide[]>([]),[questions,setQuestions]=useState<Question[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{(async()=>{const s=createClient();const [{data:g},{data:q}]=await Promise.all([
    s.from('guides').select('id,title,body,created_at,profiles(nickname)').order('created_at',{ascending:false}).limit(4),
    s.from('questions').select('id,title,body,accepted_answer_id,created_at,profiles(nickname)').order('created_at',{ascending:false}).limit(4)
  ]);setGuides((g as any)||[]);setQuestions((q as any)||[]);setLoading(false)})()},[]);
  if(loading)return <><HomeCard title="📜 Guides" kicker="COMMUNITY GUIDE" href="/guides"><div className="homeLoading">불러오는 중...</div></HomeCard><HomeCard title="💬 Q&A" kicker="ASK & ANSWER" href="/qa"><div className="homeLoading">불러오는 중...</div></HomeCard></>;
  return <>
    <HomeCard title="📜 Guides" kicker="COMMUNITY GUIDE" href="/guides">{guides.length?<div className="homeFeed">{guides.map(x=><Link className="homeFeedItem" href={`/guides/${x.id}`} key={x.id}><b>{x.title}</b><p>{excerpt(x.body)}</p><small>{x.profiles?.nickname||'CatHero 유저'} · {new Date(x.created_at).toLocaleDateString('ko-KR')}</small></Link>)}</div>:<EmptyState kind="guide"/>}</HomeCard>
    <HomeCard title="💬 Q&A" kicker="ASK & ANSWER" href="/qa">{questions.length?<div className="homeFeed">{questions.map(x=><Link className="homeFeedItem" href={`/qa/${x.id}`} key={x.id}><span className="miniStatus">{x.accepted_answer_id?'✓ 해결':'답변 대기'}</span><b>{x.title}</b><p>{excerpt(x.body)}</p><small>{x.profiles?.nickname||'CatHero 유저'} · {new Date(x.created_at).toLocaleDateString('ko-KR')}</small></Link>)}</div>:<EmptyState kind="qa"/>}</HomeCard>
  </>;
}
function excerpt(s:string){return s.length>70?s.slice(0,70)+'…':s}
function HomeCard({title,kicker,href,children}:{title:string;kicker:string;href:string;children:React.ReactNode}){return <div className="card homeCommunityCard"><div className="sectionHead"><div><span className="kicker">{kicker}</span><h2>{title}</h2></div><Link href={href}>전체 보기 ›</Link></div>{children}</div>}
