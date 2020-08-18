import { NavigationActions, NavigationParams, StackActions } from 'react-navigation';
import { DecomposedRouteType } from '../Types/DecomposedRouteType';
import { NavigationContainerComponentType } from '../Types/NavigationContainerComponentType';
import { NavigatorContract } from '../Contacts/NavigatorContract';
import { NavigationRouteType } from '../Types/NavigationRouteType';

export class Navigator implements NavigatorContract {
    private readonly _routeSeparator = "/";
    
    private _component: NavigationContainerComponentType | null = null;

    public get currentPath() { return this.getCurrentPath(); }

    public initialize(component: NavigationContainerComponentType | null) {
        this._component = component;
    }

    public goBack(defaultRoute: NavigationRouteType | string) {
        if (!this._component) {
            return;
        }

        if (!this._component.dispatch(NavigationActions.back())) {
            this.navigate(defaultRoute);
        }
    }

    public reset(route: NavigationRouteType | string) {
        if (!this._component) {
            return;
        }

        this._component.dispatch(StackActions.popToTop());
        this._component.dispatch(StackActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate(this.createNavigationPayload(route))]
        }));
    }

    public navigate(route: NavigationRouteType | string) {
        if (!this._component) {
            return;
        }

        const payload = this.createNavigationPayload(route);

        this._component.dispatch(NavigationActions.navigate(payload));
    }

    private getCurrentPath(): string {
        if (!this._component || !this._component.state.nav) {
            return "";
        }

        return this._component.state.nav.routes[0].path || "";
    }

    private createNavigationPayload(route: NavigationRouteType | string): DecomposedRouteType {
        let targetRoute: NavigationRouteType = { name: "" };

        if (typeof route === "string") {
            targetRoute.name = this.wrapRouteNameWithRoot(route);
        } else {
            targetRoute = {
                name: this.wrapRouteNameWithRoot(route.name),
                params: route.params,
            };
        }

        return this.decomposeRoute(targetRoute);
    }

    private wrapRouteNameWithRoot(name: string): string {
        return `root${this._routeSeparator}${name}`;
    }

    private decomposeRoute(route: NavigationRouteType | string): DecomposedRouteType {
        let name = "";
        let params: NavigationParams = { }; 

        if (typeof route === "string") {
            name = route;
        } else {
            name = route.name;
            params = route.params || {};
        }

        if (name.indexOf(this._routeSeparator) < 0) {
            return {
                routeName: name,
                params: params
            }
        }

        const component = name.split("/", 1)[0];

        if (name.length == component.length) {
            return { 
                routeName: component,
                params: params
            }
        } else {
            const nextName = name.substr(component.length + 1);
            const action = typeof route === "string"
                ? this.decomposeRoute(nextName)
                : this.decomposeRoute({ name: nextName, params: route.params });

            return {
                routeName: component,
                action: NavigationActions.navigate(action)
            }
        }
    }
}