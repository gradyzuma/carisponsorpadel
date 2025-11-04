<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm" @click.self="close">
    <div class="bg-white rounded-xl border-2 border-padel-teal shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-teal-strong">
      <!-- Header -->
      <div class="bg-gradient-to-r from-padel-teal to-padel-cyan border-b-2 border-padel-teal p-6 sticky top-0 relative overflow-hidden">
        <div class="absolute inset-0 bg-white/10"></div>
        <div class="flex justify-between items-start relative z-10">
          <div>
            <h2 class="text-2xl font-black mb-1 text-white uppercase">Contact {{ sponsor.name }}</h2>
            <p class="text-white/90 text-sm font-bold">{{ sponsor.category }}</p>
          </div>
          <button
            @click="close"
            class="text-white hover:text-white/80 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6">
        <!-- Sponsor Details -->
        <div class="bg-padel-gray border-2 border-padel-teal/20 rounded-lg p-4 mb-6">
          <h3 class="font-black text-padel-teal mb-3 uppercase tracking-wide">⚡ Sponsor Details</h3>

          <div class="space-y-2 text-sm">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-padel-teal mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <div>
                <p class="font-bold text-padel-text-light">Location</p>
                <p class="text-padel-text">{{ sponsor.location }}, {{ sponsor.province }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-5 h-5 text-padel-teal mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <div>
                <p class="font-bold text-padel-text-light">Budget Range</p>
                <p class="text-padel-teal font-bold">{{ formatCurrency(sponsor.minBudget) }} - {{ formatCurrency(sponsor.maxBudget) }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-5 h-5 text-padel-teal mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p class="font-bold text-padel-text-light">Benefits</p>
                <ul class="text-padel-text list-disc list-inside">
                  <li v-for="(benefit, index) in sponsor.benefits" :key="index">{{ benefit }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Your Name *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Email Address *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Phone Number *
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Padel Court Name *
            </label>
            <input
              v-model="form.courtName"
              type="text"
              required
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="Your Padel Court Name"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Court Location *
            </label>
            <input
              v-model="form.courtLocation"
              type="text"
              required
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="City, Province"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Event Type
            </label>
            <select
              v-model="form.eventType"
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text"
            >
              <option value="" class="bg-white">Select event type</option>
              <option value="tournament" class="bg-white">Tournament</option>
              <option value="clinic" class="bg-white">Clinic/Training</option>
              <option value="exhibition" class="bg-white">Exhibition Match</option>
              <option value="league" class="bg-white">League</option>
              <option value="other" class="bg-white">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Expected Participants
            </label>
            <input
              v-model="form.participants"
              type="number"
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text placeholder-gray-400"
              placeholder="50"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">
              Message *
            </label>
            <textarea
              v-model="form.message"
              required
              rows="4"
              class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none resize-none text-padel-text placeholder-gray-400"
              placeholder="Tell us about your event and sponsorship needs..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="close"
              class="flex-1 bg-white border-2 border-padel-teal/30 hover:border-padel-teal text-padel-teal font-bold py-3 px-4 rounded-lg transition-all uppercase tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-gradient-to-r from-padel-teal to-padel-cyan hover:from-padel-teal-dark hover:to-padel-teal text-white font-black py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-teal-strong uppercase tracking-wide"
            >
              {{ isSubmitting ? 'Sending...' : '⚡ Send Inquiry' }}
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-4 bg-padel-teal/10 border-2 border-padel-teal text-padel-teal px-4 py-3 rounded-lg glow-teal">
          <p class="font-bold">✅ Inquiry sent successfully!</p>
          <p class="text-sm text-padel-text-light">We've forwarded your information to {{ sponsor.name }}. They'll contact you soon.</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-lg">
          <p class="font-bold">❌ {{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { formatCurrency } from '../config/mockData'
import { useInquiries } from '../composables/useInquiries'

const props = defineProps({
  sponsor: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const { submitInquiry } = useInquiries()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  courtName: '',
  courtLocation: '',
  eventType: '',
  participants: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Submit to Supabase
    await submitInquiry({
      sponsorId: props.sponsor.id,
      sponsorName: props.sponsor.name,
      name: form.name,
      email: form.email,
      phone: form.phone,
      courtName: form.courtName,
      courtLocation: form.courtLocation,
      eventType: form.eventType,
      participants: form.participants,
      message: form.message
    })

    showSuccess.value = true

    // Reset form
    Object.keys(form).forEach(key => {
      form[key] = ''
    })

    // Close modal after 2 seconds
    setTimeout(() => {
      close()
    }, 2000)

  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Failed to send inquiry. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const close = () => {
  emit('close')
}
</script>
