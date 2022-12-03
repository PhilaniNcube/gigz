import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../db_types"

const supabaseClient = createBrowserSupabaseClient<Database>()

export const getMyProfile = async (id:string) => {

  const {data:profile, error} = await supabaseClient.from('profiles').select('*').eq('id', id).single()

  if (error) throw new Error(error.details)

    return profile

}
