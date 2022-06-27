/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFocusTrap {
    public static getFocusTrapId(idNamespace: string,
        category: number,
        index: number) {

        return `dni_focus-trap_${idNamespace}-${index}`;
    }
}