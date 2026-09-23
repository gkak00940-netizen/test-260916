-- ============================================
-- 고흥사랑 카페 · Menu 섹션 테이블
-- Supabase 대시보드 → SQL Editor → New query 에
-- 이 파일 전체를 붙여넣고 Run 을 누르세요.
-- (여러 번 실행해도 오류나 중복 데이터가 생기지 않습니다)
-- ============================================

-- 1. 메뉴 테이블 만들기
create table if not exists public.menu (
  id          bigint generated always as identity primary key,
  name        text    not null,                -- 메뉴 이름 (예: 고흥 Latte)
  description text    not null default '',     -- 카드에 표시할 설명
  price       integer not null check (price >= 0), -- 가격, 원 단위 (예: 6500)
  image_url   text    not null default '',     -- 이미지 경로(img/...) 또는 전체 URL
  sort_order  integer not null default 0,      -- 표시 순서 (작을수록 앞)
  is_visible  boolean not null default true,   -- false 로 바꾸면 사이트에서 숨김
  created_at  timestamptz not null default now()
);

-- 2. 보안 설정: 방문자는 메뉴 "조회"만 가능
alter table public.menu enable row level security;

grant select on public.menu to anon;

drop policy if exists "Anyone can read menu" on public.menu;
create policy "Anyone can read menu"
  on public.menu
  for select
  to anon
  using (is_visible = true);

-- 3. 현재 사이트의 메뉴 3개를 초기 데이터로 입력 (테이블이 비어 있을 때만)
insert into public.menu (name, description, price, image_url, sort_order)
select * from (values
  ('고흥 Latte',    '부드러운 크림과 에스프레소가 어우러진 시그니처 라떼', 6500, 'img/고흥 Latte.jfif',    1),
  ('고흥 Tiramisu', '진한 마스카포네 크림과 커피 향을 담은 수제 티라미수', 7000, 'img/고흥 Tiramisu.jfif', 2),
  ('고흥 Ade',      '레몬과 허브를 사용한 상큼한 시그니처 에이드',         6000, 'img/고흥 Ade.jfif',      3)
) as seed(name, description, price, image_url, sort_order)
where not exists (select 1 from public.menu);

-- 4. 결과 확인
select id, name, price, image_url, sort_order, is_visible
from public.menu
order by sort_order;
