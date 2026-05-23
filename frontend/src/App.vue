<script setup>
import { onMounted, ref } from 'vue'

const packages = [
  {
    group: 'Usługa jednorazowa',
    name: 'Odświeżenie',
    price: 'od 89 zł',
    description: 'Szybkie uporządkowanie grobu przed wizytą lub ważną datą.',
    items: ['Usunięcie liści i piasku', 'Lekkie umycie płyty', 'Zapalenie jednego znicza']
  },
  {
    group: 'Usługa jednorazowa',
    name: 'Pełna opieka',
    price: 'od 149 zł',
    description: 'Dokładniejsze sprzątanie z uporządkowaniem otoczenia grobu.',
    items: ['Mycie płyty i elementów', 'Porządek wokół grobu', 'Zdjęcia przed i po']
  },
  {
    group: 'Usługa jednorazowa',
    name: 'Świąteczny',
    price: 'od 219 zł',
    description: 'Pakiet na Wszystkich Świętych, rocznice i terminy o większym ruchu.',
    items: ['Rezerwacja terminu', 'Kwiaty lub stroik sezonowy', 'Dwa znicze w zestawie']
  },
  {
    group: 'Abonament',
    name: 'Spokojny',
    price: '59 zł / mies.',
    description: 'Podstawowa, regularna kontrola miejsca pamięci przez cały rok.',
    items: ['1 wizyta miesięcznie', 'Krótki raport zdjęciowy', 'Stały termin wizyt']
  },
  {
    group: 'Abonament',
    name: 'Rodzinny',
    price: '99 zł / mies.',
    description: 'Częstsza opieka i większa elastyczność przy terminach rodzinnych.',
    items: ['2 wizyty miesięcznie', 'Priorytet przed świętami', 'Znicz przy każdej wizycie']
  },
  {
    group: 'Abonament',
    name: 'Całoroczny',
    price: '149 zł / mies.',
    description: 'Najpełniejsza opieka dla rodzin, które mieszkają daleko od cmentarza.',
    items: ['3 wizyty miesięcznie', 'Sezonowe dekoracje', 'Rozszerzony raport po usłudze']
  }
]

const oneTimePackages = packages.filter((item) => item.group === 'Usługa jednorazowa')
const subscriptionPackages = packages.filter((item) => item.group === 'Abonament')

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

const currentPath = ref(window.location.pathname)

const goTo = (path) => {
  window.history.pushState({}, '', path)
  currentPath.value = path
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goHomeSection = (sectionId) => {
  if (currentPath.value !== '/') {
    window.history.pushState({}, '', '/')
    currentPath.value = '/'
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 0)
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
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
        <button type="button" @click="goHomeSection('pakiety')">Pakiety</button>
        <button type="button" @click="goHomeSection('jak-to-dziala')">Jak to działa</button>
        <button type="button" @click="goTo('/zamowienie')">Zamów</button>
        <button type="button" @click="goHomeSection('kontakt')">Kontakt</button>
      </nav>
    </header>

    <template v-if="currentPath === '/zamowienie'">
      <section class="section order-page">
        <div class="order-copy">
          <button class="back-link" type="button" @click="goTo('/')">Wróć na stronę główną</button>
          <p class="eyebrow">Zamówienie</p>
          <h1>Formularz pod przyszłą integrację z backendem i płatnościami</h1>
          <p>
            Pola są przygotowane jako widok. Po akceptacji layoutu można dodać walidację,
            zapis zamówienia w C#, koszyk oraz operatora płatności.
          </p>
        </div>

        <form class="order-form">
          <label>
            Pakiet
            <select>
              <option>Pełna opieka</option>
              <option>Odświeżenie</option>
              <option>Świąteczny</option>
              <option>Abonament Spokojny</option>
              <option>Abonament Rodzinny</option>
              <option>Abonament Całoroczny</option>
            </select>
          </label>
          <label>
            Miasto i cmentarz
            <input type="text" placeholder="np. Kraków, Cmentarz Rakowicki" />
          </label>
          <label>
            Dane lokalizacji grobu
            <textarea rows="4" placeholder="Sektor, rząd, numer lub opis dojścia"></textarea>
          </label>
          <div class="form-row">
            <label>
              Termin
              <input type="date" />
            </label>
            <label>
              Kontakt
              <input type="tel" placeholder="+48 ..." />
            </label>
          </div>
          <button type="button">Przejdź do podsumowania</button>
        </form>
      </section>
    </template>

    <template v-else>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Opieka nad grobami z potwierdzeniem zdjęciowym</p>
          <h1>Zadbamy o miejsce pamięci Twoich bliskich z troską i szacunkiem.</h1>
          <p class="lead">
            Zamów jednorazowe sprzątanie grobu albo stałą opiekę, gdy nie możesz odwiedzić cmentarza osobiście.
            Po wykonaniu usługi otrzymasz potwierdzenie oraz zdjęcia uporządkowanego miejsca.
          </p>
          <div class="hero-actions">
            <button class="button primary" type="button" @click="goTo('/zamowienie')">Przejdź do zamówienia</button>
            <button class="button secondary" type="button" @click="goHomeSection('pakiety')">Porównaj pakiety</button>
          </div>
        </div>
      </section>

      <section id="pakiety" class="section packages-section">
        <div class="section-heading">
          <p class="eyebrow">Pakiety</p>
          <h2>Prosty wybór usługi</h2>
          <p>Najpierw wybierz jednorazowe sprzątanie, a jeśli potrzebujesz stałej opieki, porównaj abonamenty.</p>
        </div>

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
              <strong>{{ item.price }}</strong>
              <ul>
                <li v-for="feature in item.items" :key="feature">{{ feature }}</li>
              </ul>
              <button type="button" @click="goTo('/zamowienie')">Wybierz pakiet</button>
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
              <strong>{{ item.price }}</strong>
              <ul>
                <li v-for="feature in item.items" :key="feature">{{ feature }}</li>
              </ul>
              <button type="button" @click="goTo('/zamowienie')">Wybierz abonament</button>
            </article>
          </div>
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
