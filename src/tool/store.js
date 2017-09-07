const key = 'sky_react_music_player_data';

let storeUtil = {
    localStore : window.localStorage ,
    saveObj(obj){        //存储对象
        this.localStore.setItem(key , JSON.stringify(obj));
    } ,
    getObj(){        //获取对象
        return  JSON.parse(this.localStore.getItem(key) || '[]');
    }
}

module.exports = storeUtil;