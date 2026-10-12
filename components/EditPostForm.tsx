'use client';
import {FormEvent,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase';
export function EditPostForm({type,id}:{type:'guide'|'question';id:string}){
 const r=useRouter(),[title,setTitle]=useState(''),[body,setBody]=useState(''),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[msg,setMsg]=useState('');
 const table=type==='guide'?'guides':'questions',base=type==='guide'?'guides':'qa';
 useEffect(()=>{(async()=>{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){r.replace(`/login?next=${encodeURIComponent(`/${base}/${id}/edit`)}`);return}const {data,error}=await s.from(table).select('author_id,title,body').eq('id',id).single();if(error||!data){setMsg(error?.message||'글을 찾을 수 없습니다.');setLoading(false);return}if(data.author_id!==user.id){r.replace(`/${base}/${id}`);return}setTitle(data.title);setBody(data.body);setLoading(false)})()},[id,table,base,r]);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);const {error}=await createClient().from(table).update({title,body,updated_at:new Date().toISOString()}).eq('id',id);if(error){setMsg(error.message);setBusy(false);return}r.push(`/${base}/${id}`);r.refresh()}
 if(loading)return <div className="card">글을 불러오는 중...</div>;
 return <form className="composer card standaloneComposer" onSubmit={submit}><span className="kicker">EDIT {type==='guide'?'GUIDE':'QUESTION'}</span><h1>{type==='guide'?'공략 수정':'질문 수정'}</h1><label>제목<input required value={title} onChange={e=>setTitle(e.target.value)}/></label><label>본문<textarea required rows={14} value={body} onChange={e=>setBody(e.target.value)}/></label><div className="notice compactNotice">현재 버전에서는 기존 첨부 이미지는 그대로 유지됩니다.</div><div className="formActions"><button type="button" className="ghost" onClick={()=>r.back()}>취소</button><button className="primary" disabled={busy}>{busy?'저장 중...':'수정 저장'}</button></div>{msg&&<div className="notice">{msg}</div>}</form>
}
