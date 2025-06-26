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

    // カウントダウンタイマー
    // イベントの開始・終了日時を定義
    const eventStartDate = new Date('2025-07-01T00:00:00+09:00').getTime();
    const eventEndDate = new Date('2025-07-30T23:59:59+09:00').getTime();

    const countdownContainer = document.querySelector('#countdown-section .countdown');
    const countdownTitle = countdownContainer.querySelector('h3');
    const timerElement = document.getElementById('timer');

    let timerInterval; // タイマーを後で停止できるように変数を宣言

    const countdown = () => {
        const now = new Date().getTime();
        let targetDate;
        let titleText = '';

        // 状況に応じて目標日時とタイトルを決定
        if (now < eventStartDate) {
            // 1. イベント開始前
            targetDate = eventStartDate;
            titleText = '開会式まで、あと…';
        } else if (now < eventEndDate) {
            // 2. イベント期間中
            targetDate = eventEndDate;
            titleText = '閉会式まで、あと…';
        } else {
            // 3. イベント終了後
            countdownContainer.innerHTML = '<h3>イベントは終了しました！<br>ご参加ありがとうございました！</h3>';
            clearInterval(timerInterval); // タイマーを停止
            return; // これ以上処理しない
        }

        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const format = (num) => num.toString().padStart(2, '0');

        // HTMLに反映
        countdownTitle.textContent = titleText;
        timerElement.innerHTML = `
            <span class="days">${format(days)}</span>日
            <span class="hours">${format(hours)}</span>時間
            <span class="minutes">${format(minutes)}</span>分
            <span class="seconds">${format(seconds)}</span>秒`;
    };

    // 1秒ごとにcountdown関数を実行
    timerInterval = setInterval(countdown, 1000);
    // ページ読み込み時に即時実行して、ちらつきを防ぐ
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
