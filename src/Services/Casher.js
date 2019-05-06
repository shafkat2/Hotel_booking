import camelCase from 'camel-case';

let instance  = null;

export class Casher {

    cache = {};
    constructor(){
        if(!instance){
        instance = this;
    }
    return instance;
}

    cacheValue(key,value){
        this.cache[camelCase(key)] = value;
    }

    getCachedValue(key){
        return this.cache[key];
    }
    isValueCached(key){
        return this.getCachedValue[key]
    }
}