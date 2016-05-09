export default function(ARGS, CPM) {
    
    const HOMEDIR = process.env.HOME || process.env.USERPROFILE;
    
    console.log(`usage: cpm: <command> [<args>]

where <command> is any of:
    help, init, config,
    install


specify configuration in the ini file:
    ${HOMEDIR}/.cpmrc
`);
}