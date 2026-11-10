+++
title = "zola-daisyui-blog の構造"
description = "zola-daisyui-blog のディレクトリ構造、多言語コンテンツ、アセットの管理方法について"
date = 2026-11-10

[taxonomies]
tags = ["Zola"]
authors = ["mosaos"]

[extra]
thumbnail = "zola-daisyui-blog.webp"
show_thumbnail = true
+++

## ディレクトリ構造とコンテンツの管理

Zola はディレクトリ構造をもとに、サイトのコンテンツを管理します。

このテンプレートでは、Zola の標準的なディレクトリ構造をベースに、ブログやポートフォリオなどのコンテンツを管理しやすいように構成しています。

特に、以下の点を重視しています。

- コンテンツごとに専用のディレクトリを用意する
- 多言語コンテンツを同じディレクトリで管理する
- Markdown ファイルと画像などのアセットをまとめて管理する
- テンプレートとコンテンツを分離し、コンテンツの追加や変更を容易にする

ここでは、Zola の基本的なディレクトリ構造と、[zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) で採用しているコンテンツ管理方法について説明します。

## Zola のディレクトリ構造

Zola では、`content` ディレクトリ以下のディレクトリ構造がサイトのコンテンツ構造になります。

Zola では、content ディレクトリ以下のディレクトリに `_index.md` を配置すると **`Section`** になります。Section はコンテンツを分類する単位として利用できます。  
個々の Markdown ファイルは **`Page`** として扱われます。ただし、`_index.md` は Section 自体のメタデータやコンテンツを定義するファイルであり、通常の Page ではありません。

例えば、次のような構造を考えてみます。

```text
.
├── content/
│   ├── blog/
│   │   ├── _index.md
│   │   ├── first-post.md
│   │   └── second-post.md
│   └── works/
│       ├── _index.md
│       └── project-a.md
├── static/
├── templates/
└── zola.toml
```

この場合、`blog` と `works` が Section になります。  
`first-post.md` や `project-a.md` はそれぞれ個々の Page になります。

Section はさらにサブディレクトリを作成して階層化することもできます。  
詳細については、Zola の公式ドキュメントも参照してください。

