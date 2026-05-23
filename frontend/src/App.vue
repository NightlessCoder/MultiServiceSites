<script setup>
import { computed, onMounted, ref } from 'vue'
import galleryCleanGrave from './assets/gallery-clean-grave.png'
import galleryFlowersCandles from './assets/gallery-flowers-candles.png'
import gallerySeasonalCare from './assets/gallery-seasonal-care.png'

const packages = [
  {
    group: 'Usługa jednorazowa',
    name: 'Odświeżenie',
    priceWarsaw: 'od 89 zł',
    priceArea: 'od 119 zł',
    description: 'Szybkie uporządkowanie grobu przed wizytą lub ważną datą.',
    items: ['Usunięcie liści i piasku', 'Lekkie umycie płyty', 'Dokumentacja zdjęciowa po każdej wizycie']
  },
  {
    group: 'Usługa jednorazowa',
    name: 'Pełna opieka',
    priceWarsaw: 'od 149 zł',
    priceArea: 'od 189 zł',
    description: 'Dokładniejsze sprzątanie z uporządkowaniem otoczenia grobu.',
    items: ['Mycie płyty i elementów', 'Porządek wokół grobu', 'Dokumentacja zdjęciowa po każdej wizycie']
  },
  {
    group: 'Usługa jednorazowa',
    name: 'Świąteczny',
    priceWarsaw: 'od 219 zł',
    priceArea: 'od 269 zł',
    description: 'Pakiet na Wszystkich Świętych, rocznice i terminy o większym ruchu.',
    items: ['Rezerwacja terminu', 'Kwiaty lub stroik sezonowy', 'Dokumentacja zdjęciowa po każdej wizycie']
  },
  {
    group: 'Abonament',
    name: 'Regularne odświeżenie',
    priceWarsaw: '59 zł / mies.',
    priceArea: '79 zł / mies.',
    description: 'Stała, podstawowa opieka nad miejscem pamięci przez cały rok.',
    items: ['Odświeżenie 1x w miesiącu', 'Usunięcie liści i lekkich zabrudzeń', 'Dokumentacja zdjęciowa po każdej wizycie']
  },
  {
    group: 'Abonament',
    name: 'Opieka całoroczna',
    priceWarsaw: '99 zł / mies.',
    priceArea: '129 zł / mies.',
    description: 'Regularne odświeżanie połączone z dokładniejszą opieką w ciągu roku.',
    items: ['Odświeżenie 1x w miesiącu', 'Pełna opieka 2x do roku', 'Dokumentacja zdjęciowa po każdej wizycie']
  },
  {
    group: 'Abonament',
    name: 'Premium świąteczny',
    priceWarsaw: '149 zł / mies.',
    priceArea: '189 zł / mies.',
    description: 'Najpełniejszy wariant z dodatkową oprawą w okolicy wskazanych dat i świąt.',
    items: ['Odświeżenie 1x w miesiącu', 'Pełna opieka 2x do roku w wybranym terminie', 'Znicze i kwiaty 2x do roku', 'Dokumentacja zdjęciowa po każdej wizycie']
  }
]

const oneTimePackages = packages.filter((item) => item.group === 'Usługa jednorazowa')
const subscriptionPackages = packages.filter((item) => item.group === 'Abonament')

const paymentMethods = [
  {
    name: 'BLIK',
    description: 'Szybka płatność kodem z aplikacji bankowej dla klientów w Polsce.'
  },
  {
    name: 'Przelew tradycyjny',
    description: 'Dane do przelewu po złożeniu zamówienia, dobre przy indywidualnych ustaleniach.'
  },
  {
    name: 'PayPal lub karta',
    description: 'Wygodna opcja dla osób mieszkających za granicą.'
  }
]

