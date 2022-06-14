import { NugetPackageVersionModel } from "./NugetPackageVersionModel";

export class NugetPackageModel {
    /**
     * @param atId When reading response Nuget returns this as a member named "@id"
     */
    constructor(public atId: string,
        public type: string,
        public registration: string,
        public id: string,
        public version: string,
        public description: string,
        public summary: string,
        public title: string,
        public iconUrl: string,
        public licenseUrl: string,
        public projectUrl: string,
        public tags: string[],
        public authors: string[],
        public owners: string[],
        public totalDownloads: number,
        public verified: boolean,
        public packageTypes: string[],
        public versions: NugetPackageVersionModel[]) {
    }
}