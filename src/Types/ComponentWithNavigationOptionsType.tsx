import React from "react";
import { NavigationStackOptions } from 'react-navigation-stack';
import { NavigationOptionsType } from "./NavigationOptionsType";

export type ComponentWithNavigationOptionsType<T> = React.ComponentType<T> & {
    navigationOptions?: NavigationStackOptions | ((options: NavigationOptionsType) => NavigationStackOptions);
};
