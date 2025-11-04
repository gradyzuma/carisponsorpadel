import { ref } from 'vue'
import { supabase } from '../config/supabase'

export function useSponsors() {
  const sponsors = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchSponsors = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('sponsors')
        .select('*')
        .eq('status', 'active')
        .order('name', { ascending: true })

      if (supabaseError) throw supabaseError

      // Transform snake_case to camelCase for consistency with existing code
      sponsors.value = data.map(sponsor => ({
        id: sponsor.id,
        name: sponsor.name,
        logo: sponsor.logo,
        category: sponsor.category,
        description: sponsor.description,
        minBudget: sponsor.min_budget,
        maxBudget: sponsor.max_budget,
        location: sponsor.location,
        province: sponsor.province,
        contactEmail: sponsor.contact_email,
        contactPhone: sponsor.contact_phone,
        benefits: sponsor.benefits,
        website: sponsor.website
      }))

    } catch (err) {
      error.value = err.message
      console.error('Error fetching sponsors:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    sponsors,
    loading,
    error,
    fetchSponsors
  }
}
