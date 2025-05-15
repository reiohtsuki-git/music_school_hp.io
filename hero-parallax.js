// ヒーローセクションのパララックス効果
document.addEventListener('DOMContentLoaded', function() {
    // パララックス要素の処理
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // 各パララックス要素をスクロールに応じて移動
        parallaxElements.forEach((element, index) => {
            // 各要素に異なる速度を設定して動きを差別化
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
    
    // ヒーロー背景の視差効果
    const heroBackground = document.querySelector('.hero-background img');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            // 背景画像をスクロールに応じてゆっくり移動（視差効果）
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        });
    }
    
    // CTAボタンのホバーエフェクト強化
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('animate-arrow');
        });
        
        button.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('animate-arrow');
        });
    });
});
