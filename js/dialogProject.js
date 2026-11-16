
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
                modalTitle.textContent = content.title;
                modalBody.innerHTML = content.body;
                dialog.showModal();
            }
        });
    });

    closeBtn.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
}


document.addEventListener('DOMContentLoaded', initDialogs);