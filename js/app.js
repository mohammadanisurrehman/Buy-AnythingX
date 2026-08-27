const CAT_LABELS = {
    'ladies-unstitched': 'Ladies Unstitched',
    'ladies-stitched': 'Ladies Stitched',
    'abayas': 'Abayas',
    'gents-unstitched': 'Gents Unstitched',
    'home': 'Kitchen & Home'
  };

 const PRODUCTS = [
  {id:1, cat:'gents-unstitched', name:"J. Premium Quality Unstitched Fabric for Men", price:2200, was:4200, img:"images/gents-unstiched.jpeg", badge:"Premium"},
  {id:2, cat:'ladies-stitched', name:"Silk Long Printed 2 Piece Ladies Suit", price:2250, img:"images/silk-long-printed(2pc).jpeg", badge:"New"},
  {id:2, cat:'ladies-stitched', name:"Obsidian Luxe Soft Cotton 2 Piece Ladies Suit", price:1900, img:"images/obsidian luxe 2pc.jpeg", badge:"New"},
  {id:7, cat:'ladies-unstitched', name:"Hit Article 3 Piece Fancy Ladies Suit - Summer Collection", price:3850, img:"images/Hit-Article-3Pc-Fancy-in-Summer-Collection.jpeg"},
  {id:7, cat:'ladies-unstitched', name:"Jazmin Hit Article 3 Piece Unstitched Suit", price:2650, img:"images/jazmin-3pc-hit-article.jpeg"},
  {id:10, cat:'gents-unstitched', name:"Gul Ahmed Wash & Wear Premium Quality Unstitched Fabric", price:2350, img:"images/gul-ahmed-.jpeg"},
  {id:5, cat:'home', name:"Foldable Laptop Table for Home & Office", price:1700, img:"images/Laptop table.jpeg"},
  {id:6, cat:'home', name:"Digital Weight Scale - 180kg Capacity", price:1800, img:"images/weight-scale.jpeg", badge:"New"},
  {id:7, cat:'ladies-unstitched', name:"Hit Article 3 Piece Unstitched Ladies Suit", price:3350, img:"images/hit-article-3pc.jpeg"},
  {id:5, cat:'home', name:"Rechargeable Coffee Beater - USB Charging 3-Speed Hand Blender", price:1050, img:"images/Coffe Beater.jpeg"},
  {id:5, cat:'home', name:"Foldable Electric Mini Washing Machine", price:3400, img:"images/MINI Washing Machine.jpg"},
  {id:2, cat:'ladies-stitched', name:"Dream Drape 3 Piece Suit with Chiffon Dupatta", price:2499, img:"images/DREAM-DRAPE.jpeg"},
  {id:2, cat:'ladies-stitched', name:"New Heart Embroidery 3 Piece Suit with Chiffon Dupatta", price:2699, img:"images/HEART-EMBROIDERY-(3PC).jpeg"},
  {id:7, cat:'ladies-unstitched', name:"Maria B Hit Article Unstitched Ladies Suit", price:2450, img:"images/maria-b.jpeg"},
  {id:20, cat:'abayas', name:"Al-Lamsa Embroidery Nida Abaya", price:2750, img:"images/al-lamsa-abaya.jpeg", badge:"New"},
  {id:20, cat:'abayas', name:"Evy Mist Abaya with Stoller", price:2450, img:"images/evy-mist-abaya.jpeg", badge:"New"},
  {id:10, cat:'gents-unstitched', name:"Alkaram Hit Article Unstitched Fabric for Men", price:2450, img:"images/alkaram-gents.jpeg"}
];

  let cart = {};

  function productCardHTML(p){
    return `
      <div class="product-card">
        <div class="product-img">
          <div class="product-badges">
            ${p.badge ? `<span class="seal ${p.badge==='Sale'?'sale':''}">${p.badge}</span>` : ''}
          </div>
          <img src="${p.img}" alt="${p.name}">
          <div class="quick-add" onclick="addToCart(${p.id})">+ Add to Bag</div>
        </div>
        <div class="product-info">
          <span class="cat-label">${CAT_LABELS[p.cat] || p.cat}</span>
          <h4>${p.name}</h4>
          <div class="price-row">
            <span class="now">Rs. ${p.price.toLocaleString()}</span>
            ${p.was ? `<span class="was">Rs. ${p.was.toLocaleString()}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderCategorySections(){
    document.querySelectorAll('[data-cat-section]').forEach(grid => {
      const cat = grid.getAttribute('data-cat-section');
      const items = PRODUCTS.filter(p => p.cat === cat);
      grid.innerHTML = items.map(productCardHTML).join('');
    });
  }

  function addToCart(id){ cart[id] = (cart[id] || 0) + 1; updateCartUI(); openDrawer(); }
  function changeQty(id, delta){ cart[id] = (cart[id] || 0) + delta; if(cart[id] <= 0) delete cart[id]; updateCartUI(); }
  function removeFromCart(id){ delete cart[id]; updateCartUI(); }
  function cartTotal(){ return Object.entries(cart).reduce((sum,[id,qty]) => { const p = PRODUCTS.find(x => x.id == id); return sum + (p ? p.price * qty : 0); }, 0); }
  function cartCountTotal(){ return Object.values(cart).reduce((a,b)=>a+b,0); }

  function updateCartUI(){
    document.getElementById('cartCount').textContent = cartCountTotal();
    const body = document.getElementById('drawerBody');
    const foot = document.getElementById('drawerFoot');
    const ids = Object.keys(cart);
    if(ids.length === 0){
      body.innerHTML = `<div class="empty-cart">Your bag is empty.<br>Add something you like.</div>`;
      foot.style.display = 'none';
      return;
    }
    foot.style.display = 'block';
    body.innerHTML = ids.map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      const qty = cart[id];
      return `
        <div class="cart-line">
          <img src="${p.img}" alt="${p.name}">
          <div class="cl-info">
            <h5>${p.name}</h5>
            <div class="cl-meta">${CAT_LABELS[p.cat] || p.cat}</div>
            <div class="qty-row">
              <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
              <span>${qty}</span>
              <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
              <span class="cl-price">Rs. ${(p.price*qty).toLocaleString()}</span>
            </div>
            <div class="cl-remove" onclick="removeFromCart(${p.id})">Remove</div>
          </div>
        </div>
      `;
    }).join('');
    document.getElementById('subtotalAmt').textContent = 'Rs. ' + cartTotal().toLocaleString();
  }

  function openDrawer(){ document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('open'); }
  function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('open'); }

  function openCheckout(){
    if(cartCountTotal() === 0) return;
    document.getElementById('modalTotal').textContent = 'Rs. ' + cartTotal().toLocaleString();
    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('successNote').classList.remove('show');
  }
  function closeCheckout(){ document.getElementById('checkoutModal').classList.remove('open'); }

  function selectPay(mode){
    document.getElementById('payCOD').classList.toggle('selected', mode==='cod');
    document.getElementById('payOnline').classList.toggle('selected', mode==='online');
  }

  const STORE_WHATSAPP = "923491483899"; // your WhatsApp number, international format

  function buildOrderMessage(name, phone, address, city, payMethod){
    const lines = Object.keys(cart).map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      const qty = cart[id];
      return `- ${p.name} x${qty} = Rs. ${(p.price*qty).toLocaleString()}`;
    });
    const msg =
