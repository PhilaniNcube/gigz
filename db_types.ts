export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

  type ImageObject = {
    url: string
    width: number
    height: number
  }

  type Profile = {
            id: string
            created_at: string
            email: string
            username: string
            phoneNumber: string
            avatar: ImageObject
            bio: string
  }

  export interface Database {
    public: {
      Tables: {
         profiles: {
           Row: {
            id: string
            created_at: string
            email: string
            username: string
            phoneNumber: string
            avatar: ImageObject
            bio: string
           }
           Update: {
            id: string
            created_at: string
            email?: string
            username?: string
            phoneNumber?: string
            avatar?: ImageObject
            bio?: string
           }
           Insert: {
            id: string
            created_at: string
            email?: string
            username?: string
            phoneNumber?: string
            avatar?: ImageObject
            bio?: string
           }
         }
         event: {
          Row: {
            id: string
            created_at: string
            title: string
            date: string
            time: string
            coverCharge: string
            venue: string
            city: string
            address: string
            image: ImageObject
            owner: Profile
            cancelled: boolean
          }
          Update: {
            id: string
            created_at: string
            title?: string
            date?: string
            time?: string
            coverCharge?: string
            venue?: string
            city?: string
            address?: string
            image?: ImageObject
            owner?: Profile
            cancelled?: boolean
          }
          Insert : {
               id: string
            created_at: string
            title?: string
            date?: string
            time?: string
            coverCharge?: string
            venue?: string
            city?: string
            address?: string
            image?: ImageObject
            owner?: Profile
            cancelled?: boolean
          }
         }
         event_images: {
          Row: {
          id: string
          created_at: string
          event: {
            id: string
            created_at: string
            title: string
            date: string
            time: string
            coverCharge: string
            venue: string
            city: string
            address: string
          }
          image: ImageObject
          tags: {
            tags:string[]
          }
          }
          Update: {
          id: string
          created_at: string
          event?: {
            id: string
            created_at: string
            title: string
            date: string
            time: string
            coverCharge: string
            venue: string
            city: string
            address: string
          }
          image?: ImageObject
          tags?: {
            tags:string[]
          }
          }
          Insert : {
             id: string
          created_at: string
          event?: {
            id: string
            created_at: string
            title: string
            date: string
            time: string
            coverCharge: string
            venue: string
            city: string
            address: string
          }
          image?: ImageObject
          tags?: {
            tags:string[]
          }
          }
         }
         comments: {
          Row: {
            id: string
            created_at: string
            event: string
            comment: string
            profile: Profile
          }
          Update: {
             id: string
            created_at: string
            event?: string
            comment?: string
            profile?: string
          }
          Insert: {
                  id: string
            created_at: string
            event?: string
            comment?: string
            profile?: string
          }
         }
         reviews: {
          Row: {
            id: string
            created_at: string
            reviewer_id: Profile
            reviewee_id: Profile
            content: string
            rating: number
          }
          Update: {
             id: string
            created_at: string
            reviewer_id?: string
            reviewee_id?: string
            content?: string
            rating?: number
          }
              Insert: {
             id: string
            created_at: string
            reviewer_id?: string
            reviewee_id?: string
            content?: string
            rating?: number
          }
         }
      }
       Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    }
  }
