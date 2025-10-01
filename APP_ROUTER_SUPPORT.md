# App Router Support Notice

## Current Support Status

**next-dynamic-metadata** currently supports **Next.js App Router only** (Next.js 13+ with the `app` directory).

### What This Means

✅ **Supported:**
- Next.js 13+ with App Router (`app` directory structure)
- `generateMetadata` function integration
- Server-side metadata generation
- Client-side metadata hydration with `MetadataHydrator`
- Dynamic routes with parameters (e.g., `/blog/[slug]`)
- Async metadata resolvers

❌ **Not Supported:**
- Next.js Pages Router (`pages` directory structure)
- `getStaticProps` / `getServerSideProps` integration
- Next.js versions below 13

## Why App Router Only?

The App Router provides several advantages for metadata management:

1. **Native Metadata API**: Built-in `generateMetadata` function
2. **Better Performance**: Streaming and concurrent features
3. **Improved Developer Experience**: Colocation of layouts and pages
4. **Future-Proof**: App Router is the recommended approach for new Next.js applications

## Migration from Pages Router

If you're currently using Pages Router and want to use this package:

1. **Upgrade to Next.js 13+**
2. **Migrate to App Router**: Follow the [official migration guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
3. **Install next-dynamic-metadata**: Once migrated, you can use this package

## Future Page Router Support

### Will Page Router be supported?

Page Router support **may be added in future versions** based on:

- **Community demand**: Number of requests and use cases
- **Maintenance complexity**: Effort required to support both routers
- **Next.js roadmap**: Official recommendations and deprecation timeline

### How to request Page Router support

If you need Page Router support:

1. **Open an issue** on GitHub explaining your use case
2. **Provide details** about why migration to App Router isn't feasible
3. **Contribute** to the discussion and help prioritize the feature

### Alternative Solutions for Page Router

While waiting for potential Page Router support, consider:

1. **Manual implementation**: Create your own metadata management system
2. **Other packages**: Look for Page Router-specific metadata solutions
3. **Gradual migration**: Migrate parts of your app to App Router incrementally

## Getting Help

If you have questions about App Router migration or this package:

- **Next.js Migration Guide**: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions and share experiences

---

**Last Updated**: October 2025  
**Package Version**: 1.0.0  
**Next.js Compatibility**: 13+ (App Router only)