const galleryItems = [
  {
    image: galleryCleanGrave,
    title: 'Czyszczenie płyty',
    titleEn: 'Stone cleaning',
    text: 'Uporządkowana płyta i otoczenie grobu po wykonaniu usługi.',
    textEn: 'Cleaned stone surface and surrounding area after the service.'
  },
  {
    image: galleryFlowersCandles,
    title: 'Kwiaty i znicze',
    titleEn: 'Flowers and candles',
    text: 'Dyskretna oprawa miejsca pamięci w okolicy ważnej daty.',
    textEn: 'A respectful arrangement around an important date.'
  },
  {
    image: gallerySeasonalCare,
    title: 'Porządek sezonowy',
    titleEn: 'Seasonal care',
    text: 'Usunięcie liści i uporządkowanie grobu po zmianie pogody.',
    textEn: 'Leaf removal and tidying after seasonal weather changes.'
  }
]

const steps = [
  {
    title: 'Wybór usługi',
    text: 'Klient wybiera pakiet jednorazowy albo abonament i przechodzi do formularza.',
    icon: 'M14 25h20M17 16h14M18 34h12'
  },
  {
    title: 'Lokalizacja grobu',
    text: 'Podaje cmentarz, sektor, rząd, numer albo opis dojścia do miejsca.',
    icon: 'M24 42s12-10.1 12-21a12 12 0 0 0-24 0c0 10.9 12 21 12 21Zm0-16a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
  },
  {
    title: 'Termin i potwierdzenie',
    text: 'Po sprawdzeniu dostępności rezerwujemy termin wykonania usługi.',
    icon: 'M15 12h18v28H15zM19 8v8M29 8v8M15 20h18M20 27h3M26 27h3M20 34h3'
  },
  {
    title: 'Raport po wykonaniu',
    text: 'Po sprzątaniu klient otrzymuje zdjęcia i krótkie potwierdzenie realizacji.',
    icon: 'M13 16h22v24H13zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-1 12 6-7 5 5 3-4 5 6'
  }
]

const getRoute = () => window.location.hash.replace('#', '') || '/'

const currentPath = ref(getRoute())
const selectedServiceArea = ref('warszawa')
const selectedPackageArea = ref('warszawa')
const selectedPackageName = ref('Pełna opieka')
const selectedLanguage = ref('pl')

const selectedPackage = computed(() => packages.find((item) => item.name === selectedPackageName.value))
const isCustomServiceArea = computed(() => selectedServiceArea.value === 'custom')
const isSubscription = computed(() => selectedPackage.value?.group === 'Abonament')
const needsTwoYearlyDates = computed(() => ['Opieka całoroczna', 'Premium świąteczny'].includes(selectedPackageName.value))
const needsOneTimeDate = computed(() => !isSubscription.value)
const isPremiumSubscription = computed(() => selectedPackageName.value === 'Premium świąteczny')
const displayPrice = (item) => selectedPackageArea.value === 'warszawa-plus-30' ? item.priceArea : item.priceWarsaw
const copy = (pl, en) => selectedLanguage.value === 'en' ? en : pl
const toggleLanguage = () => {
  selectedLanguage.value = selectedLanguage.value === 'pl' ? 'en' : 'pl'
}

const goTo = (path) => {
  window.location.hash = path
  currentPath.value = path
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToOrder = (packageName) => {
  selectedPackageName.value = packageName
  goTo('/zamowienie')
}

const goHomeSection = (sectionId) => {
  if (currentPath.value !== '/') {
    window.location.hash = '/'
    currentPath.value = '/'
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 0)
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentPath.value = getRoute()
  })
})
</script>

