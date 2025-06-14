// 大学生のサンプルデータ（Lorem Picsum APIを使用）
const students = [
    {
        name: '田中 太郎',
        university: '東京大学',
        age: 20,
        imageId: 1
    },
    {
        name: '佐藤 花子',
        university: '早稲田大学',
        age: 19,
        imageId: 2
    },
    {
        name: '鈴木 一郎',
        university: '慶應義塾大学',
        age: 21,
        imageId: 3
    },
    {
        name: '山田 美咲',
        university: '京都大学',
        age: 20,
        imageId: 4
    },
    {
        name: '渡辺 健太',
        university: '大阪大学',
        age: 22,
        imageId: 5
    },
    {
        name: '高橋 ゆい',
        university: '名古屋大学',
        age: 19,
        imageId: 6
    }
];

// 人物画像のためのランダム画像ID配列
const personImageIds = [237, 91, 64, 65, 1074, 399, 494, 227, 319, 287];

// 画像のプリロード機能
function preloadImages() {
    console.log('画像をプリロード中...');
    personImageIds.forEach(id => {
        const img = new Image();
        img.src = `https://picsum.photos/id/${id}/400/400`;
    });
}

// ページ読み込み完了後に画像をプリロード
window.addEventListener('load', preloadImages);

let currentStudentIndex = 0;
let likedProfiles = [];

// ページ読み込み時に最初のプロフィールを表示
document.addEventListener('DOMContentLoaded', function() {
    loadNewProfile();
    updateLikeCount();
    loadLikedProfiles();
});

// 新しいプロフィールを読み込む
async function loadNewProfile() {
    try {
        // ランダムに大学生を選択
        currentStudentIndex = Math.floor(Math.random() * students.length);
        const student = students[currentStudentIndex];
        
        // 大学生の情報を表示
        displayStudent(student);
        
        // ジョークを取得して表示
        await loadJoke();
        
    } catch (error) {
        console.error('プロフィール読み込みエラー:', error);
        document.getElementById('joke').textContent = 'ジョークの読み込みに失敗しました';
    }
}

// 大学生の情報を表示
function displayStudent(student) {
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('university').textContent = student.university;
    document.getElementById('age').textContent = student.age;
    
    const imageElement = document.getElementById('studentImage');
    
    // Lorem Picsum APIを使用してランダムな人物画像を取得
    const randomImageId = personImageIds[Math.floor(Math.random() * personImageIds.length)];
    const imageUrl = `https://picsum.photos/id/${randomImageId}/400/400`;
    
    imageElement.src = imageUrl;
    imageElement.alt = `${student.name}の写真`;
    
    // 画像読み込み完了時のハンドリング
    imageElement.onload = function() {
        console.log('画像読み込み完了:', imageUrl);
    };
    
    // 画像読み込みエラー時のハンドリング
    imageElement.onerror = function() {
        console.error('画像読み込みエラー:', imageUrl);
        // フォールバック画像を設定
        this.src = 'https://via.placeholder.com/400x400/667eea/white?text=' + encodeURIComponent(student.name);
    };
}

