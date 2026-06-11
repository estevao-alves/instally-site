import { useContext, useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchSVG from "@/assets/icons/search.svg";

import { Container } from "@/styles/layout";
import { Package } from "@/services/packages/types";
import { api } from "@/services/api";
import AppsSelectedBar from "@/components/AppsSelectedBar";
import { ApplicationContext } from "@/context/ApplicationContext";
import categories from "@/services/categories.json";

import { Wrapper } from "./styles";
import Apps from "./apps";
import { AppDetails } from "@/app/search/appDetails";
import FilterDropdown from "@/components/FilterDropdown";

// Package manager types supported by the filter dropdown.
type PackageManager = "all" | "winget" | "flatpak";

function SearchSectionContent() {
    const {
        appSelected,
        packages,
        setpackages,
        packagesAdded,
        loadAppsInLocalStorage,
        addOrRemoveApp,
        infoSidebarVisibility
    } = useContext(ApplicationContext);

    // Current search term submitted by the user.
    const [searchText, setSearchText] = useState("");

    // Stores the tags used by the API category filter.
    const [categorySelected, setCategorySelected] = useState<string[]>([]);

    // Text shown in the category dropdown.
    const [categoryTitle, setCategoryTitle] = useState("All");

    // Current package source filter.
    const [sourceFilter, setSourceFilter] = useState<PackageManager>("all");

    // Text shown in the source dropdown.
    const [sourceTitle, setSourceTitle] = useState("All");

    // Converts categories.json into the format expected by FilterDropdown.
    const categoryOptions = categories.map(category => ({
        title: category.title,
        value: category.tags
    }));

    // Available package source filters.
    const sourceOptions = [
        {
            title: "All",
            value: "all" as PackageManager
        },
        {
            title: "Winget",
            value: "winget" as PackageManager
        },
        {
            title: "Flatpak",
            value: "flatpak" as PackageManager
        }
    ];

    // Requests packages from the API using all active filters.
    async function getPackages(limit: number) {
        const params = new URLSearchParams();

        params.set("limit", String(limit));

        if (categorySelected.length) params.set("categories", categorySelected.join(","));
        if (searchText) params.set("search", searchText);
        if (sourceFilter !== "all") params.set("source", sourceFilter);

        const request = await api.get(`/?${params}`);

        const pkgs = request.data as Package[];

        setpackages(pkgs);
    }

    // Reference used to read the search input value when submitting.
    const inputSearchRef = useRef<HTMLInputElement>(null);

    function handleSubmit(ev: React.FormEvent) {
        ev.preventDefault();

        const inputText = inputSearchRef.current?.value || "";

        // Updating searchText triggers a new API request.
        setSearchText(inputText);
    }

    const urlParams = useSearchParams();

    const categoryQuery = urlParams.get("category");
    const searchQuery = urlParams.get("search");

    useEffect(() => {
        if (!categoryQuery) return;

        const categoryFound = categories.find(
            item => item.title === categoryQuery
        );

        if (!categoryFound) return;

        // Preselect category when arriving from URLs such as:
        // /search?category=Browsers
        setCategorySelected(categoryFound.tags);
        setCategoryTitle(categoryFound.title);
    }, [categoryQuery]);

    useEffect(() => {
        // Pre-fill search term from URL.
        if (searchQuery) {
            setSearchText(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        // Restore saved apps and refresh results whenever
        // any search filter changes.
        loadAppsInLocalStorage();
        getPackages(30);
    }, [
        categorySelected,
        searchText,
        sourceFilter
    ]);

    return (
        <Wrapper
            isInfoSidebarVisible={!!infoSidebarVisibility}
        >
            <Container>
                <h2>Check if your favorite app is available</h2>
                <h3>Winget or Flatpak</h3>

                <div className="searchOptions">
                    <form
                        className="searchBox"
                        onSubmit={handleSubmit}
                    >
                        <input
                            ref={inputSearchRef}
                            placeholder="Search"
                        />

                        <button className="searchButton">
                            <SearchSVG />
                        </button>
                    </form>

                    <div className="filters">
                        <FilterDropdown
                            label="Category"
                            selectedTitle={categoryTitle}
                            options={categoryOptions}
                            onSelect={(option) => {
                                setCategorySelected(option.value);
                                setCategoryTitle(option.title);
                            }}
                            />

                        <FilterDropdown
                            label="Source"
                            selectedTitle={sourceTitle}
                            options={sourceOptions}
                            onSelect={(option) => {
                                setSourceFilter(option.value);
                                setSourceTitle(option.title);
                            }}
                        />
                    </div>
                </div>

                <div className="appList">
                    <Apps />

                    {appSelected && (
                        <AppDetails
                            app={appSelected}
                        />
                    )}
                </div>

                {packages !== null && (
                    <button
                        className="searchMore"
                        onClick={() => {
                            getPackages(
                                (packages?.length || 0) + 30
                            );
                        }}
                    >
                        Show more
                    </button>
                )}

                {packagesAdded?.length > 0 && (
                    <AppsSelectedBar
                        appList={packagesAdded}
                        removeApp={addOrRemoveApp}
                    />
                )}
            </Container>
        </Wrapper>
    );
}

export default function SearchSectionOne() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchSectionContent />
        </Suspense>
    );
}