# Contributing to next-dynamic-metadata

Thank you for your interest in contributing to next-dynamic-metadata! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Branch Naming Convention](#branch-naming-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code Style](#code-style)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git**
- **TypeScript** knowledge (helpful but not required)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/next-dynamic-metadata.git
cd next-dynamic-metadata
```

3. Add the original repository as upstream:

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/next-dynamic-metadata.git
```

## Development Setup

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 2. Build the Project

```bash
# Build TypeScript files
pnpm build

# Or watch for changes during development
pnpm watch
```

### 3. Verify Setup

After building, you should see the compiled files in the `dist/` directory:

```
dist/
├── client/
│   ├── MetadataHydrator.d.ts
│   └── MetadataHydrator.js
├── index.d.ts
├── index.js
├── types.d.ts
├── types.js
└── utils/
    ├── resolveMetadata.d.ts
    └── resolveMetadata.js
```

## Project Structure

```
src/
├── client/
│   └── MetadataHydrator.ts    # Client-side React component
├── utils/
│   └── resolveMetadata.ts     # Core metadata resolution logic
├── types.ts                   # TypeScript type definitions
└── index.ts                   # Main package exports

dist/                          # Compiled JavaScript output
package.json                   # Package configuration
tsconfig.json                  # TypeScript configuration
README.md                      # Package documentation
CONTRIBUTING.md               # This file
```

## Making Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow the existing code style and patterns
- Add TypeScript types for any new functionality
- Update documentation if needed
- Test your changes thoroughly

### 3. Common Development Tasks

#### Adding New Features

1. **Update Types**: Add new types to `src/types.ts` if needed
2. **Implement Logic**: Add your feature implementation
3. **Export**: Update `src/index.ts` to export new functionality
4. **Document**: Update README.md with usage examples

#### Fixing Bugs

1. **Identify the Issue**: Understand the problem thoroughly
2. **Write a Test Case**: If possible, create a test that reproduces the bug
3. **Fix the Issue**: Implement the fix
4. **Verify**: Ensure the fix works and doesn't break existing functionality

## Testing

### Manual Testing

Since this package integrates with Next.js, manual testing is important:

1. **Create a Test Next.js App**:

```bash
# In a separate directory
npx create-next-app@latest test-app --typescript --app
cd test-app
```

2. **Link Your Local Package**:

```bash
# In your next-dynamic-metadata directory
pnpm link

# In your test app directory
pnpm link next-dynamic-metadata
```

3. **Test Your Changes**:

Create a test configuration and verify:
- Metadata resolution works correctly
- TypeScript types are accurate
- Client-side hydration functions properly
- Edge cases are handled

### Automated Testing

Currently, the project uses manual testing. We welcome contributions to add automated testing:

- Unit tests for `resolveMetadata` function
- Integration tests with Next.js
- Type checking tests

If you'd like to contribute testing infrastructure, please open an issue first to discuss the approach.

## Submitting Changes

### Before Submitting

1. **Build Successfully**: Ensure `pnpm build` completes without errors
2. **Test Thoroughly**: Manually test your changes
3. **Update Documentation**: Update README.md if needed
4. **Check Types**: Ensure TypeScript compilation is clean

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "feat: add support for custom JSON-LD schemas"
git commit -m "fix: resolve metadata for nested dynamic routes"
git commit -m "docs: update API reference with new examples"
git commit -m "refactor: simplify route matching logic"

# Follow conventional commits format
# type(scope): description
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## Branch Naming Convention

Use descriptive branch names that indicate the type of work:

```bash
# Features
feature/json-ld-support
feature/nested-routes
feature/custom-resolvers

# Bug fixes
fix/route-matching-issue
fix/hydration-error
fix/typescript-types

# Documentation
docs/api-reference
docs/contributing-guide

# Refactoring
refactor/resolve-metadata
refactor/type-definitions
```

## Pull Request Process

### 1. Prepare Your PR

- Ensure your branch is up to date with main:

```bash
git fetch upstream
git rebase upstream/main
```

- Push your changes:

```bash
git push origin your-branch-name
```

### 2. Create the Pull Request

1. Go to the GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Manual testing completed
- [ ] No breaking changes
- [ ] TypeScript compilation successful

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated if needed
```

### 3. Review Process

- Maintainers will review your PR
- Address any feedback promptly
- Be open to suggestions and changes
- Once approved, your PR will be merged

## Issue Reporting

### Before Creating an Issue

1. **Search Existing Issues**: Check if the issue already exists
2. **Check Documentation**: Ensure it's not a usage question
3. **Test with Latest Version**: Verify the issue exists in the latest release

### Creating a Good Issue

Include:

- **Clear Title**: Descriptive and specific
- **Environment**: Next.js version, Node.js version, package version
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Code Examples**: Minimal reproduction case
- **Screenshots**: If applicable

### Issue Templates

#### Bug Report

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Create config with '...'
2. Use resolveMetadata with '...'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- Next.js version: [e.g. 14.0.0]
- next-dynamic-metadata version: [e.g. 1.0.0]
- Node.js version: [e.g. 18.17.0]

**Additional context**
Any other context about the problem.
```

#### Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context about the feature request.
```

## Code Style

### TypeScript Guidelines

- Use strict TypeScript settings
- Provide explicit types for public APIs
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### Code Formatting

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Follow existing patterns in the codebase

### Example Code Style

```typescript
/**
 * Resolves metadata for a given path using the provided configuration.
 * @param config - The metadata configuration object
 * @param path - The route path to resolve metadata for
 * @param params - Optional route parameters
 * @returns Promise resolving to the metadata object
 */
export async function resolveMetadata(
  config: MetadataConfig,
  path: string,
  params: Record<string, string> = {}
): Promise<RouteMeta> {
  const routeKey = matchRoute(path, config);
  
  if (!routeKey) {
    return config.defaults ?? {};
  }

  const routeMeta = config.routes[routeKey];
  
  if (typeof routeMeta === 'function') {
    return { ...config.defaults, ...(await routeMeta({ params })) };
  }
  
  return { ...config.defaults, ...routeMeta };
}
```

## Release Process

Releases are handled by maintainers:

1. **Version Bump**: Update version in package.json
2. **Changelog**: Update CHANGELOG.md with new features/fixes
3. **Build**: Ensure clean build
4. **Tag**: Create git tag
5. **Publish**: Publish to npm
6. **GitHub Release**: Create GitHub release with notes

## Questions?

If you have questions about contributing:

1. **Check Documentation**: README.md and this guide
2. **Search Issues**: Look for similar questions
3. **Create Discussion**: Use GitHub Discussions for questions
4. **Contact Maintainers**: Reach out via GitHub

Thank you for contributing to next-dynamic-metadata! 🎉