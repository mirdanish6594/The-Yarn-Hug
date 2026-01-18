// Extracted script from index.html
// --- CONFIGURATION ---
const INSTAGRAM_HANDLE = "theyarnhug";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// Expanded Product Data with descriptions and carousel images
const products = [
    {
        id: 1,
        name: "Mikasa muffler",
        category: "clothing",
        price: "₹1500.00",
        tag: "Best Seller",
        description: "The iconic Mikasa Ackerman scarf, handmade with 100% acrylic yarn. This warm and stylish muffler is perfect for any fan, providing comfort and a touch of Survey Corps spirit. Each scarf is meticulously crafted to ensure high quality and durability.",
        images: [
            "photos/mikasa-mulfer/WhatsApp Image 2025-12-09 at 17.24.31.jpeg", 
            "photos/mikasa-mulfer/WhatsApp Image 2025-12-09 at 17.24.32.jpeg", 
            "photos/mikasa-mulfer/WhatsApp Image 2025-12-09 at 17.24.44.jpeg"
        ],
        material: "100% Acrylic",
        size: "Approx. 60 inches long x 10 inches wide",
        care: "Hand wash cold, lay flat to dry."
    },
    {
        id: 2,
        name: "Medium flower bouquet",
        category: "decor",
        price: "₹1050.00",
        tag: "New",
        description: "A beautiful handmade bouquet featuring 4 premium yarn flowers. Perfect for home decor or as a unique gift that never wilts.",
        images: [
            "photos/bouquet/WhatsApp Image 2025-12-11 at 17.37.46.jpeg",
            "photos/bouquet/image.png",
            "photos/bouquet/image copy.png"

        ],
        material: "Acrylic",
        size: "Approx. 10 inches tall",
        care: "Spot clean gently."
    },
    {
        id: 3,
        name: "Muffler + hat combo",
        category: "clothing",
        price: "₹1800.00",
        tag: "Limited",
        description: "A super cozy muffler and matching hat combo, handcrafted for ultimate warmth and style. Designed specifically for kids.",
        images: [
            "photos/muflerhat/WhatsApp Image 2025-12-11 at 17.37.47.jpeg",
            "photos/muflerhat/image copy.png",
            "photos/muflerhat/image.png"
        ],
        material: "100% Acrylic",
        size: "Kids size",
        care: "Hand wash cold, lay flat to dry."
    }
];

// --- NAVIGATION LOGIC ---

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
}

function scrollToSection(id) {
    hideProductView();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function goHome() {
    hideProductView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProductView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Populate Data
    document.getElementById('pd-title').textContent = product.name;
    document.getElementById('pd-category').textContent = product.category;
    document.getElementById('pd-price').textContent = product.price;
    document.getElementById('pd-description').textContent = product.description;
    document.getElementById('pd-material').textContent = product.material;
    document.getElementById('pd-size').textContent = product.size;
    document.getElementById('pd-care').textContent = product.care;
    document.getElementById('pd-action-btn').href = INSTAGRAM_URL;

    // Handle Tag
    const tagEl = document.getElementById('pd-tag');
    if (product.tag) {
        tagEl.textContent = product.tag;
        tagEl.classList.remove('hidden');
    } else {
        tagEl.classList.add('hidden');
    }

    // Setup Carousel
    const mainImg = document.getElementById('pd-main-img');
    const thumbContainer = document.getElementById('pd-thumbnails');
    
    mainImg.src = product.images[0];
    thumbContainer.innerHTML = ''; // Clear old thumbs

    product.images.forEach((imgUrl, index) => {
        const thumb = document.createElement('button');
        thumb.className = `min-w-[70px] h-[70px] md:min-w-[80px] md:h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${index === 0 ? 'border-pink-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`;
        thumb.innerHTML = `<img src="${imgUrl}" class="w-full h-full object-cover">`;
        
        thumb.onclick = () => {
            // Update Main Image with fade
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = imgUrl;
                mainImg.style.opacity = '1';
            }, 200);

            // Update Thumb Styles
            Array.from(thumbContainer.children).forEach(c => {
                c.classList.remove('border-pink-400', 'opacity-100');
                c.classList.add('border-transparent', 'opacity-60');
            });
            thumb.classList.remove('border-transparent', 'opacity-60');
            thumb.classList.add('border-pink-400', 'opacity-100');
        };
        
        thumbContainer.appendChild(thumb);
    });

    // Show View
    const homeView = document.getElementById('home-view');
    const productView = document.getElementById('product-view');

    homeView.style.opacity = '0';
    // Wait for fade out
    setTimeout(() => {
        homeView.classList.add('hidden-view');
        productView.classList.remove('hidden-view');
        // Force reflow
        void productView.offsetWidth;
        productView.style.opacity = '1';
        window.scrollTo(0,0);
    }, 300);
}

