const foodItems = [
            {
                id: 1,
                name: "Chicken Biryani",
                description: "Aromatic basmati rice with tender chicken and exotic spices",
                price: 99.99,
                image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMGJpcnlhbml8ZW58MHx8MHx8fDA%3D",
                category: "non-veg",
                badge: "Popular"
            },
            {
                id: 2,
                name: "Margherita Pizza",
                description: "Fresh mozzarella, tomatoes, and basil on crispy crust",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww",
                category: "veg",
                badge: "Bestseller"
            },
            {
                id: 3,
                name: "Caesar Salad",
                description: "Crisp romaine lettuce with parmesan and croutons",
                price: 40.99,
                image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
                category: "veg",
                badge: "Healthy"
            },
            {
                id: 4,
                name: "Grilled Chicken",
                description: "Perfectly seasoned grilled chicken breast with herbs",
                price: 150.99,
                image: "https://plus.unsplash.com/premium_photo-1669245207961-0281fd9396eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdyaWxsZWQlMjBjaGlja2VufGVufDB8fDB8fHww",
                category: "non-veg",
                badge: "Protein Rich"
            },
            {
                id: 5,
                name: "Chocolate Cake Slice",
                description: "Rich and moist chocolate cake with ganache frosting",
                price: 10.00,
                image: "https://images.unsplash.com/photo-1597083722160-c31d67d4af44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNob2NvbGF0ZSUyMGNha2UlMjBzbGljZXxlbnwwfHwwfHx8MA%3D%3D",
                category: "desserts",
                badge: "Sweet"
            },
            {
                id: 6,
                name: "Fresh Orange Juice",
                description: "Freshly squeezed orange juice packed with vitamin C",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
                category: "beverages",
                badge: "Fresh"
            }
            
            ,{
                id: 7,
                name: "Sambar Rice",
                description: "A delicious South Indian dish made with lentils and spices",
                price: 49.99,
                image: "https://media.istockphoto.com/id/1255857672/photo/sambar-rice-south-indian-food.jpg?s=2048x2048&w=is&k=20&c=IlZjsiGqAd0q_Wz49mAaH3FPC_pmi6nFCEhWdKFickQ=",
                category: "veg",
                badge: "popular"
            }
            ,{
                id: 8,
                name: "Paneer Butter Masala",
                description: "Cottage cheese cubes in a rich and creamy tomato-based gravy",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww",
                category: "veg",
                badge: "Bestseller"
            }
        ];

        let cart = [];
        let currentFilter = 'all';

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            renderFoodItems();
            updateCartDisplay();
        });

        // Render food items
        function renderFoodItems() {
            const foodGrid = document.getElementById('foodGrid');
            const filteredItems = currentFilter === 'all' 
                ? foodItems 
                : foodItems.filter(item => item.category === currentFilter);

            foodGrid.innerHTML = filteredItems.map(item => `
                <div class="food-card" data-category="${item.category}">
                    <div class="food-image" style="background-image: url('${item.image}')">
                        <div class="food-badge">${item.badge}</div>
                    </div>
                    <div class="food-content">
                        <h3 class="food-name">${item.name}</h3>
                        <p class="food-description">${item.description}</p>
                        <div class="food-footer">
                            <div class="food-price">₹${item.price}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                                <span class="quantity-display" id="qty-${item.id}">0</span>
                                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter categories
        function filterCategory(category) {
            currentFilter = category;
            
            // Update active category
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });
            event.target.closest('.category-card').classList.add('active');
            
            renderFoodItems();
        }

        // Quantity controls
        function increaseQuantity(itemId) {
            const item = foodItems.find(f => f.id === itemId);
            const existingItem = cart.find(c => c.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
            
            updateQuantityDisplay(itemId);
            updateCartDisplay();
            showNotification(`${item.name} added to cart!`);
        }

        function decreaseQuantity(itemId) {
            const existingItem = cart.find(c => c.id === itemId);
            
            if (existingItem && existingItem.quantity > 0) {
                existingItem.quantity -= 1;
                if (existingItem.quantity === 0) {
                    cart = cart.filter(c => c.id !== itemId);
                }
                updateQuantityDisplay(itemId);
                updateCartDisplay();
            }
        }

        function updateQuantityDisplay(itemId) {
            const qtyElement = document.getElementById(`qty-${itemId}`);
            const cartItem = cart.find(c => c.id === itemId);
            qtyElement.textContent = cartItem ? cartItem.quantity : 0;
        }

        // Cart functions
        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartBadge = document.getElementById('cartBadge');
            const cartTotal = document.getElementById('cartTotal');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartBadge.textContent = totalItems;
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.6); padding: 2rem;">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                        </div>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                `).join('');
            }
        }

        function removeFromCart(itemId) {
            cart = cart.filter(c => c.id !== itemId);
            updateQuantityDisplay(itemId);
            updateCartDisplay();
        }

        // Action button functions
        function showMenu() {
            document.querySelector('.food-section').scrollIntoView({ behavior: 'smooth' });
            showNotification('Showing full menu!');
        }

        function showSpecials() {
            filterCategory('all');
            showNotification('Check out our special items!');
        }

        function showOrders() {
            showNotification('Order history feature coming soon!');
        }

        function showRewards() {
            showNotification('Rewards program launching soon!');
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Order placed! Total: ₹${total.toFixed(2)}`);
            
            // Reset cart
            cart = [];
            updateCartDisplay();
            foodItems.forEach(item => updateQuantityDisplay(item.id));
            toggleCart();
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const foodCards = document.querySelectorAll('.food-card');
            
            foodCards.forEach(card => {
                const foodName = card.querySelector('.food-name').textContent.toLowerCase();
                const foodDesc = card.querySelector('.food-description').textContent.toLowerCase();
                
                if (foodName.includes(searchTerm) || foodDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });

        // Notification system
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartButton = e.target.closest('[onclick*="toggleCart"]');
            
            if (!cartSidebar.contains(e.target) && !cartButton && cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        });
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98a5178171574da5',t:'MTc1OTc1MzAwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();