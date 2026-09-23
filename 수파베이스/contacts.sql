-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

create table if not exists public.contacts (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS(행 수준 보안) 켜기
alter table public.contacts enable row level security;

-- 방문자(anon)에게 등록 권한 부여
grant insert on public.contacts to anon;

-- 방문자(anon)는 문의 등록만 가능, 조회·수정·삭제는 불가
create policy "Anyone can submit contact"
  on public.contacts
  for insert
  to anon
  with check (true);