function hideProductView() {
    const homeView = document.getElementById('home-view');
    const productView = document.getElementById('product-view');

    productView.style.opacity = '0';
    setTimeout(() => {
        productView.classList.add('hidden-view');
        homeView.classList.remove('hidden-view');
        void homeView.offsetWidth;
        homeView.style.opacity = '1';
    }, 300);
}


// --- MAIN PAGE LOGIC ---

function triggerConfetti() {
    try {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F7D1D1', '#D1E8F7', '#D1F7E2', '#E2D1F7', '#F7F2D1']
            });
        }
    } catch (e) {
        console.log("Confetti skipped", e);
    }
}

// Use standard event listener instead of overriding onload
window.addEventListener('load', function() {
    setTimeout(triggerConfetti, 500);
});

// Split observers to separate static page content from dynamic product grid
const observerOptions = { threshold: 0.1 };

// 1. Static Content Observer (Headers, About section, etc)
const staticObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            staticObserver.unobserve(entry.target); // Stop observing once shown
        }
    });
}, observerOptions);

// 2. Product Grid Observer (Needs to be reset when filtering)
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            productObserver.unobserve(entry.target); // Stop observing once shown
        }
    });
}, observerOptions);

function getInstagramLink(productName) {
    return INSTAGRAM_URL;
}

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    
    // Disconnect observer before clearing HTML to prevent "ghost" element errors
    productObserver.disconnect();
    grid.innerHTML = ''; 

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl overflow-hidden border border-gray-100 card-hover transition-all duration-300 reveal cursor-pointer group';
        card.style.transitionDelay = `${index * 100}ms`;
        
        // Add Click Handler to Card
        card.onclick = (e) => {
            if (e.target.closest('a')) return;
            showProductView(product.id);
        };
        
        const tagHtml = product.tag
            ? `<span class="absolute top-4 left-4 bg-white/90 backdrop-blur text-pink-500 text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse z-10">${product.tag}</span>`
            : '';

        card.innerHTML = `
            <div class="relative overflow-hidden">
                ${tagHtml}
                <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover transition transform group-hover:scale-110 duration-700">
                <!-- View Details Overlay -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                    <span class="bg-white/90 text-gray-600 px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-lg text-sm md:text-base">
                        View Details
                    </span>
                </div>
            </div>
            <div class="p-5 md:p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-base md:text-lg text-gray-700 leading-tight">${product.name}</h3>
                    <span class="font-hand text-lg md:text-xl text-green-600">${product.price}</span>
                </div>
                <p class="text-xs text-gray-400 uppercase tracking-wide mb-4">${product.category}</p>
                
                <a href="${getInstagramLink(product.name)}" target="_blank"
                   class="block w-full text-center bg-pastel-pink hover:bg-pink-300 text-gray-600 font-bold py-3 rounded-xl shadow-sm hover:shadow-md transition active:scale-95 flex items-center justify-center gap-2 border border-pink-100 relative z-20 text-sm md:text-base">
                    <i class="fa-brands fa-instagram text-base md:text-lg text-pink-500"></i>
                    Order on Instagram
                </a>
            </div>
        `;
        grid.appendChild(card);
        productObserver.observe(card);
    });
}

function filterProducts(category) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if(btn.textContent.toLowerCase().includes(category === 'all' ? 'all' : category)) {
            btn.classList.remove('bg-pastel-green', 'bg-pastel-blue', 'bg-pastel-purple', 'text-gray-700');
            btn.classList.add('bg-gray-800', 'text-white');
        } else {
            btn.classList.add('text-gray-700');
            btn.classList.remove('bg-gray-800', 'text-white');
            
            if(btn.textContent === 'Plushies') btn.classList.add('bg-pastel-green');
            if(btn.textContent === 'Wearables') btn.classList.add('bg-pastel-blue');
            if(btn.textContent === 'Accessories') btn.classList.add('bg-pastel-purple');
        }
    });
    renderProducts(category);
}

// Initialize
renderProducts();
document.querySelectorAll('.reveal').forEach(el => staticObserver.observe(el));
