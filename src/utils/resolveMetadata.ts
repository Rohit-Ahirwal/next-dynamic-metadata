// src/utils/resolveMetadata.ts
import type { MetadataConfig, RouteMeta } from "../types";

function matchRoute(path: string, config: MetadataConfig): string | null {
  for (const route of Object.keys(config.routes)) {
    const pattern = "^" + route.replace(/:[^/]+/g, "([^/]+)") + "$";
    if (new RegExp(pattern).test(path)) return route;
  }
  return null;
}

export async function resolveMetadata(
  config: MetadataConfig,
  path: string,
  params: Record<string, string> = {}
): Promise<RouteMeta> {
  const routeKey = matchRoute(path, config);
  if (!routeKey) return config.defaults ?? {};

  const routeMeta = config.routes[routeKey];
  if (typeof routeMeta === "function") {
    return { ...config.defaults, ...(await routeMeta({ params })) };
  } else {
    return { ...config.defaults, ...routeMeta };
  }
}
