const items = [
    
    { name: "iPhone 17 Pro Max", price: 1200, image: "images/iphone.jpg" },
    { name: "AirPods Pro", price: 250, image: "images/airpods.jpg" },
    { name: "Apple Watch Ultra", price: 800, image: "images/applewatch.jpg" },
    { name: "MacBook Pro M3", price: 1600, image: "images/macbook.jpg" },
    { name: "Oyun Bilgisayarı", price: 5000, image: "images/gaming-pc.jpg" },
    { name: "PlayStation 5", price: 500, image: "images/ps5.jpg" },
    { name: "RTX 5090 Ekran Kartı", price: 2000, image: "images/rtx5090.jpg" },
    { name: "8K OLED Televizyon", price: 10000, image: "images/oled8k.jpg" },

    
    { name: "Tesla Model S Plaid", price: 90000, image: "images/tesla.jpg" },
    { name: "Porsche 911 Turbo S", price: 230000, image: "images/porsche911.jpg" },
    { name: "Ferrari SF90", price: 550000, image: "images/ferrari.jpg" },
    { name: "Lamborghini Aventador", price: 500000, image: "images/lamborghini.jpg" },
    { name: "Rolls-Royce Phantom", price: 450000, image: "images/rollsroyce.jpg" },
    { name: "Bugatti Chiron", price: 3000000, image: "images/bugatti.jpg" },

    
    { name: "İstanbul Lüks Daire", price: 1200000, image: "images/istanbul-home.jpg" },
    { name: "Dubai Palmiyelerde Villa", price: 25000000, image: "images/dubai-villa.jpg" },
    { name: "New York Penthouse", price: 35000000, image: "images/ny-penthouse.jpg" },
    { name: "Malibu Sahil Malikânesi", price: 50000000, image: "images/malibu.jpg" },

    
    { name: "Özel Jet (Gulfstream G700)", price: 75000000, image: "images/privatejet.jpg" },
    { name: "Lüks Süper Yat", price: 300000000, image: "images/yacht.jpg" },
    { name: "Özel Ada (Küçük)", price: 100000000, image: "images/island-small.jpg" },
    { name: "Özel Ada (Büyük)", price: 750000000, image: "images/island-big.jpg" },

    
    { name: "Nükleer Enerji Santrali", price: 9000000000, image: "images/nuclear.jpg" },
    { name: "Uçak Gemisi", price: 13000000000, image: "images/aircraft-carrier.jpg" },
    { name: "Ay’a İnsanlı Görev", price: 40000000000, image: "images/moon-mission.jpg" },
    { name: "Küresel Uzay Programı", price: 90000000000, image: "images/space-program.jpg" },

    
    { name: "Simit", price: 1, image: "images/simit.jpg" },
    { name: "Ekmek", price: 1, image: "images/ekmek.jpg" },
    { name: "Sakız", price: 1, image: "images/sakiz.jpg" },
    { name: "Hamburger", price: 5, image: "images/hamburger.jpg" },
    { name: "YouTube Premium (1 Ay)", price: 14, image: "images/youtube.jpg" },
    { name: "Spotify Premium (1 Ay)", price: 12, image: "images/spotify.jpg" },

    
    { name: "X (Twitter) Gündemine Girme", price: 1000000, image: "images/twitter.jpg" },
    { name: "Wikipedia Sayfası Düzenleme", price: 50000, image: "images/wikipedia.jpg" },
    { name: "Oscar Ödülleri PR", price: 20000000, image: "images/oscar.jpg" },
    { name: "Forbes 30 Altı PR", price: 5000000, image: "images/forbes.jpg" }
];




const itemsSection = document.getElementById("items-section");
const totalSpan = document.getElementById("total");

items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-card";
itemDiv.innerHTML = `
    <div class="item-image" style="background-image:url('${item.image}')"></div>

    <div class="item-content">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price" data-price="${item.price}">
    $${item.price.toLocaleString()}
</p>


        <div class="quantity-control">
            <button class="qty-btn minus">−</button>
            <span class="qty-value">0</span>
            <button class="qty-btn plus">+</button>
        </div>
    </div>
`;


    itemsSection.appendChild(itemDiv);
});

document.querySelectorAll(".item-quantity").forEach(input => {
    input.addEventListener("input", updateTotal);
});

function animateTotal(oldTotal, newTotal) {
    let current = oldTotal;
    const step = (newTotal - oldTotal) / 50; 
    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= newTotal) || (step < 0 && current <= newTotal)) {
            current = newTotal;
            clearInterval(interval);
        }
        totalSpan.textContent = `$${Math.floor(current).toLocaleString()}`;
    }, 10);
}
const MAX_MONEY = 128_000_000_000;

function updateTotal() {
    let total = 0;
    const purchasedItems = [];

    
    document.querySelectorAll(".item-card").forEach(itemDiv => {
        const price = parseInt(itemDiv.querySelector(".item-price").dataset.price);
        const qty = parseInt(itemDiv.querySelector(".qty-value").textContent) || 0;
        total += price * qty;

        if (qty > 0) {
            purchasedItems.push({
                name: itemDiv.querySelector(".item-name").textContent,
                qty: qty
            });
        }
    });

    
    const remaining = MAX_MONEY - total;
    const percentage = Math.max((remaining / MAX_MONEY) * 100, 0);
    document.getElementById("money-bar").style.width = percentage + "%";
    document.getElementById("remaining-money").textContent = `$${remaining.toLocaleString()} kaldı`;

    
    let badge = document.getElementById("limit-badge");
    if (!badge) {
        badge = document.createElement("div");
        badge.id = "limit-badge";
        badge.classList.add("badge"); 
        document.body.appendChild(badge);
    }

    if (total >= MAX_MONEY) {
        document.body.classList.add("limit-reached"); 
        badge.classList.add("show");

        
        badge.innerHTML = `<strong>128 Milyar Dolarlık limite ulaşıldı!</strong>`;
        const list = document.createElement("div");
        list.style.marginTop = "12px";
        list.style.fontSize = "0.95rem";
        purchasedItems.forEach(item => {
            const line = document.createElement("div");
            line.textContent = `${item.name}: ${item.qty} adet`;
            list.appendChild(line);
        });
        badge.appendChild(list);

    } else {
        document.body.classList.remove("limit-reached");
        badge.classList.remove("show");
    }


    const oldTotal = parseInt(totalSpan.dataset.realTotal) || 0;
    animateTotal(oldTotal, Math.min(total, MAX_MONEY));
    totalSpan.dataset.realTotal = Math.min(total, MAX_MONEY);
}


function animateTotal(oldTotal, newTotal) {
    let current = oldTotal;
    const step = (newTotal - oldTotal) / 50;
    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= newTotal) || (step < 0 && current <= newTotal)) {
            current = newTotal;
            clearInterval(interval);
        }
        totalSpan.textContent = `$${Math.floor(current).toLocaleString()}`;
    }, 10);
}


const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".qty-value").forEach(qty => qty.textContent = 0);
    document.body.classList.remove("limit-reached");
    const badge = document.getElementById("limit-badge");
    if (badge) badge.classList.remove("show");
    updateTotal();
});


document.addEventListener("click", e => {
    if (!e.target.classList.contains("qty-btn")) return;

    const control = e.target.closest(".quantity-control");
    const valueEl = control.querySelector(".qty-value");
    let value = parseInt(valueEl.textContent);

    if (e.target.classList.contains("plus")) value++;
    if (e.target.classList.contains("minus") && value > 0) value--;

    valueEl.textContent = value;
    updateTotal();
});
