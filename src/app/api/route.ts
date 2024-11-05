import { NextResponse } from "next/server";
import packages from "@/services/winget/packages.json";
import nameListMostSearched from "@/services/winget/nameslist-most-searched.json";
import { AllowedCharacter } from "@/services/winget/helpers";

export type AppItemTypes = {
  Id: string,
  Name: string,
  Publisher: string,
  Tags: string[],
  Description: string,
  Site: string,
  VersionsLength: number,
  LatestVersion: string,
  Score: number
}

export async function GET(request: Request) {
  // Params constructors
  const { searchParams } = new URL(request.url);
  
  // Query params
  var pkgs = packages as AppItemTypes[];
  const limit = Number(searchParams.get("limit")) || 30;
  const categories = searchParams.get("categories");
  const search = searchParams.get("search") || "";
  
  // Busca os mais de +4000 pacotes
  
  // Separar por categoria, se solicitado
  if(categories) {
    const filterByCategory = (item: AppItemTypes): Boolean => {
      const categorias: string[] = categories ? categories.split(",") : [];
      return item.Tags.filter(tag => categorias.includes(tag)).length > 0;
    }

    pkgs = pkgs.filter(filterByCategory);
  }

  // Se tiver algum parametro de pesquisa, reescreve o array de pacotes
  if(search) pkgs = pkgs.filter(pkg => pkg.Name.toLowerCase().includes(search.toLowerCase()));
  
  // Organiza pela ordem selecionada
  pkgs = pkgs.sort((a, b) => Number(b.Score) - Number(a.Score)).slice(0, Number(limit));
  
  return NextResponse.json(pkgs);
}

export async function PUT() {

  // Requisição
  const apiUrl = "https://api.winget.run/v2/packages";
  const params = "?ensureContains=true&partialMatch=true&take=4315";
  
  const wingetRunRequest = await fetch(`${apiUrl}${params}`);
  var allPackagesWingetRun = (await wingetRunRequest.json()).Packages;

  // Filtros
  var names: string[] = [];
  
  const packages = (await Promise.all(allPackagesWingetRun?.map(async (pkg: any) => {
    // Verificar duplicados
    if(names?.filter(fi => fi === pkg.Latest.Name)[0]) return;
    names.push(pkg.Latest.Name);

    // Reputação
    var score = 1;
    var versions = pkg.Versions.length || 1;
    
    await Promise.resolve(nameListMostSearched?.forEach((name, i) => {
      if(pkg.Latest.Name?.toLowerCase() === name?.toLowerCase()) score = 1000-i;
    }));

    
    // Caracteres estrangeiros
    if(AllowedCharacter(pkg.Latest.Name) === null) return null;
      
    // Construção
    return {
      Id: pkg.Id,
      Name: pkg.Latest.Name,
      Publisher: pkg.Latest.Publisher,
      Tags: pkg.Latest.Tags,
      Description: pkg.Latest.Description,
      Site: pkg.Latest.Homepage,
      VersionsLength: versions,
      LatestVersion: pkg.Versions[0],
      Score: score
    }
  })))?.filter((item: AppItemTypes | null) => !!item) as AppItemTypes[];
  
  console.log("Updated Packages:" + packages.length);

  return NextResponse.json(packages);
}