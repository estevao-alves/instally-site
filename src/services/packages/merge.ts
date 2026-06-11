import { Package } from "./types";

function cleanTags(tags: string[] = []): string[] {
    return tags.filter(tag =>
        /^[a-zA-Z0-9\s]+$/.test(tag)
    );
}

function normalizeName(name: string) {
    return name?.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function mergePackages(sources: Package[][]) {
    const map = new Map<string, Package>();

    for (const source of sources) {
        for (const pkg of source) {
            const key = normalizeName(pkg.Name);

            if (map.has(key)) {
                const existing = map.get(key)!;

                existing.PackageIds = {
                    ...existing.PackageIds,
                    ...pkg.PackageIds
                };

                // Fill missing fields only
                existing.Description ||= pkg.Description;
                existing.Publisher ||= pkg.Publisher;
                existing.Site ||= pkg.Site;
                existing.LatestVersion ||= pkg.LatestVersion;
                existing.VersionsLength ||= pkg.VersionsLength;
                existing.Score ||= pkg.Score;

                // Merge tags (avoid duplicates)
                existing.Tags = cleanTags(
                    Array.from(new Set([
                        ...(existing.Tags || []),
                        ...(pkg.Tags || [])
                    ]))
                );

            } else {
                map.set(key, {
                    ...pkg,
                    Tags: cleanTags(pkg.Tags || [])
                });
            }
        }
    }

    return Array.from(map.values());
}