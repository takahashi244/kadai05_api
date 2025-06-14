# ①課題名
ジョークでつながる新しいマッチングアプリ

## ②課題内容（どんな作品か）
- 高校生と大学生を引き合わせるマッチングアプリのプロトタイプ
- icanhazdadjoke.com APIを活用してランダムなジョークを表示し、楽しい出会いを演出
- 英語のジョークをMyMemory Translation APIで日本語に自動翻訳
- ローカルストレージを使った「いいね」機能で気になる相手を保存・管理
- Lorem Picsum APIを使用した高品質な人物画像表示

## ③アプリのデプロイURL
ローカル環境での動作確認用（デプロイなし）

## ④アプリのログイン用IDまたはPassword（ある場合）
ログイン機能なし（誰でも利用可能）

## ⑤工夫した点・こだわった点
- **多言語対応**: 英語のジョークを日本語に自動翻訳し、両方を美しく表示
- **UI/UX**: カードベースのモダンなデザインとスムーズなアニメーション
- **API統合**: 3つの異なるAPI（ジョーク取得・翻訳・画像）を組み合わせた機能
- **データ永続化**: ローカルストレージを活用したいいね履歴の保存・管理


## ⑥難しかった点・次回トライしたいこと（又は機能）
- **API制限の管理**: 無料APIの制限内での効率的な運用
- **翻訳精度**: ダジャレや言葉遊びの翻訳品質向上
- **画像の安定性**: 外部画像APIの信頼性確保
- **次回トライしたい機能**:
  - チャット機能の実装
  - 性格診断API（Traitify）の統合
  - プッシュ通知機能
  - マッチング履歴の詳細分析
  - ソーシャルログイン（Google/Facebook）

## ⑦フリー項目（感想、シェアしたいこと等なんでも）
- **[感想]**
  - 複数のAPIを組み合わせることで、単体では実現できない魅力的な機能を作ることができた
  - ユーザー体験を重視したUI設計の重要性を実感
  - エラーハンドリングとフォールバック機能の大切さを学んだ
  - ローカルストレージを使ったデータ管理の便利さと制限を理解
  
- **[技術スタック]**
  - フロントエンド: HTML5, CSS3, Vanilla JavaScript
  - API: icanhazdadjoke.com, MyMemory Translation, Lorem Picsum
  - データ保存: ローカルストレージ
  
- **[参考記事]**
  1. [icanhazdadjoke.com API Documentation](https://icanhazdadjoke.com/api)
  2. [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
  3. [Lorem Picsum - The Lorem Ipsum for photos](https://picsum.photos/)
  4. [MDN Web Docs - Local Storage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
