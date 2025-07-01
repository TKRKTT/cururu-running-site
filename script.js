document.addEventListener('DOMContentLoaded', function() {
    // Este código garante que o JavaScript só rode depois que todo o HTML for carregado.

    // --- Lógica do Menu Mobile (Menu Hambúrguer) ---
    // Seleciona os elementos do menu no HTML pelos seus IDs
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // O botão de 3 tracinhos
    const mobileMenu = document.getElementById('mobile-menu'); // O menu que desliza
    const closeMobileMenuButton = document.getElementById('close-mobile-menu'); // O botão 'X' de fechar
    // Seleciona todos os links dentro do menu mobile para que ele feche ao clicar
    const mobileMenuLinks = mobileMenu.querySelectorAll('a[data-scroll]');

    // Verifica se todos os elementos do menu existem antes de adicionar os eventos
    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        // Quando o botão do hambúrguer é clicado:
        mobileMenuButton.addEventListener('click', () => {
            // Remove a classe que esconde o menu (-translate-x-full), fazendo-o aparecer
            mobileMenu.classList.remove('-translate-x-full');
        });

        // Quando o botão 'X' é clicado:
        closeMobileMenuButton.addEventListener('click', () => {
            // Adiciona a classe que esconde o menu, fazendo-o deslizar para fora
            mobileMenu.classList.add('-translate-x-full');
        });

        // Para cada link dentro do menu mobile:
        mobileMenuLinks.forEach(link => {
            // Quando um link é clicado:
            link.addEventListener('click', () => {
                // Esconde o menu mobile automaticamente
                mobileMenu.classList.add('-translate-x-full');
                // O navegador já cuida de rolar para a seção correta por causa do href="#secao"
            });
        });
    }
    
    // --- Lógica do Contador do Carrinho ---
    let cartCount = 0; // Variável para armazenar a quantidade de itens no carrinho
    const cartCounter = document.getElementById('cart-counter'); // Onde o número do carrinho aparece no cabeçalho
    const cartCounterMobile = document.getElementById('cart-counter-mobile'); // Onde o número aparece no menu mobile
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); // Todos os botões "Adicionar ao Carrinho"

    // Adiciona eventos aos botões "Adicionar ao Carrinho" independentemente dos elementos do contador
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartCount++; // Incrementa o contador
                // Atualiza o número no cabeçalho, se existir
                if (cartCounter) {
                    cartCounter.textContent = cartCount;
                }
                // Atualiza o número no menu mobile, se ele existir
                if (cartCounterMobile) {
                    cartCounterMobile.textContent = cartCount;
                }
                const productName = this.getAttribute('data-product') || 'Produto';
                // Mostra uma pequena notificação na tela
                showSiteNotification(`${productName} adicionado ao carrinho!`);
            });
        });
    }

    // --- Lógica do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form'); // O formulário de contato

    // Verifica se o formulário existe
    if (contactForm) {
        // Quando o formulário é enviado:
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede que a página recarregue ao enviar o formulário
            showSiteNotification('Mensagem enviada! Entraremos em contato em breve.'); // Mostra notificação
            this.reset(); // Limpa os campos do formulário
        });
    }

    // --- Função para Mostrar Notificações Temporárias ---
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification'); // Tenta encontrar uma notificação existente
        // Se não existir, cria uma nova div para a notificação
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('site-notification'); // Adiciona a classe de estilo
            document.body.appendChild(notification); // Adiciona a notificação ao corpo da página
        }
        notification.textContent = message; // Define o texto da notificação
        notification.style.opacity = '1'; // Torna a notificação visível

        // Faz a notificação desaparecer após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 3000);
    }

    // --- Lógica do Contador Regressivo para a Próxima Corrida ---
    const countdownTimerDiv = document.getElementById("countdown-timer"); // O container do contador
    // Define a data final da contagem regressiva (31 de dezembro de 2025)
    const countdownDate = new Date("Dec 31, 2025 00:00:00").getTime();
    // Seleciona os elementos onde os dias, horas, minutos e segundos serão exibidos
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    // Verifica se todos os elementos do contador existem
    if (countdownTimerDiv && daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        // Atualiza o contador a cada segundo
        const x = setInterval(function() {
            const now = new Date().getTime(); // Pega a data e hora atual
            const distance = countdownDate - now; // Calcula a diferença de tempo

            // Calcula dias, horas, minutos e segundos restantes
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Função auxiliar para adicionar zero à esquerda se o número for menor que 10
            function padZero(num) {
                return num < 10 ? '0' + num : num;
            }
            // Atualiza o texto dos elementos usando a função de zero-padding
            daysSpan.innerHTML = padZero(days);
            hoursSpan.innerHTML = padZero(hours);
            minutesSpan.innerHTML = padZero(minutes);
            secondsSpan.innerHTML = padZero(seconds);
            secondsSpan.innerHTML = seconds < 10 ? '0' + seconds : seconds;
                // Externalize the finished message for localization
                const finishedMessage = window.CORRIDA_STARTED_MESSAGE || "A CORRIDA COMEÇOU!";
                countdownTimerDiv.innerHTML = finishedMessage; // Mostra uma mensagem final
            // Se a contagem regressiva terminou (distância menor que 0)
            if (distance < 0) {
                clearInterval(x); // Para de atualizar o contador
                countdownTimerDiv.innerHTML = "A CORRIDA COMEÇOU!"; // Mostra uma mensagem final
            }
        }, 1000); // Roda a cada 1000 milissegundos (1 segundo)
    }

    // --- Efeito de Revelação ao Rolar a Página (Scroll Reveal) ---
    const scrollElements = document.querySelectorAll(".scroll-reveal"); // Seleciona todos os elementos com a classe 'scroll-reveal'

    // Função para verificar se um elemento está visível na tela
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top; // Pega a posição superior do elemento
        // Retorna verdadeiro se o elemento está na área visível da tela
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    // Função para verificar se um elemento saiu da tela
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        // Retorna verdadeiro se o elemento está abaixo da área visível da tela
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    // Função que lida com a animação de rolagem
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            // Se o elemento está visível, adiciona a classe 'active' para ativar a animação
            if (elementInView(el, 1.25)) {
                el.classList.add("active");
            } else if (elementOutofView(el)) {
                // Se o elemento saiu da tela, remove a classe 'active'
                el.classList.remove("active");
            }
        });
    };

    // Função de throttle para limitar a frequência de execução
    function throttle(fn, wait) {
        let isThrottled = false, args, context;
        return function() {
            if (isThrottled) {
                args = arguments;
                context = this;
                return;
            }
            fn.apply(this, arguments);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
                if (args) {
                    fn.apply(context, args);
                    args = context = null;
                }
            }, wait);
        };
    }

    // Adiciona o evento de rolagem para disparar a animação com throttle
    window.addEventListener("scroll", throttle(handleScrollAnimation, 100));
    // Dispara a animação uma vez ao carregar a página, caso elementos já estejam visíveis
    handleScrollAnimation();
});