<template>
  <main class="site-shell">
    <header class="topbar">
      <button class="brand brand-button" type="button" @click="goTo('/')">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="img">
            <path d="M24 7c5.2 6.1 8.5 11.3 8.5 17.6 0 5.6-3.8 9.7-8.5 9.7s-8.5-4.1-8.5-9.7c0-4.5 2.3-8.3 5-11.9 1.2-1.6 2.5-3.3 3.5-5.7Z" />
            <path d="M24 17.1c2.5 3.4 3.9 5.8 3.9 8.5 0 2.6-1.6 4.6-3.9 4.6s-3.9-2-3.9-4.6c0-2.3 1.2-4.2 2.7-6.2.5-.7.9-1.4 1.2-2.3Z" />
            <path d="M14 39h20" />
            <path d="M18 43h12" />
          </svg>
        </span>
        <span>PłomykPamięci</span>
      </button>
      <nav class="nav-links" aria-label="Główne">
        <button type="button" @click="goHomeSection('pakiety')">{{ copy('Pakiety', 'Packages') }}</button>
        <button type="button" @click="goHomeSection('jak-to-dziala')">{{ copy('Jak to działa', 'How it works') }}</button>
        <button type="button" @click="goTo('/zamowienie')">{{ copy('Zamów', 'Order') }}</button>
        <button type="button" @click="goHomeSection('kontakt')">{{ copy('Kontakt', 'Contact') }}</button>
        <button class="language-toggle" type="button" @click="toggleLanguage">{{ selectedLanguage === 'pl' ? 'EN' : 'PL' }}</button>
      </nav>
    </header>

    <template v-if="currentPath === '/zamowienie'">
      <section class="section order-page">
        <div class="order-copy">
          <button class="back-link" type="button" @click="goTo('/')">{{ copy('Wróć na stronę główną', 'Back to home page') }}</button>
          <div class="order-photo">
            <div class="order-photo-note">
              <p class="eyebrow">{{ copy('Zamówienie', 'Order') }}</p>
              <h2>{{ copy('Kilka danych wystarczy, aby przygotować realizację.', 'A few details are enough to prepare the service.') }}</h2>
              <p>{{ copy('Wypełnij dane lokalizacji, wybierz obszar realizacji i metodę płatności. Przy zleceniach niestandardowych użyj kodu otrzymanego od pracownika.', 'Fill in the location details, choose the service area and payment method. For custom orders, use the code provided by our staff.') }}</p>
            </div>
          </div>
        </div>

        <form class="order-form">
          <div class="form-heading">
            <p class="eyebrow">{{ copy('Zamówienie', 'Order') }}</p>
            <h1>{{ copy('Formularz zamówienia', 'Order form') }}</h1>
            <p>
              {{ copy('Wybierz obszar realizacji, pakiet i najważniejsze dane miejsca pamięci.', 'Choose the service area, package and key resting-place details.') }}
            </p>
          </div>
          <fieldset class="location-options">
            <legend>{{ copy('Obszar realizacji', 'Service area') }}</legend>
            <label class="location-option">
              <input v-model="selectedServiceArea" type="radio" name="service-area" value="warszawa" />
              <span>
                <strong>{{ copy('Warszawa', 'Warsaw') }}</strong>
                <small>{{ copy('Najkorzystniejsza opcja dla usług realizowanych na terenie miasta.', 'Best option for services carried out within Warsaw.') }}</small>
              </span>
            </label>
            <label class="location-option">
              <input v-model="selectedServiceArea" type="radio" name="service-area" value="warszawa-plus-30" />
              <span>
                <strong>{{ copy('Warszawa + 30 km', 'Warsaw + 30 km') }}</strong>
                <small>{{ copy('Opcja dla cmentarzy pod Warszawą, z dojazdem do 30 km od miasta.', 'For cemeteries near Warsaw, up to 30 km from the city.') }}</small>
              </span>
            </label>
            <label class="location-option">
              <input v-model="selectedServiceArea" type="radio" name="service-area" value="custom" />
              <span>
                <strong>{{ copy('Ustalenia niestandardowe', 'Custom arrangements') }}</strong>
                <small>{{ copy('Przed wyborem tej opcji skontaktuj się z nami, aby ustalić możliwość realizacji, termin i wycenę.', 'Contact us before choosing this option so we can confirm availability, timing and pricing.') }}</small>
              </span>
            </label>
          </fieldset>
          <label v-if="!isCustomServiceArea">
            {{ copy('Pakiet', 'Package') }}
            <select v-model="selectedPackageName">
              <option value="Pełna opieka">Pełna opieka</option>
              <option value="Odświeżenie">Odświeżenie</option>
              <option value="Świąteczny">Świąteczny</option>
              <option value="Regularne odświeżenie">Abonament Regularne odświeżenie</option>
              <option value="Opieka całoroczna">Abonament Opieka całoroczna</option>
              <option value="Premium świąteczny">Abonament Premium świąteczny</option>
            </select>
          </label>
          <label v-else>
            {{ copy('Kod niestandardowego zlecenia', 'Custom order code') }}
            <input type="text" placeholder="np. PP-2026-001" />
            <span class="field-note">{{ copy('Kod podaje pracownik po wcześniejszym ustaleniu szczegółów. Na jego podstawie w kolejnym etapie wczytamy cenę i zakres zlecenia.', 'The code is provided by our staff after the details are agreed. It will be used later to load the price and order scope.') }}</span>
          </label>
          <div class="form-row" :class="{ 'single-field': selectedServiceArea === 'warszawa' }">
            <label v-if="selectedServiceArea !== 'warszawa'">
              {{ copy('Miejscowość', 'Town') }}
              <input type="text" placeholder="np. Piaseczno, Marki, Pruszków" />
            </label>
            <label>
              {{ copy('Nazwa cmentarza', 'Cemetery name') }}
              <input type="text" placeholder="np. Cmentarz Bródnowski" />
            </label>
          </div>
          <label>
            {{ copy('Dane lokalizacji grobu', 'Grave location details') }}
            <textarea rows="4" placeholder="Sektor, kwatera, rząd, numer grobu lub opis dojścia"></textarea>
            <span class="field-note">{{ copy('Im dokładniejszy opis, tym łatwiej potwierdzić możliwość realizacji i uniknąć pomyłki na cmentarzu.', 'The more precise the description, the easier it is to confirm the service and avoid mistakes at the cemetery.') }}</span>
          </label>
          <fieldset v-if="!isCustomServiceArea" class="schedule-options">
            <legend>{{ copy('Terminy realizacji', 'Service dates') }}</legend>
            <div v-if="needsOneTimeDate" class="form-row single-field">
              <label>
                {{ copy('Preferowany termin usługi', 'Preferred service date') }}
                <input type="date" />
                <span class="field-note">{{ copy('Dokładny termin potwierdzimy po sprawdzeniu dostępności.', 'We will confirm the exact date after checking availability.') }}</span>
              </label>
            </div>
            <div v-else-if="needsTwoYearlyDates" class="form-row">
              <label>
                {{ copy('Pierwszy termin pełnej opieki', 'First full-care date') }}
                <input type="date" />
              </label>
              <label>
                {{ copy('Drugi termin pełnej opieki', 'Second full-care date') }}
                <input type="date" />
              </label>
              <p class="field-note schedule-note">{{ copy('Miesięczne odświeżenia odbywają się regularnie przez cały rok. Konkretne dni wizyt ustalimy po przyjęciu zamówienia.', 'Monthly refresh visits are carried out regularly throughout the year. Specific visit days will be agreed after the order is accepted.') }}</p>
              <p v-if="isPremiumSubscription" class="field-note schedule-note">{{ copy('W pakiecie Premium znicze i kwiaty 2x do roku przygotujemy w okolicy wskazanych terminów.', 'In the Premium package, candles and flowers twice a year will be prepared around the selected dates.') }}</p>
            </div>
            <p v-else class="field-note schedule-note">{{ copy('Ten abonament obejmuje regularne odświeżenie 1x w miesiącu. Dzień cyklicznej wizyty ustalimy po przyjęciu zamówienia.', 'This subscription includes a regular refresh once a month. The recurring visit day will be agreed after the order is accepted.') }}</p>
          </fieldset>
          <label>
            {{ copy('Kontakt', 'Contact') }}
            <input type="tel" placeholder="+48 ..." />
          </label>
          <label class="consent-option">
            <input type="checkbox" />
            <span>
              <strong>{{ copy('Zgoda na wykorzystanie zdjęć realizacji', 'Consent to use service photos') }}</strong>
              <small>{{ copy('Wyrażam zgodę na ewentualne pokazanie zdjęć tej realizacji w galerii strony po zamazaniu danych osobowych, napisów na nagrobku i innych informacji identyfikujących.', 'I agree that photos from this service may be shown in the website gallery after blurring personal data, grave inscriptions and other identifying information.') }}</small>
            </span>
          </label>
          <fieldset class="payment-options">
            <legend>{{ copy('Metoda płatności', 'Payment method') }}</legend>
            <label v-for="method in paymentMethods" :key="method.name" class="payment-option">
              <input type="radio" name="payment" :value="method.name" />
              <span>
                <strong>{{ method.name }}</strong>
                <small>{{ method.description }}</small>
              </span>
            </label>
          </fieldset>
          <button type="button">{{ copy('Przejdź do podsumowania', 'Continue to summary') }}</button>
        </form>
      </section>
    </template>

    <template v-else>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy('Opieka nad grobami z potwierdzeniem zdjęciowym', 'Grave care with photo confirmation') }}</p>
          <h1>{{ copy('Zadbamy o miejsce pamięci Twoich bliskich z troską i szacunkiem.', 'We care for your loved ones’ resting place with respect and attention.') }}</h1>
          <p class="lead">
            {{ copy('Zamów jednorazowe sprzątanie grobu albo stałą opiekę, gdy nie możesz odwiedzić cmentarza osobiście. Po wykonaniu usługi otrzymasz potwierdzenie oraz zdjęcia uporządkowanego miejsca.', 'Order one-time grave cleaning or ongoing care when you cannot visit the cemetery in person. After the service, you receive confirmation and photos of the cared-for place.') }}
          </p>
          <p class="service-area">{{ copy('Usługi realizujemy na terenie Warszawy i do 30 km od miasta. Dalsze lokalizacje wymagają indywidualnych ustaleń.', 'Services are provided in Warsaw and up to 30 km from the city. Further locations require individual arrangements.') }}</p>
          <div class="hero-actions">
            <button class="button primary" type="button" @click="goTo('/zamowienie')">{{ copy('Przejdź do zamówienia', 'Start order') }}</button>
            <button class="button secondary" type="button" @click="goHomeSection('pakiety')">{{ copy('Porównaj pakiety', 'Compare packages') }}</button>
          </div>
        </div>
      </section>

      <section id="pakiety" class="section packages-section">
        <div class="section-heading">
          <p class="eyebrow">{{ copy('Pakiety', 'Packages') }}</p>
          <h2>{{ copy('Prosty wybór usługi', 'Choose a service') }}</h2>
          <p>{{ copy('Wybierz jednorazową usługę albo stałą opiekę dopasowaną do miejsca i częstotliwości wizyt.', 'Choose a one-time service or ongoing care matched to the location and visit frequency.') }}</p>
        </div>

        <div class="area-tabs" role="tablist" aria-label="Obszar realizacji pakietów">
          <button :class="{ active: selectedPackageArea === 'warszawa' }" type="button" @click="selectedPackageArea = 'warszawa'">{{ copy('Warszawa', 'Warsaw') }}</button>
          <button :class="{ active: selectedPackageArea === 'warszawa-plus-30' }" type="button" @click="selectedPackageArea = 'warszawa-plus-30'">{{ copy('Warszawa +30 km', 'Warsaw +30 km') }}</button>
          <button :class="{ active: selectedPackageArea === 'custom' }" type="button" @click="selectedPackageArea = 'custom'">{{ copy('Ustalenia niestandardowe', 'Custom arrangements') }}</button>
        </div>

        <div v-if="selectedPackageArea === 'custom'" class="custom-package-note">
          <p class="eyebrow">{{ copy('Indywidualna wycena', 'Individual pricing') }}</p>
          <h3>{{ copy('Skontaktuj się z nami przed wyborem pakietu.', 'Contact us before choosing a package.') }}</h3>
          <p>
            {{ copy('Dla lokalizacji poza Warszawą i obszarem do 30 km konieczne jest wcześniejsze ustalenie możliwości realizacji, terminu, kosztów dojazdu oraz szczegółów zamówienia.', 'For locations outside Warsaw and the 30 km area, we need to confirm availability, timing, travel cost and order details in advance.') }}
          </p>
          <button type="button" @click="goHomeSection('kontakt')">{{ copy('Przejdź do kontaktu', 'Go to contact') }}</button>
        </div>

        <div v-else class="package-area-content">
          <div class="package-row">
          <div class="package-row-heading">
            <span>Jednorazowo</span>
            <p>Na konkretną datę, święto albo jedną wizytę kontrolną.</p>
          </div>
          <div class="packages-grid">
            <article v-for="item in oneTimePackages" :key="item.name" class="package-card">
              <div>
                <span class="package-kicker">{{ item.group }}</span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <strong>{{ displayPrice(item) }}</strong>
              <ul>
                <li v-for="feature in item.items" :key="feature">{{ feature }}</li>
              </ul>
              <button type="button" @click="goToOrder(item.name)">Wybierz pakiet</button>
            </article>
          </div>
        </div>

        <div class="package-row">
          <div class="package-row-heading">
            <span>Abonamenty</span>
            <p>Stała opieka dla rodzin, które nie mogą regularnie odwiedzać cmentarza.</p>
          </div>
          <div class="packages-grid">
            <article v-for="item in subscriptionPackages" :key="item.name" class="package-card subscription-card">
              <div>
                <span class="package-kicker">{{ item.group }}</span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <strong>{{ displayPrice(item) }}</strong>
              <ul>
                <li v-for="feature in item.items" :key="feature">{{ feature }}</li>
              </ul>
              <button type="button" @click="goToOrder(item.name)">Wybierz abonament</button>
            </article>
          </div>
        </div>
        </div>
      </section>

      <section class="section gallery-section">
        <div class="section-heading">
          <p class="eyebrow">{{ copy('Przykłady realizacji', 'Example results') }}</p>
          <h2>{{ copy('Efekt po wykonaniu usługi', 'After-service results') }}</h2>
          <p>{{ copy('Poniższe zdjęcia pokazują kierunek i standard pracy. Przy prawdziwych realizacjach dane osobowe i napisy na nagrobkach będą ukrywane lub kadrowane.', 'The photos below show the intended quality and style. For real work examples, personal details and grave inscriptions will be hidden or cropped.') }}</p>
        </div>
        <div class="gallery-grid">
          <article v-for="item in galleryItems" :key="item.title" class="gallery-card">
            <img :src="item.image" :alt="copy(item.title, item.titleEn)" />
            <div>
              <h3>{{ copy(item.title, item.titleEn) }}</h3>
              <p>{{ copy(item.text, item.textEn) }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="jak-to-dziala" class="section process-band">
        <div class="section-heading">
          <p class="eyebrow">Proces</p>
          <h2>Od zamówienia do potwierdzenia</h2>
        </div>
        <div class="process-visual">
          <article v-for="(step, index) in steps" :key="step.title" class="process-card">
            <span class="process-number">{{ index + 1 }}</span>
            <span class="process-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <path :d="step.icon" />
              </svg>
            </span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </article>
        </div>
      </section>

      <section id="kontakt" class="section contact-band">
        <div>
          <p class="eyebrow">Kontakt</p>
          <h2>Spokojna komunikacja i jasne potwierdzenia.</h2>
        </div>
        <div class="contact-items">
          <span>kontakt@plomykpamieci.pl</span>
          <span>+48 600 000 000</span>
          <span>Obsługa: pon.-sob. 8:00-18:00</span>
        </div>
      </section>
    </template>
  </main>
</template>
