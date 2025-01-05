'use client'

import {AppItemTypes} from "@/app/api/packages/route"
import {createContext, useState} from "react"

interface IContext {
    packages: AppItemTypes[] | null,
    setpackages: (items: AppItemTypes[] | null) => void,

    packagesAdded: AppItemTypes[],
    setPackagesAdded: (items: AppItemTypes[]) => void,

    appSelected: AppItemTypes | null,
    setAppSelected: (item: AppItemTypes | null) => void,

    infoSidebarVisibility: AppItemTypes | null,
    setInfoSidebarVisibility: (item: AppItemTypes | null) => void,

    loadAppsInLocalStorage: () => void,
    addOrRemoveApp: (item: AppItemTypes) => void
}

export const ApplicationContext = createContext({} as IContext)

export const ApplicationProvider = ({children}: any) => {
    const [packages, setpackages] = useState<AppItemTypes[] | null>(null);
    const [packagesAdded, setPackagesAdded] = useState<AppItemTypes[]>([]);
    const [appSelected, setAppSelected] = useState<AppItemTypes | null>(null);
    const [infoSidebarVisibility, setInfoSidebarVisibility] = useState<AppItemTypes | null>(null);

    function loadAppsInLocalStorage() {
        const getLocalPackages = localStorage.getItem("appList");

        if (getLocalPackages !== null) {
            const itemsListDescerialized: AppItemTypes[] = JSON.parse(getLocalPackages);
            setPackagesAdded(itemsListDescerialized);
        }
    }

    // Adicionar ou remover um app
    function addOrRemoveApp(item: AppItemTypes) {

        var pkgs = [] as AppItemTypes[];

        // Verificar se o app já está adicionado...
        if (packagesAdded.filter((pkg) => pkg.WingetId === item.WingetId)[0]) {
            pkgs = packagesAdded.filter((pkg) => pkg.WingetId !== item.WingetId);
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