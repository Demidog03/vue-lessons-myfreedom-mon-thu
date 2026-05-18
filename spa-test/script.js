alert('Привет')

const appDiv = document.getElementById('app')
const linkToPage2 = document.getElementById('linkToPage2')

linkToPage2.addEventListener('click', () => {
    appDiv.innerHTML = '' // <div id="app"></div>

    const newH1 = document.createElement('h1')
    newH1.innerText = 'Page 2'
    document.querySelector('title').innerText = 'Page 2'

    appDiv.appendChild(newH1) // <div id="app"> <h1>Page 2</h1> </div>
})