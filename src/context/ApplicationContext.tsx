'use client'

import { Package } from "@/services/packages/types"
import {createContext, useState} from "react"

interface IContext {
    packages: Package[] | null,
    setpackages: (items: Package[] | null) => void,

    packagesAdded: Package[],
    setPackagesAdded: (items: Package[]) => void,

    appSelected: Package | null,
    setAppSelected: (item: Package | null) => void,

    infoSidebarVisibility: Package | null,
    setInfoSidebarVisibility: (item: Package | null) => void,

    loadAppsInLocalStorage: () => void,
    addOrRemoveApp: (item: Package) => void
}

export function getPackageId(pkg: Package) {
    return (
        pkg.PackageIds.Winget ||
        pkg.PackageIds.Flatpak
    );
}

export const ApplicationContext = createContext({} as IContext)

export const ApplicationProvider = ({children}: any) => {
    const [packages, setpackages] = useState<Package[] | null>(null);
    const [packagesAdded, setPackagesAdded] = useState<Package[]>([]);
    const [appSelected, setAppSelected] = useState<Package | null>(null);
    const [infoSidebarVisibility, setInfoSidebarVisibility] = useState<Package | null>(null);

    function loadAppsInLocalStorage() {
        const getLocalPackages = localStorage.getItem("appList");

        if (getLocalPackages !== null) {
            const itemsListDescerialized: Package[] = JSON.parse(getLocalPackages);
            setPackagesAdded(itemsListDescerialized);
        }
    }

    // Adicionar ou remover um app
    function addOrRemoveApp(item: Package) {

        const itemId = getPackageId(item);

        let pkgs: Package[];

        if (packagesAdded.some(pkg => getPackageId(pkg) === itemId))
            {pkgs = packagesAdded.filter(pkg => getPackageId(pkg) !== itemId);}
        else {
            pkgs = [item, ...packagesAdded];
        }

        localStorage.setItem(
            "appList",
            JSON.stringify(pkgs)
        );

    setPackagesAdded(pkgs);
    }

    return <ApplicationContext.Provider value={{
        packages,
        setpackages,
        packagesAdded,
        setPackagesAdded,
        appSelected,
        setAppSelected,
        infoSidebarVisibility,
        setInfoSidebarVisibility,
        loadAppsInLocalStorage,
        addOrRemoveApp
    }}> {children}
    </ApplicationContext.Provider>
}

export default ApplicationProvider;