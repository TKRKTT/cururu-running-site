document.addEventListener('DOMContentLoaded', function() {
    // Contador do carrinho
    let cartCount = 0;
    const cartCounter = document.getElementById('cart-counter');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCounter.textContent = cartCount;
            showSiteNotification(`${this.getAttribute('data-product')} adicionado ao carrinho!`);
        });
    });

    // Mudar mensagem
    const changeTextBtn = document.getElementById('change-text-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    if (changeTextBtn && welcomeMessage) {
        changeTextBtn.addEventListener('click', function() {
            welcomeMessage.textContent = welcomeMessage.textContent.includes("Somos um time")
                ? "Nossa equipe compete em provas por todo o país. Apoie-nos!"
                : "Somos um time apaixonado por corridas de rua. Junte-se a nós ou apoie nossa equipe comprando nossos produtos exclusivos!";
        });
    }

    // Formulário
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSiteNotification('Mensagem enviada! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Função para mostrar notificação temporária
    function showSiteNotification(message) {
        let notification = document.querySelector('.site-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('site-notification');
            document.body.appendChild(notification);
        }
        notification.textContent = message;
        notification.style.opacity = '1';

        setTimeout(() => {
            notification.style.opacity = '0';
        }, 3000); // Notificação desaparece após 3 segundos
    }


    // Inserção dinâmica de informações na Home
    const mottoInfoDiv = document.getElementById('motto-info');
    if (mottoInfoDiv) {
        mottoInfoDiv.innerHTML = `
            <h3>Nosso Lema</h3>
            <p>Juntos somos mais fortes, correndo em busca dos nossos sonhos!</p>
        `;
    }

    const meetingInfoDiv = document.getElementById('meeting-info');
    if (meetingInfoDiv) {
        meetingInfoDiv.innerHTML = `
            <h3>Horários e Local de Encontro</h3>
            <p>Nos encontramos na Praça Central de segunda a sexta, das 18h às 20h. Aos sábados, fazemos treinos longos em trilhas, com ponto de encontro a ser divulgado.</p>
        `;
    }

    const locationInfoDiv = document.getElementById('location-info');
    if (locationInfoDiv) {
        locationInfoDiv.innerHTML = `
            <h3>Nossa Localização</h3>
            <p>Praça Central, Centro, Cidade - Estado (Ex: São Paulo - SP)</p>
        `;
    }

    // Carrossel de Imagens
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let counter = 0;
    const size = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0;

    if (carouselSlide && carouselImages.length > 0 && size > 0) {
        // Set initial position
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) { // -1 porque o índice é baseado em 0
                carouselSlide.style.transition = "none"; // Remove transição para voltar ao início
                counter = -1; // Volta ao "clone" inicial (se tivesse, mas para este caso, volta para 0)
                // Se não houver clones, simplesmente para ou volta ao início sem transição
                carouselSlide.style.transform = 'translateX(0px)';
                counter = 0;
            } else {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
                counter++;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) { // Se estiver no primeiro, para ou vai para o último
                carouselSlide.style.transition = "none";
                counter = carouselImages.length; // Vai para o "clone" final (se tivesse)
                // Se não houver clones, simplesmente para ou vai para o último sem transição
                carouselSlide.style.transform = 'translateX(' + (-size * (carouselImages.length - 1)) + 'px)';
                counter = carouselImages.length - 1;
            } else {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
                counter--;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
        });
    }

    // Contador Regressivo (Exemplo: para uma corrida em 31 de dezembro de 2025)
    const countdownDate = new Date("Dec 31, 2025 00:00:00").getTime();
    const countdownTimerDiv = document.getElementById("countdown-timer");
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    if (countdownTimerDiv && daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysSpan.innerHTML = days < 10 ? '0' + days : days;
            hoursSpan.innerHTML = hours < 10 ? '0' + hours : hours;
            minutesSpan.innerHTML = minutes < 10 ? '0' + minutes : minutes;
            secondsSpan.innerHTML = seconds < 10 ? '0' + seconds : seconds;

            if (distance < 0) {
                clearInterval(x);
                countdownTimerDiv.innerHTML = "A CORRIDA COMEÇOU!";
            }
        }, 1000);
    }


    // Scroll Reveal Effect
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                el.classList.add("active");
            } else if (elementOutofView(el)) {
                el.classList.remove("active");
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    // Trigger on load in case elements are already in view
    handleScrollAnimation();
});