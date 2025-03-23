document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    const swapBtn = document.querySelector('.swap-btn');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    swapBtn.addEventListener('click', () => {
        const fromValue = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = fromValue;
        
        swapBtn.classList.add('rotating');
        setTimeout(() => {
            swapBtn.classList.remove('rotating');
        }, 300);
    });
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-toggle')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
    
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('login-modal');
    const modalClose = document.querySelector('.modal-close');
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.getElementById('username').focus();
        }, 100);
    });
    
    modalClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    const sliderPrev = document.querySelector('.slider-arrow.prev');
    const sliderNext = document.querySelector('.slider-arrow.next');
    const tourismCards = document.querySelector('.tourism-cards');
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.tourism-card').length;
    let slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    
    function updateSlider() {
        const cardWidth = tourismCards.querySelector('.tourism-card').offsetWidth;
        const gap = 30;
        const translateX = -(currentSlide * (cardWidth + gap));
        
        tourismCards.style.transform = `translateX(${translateX}px)`;
        tourismCards.style.transition = 'transform 0.3s ease';
    }
    
    function initSlider() {
        tourismCards.style.display = 'flex';
        tourismCards.style.gap = '30px';
        tourismCards.style.transition = 'transform 0.3s ease';
        
        if (totalSlides <= slidesToShow) {
            sliderPrev.style.display = 'none';
            sliderNext.style.display = 'none';
        } else {
            sliderPrev.style.display = 'flex';
            sliderNext.style.display = 'flex';
        }
    }
    
    sliderNext.addEventListener('click', () => {
        if (currentSlide < totalSlides - slidesToShow) {
            currentSlide++;
            updateSlider();
        } else {
            currentSlide = 0;
            updateSlider();
        }
    });
    
    sliderPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        } else {
            currentSlide = totalSlides - slidesToShow;
            updateSlider();
        }
    });
    
    initSlider();
    
    window.addEventListener('resize', () => {
        currentSlide = 0;
        
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 1024) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        
        initSlider();
        updateSlider();
    });
    
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            
            let isValid = true;
            let errorMessage = '';
            
            if (!from) {
                isValid = false;
                errorMessage += 'Please enter departure station.\n';
                document.getElementById('from').classList.add('error');
            }
            
            if (!to) {
                isValid = false;
                errorMessage += 'Please enter arrival station.\n';
                document.getElementById('to').classList.add('error');
            }
            
            if (!date) {
                isValid = false;
                errorMessage += 'Please select a date of journey.\n';
                document.getElementById('date').classList.add('error');
            }
            
            if (from && to && from === to) {
                isValid = false;
                errorMessage += 'Departure and arrival stations cannot be the same.\n';
                document.getElementById('from').classList.add('error');
                document.getElementById('to').classList.add('error');
            }
            
            if (!isValid) {
                alert(errorMessage);
            } else {
                alert('Searching for trains... This would redirect to search results page.');
            }
        });
        
        const inputs = bookingForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .route-card, .tourism-card, .app-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    const stations = [
        'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 
        'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
        'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
        'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana'
    ];
    
    const fromInputAutocomplete = document.getElementById('from');
    const toInputAutocomplete = document.getElementById('to');
    
    function setupAutocomplete(input) {
        if (!input) return;
        
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            
            const existingList = document.getElementById('suggestions-list');
            if (existingList) {
                existingList.remove();
            }
            
            if (value.length < 2) return;
            
            const filteredStations = stations.filter(station => 
                station.toLowerCase().includes(value)
            );
            
            if (filteredStations.length > 0) {
                const suggestionsList = document.createElement('ul');
                suggestionsList.id = 'suggestions-list';
                suggestionsList.className = 'suggestions-list';
                
                filteredStations.forEach(station => {
                    const item = document.createElement('li');
                    item.textContent = station;
                    item.addEventListener('click', () => {
                        input.value = station;
                        suggestionsList.remove();
                    });
                    suggestionsList.appendChild(item);
                });
                
                const inputRect = input.getBoundingClientRect();
                suggestionsList.style.position = 'absolute';
                suggestionsList.style.top = `${inputRect.bottom}px`;
                suggestionsList.style.left = `${inputRect.left}px`;
                suggestionsList.style.width = `${inputRect.width}px`;
                suggestionsList.style.zIndex = '100';
                suggestionsList.style.backgroundColor = 'white';
                suggestionsList.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                suggestionsList.style.borderRadius = '8px';
                suggestionsList.style.maxHeight = '200px';
                suggestionsList.style.overflowY = 'auto';
                
                document.body.appendChild(suggestionsList);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (e.target !== input) {
                const suggestionsList = document.getElementById('suggestions-list');
                if (suggestionsList) {
                    suggestionsList.remove();
                }
            }
        });
    }
    
    setupAutocomplete(fromInputAutocomplete);
    setupAutocomplete(toInputAutocomplete);
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.value = formattedDate;
        dateInput.min = formattedDate;
    }
    
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
});