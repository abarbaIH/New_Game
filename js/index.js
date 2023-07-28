
window.onload = () => {
    document.getElementById('button-start').onclick = () => {
        document.getElementById("div-sup") && deleteDiv()
        const eliminCanvas = document.getElementById("canvasID")
        eliminCanvas.classList.remove("canvas")
        startGame();
    };

    function deleteDiv() {
        let divSup = document.getElementById("div-sup")
        let father = divSup.parentNode
        father.removeChild(divSup)
    }

    function startGame() {
        game.init()
    }
};