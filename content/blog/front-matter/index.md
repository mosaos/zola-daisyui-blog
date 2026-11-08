+++
title = "Front Matter"
description = "Front Matter of zola-daisyui-blog"
date = 2026-11-05
updated = 2026-11-08

[taxonomies]
tags = ["Zola"]
authors = ["mosaos"]

[extra]
thumbnail = "zola-daisyui-blog.webp"
show_thumbnail = true
+++

## Front Matter

Front Matter is the part at the beginning of a Markdown file where metadata is defined.

In Zola, Front Matter is written between `+++` delimiters.

Zola has different Front Matter settings for sections (directories) and pages (individual articles).

---

## Front Matter for Sections

[#Front matter - Section | Zola](https://www.getzola.org/documentation/content/section/#front-matter)

If you use the [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) template without modifications, you probably don't need to change the section Front Matter very often. 😅

### Property List

| Property | Purpose | Required | Notes |
| --------------------- | ------------------- | -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title` | Section title | Required | Specifies the title of the section. |
| `description` | Section description | Optional | Specifies a description of the section. |
| `draft` | Draft setting | Optional | If set to `true`, the section is treated as a draft. It is loaded when the `--drafts` option is specified. The default is `false`. |
| `sort_by` | Page sorting order | Optional | Specifies the sorting order of pages in the section. Available values are `date`, `update_date`, `title`, `title_bytes`, `weight`, `slug`, and `none`. The default is `none`. |
| `weight` | Subsection sorting order | Optional | Specifies the display order of subsections within the parent section. Lower values have higher priority. |
| `template` | Template to use | Optional | Specifies the template used to generate the section page HTML. Example: `template = "section.html"`. |
| `page_template` | Template for pages under the section | Optional | Specifies the template applied to all pages under the section, including nested sections. If a nested section also has this setting, the setting of the section closest to the page takes priority. However, if the page itself has a `template` setting, that setting takes priority. |
| `paginate_by` | Number of pages per pagination page | Optional | Specifies the number of pages displayed on each paginated page. Pagination is disabled if the value is `0` or this setting is not specified. |
| `paginate_path` | URL path for pagination | Optional | Specifies the URL path used for pagination. The page number is appended to this path. The default is `page/1`. |
| `paginate_reversed` | Pagination order | Optional | If set to `true`, the pagination order is reversed. The default is `false`. |
| `insert_anchor_links` | Add anchor links to headings | Optional | Specifies where anchor links are inserted in headings. Available values are `left`, `right`, `heading`, and `none`. `heading` makes the entire heading an anchor link. The default is `none`. You can customize the default display by placing an `anchor-link.html` file in the templates directory. |
| `in_search_index` | Control search index inclusion | Optional | If set to `true`, the section page is included in the search index. The `build_search_index` setting in the site configuration must also be `true`. The default is `true`. |
| `render` | Control section page HTML generation | Optional | If set to `true`, the section homepage is generated. If set to `false`, the section can be used only to organize content. The default is `true`. |
| `redirect_to` | Redirect destination | Optional | Specifies the destination when a user accesses the section URL. Example: `redirect_to = "documentation/content/overview"`. This is useful when you want to redirect users to another page without generating the section homepage, for example, by combining it with `render = false`. |
| `transparent` | Pass pages to the parent section | Optional | If set to `true`, pages in this section are passed to the parent section's page list. This is useful when you want to organize content by year, for example, but do not want to separate the page list in the parent section. The default is `false`. |
| `aliases` | Redirect from old URLs | Optional | Sets redirects from old URLs to new URLs when content is moved or its URL is changed. Specify an array of paths, not URLs. Example: `aliases = ["old-section"]`. |
| `generate_feeds` | Generate a section feed | Optional | If set to `true`, a feed file is generated at the root path of the section. This setting is independent of the site-wide feed setting. Only posts in this section are included. Posts in subsections are not included. The default is `false`. |
| `hidden` | Control visibility in lists, etc. | Optional | If set to `true`, the section itself is generated but is not included in the parent section's subsection list, sitemap, feeds, search index, etc. The default is `false`. This setting also applies to child pages by default, but each page can override it with its own `hidden` setting. |
| `[extra]` | Custom data | Optional | A table for adding your own data. It can be accessed from templates using `section.extra`, etc. |

### Notes

Some settings are similar to those available in Page Front Matter, but there are also many settings specific to sections.

#### Difference between `render` and `redirect_to`

| Setting | Behavior |
| ---------------- | ----------------------------- |
| `render = true` | Generates the section homepage. |
| `render = false` | Does not generate the section homepage. |
| `redirect_to` | Specifies the destination when a user accesses the section URL. |

These settings are useful when you want to use a section only to organize content and do not want to display its homepage.

#### Usage of `transparent`

For example, consider the following directory structure.

```text
content/
└── posts/
    ├── _index.md
    ├── 2025/
    │   ├── _index.md
    │   └── article1.md
    └── 2026/
        ├── _index.md
        └── article2.md
```

Normally, pages are separated into the `2025` and `2026` sections. However, if `transparent = true` is set, those pages can be passed to the parent `posts` section.

This is useful when you want to organize content by year while displaying all pages together in the parent section.

#### Difference between `page_template` and `template`

- `template`: The template used to generate the page for the section itself.
- `page_template`: The template used to generate individual pages under the section.

If a page has its own `template` setting, that setting takes priority.

#### Scope of `hidden`

Unlike the `hidden` setting in Page Front Matter, the `hidden` setting in Section Front Matter also affects pages under the section.  
However, each child page can override this setting by specifying its own `hidden` value.

---

## Front Matter for Pages

[#Front matter - Page | Zola](https://www.getzola.org/documentation/content/page/#front-matter)

### Property List

The properties described in the link above are listed below.

| Property | Purpose | Required | Notes |
| ------------------ | ---------------- | -- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | Page title | Required | Specifies the title of the page. |
| `description` | Page description | Optional | Specifies a description of the page. It can also be used as a description for search engines. |
| `date` | Page creation date | Optional | Specify either `YYYY-MM-DD` or RFC3339 format. Example: `date = 2026-11-08`. This setting takes priority over the date in the filename. If the section's `sort_by` is set to `date`, pages without this setting will not be rendered. |
| `updated` | Last updated date | Optional | Specify this when the last updated date is different from `date`. Use the same format as `date`. |
| `weight` | Page sorting order | Optional | Specify a number. If the section's `sort_by` is set to `weight`, pages without this setting will not be rendered. |
| `draft` | Draft setting | Optional | If set to `true`, the page is treated as a draft. It is not loaded during normal builds or previews. It is loaded when the `--drafts` option is specified. The default is `false`. |
| `render` | Control page HTML generation | Optional | If set to `false`, a separate directory and `index.html` for this page will not be generated. The default is `true`. |
| `slug` | Last part of the URL | Optional | Specifies the last part of the URL instead of using the filename. The parent section path is still used. |
| `path` | Page URL path | Optional | Specifies the entire URL path of the page. It takes priority over `slug` and the filename, and the parent section path is not used. An empty string cannot be specified. A leading `/` is not necessary (and will be removed if specified). |
| `aliases` | Redirect from old URLs | Optional | Sets redirects from old URLs to new URLs when content is moved or its URL is changed. Specify an array of paths, not URLs. Example: `aliases = ["old-page"]`. |
| `authors` | Page authors | Optional | Specify an array of author names. If a site feed is enabled, the first author is used as the page author in the default feed template. |
| `in_search_index` | Control search index inclusion | Optional | If set to `false`, the page is excluded from the search index. The `build_search_index` setting in the site configuration must be `true`. Also, if `in_search_index = false` is set in the parent section, the page is not included in the search index. The default is `true`. |
| `include_in_feeds` | Control feed inclusion | Optional | If set to `false`, the page is excluded from all feeds (site, section, and taxonomy). The default is `true`. |
| `template` | Template to use | Optional | Specifies the template used to generate the page HTML. Example: `template = "page.html"`. |
| `hidden` | Control visibility in page lists, etc. | Optional | If set to `true`, the page is generated but is not included in section page lists, the sitemap, search index, feeds, etc. The default is `false`. |
| `[taxonomies]` | Taxonomy settings | Optional | Specifies tags, categories, etc. The keys must use the taxonomy names defined in `zola.toml`, and the values must be arrays of strings. Example: `tags = ["rust", "web"]`. |
| `[extra]` | Custom data | Optional | A table for adding your own data. It can be accessed from templates using `page.extra`, etc. |

The following is an example of Page Front Matter.  
*This is an example commonly used with the [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) template.*

```toml
+++
title = "Title"
description = "Article description"
date = 2026-11-01
updated = 2026-11-05

[taxonomies]
tags = ["Zola"]
authors = ["mosaos"]

[extra]
thumbnail = "zola-daisyui-blog.webp"
show_thumbnail = true
+++
```

### Notes

#### Difference between `render` and `hidden`

| Property | Generate page HTML | Page lists, sitemap, etc. |
| ---------------- | ------------ | ------------- |
| `render = false` | Not generated | Excluded |
| `hidden = true` | Generated | Excluded |

Use `hidden` when you want the page to be accessible directly but do not want it to appear in normal page lists, etc.

#### Difference between `slug` and `path`

- `slug`: Changes the last part of the URL while keeping the parent section path.
- `path`: Specifies the entire URL path, regardless of the parent section path.

#### Difference between `date` and `updated`

- `date`: The creation date of the article.
- `updated`: The last updated date of the article.

It is recommended to use the zero-padded `YYYY-MM-DD` format without quotation marks when specifying dates.

#### Difference between `in_search_index` and `hidden`

`in_search_index = false` only excludes a page from the search index, while `hidden = true` excludes it not only from search but also from page lists, the sitemap, feeds, etc.

Note that `title` is a basic property, but technically it is not required for every page.

### [taxonomies]

You can also configure `[taxonomies]` and `[extra]` tables in Front Matter.  
*In TOML, items enclosed in `[` and `]` are called tables.*

You need to configure `taxonomies` in `zola.toml` (formerly `config.toml`) before you can use them.

The `zola.toml` file in the [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) template contains the following settings.

```toml
[languages.en]
...
taxonomies = [
    { name = "tags" },
    { name = "authors" },
]

[languages.ja]
...
taxonomies = [
    { name = "tags" },
    { name = "authors" },
]
```

This means that two taxonomies, `tags` and `authors`, are available.  
*You can also add `categories`, for example.*

In Front Matter, specify them as follows.

```toml
[taxonomies]
tags = ["Zola"]
authors = ["mosaos"]
```

This allows you to classify content using Zola's built-in taxonomy feature.

The [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) template provides links for tags and authors in the sidebar.

### [extra]

The `[extra]` table allows users to add their own settings.  
The [zola-daisyui-blog](https://github.com/mosaos/zola-daisyui-blog) template supports the following settings.

- **thumbnail**  
  Specifies the thumbnail image for the page. The template assumes that articles are organized in separate directories, with assets such as images linked from the article stored in the same directory. Therefore, I think it is easier to manage thumbnails by placing them in the same directory as the article and specifying the filename here.  
  Thumbnail images are used in article list pages such as `blog-list.html`, `works-list.html`, and `latest-articles.html`.  
  They are also used as OGP images generated by `head-ogp.html`.
- **show_thumbnail**  
  If set to `true`, the thumbnail is displayed at the top of the page. The image specified by `thumbnail` is used.
- **slideshow**  
  If set to `true`, images in the page directory are displayed as a slideshow (`page.html`).

```toml
[extra]
thumbnail = "nudibranch-01.jpg"
slideshow = true
```