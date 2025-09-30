# Next Dynamic Metadata

[![npm version](https://badge.fury.io/js/next-dynamic-metadata.svg)](https://www.npmjs.com/package/next-dynamic-metadata)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Next.js package that simplifies metadata management by allowing you to define all your SEO metadata in a single configuration file. Perfect for App Router applications that need dynamic, SEO-friendly metadata without the complexity of scattered `generateMetadata` functions.

## 🚀 Why Next Dynamic Metadata?

### Problems with Next.js Built-in Metadata

- **Scattered Logic**: Metadata definitions spread across multiple `layout.tsx` and `page.tsx` files
- **Repetitive Code**: Writing similar `generateMetadata` functions in every route
- **Hard to Maintain**: Updating global metadata requires touching multiple files
- **No Central Overview**: Difficult to see all your site's metadata at a glance

### Our Solution

- **Single Config File**: Define all metadata in one place (`next-metadata.config.ts`)
- **Dynamic Support**: Async functions for fetching data (blog posts, products, etc.)
- **Type Safety**: Full TypeScript support with intelligent autocomplete
- **SEO Complete**: Supports Open Graph, Twitter Cards, JSON-LD, and more
- **Client Updates**: Optional client-side metadata updates with `MetadataHydrator`

## 📦 Installation

```bash
# npm
npm install next-dynamic-metadata

# yarn
yarn add next-dynamic-metadata

# pnpm
pnpm add next-dynamic-metadata
```

## 🛠️ Basic Usage

### 1. Create Your Metadata Config

Create `next-metadata.config.ts` (or `.js`) in your project root:

```typescript
import type { MetadataConfig } from 'next-dynamic-metadata';

const config: MetadataConfig = {
  defaults: {
    title: 'My Awesome Website',
    description: 'The best website on the internet',
    openGraph: {
      type: 'website',
      image: '/og-default.jpg',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mywebsite',
    },
  },
  routes: {
    '/': {
      title: 'Home - My Awesome Website',
      description: 'Welcome to the homepage of my awesome website',
    },
    '/about': {
      title: 'About Us - My Awesome Website',
      description: 'Learn more about our company and mission',
    },
    '/blog/:slug': async ({ params }) => {
      // Dynamic metadata - fetch blog post data
      const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(r => r.json());
      
      return {
        title: `${post.title} - My Blog`,
        description: post.excerpt,
        openGraph: {
          type: 'article',
          image: post.featuredImage,
        },
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          author: post.author,
          datePublished: post.publishedAt,
        },
      };
    },
  },
};

export default config;
```

### 2. Helper function
With the help of this helper function we will find the current path

```typescript
// utils/getCurrentPath.ts
export function getCurrentPath(params: Record<string, any>, searchParams?: Record<string, any>) {
    // For dynamic routes like /blog/:slug
    // We'll assume your App Router passes { slug } in params
    if (params && Object.keys(params).length) {
        let path = "";
        for (const key in params) {
            path += `/${params[key]}`;
        }
        return path || "/";
    }
    return "/";
}
```

### 2. Update Your Root Layout

Replace your existing metadata in `app/layout.tsx`:

```typescript
import { resolveMetadata } from 'next-dynamic-metadata';
import { getCurrentPath } from "./utils/getCurrentPath";
import config from "@/next-metadata.config";

export async function generateMetadata({ params, searchParams }: any) {
  const path = getCurrentPath(await params, await searchParams); // e.g., /blog/:slug
  return await resolveMetadata(config, path); // pulls from single config
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Optional: Add Client-Side Updates

For single-page applications or client-side navigation, add the `MetadataHydrator`:

An api route is required for the use of `MetadataHydrator`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { resolveMetadata } from "next-dynamic-metadata";
import config from "@/next-metadata.config";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "/";
    const meta = await resolveMetadata(config, path);
    return NextResponse.json(meta);
}
```
Finally `MetadataHydrator`
```typescript
// app/layout.tsx
import { MetadataHydrator } from 'next-dynamic-metadata';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <MetadataHydrator />
      </body>
    </html>
  );
}
```

## 📚 API Reference

### `resolveMetadata(config, path, params?)`

Resolves metadata for a given path using your configuration.

**Parameters:**
- `config: MetadataConfig` - Your metadata configuration object
- `path: string` - The current route path (e.g., `/blog/my-post`)
- `params?: Record<string, string>` - Route parameters (e.g., `{ slug: 'my-post' }`)

**Returns:** `Promise<RouteMeta>` - Resolved metadata object

**Example:**
```typescript
const metadata = await resolveMetadata(config, '/blog/hello-world', { slug: 'hello-world' });
```

### `MetadataHydrator`

A React component that updates metadata on the client side when routes change.

**Props:** None

**Usage:**
```typescript
import { MetadataHydrator } from 'next-dynamic-metadata';

// Add to your layout or app component
<MetadataHydrator />
```

### Type Definitions

#### `MetadataConfig`

```typescript
type MetadataConfig = {
  defaults?: RouteMeta;
  routes: Record<string, RouteMeta | MetadataResolver>;
};
```

#### `RouteMeta`

```typescript
type RouteMeta = {
  title?: string;
  description?: string;
  openGraph?: OpenGraphMeta;
  twitter?: TwitterMeta;
  jsonLd?: Record<string, any>;
};
```

#### `MetadataResolver`

```typescript
type MetadataResolver = (ctx: {
  params: Record<string, string>;
  query?: Record<string, string | string[]>;
}) => Promise<RouteMeta> | RouteMeta;
```

## 🎯 Advanced Examples

### E-commerce Product Pages

```typescript
const config: MetadataConfig = {
  routes: {
    '/products/:id': async ({ params }) => {
      const product = await getProduct(params.id);
      
      return {
        title: `${product.name} - Buy Online`,
        description: product.shortDescription,
        openGraph: {
          type: 'product',
          image: product.images[0],
        },
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
          },
        },
      };
    },
  },
};
```

### Multi-language Support

```typescript
const config: MetadataConfig = {
  routes: {
    '/en/about': {
      title: 'About Us',
      description: 'Learn about our company',
    },
    '/es/about': {
      title: 'Acerca de Nosotros',
      description: 'Conoce nuestra empresa',
    },
  },
};
```

### Dynamic API-based Metadata

```typescript
const config: MetadataConfig = {
  routes: {
    '/user/:username': async ({ params }) => {
      try {
        const user = await fetch(`/api/users/${params.username}`).then(r => r.json());
        
        return {
          title: `${user.displayName} (@${user.username})`,
          description: user.bio || `Check out ${user.displayName}'s profile`,
          openGraph: {
            type: 'profile',
            image: user.avatar,
          },
        };
      } catch (error) {
        return {
          title: 'User Not Found',
          description: 'The requested user profile could not be found',
        };
      }
    },
  },
};
```

## ⚠️ Important Notes

### App Router Only

This package is designed specifically for **Next.js App Router** (Next.js 13+). It does not support the legacy Pages Router. If you're using Pages Router, you'll need to migrate to App Router first.

### Route Patterns

Use colon syntax for dynamic routes in your config:
- `/blog/:slug` matches `/blog/hello-world`
- `/category/:cat/product/:id` matches `/category/electronics/product/123`

### Performance Considerations

- Async metadata resolvers are cached by Next.js
- Keep API calls in resolvers fast to avoid slow page loads
- Consider using static metadata for routes that don't need dynamic data

## 🏆 Best Practices

### 1. Organize Your Config

For large applications, consider splitting your config:

```typescript
// configs/blog.ts
export const blogRoutes = {
  '/blog': { /* ... */ },
  '/blog/:slug': async ({ params }) => { /* ... */ },
};

