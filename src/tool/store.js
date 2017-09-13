const key = 'sky_react_music_player_data_';

let storeUtil = {
    store : window.localStorage ,
    saveList(obj){        //存储列表
        this.store.setItem(key + "list" , JSON.stringify(obj));
    } ,
    getList(){        //获取列表
        return  JSON.parse(this.store.getItem(key + "list") || '[]');
    } ,
    saveIndex(index){        //存储索引
        this.store.setItem(key + "index" , index);
    } ,
    getIndex(){        //获取索引
        return  Number(this.store.getItem(key + "index") || 0);
    } 
}
module.exports = storeUtil;