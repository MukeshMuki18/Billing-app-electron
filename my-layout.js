class MyLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a shadow root
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add any specific styles for your layout */
                .container-fluid {
                    display: flex;
                }
                .bg-dark {
                    background-color: #343a40;
                }
                .min-vh-100 {
                    min-height: 100vh;
                }
            </style>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span class="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li class="nav-item">
                                    <a href="home.html" class="nav-link align-middle px-0">
                                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </a>
                                </li>
                                <li id="Billing">
                                    <a href="billing.html" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                        <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Billing</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="edit_user.html" class="nav-link px-0 align-middle">
                                        <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Add/Modify Item</span></a>
                                </li>
                                <li>
                                    <a href="customer.html" class="nav-link px-0 align-middle" id="Customers">
                                        <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                                </li>
                                <li>
                                    <a href="Items.html" class="nav-link px-0 align-middle" id="Items">
                                        <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Items</span> </a>
                                </li>
                            </ul>
                            <hr>
                            <div id='signout' class="dropdown pb-4">
                                <a href="index.html" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                                    <span class="d-none d-sm-inline mx-1">Signout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col py-3"> <!-- This is the right-side content area -->
                        <slot name="content"></slot> <!-- Slot for custom content -->
                    </div>
                </div>
            </div>
        `;
    }
}

// Define the new element
customElements.define('my-layout', MyLayout);
