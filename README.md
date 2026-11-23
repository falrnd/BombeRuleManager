# [WIP] BombeRuleManager
Bombe のルール管理 UI を補填する非公式 Web ツール
- [Bombe (GitHub)](https://github.com/CharlieBrej/Bombe)
- [Bombe (Steam)](https://store.steampowered.com/app/2262930/Bombe/)

Bombe にはルールをクリップボードへ書き出す機能と、クリップボードから取り込む機能があります。
このツールはそれを介してルールを読み込み、単体編集や、表形式で一括編集できるようにします。

## 実装方針とスコープ

- Bombe 本体リポジトリから取り込むもの:
  - クリップボード形式（圧縮・JSON）の読み書き仕様
  - ルールデータの形式・スキーマ定義
  - 圧縮展開に必要な zstd 辞書（[docs/DICTIONARY.md](docs/DICTIONARY.md)）
  - (これ以外の要素には依存しない)
- このツールで独自実装するもの:
  - ルール一覧の操作
  - ルールの操作

### Todo
- 各種属性でのソート
- 複数選択での操作
  - タグ、優先度、一時停止の一括設定
- ルールIDの再割り当て
- ルール内の領域の順番の入れ替え
- Localization (余裕があれば)

### Out of scope
- Steam 版未実装の要素のサポート
- セーブファイル操作
- ルールの正当性チェック
- ルールの自動導出・冗長なルールの検出

## License & Credit

- これは非公式ツールです。オリジナル側に対してこのツールに関する問い合わせを行わないでください。
- Bombe は Charlie Brej 氏の作品で、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) で公開されています
  - このツールは Bombe のルールデータ import / export 機能及びそのフォーマットに依存しています
- Bombe から取り込んだ zstd 辞書（[Compress.cpp](https://github.com/CharlieBrej/Bombe/blob/master/Compress.cpp)）: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- それ以外のコードと文書: zlib ライセンス

