import { useContext, useEffect, useState } from "react";
import TagSvg from "@/assets/icons/tag.svg";
import TimesSvg from "@/assets/icons/times.svg";

import { AppItemTypes } from "../api/route";
import { Wrapper } from "./styles/appDetails";
import { api } from "@/services/api";
import { ApplicationContext } from "@/context/ApplicationContext";

interface IAppDetails {
  app: AppItemTypes,
  getPackages: any
}

export function AppDetails({ app, getPackages }: IAppDetails) {

  const { packages, packagesAdded, appSelected, setAppSelected} = useContext(ApplicationContext)

  const [appThumbnail, setAppThumbnail] = useState<string | null>(null);

  async function getThumbnail() {
    const request = await api.post('/thumbnail', { site: app.Site });
    const { image } = request.data;
    setAppThumbnail(image);
  }

  useEffect(() => {
    setAppThumbnail(null);
    if(app) getThumbnail();
  }, [app])

  return <Wrapper isAppBarActive={packagesAdded.length !== 0}>  
    <div className="content">
      { appThumbnail ? <div className="ogImage" style={{ backgroundImage: `url(${appThumbnail})` }} /> : <></>}
      <div className="title">
        <img src={`/icons/${app.Id}.png`} />
        <div className="rightContent">
          <span>{app.LatestVersion}</span>
          <span>{app.Id}</span>
        </div>
      </div>
      <p className="description">{app.Description}</p>
      
      {app.Tags.length > 0 ?
        <> 
          <div className="tagsSvg">
            <TagSvg />
            <span>Tags</span>
          </div>
          <div className="tags">
            {app.Tags.map((tag, i) => (
              <p key={i}>{tag}</p>
              ))}
          </div>
        </> : <></>}

      <TimesSvg className="close" onClick={() => {
        packages?.map((item) => {
          if (appSelected?.Id === item.Id) setAppSelected(null);
        }) 
      }} />
    </div>
  </Wrapper>
}