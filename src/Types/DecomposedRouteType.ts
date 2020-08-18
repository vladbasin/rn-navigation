import { NavigationNavigateAction, NavigationParams } from "react-navigation";

export type DecomposedRouteType = {
    routeName: string,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
}