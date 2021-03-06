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

export const debug = true
// can't be set to false: if you want to set it to false (remove dev routes notably)
// remove the routes in the dev section
export const devtools = true 
export const log = true

const domainWS = debug ? "localhost" : "jetpack0.trendio.fr"
const portWS = "8080"

export const urlWS = domainWS + ":" + portWS

export const appName = "Jetpack"

export const apiRootURL = debug ? "http://localhost/app_dev.php/api" :
                                  "https://jetpack0.trendio.fr/api"

export const loginURL = debug ? "http://localhost/api/login_check" :
                                "https://jetpack0.trendio.fr/api/login_check"

declare var username_global
declare var password_global
declare var id_global

export const username = username_global
export const password = password_global
export const id = id_global