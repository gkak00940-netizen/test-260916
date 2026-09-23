// 모바일 햄버거 메뉴 토글
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// 로그인 폼 제출 처리 (Supabase 이메일 로그인)
const loginForm = document.getElementById('login-form');
const loginMsg = document.getElementById('login-msg');
const loginBtn = loginForm.querySelector('button[type="submit"]');

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  loginBtn.disabled = true;
  loginMsg.hidden = false;
  loginMsg.textContent = '로그인 중...';

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: document.getElementById('login-email').value.trim(),
    password: document.getElementById('login-password').value
  });

  if (error) {
    console.error(error);
    loginMsg.textContent = '이메일 또는 비밀번호가 올바르지 않습니다.';
    loginBtn.disabled = false;
    return;
  }

  loginMsg.textContent = '로그인되었습니다. 홈으로 이동합니다.';
  location.href = '../index.html';
});
