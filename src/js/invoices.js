/* =========================================================
   MOBILE PAGINATION
   ========================================================= */

function updateMobilePagination() {
    const isMobile = window.innerWidth <= 640;
    const nav = document.querySelector(
        "#invoices-table_wrapper .dt-paging nav"
    );

    if (!nav || !isMobile) {
        return;
    }

    const pageInfo = table.page.info();

    const currentPage = pageInfo.page;
    const totalPages = pageInfo.pages;

    // Clear current pagination
    nav.innerHTML = "";

    let pages = [];
    let showLeftEllipsis = false;
    let showRightEllipsis = false;

    if (totalPages <= 5) {

        pages = Array.from(
            { length: totalPages },
            (_, index) => index
        );

    } else if (currentPage <= 2) {

        // Show first three pages
        pages = [0, 1, 2];
        showRightEllipsis = true;

    } else if (currentPage >= totalPages - 3) {

        // Show last four pages
        pages = [
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1
        ];

        showLeftEllipsis = true;

    } else {

        // Show pages around current page
        pages = [
            currentPage - 1,
            currentPage,
            currentPage + 1
        ];

        showLeftEllipsis = true;
        showRightEllipsis = true;
    }

    // Previous button
    const previous = document.createElement("button");

    previous.type = "button";
    previous.className =
        "dt-paging-button previous" +
        (currentPage === 0 ? " disabled" : "");

    previous.setAttribute("aria-label", "Previous");

    previous.addEventListener("click", () => {
        if (currentPage > 0) {
            table.page("previous").draw("page");
        }
    });

    nav.appendChild(previous);

    // Left ellipsis
    if (showLeftEllipsis) {
        const ellipsis = document.createElement("span");

        ellipsis.className = "dt-paging-button disabled";
        ellipsis.textContent = "...";

        nav.appendChild(ellipsis);
    }

    // Page buttons
    pages.forEach(page => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "dt-paging-button";

        if (page === currentPage) {
            button.classList.add("current");
            button.setAttribute("aria-current", "page");
        }

        button.textContent = page + 1;

        button.addEventListener("click", () => {
            table.page(page).draw("page");
        });

        nav.appendChild(button);
    });

    // Right ellipsis
    if (showRightEllipsis) {
        const ellipsis = document.createElement("span");

        ellipsis.className = "dt-paging-button disabled";
        ellipsis.textContent = "...";

        nav.appendChild(ellipsis);
    }

    // Last page
    const lastPageIndex = totalPages - 1;

    if (pages[pages.length - 1] < lastPageIndex) {
        const lastPage = document.createElement("button");

        lastPage.type = "button";
        lastPage.className = "dt-paging-button";

        if (currentPage === lastPageIndex) {
            lastPage.classList.add("current");
            lastPage.setAttribute("aria-current", "page");
        }

        lastPage.textContent = totalPages;

        lastPage.addEventListener("click", () => {
            table.page(lastPageIndex).draw("page");
        });

        nav.appendChild(lastPage);
    }

    // Next button
    const next = document.createElement("button");

    next.type = "button";
    next.className =
        "dt-paging-button next" +
        (currentPage === totalPages - 1 ? " disabled" : "");

    next.setAttribute("aria-label", "Next");

    next.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            table.page("next").draw("page");
        }
    });

    nav.appendChild(next);
}

const table = new DataTable("#invoices-table", {
    paging: true,
    pageLength: 5,
    lengthChange: false,
    info: false,
    ordering: true,

    responsive: {
        details: {
            type: "inline",
            target: "tr"
        }
    },

    pagingType: "simple_numbers",

    layout: {
        topStart: null,
        topEnd: null,
        bottomStart: "paging",
        bottomEnd: null
    },

    language: {
        paginate: {
            previous: "",
            next: ""
        }
    },

    columnDefs: [
        {
            targets: 4,
            orderable: false,
            searchable: false
        }
    ]
});

table.on("draw", updateMobilePagination);

window.addEventListener("resize", updateMobilePagination);

updateMobilePagination();
