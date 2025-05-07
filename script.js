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
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" aria-hidden="true"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close" aria-label="通知を閉じる"><i class="fas fa-times" aria-hidden="true"></i></button>
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'modal-title');
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modal-title">料金表</h3>
                        <button class="modal-close" aria-label="モーダルを閉じる"><i class="fas fa-times" aria-hidden="true"></i></button>
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
            
            // ESCキーでモーダルを閉じる
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
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
                    
                    // モバイルメニューが開いている場合は閉じる
                    const nav = document.querySelector('nav');
                    const menuOverlay = document.querySelector('.menu-overlay');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    
                    if (nav.classList.contains('mobile-open')) {
                        nav.classList.remove('mobile-open');
                        menuOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        if (mobileMenuToggle) {
                            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                            mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        });
    }
    
    // モバイルメニューのトグル（改善版）
    const createMobileMenu = () => {
        // 既存のモバイルメニューボタンがなければ作成
        if (!document.querySelector('.mobile-menu-toggle')) {
            const header = document.querySelector('header');
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            
            header.appendChild(mobileMenuToggle);
            
            // オーバーレイ背景の確認と作成
            let menuOverlay = document.querySelector('.menu-overlay');
            if (!menuOverlay) {
                menuOverlay = document.createElement('div');
                menuOverlay.className = 'menu-overlay';
                document.body.appendChild(menuOverlay);
            }
            
            mobileMenuToggle.addEventListener('click', () => {
                const nav = document.querySelector('nav');
                nav.classList.toggle('mobile-open');
                menuOverlay.classList.toggle('active');
                
                // スクロール固定の切り替え
                if (nav.classList.contains('mobile-open')) {
                    document.body.style.overflow = 'hidden';
                    mobileMenuToggle.querySelector('i').className = 'fas fa-times';
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                    mobileMenuToggle.setAttribute('aria-label', 'メニューを閉じる');
                } else {
                    document.body.style.overflow = '';
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
                }
            });
            
            // オーバーレイクリックでメニューを閉じる
            menuOverlay.addEventListener('click', () => {
                const nav = document.querySelector('nav');
                nav.classList.remove('mobile-open');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
            });
            
            // モバイルメニュー内のリンクをクリックしたらメニューを閉じる
            const mobileNavLinks = document.querySelectorAll('nav ul li a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const nav = document.querySelector('nav');
                    nav.classList.remove('mobile-open');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
                });
            });
            
            // ESCキーでモバイルメニューを閉じる
            document.addEventListener('keydown', function(e) {
                const nav = document.querySelector('nav');
                if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                    nav.classList.remove('mobile-open');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
                }
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
                    
                    // セクションIDとリンクのhref属性を比較してアクティブ化
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
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
            scrollUpButton.setAttribute('aria-label', 'ページトップへスクロール');
            scrollUpButton.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
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
            
            // フォーカス時にボタンを表示
            scrollUpButton.addEventListener('focus', () => {
                scrollUpButton.classList.add('visible');
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
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // アリア属性の更新
                const expanded = question.getAttribute('aria-expanded') === 'true';
                question.setAttribute('aria-expanded', !expanded);
                answer.setAttribute('aria-hidden', expanded);
                
                // 他のアイテムを閉じる（アコーディオン形式）
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
                    }
                });
                
                // クリックしたアイテムのトグル
                item.classList.toggle('active');
            });
            
            // キーボード操作の対応
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }
    
    // 画像の遅延読み込み対応
    if ('loading' in HTMLImageElement.prototype) {
        // ネイティブの遅延読み込みをサポートしているブラウザ向け
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // 画像読み込み完了時のイベント
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    } else {
        // 遅延読み込みをサポートしていないブラウザ向けの代替処理
        // 必要に応じてIntersectionObserverを使った実装を追加
    }
    
    // フォーム要素のアクセシビリティ向上
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // フォーカス時のハイライト
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});
