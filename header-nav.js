// ヘッダーとナビゲーションの改善用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('.fixed-header');
    const scrollThreshold = 50;

    function updateHeaderStyle() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 初期状態の設定
    updateHeaderStyle();

    // スクロール時のイベント
    window.addEventListener('scroll', updateHeaderStyle);

    // モバイルメニューの設定
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('nav ul li a');

    if (mobileMenuToggle && nav && menuOverlay) {
        // メニュートグルボタンのクリックイベント
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            menuOverlay.classList.toggle('active');

            // ボディのスクロールを制御
            if (nav.classList.contains('mobile-open')) {
                document.body.style.overflow = 'hidden';
                this.setAttribute('aria-expanded', 'true');
                this.setAttribute('aria-label', 'メニューを閉じる');
            } else {
                document.body.style.overflow = '';
                this.setAttribute('aria-expanded', 'false');
                this.setAttribute('aria-label', 'メニューを開く');
            }
        });

        // オーバーレイをクリックしたときにメニューを閉じる
        menuOverlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('mobile-open');
            this.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
        });

        // メニューリンクをクリックしたときにメニューを閉じる
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('mobile-open');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
            });
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('mobile-open');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'メニューを開く');
            }
        });
    }

    // ドロップダウンメニューの設定（モバイル用）
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('a');

        if (window.innerWidth <= 768 && dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                // モバイル表示の場合はリンクのデフォルト動作を防止
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // リサイズ時にドロップダウンの状態をリセット
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('active');
            });
        }
    });

    // 現在のページのナビリンクをアクティブに
    function setActiveNavLink() {
        const currentLocation = window.location.href;
        
        menuLinks.forEach(function(link) {
            if (link.href === currentLocation) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // ハッシュリンクの場合
        if (currentLocation.includes('#')) {
            const currentHash = window.location.hash;
            
            menuLinks.forEach(function(link) {
                if (link.getAttribute('href') === currentHash) {
                    link.classList.add('active');
                }
            });
        }
    }

    // 初期状態の設定
    setActiveNavLink();

    // ハッシュ変更時のイベント
    window.addEventListener('hashchange', setActiveNavLink);
});
