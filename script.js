document.addEventListener('DOMContentLoaded', function() {
    // Este código garante que o JavaScript só rode depois que todo o HTML for carregado.

    // --- Lógica do Menu Mobile (Menu Hambúrguer) ---
    // Seleciona os elementos do menu no HTML pelos seus IDs
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // O botão de 3 tracinhos no cabeçalho
    const mobileMenu = document.getElementById('mobile-menu'); // O menu que desliza na tela mobile
    const closeMobileMenuButton = document.getElementById('close-mobile-menu'); // O botão 'X' de fechar o menu mobile
    // Seleciona todos os links dentro do menu mobile para que ele feche ao clicar em um deles
    const mobileMenuLinks = mobileMenu.querySelectorAll('a[data-scroll]');

    // Verifica se todos os elementos do menu existem antes de adicionar os eventos (para evitar erros)
    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        // Quando o botão do hambúrguer é clicado:
        mobileMenuButton.addEventListener('click', () => {
            // Remove a classe que esconde o menu (-translate-x-full), fazendo-o aparecer suavemente
            mobileMenu.classList.remove('-translate-x-full');
        });

        // Quando o botão 'X' (fechar) é clicado:
        closeMobileMenuButton.addEventListener('click', () => {
            // Adiciona a classe que esconde o menu, fazendo-o deslizar para fora da tela
            mobileMenu.classList.add('-translate-x-full');
        });

        // Para cada link dentro do menu mobile:
        mobileMenuLinks.forEach(link => {
            // Quando um link é clicado:
            link.addEventListener('click', () => {
                // Esconde o menu mobile automaticamente após o clique
                mobileMenu.classList.add('-translate-x-full');
                // O navegador já cuida de rolar a página para a seção correta por causa do atributo href="#secao"
            });
        });
    }
    
    // --- Lógica do Contador do Carrinho de Compras ---
    let cartCount = 0; // Variável para armazenar a quantidade de itens no carrinho
    const cartCounterDesktop = document.getElementById('cart-counter-desktop'); // Onde o número do carrinho aparece no cabeçalho (desktop)
    const cartCounterMobile = document.getElementById('cart-counter-mobile'); // Onde o número aparece no menu mobile
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn'); // Todos os botões "Adicionar ao Carrinho"

    // Adiciona eventos de clique a todos os botões "Adicionar ao Carrinho"
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartCount++; // Incrementa o contador de itens
                // Atualiza o número no contador do desktop, se ele existir
                if (cartCounterDesktop) {
                    cartCounterDesktop.textContent = cartCount;
                }
                // Atualiza o número no contador do mobile, se ele existir
                if (cartCounterMobile) {
                    cartCounterMobile.textContent = cartCount;
                }
                const productName = this.getAttribute('data-product') || 'Produto'; // Pega o nome do produto
                // Mostra uma pequena notificação temporária na tela (ex: "Camisa adicionada ao carrinho!")
                showSiteNotification(`${productName} adicionado ao carrinho!`);
            });
        });
    }

    // --- Lógica do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form'); // O formulário de contato

    // Verifica se o formulário existe na página
    if (contactForm) {
        // Quando o formulário é enviado (botão "Enviar" clicado):
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)
            showSiteNotification('Mensagem enviada! Entraremos em contato em breve.'); // Mostra notificação de sucesso
            this.reset(); // Limpa todos os campos do formulário
        });
    }

    // --- Função para Mostrar Notificações Temporárias no Site ---
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification'); // Tenta encontrar uma notificação existente na página
        // Se não existir uma notificação, cria uma nova div para ela
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('site-notification'); // Adiciona a classe de estilo para a notificação
            document.body.appendChild(notification); // Adiciona a notificação ao final do corpo da página
        }
        notification.textContent = message; // Define o texto que será exibido na notificação
        notification.style.opacity = '1'; // Torna a notificação visível (aparece suavemente)

        // Faz a notificação desaparecer após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0'; // Torna a notificação invisível (desaparece suavemente)
        }, 3000); // 3000 milissegundos = 3 segundos
    }

    // --- Lógica do Contador Regressivo para a Próxima Corrida ---
    const countdownTimerDiv = document.getElementById("countdown-timer"); // O container onde o contador será exibido
    // Define a data e hora alvo para a contagem regressiva (Exemplo: 31 de dezembro de 2025 à meia-noite)
    const countdownDate = new Date("Dec 31, 2025 00:00:00").getTime();
    // Seleciona os elementos HTML onde os dias, horas, minutos e segundos serão exibidos
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    // Verifica se todos os elementos do contador existem na página
    if (countdownTimerDiv && daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        // Atualiza o contador a cada segundo (1000 milissegundos)
        const x = setInterval(function() {
            const now = new Date().getTime(); // Pega a data e hora atual
            const distance = countdownDate - now; // Calcula a diferença de tempo em milissegundos

            // Calcula dias, horas, minutos e segundos restantes a partir da distância
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Função auxiliar para adicionar um '0' à esquerda se o número for menor que 10 (ex: 5 vira 05)
            function padZero(num) {
                return num < 10 ? '0' + num : num;
            }

            // Atualiza o texto dos elementos HTML com os valores calculados
            daysSpan.innerHTML = padZero(days);
            hoursSpan.innerHTML = padZero(hours);
            minutesSpan.innerHTML = padZero(minutes);
            secondsSpan.innerHTML = padZero(seconds);

            // Se a contagem regressiva terminou (distância menor que 0)
            if (distance < 0) {
                clearInterval(x); // Para de atualizar o contador
                countdownTimerDiv.innerHTML = "A CORRIDA COMEÇOU!"; // Mostra uma mensagem final
            }
        }, 1000); // Roda a cada 1000 milissegundos (1 segundo)
    }

    // --- Efeito de Revelação ao Rolar a Página (Scroll Reveal Effect) ---
    // Seleciona todos os elementos no HTML que possuem a classe 'scroll-reveal'
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    // Função para verificar se um elemento está visível na área de visualização da tela
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top; // Pega a posição superior do elemento em relação à janela
        // Retorna 'true' se o topo do elemento está visível (dentro da janela de visualização)
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    // Função que lida com a animação de rolagem
    const handleScrollAnimation = () => {
        // Para cada elemento com a classe 'scroll-reveal':
        scrollElements.forEach((el) => {
            // Se o elemento está visível na tela, adiciona a classe 'active' para ativar sua animação
            if (elementInView(el, 1.25)) { // O 1.25 ajusta quando a animação dispara (mais cedo)
                el.classList.add("active");
            } else {
                // Se o elemento saiu da tela, remove a classe 'active' para que a animação possa ser reativada ao rolar novamente
                el.classList.remove("active");
            }
        });
    };

    // Adiciona o evento de rolagem à janela para disparar a função de animação
    window.addEventListener("scroll", handleScrollAnimation);
    // Dispara a animação uma vez ao carregar a página, caso alguns elementos já estejam visíveis no início
    handleScrollAnimation();
});
