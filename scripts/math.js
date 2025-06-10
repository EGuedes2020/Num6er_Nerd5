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

    var hist = document.getElementById('hist');

    //-->VARIÁVEIS DOS ELEMENTOS HTML
    var num = document.querySelector('input');
    //console.log(num.value); //teste
    var res = document.getElementById('resultado');
    //console.log(res.textContent);
    var btn = document.getElementById('btnResultado');
    //console.log(btn);
    //-->VARIÁVEIS DOS ELEMENTOS HTML

    //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO
    btn.addEventListener('click', resultado);
    //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO

    //-->SE CARREGAR ENTER, EXECUTAR A FUNÇÃO RESULTADO
    num.addEventListener('keypress', function (event) {  //em vez de clicar no botão, só ter de dar enter
        if (event.keyCode === 13 ) { //se carregar enter
            resultado(); //executar a função resultado
        }
    })
    //-->SE CARREGAR ENTER, EXECUTAR A FUNÇÃO RESULTADO
    
    //-->FUNÇÃO RESULTADO
    function resultado() {

        //-->VARIÁVEL QUE BUSCA O VALOR DO INPUT (O NÚMERO QUE FOI INTRODUZIDO NO INPUT)
        var numV = num.value;
        console.log(numV);
        //-->VARIÁVEL QUE BUSCA O VALOR DO INPUT (O NÚMERO QUE FOI INTRODUZIDO NO INPUT)

        numN = Number(numV);

        //-->VARIÁVEL QUE BUSCA O LENGTH DO INPUT (PARA SABER SE O INPUT ESTÁ OU NÃO VAZIO)
        var numL = numV.length;
        console.log(numL);
        //-->VARIÁVEL QUE BUSCA O LENGTH DO INPUT (PARA SABER SE O INPUT ESTÁ OU NÃO VAZIO)

        //-->CONDIÇÃO IF
        if (numL > 0 && numV >= 0 && Number.isInteger(numN)) { // se o input estiver certo
            //VAI BUSCAR A API
            fetch('https://numbersapi.p.rapidapi.com/'+ num.value +'/math?fragment=true&json=true', options)
            .then(data => data.json())
            .then(function(data) {
                    //
                    if (data.found == false) { //se não encontrar esse número na api
                        //console.log('não há');
                        res.innerHTML = "<i class='bi bi-quote'></i> <span class='accentColor'>" + numV + " </span> is an <span class='text-warning'> unremarkable</span> number."; //apaga o que estava anteriormente escrito (neste caso a resposta anterior)
                        num.value = ''; //limpa sempre o input depois de receber o resultado                         

                    } else { //se encontrar esse número na api
                        res.innerHTML = "<i class='bi bi-quote'></i> The number <span class='accentColor'>" + numV + "</span> is <span class='text-info'>" + data.text + "</span>.", //apaga o que estava anteriormente escrito (neste caso a resposta anterior)
                        num.value = ''; //limpa sempre o input depois de receber o resultado

                        nFactos++;
                        //console.log('Número de factos: ' + nFactos);

                        var categoria = data.type;
                        var formRes = "<div class='liHist'> <p> <span class='histCat'> Categoria: <span class='text-warning'>" + categoria + " </span> </span> <br>" + res.innerHTML + " </p> </div>";

                        //const factos = [numV, categoria, data.text, formRes]; //consigo, mas não vale a pena neste caso

                        //localStorage.setItem("facto: " + nFactos, factos);

                        var factosMuda = "Factos: " + nFactos;

                        var factosObj = {
                            "histN" : factosMuda,
                            "num" : numV,
                            "categoria" : categoria,
                            "facto" : data.text,
                            "html" : formRes
                        }

                        const factosJson = JSON.stringify(factosObj);

                        //var factosMuda = "Factos: " + nFactos;
                        var factosNaHist = localStorage.setItem(factosMuda, factosJson);


                        //console.log(factos[3]);

                        var factosHtml = factosObj.html;

                        hist.innerHTML += factosHtml;

                        console.log(localStorage);

                    }
                }
                )
            .catch(err => console.error(err)); //se houver um erro na ligação
            //VAI BUSCAR A API
        } else { //se o input não estiver certo
        
            switch (true) {
                case numL <= 0: //se o input estiver vazio
                    res.innerHTML = "<p><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>number</span>!</p>";
                    break;

                case numV < 0: //se o número for negativo
                    num.value = '',
                    res.innerHTML = "<p><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>positive number</span>!</p>";
                    break;

                case !Number.isInteger(numN): //se o número não for inteiro
                    num.value = '',
                    res.innerHTML = "<p><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>integer number</span>!</p>";
                    break;
            
                default:
                    console.log('Inesperado');
                    break;
            }
            
        }   
        //-->CONDIÇÃO IF

    }
    //-->FUNÇÃO RESULTADO

    if (localStorage.length === 0) {
        console.log('não há nada na localstorage');
        
        var nFactos = 0;
        console.log('Nº de factos: ' + nFactos);

    } else {
        console.log('a localstorage tem keys');

        var nFactos = localStorage.length;
        console.log('Nº de factos: ' + nFactos);
    }



    for (let i = 0; i < localStorage.length; i++) {
        //console.log(localStorage.getItem(localStorage.key(i)));
        //hist.innerHTML += localStorage.getItem(localStorage.key(i));
        hist.innerHTML += JSON.parse(localStorage.getItem(localStorage.key(i))).html; 
    }
    
}