document.addEventListener('DOMContentLoaded', () => {

    // スクロール連動アニメーション
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    fadeInElements.forEach(el => observer.observe(el));

    // カウントダウンタイマー（閉会式までの時間に変更）
    const countdown = () => {
        const eventEndDate = new Date('2025-07-30T23:59:59+09:00').getTime();
        const now = new Date().getTime();
        const distance = eventEndDate - now;

        const timerElement = document.getElementById('timer');
        const countdownContainer = document.querySelector('.countdown');

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const format = (num) => num.toString().padStart(2, '0');
            timerElement.innerHTML = `
                <span class="days">${format(days)}</span>日
                <span class="hours">${format(hours)}</span>時間
                <span class="minutes">${format(minutes)}</span>分
                <span class="seconds">${format(seconds)}</span>秒`;
        } else {
            countdownContainer.innerHTML = '<h3>イベントは終了しました！<br>ご参加ありがとうございました！</h3>';
            clearInterval(timerInterval);
        }
    };
    // 初回実行とタイマー設定
    const startDate = new Date('2025-07-01T00:00:00+09:00').getTime();
    if (new Date().getTime() < startDate) {
        document.querySelector('.countdown h3').textContent = '開会式まで、あと…';
        // 開会式までのタイマーを別途設定しても良いが、ここではシンプルに閉会式までの時間を表示
    }
    const timerInterval = setInterval(countdown, 1000);
    countdown();

    // 紙吹雪機能
    const choiceRed = document.getElementById('choice-red');
    const choiceWhite = document.getElementById('choice-white');

    const fireConfetti = (colors) => {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: colors
        });
    };

    choiceRed.addEventListener('click', () => {
        fireConfetti(['#ff6b6b', '#ffffff', '#f0932b']);
    });

    choiceWhite.addEventListener('click', () => {
        fireConfetti(['#54a0ff', '#ffffff', '#686de0']);
    });

});
