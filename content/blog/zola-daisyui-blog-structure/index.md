+++
title = "Structure of zola-daisyui-blog"
description = "Directory structure, multilingual content, and asset management in zola-daisyui-blog"
date = 2026-11-10

[taxonomies]
tags = ["Zola"]
authors = ["mosaos"]

[extra]
thumbnail = "zola-daisyui-blog.webp"
show_thumbnail = true
+++

## Directory Structure and Content Management

Zola manages site content based on the directory structure.

This template is based on Zola's standard directory structure, with some adjustments to make it easier to manage content such as blog posts and portfolio items.

The main points are:

- Create a dedicated directory for each piece of content.
- Manage multilingual content in the same directory.
- Manage Markdown files and assets such as images together.
- Separate the template from the content to make it easier to add or modify content.

This article explains the basic directory structure of Zola and the content management method used in [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog).

## Zola Directory Structure

In Zola, the directory structure under the `content` directory becomes the content structure of the site.

In Zola, a directory under the `content` directory becomes a **`Section`** when it contains an `_index.md` file. A Section can be used as a unit for organizing content.

Individual Markdown files are treated as **`Page`** objects. However, `_index.md` defines the metadata and content of the Section itself, so it is not treated as a normal Page.

For example, consider the following directory structure:

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

In this case, `blog` and `works` become Sections.

`first-post.md` and `project-a.md` become individual Pages.

Sections can also be organized into a hierarchy by creating subdirectories.

For more details, see the official Zola documentation.

