let currentPage = 1;
const ITEMS_PER_PAGE = 3;

function getPagination(items, page, perPage) {
    const totalPages = Math.ceil(items.length / perPage);
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    const startIndex = (validPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return {
        data: items.slice(startIndex, endIndex),
        currentPage: validPage,
        totalPages: totalPages,
        hasPrev: validPage > 1,
        hasNext: validPage < totalPages
    }
}

function renderProjectCards(projects) {
    const projectList = document.querySelector('.project-list');
    const bio = document.querySelector('.bio');

    if (!projectList) return;

    if (!projects || !projects.length) {
        projectList.innerHTML = `<p>No projects found.</p>`;
        return;
    }

    projectList.innerHTML = projects.map(project => `
        <a href="${project.link}" target="_blank" rel="noreferrer" class="project-card">
            <div class="project-meta">${project.meta}</div>
            <div class="project-details">
                <h4>${project.title} <span class="arrow">↗</span></h4>
                <p>${project.description}</p>
                <ul class="tech-tags">
                    ${project.tags.map(tag => `<li>${tag}</li>`).join('')}
                </ul>
            </div>
        </a>
    `).join('');

    bio.innerHTML = BIO;
}

function renderPaginationControls(meta) {
    const paginationNav = document.getElementById('pagination-controls');
    const pageIndicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!paginationNav) return;

    if (meta.totalPages <= 1) {
        paginationNav.style.display = 'none';
        return;
    }

    paginationNav.style.display = 'flex';
    pageIndicator.textContent = `${meta.currentPage} of ${meta.totalPages}`;
    prevBtn.disabled = !meta.hasPrev;
    nextBtn.disabled = !meta.hasNext;

}

function updateView() {
    const paginationResult = getPagination(PROJECTS_DATA, currentPage, ITEMS_PER_PAGE);

    currentPage = paginationResult.currentPage;

    renderProjectCards(paginationResult.data);
    renderPaginationControls(paginationResult);
}


document.addEventListener('DOMContentLoaded', () => {
    updateView();

    document.getElementById('prev-btn')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateView();
        }
    });

    document.getElementById('next-btn')?.addEventListener('click', () => {
        const paginationResult = getPagination(PROJECTS_DATA, currentPage, ITEMS_PER_PAGE);
        if (paginationResult.hasNext) {
            currentPage++;
            updateView();
        }
    });

});