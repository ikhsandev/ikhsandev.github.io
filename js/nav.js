import loadPage from './page.js'

const init = () => {
    const sideNav = document.querySelector('.sidenav')
    M.Sidenav.init(sideNav)
}

const loadNav = () => {

    init()

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 || xhr.status != 200) return

        //masukan daftar tautan ke menu
    document.querySelectorAll('.topnav, .sidenav')
    .forEach(el => {
        el.innerHTML = xhr.responseText
    })

        //daftarkan event listener di setiap tautan menu
        document.querySelectorAll('.topnav a, .sidenav a')
        .forEach(el => {
            //tutup sidenav
            el.addEventListener('click',event => {
                //tutup sideNav
                const sideNav = document.querySelector('.sidenav')
                M.Sidenav.getInstance(sideNav).close()

                //Muat Konten halaman yang diapnggil
                const path = event.target.getAttribute('href').substr(1)
                loadPage(path)
            })
        })
    }
    xhr.open('GET','nav.html',true)
    xhr.send()
}

export default loadNav