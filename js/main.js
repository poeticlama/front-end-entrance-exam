import '../css/style.css'

document.addEventListener('DOMContentLoaded', function() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach(el => {
        const savedValue = localStorage.getItem(el.id);
        if (savedValue) {
            el.textContent = savedValue;
        }

        el.addEventListener('blur', function() {
            localStorage.setItem(this.id, this.textContent);
        });
    });
});
