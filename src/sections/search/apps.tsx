import {useContext, useEffect} from "react";
import AlertSVG from "@/assets/icons/alert.svg";

import {Wrapper} from "./styles/apps";
import {grabFirstLetters} from "@/helpers/format";
import {AppItemTypes} from "@/app/api/packages/route";
import {ApplicationContext} from "@/context/ApplicationContext";

export default function Apps() {
    const {packages, addOrRemoveApp, packagesAdded, appSelected, setAppSelected} = useContext(ApplicationContext)

    useEffect(() => {
        console.log("appSelected:" + (packagesAdded.length !== 0))
        console.log(packagesAdded.length)
    }, [packagesAdded])

    return <Wrapper>
        <div className="searchResult">
            {packages === null ? <div className="loading" style={{margin: "auto"}}/>
                : packages.map((item: AppItemTypes, i: number) => {

                    const alreadySelected = appSelected?.WingetId === item.WingetId;

                    const iconImg = !!item?.Site ?
                        <img src={`/icons/${item.WingetId}.png`} alt=""/>
                        : <span>{grabFirstLetters(item.Name)}</span>;

                    return <div key={i}
                                className={`item${(packagesAdded.filter((pkg) => pkg.WingetId === item.WingetId).length > 0) ? " selected" : ""}`}>
                        <div className="clickArea" onClick={() => addOrRemoveApp(item)}></div>
                        <div className="icon">
                            {iconImg}
                        </div>
                        <h3>{item.Name}</h3>
                        <AlertSVG className={`infoSvg${alreadySelected ? " active" : ""}`}
                                  onClick={() => setAppSelected(alreadySelected ? null : item)}/>
                    </div>
                })}
        </div>
    </Wrapper>
}