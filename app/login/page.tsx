import { Suspense } from 'react';
import {AuthForm} from '@/components/AuthForm';

export default function Login(){
  return <div className="authWrap"><div className="card auth"><span className="catmark big">ฅ</span><h1>CatHero.GG</h1><p>이메일로 로그인하거나 새 계정을 만드세요.</p><Suspense fallback={<div className="notice">로그인 화면을 불러오는 중...</div>}><AuthForm/></Suspense><small>작성한 공략과 질문은 계정에 연결됩니다.</small></div></div>
}
