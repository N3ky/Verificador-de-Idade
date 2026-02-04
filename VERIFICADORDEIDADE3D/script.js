//logica verificador de idade
const   idadeInput = document.grtElementById('idadeInput');
const   verifyButton = document.grtElementById('verifyButton');
const   resultado = document.grtElementById('resultado');

function verificarIdade(){
    resultado.classLiss.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let menssagem = '';

    if(isNaN(idade)|| idade < 0){
        menssagem = 'Por favor, insira uma idade válida...';
    }else if(idade < 18){
        menssagem = 'Você é menor de idade.';
    } else if(idade < 60){
        menssagem = 'Você é adulto';
    }else{
        menssagem =' Você é idoso';
    }
    setTimeout(()=>{
        resultado.innerText = menssagem;
        resultado.classLiss.add('visivel');
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
    y:null,
    radius: 150 //area de influencia do mouse
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//array para armazenar todas as particulas
let particulasArray = [];
const numeroDeParticulas = 100;

//classe para criar uma particula
class Particula{
    constructor(x,y,direcaoX, direcaoY, tamanho, cor){
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cory =cor;
    }

    // Método para desenhar a particula no canvas
    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillStyle = '#007nff';
        ctx.fill();
    }

    // metodo para atualizar a posição da particula 
    atualizar(){
        //inverte a direção se a particula atingir a borda da tela
        if(this.x > canvas.widht || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.width || this.y < 0){
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
        let cor ='007bff';
        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}

//função para conectar as particulas com linhas
function conectar(){
    for(let a = 0; a < particulasArray.length; a++){
        for(let b=0; b < particulasArray.length; b++){
            let distancia = ((particulasArray[a].x - particulasArray[b].x) *(particulasArray[a].x - particulasArray[b].x)) + ((particulasArray[a].y - particulasArray[b].y) *(particulasArray[a].y - particulasArray[b].y));
            
            // se a distância entre duas partículas for menor que um certo
            if(distancia < (canvas.width /7)* (canvas.height / 7)){
                ctx.stroke = `rgba(0, 123, 255, ${1 - (distancia/20000)})`;
                ctx.lineWidth =1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.moveTo(particulasArray[b].x, particulasArray[b].y);
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
window.addEventListener('mouseout', () =>{
    mouse.x = underfined;
    mouse.y = underfined;
});
init();
animar();