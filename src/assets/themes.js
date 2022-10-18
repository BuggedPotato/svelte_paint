import { writable } from "svelte/store"

export const themes = {
    dark: {
        bgMain: "bg-[#111827]",
        bgMainHexadec: "#111827",
        textMain: "text-gray-200",
        borderMain: "border-[#21283b]"
    },
    light: {
        bgMain: "bg-gray-200",
        bgMainHexadec: "#e5e7eb",
        textMain: "text-gray-900",
        borderMain: "border-gray-900 "
    },
    contrast: {
        bgMain: "bg-black",
        bgMainHexadec: "#000000",
        textMain: "text-[yellow]",
        borderMain: "border-white"
    }
}

let localStorageTheme = localStorage.getItem( "theme" );
if( !localStorageTheme ){
    localStorage.setItem( "theme", "dark" );
    localStorageTheme = localStorage.getItem( "theme" );
}
export const savedTheme = writable( localStorageTheme );
export const setTheme = ( name ) => {
    if( themes[name] )
        savedTheme.set( name );
}
savedTheme.subscribe( v => {
    localStorage.setItem( "theme", v )
}  )