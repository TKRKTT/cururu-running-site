document.addEventListener('DOMContentLoaded', function() {
    // Contador do carrinho
    let cartCount = 0;
    const cartCounter = document.getElementById('cart-counter');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    if (cartCounter && addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                cartCount++;
                cartCounter.textContent = cartCount;
                showSiteNotification(`${this.getAttribute('data-product')} adicionado ao carrinho!`);
            });
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

    // Contador Regressivo (Exemplo: para uma corrida em 31 de dezembro de 2025)
    const countdownTimerDiv = document.getElementById("countdown-timer");
    const countdownDate = new Date("Dec 31, 2025 00:00:00").getTime();
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