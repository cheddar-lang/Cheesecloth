export default class CPM {
    
    constructor(name, fatal) {
        this.Name = name;
        this.fatal = fatal;
    }
    
    die(arg = "Fatal error") {
        console.warn(`cpm: ${this.Name}: ${arg}`);
        if (this.fatal) process.exit(1);
    }
    
}