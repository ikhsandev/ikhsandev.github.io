let dbPromise = idb.open('ikhsan', 1, upgradeDB => {
    if(!upgradeDB.objectStoreNames.contains('teams')){
        upgradeDB.createObjectStore('teams')
    }
})

const addTeam = ({id,logo,name,venue,website}) => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        let item = {
            id: id,
            logo: logo,
            name: name,
            venue: venue,
            website: website,
            created: new Date().getTime()
        };
        store.put(item, id); //menambahkan key "teams"
        return tx.complete;
    })
    .then(() => console.log('Berhasil Menyimpan Tim',name))
    .catch(() => console.log('Gagal Menyimpan Tim'))
}

const deleteTeam = id => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite')
        let store = tx.objectStore('teams')
        store.delete(id)
        return tx.complete
    })
    .then(() => console.log('Item Deleted'))
}

const getTeam = () => {
    return dbPromise
    .then(db => {
        let tx = db.transaction('teams','readonly')
        let store = tx.objectStore('teams')

        return store.getAll()
    })
    .then(data => data)
}

export default {
    addTeam,
    deleteTeam,
    getTeam
}