'use client';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase';
export function AuthRequiredLink({href,children,className='primary'}:{href:string;children:React.ReactNode;className?:string}){const r=useRouter();async function go(){const {data:{user}}=await createClient().auth.getUser();r.push(user?href:`/login?next=${encodeURIComponent(href)}`)}return <button className={className} onClick={go}>{children}</button>}