// 英語のテキストを日本語に翻訳する関数
async function translateToJapanese(englishText) {
    try {
        // MyMemory Translation API を使用（無料、登録不要）
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=en|ja`);
        
        if (!response.ok) {
            throw new Error('翻訳APIの呼び出しに失敗しました');
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData.translatedText) {
            return data.responseData.translatedText;
        } else {
            throw new Error('翻訳データの取得に失敗しました');
        }
        
    } catch (error) {
        console.error('翻訳エラー:', error);
        // 翻訳に失敗した場合は元のテキストを返す
        return englishText;
    }
}

// icanhazdadjoke.com APIからジョークを取得し、日本語に翻訳
async function loadJoke() {
    const jokeElement = document.getElementById('joke');
    jokeElement.textContent = '🤔 ジョークを取得中...';
    
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('ジョークの取得に失敗しました');
        }
        
        const data = await response.json();
        const englishJoke = data.joke;
        
        // まず英語のジョークを表示
        jokeElement.innerHTML = `
            <div class="joke-original">
                <strong>🇺🇸 Original:</strong><br>
                ${englishJoke}
            </div>
            <div class="joke-translation">
                <strong>🇯🇵 翻訳中...</strong> <span class="loading-dots">⏳</span>
            </div>
        `;
        
        // 日本語に翻訳
        const japaneseJoke = await translateToJapanese(englishJoke);
        
        // 翻訳結果も表示
        jokeElement.innerHTML = `
            <div class="joke-original">
                <strong>English</strong><br>
                <em>${englishJoke}</em>
            </div>
            <div class="joke-translation">
                <strong>日本語</strong><br>
                ${japaneseJoke}
            </div>
        `;
        
    } catch (error) {
        console.error('ジョーク取得エラー:', error);
        
        // エラー時のフォールバックジョーク（日本語版）
        const fallbackJokes = [
            {
                en: "Why don't scientists trust atoms? Because they make up everything!",
                ja: "なぜ科学者は原子を信用しないのか？なぜなら、原子はすべてを作り上げるから！"
            },
            {
                en: "Why did the scarecrow win an award? He was outstanding in his field!",
                ja: "なぜかかしが賞を取ったのか？彼は自分の分野で優秀だったから！"
            },
            {
                en: "Why don't eggs tell jokes? They'd crack each other up!",
                ja: "なぜ卵はジョークを言わないのか？お互いを笑わせて割れてしまうから！"
            },
            {
                en: "What do you call a fake noodle? An impasta!",
                ja: "偽物の麺を何と呼ぶか？インパスタ！"
            },
            {
                en: "Why did the math book look so sad? Because it had too many problems!",
                ja: "なぜ数学の本はとても悲しそうに見えるのか？問題がたくさんあるから！"
            }
        ];
        
        const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
        jokeElement.innerHTML = `
            <div class="joke-original">
                <strong>🇺🇸 Original:</strong><br>
                <em>${randomJoke.en}</em>
            </div>
            <div class="joke-translation">
                <strong>🇯🇵 日本語:</strong><br>
                ${randomJoke.ja}
            </div>
        `;
    }
}

// いいねボタンの処理
function likeProfile() {
    const student = students[currentStudentIndex];
    
    // 既にいいねしているかチェック
    const existingIndex = likedProfiles.findIndex(profile => 
        profile.name === student.name && profile.university === student.university
    );
    
    if (existingIndex === -1) {
        // いいねしたプロフィールを保存（現在の画像URLも含める）
        const imageElement = document.getElementById('studentImage');
        likedProfiles.push({
            ...student,
            imageUrl: imageElement.src,
            likedAt: new Date().toISOString()
        });
        
        // ローカルストレージに保存
        localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
        
        // いいね数を更新
        updateLikeCount();
        
        // 視覚的フィードバック
        showLikeAnimation();
    } else {
        // 既にいいね済みの場合
        showAlreadyLikedMessage();
    }
    
    // 少し待ってから次のプロフィールを表示
    setTimeout(() => {
        loadNewProfile();
    }, 1000);
}

// いいねアニメーション
function showLikeAnimation() {
    const profileCard = document.querySelector('.profile-card');
    profileCard.style.transform = 'scale(1.05)';
    profileCard.style.transition = 'transform 0.3s ease';
    
    // ハートエフェクト
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '3rem';
    heart.style.zIndex = '1000';
    heart.style.animation = 'heartPop 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // アニメーション終了後にハートを削除
    setTimeout(() => {
        heart.remove();
        profileCard.style.transform = '';
    }, 1000);
}

// ローカルストレージからいいねした人を読み込み
function loadLikedProfiles() {
    const saved = localStorage.getItem('likedProfiles');
    if (saved) {
        likedProfiles = JSON.parse(saved);
    }
    updateLikeCount();
}

// いいね数を更新
function updateLikeCount() {
    const countElement = document.getElementById('likeCount');
    if (countElement) {
        countElement.textContent = likedProfiles.length;
    }
}

// 既にいいね済みの場合のメッセージ
function showAlreadyLikedMessage() {
    const profileCard = document.querySelector('.profile-card');
    
    // 既にいいね済みのメッセージを表示
    const message = document.createElement('div');
    message.innerHTML = '💫 既にいいね済み';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = '#ffc107';
    message.style.color = '#333';
    message.style.padding = '15px 25px';
    message.style.borderRadius = '25px';
    message.style.fontSize = '1.2rem';
    message.style.fontWeight = '600';
    message.style.zIndex = '1000';
    message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    message.style.animation = 'fadeInOut 2s ease-in-out forwards';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// いいね一覧を表示
function showLikedList() {
    const modal = document.getElementById('likedModal');
    const content = document.getElementById('likedListContent');
    
    if (likedProfiles.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💔</div>
                <h3>まだ誰にもいいねしていません</h3>
                <p>素敵な人を見つけて「いいね」してみましょう！</p>
            </div>
        `;
    } else {
        let listHTML = '';
        likedProfiles.forEach((profile, index) => {
            const likedDate = new Date(profile.likedAt).toLocaleString('ja-JP');
            listHTML += `
                <div class="liked-item">
                    <img src="${profile.imageUrl || 'https://via.placeholder.com/60x60/667eea/white?text=👤'}" 
                         alt="${profile.name}" class="liked-item-image"
                         onerror="this.src='https://via.placeholder.com/60x60/667eea/white?text=👤'">
                    <div class="liked-item-info">
                        <div class="liked-item-name">${profile.name}</div>
                        <div class="liked-item-details">📚 ${profile.university}</div>
                        <div class="liked-item-details">🎂 ${profile.age}歳</div>
                        <div class="liked-item-date">💖 ${likedDate}</div>
                    </div>
                    <div class="liked-item-actions">
                        <button class="btn-small btn-remove" onclick="removeLikedProfile(${index})">
                            🗑️ 削除
                        </button>
                    </div>
                </div>
            `;
        });
        content.innerHTML = listHTML;
    }
    
    // モーダルを表示
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// いいね一覧を閉じる
function closeLikedList() {
    const modal = document.getElementById('likedModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// 特定のいいねを削除
function removeLikedProfile(index) {
    if (confirm('この人へのいいねを削除しますか？')) {
        likedProfiles.splice(index, 1);
        localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
        updateLikeCount();
        showLikedList(); // リストを再表示
    }
}

// 全てのいいねを削除
function clearAllLikes() {
    if (confirm('全てのいいねを削除しますか？この操作は取り消せません。')) {
        likedProfiles = [];
        localStorage.removeItem('likedProfiles');
        updateLikeCount();
        closeLikedList();
    }
}

// モーダル外クリックで閉じる
document.getElementById('likedModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLikedList();
    }
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('likedModal').classList.contains('show')) {
        closeLikedList();
    }
});

// CSS for heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('アプリケーションエラー:', e.error);
});

// 画像読み込みエラーのハンドリング
document.addEventListener('DOMContentLoaded', function() {
    const imageElement = document.getElementById('studentImage');
    
    // グローバルな画像エラーハンドリング
    imageElement.addEventListener('error', function() {
        console.log('画像読み込み失敗、フォールバック画像を使用');
        
        // 複数のフォールバックオプション
        const fallbackOptions = [
            'https://via.placeholder.com/400x400/667eea/white?text=👤',
            'https://dummyimage.com/400x400/667eea/white&text=Student',
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+RpDwvdGV4dD48L3N2Zz4='
        ];
        
        // 現在のsrcがフォールバックでない場合のみフォールバックを設定
        if (!this.src.includes('placeholder') && !this.src.includes('dummyimage') && !this.src.includes('data:')) {
            this.src = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
        }
    });
});

// デバッグ用：コンソールでいいねした人を確認
console.log('=== 大学生マッチングアプリ ===');
console.log('画像API: Lorem Picsum (https://picsum.photos/)');
console.log('ジョークAPI: icanhazdadjoke.com');
console.log('いいねした人を確認するには showLikedProfiles() を実行してください');
console.log('============================');