// next-metadata.config.ts
import { blogRoutes } from './configs/blog';

const config: MetadataConfig = {
  defaults: { /* ... */ },
  routes: {
    ...blogRoutes,
    // other routes...
  },
};
```

### 2. Use Meaningful Defaults

Set comprehensive defaults to avoid repetition:

```typescript
const config: MetadataConfig = {
  defaults: {
    title: 'My Website',
    description: 'Default description',
    openGraph: {
      type: 'website',
      image: '/og-default.jpg',
      url: 'https://mywebsite.com',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mywebsite',
    },
  },
  // routes will inherit and override these defaults
};
```

### 3. Handle Errors Gracefully

```typescript
'/api-dependent/:id': async ({ params }) => {
  try {
    const data = await fetchData(params.id);
    return { title: data.title };
  } catch (error) {
    // Fallback to defaults or static metadata
    return { title: 'Content Not Found' };
  }
},
```

### 4. Optimize Images

Always provide optimized images for social sharing:

```typescript
openGraph: {
  image: '/og-image-1200x630.jpg', // Recommended: 1200x630px
},
twitter: {
  image: '/twitter-card-1200x600.jpg', // Recommended: 1200x600px
},
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Set up the development environment
- Run tests and linting
- Submit pull requests
- Report issues

## 📄 License

MIT © [Your Name]

## 🔗 Links

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [JSON-LD Schema.org](https://schema.org/)

---

**Note:** This package currently supports Next.js App Router only. Page Router support may be added in future versions based on community demand.