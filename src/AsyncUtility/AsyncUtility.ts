export class AsyncUtility {
    public static async delayCallback(callback:() => any, delayInMiliseconds: number) {
        await new Promise(r => setTimeout(r, delayInMiliseconds));
    
        callback();
    }
}