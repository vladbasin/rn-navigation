import { NavigationContainerComponent, NavigationState } from 'react-navigation';

export type NavigationContainerComponentType = NavigationContainerComponent & {
    state: {
        nav: NavigationState | null;
    };
};
