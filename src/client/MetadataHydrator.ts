"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MetadataHydrator() {
    const pathname = usePathname();

    useEffect(() => {
        async function updateMeta() {
            const res = await fetch(`/api/metadata?path=${pathname}`);
            const meta = await res.json();

            if (meta.title) document.title = meta.title;

            if (meta.description) {
                let desc = document.querySelector('meta[name="description"]');
                if (!desc) {
                    desc = document.createElement("meta");
                    desc.setAttribute("name", "description");
                    document.head.appendChild(desc);
                }
                desc.setAttribute("content", meta.description);
            }

            if (meta.openGraph?.image) {
                let ogImg = document.querySelector('meta[property="og:image"]');
                if (!ogImg) {
                    ogImg = document.createElement("meta");
                    ogImg.setAttribute("property", "og:image");
                    document.head.appendChild(ogImg);
                }
                ogImg.setAttribute("content", meta.openGraph.image);
            }
        }

        updateMeta();
    }, [pathname]);

    return null;
}
