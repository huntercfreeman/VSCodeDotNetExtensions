/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFocusTrap {
    public static NAMESPACE_ID_CONTEXT_MENU = "context-menu";
    public static NAMESPACE_ID_TREE_VIEW_BASE_ACTIVE = "tree-view-base-active";

    public static getFocusTrapId(idNamespace: string,
        category: number,
        index: number) {

        return `dni_focus-trap_${idNamespace}-${index}`;
    }
}