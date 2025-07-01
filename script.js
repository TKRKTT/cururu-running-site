// Vou usar um event listener pra ter certeza que todo o HTML foi carregado antes de rodar meu script.
// É uma boa prática pra evitar erros de 'elemento não encontrado'.
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
    // 'cartItems' vai ser um array pra guardar os produtos que o usuário adicionar.
    let cartItems = []; 
    const cartCounterDesktop = document.getElementById('cart-counter-desktop');
    const cartCounterMobile = document.getElementById('cart-counter-mobile');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartButton = document.getElementById('open-cart-button');
    const openCartMobileButton = document.getElementById('open-cart-mobile-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Criei uma função pra atualizar tudo que é relacionado ao carrinho.
    // Assim, eu não repito código. Chamo ela sempre que o carrinho mudar.
    function updateCartDisplay() {
        let total = 0;
        cartItemsList.innerHTML = ''; // Limpo a lista antes de adicionar os itens de novo.

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<p class="text-gray-600 text-center">Seu carrinho está vazio.</p>';
        } else {
            // Pra cada item no meu array 'cartItems', eu crio o HTML dele e adiciono na lista.
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                // Uso template literals (com crase ``) pra montar o HTML mais fácil.
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-gray-600">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button class="remove-item-btn" data-index="${index}" title="Remover item">&times;</button>
                `;
                cartItemsList.appendChild(itemElement);
                total += item.price; // Somo o preço do item ao total.
            });
        }

        // Atualizo os contadores (a bolinha vermelha) e o valor total.
        const totalItems = cartItems.length;
        if (cartCounterDesktop) cartCounterDesktop.textContent = totalItems;
        if (cartCounterMobile) cartCounterMobile.textContent = totalItems;
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        // Depois de criar os botões de remover, preciso adicionar o evento de clique neles.
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const indexToRemove = parseInt(this.getAttribute('data-index'));
                cartItems.splice(indexToRemove, 1); // Removo o item do array.
                updateCartDisplay(); // Atualizo a tela do carrinho.
                showSiteNotification('Item removido do carrinho.');
            });
        });
    }

    // Adiciono o evento de clique para todos os botões de "Adicionar ao Carrinho".
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = `https://placehold.co/60x60/2980b9/ffffff?text=${productName.substring(0,2)}`;

            cartItems.push({ name: productName, price: productPrice, image: productImage }); // Adiciono o produto no array.
            updateCartDisplay(); // Atualizo a tela.
            showSiteNotification(`"${productName}" foi adicionado ao carrinho!`);
        });
    });

    // Eventos para abrir e fechar a sidebar do carrinho.
    if (openCartButton) openCartButton.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
    if (openCartMobileButton) {
        openCartMobileButton.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('-translate-x-full'); // Fecho o menu mobile primeiro.
            cartSidebar.classList.remove('translate-x-full'); // Abro o carrinho.
        });
    }
    if (closeCartButton) closeCartButton.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

    // --- Lógica do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário, que recarregaria a página.
            showSiteNotification('Mensagem enviada com sucesso!');
            this.reset(); // Limpa os campos do formulário.
        });
    }

    // --- Função para Mostrar Notificações Temporárias ---
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification');
        if (!notification) { // Se a notificação não existe, eu crio ela.
            notification = document.createElement('div');
            notification.classList.add('site-notification');
            document.body.appendChild(notification);
        }
        notification.textContent = message;
        notification.classList.add('show'); // Adiciono a classe que faz ela aparecer.

        // Depois de 3 segundos, eu removo a classe 'show' pra ela sumir.
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // --- Lógica do Contador Regressivo ---
    const countdownDate = new Date("Dec 31, 2025 23:59:59").getTime();
    if (document.getElementById("countdown-timer")) {
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            function padZero(num) { return num < 10 ? '0' + num : num; }

            document.getElementById("days").innerHTML = padZero(days);
            document.getElementById("hours").innerHTML = padZero(hours);
            document.getElementById("minutes").innerHTML = padZero(minutes);
            document.getElementById("seconds").innerHTML = padZero(seconds);

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown-timer").innerHTML = "<h3 class='text-xl text-green-600 font-bold'>EVENTO ENCERRADO!</h3>";
            }
        }, 1000);
    }

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
    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Rodo uma vez no início pra animar o que já está na tela.
});
