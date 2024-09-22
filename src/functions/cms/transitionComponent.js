import onlyFrontend from "../security/onlyFrontend";

const TransitionComponent = (id) => {
    onlyFrontend(() => {
        const style = document.createElement('style');
        style.textContent = `
            .selected {
                border: 5px solid blue;
                position: relative;
                border-radius: 0.5em;
            }

            .selected::before,
            .selected::after,
            .selected .corner-top-right,
            .selected .corner-bottom-left {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                border: 2px solid blue;
                border-radius: 50%;
                background: blue;
            }

            .selected::before {
                top: -5px;
                left: -5px;
            }

            .selected::after {
                bottom: -5px;
                right: -5px;
            }

            .selected .corner-top-right {
                top: -5px;
                right: -5px;
            }

            .selected .corner-bottom-left {
                bottom: -5px;
                left: -5px;
            }
        `;
        document.head.append(style);

        const element = document.getElementById(id);
        if (element) {
            // Eliminar la clase 'selected' de cualquier otro elemento
            const previouslySelected = document.querySelector('.selected');
            if (previouslySelected && previouslySelected !== element) {
                previouslySelected.classList.remove('selected');
                // Eliminar los elementos de las esquinas adicionales del elemento previamente seleccionado
                previouslySelected.querySelectorAll('.corner-top-right, .corner-bottom-left').forEach(corner => corner.remove());
            }

            element.classList.add('selected');

            // Agregar elementos para las esquinas adicionales
            const topRightCorner = document.createElement('div');
            topRightCorner.classList.add('corner-top-right');
            element.appendChild(topRightCorner);

            const bottomLeftCorner = document.createElement('div');
            bottomLeftCorner.classList.add('corner-bottom-left');
            element.appendChild(bottomLeftCorner);

            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    console.log('Size changed:', entry.contentRect);
                }
            });

            resizeObserver.observe(element);

            return () => {
                resizeObserver.unobserve(element);
                element.classList.remove('selected');
                element.removeChild(topRightCorner);
                element.removeChild(bottomLeftCorner);
            };
        }
    });

    return null;
};

export default TransitionComponent;











