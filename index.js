const PRODUCTS = [
    {
        image: "./assets/BEAUTY_CONTEST.png",
        name: "BEAUTY CONTEST TEE",
        price: "€45,20",
        size: "S M L XL",
        drop: "ScrapWorld"
    },
    {
        image: "./assets/POOLPARTY.png",
        name: "SCRAP IT TEE",
        price: "€43,20",
        size: "S M L XL",
        drop: "Fake Gods"
    },
    {
        image: "./assets/PANTS.png",
        name: "STARIGHT TO HEART PANTS",
        price: "€74,50",
        size: "40 42 44 46 48",
        drop: "Farfetch"
    },
    {
        image: "./assets/VULTURE_car.png",
        name: "VULTURE CAR FIGURE ALL BLACK",
        price: "€220,00",
        drop: "Vulture"
    },
    {
        image: "./assets/STUSSY_TEE.png",
        name: "LOCATIONS PIGMENT TEE",
        price: "€45,00",
        size: "S M L XL",
        drop: "Stussy"
    },
    {
        image: "./assets/BAG.png",
        name: "S STARS COTTON BAG",
        price: "€48,00",
        drop: "Saint Laurent"
    },
    {
        image: "./assets/PGARCIA.png",
        name: "P-GARCIA PANTS",
        price: "€350,00",
        size: "40 42 44 46 48",
        drop: "Diesel"
    },
    {
        image: "./assets/CENICERO.png",
        name: "POKER ASHTRAY",
        price: "€64,00",
        drop: "Stock X"
    },
    {
        image: "./assets/PULLOVER.png",
        name: "EXPANDING IT TEE",
        price: "€43,20",
        size: "S M L XL",
        drop: "Snipes"//
    },
    {
        image: "./assets/HOODIE_ESS.png",
        name: "HOODIE FEAR OF GOD",
        price: "€60,20",
        size: "S M L XL",
        drop: "Snipes"
    },
    {
        image: "./assets/GALLERY.png",
        name: "GALLERY DEPT SHIRT",
        price: "€170,20",
        size: "S M L XL",
        drop: "GOAT"
    },
    {
        image: "./assets/GREEN.png",
        name: "STUSSY GREEN TEE",
        price: "€67,20",
        size: "S M L XL",
        drop: "Stussy"
    },
    {
        image: "./assets/GAPBY.png",
        name: "GAP BY BALENCIAGA",
        price: "€69,00",
        size: "S M L XL",
        drop: "GOAT"
    },
    {
        image: "./assets/GALLERY_2.png",
        name: "GALLERY DEPT TEE",
        price: "€130,70",
        size: "S M L XL",
        drop: "Farfetch"
    }
    
]

// const SELLERS = ["SELLERS", "Fake Gods", "Vultures", "Diesel", "ScrapWorld", "Stussy"]


const feed = (products) => {

    const stockProducts = document.querySelector("#stock");

    for (const product of products) {
        
        //Crear elementos
        const image = document.createElement("img");
        const productName = document.createElement("h4");
        const productPrice = document.createElement("p");
        const productSize = document.createElement("p");
        const dropDate = document.createElement("p");

        //Crear divs para elementos
        const divInfo = document.createElement("div");
        const divProduct = document.createElement("div");

        //Asignar valores y clases
        image.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = product.price;
        productSize.textContent = product.size;
        dropDate.textContent = product.drop;

        divInfo.className = "elementsInfo";
        divProduct.className = "product";

        //Meter elementos en HTML
        divProduct.appendChild(image);
        divInfo.appendChild(productName);
        divInfo.appendChild(productPrice);
        divInfo.appendChild(productSize);
        divInfo.appendChild(dropDate);

        divProduct.appendChild(divInfo);

        stockProducts.appendChild(divProduct);
    }
}

feed(PRODUCTS);


//!Creando y seleccionando <select>
const selectElement = document.createElement("select");
const selectPrint = document.querySelector("#filter");
const stockProducts = document.querySelector("#stock");

const sellers = Array.from(new Set(PRODUCTS.map(product => product.drop)));


const selectSection = document.createElement("select");


sellers.forEach(seller => {
    const optionElement = document.createElement("option");
    optionElement.textContent = seller;
    optionElement.value = seller;

    selectSection.appendChild(optionElement);
    selectPrint.appendChild(selectSection);
})

//! Función para filtrar y mostrar productos según el vendedor seleccionado
selectPrint.addEventListener("change", (event) => {
    
    const selectedDrop = event.target.value;

    const selectedProducts = PRODUCTS.filter(product => product.drop === selectedDrop);

    stockProducts.innerHTML = "";

    selectedProducts.forEach(product => {
        stockProducts.innerHTML = "";
        feed(selectedProducts)
    })

    cleanButton();
})
//!__________________________________________

//!Boton buscar


function priceFilter() {

    //! Crear el input de tipo number
    const priceFilterInput = document.createElement("input");
    priceFilterInput.type = "number";
    priceFilterInput.id = "priceFilterInput";
    priceFilterInput.placeholder = "Price";

    //!Crear el botón de búsqueda
    const searchButton = document.createElement("button");
    searchButton.textContent = "Buscar";
    searchButton.id = "searchButton";

    const filterContainer = document.querySelector("#filter");

    filterContainer.appendChild(priceFilterInput);
    filterContainer.appendChild(searchButton);

    searchButton.addEventListener("click", filterByPrice);
}

priceFilter();

//? NEW MODIFIED

function filterByPrice() {

    // const maxPrice = parseFloat(document.querySelector("priceFilterInput").value);

    const maxPrice = document.querySelector("#priceFilterInput").value;

    // console.log(maxPrice);

    const filteredProducts = PRODUCTS.filter(product =>{
        const productPrice = parseFloat(product.price.replace("€", "").replace(",", "."))

        return productPrice < maxPrice;
    });

    console.log(filteredProducts);

    // stockProducts.innerHTML = "";

    filteredProducts.forEach(product => {
        stockProducts.innerHTML = "";
        feed(filteredProducts);
    })

    if (filteredProducts.length === 0) {
        stockProducts.innerHTML = "";
        const h3 = document.createElement("h3")
        h3.textContent = "No Disponible :( Prueba con otros filtros!"

        stockProducts.append(h3)
    }

    cleanButton();
}


const cleanButton = () => {

    if (!document.querySelector(".button_cleaner")) {
        const button = document.createElement("button");
        button.textContent = "Limpiar filtros";
    
        button.className = "button_cleaner"
    
        button.addEventListener("click", (event) => {
            stockProducts.innerHTML = "";
            feed(PRODUCTS);
            button.remove()
        })

        selectPrint.append(button);
    }

}

//? NEW MODIFIED

// const notResults = () => {
//     const filteredProducts = PRODUCTS.filter(product =>{
//         const productPrice = parseFloat(product.price.replace("€", "").replace(",", "."))

//         return productPrice < maxPrice;
//     });

//     console.log(filteredProducts);
// }