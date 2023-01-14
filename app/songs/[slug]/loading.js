import React from "react";
import AppSkeleton from "./AppSkeleton";
import ChordsSkeleton from "./ChordsSkeleton";

export default function Loading() {
    return (
        <>
            <ChordsSkeleton />
            <AppSkeleton />
        </>
    )
}