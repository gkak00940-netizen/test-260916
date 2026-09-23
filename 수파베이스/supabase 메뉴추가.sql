-- ============================================
-- 고흥사랑 카페 · 메뉴 5개 추가 (가상 데이터)
-- menu.sql 을 먼저 실행한 뒤,
-- Supabase 대시보드 → SQL Editor → New query 에
-- 이 파일 전체를 붙여넣고 Run 을 누르세요.
-- (같은 이름의 메뉴가 이미 있으면 건너뛰므로 여러 번 실행해도 중복되지 않습니다)
-- ============================================

-- 1. 메뉴 5개 추가
--    image_url 이 비어 있으면 사이트에 기본 이미지 칸이 표시됩니다.
--    나중에 img/ 폴더에 사진을 넣고 Table Editor 에서 경로만 입력하면 됩니다.
insert into public.menu (name, description, price, image_url, sort_order)
select seed.name, seed.description, seed.price, seed.image_url, seed.sort_order
from (values
  ('고흥 유자차',          '고흥산 유자를 직접 청으로 담가 향긋하고 달콤한 따뜻한 차',       5500, '', 4),
  ('고흥 석류 에이드',     '새콤한 석류즙에 탄산을 더해 붉은 빛이 예쁜 여름 에이드',       6500, '', 5),
  ('고흥 쑥 라떼',         '곱게 간 쑥 가루와 우유가 어우러진 고소하고 은은한 라떼',       6000, '', 6),
  ('유자 파운드케이크',    '유자 필을 듬뿍 넣어 촉촉하게 구운 상큼한 수제 파운드케이크',   5000, '', 7),
  ('흑당 크림 콜드브루',   '12시간 추출한 콜드브루 위에 흑당 크림을 올린 달콤쌉싸름한 커피', 6800, '', 8)
) as seed(name, description, price, image_url, sort_order)
where not exists (
  select 1 from public.menu m where m.name = seed.name
);

-- 2. 결과 확인 (기존 3개 + 추가 5개 = 총 8개)
select id, name, price, image_url, sort_order, is_visible
from public.menu
order by sort_order;
