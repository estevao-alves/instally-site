'use client'

import {Package} from "@/app/api/packages/route"
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

        var pkgs = [] as Package[];

        // Verificar se o app já está adicionado...
        if (packagesAdded.filter((pkg) => pkg.PackageIds.Winget === item.PackageIds.Winget)[0]) {
            pkgs = packagesAdded.filter((pkg) => pkg.PackageIds.Winget !== item.PackageIds.Winget);
        }
        // Se não tiver adicionado...
        else {
            pkgs = [item, ...packagesAdded];
        }

        let itemsListSerialized = JSON.stringify(pkgs);
        localStorage.setItem("appList", itemsListSerialized);

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