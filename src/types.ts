export type OpenGraphMeta = {
    type?: string;
    image?: string;
    url?: string;
};

export type TwitterMeta = {
    card?: string;
    site?: string;
    creator?: string;
    image?: string;
};

export type RouteMeta = {
    title?: string;
    description?: string;
    openGraph?: OpenGraphMeta;
    twitter?: TwitterMeta;
    jsonLd?: Record<string, any>;
};

export type MetadataResolver = (ctx: {
    params: Record<string, string>;
    query?: Record<string, string | string[]>;
}) => Promise<RouteMeta> | RouteMeta;

export type MetadataConfig = {
    defaults?: RouteMeta;
    routes: Record<string, RouteMeta | MetadataResolver>;
};
