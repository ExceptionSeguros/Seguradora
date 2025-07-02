// =========================================
// JavaScript para o Carrossel (Automático e Manual)
// =========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
let carouselInterval; // Variável para armazenar o ID do intervalo do setTimeout

// Função para exibir o slide atual e iniciar o timer para o próximo
function showSlides() {
    // Remove a classe 'active' de todos os slides e a classe 'hover-active' dos botões
    slides.forEach(slide => {
        slide.classList.remove('active'); 
        // Remove a classe de hover forçado dos botões de slides não ativos
        const button = slide.querySelector('.carousel-button');
        if (button) {
            button.classList.remove('hover-active');
        }
    });
    
    // Incrementa o índice para o próximo slide
    slideIndex++; 
    
    // Lógica para "enrolar" o carrossel: Se ultrapassar o último slide, volta para o primeiro (0)
    if (slideIndex >= slides.length) {
        slideIndex = 0; 
    }
    
    slides[slideIndex].classList.add('active'); // Adiciona a classe 'active' ao slide atual
    
    // Adiciona a classe 'hover-active' (para o efeito visual) ao botão do slide ativo
    const activeButton = slides[slideIndex].querySelector('.carousel-button');
    if (activeButton) {
        activeButton.classList.add('hover-active'); // Adiciona a classe para ativar o efeito
    }

    // Define um novo timer para a próxima transição automática
    carouselInterval = setTimeout(showSlides, 5000); // # TEMPO DE TRANSIÇÃO AUTOMÁTICA (em milissegundos). Ajuste conforme preferir.
}

// Função para mudar o slide manualmente (usada pelas setas de navegação)
function changeSlide(n) {
    clearTimeout(carouselInterval); // Limpa o timer automático para evitar pular slides durante a navegação manual

    // Remove a classe 'hover-active' do botão do slide atual antes de mudar
    const currentActiveButton = slides[slideIndex].querySelector('.carousel-button');
    if (currentActiveButton) {
        currentActiveButton.classList.remove('hover-active');
    }

    // Ajusta o índice do slide baseado no valor de 'n' (+1 para próximo, -1 para anterior)
    slideIndex += n; 

    // Lógica para "enrolar" o carrossel:
    // Se o índice for menor que 0 (indo para trás do primeiro slide), vai para o último slide
    if (slideIndex < 0) { 
        slideIndex = slides.length - 1; 
    } 
    // Se o índice for maior ou igual ao número total de slides (indo para frente do último), vai para o primeiro slide
    else if (slideIndex >= slides.length) { 
        slideIndex = 0; 
    }
    
    slides.forEach(slide => slide.classList.remove('active')); // Remove 'active' de todos os slides
    slides[slideIndex].classList.add('active'); // Adiciona 'active' ao slide selecionado

    // Adiciona a classe 'hover-active' ao botão do slide recém-ativado
    const newActiveButton = slides[slideIndex].querySelector('.carousel-button');
    if (newActiveButton) {
        newActiveButton.classList.add('hover-active');
    }

    // Reinicia o timer para a transição automática após a mudança manual
    carouselInterval = setTimeout(showSlides, 5000); // # TEMPO DE TRANSIÇÃO AUTOMÁTICA APÓS INTERAÇÃO MANUAL.
}

// =========================================
// JavaScript para o Pop-up do WhatsApp e Inicialização
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrossel se houver slides
    if (slides.length > 0) {
        // Inicializa o primeiro slide como ativo e aplica o efeito visual ao botão
        slides[0].classList.add('active'); 
        const initialButton = slides[0].querySelector('.carousel-button');
        if (initialButton) {
            initialButton.classList.add('hover-active');
        }
        carouselInterval = setTimeout(showSlides, 5000); // Inicia o ciclo de transição automática
    }

    // Navegação do carrossel pelas setas do teclado (Esquerda/Direita)
    document.addEventListener('keydown', (event) => {
        // Verifica se o foco está dentro da main ou do carrossel para não interferir com outros inputs
        if (document.activeElement && (document.activeElement.closest('#main-content') || document.activeElement.closest('.carousel-container'))) { 
            if (event.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (event.key === 'ArrowRight') {
                changeSlide(1);
            }
        }
    });

    // Seleciona os elementos do pop-up
    const openWhatsappPopupBtn = document.getElementById('openWhatsappPopup');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closeWhatsappPopupBtn = document.getElementById('closeWhatsappPopup');

    // Verifica se os elementos do pop-up existem antes de adicionar event listeners
    if (openWhatsappPopupBtn && whatsappPopup && closeWhatsappPopupBtn) {
        // FUNÇÃO PARA ABRIR O POP-UP
        const showPopup = () => {
            whatsappPopup.style.display = 'flex'; // Torna o overlay visível (usando flex para centralizar)
            // Adiciona a classe 'active' após uma pequena pausa para permitir a transição CSS
            setTimeout(() => {
                whatsappPopup.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Impede o scroll da página quando o popup está aberto
            whatsappPopup.setAttribute('aria-hidden', 'false'); // Indica que o popup está visível para leitores de tela
            
            // Tenta focar no botão de fechar, ou no primeiro link/botão dentro do popup
            const focusableElements = whatsappPopup.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements.length > 0 ? focusableElements[0] : null;

            if (closeWhatsappPopupBtn) {
                closeWhatsappPopupBtn.focus(); 
            } else if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        };

        // Event listener para abrir o pop-up AO CLICAR NO BOTÃO FLUTUANTE
        openWhatsappPopupBtn.addEventListener('click', showPopup);

        // # ABRIR O POP-UP AUTOMATICAMENTE QUANDO O SITE CARREGAR
        // Este setTimeout garante que o pop-up apareça 1 segundo após o site carregar.
        setTimeout(() => {
            showPopup();
        }, 1000); // # TEMPO PARA ABRIR O POP-UP AUTOMATICAMENTE (1000ms = 1 segundo). Altere ou defina como 0 para abrir instantaneamente.

        // FUNÇÃO PARA FECHAR O POP-UP
        const hidePopup = () => {
            whatsappPopup.classList.remove('active'); // Remove a classe 'active' para iniciar a transição de saída
            // Esconde o elemento 'display: none' apenas após a transição CSS ter ocorrido
            setTimeout(() => {
                whatsappPopup.style.display = 'none';
                document.body.style.overflow = ''; // Restaura o scroll da página
                whatsappPopup.setAttribute('aria-hidden', 'true'); // Indica que o popup está escondido para leitores de tela
                openWhatsappPopupBtn.focus(); // Retorna o foco ao botão flutuante para acessibilidade
            }, 300); // O tempo aqui deve corresponder ao tempo da transição 'opacity' e 'visibility' no CSS do '.whatsapp-popup-overlay'
        };

        // Event listener para fechar o pop-up clicando no 'X'
        closeWhatsappPopupBtn.addEventListener('click', hidePopup);

        // Event listener para fechar o pop-up clicando fora da caixa de conteúdo
        whatsappPopup.addEventListener('click', (event) => {
            // Verifica se o clique foi diretamente no overlay (fundo escurecido), não nos elementos dentro do pop-up-content
            if (event.target === whatsappPopup) {
                hidePopup();
            }
        });

        // Fechar pop-up com a tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && whatsappPopup.classList.contains('active')) {
                hidePopup();
            }
        });
    }
});
