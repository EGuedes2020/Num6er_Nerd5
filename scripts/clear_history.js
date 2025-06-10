//para eliminhar o "histórico" na local storage
//o nome dos botões de "clear history" têm todos o mesmo id, para assim poder reutilizar este código em todas as outras páginas que precisem e tenham o btn
var clearLS = document.getElementById('clearLS'); // chamar o botão de limpar o histórico
    clearLS.addEventListener('click', function () { // sempre que clicar no btn, fazer o que está na função
        localStorage.clear(); //para eliminhar o "histórico" na local storage
        window.location.reload(); //dar reload à página, para assim os elementos html dentro do histórico atualizarem
    })