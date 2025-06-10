//-->FUNCTION MAIN
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

    //-->VARIÁVEIS DOS INPUTS
    var d = document.getElementById('d');
    //console.log(d);

    var m = document.getElementById('m');
    //console.log(m);
    //-->VARIÁVEIS DOS INPUTS


    //-->VARIÁVEIS DOS OUTROS ELEMENTOS HTML
    var res = document.getElementById('resultado');
    //console.log(res.textContent);
    var btn = document.getElementById('btnResultado');
    //console.log(btn);
    var hist = document.getElementById('hist');
    //-->VARIÁVEIS DOS OUTROS ELEMENTOS HTML

    //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO
    btn.addEventListener('click', resultado);
    //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO

    //-->SEMPRE QUE O VALUE DE M (MESES) MUDA
    //assim não há o problema de selecionarem um dia que não existe em certos meses
    m.addEventListener('change', (event) => { 
            //-->IF - SE O INDEX DE M(MÊS) FOR 0
            if (m.selectedIndex == 0) { //sem uma opção selecionada no mês -- que é o choose e tem o index de 0, por ser o primeiro
                //console.log('selecione uma opção');
                d.toggleAttribute('disabled'); //para remover o atributo que o deixa disabled, caso o tenha. adicionar esse atributo, caso não o tenha
                d.selectedIndex = 0; //se voltar a meter o mês sem um valor(o choose), a opção do dia volta para default(choose...) também
            } else { //se o valor do mês não for choose...(0)
                console.log(event.target.value); //ver o valor que acabámos de selecionar
                d.removeAttribute('disabled'); //tira o atributo disabled, ou seja, que fica ativo. assim só podem selecionar o dia, caso o mês tenha um valor(sem ser o choose)
                
                //-->SWITCH - DEPENDENDO DO VALOR SELECIONADO
                switch (event.target.value) { //se o valor do mês selecionado for...
                    case "4":
                    case "6":
                    case "9":
                    case "10":

                        console.log('30 dias'); //mostraro nº de dias na consola

                        //elimina todos os filhos de d. Assim, sempre que mudar para outro mês, não adiciona estes valores aos anteriormente existentes, caso contrário, seria uma lista enormme a repetir os mesmos números
                        while (d.hasChildNodes()) { //enquanto d tiver filhos (no caso, cada um dos dias)
                            d.removeChild(d.firstChild);  //eliminar a primeira child dos dias
                        }

                        //cria as opções com os números e valores(dos números)
                        for (let i = 1; i <= 30; i++) { //vai criar valores de 1 a 30
                            //console.log(i);
                            d.appendChild(new Option(i, i)); //adiciona uma "option" ao nosso dropdown dos dias //new Option(text, value)                                                               
                        }

                        break;

                    case "1":
                    case "3":
                    case "5":
                    case "7":
                    case "8":
                    case "10":
                    case "12":

                        console.log('31 dias'); //mostraro nº de dias na consola

                        //elimina todos os filhos de d. Assim, sempre que mudar para outro mês, não adiciona estes valores aos anteriormente existentes, caso contrário, seria uma lista enormme a repetir os mesmos números
                        while (d.hasChildNodes()) { //enquanto d tiver filhos (no caso, cada um dos dias)
                            d.removeChild(d.firstChild);  //eliminar a primeira child dos dias
                        }

                        //cria as opções com os números e valores(dos números)
                        for (let i = 1; i <= 31; i++) { //vai criar valores de 1 a 31
                            //console.log(i);
                            d.appendChild(new Option(i, i)); //adiciona uma "option" ao nosso dropdown dos dias //new Option(text, value)                                                               
                        }

                        break;

                    case "2":

                        console.log('29 dias'); //mostraro nº de dias na consola

                        //elimina todos os filhos de d. Assim, sempre que mudar para outro mês, não adiciona estes valores aos anteriormente existentes, caso contrário, seria uma lista enormme a repetir os mesmos números
                        while (d.hasChildNodes()) { //enquanto d tiver filhos (no caso, cada um dos dias)
                            d.removeChild(d.firstChild);  //eliminar a primeira child dos dias
                        }

                        //cria as opções com os números e valores(dos números)
                        for (let i = 1; i <= 29; i++) { //vai criar valores de 1 a 29
                            //console.log(i);
                            d.appendChild(new Option(i, i)); //adiciona uma "option" ao nosso dropdown dos dias //new Option(text, value)                                                               
                        }
                        
                        break;                             

                    default:
                        console.log('erro'); //só para o caso...
                        break;
                }
                //-->SWITCH - DEPENDENDO DO VALOR SELECIONADO

            }
            //-->IF - SE O INDEX DE M(MÊS) FOR 0
    });
    //-->SEMPRE QUE O VALUE DE M (MESES) MUDA
    

    //-->FUNÇÃO RESULTADO
    function resultado() {

        //-->VARIÁVEL COM O VALOR DOS DIAS
        var dV = d.value; 
        console.log('Dia - Valor: '+ dV);
        //console.log('Dia - Tamanho: '+ dL);
        //-->VARIÁVEL COM O VALOR DOS DIAS

        //-->VARIÁVEL COM O VALOR DOS MESES
        var mV = m.value;
        console.log('Mês - Valor: '+ mV);
        //-->VARIÁVEL COM O VALOR DOS MESES
        
        //-->VARIÁVEL COM O TEXTO DO VALOR QUE FOI SELECIONADO
        const mTxt = m.options[m.selectedIndex].text;  //o texto com o mês que foi selecionado
        console.log(mTxt); //teste
        //-->VARIÁVEL COM O TEXTO DO VALOR QUE FOI SELECIONADO

        //-->IF - PARA DAR O RESULTADO
        if (m.selectedIndex > 0 || d.selectedIndex > 0) { // se os dois tiverem um valor maior que 0 - se estiverem sem o "choose" selecionado
            //-->BUSCAR A API
            fetch('https://numbersapi.p.rapidapi.com/' + mV + '/' + dV + '/date?fragment=true&json=true', options) //buscar a url da api com os números selecionados nos sítios certos(descobrir na rapid API, cada um é diferente) e com a respetiva credencial
                .then(data => data.json()) 
                .then(function(data) { //se correr tudo bem ao chamar a API
                    //console.log('a dar'); //teste
                    if (data.found == false) { //se não encontrar esse número na api
                        //console.log('não há'); //teste
                        res.innerHTML = "<i class='bi bi-quote'></i>Nothing important happened on <span class='accentColor'>" + dV + "</span> of <span class='accentColor'>" + mV + "</span>."; //apaga (pq é = e não +=) o que estava anteriormente escrito (neste caso a resposta anterior)
                    } else { //se encontrar esse número na api
                        res.innerHTML = "<i class='bi bi-quote'></i>On <span class='accentColor'>" + mTxt + " " + dV + "</span>, <span class='accentColor'>" + data.year + "</span>, </span> <span class='text-info'>" + data.text + "</span>."; //apaga (pq é = e não +=) o que estava anteriormente escrito (neste caso a resposta anterior)
                        nFactos++; //+1 ao valor atual do tamanho/length da localStorage. Se não fizer isto, a local storage vai ter sempre apenas uma key a qual vamos estar sempre a mudar o valor da mesma
                        //console.log('Número de factos: ' + nFactos); //teste

                        var categoria = data.type; //buscar a categoria presente no objecto. "type" é a chave com o valor da categoria 
                        var formRes = "<div class='liHist'> <p> <span class='histCat'> Categoria: <span class='text-warning'>" + categoria + " </span> </span> <br>" + res.innerHTML + " </p> </div>"; //apaga (pq é = e não +=) o que estava anteriormente escrito (neste caso a resposta anterior)

                        //Consegui com um array, mas preferi fazer com um objecto(fica mais organizada a visualização), apesar de ter sido imensamente mais díficil, era um desafia para mim mesma!
                        //const factos = [numV, categoria, data.text, formRes]; //consigo, mas não vale a pena neste caso
                        //localStorage.setItem("facto: " + nFactos, factos);
                        //var factosNaHist = localStorage.setItem(factosMuda, factosJson);

                        //console.log(factos[3]);

                        var factosMuda = "Factos: " + nFactos; // criei esta variável pelo mesmo motivo que nFactos. Assim é mais fácil de a chamar no factosOjc

                        //um objecto que criei para guardar cada um dos factos que o utilizador receba
                        var factosObj = {
                            "histN" : factosMuda, //para mudar sempre
                            "num" : data.number, //o número na API e o que o utilizador inseriu
                            "categoria" : categoria, //a categoria (já falei dela na linha 154)
                            "facto" : data.text, //o facto guardado na api. a sia key é "text"
                            "html" : formRes //a resposta em html para depois colocar no histórico (linha 155)
                        }

                        const factosJson = JSON.stringify(factosObj); //transforma o obj em uma string, sem isto não consigo armazenar o obj na localStorage

                        var factosNaHist = localStorage.setItem(factosMuda, factosJson); //adiciona o objeto no histórico. A key para cada obj vai ser sempre a variável que muda(factosMuda)

                        var factosHtml = factosObj.html; //buscar a key "html" ao obj que criei

                        hist.innerHTML += factosHtml; //adicionar o valor no html do obj, na parte do histórico na página

                        console.log(localStorage); //ver a sempre o estado da localStorage quando adicionamos um novo facto. ver se está a correr tudo bem sem ter de ir à "aplicação>armazenamento local>...(depende de onde o estou a ver - local ou online)"
                    }
                }
                )
                .catch(err => console.error(err)); //se houver um erro na ligação com a api
                //-->BUSCAR A API
        } else { //se não tiver selecionado um dos valores
            console.log('Não selecionaste um dos valores!'); 
            res.innerHTML = "<i class='bi bi-quote'></i> <span class='text-warning'> Não selecionaste</span> um dos valores."; //dá a resposta na página
        }
        
    } 
    //-->FUNÇÃO RESULTADO

    //-->IF - SE A LOCALSTORAGE TIVER KEYS E VALORES
    if (localStorage.length === 0) { // se não tiver
        console.log('não há nada na localstorage');
        
        var nFactos = 0; //o nfactos antes definido vai começar em 0
        console.log('Nº de factos: ' + nFactos);

    } else { // se não tiver
        console.log('a localstorage tem keys');

        var nFactos = localStorage.length; //o nfactos vai ser = ao número de keys na localStorage. se não fizer isto, sempre que voltar a esta página, as chaves anteriores daqui vão desaparecer da localstorage 
        console.log('Nº de factos: ' + nFactos);
    }
    //-->IF - SE A LOCALSTORAGE TIVER KEYS E VALORES

    //-->FOR - ATUALIZAR O HISTÓRICO COM OS ELEMENTOS PRESENTES NA LOCALSTORAGE
    for (let i = 0; i < localStorage.length; i++) { //correr todos os elementos dentro da localStorage
        hist.innerHTML += JSON.parse(localStorage.getItem(localStorage.key(i))).html; //transformar a string do obj, num obj e ir buscar o valor na key "html". pegar no valor dessa key e meté-la na parte do histórico da página
    }
    //-->FOR - ATUALIZAR O HISTÓRICO COM OS ELEMENTOS PRESENTES NA LOCALSTORAGE


}
//-->FUNCTION MAIN