// DOM が完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    // フォーム送信処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // バリデーション
            if (!name || !email || !message) {
                alert('すべての項目を入力してください。');
                return;
            }
            
            // 送信成功メッセージ（実際の実装ではサーバーに送信する処理を追加）
            alert('お問い合わせを送信しました。ありがとうございます。');
            contactForm.reset();
        });
    }
    
    // 入会フォーム処理
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
            const course = document.getElementById('course').value;
            
            // バリデーション
            if (!email || !password || !passwordConfirm || !course) {
                alert('すべての必須項目を入力してください。');
                return;
            }
            
            if (password !== passwordConfirm) {
                alert('パスワードが一致していません。');
                return;
            }
            
            // クレジットカード情報の取得（実際の実装ではセキュアに処理する必要あり）
            const cardNumber = document.getElementById('cardNumber')?.value;
            const expMonth = document.getElementById('expMonth')?.value;
            const expYear = document.getElementById('expYear')?.value;
            const securityCode = document.getElementById('securityCode')?.value;
            
            if (!cardNumber || !expMonth || !expYear || !securityCode) {
                alert('クレジットカード情報を入力してください。');
                return;
            }
            
            // 入会処理成功メッセージ（実際の実装ではサーバーに送信する処理を追加）
            alert('入会手続きが完了しました。ありがとうございます。');
            
            // ホームページにリダイレクト
            window.location.href = 'index.html';
        });
    }
    
    // 料金表のモーダル表示（簡易的な実装）
    const feeLink = document.getElementById('fee-link');
    if (feeLink) {
        feeLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 簡易的なアラートで料金表を表示
            alert('【料金表】\n・Guitar Lesson: 月額10,000円\n・Bass Lesson: 月額10,000円\n・DTM Lesson: 月額12,000円\n・Compose Lesson: 月額15,000円');
        });
    }
    
    // Instruments ページから Lessons ページへの遷移
    const instrumentCards = document.querySelectorAll('.instrument-card');
    if (instrumentCards.length > 0) {
        instrumentCards.forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = 'lessons.html';
            });
        });
    }
});
