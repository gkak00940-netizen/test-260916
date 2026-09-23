// 모바일 햄버거 메뉴 토글
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// Supabase menu 테이블에서 메뉴 불러오기
// 불러오기에 실패하거나 데이터가 없으면 HTML에 있는 기존 카드를 그대로 보여줌
const menuGrid = document.querySelector('.menu-grid');

async function loadMenu() {
  const { data, error } = await supabaseClient
    .from('menu')
    .select('name, description, price, image_url')
    .order('sort_order');

  if (error || !data || data.length === 0) {
    if (error) console.error(error);
    return;
  }

  menuGrid.innerHTML = '';
  data.forEach(function (item) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    // 이미지가 없으면 기본 이미지 칸 표시
    let img;
    if (item.image_url) {
      img = document.createElement('img');
      img.className = 'menu-img';
      img.src = item.image_url;
      img.alt = item.name;
    } else {
      img = document.createElement('div');
      img.className = 'menu-img menu-img-empty';
      img.textContent = '☕';
    }

    const title = document.createElement('h3');
    title.textContent = item.name;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const price = document.createElement('span');
    price.className = 'menu-price';
    price.textContent = item.price.toLocaleString('ko-KR') + '원';

    card.append(img, title, desc, price);
    menuGrid.appendChild(card);
  });
}

loadMenu();

// Contact 폼 제출 처리
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  submitBtn.disabled = true;
  formMsg.hidden = false;
  formMsg.textContent = '전송 중...';

  // Supabase contacts 테이블에 저장
  const { error } = await supabaseClient.from('contacts').insert({
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  });

  if (error) {
    console.error(error);
    formMsg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
  } else {
    formMsg.textContent = '메시지가 전송되었습니다. 감사합니다!';
    form.reset();
  }
  submitBtn.disabled = false;
});
