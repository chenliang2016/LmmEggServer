const compressing = require('compressing');
function toZip(entryDir,outPut){
    compressing.tar.compressDir(entryDir, outPut)
    .then(() => {
        console.log('success');
    })
    .catch(err => {
        console.error(err);
    });
}

module.exports = {
    toZip
}