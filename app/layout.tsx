import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
export const metadata: Metadata = { title:'CatHero.GG', description:'캣 히어로 Wiki, 유저 공략, Q&A와 길드 도구를 한곳에서.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><Header/><main>{children}</main><footer><b>CatHero.GG</b><span>Community knowledge for Cat Hero · 비공식 팬 서비스</span></footer></body></html>}
