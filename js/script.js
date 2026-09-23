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

// Contact 폼 제출 처리
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formMsg.hidden = false;
  formMsg.textContent = '메시지가 전송되었습니다. 감사합니다!';
  form.reset();
});
