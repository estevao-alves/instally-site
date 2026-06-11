// src/services/packages/sources/winget-manifests.ts

import fs from "fs/promises";
import path from "path";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";

import { Package } from "../types";
import nameListMostSearched from "@/services/nameslist-most-searched.json";

export async function fetchWingetManifestPackages(): Promise<Package[]> {
    // Root Winget manifests folder
    const manifestsPath = path.join(
        process.cwd(),
        "src",
        "manifests"
    );

    const result: Package[] = [];

    const firstLetters: string[] = await fs.readdir(manifestsPath);

    for (const firstLetter of firstLetters){
        const firstLetterPath = path.join(
            manifestsPath,
            firstLetter
        );

        const publishers = await fs.readdir(
            firstLetterPath
        );

        // Iterate publishers
        for (const publisher of publishers) {
            const publisherPath = path.join(
                firstLetterPath,
                publisher
            );

            const packageFolders = await fs.readdir(
                publisherPath
            );

            // Iterate packages inside publisher
            for (const packageFolder of packageFolders) {
                try {

                    const packagePath = path.join(
                        publisherPath,
                        packageFolder
                    );

                    // Find latest version containing a valid English locale manifest
                    const versions = await fs.readdir(
                        packagePath
                    );

                    const validVersions: string[] = [];

                    for (const version of versions) {

                        const versionPath = path.join(packagePath, version);

                        try {

                            const files = await fs.readdir(
                                versionPath
                            );

                            if (
                                files.some(file =>
                                    file.endsWith(".locale.en-US.yaml")
                                )
                            ) {
                                validVersions.push(version);
                            }

                        } catch {
                            // Ignore files or invalid folders
                        }
                    }

                    if (!validVersions.length) continue;

                    const latestVersion =
                        validVersions.sort().at(-1);

                    if (!latestVersion) continue;
                    //

                    // Load locale manifest
                    const versionPath = path.join(
                        packagePath,
                        latestVersion
                    );

                    const files = await fs.readdir(
                        versionPath
                    );

                    const localeFile = files.find(file =>
                        file.endsWith(".locale.en-US.yaml")
                    );

                    if (!localeFile) continue;

                    const yamlContent =
                        await fs.readFile(
                            path.join(versionPath, localeFile),
                            "utf8"
                        );

                    const manifest =
                        YAML.parse(yamlContent);

                    // Calculate popularity score
                    let score = 1;

                    nameListMostSearched?.forEach((name, i) => {
                        if (manifest.PackageName?.toLowerCase() === name?.toLowerCase()) {
                            score = 1000 - i;
                        }
                    });

                    // Convert Winget manifest into Instally package format
                    result.push({
                        Guid: uuidv4(),
                        
                        Name: manifest.PackageName || "",
                        
                        Publisher: manifest.Publisher || "",
                        
                        Tags: manifest.Tags || [],
                        
                        Description: manifest.Description || manifest.ShortDescription || "",
                        
                        Site: manifest.PublisherUrl || manifest.PackageUrl || "",

                        VersionsLength: versions.length,

                        LatestVersion: manifest.PackageVersion || latestVersion,

                        Score: score,

                        PackageIds: {Winget: manifest.PackageIdentifier}
                    });

                } catch (error) {
                    console.error(
                        `Failed loading ${publisher}/${packageFolder}`,
                        error
                    );
                }
            }
        }
    }
    
    console.log("Total Winget apps:", result.length);

    return result;
}