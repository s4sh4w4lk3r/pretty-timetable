"use client";

import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import { generalLinks } from "./links";
import React from "react";

export default function NavLinks() {
    const currentPath = usePathname();
    // TODO: добавить стиль, показывающий, что ссылка активна
    const linksElement = generalLinks.map(l => (
        <Link
            key={l.path}
            href={l.path}
        >
            {l.label}
        </Link>
    ));
    return linksElement;
}
