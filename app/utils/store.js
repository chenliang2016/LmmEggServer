const Datastore = require('nedb')

const dbpath = __dirname.replace('app/utils',"database") + "/db";
// const db = new Datastore({ filename:"/app/database/db", autoload: true });
function addConfig(key,value,ctx){
    return new Promise(function(resolve,reject) {
        const db = new Datastore({ filename:dbpath, autoload: true });
        var doc = { key: key
            , value: value
        };
        db.findOne({ key: key }, function (err, docs) {
            if (err){
                console.log(err)
                reject(err)
            }
            console.log("####################",docs);
            if (docs == null){
               
            }else{
                db.remove({ key: key }, {}, function (err, numRemoved) {
                    // numRemoved = 1
                });
                console.log("####################走更新");
                // db.update(docs, doc, {}, function (err, numReplaced) {
                //     // numReplaced = 1
                //     if (numReplaced > 1){
                //         resolve(1)
                //     }
                // });
                // return;
            }

            console.log("####################走插入");
            db.insert(doc, function (err, newDoc) {   // Callback is optional
                if (err){
                    reject(err)
                }
                resolve(1)
            });
        });
    })
}

function getConfig(key){
    return new Promise(function(resolve,reject) {
        const db = new Datastore({ filename:dbpath, autoload: true });
        db.findOne({ key: key }, function (err, docs) {
            if (err){
                console.log(err)
                reject(err)
            }
            if (docs == null){ 
                resolve(undefined);
                return;
            }
            resolve(docs.value)
        });
    })

    // const value = myCache.get(  key );
    // return value;
}

function deleteConfig(key){
    return new Promise(function(resolve,reject) {
        const db = new Datastore({ filename:dbpath, autoload: true });
        db.remove({ key: key }, { multi: true }, function (err, numRemoved) {
            // numRemoved = 3
            // All planets from the solar system were removed
            if (err){
                console.log(err)
                reject(err)
            }
            if (numRemoved > 0){
                resolve(numRemoved)
            }
        });
    })
}

module.exports = {
    addConfig,
    getConfig,
    deleteConfig
};