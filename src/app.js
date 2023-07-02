import { load } from "parcel-bundler/lib/utils/config";

export class App {
    static async loadData() {
        const response = await fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff");
        const jsonData = await response.json();
        console.log(jsonData);
    }
    
    static run() {
        this.loadData();
    }
}
