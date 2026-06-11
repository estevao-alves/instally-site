import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { gunzip } from "zlib";
import { Package } from "../types";

// ------ FLATPAK ------

const gunzipAsync = promisify(gunzip);

export async function fetchFlatpakPackages(): Promise<Package[]> {
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
        .replace(/<\/li>/g, "\n\n")

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