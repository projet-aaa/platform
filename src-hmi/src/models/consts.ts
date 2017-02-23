// The colors for the diagrams
export const chartColors = [
    "#FF6384", // rose
    "#36A2EB", // sky blue
    "#00e64d", // green
    "#ff0000", // red
    "#000066", // sea blue
    // repeat (lazy)
    "#FF6384", // rose
    "#36A2EB", // sky blue
    "#00e64d", // green
    "#ff0000", // red
    "#000066", // sea blue
]

const domainWS = "localhost"
const portWS = "8088"

export const urlWS = domainWS + ":" + portWS

export const appName = "Jetpack"

export const apiRootURL = "http://localhost/app_dev.php/api"

export const loginURL = "http://localhost/app_dev.php/api/login_check"

declare var username_global
declare var password_global
declare var id_global

export const username = username_global
export const password = password_global
export const id = id_global