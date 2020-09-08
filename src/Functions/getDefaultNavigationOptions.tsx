import { NavigationStackOptions } from 'react-navigation-stack';

type DefaultNavigationOptionsParamsType = {
    navigationOptions: NavigationStackOptions,
}

export const getDefaultNavigationOptions = (options: NavigationStackOptions) => (params: DefaultNavigationOptionsParamsType) => ({
    ...options,
    headerStyle: params.navigationOptions.headerTransparent ? null : options.headerStyle,
    headerBackTitle: undefined,
})