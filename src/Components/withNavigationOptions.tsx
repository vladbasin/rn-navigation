import React from "react";
import { NavigationStackOptions } from "react-navigation-stack";
import { createStackNavigationOptions } from "../Functions/createStackNavigationOptions";
import { ComponentWithNavigationOptionsType } from "../Types/ComponentWithNavigationOptionsType";
import { NavigationOptionsType } from "../Types/NavigationOptionsType";

export const withNavigationOptions = function<T>(Component: ComponentWithNavigationOptionsType<T>, optionsFactory: (options: NavigationOptionsType) => NavigationStackOptions) {
    const InnerComponent = (props: T) => {
        return (<Component {...props} />);
    }

    InnerComponent.navigationOptions = createStackNavigationOptions(options => {
        let existingOptions = {};
            
        const componentNavigationOptions = Component.navigationOptions;

        if (componentNavigationOptions) {
            existingOptions = typeof componentNavigationOptions === "function"
                ? componentNavigationOptions(options)
                : componentNavigationOptions;
        }

        const newOptions = optionsFactory(options);

        return {
            ...newOptions,
            ...existingOptions,
        }
    });

    return InnerComponent;
}