// Sample property data
const properties = [
    {
        id: 1,
        title: "新築分譲マンション",
        location: "東京都渋谷区",
        price: "6,800万円",
        rooms: "3LDK",
        area: "75㎡",
        station: "渋谷駅徒歩8分",
        features: ["新築", "駅近", "南向き"],
        image: "🏢"
    },
    {
        id: 2,
        title: "リノベーション済み戸建て",
        location: "神奈川県川崎市",
        price: "4,200万円",
        rooms: "4LDK",
        area: "95㎡",
        station: "川崎駅徒歩12分",
        features: ["リノベ済", "駐車場付", "庭付き"],
        image: "🏠"
    },
    {
        id: 3,
        title: "高層マンション最上階",
        location: "東京都港区",
        price: "1億2,000万円",
        rooms: "2LDK",
        area: "85㎡",
        station: "六本木駅徒歩5分",
        features: ["最上階", "オーシャンビュー", "高級"],
        image: "🏙️"
    },
    {
        id: 4,
        title: "ファミリー向けマンション",
        location: "千葉県柏市",
        price: "3,500万円",
        rooms: "3LDK",
        area: "70㎡",
        station: "柏駅徒歩10分",
        features: ["ファミリー向け", "学校近い", "商業施設近い"],
        image: "🏘️"
    },
    {
        id: 5,
        title: "デザイナーズマンション",
        location: "東京都新宿区",
        price: "5,800万円",
        rooms: "2LDK",
        area: "65㎡",
        station: "新宿駅徒歩6分",
        features: ["デザイナーズ", "駅近", "モダン"],
        image: "🏗️"
    },
    {
        id: 6,
        title: "中古戸建て（庭付き）",
        location: "埼玉県さいたま市",
        price: "2,800万円",
        rooms: "4LDK",
        area: "110㎡",
        station: "大宮駅徒歩15分",
        features: ["庭付き", "駐車場2台", "リフォーム済"],
        image: "🏡"
    }
];

// DOM elements
const propertiesList = document.getElementById('properties-list');
const locationInput = document.getElementById('location');
const priceRangeSelect = document.getElementById('price-range');
const roomTypeSelect = document.getElementById('room-type');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProperties(properties);
    setupEventListeners();
});

// Display properties
function displayProperties(propertiesToShow) {
    propertiesList.innerHTML = '';
    
    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesList.appendChild(propertyCard);
    });
}

// Create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    card.innerHTML = `
        <div class="property-image">${property.image}</div>
        <div class="property-info">
            <div class="property-price">${property.price}</div>
            <div class="property-title">${property.title}</div>
            <div class="property-details">
                📍 ${property.location}<br>
                🏠 ${property.rooms} / ${property.area}<br>
                🚇 ${property.station}
            </div>
            <div class="property-features">
                ${property.features.map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            <button class="contact-button" onclick="contactAboutProperty(${property.id})">
                お問い合わせ
            </button>
        </div>
    `;
    
    return card;
}

// Search functionality
function searchProperties() {
    const location = locationInput.value.toLowerCase();
    const priceRange = priceRangeSelect.value;
    const roomType = roomTypeSelect.value;
    
    let filteredProperties = properties.filter(property => {
        // Location filter
        const locationMatch = !location || 
            property.location.toLowerCase().includes(location) ||
            property.station.toLowerCase().includes(location);
        
        // Price range filter
        let priceMatch = true;
        if (priceRange) {
            const propertyPrice = parseInt(property.price.replace(/[^\d]/g, ''));
            switch(priceRange) {
                case '0-3000':
                    priceMatch = propertyPrice <= 3000;
                    break;
                case '3000-5000':
                    priceMatch = propertyPrice > 3000 && propertyPrice <= 5000;
                    break;
                case '5000-8000':
                    priceMatch = propertyPrice > 5000 && propertyPrice <= 8000;
                    break;
                case '8000+':
                    priceMatch = propertyPrice > 8000;
                    break;
            }
        }
        
        // Room type filter
        const roomMatch = !roomType || property.rooms === roomType;
        
        return locationMatch && priceMatch && roomMatch;
    });
    
    displayProperties(filteredProperties);
    
    // Show search results message
    if (filteredProperties.length === 0) {
        propertiesList.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">検索条件に一致する物件が見つかりませんでした。</p>';
    }
}

// Contact about specific property
function contactAboutProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    alert(`${property.title}についてお問い合わせいただきありがとうございます。\n\n物件ID: ${propertyId}\n価格: ${property.price}\n場所: ${property.location}\n\n担当者から24時間以内にご連絡いたします。`);
}

// Smooth scroll to properties section
function scrollToProperties() {
    document.getElementById('properties').scrollIntoView({
        behavior: 'smooth'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。24時間以内にご返信いたします。');
            contactForm.reset();
        });
    }
    
    // Search on Enter key
    [locationInput, priceRangeSelect, roomTypeSelect].forEach(element => {
        if (element) {
            element.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchProperties();
                }
            });
            
            element.addEventListener('change', function() {
                // Auto-search when filters change
                searchProperties();
            });
        }
    });
}

// Add some sample interactions
function addMoreProperties() {
    // This function could be called to dynamically add more properties
    const newProperties = [
        {
            id: 7,
            title: "駅前タワーマンション",
            location: "東京都品川区",
            price: "7,500万円",
            rooms: "2LDK",
            area: "68㎡",
            station: "品川駅徒歩3分",
            features: ["タワマン", "駅直結", "コンシェルジュ"],
            image: "🏢"
        }
    ];
    
    properties.push(...newProperties);
    displayProperties(properties);
}

// Utility function to format price
function formatPrice(price) {
    return price.toLocaleString() + '万円';
}

// Initialize map (placeholder for future Google Maps integration)
function initializeMap() {
    // Placeholder for map functionality
    console.log('Map functionality ready for integration');
}