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

document.getElementById('downloadPdf').addEventListener('click', function () {
    const element = document.getElementById('resume');
    const name = document.getElementById('name').textContent.trim();

    const opt = {
        filename:  `${name}_Resume.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: 'px',
            format: [element.offsetWidth, element.scrollHeight],
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save();
});
