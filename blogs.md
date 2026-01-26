# Blog Post Template for GitFool

This document describes the format and structure for blog posts in the GitFool blog.

## File Location

All blog posts should be created as markdown files (`.md`) in the [GitFool-Blogs](https://github.com/MonsterFlick/GitFool-Blogs) repository.

## Frontmatter Format (Required)

Every blog post **must** start with YAML frontmatter:

```yaml
---
title: "Your Blog Title Here"
description: "A compelling 150-160 character description for SEO and previews"
date: "2026-01-26"
tags:
  - javascript
  - react
  - web-development
image: "https://example.com/path-to-cover-image.jpg"
author:
  name: "Your Name"
  github: "your-github-username"
---
```

## Field Descriptions

### Required Fields

| Field | Description | SEO Impact |
|-------|-------------|------------|
| `title` | Main heading of the blog post (max 60 characters for SEO) | **High** - Used in search results and page title |
| `description` | Brief summary (150-160 characters ideal) | **High** - Appears in search snippets |
| `date` | Publication date in `YYYY-MM-DD` format | **Medium** - Used for sorting and freshness signals |
| `tags` | Array of relevant topic keywords | **High** - Used for filtering and keywords meta tag |
| `author.name` | Author's display name | **Medium** - Shows in article schema |

### Optional Fields

| Field | Description | SEO Impact |
|-------|-------------|------------|
| `image` | URL to cover/hero image (1200x630px recommended) | **High** - Used in social shares and rich snippets |
| `author.github` | Author's GitHub username (without @) | **Low** - Used for linking to author profile |

## Content Guidelines

### Headings
- Use `##` for main sections (H2)
- Use `###` for subsections (H3)
- Don't use `#` (H1) in content - the title serves as H1

### Code Blocks
Use fenced code blocks with language specification:
~~~markdown
```javascript
const example = "Hello World";
```
~~~

### Images in Content
```markdown
![Alt text describing the image](https://example.com/image.jpg)
```

### Links
```markdown
[Link text](https://example.com)
```

## SEO Best Practices

1. **Title**: Keep under 60 characters, include primary keyword
2. **Description**: 150-160 characters, include call-to-action
3. **Tags**: 3-5 relevant keywords that users might search for
4. **Image**: Use high-quality images with descriptive alt text
5. **Content**: Aim for 1,500+ words for better ranking
6. **Headings**: Use descriptive headings with keywords

## Example Blog Post

```markdown
---
title: "Getting Started with React Hooks"
description: "Learn how to use React Hooks to simplify your components. A beginner-friendly guide with practical examples."
date: "2026-01-26"
tags:
  - react
  - javascript
  - hooks
  - frontend
image: "https://example.com/react-hooks-cover.jpg"
author:
  name: "Om Thakur"
  github: "MonsterFlick"
---

React Hooks revolutionized the way we write React components...

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features...

### useState Hook

The most basic hook for managing state:

```javascript
const [count, setCount] = useState(0);
```

## Conclusion

React Hooks simplify component logic and make code more reusable...
```
