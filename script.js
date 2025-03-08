document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelector(".dots");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  let currentSlide = 0;

  slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dots.appendChild(dot);
  });

  function goToSlide(n) {
      slides[currentSlide].classList.remove("active");
      document.querySelectorAll(".dot")[currentSlide].classList.remove("active");
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      document.querySelectorAll(".dot")[currentSlide].classList.add("active");
  }

  function nextSlide() {
      goToSlide(currentSlide + 1);
  }

  function prevSlide() {
      goToSlide(currentSlide - 1);
  }

  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);

  // Event listeners
  prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      prevSlide();
      slideInterval = setInterval(nextSlide, 5000);
  });

  nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, 5000);
  });

  // Mobile Menu
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
      const expanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
      menuBtn.setAttribute("aria-expanded", !expanded);
  });

  // Booking Form
  const teeTimeForm = document.getElementById("teeTimeForm");
  
  if (teeTimeForm) {
      const dateInput = document.getElementById("date");
      
      // Set min date to tomorrow and max date to 14 days from now
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const twoWeeksLater = new Date();
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

      dateInput.min = tomorrow.toISOString().split("T")[0];
      dateInput.max = twoWeeksLater.toISOString().split("T")[0];
      
      teeTimeForm.addEventListener("submit", function(e) {
          e.preventDefault();
          
          // Show success notification
          Swal.fire({
              title: "Booking Successful!",
              text: "We'll send you a confirmation email shortly.",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#1a472a"
          });
          
          this.reset();
      });
  }

  // Accessibility enhancement - Skip to content
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main landmark if not present
  if (!document.querySelector("main")) {
      const mainContent = document.querySelector("#home").parentNode;
      const main = document.createElement("main");
      main.id = "main";
      main.setAttribute("tabindex", "-1");
      
      // Move content inside main
      while (mainContent.childNodes.length) {
          main.appendChild(mainContent.childNodes[0]);
      }
      
      mainContent.appendChild(main);
  }
});

// تبديل اللغة
const langToggle = document.getElementById('langToggle');
const htmlElement = document.documentElement;
let currentLang = 'ar';

