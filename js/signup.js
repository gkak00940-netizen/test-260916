// 모바일 햄버거 메뉴 토글
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// 회원가입 폼 제출 처리 (Supabase 이메일 회원가입)
const signupForm = document.getElementById('signup-form');
const signupMsg = document.getElementById('signup-msg');
const signupBtn = signupForm.querySelector('button[type="submit"]');

signupForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  signupMsg.hidden = false;

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const passwordConfirm = document.getElementById('signup-password-confirm').value;

  if (password !== passwordConfirm) {
    signupMsg.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  signupBtn.disabled = true;
  signupMsg.textContent = '가입 처리 중...';

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: { data: { name: name } } // 이름은 사용자 정보(user_metadata)에 저장
  });

  if (error) {
    console.error(error);
    signupMsg.textContent = '회원가입에 실패했습니다. (' + error.message + ')';
    signupBtn.disabled = false;
    return;
  }

  // 이메일 인증을 끈 경우: 바로 로그인 상태 → 홈으로 이동
  if (data.session) {
    signupMsg.textContent = '회원가입이 완료되었습니다. 홈으로 이동합니다.';
    location.href = '../index.html';
    return;
  }

  // 이메일 인증이 켜진 경우(기본값): 인증 메일 확인 안내
  signupMsg.textContent = '가입 확인 메일을 보냈습니다. 메일의 링크를 누른 뒤 로그인해주세요.';
  signupForm.reset();
  signupBtn.disabled = false;
});
