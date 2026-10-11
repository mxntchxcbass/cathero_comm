'use client';
import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase';

export function AuthForm(){
  const [mode,setMode]=useState<'login'|'signup'>('login');
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [nickname,setNickname]=useState('');
  const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault(); setBusy(true); setMessage(''); const supabase=createClient();
    if(mode==='signup'){
      const {error}=await supabase.auth.signUp({email,password,options:{data:{nickname}}});
      setMessage(error?error.message:'가입 요청이 완료됐어요. 이메일 확인이 켜져 있다면 인증 메일을 확인해주세요.');
    } else {
      const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error) setMessage(error.message); else window.location.href='/';
    } setBusy(false);
  }
  return <form onSubmit={submit}>
    {mode==='signup'&&<label>닉네임<input required value={nickname} onChange={e=>setNickname(e.target.value)} minLength={2} maxLength={24} placeholder="CatHero 닉네임"/></label>}
    <label>이메일<input required value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="cat@example.com"/></label>
    <label>비밀번호<input required value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={8} placeholder="8자 이상"/></label>
    <button disabled={busy} className="primary full">{busy?'처리 중...':mode==='login'?'로그인':'회원가입'}</button>
    <button type="button" className="ghost full" onClick={()=>{setMode(mode==='login'?'signup':'login');setMessage('')}}>{mode==='login'?'처음이신가요? 회원가입':'이미 계정이 있나요? 로그인'}</button>
    {message&&<div className="notice">{message}</div>}
  </form>
}
