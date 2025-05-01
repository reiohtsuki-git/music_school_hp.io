// DOM が完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    // スクロール時のアニメーション
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .instrument-card, .lesson-item, .feature-item, .about-content p, .contact-form, .testimonial-card, .instructor-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // 初期読み込み時とスクロール時に要素をアニメーション
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初期表示時にも実行
    
    // トースト通知機能
    function showNotification(message, type = 'info') {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // 通知を表示
        document.body.appendChild(notification);
        
        // CSSアニメーションのために少し遅延させてからクラスを追加
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 閉じるボタンのイベント設定
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // 自動で閉じる
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
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
                showNotification('すべての項目を入力してください。', 'error');
                return;
            }
            
            // メールアドレスの簡易バリデーション
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('有効なメールアドレスを入力してください。', 'error');
                return;
            }
            
            // 送信成功メッセージ（実際の実装ではサーバーに送信する処理を追加）
            showNotification('お問い合わせを送信しました。ありがとうございます。', 'success');
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
                showNotification('すべての必須項目を入力してください。', 'error');
                return;
            }
            
            // メールアドレスの簡易バリデーション
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('有効なメールアドレスを入力してください。', 'error');
                return;
            }
            
            if (password !== passwordConfirm) {
                showNotification('パスワードが一致していません。', 'error');
                return;
            }
            
            // パスワードの強度チェック
            if (password.length < 8) {
                showNotification('パスワードは8文字以上にしてください。', 'error');
                return;
            }
            
            // クレジットカード情報の取得（実際の実装ではセキュアに処理する必要あり）
            const cardNumber = document.getElementById('cardNumber')?.value;
            const expMonth = document.getElementById('expMonth')?.value;
            const expYear = document.getElementById('expYear')?.value;
            const securityCode = document.getElementById('securityCode')?.value;
            
            if (!cardNumber || !expMonth || !expYear || !securityCode) {
                showNotification('クレジットカード情報を入力してください。', 'error');
                return;
            }
            
            // 入会処理成功メッセージ（実際の実装ではサーバーに送信する処理を追加）
            showNotification('入会手続きが完了しました。ありがとうございます。', 'success');
            
            // 少し遅延してからリダイレクト
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // 料金表のモーダル表示
    const feeLink = document.getElementById('fee-link');
    if (feeLink) {
        feeLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // モーダルが既に存在する場合は削除
            const existingModal = document.querySelector('.modal');
            if (existingModal) {
                existingModal.remove();
            }
            
            // モーダル作成
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>料金表</h3>
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <table class="price-table">
                            <thead>
                                <tr>
                                    <th>コース</th>
                                    <th>月額料金</th>
                                    <th>レッスン回数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Guitar Lesson</td>
                                    <td>¥10,000</td>
                                    <td>月4回</td>
                                </tr>
                                <tr>
                                    <td>Bass Lesson</td>
                                    <td>¥10,000</td>
                                    <td>月4回</td>
                                </tr>
                                <tr>
                                    <td>DTM Lesson</td>
                                    <td>¥12,000</td>
                                    <td>月4回</td>
                                </tr>
                                <tr>
                                    <td>Compose Lesson</td>
                                    <td>¥15,000</td>
                                    <td>月4回</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="modal-note">※ 入会金 ¥10,000（初回のみ）</p>
                    </div>
                </div>
            `;
            
            // モーダルを表示
            document.body.appendChild(modal);
            
            // アニメーションのために少し遅延
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // モーダルの背景クリックで閉じる
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
            
            // 閉じるボタンのイベント設定
            const closeButton = modal.querySelector('.modal-close');
            closeButton.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        });
    }
    
    // Instruments ページから Lessons ページへの遷移
    const instrumentCards = document.querySelectorAll('.instrument-card');
    if (instrumentCards.length > 0) {
        instrumentCards.forEach(card => {
            card.addEventListener('click', () => {
                // 通常ページの場合
                const isHomePage = document.querySelector('.fixed-header') !== null;
                if (!isHomePage) {
                    window.location.href = 'index.html#lessons';
                } else {
                    // ホームページ内のスクロールの場合
                    document.getElementById('lessons').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // ナビゲーションリンクのスクロール処理
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 外部リンクの場合はスクロール処理をスキップ
                if (this.getAttribute('href').includes('.html')) {
                    return;
                }
                
                e.preventDefault();
                
                // クリックしたリンクのセクションIDを取得
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // ナビゲーションリンクのアクティブ状態を更新
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 指定セクションにスクロール
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // モバイルメニューのトグル
    const createMobileMenu = () => {
        // 既存のモバイルメニューボタンがなければ作成
        if (!document.querySelector('.mobile-menu-toggle')) {
            const header = document.querySelector('header');
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            header.appendChild(mobileMenuToggle);
            
            mobileMenuToggle.addEventListener('click', () => {
                const nav = document.querySelector('nav');
                nav.classList.toggle('mobile-open');
                
                // アイコン切り替え
                const icon = mobileMenuToggle.querySelector('i');
                if (nav.classList.contains('mobile-open')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // モバイルメニュー内のリンクをクリックしたらメニューを閉じる
            const mobileNavLinks = document.querySelectorAll('nav ul li a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    document.querySelector('nav').classList.remove('mobile-open');
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                });
            });
        }
    };
    
    // モバイル表示かどうかチェックし、必要に応じてモバイルメニューを作成
    const checkMobileMenu = () => {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    };
    
    // 初期ロード時とリサイズ時にモバイルメニューをチェック
    checkMobileMenu();
    window.addEventListener('resize', checkMobileMenu);
    
    // スクロール位置に基づくナビゲーションリンクのアクティブ状態更新
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 固定ヘッダーの背景色変更 (スクロール時に半透明に)
        const header = document.querySelector('.fixed-header');
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // ホームページの場合のみ処理
        if (document.querySelector('.fixed-header') !== null) {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop - 100; // ヘッダーの高さを考慮
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    // インデックスが範囲内かチェック
                    if (index < navLinks.length) {
                        navLinks[index].classList.add('active');
                    }
                }
            });
        }
    });
    
    // スクロールアップボタンの作成と設定
    const createScrollUpButton = () => {
        // 既存のボタンがなければ作成
        if (!document.querySelector('.scroll-up')) {
            const scrollUpButton = document.createElement('button');
            scrollUpButton.className = 'scroll-up';
            scrollUpButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(scrollUpButton);
            
            // スクロールアップボタンの表示/非表示
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollUpButton.classList.add('visible');
                } else {
                    scrollUpButton.classList.remove('visible');
                }
            });
            
            // スクロールアップボタンのクリックイベント
            scrollUpButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };
    
    // スクロールアップボタンを作成
    createScrollUpButton();
    
    // URLハッシュがある場合、そのセクションに自動スクロール
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // ページ読み込み後に少し遅延させてスクロール
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // ナビゲーションリンクのアクティブ状態を更新
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${targetId}`) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            }, 100);
        }
    }

    // FAQ アコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // 他のアイテムを閉じる（アコーディオン形式）
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // クリックしたアイテムをトグル
                item.classList.toggle('active');
            });
        });
    }
});
