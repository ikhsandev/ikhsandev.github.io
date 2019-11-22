import database from './database.js'

const getAllTeam = () => {
    //Get All Bookmark Team From Database
    database.getTeam()
    .then(data => {
        let teamsHTML = ''
        data.forEach(team => {
            teamsHTML  +=
            `
            <div class="col s12">
            <div class="card">
            <div class="card-content row valign-wrapper">
            <div class="col s4" class="logo-team">
            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="80%" >
            </div>
            <div class="col s8 information-team">
            <span class="badge-blue"><strong>${team.name}</strong></span>
            <span class="badge-gray">${team.venue}</span>
            </div>
            </div>
            <div class="card-action center-align">
            <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">WEBSITE</a>
            <button onclick="deleteBookmarkTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">- HAPUS</button>
            </div>
            </div>
            </div>
            `
        })
                   if(data.length == 0) teamsHTML += '<h6 class="center-align white-text">Tidak ada data Team yang Difavoritkan!</6>'
             //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none'
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        image: '/images/icons-512.png',
        badge: '/images/badgeicon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}



const addBookmarkTeam = (id,logo,name,venue,website) => {
    let imSure = confirm(`Apakah yakin ingin menambahkan ${name} ke Favorit ?`)
    if(imSure){
    //Add To Database
    database.addTeam({id,logo,name,venue,website})
    //Display Toast
    M.toast({html: `Berhasil Favorit ${name}`, classes: 'rounded'});
    //Push Notification
    pushNotification(`Berhasil Favorit ${name}`)
    }
}
const deleteBookmarkTeam = (id,name) => {
    //Conform Delete Bookmark ?
    let imSure = confirm(`Apakah Yakin ingin menghapus ${name} dari Favorit ?`)
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getAllTeam()
        //Display Toast
        M.toast({html: `Berhasil Menghapus ${name}`, classes: 'rounded'})
        //Push Notification
        pushNotification(`Berhasil Menghapus ${name}`)
    }
    
}

export default {
    addBookmarkTeam,
    getAllTeam,
    deleteBookmarkTeam
}