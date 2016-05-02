export default class CPM {
    
    constructor(name) {
        this.Name = name;
    }
    
    die(arg = "Fatal error") {
        console.warn(`cpm: ${this.Name}: ${arg}`);
        process.exit(1);
    }
    
}