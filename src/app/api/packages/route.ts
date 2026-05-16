import { NextResponse } from "next/server";
import packages from "@/services/packages.json";
import nameListMostSearched from "@/services/nameslist-most-searched.json";
import { AllowedCharacter } from "@/services/helpers";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

import { promisify } from "util";
import { gunzip } from "zlib";
const gunzipAsync = promisify(gunzip);

export type Package = {
    Guid: string,
    Name: string,
    Publisher: string,
    Tags: string[],
    Description: string,
    Site?: string,
    VersionsLength: number,
    LatestVersion: string,
    Score: number,
    Icon?: string,
    Screenshots?: string[];
    PackageIds: {
        Winget?: string,
        Flatpak?: string,
        
        // ToDo
        // Snap?: string,
        // Apt?: string,
        // Dnf?: string
    }
}

// ------ GET ------

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 30;
    const categories = searchParams.get("categories");
    const search = searchParams.get("search") || "";

    let pkgs: any[] = packages as Package[];

    // filter by category
    if (categories) {
        const categorias: string[] = categories.split(",");
        pkgs = pkgs.filter(item =>
            item.Tags?.some((tag: string) => categorias.includes(tag))
        );
    }

    // search
    if (search) {
        pkgs = pkgs.filter(pkg =>
            pkg.Name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // sort + limit
    pkgs = pkgs
        .sort((a, b) => Number(b.Score || 0) - Number(a.Score || 0))
        .slice(0, limit);

    return NextResponse.json(pkgs);
}


// ------ PUT ------

export async function PUT() {
    try {
        const winget = await fetchWingetPackages();
        const flatpak = await fetchFlatpakPackages();

        const merged = mergePackages([winget, flatpak]);

        console.log("Total merged:", merged.length);

        const filePath = path.join(process.cwd(), "src/services/packages.json");
        await fs.writeFile(filePath, JSON.stringify(merged, null, 2));

        return NextResponse.json(merged);
    } catch (err: any) {
        console.error("PUT /api/packages error:", err);

        return NextResponse.json(
            {
                error: "Failed to update packages",
                details: err?.message || err
            },
            { status: 500 }
        );
    }
}


// ------ GLOBAL ------

function cleanTags(tags: string[] = []): string[] {
    return tags.filter(tag =>
        /^[a-zA-Z0-9\s]+$/.test(tag)
    );
}

function normalizeName(name: string) {
    return name?.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mergePackages(sources: Package[][]) {
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


// ------ WINGET ------

async function fetchWingetPackages(): Promise<Package[]> {
    const apiUrl = "https://api.winget.run/v2/packages";
    const params = "?ensureContains=true&partialMatch=true&take=4315";

    const res = await fetch(`${apiUrl}${params}`);
    const json = await res.json();
    const data = json?.Packages || [];

    const names: string[] = [];

    const result = (await Promise.all(
        data.map(async (pkg: any) => {
            if (names.includes(pkg.Latest.Name)) return;
            names.push(pkg.Latest.Name);

            let score = 1;

            nameListMostSearched?.forEach((name, i) => {
                if (pkg.Latest.Name?.toLowerCase() === name?.toLowerCase()) {
                    score = 1000 - i;
                }
            });

            return {
                Guid: uuidv4(),
                Name: pkg.Latest.Name,
                Publisher: pkg.Latest.Publisher,
                Tags: pkg.Latest.Tags,
                Description: pkg.Latest.Description,
                Site: pkg.Latest.Homepage,
                VersionsLength: pkg.Versions.length || 1,
                LatestVersion: pkg.Versions?.[0] || "",
                Score: score,
                PackageIds: {
                    Winget: pkg.Id
                }
            };
        })
    )).filter(Boolean);

    return result;
}


// ------ FLATPAK ------

async function fetchFlatpakPackages(): Promise<Package[]> {
    // 1. download xml.gz
    const res = await fetch("https://flathub.org/repo/appstream/x86_64/appstream.xml.gz");
    const buffer = Buffer.from(await res.arrayBuffer());

    // 2. unzip
    const xmlBuffer = await gunzipAsync(buffer as any);
    const xml = xmlBuffer.toString();

    // 3. split components (cheap parsing)
    const components = xml.split("<component");

    const result: Package[] = [];

    for (const chunk of components) {
        // only real apps
        if (!/type="desktop/.test(chunk)) continue;

        const idMatch = chunk.match(/<id>(.*?)<\/id>/);
        const nameMatch = chunk.match(/<name>(.*?)<\/name>/);
        const summaryMatch = chunk.match(/<summary>(.*?)<\/summary>/);
        const descMatch = chunk.match(/<description>([\s\S]*?)<\/description>/);
        const devMatch = chunk.match(/<developer_name>(.*?)<\/developer_name>/);
        const siteMatch = chunk.match(/<url type="homepage">(.*?)<\/url>/);
        const versionMatch = chunk.match(/<release[^>]*version="(.*?)"/);
        const iconMatch = chunk.match(/<icon type="remote">(.*?)<\/icon>/);
        const stockIconMatch = chunk.match(/<icon type="stock">(.*?)<\/icon>/);
        const icon =
            iconMatch?.[1] ||
            (stockIconMatch
                ? `https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/${stockIconMatch[1]}.png`
                : "");

        const screenshots: string[] = [];
        const imgRegex = /<image[^>]*>(.*?)<\/image>/g;

        let iMatch;
        while ((iMatch = imgRegex.exec(chunk)) !== null) {
            screenshots.push(iMatch[1]);
        }

        const keywordMatches: string[] = [];
        const keywordRegex = /<keyword>(.*?)<\/keyword>/g;

        let kMatch;
        while ((kMatch = keywordRegex.exec(chunk)) !== null) {
            keywordMatches.push(kMatch[1]);
        }

        // categories (multiple)
        const categoryMatches: string[] = [];
        const regex = /<category>(.*?)<\/category>/g;

        let match;
        while ((match = regex.exec(chunk)) !== null) {
            categoryMatches.push(match[1]);
        }

        if (!idMatch || !nameMatch) continue;

        // clean description (handling html tags) -----
        const cleanDescription = (descMatch?.[1] || summaryMatch?.[1] || "")

        // remove xml formatting newlines
        .replace(/\r?\n\s*/g, " ")

        // decode entities
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")

        // bullet items
        .replace(/<li>/g, "• ")
        .replace(/<\/li>/g, "\n")

        // paragraphs
        .replace(/<p>/g, "\n")
        .replace(/<\/p>/g, "\n\n\n")

        // line breaks
        .replace(/<br\s*\/?>/g, "\n\n")

        // remove formatting tags
        .replace(/<\/?(ul|ol|p|em|strong|code|b|i)>/g, "")

        // remove remaining tags
        .replace(/<[^>]*>/g, "")

        // collapse spaces
        .replace(/[ \t]+/g, " ")

        // trim spaces around newlines
        .replace(/ *\n */g, "\n")

        // collapse excessive newlines
        .replace(/\n{3,}/g, "\n\n")

        .trim();
        // ------

        result.push({
            Guid: uuidv4(),
            Name: nameMatch[1],
            Publisher: devMatch?.[1] || "",
            Tags: Array.from(new Set([
                ...categoryMatches,
                ...keywordMatches
            ])),
            Description: cleanDescription,
            Site: siteMatch?.[1] || "",
            Icon: icon,
            Screenshots: screenshots,
            VersionsLength: versionMatch ? 1 : 0,
            LatestVersion: versionMatch?.[1] || "",
            Score: 0,
            PackageIds: {
                Flatpak: idMatch[1]
            },
        });
    }

    console.log("Total Flatpak apps:", result.length);

    return result;
}