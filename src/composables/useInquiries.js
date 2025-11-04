import { ref } from 'vue'
import { supabase } from '../config/supabase'

export function useInquiries() {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)

  const submitInquiry = async (inquiryData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      // Prepare data in snake_case for database
      const dbData = {
        sponsor_id: inquiryData.sponsorId,
        sponsor_name: inquiryData.sponsorName,
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        court_name: inquiryData.courtName,
        court_location: inquiryData.courtLocation,
        event_type: inquiryData.eventType,
        participants: inquiryData.participants ? parseInt(inquiryData.participants) : null,
        message: inquiryData.message,
        status: 'new'
      }

      const { data, error: supabaseError } = await supabase
        .from('inquiries')
        .insert([dbData])
        .select()

      if (supabaseError) throw supabaseError

      success.value = true
      return data[0]

    } catch (err) {
      error.value = err.message
      console.error('Error submitting inquiry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    submitInquiry
  }
}
