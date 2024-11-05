import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchSVG from "@/assets/icons/search.svg";
import ArrowDownSVG from "@/assets/icons/arrow-down.svg";

import { Container } from "@/styles/layout";
import { AppItemTypes } from "@/app/api/route";
import { api } from "@/services/api";
import AppsSelectedBar from "@/components/AppsSelectedBar";
import { ApplicationContext } from "@/context/ApplicationContext";
import categories from "@/services/categories.json";

import { Wrapper } from "./styles";
import Apps from "./apps";
import { AppDetails } from "@/app/search/appDetails";

export default function SearchSectionOne() {
  const { appSelected, packages, setpackages, packagesAdded, loadAppsInLocalStorage, addOrRemoveApp, infoSidebarVisibility } = useContext(ApplicationContext);
  
  // Armazenando os pacotes em estado
  const [searchText, setSearchText] = useState("");
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("All");

  // Funcao de busca
  async function getPackages(limit: number) {
    var categories: string[] = categorySelected;

    const request = await api.get(`/?limit=${limit}${categories.length ? `&categories=${categories}` : ""}${searchText ? `&search=${searchText}` : ""}`);
    const pkgs = await request.data as AppItemTypes[];

    console.log("Packages" + pkgs);

    setpackages(pkgs);
  }

  const inputSearchRef = useRef<HTMLInputElement>(null);

  function handleSubmit(ev: any) {
    ev.preventDefault();
    const inputText = inputSearchRef?.current?.value || "";
    setSearchText(inputText);
  }
  
  const urlParams = useSearchParams();
  const categoryQuery = urlParams.get("category");
  const searchQuery = urlParams.get("search");

  useEffect(() => {
    if(categoryQuery && categoryQuery.length > 0) {
      const categoryTags = categories.filter(item => item.title === categoryQuery)[0];
      if(categoryTags) setCategorySelected(categoryTags.tags);
    } 
  }, [categoryQuery])

  useEffect(() => {
    if(searchQuery && searchQuery.length > 0) setSearchText(searchQuery);
  }, [searchQuery])

  function changeCategory(tags: string[], title: string) {
    setCategorySelected(tags);
    setCategoryTitle(title);
  }

  useEffect(() => {
    loadAppsInLocalStorage();
    
    getPackages(30);
  }, [categorySelected, searchText])
  
  return <>
    <Wrapper dropdown={dropdownToggle} isInfoSidebarVisible={!!infoSidebarVisibility} onClick={() => {if (dropdownToggle) setDropdownToggle(false)}}>
      <Container>
        <h2>Check if your favorite app is available</h2>
        <div className="searchOptions">
          <form className="searchBox" onSubmit={handleSubmit}>
            <input ref={inputSearchRef} placeholder="Search" />
            <button  className="searchButton"><SearchSVG /></button>
          </form>

          <div className="filters">
            <button className="categories" onClick={() => setDropdownToggle(!dropdownToggle)}><span>{categoryTitle}</span><ArrowDownSVG />
              {dropdownToggle ? <div className="dropdown">
                {categories.map(({ title, tags }, i) => <span key={i} onClick={() => {
                  if (title !== categoryTitle) changeCategory(tags, title)}}>{title}</span>)}
              </div> : <></>}
            </button>
          </div>
        </div>
      
        <div className="appList">
          <Apps />
          { appSelected ? <AppDetails app={appSelected} getPackages={getPackages} /> : <></> }
        </div>

        { packages !== null ?
        <button className="searchMore" onClick={() => {
          getPackages((packages?.length || 0) + 30);
        }}>Show more</button>
        : <></> }

        { packagesAdded?.length > 0 ? <AppsSelectedBar appList={packagesAdded} removeApp={addOrRemoveApp} /> : <></> }
      </Container>
    </Wrapper>
  </>
}