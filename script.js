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
        
            } else { // subindo:
                position += 10;

                DINO.style.bottom = position + 'px';
            }
                
        }, 20) // código executado a cada 20ms

    }

    // OBSTÁCULOS:
    
    function createObstacle() {
        const obstacle = document.createElement('div'); // cria uma div no documento html
        let obstaclePosition = 1000; // obstáculo inicia à direita
        let randomTime = Math.random() * 4500; // gera um número aleatório entre 0 e 1, que vai ser multiplicado por 4500 para dar um valor em ms

        obstacle.classList.add('obstacle'); // cria uma classe com o obstáculo
        obstacle.style.left = 1000 + 'px'; // obstáculo iniciado 1000px à direita
        background.appendChild(obstacle); // adiciona a div de obstáculo à div do background

        var leftInterval = setInterval(() => {
            if (obstaclePosition < -60) { // exclui o elemento criado quando ele sai da tela, evitando processamento desnecessário
                clearInterval(leftInterval);
                background.removeChild(obstacle);
            } else if (obstaclePosition > 80 && obstaclePosition < 140 && position < 60) { 
                // região de contato entre dinossauro e obstáculo
                document.body.innerHTML = `<h1 class="game-over">JAVASCRIPT BEATS YOU! 
                <div>Final Score:</div>${scoreCounter}
                <div> Press SPACE to play again</div></h1`; 
                clearInterval(leftInterval);
                clearInterval(scoreInterval);
                background.removeChild(obstacle);
                document.addEventListener('keydown', handleReplay); 
            } else {
                obstaclePosition -= 10;
                obstacle.style.left = obstaclePosition + 'px'; // faz o obstáculo se mover para a esquerda enquanto ainda estiver na tela
            }
        }, 30)

        setTimeout(createObstacle, randomTime); // função JS que invoca uma função em um determinado tempo
    }
    
    createObstacle(); // um obstáculo é criado imediatamente quando o jogo começa

    document.addEventListener('keydown', handleKeyUp); 

    var scoreCounter = 0;
    
    var scoreInterval = setInterval(() => {
        var SCORE = document.getElementById('score');
        SCORE.innerHTML = `<div class="score"> SCORE <div class="score">${scoreCounter}</div></div>`;
        scoreCounter++;
    }, 100); // Como no jogo original, fazemos a contagem de pontos de acordo com o tempo que o jogador consegue permanecer no jogo
    
}

play();



