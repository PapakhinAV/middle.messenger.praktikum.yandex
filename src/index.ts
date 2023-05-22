import {Authorization, HomePage, Page404, Page500, PersonalInfo, PersonalInfoEdit, Registration} from "./pages";
import {ERoutes} from "./ERoutes";



window.addEventListener("DOMContentLoaded", ()=>{
    const homePage = new HomePage();
    const page404 = new Page404();
    const page500 = new Page500();
    const authorization = new Authorization()
    const registration = new Registration()
    const profile = new PersonalInfo()
    const profileEdit = new PersonalInfoEdit()

    let Page = homePage

    switch ( window.location.pathname){
        case ERoutes.PAGE_404:
            Page = page404
            break
        case ERoutes.PAGE_500:
            Page = page500
            break
        case ERoutes.LOGIN:
            Page = authorization
            break
        case ERoutes.REGISTRATION:
            Page = registration
            break
        case ERoutes.PROFILE:
            Page = profile
            break
        case ERoutes.PROFILE_EDIT:
            Page = profileEdit
            break
        default:
            break
    }

    const root = document.querySelector("#root")

    root?.append(Page.getContent()!)
})
