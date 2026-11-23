# クリップボード形式

Bombe がルールをクリップボードへ書き出す形式と、ルール 1 件の中身。

## 全体の形

- 1 行目は `Bombe Rules (N):` または `Bombe Rule:`。取り込み側は無視する
- 本体は圧縮形式か平文形式のどちらか
- ルート要素は `{"rule": {...}}` か `{"rules": [...]}`

## 圧縮形式

- 💣(U+1F4A3) + 本体 + 🛑(U+1F6D1)
- 本体は JSON を zstd で圧縮し、1 バイトを「U+2800 + バイト値」の点字文字に置き換えたもの
- 80 文字ごとに改行が入る
- zstd は Bombe のソースに埋め込まれた専用辞書が必須。[DICTIONARY.md](DICTIONARY.md) を参照
- 取り込み側は、テキスト中の点字文字（U+2800〜U+28FF）だけを拾ってバイト列に戻す。それ以外の文字は無視する

## 平文形式

- ゲームでコピーするときに Ctrl を押していると、JSON が圧縮されずにそのまま出る
- 取り込み側は、点字文字が 1 つも無ければ、最初の `{` まで読み飛ばして JSON として読む
- このため、ツールからの書き出しは平文だけでもゲームに取り込める

## ルール 1 件のフィールド

| フィールド | 内容 |
| --- | --- |
| `region_count` | 入力領域の数（最大 4） |
| `neg_reg_count`, `if_reg_count` | 否定領域、IF/THEN 領域の数（省略時 0） |
| `region_type` | 領域種別の配列。整数 1 個に `var<<16 \| type<<8 \| value` |
| `square_counts` | ベン図の各エリアの条件（16 要素、添字は領域のビットマスク） |
| `apply_region_type`, `apply_if_region_type` | アクション。type 100 は確定（value 0 が安全、1 が爆弾）、101 は表示切替 |
| `apply_region_bitmap`, `neg_apply_region_bitmap` | アクション対象エリアのビットマップ |
| `priority` | -2〜2。領域を作るルールだけ意味を持ち、他は 0 |
| `paused` | 0 か 1 |
| `group` | タグ。0〜7 |
| `comment` | 任意の文字列 |

エリアの添字はビットマスクで、通常ルールではビット 0 が R1、ビット 1 が R2 を表す。たとえば添字 3 は R1 と R2 の重なり。

領域種別の `type` の値（Bombe の `RegionType::Type`）: 0 NONE、1 EQUAL、2 LESS、3 MORE、4 XOR2、5 XOR3、6 XOR22、7 XOR222、8 NOTEQUAL、9 PARITY、10 XOR1、11 XOR11、12 PRIME、13 TRIANGLE、14 POW2、15 FIBONACCI、16 BOX、100 SET、101 VISIBILITY。`value` は符号付き 8 ビット、`var` は変数 a〜e のビットマスク。

クリップボード書き出しには `used_count` `clear_count` `cpu_time` は含まれない。これらはセーブファイルにだけ保存される統計。

