# ①課題名
ジョークでつながる新しいマッチングアプリ

## ②課題内容（どんな作品か）
- 高校生と大学生を引き合わせるマッチングアプリのプロトタイプ
- icanhazdadjoke.com APIを活用してランダムなジョークを表示し、楽しい出会いを演出
- 英語のジョークをMyMemory Translation APIで日本語に自動翻訳
- ローカルストレージを使った「いいね」機能で気になる相手を保存・管理
- Lorem Picsum APIを使用した高品質な人物画像表示

## ③アプリのデプロイURL
[ジョークでつながる新しいマッチングアプリ](https://takahashi244.github.io/kadai05_api/)

## ④アプリのログイン用IDまたはPassword（ある場合）
ログイン機能なし（誰でも利用可能）

## ⑤工夫した点・こだわった点
- **多言語対応**: 英語のジョークを日本語に自動翻訳し、両方を表示したこと
- **UI/UX**: マッチングアプリのようなUI/UXを実際にマッチングアプリを登録して参考にした点
- **API統合**: 3つの異なるAPI（ジョーク取得・翻訳・画像）を組み合わせててんこ盛りにしたこと
- **データ永続化**: ローカルストレージを活用したいいね履歴の保存・管理を今回も活用したこと


## ⑥難しかった点・次回トライしたいこと（又は機能）
- **登録型API**: 画像もunSplash APIにチャレンジしようとしたがSkyWayをやった時にかなり苦戦した経験から安牌にひとまず着地させた 
- **ジョーク精度**: 日本人でもわかるようなジョークがあるAPIを探したい 
- **翻訳精度向上**: Google translate APIなどもっと翻訳精度が上がる、もしくは生成型AIで解説付きのものを作りたい

## ⑦フリー項目（感想、シェアしたいこと等なんでも）
- **[感想]**
  - ローカルストレージはやはり便利。簡単な実装もいいね！という大きな機能に変わることを再実感
  - APIは自分でサンプルを用意せず開発せずできるので実装も早い
  - ジョークは原文じゃないとわからないところがジョークらしくて良い
  
- **[技術スタック]**
  - フロントエンド: HTML5, CSS3, Vanilla JavaScript
  - API: icanhazdadjoke.com, MyMemory Translation, Lorem Picsum
  - データ保存: ローカルストレージ
  
- **[参考記事]**
  1. [icanhazdadjoke.com API Documentation](https://icanhazdadjoke.com/api)
  2. [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
  3. [Lorem Picsum - The Lorem Ipsum for photos](https://picsum.photos/)
  4. [MDN Web Docs - Local Storage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