`New Order — Buy AnythingX

Name: ${name}
Phone: ${phone}
Address: ${address}
City: ${city}
Payment: ${payMethod}

Items:
${lines.join('\n')}

Total: Rs. ${cartTotal().toLocaleString()}`;
    return msg;
  }

  function placeOrder(){
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const city = document.getElementById('custCity').value;
    const payMethod = document.getElementById('payOnline').classList.contains('selected') ? 'Pay Online' : 'Cash on Delivery';

    if(!name || !phone || !address){
      alert('Please fill your name, phone, and address before placing the order.');
      return;
    }

    const message = buildOrderMessage(name, phone, address, city, payMethod);
    const waUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('successNote').classList.add('show');
    cart = {};
    updateCartUI();
  }

  renderCategorySections();
  updateCartUI();

  // ---------- Hero slider ----------
  const heroSlideEls = document.querySelectorAll('.hero-slide');
  const heroDotsWrap = document.getElementById('heroDots');
  let heroIndex = 0, heroTimer;
  heroSlideEls.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
    dot.onclick = () => { goHero(i); resetHeroTimer(); };
    heroDotsWrap.appendChild(dot);
  });
  function goHero(i){
    heroIndex = (i + heroSlideEls.length) % heroSlideEls.length;
    heroSlideEls.forEach((s,idx) => s.classList.toggle('active', idx === heroIndex));
    document.querySelectorAll('.hero-dot').forEach((d,idx) => d.classList.toggle('active', idx === heroIndex));
  }
  function shiftHero(delta){ goHero(heroIndex + delta); resetHeroTimer(); }
  function resetHeroTimer(){ clearInterval(heroTimer); heroTimer = setInterval(() => goHero(heroIndex + 1), 5000); }
  resetHeroTimer();

  // ---------- Featured carousel ----------
  const featuredTrack = document.getElementById('featuredTrack');
  function renderFeatured(){
    featuredTrack.innerHTML = PRODUCTS.map(productCardHTML).join('');
  }
  renderFeatured();
  function shiftCarousel(delta){ featuredTrack.scrollBy({left: delta * 280, behavior:'smooth'}); }

  // ---------- Testimonial slider ----------
  const testiSlideEls = document.querySelectorAll('.testi-slide');
  const testiDotsWrap = document.getElementById('testiDots');
  let testiIndex = 0, testiTimer;
  testiSlideEls.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i+1));
    dot.onclick = () => { goTesti(i); resetTestiTimer(); };
    testiDotsWrap.appendChild(dot);
  });
  function goTesti(i){
    testiIndex = (i + testiSlideEls.length) % testiSlideEls.length;
    testiSlideEls.forEach((s,idx) => s.classList.toggle('active', idx === testiIndex));
    document.querySelectorAll('.testi-dot').forEach((d,idx) => d.classList.toggle('active', idx === testiIndex));
  }
  function resetTestiTimer(){ clearInterval(testiTimer); testiTimer = setInterval(() => goTesti(testiIndex + 1), 4500); }
  resetTestiTimer();

  // ---------- Scroll reveal ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));