function initDialogs() {
    const dialog = document.createElement('dialog');
    dialog.id = 'portfolio-modal'
    dialog.className = 'portfolio-dialog';
    dialog.innerHTML = `
        <div class="dialog-header">
            <h3 id="modal-title"></h3>
            <button type="button" class="close-dialog" aria-label="Close">✕</button>
        </div> 
        <div class="dialog-body" id="modal-body"></div>
    `;
    document.body.appendChild(dialog);

    const modalTitle = dialog.querySelector("#modal-title");
    const modalBody = dialog.querySelector('#modal-body');
    const closeBtn = dialog.querySelector('.close-dialog');

    document.querySelectorAll('.nav-link[data-dialog]').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-dialog');
            const content = DIALOGS_DATA[key];

            if (content) {
                dialog.setAttribute('data-active-dialog', key);
                modalTitle.textContent = content.title;
                modalBody.innerHTML = content.body;
                dialog.showModal();

                console.log(key);
                if (key === 'piano' && typeof mountPiano === 'function') {
                    console.log(true);
                    mountPiano();
                }
            }
        });
    });

    closeBtn.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

    dialog.addEventListener('close', () => {
        dialog.removeAttribute('data-active-dialog');
        if (typeof stopDemo === 'function') {
            stopDemo();
        }
    });

    dialog.addEventListener('close', () => {
        dialog.removeAttribute('data-acitive-dialog');
        if (typeof unmountPiano === 'function') {
            unmountPiano();
        }
    })
}


document.addEventListener('DOMContentLoaded', initDialogs);