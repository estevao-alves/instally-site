import { Package } from "../types";
import { v4 as uuidv4 } from "uuid";

import nameListMostSearched from "@/services/nameslist-most-searched.json";

// ------ WINGET ------

export async function fetchWingetPackages(): Promise<Package[]> {
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