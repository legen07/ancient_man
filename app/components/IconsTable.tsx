"use client";

import { useState, useEffect } from "react";
/////////////
////  ICONS MANIPULATIONS

interface Props {
  className?: string,
  "data-icon": string;
}

export default function Svg({ className, "data-icon": icon }: Props) {

  const [allIconsObject, setAllIcons] = useState<any>({})

  useEffect(() => {

    const fromTabler = async () => {

      let icons = localStorage.getItem('icons');

      if (!icons) {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/@tabler/icons@3.11.0/tabler-nodes-outline.json",
          { priority: "high" } as RequestInit
        );

        const outJson = await res.json();

        localStorage.setItem("icons", JSON.stringify(outJson));
        icons = JSON.stringify(outJson);
      }

      setAllIcons(
        JSON.parse(icons))

    }
    fromTabler();

  }, []);

  if (!allIconsObject[icon]) {
    return null;
  }

  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-icon={icon}>
      {allIconsObject[icon].map((each: any, i: []) => {
        return <path key={icon + "-" + i} d={each[1]["d"]}></path>;
      })}
    </svg>
  );
}