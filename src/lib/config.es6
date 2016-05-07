const fs = require('fs');

export default function(ARGS, CPM, RAW_ARGS) {

    const ROUTINES = ['get'];

    if (ARGS === true) {
        
    }
    else if (ROUTINES.indexOf(RAW_ARGS[2]) > -1) {

    }
    else {
        if (/(.+):(.+)=(.+)/.test(ARGS.argv.remain[0]))
            CPM.die(`No, or an invalid 'SEC:key=val' trio was provided`);

        const [
            SEC, KEY, VAL
        ] = ARGS.argv.remain[0].split(/:|=/);
        
    }
}