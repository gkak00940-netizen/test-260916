// Supabase 연결 정보
// Supabase 대시보드 → Project Settings → API 에서 확인 후 입력하세요.
// anon(public)·publishable 키는 브라우저에 공개되어도 되는 키입니다. service_role 키는 절대 넣지 마세요.
const SUPABASE_URL = 'https://vfpjfzvgtalbnjnlybhb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_SqtpLz0zH0olTA1ujajJPg_K2LCYWkb';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
