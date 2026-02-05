//logica verificador de idade
const   idadeInput = document.getElementById('idadeInput');
const   verifyButton = document.getElementById('verifyButton');
const   resultado = document.getElementById('resultado');

function verificarIdade(){
    resultado.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let menssagem = '';

    if(isNaN(idade)|| idade < 0){
        menssagem = 'Por favor, insira uma idade válida...';
    }else if(idade < 18){
        menssagem = 'Você é menor de idade.';
    } else if(idade < 60){
        menssagem = 'Você é adulto';
    }else if(idade < 100){
        menssagem =' Você é idoso';
    }
    else{
        menssagem =' Você é MUITO idoso';
    }
    setTimeout(()=>{
        resultado.innerText = menssagem;
        resultado.classList.add('visivel');
    },100)
}


verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) =>{
    if(event.key === 'Enter') verificarIdade();
})
//Animação do canvas de fundo

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d'); // Contexto 2D, onde desenhamos
// ajusta o tamanho do canvas para o tamanha do janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// objeto para armazenar a podição do mouse

let mouse = {
    x: null,
    y: null,
    radius: 150 //area de influencia do mouse
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//array para armazenar todas as particulas
let particulasArray = [];
const numeroDeParticulas = 200;

//classe para criar uma particula
class Particula{
    constructor(x,y,direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }

    // Método para desenhar a particula no canvas
    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillStyle = '#483d8b';
        ctx.fill();
    }

    // metodo para atualizar a posição da particula 
    atualizar(){
        //inverte a direção se a particula atingir a borda da tela
        if(this.x > canvas.widht || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.direcaoY = -this.direcaoY;
        }
        this.x += this.direcaoX;
        this.y += this.direcaoY;
        this.desenhar();
    }
}

// função para criar o exame de particulas
function init(){
    particulasArray = [];
    for(let i= 0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
        let direcaoX = (Math.random() * 0.4) - 0.2;
        let direcaoY = (Math.random() * 0.4) - 0.2;
        let cor ='#007bff';
        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}

//função para conectar as particulas com linhas
function conectar(){
    for(let a = 0; a < particulasArray.length; a++){
        for(let b = 0; b < particulasArray.length; b++){
            let distancia = ((particulasArray[a].x - particulasArray[b].x) *(particulasArray[a].x - particulasArray[b].x)) + ((particulasArray[a].y - particulasArray[b].y) *(particulasArray[a].y - particulasArray[b].y));
            
            // se a distância entre duas partículas for menor que um certo
            if(distancia < (canvas.width /7)* (canvas.height / 7)){
                ctx.strokeStyle = `rgba(151, 76, 209, 0.45)${1 - (distancia/200000)})`;
                ctx.lineWidth =1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.lineTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//Loop de animação
function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0,0, innerWidth, innerHeight); // limpa o canvas cada frame

    for(let i= 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}
//recria as particulas se a janela for mensionada
window.addEventListener('resize', () => {
    canvas.widht = innerWidth;
    canvas.height = innerHeight;
    init();
});

//Garante que o mouse sai sa area de efeito quando ele da janela
window.addEventListener('resize', () =>{
    mouse.x = undefined;
    mouse.y = undefined;
});
init();
animar();