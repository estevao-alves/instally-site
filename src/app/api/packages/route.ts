import { NextResponse } from "next/server";
import packages from "@/services/packages.json";
import { AllowedCharacter } from "@/services/helpers";

import fs from "fs/promises";
import path from "path";

import { Package } from "@/services/packages/types";

import { fetchWingetPackages } from "@/services/packages/sources/winget";
import { fetchFlatpakPackages } from "@/services/packages/sources/flatpak";
import { mergePackages } from "@/services/packages/merge";
import { fetchWingetManifestPackages } from "@/services/packages/sources/winget-manifests";

// ------ GET ------

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 30;
    const categories = searchParams.get("categories");
    const search = searchParams.get("search") || "";
    const source = searchParams.get("source");

    let pkgs: any[] = packages as Package[];

    if (source === "winget") {
    pkgs = pkgs.filter(pkg => pkg.PackageIds.Winget);
}

    if (source === "flatpak") {
        pkgs = pkgs.filter(pkg => pkg.PackageIds.Flatpak);
    }

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
        // const winget = await fetchWingetPackages();
        const winget = await fetchWingetManifestPackages();
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