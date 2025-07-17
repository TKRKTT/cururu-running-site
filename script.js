// Usar um event listener pra ter certeza que todo o HTML foi carregado antes de rodar meu script.
// É pra evitar erros de 'elemento não encontrado'.
document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica do Menu Mobile (o famoso "Hambúrguer") ---
    // Primeiro, pego todos os elementos que vou precisar manipular.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a[data-scroll]');

    // Só adiciono os 'escutadores de evento' se os elementos realmente existirem na página.
    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        // Quando alguém clicar no botão de hambúrguer...
        mobileMenuButton.addEventListener('click', () => {
            // ...eu removo a classe que esconde o menu, fazendo ele aparecer.
            mobileMenu.classList.remove('-translate-x-full');
        });

        // Quando clicar no 'X' pra fechar...
        closeMobileMenuButton.addEventListener('click', () => {
            // ...eu adiciono a classe de volta, escondendo o menu.
            mobileMenu.classList.add('-translate-x-full');
        });

        // Pra melhorar a experiência, o menu também fecha se o usuário clicar em um link.
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });
    }
    
    // --- Lógica do Carrinho de Compras ---
    let cartItems = []; // Array para armazenar os itens no carrinho.
    // Pego os elementos do DOM relacionados ao carrinho.
    const cartCounterDesktop = document.getElementById('cart-counter-desktop');
    const cartCounterMobile = document.getElementById('cart-counter-mobile');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartButton = document.getElementById('open-cart-button');
    const openCartMobileButton = document.getElementById('open-cart-mobile-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Função para atualizar a exibição do carrinho (itens e total).
    function updateCartDisplay() {
        let total = 0;
        cartItemsList.innerHTML = ''; // Limpa a lista antes de redesenhar.

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<p class="text-gray-600 text-center">Seu carrinho está vazio.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-gray-600">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button class="remove-item-btn" data-index="${index}" title="Remover item">&times;</button>
                `;
                cartItemsList.appendChild(itemElement);
                total += item.price;
            });
        }

        // Atualiza os contadores de itens no cabeçalho.
        const totalItems = cartItems.length;
        if (cartCounterDesktop) cartCounterDesktop.textContent = totalItems;
        if (cartCounterMobile) cartCounterMobile.textContent = totalItems;
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`; // Atualiza o total.

        // Adiciona event listeners para os botões de remover item.
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                cartItems.splice(indexToRemove, 1); // Remove o item do array.
                updateCartDisplay(); // Atualiza a exibição.
                showSiteNotification('Item removido do carrinho.');
            });
        });
    }

    // Adiciona event listeners para os botões "Adicionar ao Carrinho".
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            // Pega o caminho da imagem do produto diretamente do elemento HTML da loja.
            const productImage = this.closest('.product-item').querySelector('img').src;

            cartItems.push({ name: productName, price: productPrice, image: productImage });
            updateCartDisplay();
            showSiteNotification(`"${productName}" foi adicionado ao carrinho!`);
        });
    });

    // Event listeners para abrir e fechar a sidebar do carrinho.
    if (openCartButton) openCartButton.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
    if (openCartMobileButton) {
        openCartMobileButton.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('-translate-x-full'); // Fecha o menu mobile antes de abrir o carrinho.
            cartSidebar.classList.remove('translate-x-full');
        });
    }
    if (closeCartButton) closeCartButton.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

    // --- Lógica do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário.
            showSiteNotification('Mensagem enviada com sucesso!');
            this.reset(); // Limpa o formulário após o envio.
        });
    }

    // --- Função para Mostrar Notificações Temporárias ---
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('site-notification');
            document.body.appendChild(notification);
        }
        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // A notificação desaparece após 3 segundos.
    }

    // --- Lógica do Contador Regressivo ---
    // Define a data final do evento (31 de Dezembro de 2025, 23:59:59).
    const countdownDate = new Date("Dec 31, 2025 23:59:59").getTime();
    if (document.getElementById("countdown-timer")) {
        // Atualiza o contador a cada 1 segundo.
        const x = setInterval(function() {
            const now = new Date().getTime(); // Pega a data e hora atuais.
            const distance = countdownDate - now; // Calcula a distância até a data final.

            // Cálculos para dias, horas, minutos e segundos.
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Função auxiliar para adicionar um zero à esquerda se o número for menor que 10.
            function padZero(num) { return num < 10 ? '0' + num : num; }

            // Atualiza os elementos HTML com os valores calculados.
            document.getElementById("days").innerHTML = padZero(days);
            document.getElementById("hours").innerHTML = padZero(hours);
            document.getElementById("minutes").innerHTML = padZero(minutes); // CORRIGIDO: Usando getElementById
            document.getElementById("seconds").innerHTML = padZero(seconds);

            // Se a contagem regressiva terminou, exibe uma mensagem.
            if (distance < 0) {
                clearInterval(x); // Para o contador.
                document.getElementById("countdown-timer").innerHTML = "<h3 class='text-xl text-green-600 font-bold'>EVENTO ENCERRADO!</h3>";
            }
        }, 1000); // Roda a cada 1000 milissegundos (1 segundo).
    }

    // --- INÍCIO DA ALTERAÇÃO: Lógica do Carrossel de Imagens de Fundo ---
    const heroCarouselImages = document.querySelectorAll('.hero-carousel-images img');
    let currentImageIndex = 0;

    function showNextImage() {
        // Remove a classe 'active' da imagem atual, tornando-a invisível
        if (heroCarouselImages[currentImageIndex]) {
            heroCarouselImages[currentImageIndex].classList.remove('active');
        }

        // Calcula o índice da próxima imagem (loop infinito)
        currentImageIndex = (currentImageIndex + 1) % heroCarouselImages.length;

        // Adiciona a classe 'active' à próxima imagem, tornando-a visível
        if (heroCarouselImages[currentImageIndex]) {
            heroCarouselImages[currentImageIndex].classList.add('active');
        }
    }

    // Inicia o carrossel se houver mais de uma imagem
    if (heroCarouselImages.length > 1) {
        // Garante que a primeira imagem esteja ativa ao carregar
        if (heroCarouselImages[0]) {
            heroCarouselImages[0].classList.add('active');
        }
        // Muda a imagem a cada 5 segundos (5000 milissegundos)
        setInterval(showNextImage, 5000); 
    }
    // FIM DA ALTERAÇÃO: Lógica do Carrossel de Imagens de Fundo

    // --- Efeito de Revelação ao Rolar a Página (Scroll Reveal) ---
    const scrollElements = document.querySelectorAll(".scroll-reveal");
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 100); // Anima 100px antes de chegar no elemento.
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                el.classList.add("active");
            }
        });
    };
    // Adiciona o event listener para o scroll.
    window.addEventListener("scroll", handleScrollAnimation);
    // Chama a função uma vez ao carregar a página para animar elementos já visíveis.
    handleScrollAnimation();
});
document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica do Menu Mobile (Hambúrguer) ---
    // Seleciona os botões e o menu para controlar sua visibilidade e navegação.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a[data-scroll]');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        // Abre o menu mobile ao clicar no ícone de hambúrguer.
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        // Fecha o menu mobile ao clicar no 'X'.
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });

        // Fecha o menu mobile ao clicar em qualquer link de navegação dentro dele.
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });
    }
    
    // --- Lógica do Carrinho de Compras ---
    let cartItems = []; // Armazena os produtos adicionados ao carrinho.
    // Seleciona todos os elementos do DOM necessários para a funcionalidade do carrinho.
    const cartCounterDesktop = document.getElementById('cart-counter-desktop');
    const cartCounterMobile = document.getElementById('cart-counter-mobile');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartButton = document.getElementById('open-cart-button');
    const openCartMobileButton = document.getElementById('open-cart-mobile-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Função para atualizar a interface do carrinho: lista de itens, contadores e total.
    function updateCartDisplay() {
        let total = 0;
        cartItemsList.innerHTML = ''; // Limpa a lista antes de renderizar os itens.

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<p class="text-gray-600 text-center">Seu carrinho está vazio.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-gray-600">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button class="remove-item-btn" data-index="${index}" title="Remover item">&times;</button>
                `;
                cartItemsList.appendChild(itemElement);
                total += item.price;
            });
        }

        // Atualiza os contadores de itens no cabeçalho (desktop e mobile).
        const totalItems = cartItems.length;
        if (cartCounterDesktop) cartCounterDesktop.textContent = totalItems;
        if (cartCounterMobile) cartCounterMobile.textContent = totalItems;
        // Atualiza o valor total do carrinho.
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        // Adiciona event listeners aos botões de remoção de item, permitindo remover produtos individualmente.
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                cartItems.splice(indexToRemove, 1); // Remove o item do array.
                updateCartDisplay(); // Atualiza a exibição do carrinho.
                showSiteNotification('Item removido do carrinho.'); // Exibe notificação de remoção.
            });
        });
    }

    // Adiciona produtos ao carrinho quando um botão "Adicionar ao Carrinho" é clicado.
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.closest('.product-item').querySelector('img').src; // Obtém a imagem do produto.

            cartItems.push({ name: productName, price: productPrice, image: productImage }); // Adiciona o item ao array.
            updateCartDisplay(); // Atualiza a exibição do carrinho.
            showSiteNotification(`"${productName}" foi adicionado ao carrinho!`); // Exibe notificação de adição.
        });
    });

    // Abre a barra lateral do carrinho ao clicar nos botões do carrinho (desktop e mobile).
    if (openCartButton) openCartButton.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
    if (openCartMobileButton) {
        openCartMobileButton.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('-translate-x-full'); // Fecha o menu mobile primeiro.
            cartSidebar.classList.remove('translate-x-full');
        });
    }
    // Fecha a barra lateral do carrinho ao clicar no 'X'.
    if (closeCartButton) closeCartButton.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

    // --- Lógica do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Impede o envio padrão do formulário e exibe uma notificação de sucesso.
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSiteNotification('Mensagem enviada com sucesso!');
            this.reset(); // Limpa os campos do formulário.
        });
    }

    // --- Função para Mostrar Notificações Temporárias no Canto Inferior ---
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('site-notification');
            document.body.appendChild(notification);
        }
        notification.textContent = message;
        notification.classList.add('show');

        // A notificação desaparece após 3 segundos.
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // --- Lógica do Contador Regressivo para Eventos ---
    // Define a data alvo para a contagem regressiva (31 de Dezembro de 2025, 23:59:59).
    const countdownDate = new Date("Dec 31, 2025 23:59:59").getTime();
    if (document.getElementById("countdown-timer")) {
        // Atualiza o contador a cada segundo.
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            // Calcula dias, horas, minutos e segundos restantes.
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Adiciona zero à esquerda para números menores que 10.
            function padZero(num) { return num < 10 ? '0' + num : num; }

            // Atualiza os elementos HTML com os valores do contador.
            document.getElementById("days").innerHTML = padZero(days);
            document.getElementById("hours").innerHTML = padZero(hours);
            document.getElementById("minutes").innerHTML = padZero(minutes);
            document.getElementById("seconds").innerHTML = padZero(seconds);

            // Se a contagem regressiva terminou, exibe uma mensagem.
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown-timer").innerHTML = "<h3 class='text-xl text-green-600 font-bold'>EVENTO ENCERRADO!</h3>";
            }
        }, 1000);
    }

    // --- Lógica do Carrossel de Imagens de Fundo (Seção Hero) ---
    const heroCarouselImages = document.querySelectorAll('.hero-carousel-images img');
    let currentImageIndex = 0;

    // Função para mostrar a próxima imagem do carrossel com transição suave.
    function showNextImage() {
        if (heroCarouselImages[currentImageIndex]) {
            heroCarouselImages[currentImageIndex].classList.remove('active'); // Esconde a imagem atual.
        }

        currentImageIndex = (currentImageIndex + 1) % heroCarouselImages.length; // Avança para a próxima imagem.

        if (heroCarouselImages[currentImageIndex]) {
            heroCarouselImages[currentImageIndex].classList.add('active'); // Mostra a nova imagem.
        }
    }

    // Inicia o carrossel se houver mais de uma imagem e define o intervalo de troca.
    if (heroCarouselImages.length > 1) {
        if (heroCarouselImages[0]) {
            heroCarouselImages[0].classList.add('active'); // Garante que a primeira imagem esteja visível ao carregar.
        }
        setInterval(showNextImage, 5000); // Troca de imagem a cada 5 segundos.
    }

    // --- Efeito de Revelação ao Rolar a Página (Scroll Reveal) ---
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    // Verifica se um elemento está visível na viewport.
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 100); // Ativa 100px antes de entrar na tela.
    };
    
    // Adiciona a classe 'active' aos elementos quando eles entram na viewport.
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                el.classList.add("active");
            }
        });
    };
    
    // Ativa a animação quando o usuário rola a página e ao carregar inicialmente.
    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();
});
