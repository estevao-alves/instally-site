import {useContext, useEffect, useState} from "react";
import AlertSVG from "@/assets/icons/alert.svg";

import {Wrapper} from "./styles/apps";
import {grabFirstLetters} from "@/helpers/format";
import {ApplicationContext, getPackageId} from "@/context/ApplicationContext";
import { Package } from "@/services/packages/types";

export function PackageIcon({ item }: { item: Package }) {

    const [step, setStep] = useState(0);

    const icons = [
        `/icons/${item.PackageIds.Winget}.png`,
        item.Icon,
        item.Site
            ? `https://www.google.com/s2/favicons?domain=${item.Site}&sz=256`
            : null
    ].filter(Boolean);

    if (step >= icons.length) {
        return (
            <span>
                {grabFirstLetters(item.Name)}
            </span>
        );
    }

    return (
        <img
            src={icons[step]!}
            alt={item.Name}
            onError={() => setStep(step + 1)}
        />
    );
}

export default function Apps() {
    const {packages, addOrRemoveApp, packagesAdded, appSelected, setAppSelected} = useContext(ApplicationContext)

    useEffect(() => {
        console.log("appSelected:" + (packagesAdded.length !== 0))
        console.log(packagesAdded.length)
    }, [packagesAdded])

    return <Wrapper>
        <div className="searchResult">
            {packages === null ? <div className="loading" style={{margin: "auto"}}/>
                : packages.map((item: Package, i: number) => {

                     const isSelected = packagesAdded.some(pkg => getPackageId(pkg) === getPackageId(item));

                     const isInfoOpen = appSelected && getPackageId(appSelected) === getPackageId(item);

                        return <div key={i} className={`item${isSelected ? " selected" : ""}`}>
                            <div className="clickArea" onClick={() => addOrRemoveApp(item)}></div>
                            <div className="icon">
                                <PackageIcon item={item} />
                            </div>
                            <h3>{item.Name}</h3>
                        <AlertSVG className={`infoSvg${isInfoOpen ? " active" : ""}`}
                                  onClick={() => setAppSelected(isInfoOpen ? null : item)}/>
                    </div>
                })}
        </div>
    </Wrapper>
}