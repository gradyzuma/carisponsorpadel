<template>
  <!-- Show Admin Dashboard or Main Site -->
  <AdminDashboard v-if="showAdmin" @close="showAdmin = false" />

  <div v-else class="min-h-screen bg-gradient-fresh">
    <!-- Header -->
    <header class="bg-white border-b-2 border-padel-teal/20 shadow-lg relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-padel-teal/5 via-padel-cyan/5 to-padel-teal/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-padel-teal to-padel-cyan bg-clip-text text-transparent">
              CariSponsorPadel
            </h1>
            <p class="text-padel-text-light mt-3 text-lg font-medium">
              <span class="text-padel-teal">⚡</span> Find Perfect Sponsors for Your Padel Events
            </p>
          </div>
          <button
            @click="showAdmin = true"
            class="bg-white border-2 border-padel-teal hover:bg-padel-teal hover:text-white text-padel-teal px-6 py-2 rounded-lg font-bold uppercase transition-all glow-teal"
          >
            🔧 Admin
          </button>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-padel-teal via-padel-cyan to-padel-teal"></div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter Section -->
      <div class="bg-white rounded-xl border-2 border-padel-teal/20 p-6 mb-8 glow-teal-strong">
        <!-- Search Bar -->
        <div class="mb-6">
          <label class="block text-sm font-bold text-padel-teal mb-2 uppercase tracking-wide">
            🔍 Search Sponsors
          </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, category, or description..."
            class="w-full px-4 py-3 bg-padel-bg-light border-2 border-padel-gray-dark rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none transition text-padel-text placeholder-gray-400"
          />
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Location Filter -->
          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase tracking-wide">
              📍 Location
            </label>
            <select
              v-model="selectedLocation"
              class="w-full px-4 py-2 bg-padel-bg-light border-2 border-padel-gray-dark rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text"
            >
              <option value="">All Locations</option>
              <option v-for="location in uniqueLocations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase tracking-wide">
              🏷️ Category
            </label>
            <select
              v-model="selectedCategory"
              class="w-full px-4 py-2 bg-padel-bg-light border-2 border-padel-gray-dark rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text"
            >
              <option value="">All Categories</option>
              <option v-for="category in uniqueCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Budget Range Filter -->
          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase tracking-wide">
              💰 Budget Range (IDR)
            </label>
            <select
              v-model="selectedBudgetRange"
              class="w-full px-4 py-2 bg-padel-bg-light border-2 border-padel-gray-dark rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text"
            >
              <option value="">All Budgets</option>
              <option value="0-10000000">Up to 10 Million</option>
              <option value="10000000-30000000">10 - 30 Million</option>
              <option value="30000000-50000000">30 - 50 Million</option>
              <option value="50000000-100000000">50 - 100 Million</option>
              <option value="100000000+">100 Million+</option>
            </select>
          </div>
        </div>

        <!-- Results Count -->
        <div class="mt-4 text-sm text-padel-teal font-bold">
          ⚡ Showing {{ filteredSponsors.length }} of {{ sponsors.length }} sponsors
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-padel-teal"></div>
        <p class="mt-4 text-padel-teal font-bold">Loading sponsors...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
        <p class="text-red-600 font-bold">Error loading sponsors: {{ error }}</p>
      </div>

      <!-- Sponsor Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SponsorCard
          v-for="sponsor in filteredSponsors"
          :key="sponsor.id"
          :sponsor="sponsor"
          @contact="openContactModal"
        />
      </div>

      <!-- No Results -->
      <div v-if="!loading && filteredSponsors.length === 0" class="text-center py-12 bg-white rounded-lg border-2 border-padel-gray-dark">
        <svg class="mx-auto h-12 w-12 text-padel-teal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-bold text-padel-teal">No sponsors found</h3>
        <p class="mt-2 text-padel-text-light">Try adjusting your search or filters</p>
      </div>
    </main>

    <!-- Contact Modal -->
    <ContactModal
      v-if="showContactModal"
      :sponsor="selectedSponsor"
      @close="closeContactModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSponsors } from './composables/useSponsors'
import { getUniqueLocations, getUniqueCategories } from './config/mockData'
import SponsorCard from './components/SponsorCard.vue'
import ContactModal from './components/ContactModal.vue'
import AdminDashboard from './components/AdminDashboard.vue'

const { sponsors, loading, error, fetchSponsors } = useSponsors()

// Admin mode
const showAdmin = ref(false)

// Filters
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedCategory = ref('')
const selectedBudgetRange = ref('')

// Contact Modal
const showContactModal = ref(false)
const selectedSponsor = ref(null)

// Computed properties
const uniqueLocations = computed(() => getUniqueLocations())
const uniqueCategories = computed(() => getUniqueCategories())

const filteredSponsors = computed(() => {
  let filtered = sponsors.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(sponsor =>
      sponsor.name.toLowerCase().includes(query) ||
      sponsor.category.toLowerCase().includes(query) ||
      sponsor.description.toLowerCase().includes(query)
    )
  }

  // Location filter
  if (selectedLocation.value) {
    filtered = filtered.filter(sponsor => sponsor.location === selectedLocation.value)
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(sponsor => sponsor.category === selectedCategory.value)
  }

  // Budget range filter
  if (selectedBudgetRange.value) {
    filtered = filtered.filter(sponsor => {
      if (selectedBudgetRange.value === '100000000+') {
        return sponsor.maxBudget >= 100000000
      }
      const [min, max] = selectedBudgetRange.value.split('-').map(Number)
      return sponsor.maxBudget >= min && sponsor.minBudget <= max
    })
  }

  return filtered
})

// Methods
const openContactModal = (sponsor) => {
  selectedSponsor.value = sponsor
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
  selectedSponsor.value = null
}

// Lifecycle
onMounted(() => {
  fetchSponsors()
})
</script>
