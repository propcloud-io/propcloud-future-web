export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string | null
          id: string
          is_from_user: boolean | null
          lead_id: string | null
          message: string | null
          page_context: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_from_user?: boolean | null
          lead_id?: string | null
          message?: string | null
          page_context?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_from_user?: boolean | null
          lead_id?: string | null
          message?: string | null
          page_context?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          created_at: string | null
          email: string
          id: string
          linkedin_url: string | null
          motivation: string | null
          name: string
          resume_url: string | null
          role_applied: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          linkedin_url?: string | null
          motivation?: string | null
          name: string
          resume_url?: string | null
          role_applied?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          linkedin_url?: string | null
          motivation?: string | null
          name?: string
          resume_url?: string | null
          role_applied?: string | null
          source?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          email: string
          id: string
          location: string | null
          message: string | null
          name: string
          number_of_properties: number | null
          phone: string | null
          platform_usage: string[] | null
          property_type: string | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          location?: string | null
          message?: string | null
          name: string
          number_of_properties?: number | null
          phone?: string | null
          platform_usage?: string[] | null
          property_type?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          number_of_properties?: number | null
          phone?: string | null
          platform_usage?: string[] | null
          property_type?: string | null
          source?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          active: boolean | null
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          has_pool: boolean | null
          id: string
          lead_id: string | null
          name: string
          number_of_rooms: number | null
          property_type: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          has_pool?: boolean | null
          id?: string
          lead_id?: string | null
          name: string
          number_of_rooms?: number | null
          property_type?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          has_pool?: boolean | null
          id?: string
          lead_id?: string | null
          name?: string
          number_of_rooms?: number | null
          property_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          guest_rating: number | null
          id: string
          maintenance_issues: number | null
          month: string
          notes: string | null
          number_of_bookings: number | null
          occupancy_rate: number | null
          property_id: string | null
          revenue: number | null
        }
        Insert: {
          created_at?: string | null
          guest_rating?: number | null
          id?: string
          maintenance_issues?: number | null
          month: string
          notes?: string | null
          number_of_bookings?: number | null
          occupancy_rate?: number | null
          property_id?: string | null
          revenue?: number | null
        }
        Update: {
          created_at?: string | null
          guest_rating?: number | null
          id?: string
          maintenance_issues?: number | null
          month?: string
          notes?: string | null
          number_of_bookings?: number | null
          occupancy_rate?: number | null
          property_id?: string | null
          revenue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