- [Content Overview - Zola](https://www.getzola.org/documentation/content/overview/)
- [Sections - Zola](https://www.getzola.org/documentation/content/section/)

## コンテンツごとにディレクトリを作成する

Zola では Markdown ファイルを Section の直下に配置することもできます。  
しかし、このテンプレートでは、記事や作品などのコンテンツごとに専用のディレクトリを作成し、その中に `index.md` を配置する方式を採用しています。

例えば、ブログ記事の場合は次のようになります。

```text
content/
└── blog/
    ├── _index.md
    ├── first-post/
    │   └── index.md
    └── second-post/
        └── index.md
```

この構造では、`first-post` と `second-post` がそれぞれ個別の Page になります。  
URL は基本的にディレクトリ名をもとに生成されます。

```text
/blog/first-post/
/blog/second-post/
```

この方式には、いくつかのメリットがあります。

- コンテンツごとにファイルを整理できる
- 画像やその他のアセットを同じディレクトリに配置できる
- 多言語コンテンツを同じディレクトリで管理できる
- コンテンツの移動や管理が容易になる

特に、画像などのアセットをコンテンツと一緒に管理できる点は大きなメリットです。

## 多言語コンテンツの管理

このテンプレートでは、Zola の多言語対応機能を利用しています。  
デフォルト言語は `zola.toml` の `default_language` で指定します。

```toml
default_language = "en"
```

追加の言語は `[languages]` 以下に定義します。

例えば、英語と日本語に対応する場合は次のようになります。

```toml
default_language = "en"

[languages.en]
title = "My Blog"

[languages.ja]
title = "マイブログ"
```

コンテンツについては、デフォルト言語の Markdown ファイルを `index.md` とし、追加言語のファイルには言語コードを付けます。

例えば、英語と日本語の記事を用意する場合は次のようになります。

```text
content/
└── blog/
    └── first-post/
        ├── index.md
        └── index.ja.md
```

それぞれのファイルには、対応する言語のコンテンツを記述します。

**index.md (English)**

```markdown
+++
title = "My First Post"
+++

This is my first blog post.
```

**index.ja.md (Japanese)**

```markdown
+++
title = "最初の記事"
+++

これは最初のブログ記事です。
```

このように、言語ごとに Markdown ファイルを分けることで、翻訳コンテンツを同じディレクトリで管理できます。  
また、同じコンテンツの各言語版が同じ場所にまとまるため、翻訳の追加や修正も容易になります。

言語切り替えについても、テンプレート側で各言語のページを関連付けて表示する仕組みを用意しています。  
なお、すべてのコンテンツに翻訳を用意する必要はありません。必要な言語のファイルだけを配置して運用できます。

## 画像などのアセットをまとめて管理する

Zola は Markdown ファイルだけでなく、画像やその他のファイルもコンテンツと同じディレクトリに配置できます。

これを **Asset Colocation** と呼びます。

例えば、記事で使用する画像を同じディレクトリに配置する場合は次のようになります。

```text
content/
└── blog/
    └── first-post/
        ├── index.md
        ├── index.ja.md
        ├── image-01.webp
        └── image-02.webp
```

Markdown ファイルからは相対パスで画像を参照できます。

```markdown
![Image 1](image-01.webp)
```

この方法なら、記事に関連する画像を別のディレクトリで管理する必要がありません。  
また、記事を移動する場合も、関連する画像を一緒に移動できます。

### スライドショーなどで複数の画像を使用する場合

作品紹介や写真など、複数の画像を使用するコンテンツでも同じ構造を利用できます。

```text
content/
└── works/
    └── project-a/
        ├── index.md
        ├── index.ja.md
        ├── image-01.webp
        ├── image-02.webp
        ├── image-03.webp
        └── image-04.webp
```

画像をコンテンツごとにまとめておけば、スライドショーなどの表示対象も管理しやすくなります。  
多言語で同じ画像を使用する場合も、画像を重複して配置する必要はありません。

フロントマッターで以下を指定する事で、コンテンツに含まれる全画像でスライドショーを表示するようにもなっています。こちらも試してみてください。

```toml
[extra]
slideshow = true
```


## ディレクトリ構造の全体像

ここまで説明した内容を踏まえると、コンテンツは次のような構造になります。

```text
content/
├── blog/
│   ├── _index.md
│   ├── front-matter/
│   │   ├── index.md
│   │   ├── index.ja.md
│   │   └── zola-daisyui-blog.webp
│   └── zola-daisyui-blog-structure/
│       ├── index.md
│       ├── index.ja.md
│       └── structure.webp
│
├── works/
│   ├── _index.md
│   └── project-a/
│       ├── index.md
│       ├── index.ja.md
│       ├── image-01.webp
│       └── image-02.webp
│
├── about/
│   ├── index.md
│   └── index.ja.md
│
└── search-result/
    └── _index.md
```

これは構造を説明するための例です。実際のディレクトリやファイル名は、必要に応じて変更できます。

`blog` や `works` は Section として扱われ、その配下に個々のコンテンツを配置します。  
`about` は固定ページとして利用し、`search-result` は検索結果の表示に使用するテンプレート専用の Section です。

企業や店舗のホームページでは、会社概要やプライバシーポリシーなどの固定ページがいくつかあるのが普通ですが、こういった場合 `about` を参考にコピペ・編集する事で多言語対応の固定ページを作成できるでしょう。

## static ディレクトリとの使い分け

Zola では、コンテンツに関連するアセットを `content` 以下に配置する方法以外に、`static` ディレクトリを利用する方法もあります。

このテンプレートでは、用途に応じて使い分けています。

**content 以下に配置するもの**

- 記事や作品など、特定のコンテンツに関連する画像
- 記事内で使用するファイル
- スライドショーなどで使用する画像

**static 以下に配置するもの**

- サイト全体で使用する画像
- favicon
- サイト共通の JavaScript やその他の静的ファイル
- 複数のコンテンツから共通して参照するファイル

例えば、サイト共通の画像を `static/img/` に配置した場合は、`/img/` 以下のパスで参照できます。  
一方、コンテンツと一緒に配置した画像は、Markdown ファイルから相対パスで参照できます。  
このように用途に応じて配置場所を分けることで、コンテンツとサイト共通のファイルを整理できます。

## テンプレートとコンテンツの分離

zola-daisyui-blog では、サイトの表示や機能を担当するテンプレートと、実際の記事や作品などのコンテンツを分けて管理することもできます。

例えば、次の2つの運用方法があります。

### 1. すべてを同じリポジトリで管理する

最も簡単な方法です。

```text
repository/
├── content/
├── static/
├── templates/
├── zola.toml
└── ...
```

テンプレートとコンテンツを同じリポジトリで管理します。  
個人ブログや小規模なサイトであれば、この方法で十分です。

### 2. テンプレートとコンテンツを別のリポジトリで管理する

もう一つは、テンプレートとコンテンツを別々のリポジトリで管理する方法です。

```text
template-repository/
├── templates/
├── static/
├── zola.toml
└── ...

content-repository/
└── content/
    ├── blog/
    ├── works/
    └── about/
```

テンプレート側のリポジトリを共通のベースとして利用し、コンテンツ側のリポジトリで記事や作品を管理します。

GitHub Actions などを利用して、ビルド時に両方のリポジトリを組み合わせることもできます。

この方式であれば、テンプレートの更新とコンテンツの更新を独立して管理できます。

テンプレート側の変更がコンテンツの構造や Front Matter に影響しない限り、コンテンツ側のリポジトリを変更する必要はありません。  
既存のテンプレートで過不足がないのであれば、テンプレートの更新は行わず、コンテンツの編集にのみ注力することも可能です。

例えば、Tailwind CSS や daisyUI などのライブラリが古くなった場合や、セキュリティ上の問題が発生した場合に、それらへの対応を行う程度でも十分な場合が多いでしょう。

Zola 自体も新しいバージョンに更新したくなるところかもしれませんが、機能として十分であれば、無理に更新する必要はありません。  
Zola はコンテンツのビルド時に動作するだけです。生成されたサイトは HTML、画像などのアセット、JavaScript などで構成されるため、ビルド環境の Zola を更新しなくても、公開済みのサイトの運用には影響しません。

また、コンテンツ側を Private リポジトリにしておけば、サイトのソースコードを公開しつつ、記事などのコンテンツを非公開にするといった運用も可能です。

> ※ 実際のコンテンツ分離や GitHub Actions を利用した具体的な方法に関しては [Zola daisyUI blog | mosaos.github.io](https://mosaos.github.io/ja/blog/zola-daisyui-blog/) に記載しています。参考にしてみてください。

## まとめ

zola-daisyui-blog では、Zola の標準機能を活用し、コンテンツ単位で管理しやすいディレクトリ構造を採用しています。  
特に、次の3点が基本的な設計方針です。

- コンテンツごとにディレクトリを作成し、Markdown ファイルと関連アセットをまとめる
- 多言語コンテンツは同じディレクトリ内で管理する
- テンプレートとコンテンツを分離できる構成にする

この構造は、個人ブログやポートフォリオだけでなく、情報共有サイト、企業や店舗のホームページなど動的コンテンツが不要な様々なサイトにも利用できます。  
コンテンツを Markdown で管理できるため、特別なデータベースや CMS を用意する必要もありません。

まずは既存のサンプルコンテンツを参考に、Markdown ファイルを追加してみてください。
