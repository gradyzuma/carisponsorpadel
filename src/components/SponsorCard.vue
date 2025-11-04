<template>
  <div class="bg-white rounded-xl border-2 border-padel-teal/20 hover:border-padel-teal hover:glow-teal-strong transition-all duration-300 overflow-hidden group">
    <!-- Banner/Image Section - Made larger for banner style -->
    <div class="bg-gradient-to-br from-padel-gray to-white p-8 flex items-center justify-center h-64 border-b-2 border-padel-teal/10 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-padel-teal/5 via-transparent to-padel-cyan/5 group-hover:from-padel-teal/10 group-hover:to-padel-cyan/10 transition-all"></div>
      <img
        :src="sponsor.logo"
        :alt="sponsor.name"
        class="w-full h-full object-cover relative z-10 rounded-lg"
      />
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <!-- Header -->
      <div class="mb-4">
        <h3 class="text-xl font-black text-padel-text mb-2 uppercase tracking-tight">{{ sponsor.name }}</h3>
        <span class="inline-block bg-padel-teal/10 border-2 border-padel-teal text-padel-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {{ sponsor.category }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-padel-text-light text-sm mb-4 line-clamp-3">
        {{ sponsor.description }}
      </p>

      <!-- Location -->
      <div class="flex items-center text-sm text-padel-teal mb-3 font-medium">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ sponsor.location }}, {{ sponsor.province }}</span>
      </div>

      <!-- Budget Range -->
      <div class="bg-gradient-to-r from-padel-teal/10 to-padel-cyan/10 border-2 border-padel-teal/30 rounded-lg p-3 mb-4">
        <p class="text-xs text-padel-text-light mb-1 font-bold uppercase">💰 Sponsorship Budget</p>
        <p class="text-sm font-black text-padel-teal">
          {{ formatCurrency(sponsor.minBudget) }} - {{ formatCurrency(sponsor.maxBudget) }}
        </p>
      </div>

      <!-- Benefits -->
      <div class="mb-4">
        <p class="text-xs font-bold text-padel-teal mb-2 uppercase">⚡ Benefits:</p>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="(benefit, index) in sponsor.benefits.slice(0, 3)"
            :key="index"
            class="inline-block bg-padel-gray border border-padel-teal/20 text-padel-text text-xs px-2 py-1 rounded font-medium"
          >
            {{ benefit }}
          </span>
          <span
            v-if="sponsor.benefits.length > 3"
            class="inline-block bg-padel-gray border border-padel-teal/30 text-padel-teal text-xs px-2 py-1 rounded font-bold"
          >
            +{{ sponsor.benefits.length - 3 }} more
          </span>
        </div>
      </div>

      <!-- Contact Button -->
      <button
        @click="handleContact"
        class="w-full bg-gradient-to-r from-padel-teal to-padel-cyan hover:from-padel-teal-dark hover:to-padel-teal text-white font-black py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center glow-teal uppercase tracking-wide"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact Sponsor
      </button>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '../config/mockData'

const props = defineProps({
  sponsor: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['contact'])

const handleContact = () => {
  emit('contact', props.sponsor)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
