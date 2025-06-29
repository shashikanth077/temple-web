// app constants
import { SideBarTypes, LayoutWidth } from 'constants/layout';

interface ConfigTypes {
  leftSideBarType:
    | SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
    | SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
    | SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT;
}

/**
 * Retrieves the layout configurations based on the provided layout width.
 * @param layoutWidth - The layout width to determine the configurations for.
 * @returns The layout configurations.
 */
const getLayoutConfigs = (layoutWidth: string | boolean | null) => {
    // add property to change in particular layoutWidth
    const config: ConfigTypes = {
        leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
    };

    switch (layoutWidth) {
    case LayoutWidth.LAYOUT_WIDTH_FLUID:
        config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT;
        break;
    case LayoutWidth.LAYOUT_WIDTH_BOXED:
        config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
        break;
    default:
        return config;
    }
    return config;
};

/**
 * Changes the specified HTML attribute of the <body> element.
 *
 * @param attribute - The name of the attribute to change.
 * @param value - The new value for the attribute.
 */
const changeBodyAttribute = (attribute: string, value: string): void => {
    if (document.body) document.body.setAttribute(attribute, value);
};

/**
 * Changes the specified HTML attribute of the <html> element.
 *
 * @param attribute - The name of the attribute to change.
 * @param value - The new value for the attribute.
 */
const changeHTMLAttribute = (attribute: string, value: string): void => {
    if (document.body) document.getElementsByTagName('html')[0].setAttribute(attribute, value);
};

export { getLayoutConfigs, changeBodyAttribute, changeHTMLAttribute };
