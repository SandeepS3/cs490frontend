function fetching() {
    fetch('http://localhost:8383/api/hello')
        .then((response => response.text()))
        .then((message) => {
            console.log(message);
            document.getElementById("myptag").innerText = message
        })

    };
const mybutton = document.getElementsByTagName('button')[0]
mybutton.addEventListener('click', fetching)