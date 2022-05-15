function play () {
    const DINO = document.querySelector('.dino');
    const background = document.querySelector('.background');
    let isJumping = false;
    let position = 0; // posição inicial do dinossauro no eixo y
    DINO.style.left = 80 + 'px'; // posição do dinossauro no eixo x
     
    
    function handleReplay(event) { // Faz com que em GAME OVER o jogo recarregue ao pressionar espaço novamente
        if (event.keyCode === 32) {
            location.reload();
        }
    }

    function handleKeyUp(event) { 
        if (event.keyCode === 32) {
            if (!isJumping) {
                jump();
            }
        }
    }

    function jump(){
        isJumping = true;

        var upInterval = setInterval(() => {
            if (position >= 150) {
            clearInterval(upInterval);

            //descendo:
            var downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    DINO.style.bottom = position + 'px';
                    }
            }, 20)
        
            } else { //subindo:
                position += 10;

                DINO.style.bottom = position + 'px';
            }
                
        }, 20) // codigo executado a cada 20ms

    }

    //CACTOS:

    function createCactus() {
        const cactus = document.createElement('div'); // cria uma div no documento html
        let cactusPosition = 1000; // cacto inicia à direita
        let randomTime = Math.random() * 4500; // gera um número aleatório entre 0 e 1, que vai ser multiplicado por 4500 para dar um valor em ms

        cactus.classList.add('cactus'); // cria uma classe com o cacto
        cactus.style.left = 1000 + 'px'; // cacto iniciado 1000px à direita
        background.appendChild(cactus); // adiciona a div de cacto à div do background

        var leftInterval = setInterval(() => {
            if (cactusPosition < -60) { // exclui o elemento criado quando ele sai da tela, evitando processamento desnecessário
                clearInterval(leftInterval);
                background.removeChild(cactus);
            } else if (cactusPosition > 80 && cactusPosition < 140 && position < 60) { 
                // região de contato entre dinossauro e cacto
                document.body.innerHTML = `<h1 class="game-over">JAVASCRIPT BEATS YOU! 
                <div>Final Score:</div>${scoreCounter}
                <div> Press SPACE to play again</div></h1`; 
                clearInterval(leftInterval);
                clearInterval(scoreInterval);
                background.removeChild(cactus);
                document.addEventListener('keydown', handleReplay); 
            } else {
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px'; // faz o cacto se mover para a esquerda enquanto ainda estiver na tela
            }
        }, 30)

        setTimeout(createCactus, randomTime); //função JS que invoca uma função em um determinado tempo
    }

    createCactus(); // um cacto é criado imediatamente quando o jogo começa

    document.addEventListener('keydown', handleKeyUp); 

    var scoreCounter = 0;
    

    var scoreInterval = setInterval(() => {
        var SCORE = document.getElementById('score');
        SCORE.innerHTML = `<div class="score"> SCORE <div class="score">${scoreCounter}</div></div>`;
        scoreCounter++;
    }, 100);
    
}

play();