// قاموس الترجمات
const translations = {
  // القائمة العلوية
  'nav-home': {
      'ar': 'الرئيسية',
      'en': 'Home'
  },
  'nav-about': {
      'ar': 'عن النادي',
      'en': 'About'
  },
  'nav-facilities': {
      'ar': 'المرافق',
      'en': 'Facilities'
  },
  'nav-packages': {
      'ar': 'الباقات',
      'en': 'Packages'
  },
  'nav-booking': {
      'ar': 'احجز الآن',
      'en': 'Book Now'
  },
  'nav-contact': {
      'ar': 'اتصل بنا',
      'en': 'Contact'
  },
  'book-btn': {
      'ar': 'احجز موعد اللعب',
      'en': 'Book Tee Time'
  },
  
  // الصفحة الرئيسية
  'hero-title-1': {
      'ar': 'مرحباً بكم في نادي الجولف النخبة',
      'en': 'Welcome to Hole in One Golf Resort'
  },
  'hero-desc-1': {
      'ar': 'استمتع بمزيج مثالي من التقاليد والفخامة',
      'en': 'Experience the perfect blend of tradition and luxury'
  },
  'hero-btn-1': {
      'ar': 'استكشف الملاعب',
      'en': 'Explore Courses'
  },
  'hero-title-2': {
      'ar': 'ملاعب البطولات',
      'en': 'Championship Courses'
  },
  'hero-desc-2': {
      'ar': 'مصممة للمبتدئين والمحترفين على حد سواء',
      'en': 'Designed for beginners and professionals alike'
  },
  'hero-btn-2': {
      'ar': 'احجز الآن',
      'en': 'Book Now'
  },
  'hero-title-3': {
      'ar': 'مرافق متميزة',
      'en': 'Premium Facilities'
  },
  'hero-desc-3': {
      'ar': 'وسائل راحة عالمية المستوى لتجربة جولف لا تُنسى',
      'en': 'World-class amenities for an unforgettable golf experience'
  },
  'hero-btn-3': {
      'ar': 'اعرف المزيد',
      'en': 'Learn More'
  },
  
  // قسم عن النادي
  'about-title': {
      'ar': 'عن هولو ان ون',
      'en': 'About Hole in One '
  },
  'about-subtitle': {
      'ar': 'إرث من التميز',
      'en': 'A Legacy of Excellence'
  },
  'about-p1': {
      'ar': 'تأسس نادي الجولف النخبة عام 1985، وأصبح الوجهة الأولى للعبة الجولف في الأردن. يقع النادي وسط المناظر الطبيعية الخلابة في العقبة، ويوفر إطلالات رائعة على البحر الأحمر والجبال المحيطة.',
      'en': 'Established in 1985, Hole in One Golf Resort has become the premier destination for golf in Portugal. The resort is nestled among stunning landscapes, offering breathtaking views of the Atlantic Ocean and surrounding hills.'
  },
  'about-p2': {
      'ar': 'صمم ملاعبنا للبطولات المهندس المعماري الشهير روبرت ترنت جونز جونيور، حيث جمع بين اللعب التحدي والجمال الطبيعي المذهل. سواء كنت محترفًا متمرسًا أو بدأت للتو رحلتك في لعبة الجولف، توفر ملاعبنا تجربة لا تُنسى للاعبين من جميع المستويات.',
      'en': 'Our championship courses were designed by renowned architect Robert Trent Jones Jr., combining challenging play with stunning natural beauty. Whether you\'re a seasoned pro or just beginning your golf journey, our courses provide an unforgettable experience for players of all levels.'
  },
  
  // المميزات
  'feature-title-1': {
      'ar': 'ملاعب البطولات',
      'en': 'Championship Courses'
  },
  'feature-desc-1': {
      'ar': 'ثلاثة ملاعب عالمية المستوى بـ 18 حفرة ومستويات صعوبة متنوعة',
      'en': 'Three world-class 18-hole courses with varying difficulty levels'
  },
  'feature-title-2': {
      'ar': 'مطعم فاخر',
      'en': 'Fine Dining'
  },
  'feature-desc-2': {
      'ar': 'مطعم راقي مع إطلالات بانورامية على الملعب',
      'en': 'Elegant restaurant with panoramic views of the course'
  },
  'feature-title-3': {
      'ar': 'أكاديمية الجولف',
      'en': 'Golf Academy'
  },
  'feature-desc-3': {
      'ar': 'تدريب احترافي لجميع الأعمار والمستويات',
      'en': 'Professional training for all ages and skill levels'
  },
  'feature-title-4': {
      'ar': 'مركز العافية',
      'en': 'Wellness Center'
  },
  'feature-desc-4': {
      'ar': 'مرافق سبا ولياقة بدنية فاخرة للاسترخاء التام',
      'en': 'Luxury spa and fitness facilities for complete relaxation'
  },
  
  // الإحصائيات
  'stat-text-1': {
      'ar': 'حفرة جولف',
      'en': 'Golf Holes'
  },
  'stat-text-2': {
      'ar': 'مدرب محترف',
      'en': 'Professional Trainers'
  },
  'stat-text-3': {
      'ar': 'زائر سنوياً',
      'en': 'Annual Visitors'
  },
  'stat-text-4': {
      'ar': 'بطولة دولية استضافها النادي',
      'en': 'International Tournaments Hosted'
  },
  
  // قسم الحجز
  'booking-title': {
      'ar': 'احجز موعد اللعب',
      'en': 'Book Your Tee Time'
  },
  'date-label': {
      'ar': 'اختر التاريخ',
      'en': 'Select Date'
  },
  'time-label': {
      'ar': 'الوقت المفضل',
      'en': 'Preferred Time'
  },
  'time-placeholder': {
      'ar': 'اختر الوقت',
      'en': 'Select Time'
  },
  'course-label': {
      'ar': 'اختر الملعب',
      'en': 'Select Course'
  },
  'course-placeholder': {
      'ar': 'اختر الملعب',
      'en': 'Select Course'
  },
  'course-option-1': {
      'ar': 'ملعب البطولة',
      'en': 'Championship Course'
  },
  'course-option-2': {
      'ar': 'ملعب الروابط',
      'en': 'Links Course'
  },
  'course-option-3': {
      'ar': 'الملعب التنفيذي',
      'en': 'Sea View Course'
  },
  'players-label': {
      'ar': 'عدد اللاعبين',
      'en': 'Number of Players'
  },
  'players-placeholder': {
      'ar': 'اختر عدد اللاعبين',
      'en': 'Select Number of Players'
  },
  'players-option-1': {
      'ar': 'لاعب واحد',
      'en': '1 Player'
  },
  'players-option-2': {
      'ar': 'لاعبان',
      'en': '2 Players'
  },
  'players-option-3': {
      'ar': '3 لاعبين',
      'en': '3 Players'
  },
  'players-option-4': {
      'ar': '4 لاعبين',
      'en': '4 Players'
  },
  'extras-label': {
      'ar': 'خدمات إضافية',
      'en': 'Additional Services'
  },
  'extras-option-1': {
      'ar': 'عربة الجولف',
      'en': 'Golf Cart'
  },
  'extras-option-2': {
      'ar': 'استئجار مضارب',
      'en': 'Club Rental'
  },
  'extras-option-3': {
      'ar': 'خدمة حامل المضارب',
      'en': 'Caddie Service'
  },
  'extras-option-4': {
      'ar': 'درس احترافي',
      'en': 'Professional Lesson'
  },
  'notes-label': {
      'ar': 'طلبات خاصة',
      'en': 'Special Requests'
  },
  'notes-placeholder': {
      'ar': 'أي طلبات أو ملاحظات خاصة',
      'en': 'Any special requests or notes'
  },
  'book-submit': {
      'ar': 'احجز الآن',
      'en': 'Book Now'
  },
  
  // معلومات الحجز
  'booking-info-title': {
      'ar': 'معلومات الحجز',
      'en': 'Booking Information'
  },
  'policies-title': {
      'ar': 'السياسات العامة',
      'en': 'General Policies'
  },
  'policy-1': {
      'ar': 'الحجز المسبق متاح حتى 14 يوماً',
      'en': 'Advance booking available up to 14 days'
  },
  'policy-2': {
      'ar': 'سياسة الإلغاء: يجب الإشعار قبل 24 ساعة',
      'en': 'Cancellation policy: 24-hour notice required'
  },
  'policy-3': {
      'ar': 'تسجيل الوصول قبل 30 دقيقة من موعد اللعب',
      'en': 'Check-in 30 minutes before tee time'
  },
  'policy-4': {
      'ar': 'يجب ارتداء الزي المناسب للعبة الجولف',
      'en': 'Proper golf attire required'
  },
  
  // الباقات
  'packages-title': {
      'ar': 'عروض خاصة',
      'en': 'Special Offers'
  },
  'package-title-1': {
      'ar': 'باقة خمس جولات',
      'en': 'Five Rounds Package'
  },
  'package-desc-1': {
      'ar': 'إقامة كاملة لمدة خمس ليالٍ في جناح فاخر، خمس جولات - 18 حفرة، جولة واحدة مضمونة في ملعب سي فيو الشهير، جلسة تدريب رقمية مجانية',
      'en': 'Five-night full board stay in a luxury suite, five 18-hole rounds, one guaranteed round on the famous Sea View course, free digital training session'
  },
  'package-title-2': {
      'ar': 'الجولة الثلاثية',
      'en': 'Triple Tee Package'
  },
  'package-desc-2': {
      'ar': 'إقامة لمدة ليلتين في غرفة مزدوجة مع وجبة الإفطار، ثلاث جولات - 18 حفرة، تشمل خوض جولة واحدة في ملعب سي فيو الشهير، تأجير مجاني للعربات، خصم 20% لمتجر المحترفين',
      'en': 'Two-night stay in a double room with breakfast, three 18-hole rounds including one on the famous Sea View course (if available), free cart rental, 20% discount at the pro shop'
  },
  'package-title-3': {
      'ar': 'استراحة استجمام',
      'en': 'Relaxation Break'
  },
  'package-desc-3': {
      'ar': 'إقامة لليلة واحدة مع وجبة إفطار كاملة، تناول العشاء في أي من مطاعم المنتجع، الوصول إلى الملاعب (تطبق الرسوم ويستبعد ملعب سي فيو)، تأجير نادي مجاني',
      'en': 'One-night stay with full breakfast, dinner at any resort restaurant, access to courses (fees apply, Sea View excluded), free club rental'
  },
  
  // التذييل
  'footer-tagline': {
      'ar': 'استمتع بمزيج مثالي من التقاليد والفخامة',
      'en': 'Experience the perfect blend of tradition and luxury'
  },
  'address': {
      'ar': '123 شارع نادي الجولف<br>البرتغال',
      'en': '123 Golf Resort Road<br>Portugal'
  },
  'quick-links': {
      'ar': 'روابط سريعة',
      'en': 'Quick Links'
  },
  'footer-home': {
      'ar': 'الرئيسية',
      'en': 'Home'
  },
  'footer-about': {
      'ar': 'عن النادي',
      'en': 'About Us'
  },
  'footer-courses': {
      'ar': 'الملاعب',
      'en': 'Courses'
  },
  'footer-contact': {
      'ar': 'اتصل بنا',
      'en': 'Contact Us'
  },
  'footer-booking': {
      'ar': 'احجز الآن',
      'en': 'Book Now'
  },
  'footer-events': {
      'ar': 'الفعاليات',
      'en': 'Events'
  },
  'footer-facilities': {
      'ar': 'المرافق',
      'en': 'Facilities'
  },
  'connect-with-us': {
      'ar': 'تواصل معنا',
      'en': 'Connect With Us'
  },
  'newsletter-title': {
      'ar': 'اشترك في نشرتنا الإخبارية',
      'en': 'Subscribe to Our Newsletter'
  },
  'newsletter-placeholder': {
      'ar': 'أدخل بريدك الإلكتروني',
      'en': 'Enter your email'
  },
  'subscribe-btn': {
      'ar': 'اشترك',
      'en': 'Subscribe'
  },
  'copyright': {
      'ar': 'جميع الحقوق محفوظة',
      'en': 'All Rights Reserved'
  },
  'privacy-policy': {
      'ar': 'سياسة الخصوصية',
      'en': 'Privacy Policy'
  },
  'terms-of-service': {
      'ar': 'شروط الخدمة',
      'en': 'Terms of Service'
  },
  
  // الباقات المخصصة
  'packages-section-title': {
      'ar': 'الباقات المخصصة',
      'en': 'Special Packages'
  },
  'five-rounds-title': {
      'ar': 'خمس جولات',
      'en': 'Five Rounds'
  },
  'five-rounds-item1': {
      'ar': 'إقامة كاملة لمدة خمس ليالٍ في جناح فاخر',
      'en': 'Five-night full board stay in a luxury suite'
  },
  'five-rounds-item2': {
      'ar': 'خمس جولات - 18 حفرة',
      'en': 'Five 18-hole rounds'
  },
  'five-rounds-item3': {
      'ar': 'جولة واحدة مضمونة في ملعب "سي فيو" الشهير',
      'en': 'One guaranteed round on the famous Sea View course'
  },
  'five-rounds-item4': {
      'ar': 'جلسة تدريب رقمية مجانية',
      'en': 'Free digital training session'
  },
  'triple-tee-title': {
      'ar': 'الجولة الثلاثية',
      'en': 'Triple Tee'
  },
  'triple-tee-item1': {
      'ar': 'إقامة لمدة ليلتين في غرفة مزدوجة مع وجبة الإفطار',
      'en': 'Two-night stay in a double room with breakfast'
  },
  'triple-tee-item2': {
      'ar': 'ثلاث جولات - 18 حفرة، تشمل خوض جولة واحدة في ملعب "سي فيو" الشهير (إن وجدت)',
      'en': 'Three 18-hole rounds including one on the famous Sea View course (if available)'
  },
  'triple-tee-item3': {
      'ar': 'تأجير مجاني للعربات',
      'en': 'Free cart rental'
  },
  'triple-tee-item4': {
      'ar': 'خصم 20% لمتجر المحترفين',
      'en': '20% discount at the pro shop'
  },
  'relaxation-title': {
      'ar': 'استراحة استجمام',
      'en': 'Relaxation Break'
  },
  'relaxation-item1': {
      'ar': 'إقامة لليلة واحدة مع وجبة إفطار كاملة',
      'en': 'One-night stay with full breakfast'
  },
  'relaxation-item2': {
      'ar': 'تناول العشاء في أي من مطاعم المنتجع',
      'en': 'Dinner at any resort restaurant'
  },
  'relaxation-item3': {
      'ar': 'الوصول إلى الملاعب (تطبق الرسوم ويستبعد ملعب "سي فيو")',
      'en': 'Access to courses (fees apply, Sea View excluded)'
  },
  'relaxation-item4': {
      'ar': 'تأجير نادي مجاني',
      'en': 'Free club rental'
  },
  'most-popular': {
      'ar': 'الأكثر شعبية',
      'en': 'Most Popular'
  },
  'book-package': {
      'ar': 'احجز الباقة',
      'en': 'Book Package'
  },
  'custom-package-title': {
      'ar': 'باقات مخصصة',
      'en': 'Custom Packages'
  },
  'custom-package-desc': {
      'ar': 'تتوفر الباقات المخصصة للفعاليات المؤسسية والإقامات الطويلة. يرجى الاتصال بنا لترتيب أي باقات مخصصة.',
      'en': 'Custom packages are available for corporate events and extended stays. Please contact us to arrange any custom packages.'
  },
  'contact-us': {
      'ar': 'اتصل بنا',
      'en': 'Contact Us'
  },
  
  // المرافق
  'facilities-title': {
      'ar': 'المرافق المقدمة',
      'en': 'Our Facilities'
  },
  'facility-courses': {
      'ar': 'ملاعب الجولف',
      'en': 'Golf Courses'
  },
  'facility-courses-desc': {
      'ar': 'ثلاثة ملاعب لبطولات الجولف بما في ذلك ملعب "سي فيو" الشهير',
      'en': 'Three championship golf courses including the famous Sea View course'
  },
  'facility-clubs': {
      'ar': 'الناديان',
      'en': 'Clubs'
  },
  'facility-clubs-desc': {
      'ar': 'الناديان',
      'en': 'Clubs'
  },
  'facility-clubs-desc': {
      'ar': 'ناديان فاخران مع مرافق متكاملة للأعضاء والزوار',
      'en': 'Two luxury clubs with comprehensive facilities for members and visitors'
  },
  'facility-accommodation': {
      'ar': 'الإقامة',
      'en': 'Accommodation'
  },
  'facility-accommodation-desc': {
      'ar': 'إقامة فاخرة في الفنادق مع إطلالات رائعة على الملاعب',
      'en': 'Luxury hotel accommodation with stunning views of the courses'
  },
  'facility-dining': {
      'ar': 'المطاعم والمقاهي',
      'en': 'Restaurants & Cafés'
  },
  'facility-dining-desc': {
      'ar': 'تجارب طعام متنوعة من المطبخ المحلي والعالمي',
      'en': 'Diverse dining experiences from local and international cuisine'
  },
  'facility-shop': {
      'ar': 'متجر المحترفين',
      'en': 'Pro Shop'
  },
  'facility-shop-desc': {
      'ar': 'متجر متخصص يقدم أحدث معدات وملابس الجولف',
      'en': 'Specialized shop offering the latest golf equipment and apparel'
  },
  'facility-training': {
      'ar': 'ساحة التدريب',
      'en': 'Training Ground'
  },
  'facility-training-desc': {
      'ar': 'ساحة تدريب مُضاءة بالأنوار الكشّافة للتدريب في أي وقت',
      'en': 'Floodlit training ground for practice at any time'
  },
  'facility-lessons': {
      'ar': 'دروس الجولف',
      'en': 'Golf Lessons'
  },
  'facility-lessons-desc': {
      'ar': 'دروس احترافية للمبتدئين والمتقدمين على يد مدربين معتمدين',
      'en': 'Professional lessons for beginners and advanced players by certified trainers'
  },
  'facility-digital': {
      'ar': 'التدريب الرقمي',
      'en': 'Digital Training'
  },
  'facility-digital-desc': {
      'ar': 'تقنيات تدريب رقمية متطورة لتحليل وتحسين أدائك',
      'en': 'Advanced digital training technologies to analyze and improve your performance'
  },
  'facility-caddie': {
      'ar': 'خدمة المساعدة',
      'en': 'Caddie Service'
  },
  'facility-caddie-desc': {
      'ar': 'خدمة المساعدة على حمل أدوات الجولف من قبل محترفين مدربين',
      'en': 'Caddie service by trained professionals to assist with your golf equipment'
  }
  
};

function toggleLanguage() {
  if (currentLang === 'ar') {
      currentLang = 'en';
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
      langToggle.textContent = 'العربية';
  } else {
      currentLang = 'ar';
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
      langToggle.textContent = 'English';
  }
  
  // تحديث جميع النصوص
  updateAllTexts();
}

function updateAllTexts() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key] && translations[key][currentLang]) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              if (element.getAttribute('placeholder')) {
                  element.setAttribute('placeholder', translations[key][currentLang]);
              } else {
                  element.value = translations[key][currentLang];
              }
          } else {
              element.innerHTML = translations[key][currentLang];
          }
      }
  });
}

langToggle.addEventListener('click', toggleLanguage);