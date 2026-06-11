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