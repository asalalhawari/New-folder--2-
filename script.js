// Hero Slider
const slides = document.querySelectorAll(".slide")
const dots = document.querySelector(".dots")
const prevBtn = document.querySelector(".slider-btn.prev")
const nextBtn = document.querySelector(".slider-btn.next")
let currentSlide = 0

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div")
  dot.classList.add("dot")
  if (index === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(index))
  dots.appendChild(dot)
})

function goToSlide(n) {
  slides[currentSlide].classList.remove("active")
  document.querySelectorAll(".dot")[currentSlide].classList.remove("active")
  currentSlide = (n + slides.length) % slides.length
  slides[currentSlide].classList.add("active")
  document.querySelectorAll(".dot")[currentSlide].classList.add("active")
}

function nextSlide() {
  goToSlide(currentSlide + 1)
}

function prevSlide() {
  goToSlide(currentSlide - 1)
}

// Auto slide
let slideInterval = setInterval(nextSlide, 5000)

// Event listeners
prevBtn.addEventListener("click", () => {
  clearInterval(slideInterval)
  prevSlide()
  slideInterval = setInterval(nextSlide, 5000)
})

nextBtn.addEventListener("click", () => {
  clearInterval(slideInterval)
  nextSlide()
  slideInterval = setInterval(nextSlide, 5000)
})

// Course Slider
const courseContainer = document.querySelector(".course-container")
const courseCards = document.querySelectorAll(".course-card")
const coursePrevBtn = document.querySelector(".courses .prev")
const courseNextBtn = document.querySelector(".courses .next")
let currentCourseIndex = 0

function slideCourses(direction) {
  const cardWidth = courseCards[0].offsetWidth
  const maxIndex = courseCards.length - 3

  if (direction === "next" && currentCourseIndex < maxIndex) {
    currentCourseIndex++
  } else if (direction === "prev" && currentCourseIndex > 0) {
    currentCourseIndex--
  }

  courseContainer.style.transform = `translateX(-${currentCourseIndex * cardWidth}px)`
}

coursePrevBtn.addEventListener("click", () => slideCourses("prev"))
courseNextBtn.addEventListener("click", () => slideCourses("next"))

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn")
const navLinks = document.querySelector(".nav-links")

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = this.getAttribute("href")
    if (target === "#contact") {
      document.querySelector("footer").scrollIntoView({
        behavior: "smooth",
      })
    } else {
      document.querySelector(target).scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Booking Form
const teeTimeForm = document.getElementById("teeTimeForm")
const dateInput = document.getElementById("date")
const timeSelect = document.getElementById("time")
const courseSelect = document.getElementById("course")
const playersSelect = document.getElementById("players")
const extrasCheckboxes = document.querySelectorAll('input[name="extras"]')
const notesTextarea = document.getElementById("notes")

// Set min date to tomorrow and max date to 14 days from now
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const twoWeeksLater = new Date()
twoWeeksLater.setDate(twoWeeksLater.getDate() + 14)

dateInput.min = tomorrow.toISOString().split("T")[0]
dateInput.max = twoWeeksLater.toISOString().split("T")[0]

// Update time slots based on selected date
function updateTimeSlots() {
  const selectedDate = new Date(dateInput.value)
  const dayOfWeek = selectedDate.getDay()

  // Clear existing options
  timeSelect.innerHTML = '<option value="">اختر الوقت</option>'

  // Different time slots for weekends
  const timeSlots =
    dayOfWeek === 5 || dayOfWeek === 6
      ? ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"]
      : ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"]

  timeSlots.forEach((time) => {
    const option = document.createElement("option")
    option.value = time
    option.textContent = `${time} ${Number.parseInt(time) < 12 ? "صباحاً" : "مساءً"}`
    timeSelect.appendChild(option)
  })
}

dateInput.addEventListener("change", updateTimeSlots)

// Form submission
teeTimeForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = {
    date: dateInput.value,
    time: timeSelect.value,
    course: courseSelect.value,
    players: playersSelect.value,
    extras: Array.from(extrasCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value),
    notes: notesTextarea.value,
  }

  // Here you would typically send this data to a server
  console.log("تفاصيل الحجز:", formData)

  // Show Sweet Alert notification
  Swal.fire({
    title: "تم الحجز بنجاح!",
    text: "سنرسل لك رسالة تأكيد عبر البريد الإلكتروني قريباً.",
    icon: "success",
    confirmButtonText: "حسناً",
    confirmButtonColor: "#1a472a",
    background: "#fff",
    customClass: {
      popup: "swal-arabic",
      title: "swal-title",
      content: "swal-text",
      confirmButton: "swal-button",
    },
  })

  this.reset()
})

// Scroll Animation
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "#fff"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Feature Cards and About Features Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

const animateElements = document.querySelectorAll(".feature-card, .about-features .feature")
animateElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "all 0.5s ease-out"
  observer.observe(element)
})

// About Section Statistics Animation
const stats = document.querySelectorAll(".stat-number")
const statsSection = document.querySelector(".about-stats")

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      stats.forEach((stat) => {
        const targetValue = Number.parseInt(stat.getAttribute("data-value"))
        let currentValue = 0
        const duration = 2000 // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / targetValue))

        const timer = setInterval(() => {
          currentValue += 1
          stat.textContent = currentValue
          if (currentValue >= targetValue) {
            clearInterval(timer)
          }
        }, stepTime)
      })
      statsObserver.unobserve(statsSection)
    }
  },
  { threshold: 0.5 },
)

statsObserver.observe(statsSection)

