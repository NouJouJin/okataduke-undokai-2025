window.addEventListener('DOMContentLoaded', () => {

    // カウントダウンタイマーの設定
    const countdown = () => {
        // イベント開始日時を設定 (年, 月-1, 日, 時, 分, 秒)
        const eventDate = new Date('2025-07-01T00:00:00+09:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        const timerElement = document.getElementById('timer');
        const countdownContainer = document.querySelector('.countdown');

        if (distance > 0) {
            // イベント開始前
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // 2桁にフォーマット
            const format = (num) => num.toString().padStart(2, '0');

            timerElement.innerHTML = `
                <span class="days">${format(days)}</span>日
                <span class="hours">${format(hours)}</span>時間
                <span class="minutes">${format(minutes)}</span>分
                <span class="seconds">${format(seconds)}</span>秒
            `;
        } else {
            // イベント期間中または終了後
            const endDate = new Date('2025-07-30T23:59:59+09:00').getTime();
            if (now > endDate) {
                // イベント終了
                countdownContainer.innerHTML = '<h3>イベントは終了しました！<br>ご参加ありがとうございました！</h3>';
            } else {
                // イベント開催中
                countdownContainer.innerHTML = '<h3>🎉イベント開催中！🎉<br>みんなで盛り上がろう！</h3>';
            }
            // タイマーを停止
            clearInterval(timerInterval);
        }
    };

    // 1秒ごとにタイマーを更新
    const timerInterval = setInterval(countdown, 1000);
    // ページ読み込み時にも一度実行
    countdown();

});