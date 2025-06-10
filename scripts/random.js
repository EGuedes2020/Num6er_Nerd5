function main() {
  var hist = document.getElementById("hist");

  //-->CREDENCIAIS
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b749774a5cmsh0cb8f141f35ccc3p1b7ea2jsn3532c3787d9a",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };
  //-->CREDENCIAIS

  //-->VARIÁVEIS DOS INPUTS
  var min = document.getElementById("min");
  //console.log(min);

  var max = document.getElementById("max");
  //console.log(max);
  //-->VARIÁVEIS DOS INPUTS

  //-->VARIÁVEIS DOS OUTROS ELEMENTOS HTML
  var res = document.getElementById("resultado");
  //console.log(res.textContent);
  var btn = document.getElementById("btnResultado");
  //console.log(btn);
  //-->VARIÁVEIS DOS OUTROS ELEMENTOS HTML

  //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO
  btn.addEventListener("click", resultado);
  //-->SEMPRE QUE CLICAR NO BTN, EXECUTAR A FUNÇÃO RESULTADO

  //-->FUNÇÃO RESULTADO
  function resultado() {
    //-->VARIÁVEL COM O VALOR MÍNIMO
    var minV = min.value;
    console.log("Min - Valor: " + minV);
    var minL = minV.length;
    console.log("Min - Tamanho: " + minL);
    var minN = Number(minV);
    console.log("Min como number: " + minN);
    //console.log(Number.isInteger(+minV)); //sem o +, não dá a resposta certa
    //-->VARIÁVEL COM O VALOR MÍNIMO

    //-->VARIÁVEL COM O VALOR MÁXIMO
    var maxV = max.value;
    console.log("Max - Valor: " + maxV);
    var maxL = maxV.length;
    console.log("Max - Tamanho: " + maxL);
    var maxN = Number(maxV);
    console.log("Max como number: " + maxN);
    //console.log(Number.isInteger(+maxV)); //sem o +, não dá a resposta certa
    //-->VARIÁVEL COM O VALOR MÁXIMO

    //-->CONDIÇÃO IF
    // se não tansformasse o minV e o maxV em números com o Number(), ele iria comprar como se fosse uma string, ou seja, ia comparar de tetra a letra(da esquerda para a direita), isso dava o porblema de 8 < 23 = false.
    if (maxL > 0 && maxV >= 0 && minL > 0 && minV >= 0 && maxN > minN) {
      //se os valores estiverem correctos e de acordo com a lógica
      console.log("bem");
      //VAI BUSCAR A API
      fetch(
        "https://numbersapi.p.rapidapi.com/random/trivia?min=" +
          minV +
          "&max=" +
          maxV +
          "&fragment=true&json=true",
        options
      )
        .then((data) => data.json())
        .then(function (data) {
          //
          if (data.found == false) {
            //se não encontrar esse número na api
            //console.log('não há');
            res.innerHTML =
              "<i class='bi bi-quote'></i> <span class='accentColor'>" +
              numV +
              " </span> is an <span class='text-warning'> unremarkable</span> number."; //apaga o que estava anteriormente escrito (neste caso a resposta anterior)
            maxV = ""; //limpa sempre o input depois de receber o resultado
            minV = ""; //limpa sempre o input depois de receber o resultado
          } else {
            //se encontrar esse número na api
            (res.innerHTML =
              "<i class='bi bi-quote'></i> The number <span class='accentColor'>" +
              data.number +
              "</span> is <span class='text-info'>" +
              data.text +
              "</span>."), //apaga o que estava anteriormente escrito (neste caso a resposta anterior)
              (maxV = ""); //limpa sempre o input depois de receber o resultado
            minV = ""; //limpa sempre o input depois de receber o resultado

            nFactos++;
            //console.log('Número de factos: ' + nFactos);

            var categoria = data.type;
            var formRes =
              "<div class='liHist'> <p> <span class='histCat'> Categoria: <span class='text-warning'>" +
              categoria +
              " </span> </span> <br>" +
              res.innerHTML +
              " </p> </div>";

            //const factos = [numV, categoria, data.text, formRes]; //consigo, mas não vale a pena neste caso

            //localStorage.setItem("facto: " + nFactos, factos);

            var factosMuda = "Factos: " + nFactos;

            var factosObj = {
              histN: factosMuda,
              num: data.number,
              categoria: categoria,
              facto: data.text,
              html: formRes,
            };

            const factosJson = JSON.stringify(factosObj);

            //var factosMuda = "Factos: " + nFactos;
            var factosNaHist = localStorage.setItem(factosMuda, factosJson);

            //console.log(factos[3]);

            var factosHtml = factosObj.html;

            hist.innerHTML += factosHtml;

            console.log(localStorage);
          }
        })
        .catch((err) => console.error(err)); //se houver um erro na ligação
      //VAI BUSCAR A API
    } else {
      //se o input não estiver certo
      console.log("mal");

      if (maxL <= 0 || minL <= 0) {
        //se o um dos inputs estiver vazio
        maxV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        minV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        res.innerHTML =
          "<p><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>number</span> in the two fields!</p>";
      } else if (minV < 0 || maxV < 0) {
        //se o um dos inputs tiver um número negativo
        maxV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        minV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        res.innerHTML =
          "<p><span class='text-danger'>Error!</span> You <span class='text-warning'>didn't insert</span> a <span class='text-info'>positive number</span> in the two fields!</p>";
      } else {
        //se o primeiro input for maior ou igual ao segundo
        maxV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        minV = ""; //limpa sempre o input depois de receber o resultado -- sem isto, ele não dá outro número random
        res.innerHTML =
          "<p><span class='text-danger'>Error!</span> The <span class='text-info'>1st number</span> is<span class='text-warning'> equal or greater</span> than the <span class='text-info'>2nd number</span></p>";
      }
    }
    //-->CONDIÇÃO IF
  }
  //-->FUNÇÃO RESULTADO

  if (localStorage.length === 0) {
    console.log("não há nada na localstorage");

    var nFactos = 0;
    console.log("Nº de factos: " + nFactos);
  } else {
    console.log("a localstorage tem keys");

    var nFactos = localStorage.length;
    console.log("Nº de factos: " + nFactos);
  }

  for (let i = 0; i < localStorage.length; i++) {
    hist.innerHTML += JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).html;
  }
}
