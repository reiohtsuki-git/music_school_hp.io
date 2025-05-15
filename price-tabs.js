// 料金表タブ切り替えの機能
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // タブ切り替え機能
    function switchTab(tabId) {
        // すべてのタブコンテンツを非表示
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // すべてのタブボタンから選択状態を解除
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // 選択されたタブを表示
        document.getElementById(tabId).classList.add('active');
        
        // 選択されたタブボタンをアクティブ化
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    }

    // タブボタンにイベントリスナーを追加
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 初期化時に最初のタブを表示
    if (tabButtons.length > 0 && tabContents.length > 0) {
        const initialTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(initialTabId);
    }

    // アニメーション効果を追加
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.getAttribute('data-tab');
            const targetTab = document.getElementById(targetTabId);
            
            // アニメーション効果を再適用するためにクラスを一度削除して再追加
            targetTab.style.animation = 'none';
            setTimeout(() => {
                targetTab.style.animation = '';
            }, 10);
        });
    });
});
