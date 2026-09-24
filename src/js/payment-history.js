function updateMobilePagination() {
    const isMobile = window.innerWidth <= 640;
    const nav = document.querySelector(
        "#payments-table_wrapper .dt-paging nav"
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
    let showEllipsis = false;

    if (totalPages <= 5) {

        pages = Array.from(
            { length: totalPages },
            (_, index) => index
        );

    } else if (currentPage <= 2) {

        pages = [0, 1, 2, 3];
        showEllipsis = true;

    } else if (currentPage >= totalPages - 4) {

        pages = [
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1
        ];

    } else {

        pages = [
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1
        ];

        showEllipsis = true;
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

    // Ellipsis + last page
    if (showEllipsis) {
        const ellipsis = document.createElement("span");

        ellipsis.className = "dt-paging-button disabled";
        ellipsis.textContent = "...";

        nav.appendChild(ellipsis);

        const lastPage = document.createElement("button");

        lastPage.type = "button";
        lastPage.className = "dt-paging-button";

        if (currentPage === totalPages - 1) {
            lastPage.classList.add("current");
            lastPage.setAttribute("aria-current", "page");
        }

        lastPage.textContent = totalPages;

        lastPage.addEventListener("click", () => {
            table.page(totalPages - 1).draw("page");
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


const table = new DataTable("#payments-table", {
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
            targets: 6,
            orderable: false,
            searchable: false
        }
    ]
});

table.on("draw", updateMobilePagination);

window.addEventListener("resize", updateMobilePagination);

updateMobilePagination();

/* =========================================================
   STATUS FILTER
   ========================================================= */

const statusFilters = document.querySelectorAll(".status-filter-pill");

statusFilters.forEach((button) => {
    button.addEventListener("click", function () {
        const status = this.dataset.statusFilter;

        // Reset all filter buttons
        statusFilters.forEach((filter) => {
            filter.classList.remove(
                "is-active",
                "border-primary",
                "bg-primary",
                "text-white"
            );

            filter.classList.add(
                "border-border",
                "bg-white",
                "text-dark"
            );
        });

        // Set active filter
        this.classList.remove(
            "border-border",
            "bg-white",
            "text-dark"
        );

        this.classList.add(
            "is-active",
            "border-primary",
            "bg-primary",
            "text-white"
        );

        // Apply DataTables filter
        table
            .column(4)
            .search(status === "all" ? "" : status)
            .draw();
    });
});