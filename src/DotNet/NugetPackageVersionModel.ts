export class NugetPackageVersionModel {
    /**
     * @param version 
     * @param downloads 
     * @param atId When reading response Nuget returns this as a member named "@id"
     */
    constructor(public version: string,
        public downloads: number,
        public atId: string) {
    }
}