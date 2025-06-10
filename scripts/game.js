function main() {

    //-->CREDENCIAIS
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b749774a5cmsh0cb8f141f35ccc3p1b7ea2jsn3532c3787d9a',
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    };
    //-->CREDENCIAIS
    

    var btnStart = document.getElementById('btnStart');
    btnStart.addEventListener('click', start);

    var divGame = document.getElementById('divGame');

    var res = document.getElementById('resultado');

    var removeCont = document.getElementById('removeCont');

    var contPrincipal = document.getElementById('contPrincipal');

    var resMal = document.getElementById('resMal');

    var factoTxt = document.getElementById('factoTxt');

    // Gera número aleatório - Para ser mais fácil para o utilizador, não incluir as datas negativas. 2021, porque existem previsões para o ano 2022
    var nrMin = 0;
    var nrMax = 2021;
    var random = Math.floor(Math.random() * (nrMax - nrMin)) + nrMin; 

     /*
    Math.random()	->	Gera	sempre	um	novo	valor	aleatório	entre	0	e	1,	por	exemplo,	0,3659;
    O	valor	anterior	é	multiplicado	por	(nrMax	– nrMin),	o	que	no exemplo	anterior	daria	0,3659*99	=	36,2241;
    A	este	valor	é	aplicado	o	método	Math.floor()	que	elimina	a	parte	decimal,	ficando	36;
    Ao	valor	anterior	é	adicionado	o	valor	mínimo,	ficando	o	resultado	final	em	37.
    */

    console.log('A resposta é: ' + random);

    var tent = 0;

    function start() {

        res.innerHTML='';

        divGame.outerHTML = "<div class='col meuEstiloDiv mb-4 text-start' id='divGameChanged'>" +
            "<p>Insert the<span class='accentColor'> year</span>:</p>" +
            "<input type='number' id='input' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-default'>" +
            "<a class='btn btn-card fs-6 text-end mt-3 justify-content-end' id='btnResultado'>resultado</a>" +
            "<p class='mt-5'><span class='accentColor'>Tentativas</span>:</p>" +
            "<div id='divTent'></div>" +
            "</div>";

            var btn = document.getElementById('btnResultado');
            //console.log(btn);

            var num = document.querySelector('#input');
            //console.log(num);

            btn.addEventListener('click', resultado);

            num.addEventListener('keypress', function (event) {  //em vez de clicar no botão, só ter de dar enter
                if (event.keyCode === 13 ) { //se carregar enter
                    resultado(); //executar a função resultado
                }
            })

            var divTent = document.getElementById('divTent');

            for (let i = 1; i < 6; i++) {
                var span = document.createElement('span');
                span.innerHTML += "<h2 class='.span text-danger d-inline'> <i class='bi bi-suit-heart-fill'></i> </h2>";      
                var nSpan = document.querySelectorAll('.span');   
                divTent.appendChild(span);
            }

            //-->VAI BUSCAR A API
            fetch('https://numbersapi.p.rapidapi.com/' + random + '/year?fragment=true&json=true', options) //é só meter o número no input na url, por isso tenho a concatenação
            .then(data => data.json())
            .then(data => //onde tenho de escrever -- aqui é caso corra tudo bem com o fetch
            //console.log(data), //para ver os nomes das chaves(e o que está lá dentro, mas pouco relevante agora), para depois as chamar      
            //descobri que tenho se separar com ,
            //teste para ver se estou a chamar as chaver corretas
            //console.log(data.text), 
            //console.log(data.number)  
            //se chamar todos os console log ou meter um deles antes deste comando, já me vai dizer que "data" não está definido xD
            factoTxt.innerHTML = "<p class='accentColor'>" + data.text + "</p>",
            num.value = '', //limpa sempre o input depois de receber o resultado
            )
            .catch(err => console.error(err)); //se houver um erro na ligação
            //-->VAI BUSCAR A API
    }


    //-->FUNÇÃO RESULTADO
    function resultado() {

        var num = document.querySelector('#input');
        //console.log(num);

        //-->VARIÁVEL QUE BUSCA O VALOR DO INPUT (O NÚMERO QUE FOI INTRODUZIDO NO INPUT)
        var numV = num.value;
        console.log('Valor: ' + numV);
        //-->VARIÁVEL QUE BUSCA O VALOR DO INPUT (O NÚMERO QUE FOI INTRODUZIDO NO INPUT)

        var numN = Number(numV);

        //-->VARIÁVEL QUE BUSCA O LENGTH DO INPUT (PARA SABER SE O INPUT ESTÁ OU NÃO VAZIO)
        var numL = numV.length;
        console.log('Tamanho: ' + numL);
        //-->VARIÁVEL QUE BUSCA O LENGTH DO INPUT (PARA SABER SE O INPUT ESTÁ OU NÃO VAZIO)

        num.value = ''; //para limpar o input 

        //podia fazer com array, mas não vale a pena

        function tryAgain(title, gif, color) {
            return "<h1 class='text-"+ color +"'>" + title + "</h1>"
                + "<img src='" + gif + "' style='max-height:300px;'>"
                + "<br><br>"
                + "<span class='text-danger display-5 align-middle'> <i class='bi bi-arrow-right'> </i></span>"
                + "<button type='button' class='btn btn-card align-middle mx-3' id='restart'>Try Again</button>"
                + "<span class='text-danger display-5 align-middle'> <i class='bi bi-arrow-left'> </i></span>";
        }

        
        if (numN >= 0 && Number.isInteger(numN) && numL > 0 && numN <= 2021) { //o + antes do numV, torna-o um número. é o mesmo que fazer Number();
            //console.log('bom input'); //teste
            tent++; //aumentar o nº de tentativas(um de cada vez) sempre que se clica no botão
            console.log('Tentativas: '+ tent); //ver o n de tentativas

            resMal.innerHTML ='';

            if (numN == random) {  //se estiver certo
                //console.log('certo'); //teste
                removeCont.remove();
                contPrincipal.classList.add("text-center");
                contPrincipal.innerHTML = tryAgain("Victory", "gif/victory_gif.gif", "info");
                var restart = document.getElementById('restart');
                restart.addEventListener('click', function () {
                    window.location.reload();  //dar reload à página e recomeçar
                });

            } else { //se estiver errado
                //console.log('errado'); //teste
                if (tent == 5) { //se perder
                //console.log('Perdeu');
                removeCont.remove();
                contPrincipal.classList.add("text-center");
                contPrincipal.innerHTML = tryAgain("Defeat", "gif/defeat_gif.gif", "danger");
                var restart = document.getElementById('restart');
                restart.addEventListener('click', function () {
                    window.location.reload();  //dar reload à página e recomeçar
                });
                
                } else { //se errar
                res.innerHTML += "<hr><p>This fact <span class='text-warning'>isn't</span> from the year <span class='accentColor'> " + numV + " </span>. Try Again!"; 
                divTent.removeChild(divTent.lastElementChild); //remover a ultima child de divTent (no caso, um coração)
                }

            }
            
        } else {
            //console.log('mal');
            switch (true) {
                case numL <= 0: //se o input estiver vazio
                    resMal.innerHTML = "<p class='erroMsg'><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>number</span>!</p>";
                    break;

                case numN < 0 || numN >= 2022 : //se nãi estiver entre o intervalo de anos estabelecido
                    numV.value = '',
                    resMal.innerHTML = "<p class='erroMsg'><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a year between <span class='text-info'>0</span> and <span class='text-info'>2021</span>!</p>";
                    break;

                case !Number.isInteger(numN): //se o número não for inteiro
                    numV.value = '',
                    resMal.innerHTML = "<p class='erroMsg'><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>integer number</span>!</p>";
                    break;
            
                default:
                    console.log('Inesperado');
                    break;
            }
        }
        

           
    } 
    //-->FUNÇÃO RESULTADO
}
