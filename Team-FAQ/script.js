document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');

    // --- Accordion Logic ---
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;
            
            // Toggle current question
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- Search Filter Logic ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        faqItems.forEach(item => {
            const questionText = item.querySelector('.question-text').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                
                // If it's hidden, also collapse it
                const questionBtn = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                if (questionBtn.getAttribute('aria-expanded') === 'true') {
                    questionBtn.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = null;
                }
            }
        });
    });
});
