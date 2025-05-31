import { supabase } from './supabaseClient'
//import { Database } from '../types/database.types'

export async function getAllProfiles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur détaillée:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    if (!data) {
      console.log('Aucune donnée trouvée')
      return []
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des profils:', error)
    throw error
  }
}

export async function createProfile(profileData: {
  email: string
  name?: string
  avatar_url?: string
}) {
  try {
    console.log('Tentative de création du profil avec les données:', profileData)
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Erreur détaillée lors de la création:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        error
      })
      throw new Error(`Erreur lors de la création du profil: ${error.message}`)
    }

    console.log('Profil créé avec succès:', data)
    return data
  } catch (error) {
    console.error('Erreur lors de la création du profil:', error)
    throw error
  }
}

export async function getProfileById(id: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erreur détaillée:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
    throw error
  }
} 