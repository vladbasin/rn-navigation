import { NavigationRouteType } from '../Types/NavigationRouteType';

export interface NavigatorContract {
    currentPath: string;
    
    goBack(defaultRoute: NavigationRouteType | string): void;
    reset(route: NavigationRouteType | string): void;
    navigate(route: NavigationRouteType | string): void;
}