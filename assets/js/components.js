// Site ayarları
const siteConfig = {
    name: 'Yıldız Palet',
    description: 'Ankara\'nın önde gelen palet üreticisi',
    phone: '905464035625',
    address: 'Başpınar Mah. 1074/1 Sk. no:10 Altındağ / Ankara',
    email: 'info@yildizpalet.com'
};

// WhatsApp ayarları
const whatsappConfig = {
    phoneNumber: siteConfig.phone,
    defaultMessage: 'Merhaba',
    buttonText: 'Whatsapp Destek'
};

// Header HTML içeriği
const headerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <img class="headerIndex" src="assets/images/header-logo.png" alt="${siteConfig.name} Logo - Ankara Palet Üreticisi">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Anasayfa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.html">Ürünlerimiz</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about.html">Hakkımızda</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contact.html">İletişim</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

// Footer HTML içeriği
const footerHTML = `
<div class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="logo">
         <!-- <img src="assets/images/header-logo.png" class="headerIndex" alt="${siteConfig.name} Footer Logo"> -->
        </div>
      </div>
      <!-- <div class="col-md-12">
        <div class="footer-menu">
          <ul>
            <li><a href="products.html" title="Palet Ürünlerimiz">Ürünlerimiz</a></li>
            <li><a href="about.html" title="Firmamız Hakkında">Hakkımızda</a></li>
            <li><a href="contact.html" title="İletişim Bilgilerimiz">İletişim</a></li>
          </ul>
        </div>
      </div> -->
      <!-- <div class="col-md-12">
        <div class="social-icons">
          <ul>
            <li><a href="#" title="Facebook Sayfamız" aria-label="Facebook"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#" title="Twitter Hesabımız" aria-label="Twitter"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#" title="LinkedIn Profilimiz" aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="#" title="RSS Beslemesi" aria-label="RSS"><i class="fa fa-rss"></i></a></li>
          </ul>
        </div>
      </div> -->
      <div class="col-md-12 text-center mt-4">
        <div class="footer-info-section">
          <div class="contact-info">
            <div class="info-item">
              <i class="fa fa-map-marker"></i>
              <div class="info-content">
                <h5>Adres</h5>
                <p>${siteConfig.address}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fa fa-envelope"></i>
              <div class="info-content">
                <h5>E-posta</h5>
                <p><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
              </div>
            </div>
            <div class="info-item">
              <i class="fa fa-phone"></i>
              <div class="info-content">
                <h5>Telefon</h5>
                <p><a href="tel:+${siteConfig.phone}">+${siteConfig.phone}</a></p>
              </div>
            </div>
          </div>
          <div class="copyright-section">
            <div class="divider"></div>
            <p class="copyright">
              © ${new Date().getFullYear()} <strong>${siteConfig.name}</strong> - Tüm Hakları Saklıdır
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// WhatsApp butonunu oluştur
function createWhatsAppButton(customMessage = '') {
    const message = customMessage || whatsappConfig.defaultMessage;
    const button = document.createElement('a');
    button.className = 'whatsapp-fixed';
    button.href = `https://api.whatsapp.com/send?phone=${whatsappConfig.phoneNumber}&text=${encodeURIComponent(message)}`;
    button.target = '_blank';
    button.rel = 'nofollow';
    button.setAttribute('aria-label', 'WhatsApp ile iletişime geç');
    button.innerHTML = `<i class="fa fa-whatsapp"></i> ${whatsappConfig.buttonText}`;
    return button;
}

// Sayfa yüklendiğinde header ve footer'ı ekle
document.addEventListener('DOMContentLoaded', function() {
    // Header'ı ekle
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        setActiveNavItem();
    }

    // Footer'ı ekle
    const footerContainer = document.querySelector('.footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // WhatsApp butonunu ekle
    const isProductPage = window.location.pathname.includes('single-product.html');
    const productName = isProductPage ? document.querySelector('.right-content h4')?.textContent : '';
    const message = isProductPage ? `Merhaba, ${productName} hakkında bilgi almak istiyorum` : whatsappConfig.defaultMessage;
    
    document.body.appendChild(createWhatsAppButton(message));

    // Resimlere lazy loading ekle
    addLazyLoading();
});

// Aktif menü öğesini belirle
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.parentElement.classList.add('active');
        }
    });
}

// Resimlere lazy loading ekle
function addLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', 'Yıldız Palet Ürün Görseli');
        }
    });
}