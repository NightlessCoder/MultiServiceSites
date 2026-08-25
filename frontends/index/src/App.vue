<script setup>
import heroCzystePietro from './assets/hero-czyste-pietro.png'
import heroOdplamieni from './assets/hero-odplamieni.png'
import heroPlomyk from './assets/hero-plomyk.png'
import heroWoda from './assets/hero-woda.png'
import heroImperialAcademy from './assets/hero-imperial-academy.png'

const projects = [
  {
    name: 'PłomykPamięci',
    domain: 'plomykpamieci.pl',
    text: 'Opieka nad grobami i miejscami pamięci.',
    path: './plomyk-pamieci/',
    localUrl: 'http://127.0.0.1:5173',
    image: heroPlomyk,
    tone: 'warm'
  },
  {
    name: 'CzystePiętro',
    domain: 'czystepietro.pl',
    text: 'Czyszczenie powierzchni biurowych.',
    path: './czyste-pietro/',
    localUrl: 'http://127.0.0.1:5174',
    image: heroCzystePietro,
    tone: 'clean'
  },
  {
    name: 'Odplamieni',
    domain: 'odplamieni.pl',
    text: 'Dywany, kanapy, materace i tapicerki.',
    path: './odplamieni/',
    localUrl: 'http://127.0.0.1:5175',
    image: heroOdplamieni,
    tone: 'soft'
  },
  {
    name: 'WodaPodCiśnieniem',
    domain: 'wodapodcisnieniem.pl',
    text: 'Kostka, podjazdy, tarasy i baseny.',
    path: './wodapodcisnieniem/',
    localUrl: 'http://127.0.0.1:5176',
    image: heroWoda,
    tone: 'water'
  },
  {
    name: 'ImperialAcademy',
    domain: 'imperialacademy.pl',
    text: 'Nowoczesne szkolenia dla firm i zespołów.',
    path: './imperialacademy/',
    localUrl: 'http://127.0.0.1:5178',
    image: heroImperialAcademy,
    tone: 'expert'
  }
]

const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
const getHref = (project) => isLocal ? project.localUrl : project.path
</script>

<template>
  <main class="quad-shell" aria-label="Projekty usługowe">
    <a
      v-for="project in projects"
      :key="project.domain"
      class="project-tile"
      :class="project.tone"
      :href="getHref(project)"
      :style="{ backgroundImage: `url(${project.image})` }"
    >
      <div class="tile-content">
        <span class="tile-domain">{{ project.domain }}</span>
        <h1>{{ project.name }}</h1>
        <p>{{ project.text }}</p>
      </div>
    </a>
  </main>
</template>