- [Content Overview - Zola](https://www.getzola.org/documentation/content/overview/)
- [Sections - Zola](https://www.getzola.org/documentation/content/section/)

## Create a Directory for Each Piece of Content

In Zola, Markdown files can also be placed directly under a Section.

However, this template uses a method where a dedicated directory is created for each piece of content, such as a blog post or portfolio item, and an `index.md` file is placed inside it.

For example, a blog post has the following structure:

```text
content/
└── blog/
    ├── _index.md
    ├── first-post/
    │   └── index.md
    └── second-post/
        └── index.md
```

With this structure, `first-post` and `second-post` become individual Pages.

URLs are basically generated based on the directory names.

```text
/blog/first-post/
/blog/second-post/
```

This method has several advantages:

- Files can be organized for each piece of content.
- Images and other assets can be placed in the same directory.
- Multilingual content can be managed in the same directory.
- Moving and managing content becomes easier.

One major advantage is that assets such as images can be managed together with their related content.

## Managing Multilingual Content

This template uses Zola's multilingual support.

The default language is specified by `default_language` in `zola.toml`.

```toml
default_language = "en"
```

Additional languages are defined under `[languages]`.

For example, to support English and Japanese, configure it as follows:

```toml
default_language = "en"

[languages.en]
title = "My Blog"

[languages.ja]
title = "マイブログ"
```

For content, the Markdown file for the default language is named `index.md`. Files for additional languages include the language code in their filenames.

For example, to provide an article in English and Japanese, use the following structure:

```text
content/
└── blog/
    └── first-post/
        ├── index.md
        └── index.ja.md
```

Write the content for each language in its corresponding file.

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

By separating Markdown files for each language, translated content can be managed in the same directory.

Also, since all language versions of the same content are kept together, it becomes easier to add or update translations.

This template also provides a mechanism to associate pages in different languages and display language switching links.

Note that you do not need to provide translations for all content. You can operate the site by placing files only for the languages you need.

## Managing Assets Such as Images Together

In Zola, not only Markdown files but also images and other files can be placed in the same directory as the content.

This is called **Asset Colocation**.

For example, if you place images used in an article in the same directory, the structure looks like this:

```text
content/
└── blog/
    └── first-post/
        ├── index.md
        ├── index.ja.md
        ├── image-01.webp
        └── image-02.webp
```

Images can be referenced from Markdown files using relative paths.

```markdown
![Image 1](image-01.webp)
```

With this method, there is no need to manage images related to an article in a separate directory.

Also, when moving an article, you can move its related images together with it.

### Using Multiple Images for Slideshows

The same structure can be used for content that contains multiple images, such as portfolio items and photographs.

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

By grouping images for each piece of content, it also becomes easier to manage which images are used in slideshows.

Even when the same images are used for multiple languages, there is no need to place duplicate copies of the images.

You can also enable a slideshow using all images included in the content by specifying the following in the Front Matter. Please give it a try.

```toml
[extra]
slideshow = true
```

## Overall Directory Structure

Based on the explanations so far, the content directory has the following structure:

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

This is an example to explain the structure. You can change the actual directory and file names as needed.

`blog` and `works` are treated as Sections, and individual pieces of content are placed under them.

`about` is used as a fixed page, while `search-result` is a Section dedicated to displaying search results and is used by the template.

Company and store websites usually have several fixed pages, such as company information and privacy policies. In such cases, you can use `about` as a reference, then copy and edit it to create multilingual fixed pages.

## Using the static Directory

In Zola, there is another way to manage assets related to content: placing them in the `static` directory instead of under `content`.

This template uses both methods depending on the purpose.

**Files placed under `content`**

- Images related to specific content, such as blog posts and portfolio items
- Files used in articles
- Images used in slideshows

**Files placed under `static`**

- Images used throughout the site
- Favicon
- JavaScript and other static files shared across the site
- Files referenced by multiple pieces of content

For example, if you place a site-wide image in `static/img/`, you can reference it using a path under `/img/`.

On the other hand, images placed together with content can be referenced from Markdown files using relative paths.

By choosing the appropriate location for each purpose, you can organize content-related files and site-wide files separately.

## Separating the Template and Content

With zola-daisyui-blog, you can also manage the template, which handles the site's appearance and functionality, separately from the actual content, such as articles and portfolio items.

For example, there are two ways to manage them.

### 1. Manage Everything in the Same Repository

This is the simplest method.

```text
repository/
├── content/
├── static/
├── templates/
├── zola.toml
└── ...
```

The template and content are managed in the same repository.

For a personal blog or a small website, this method is sufficient.

### 2. Manage the Template and Content in Separate Repositories

Another method is to manage the template and content in separate repositories.

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

The template repository is used as a common base, while articles and portfolio items are managed in the content repository.

You can also use GitHub Actions or similar tools to combine both repositories during the build process.

With this method, template updates and content updates can be managed independently.

As long as changes to the template do not affect the content structure or Front Matter, there is no need to modify the content repository.

If the existing template already provides everything you need, you can also stop updating the template and focus only on editing the content.

For example, in many cases, it may be sufficient to update libraries such as Tailwind CSS and daisyUI only when they become outdated or security issues are found.

You may also want to update Zola itself to a newer version. However, if the current features are sufficient, there is no need to update it unnecessarily.

Zola is only used when building the content. The generated site consists of HTML, images and other assets, JavaScript, and so on. Therefore, updating Zola in the build environment does not affect the operation of an already published site.

Also, by making the content repository Private, you can make the site source code public while keeping content such as articles private.

> *Note: For details on separating the content and using GitHub Actions, see [Zola daisyUI blog | mosaos.github.io](https://mosaos.github.io/ja/blog/zola-daisyui-blog/).*

## Summary

zola-daisyui-blog uses Zola's standard features and adopts a directory structure that makes it easy to manage content individually.

The three main design principles are:

- Create a directory for each piece of content and keep Markdown files and related assets together.
- Manage multilingual content in the same directory.
- Use a structure that allows the template and content to be managed separately.

This structure can be used not only for personal blogs and portfolios, but also for various websites that do not require dynamic content, such as information-sharing sites and company or store websites.

Since content is managed using Markdown, there is no need to prepare a special database or CMS.

First, try adding Markdown files by referring to the existing sample content.