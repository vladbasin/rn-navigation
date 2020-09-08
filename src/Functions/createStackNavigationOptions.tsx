import { NavigationStackOptions } from "react-navigation-stack";
import { NavigationOptionsType } from "../Types/NavigationOptionsType";

export const createStackNavigationOptions = (optionsFactory: (options: NavigationOptionsType) => NavigationStackOptions) => {
    return (options: NavigationOptionsType): NavigationStackOptions => optionsFactory(options);
};