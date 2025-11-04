<template>
  <div class="min-h-screen bg-padel-bg-light text-padel-text">
    <!-- Admin Header -->
    <header class="bg-white border-b-2 border-padel-teal/20 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-black bg-gradient-to-r from-padel-teal to-padel-cyan bg-clip-text text-transparent uppercase">Admin Dashboard</h1>
            <p class="text-padel-text-light mt-1">Manage Sponsors & View Inquiries</p>
          </div>
          <button
            @click="$emit('close')"
            class="bg-white border-2 border-padel-teal/30 hover:border-padel-teal text-padel-teal px-4 py-2 rounded-lg font-bold uppercase transition-all"
          >
            ← Back to Site
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="flex gap-4 mb-8">
        <button
          @click="activeTab = 'sponsors'"
          :class="activeTab === 'sponsors' ? 'bg-gradient-to-r from-padel-teal to-padel-cyan text-white glow-teal-strong' : 'bg-white text-padel-teal border-2 border-padel-teal/30'"
          class="px-6 py-3 rounded-lg font-bold uppercase transition-all"
        >
          📋 Manage Sponsors
        </button>
        <button
          @click="activeTab = 'inquiries'"
          :class="activeTab === 'inquiries' ? 'bg-gradient-to-r from-padel-teal to-padel-cyan text-white glow-teal-strong' : 'bg-white text-padel-teal border-2 border-padel-teal/30'"
          class="px-6 py-3 rounded-lg font-bold uppercase transition-all"
        >
          📨 View Inquiries
        </button>
      </div>

      <!-- Sponsors Tab -->
      <div v-if="activeTab === 'sponsors'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-black text-padel-teal">Sponsors List</h2>
          <button
            @click="addNewSponsor"
            class="bg-gradient-to-r from-padel-teal to-padel-cyan text-white px-6 py-3 rounded-lg font-black glow-teal-strong uppercase"
          >
            + Add New Sponsor
          </button>
        </div>

        <!-- Sponsors Table -->
        <div class="bg-white rounded-xl border-2 border-padel-teal/20 overflow-hidden shadow-lg">
          <table class="w-full">
            <thead class="bg-padel-gray border-b-2 border-padel-teal/20">
              <tr>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Logo</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Name</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Category</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Location</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Budget Range</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sponsor in sponsors"
                :key="sponsor.id"
                class="border-b border-padel-teal/10 hover:bg-padel-gray/50 transition-colors"
              >
                <td class="p-4">
                  <img :src="sponsor.logo" :alt="sponsor.name" class="w-12 h-12 rounded object-cover" />
                </td>
                <td class="p-4 font-bold text-padel-text">{{ sponsor.name }}</td>
                <td class="p-4 text-padel-text-light">{{ sponsor.category }}</td>
                <td class="p-4 text-padel-text-light">{{ sponsor.location }}</td>
                <td class="p-4 text-padel-teal font-bold text-sm">
                  {{ formatCurrency(sponsor.minBudget) }} - {{ formatCurrency(sponsor.maxBudget) }}
                </td>
                <td class="p-4">
                  <div class="flex gap-2">
                    <button
                      @click="editSponsor(sponsor)"
                      class="bg-padel-teal/10 border border-padel-teal text-padel-teal px-3 py-1 rounded font-bold text-sm uppercase hover:bg-padel-teal hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteSponsor(sponsor)"
                      class="bg-red-50 border border-red-500 text-red-600 px-3 py-1 rounded font-bold text-sm uppercase hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Inquiries Tab -->
      <div v-if="activeTab === 'inquiries'">
        <h2 class="text-2xl font-black text-padel-teal mb-6">Inquiry Submissions</h2>

        <div class="bg-white rounded-xl border-2 border-padel-teal/20 overflow-hidden shadow-lg">
          <table class="w-full">
            <thead class="bg-padel-gray border-b-2 border-padel-teal/20">
              <tr>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Date</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Court Name</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Contact</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Sponsor</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Event Type</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Status</th>
                <th class="text-left p-4 text-padel-teal font-bold uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="inquiry in inquiries"
                :key="inquiry.id"
                class="border-b border-padel-teal/10 hover:bg-padel-gray/50 transition-colors"
              >
                <td class="p-4 text-padel-text-light text-sm">{{ formatDate(inquiry.created_at) }}</td>
                <td class="p-4 font-bold text-padel-text">{{ inquiry.court_name }}</td>
                <td class="p-4 text-padel-text-light text-sm">
                  {{ inquiry.name }}<br />
                  {{ inquiry.email }}
                </td>
                <td class="p-4 text-padel-text-light">{{ inquiry.sponsor_name }}</td>
                <td class="p-4 text-padel-text-light">{{ inquiry.event_type || 'N/A' }}</td>
                <td class="p-4">
                  <span
                    :class="{
                      'bg-yellow-50 border-yellow-500 text-yellow-700': inquiry.status === 'new',
                      'bg-blue-50 border-blue-500 text-blue-700': inquiry.status === 'contacted',
                      'bg-green-50 border-green-500 text-green-700': inquiry.status === 'converted',
                      'bg-red-50 border-red-500 text-red-700': inquiry.status === 'rejected'
                    }"
                    class="inline-block border px-2 py-1 rounded text-xs font-bold uppercase"
                  >
                    {{ inquiry.status }}
                  </span>
                </td>
                <td class="p-4">
                  <button
                    @click="viewInquiry(inquiry)"
                    class="bg-padel-teal/10 border border-padel-teal text-padel-teal px-3 py-1 rounded font-bold text-sm uppercase hover:bg-padel-teal hover:text-white transition-all"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Edit Sponsor Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      @click.self="closeEditModal"
    >
      <div class="bg-white rounded-xl border-2 border-padel-teal shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto glow-teal-strong">
        <div class="bg-gradient-to-r from-padel-teal to-padel-cyan border-b-2 border-padel-teal p-6">
          <h3 class="text-2xl font-black text-white uppercase">{{ editingSponsor.id ? 'Edit Sponsor' : 'Add New Sponsor' }}</h3>
        </div>

        <form @submit.prevent="saveSponsor" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Name *</label>
              <input v-model="editingSponsor.name" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Category *</label>
              <input v-model="editingSponsor.category" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Banner Image URL</label>
            <input v-model="editingSponsor.logo" class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Description *</label>
            <textarea v-model="editingSponsor.description" rows="3" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text resize-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Min Budget (IDR) *</label>
              <input v-model.number="editingSponsor.min_budget" type="number" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Max Budget (IDR) *</label>
              <input v-model.number="editingSponsor.max_budget" type="number" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Location *</label>
              <input v-model="editingSponsor.location" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Province *</label>
              <input v-model="editingSponsor.province" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Contact Email *</label>
              <input v-model="editingSponsor.contact_email" type="email" required class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
            <div>
              <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Contact Phone</label>
              <input v-model="editingSponsor.contact_phone" class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Website</label>
            <input v-model="editingSponsor.website" class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
          </div>

          <div>
            <label class="block text-sm font-bold text-padel-teal mb-2 uppercase">Benefits (comma-separated)</label>
            <input v-model="benefitsInput" placeholder="Benefit 1, Benefit 2, Benefit 3" class="w-full px-4 py-2 bg-white border-2 border-padel-teal/30 rounded-lg focus:ring-2 focus:ring-padel-teal focus:border-padel-teal outline-none text-padel-text" />
          </div>

          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeEditModal" class="flex-1 bg-white border-2 border-padel-teal/30 hover:border-padel-teal text-padel-teal font-bold py-3 px-4 rounded-lg transition-all uppercase">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-padel-teal to-padel-cyan hover:from-padel-teal-dark hover:to-padel-teal text-white font-black py-3 px-4 rounded-lg transition-all glow-teal-strong uppercase">
              {{ editingSponsor.id ? 'Update Sponsor' : 'Create Sponsor' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../config/supabase'
import { formatCurrency } from '../config/mockData'

const activeTab = ref('sponsors')
const sponsors = ref([])
const inquiries = ref([])
const showEditModal = ref(false)
const editingSponsor = ref({})
const benefitsInput = ref('')

const emit = defineEmits(['close'])

// Fetch sponsors
const fetchSponsors = async () => {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('name')

  if (!error) {
    sponsors.value = data
  }
}

// Fetch inquiries
const fetchInquiries = async () => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) {
    inquiries.value = data
  }
}

