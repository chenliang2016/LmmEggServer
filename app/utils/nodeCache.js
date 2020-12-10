const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

function addConfig(key,value,expire){
    if (expire != undefined){
        return myCache.set( key, value, expire );
    }else{
        return myCache.set( key, value );
    }
}

function getConfig(key){
    const value = myCache.get(  key );
    return value;
}

function deleteConfig(key){
    return myCache.del( key );
}

module.exports = {
    addConfig,
    getConfig,
    deleteConfig
};