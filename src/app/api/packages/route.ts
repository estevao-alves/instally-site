import { NextResponse } from "next/server";
import packages from "@/services/packages.json";
import nameListMostSearched from "@/services/nameslist-most-searched.json";
import { AllowedCharacter } from "@/services/helpers";
import { v4 as uuidv4 } from "uuid";

import fs from "fs/promises";
import path from "path";

export type Package = {
    Guid: string,
    Name: string,
    Publisher: string,
    Tags: string[],
    Description: string,
    Site: string,
    VersionsLength: number,
    LatestVersion: string,
    Score: number,
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

    let pkgs: any[] = packages;

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
            } else {
                map.set(key, { ...pkg });
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
    let page = 1;
    const perPage = 100;
    let raw: any[] = [];

    while (true) {
        const res = await fetch("https://flathub.org/api/v2/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: "",
                page,
                per_page: perPage
            })
        });

        const json = await res.json();
        const apps = json?.hits || [];

        if (!apps.length) break;

        raw.push(...apps);
        page++;
    }

    return raw.map((app: any) => ({
        Guid: uuidv4(),
        Name: app.name || "",
        Publisher: app.developer_name || "",
        Tags: [],
        Description: app.summary || "",
        Site: app.homepage || "",
        VersionsLength: 1,
        LatestVersion: "",
        Score: 0,
        PackageIds: {
            Flatpak: app.app_id
        }
    }));
}