// Add new sponsor
const addNewSponsor = () => {
  editingSponsor.value = {
    name: '',
    logo: '',
    category: '',
    description: '',
    min_budget: 5000000,
    max_budget: 20000000,
    location: '',
    province: '',
    contact_email: '',
    contact_phone: '',
    benefits: [],
    website: '',
    status: 'active'
  }
  benefitsInput.value = ''
  showEditModal.value = true
}

// Edit sponsor
const editSponsor = (sponsor) => {
  editingSponsor.value = { ...sponsor }
  benefitsInput.value = sponsor.benefits ? sponsor.benefits.join(', ') : ''
  showEditModal.value = true
}

// Save sponsor
const saveSponsor = async () => {
  // Parse benefits
  const benefits = benefitsInput.value
    .split(',')
    .map(b => b.trim())
    .filter(b => b)

  const sponsorData = {
    ...editingSponsor.value,
    benefits
  }

  if (editingSponsor.value.id) {
    // Update
    const { error } = await supabase
      .from('sponsors')
      .update(sponsorData)
      .eq('id', editingSponsor.value.id)

    if (!error) {
      alert('Sponsor updated successfully!')
      closeEditModal()
      fetchSponsors()
    } else {
      alert('Error: ' + error.message)
    }
  } else {
    // Create
    const { error } = await supabase
      .from('sponsors')
      .insert([sponsorData])

    if (!error) {
      alert('Sponsor created successfully!')
      closeEditModal()
      fetchSponsors()
    } else {
      alert('Error: ' + error.message)
    }
  }
}

// Delete sponsor
const deleteSponsor = async (sponsor) => {
  if (!confirm(`Are you sure you want to delete "${sponsor.name}"?`)) return

  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', sponsor.id)

  if (!error) {
    alert('Sponsor deleted successfully!')
    fetchSponsors()
  } else {
    alert('Error: ' + error.message)
  }
}

// Close modal
const closeEditModal = () => {
  showEditModal.value = false
  editingSponsor.value = {}
  benefitsInput.value = ''
}

// View inquiry
const viewInquiry = (inquiry) => {
  alert(`Court: ${inquiry.court_name}\nContact: ${inquiry.name} (${inquiry.email})\nPhone: ${inquiry.phone}\nLocation: ${inquiry.court_location}\nEvent: ${inquiry.event_type}\nParticipants: ${inquiry.participants}\n\nMessage:\n${inquiry.message}`)
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchSponsors()
  fetchInquiries()
})
</script>
