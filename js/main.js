import '../css/style.css'

document.addEventListener('DOMContentLoaded', function() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach(el => {
        const savedValue = localStorage.getItem(el.id);
        if (savedValue) {
            el.textContent = savedValue;
        }

        el.addEventListener('blur', async function() {
            const color = this.style.color;
            localStorage.setItem(this.id, this.textContent);
            this.style.color = '#00ff33';
            setTimeout(() => {
                this.style.color = color;
            }, 500);
        });
    });
});

function createRipple(event) {
    event.stopPropagation();
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const ripple = element.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    element.appendChild(circle);
}

const rippleAnimated = document.getElementsByClassName("ripple-animated");
for (const elem of rippleAnimated) {
    elem.addEventListener("click", createRipple);
}

document.getElementById('downloadPdf').addEventListener('click', function () {
    const rippleElements = document.querySelectorAll('.ripple');
    rippleElements.forEach(element => {
        element.remove();
    });

    const element = document.getElementById('resume');
    element.style.marginTop = '0';

    const opt = {
        filename: 'Karthik_SR_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            y: -element.offsetTop
        },
        jsPDF: {
            unit: 'px',
            format: [element.scrollWidth, element.scrollHeight + 30],
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save();
    element.style.marginTop = '2.5vh';
});

