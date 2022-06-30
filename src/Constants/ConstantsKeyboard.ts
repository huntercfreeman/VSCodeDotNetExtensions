/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsKeyboard {
    public static readonly KEY_ENTER: string = "Enter";
    public static readonly KEY_SPACE: string = " ";
    public static readonly KEY_ESCAPE: string = "Escape";

    public static readonly KEY_ARROW_LEFT: string = "ArrowLeft";
    public static readonly KEY_ARROW_DOWN: string = "ArrowDown";
    public static readonly KEY_ARROW_UP: string = "ArrowUp";
    public static readonly KEY_ARROW_RIGHT: string = "ArrowRight";
    
    public static readonly KEY_ARROW_LEFT_ALTERNATIVE: string = "h";
    public static readonly KEY_ARROW_DOWN_ALTERNATIVE: string = "j";
    public static readonly KEY_ARROW_UP_ALTERNATIVE: string = "k";
    public static readonly KEY_ARROW_RIGHT_ALTERNATIVE: string = "l";

    public static readonly ALL_ARROW_LEFT_KEYS: string[] = [
        this.KEY_ARROW_LEFT,
        this.KEY_ARROW_LEFT_ALTERNATIVE
    ];
    
    public static readonly ALL_ARROW_DOWN_KEYS: string[] = [
        this.KEY_ARROW_DOWN,
        this.KEY_ARROW_DOWN_ALTERNATIVE
    ];
    
    public static readonly ALL_ARROW_UP_KEYS: string[] = [
        this.KEY_ARROW_UP,
        this.KEY_ARROW_UP_ALTERNATIVE
    ];
    
    public static readonly ALL_ARROW_RIGHT_KEYS: string[] = [
        this.KEY_ARROW_RIGHT,
        this.KEY_ARROW_RIGHT_ALTERNATIVE
    ];

    public static readonly ALL_SHOULD_PREVENT_DEFAULT_KEYS: string[] = [
        this.KEY_ARROW_LEFT,
        this.KEY_ARROW_LEFT_ALTERNATIVE,
        this.KEY_ARROW_DOWN,
        this.KEY_ARROW_DOWN_ALTERNATIVE,
        this.KEY_ARROW_UP,
        this.KEY_ARROW_UP_ALTERNATIVE,
        this.KEY_ARROW_RIGHT,
        this.KEY_ARROW_RIGHT_ALTERNATIVE,
        this.KEY_ENTER,
        this.KEY_SPACE
    ];
}