export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      account_infos: {
        Row: {
          account_holder: string;
          account_number: string;
          bank_name: string;
          created_at: string | null;
          id: string;
          user_id: string;
        };
        Insert: {
          account_holder: string;
          account_number: string;
          bank_name: string;
          created_at?: string | null;
          id?: string;
          user_id: string;
        };
        Update: {
          account_holder?: string;
          account_number?: string;
          bank_name?: string;
          created_at?: string | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "account_infos_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      expense_participants: {
        Row: {
          amount: number | null;
          expense_id: string;
          id: string;
          state: Database["public"]["Enums"]["expense_state"] | null;
          user_id: string;
        };
        Insert: {
          amount?: number | null;
          expense_id: string;
          id?: string;
          state?: Database["public"]["Enums"]["expense_state"] | null;
          user_id: string;
        };
        Update: {
          amount?: number | null;
          expense_id?: string;
          id?: string;
          state?: Database["public"]["Enums"]["expense_state"] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expense_participants_expense_id_fkey";
            columns: ["expense_id"];
            isOneToOne: false;
            referencedRelation: "expenses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expense_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      expenses: {
        Row: {
          category: string | null;
          created_at: string | null;
          expense_date: string | null;
          group_id: string;
          id: string;
          payer_id: string;
          payment_title: string;
          total_amount: number;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          expense_date?: string | null;
          group_id: string;
          id?: string;
          payer_id: string;
          payment_title: string;
          total_amount: number;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          expense_date?: string | null;
          group_id?: string;
          id?: string;
          payer_id?: string;
          payment_title?: string;
          total_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenses_payer_id_fkey";
            columns: ["payer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      group_members: {
        Row: {
          group_id: string;
          id: string;
          joined_at: string | null;
          role: Database["public"]["Enums"]["member_role"] | null;
          user_id: string;
        };
        Insert: {
          group_id: string;
          id?: string;
          joined_at?: string | null;
          role?: Database["public"]["Enums"]["member_role"] | null;
          user_id: string;
        };
        Update: {
          group_id?: string;
          id?: string;
          joined_at?: string | null;
          role?: Database["public"]["Enums"]["member_role"] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "group_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          batch: number | null;
          code: string;
          course: Database["public"]["Enums"]["course_type"] | null;
          created_at: string | null;
          creator_id: string;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          batch?: number | null;
          code: string;
          course?: Database["public"]["Enums"]["course_type"] | null;
          created_at?: string | null;
          creator_id: string;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          batch?: number | null;
          code?: string;
          course?: Database["public"]["Enums"]["course_type"] | null;
          created_at?: string | null;
          creator_id?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "groups_creator_id_fkey";
            columns: ["creator_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      guestbook_posts: {
        Row: {
          author_id: string;
          content: string;
          created_at: string | null;
          group_id: string;
          id: string;
        };
        Insert: {
          author_id: string;
          content: string;
          created_at?: string | null;
          group_id: string;
          id?: string;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string | null;
          group_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guestbook_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "guestbook_posts_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      photos: {
        Row: {
          content_id: string | null;
          created_at: string;
          id: string;
          image_url: string | null;
          order: number;
          type: string | null;
        };
        Insert: {
          content_id?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          order: number;
          type?: string | null;
        };
        Update: {
          content_id?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          order?: number;
          type?: string | null;
        };
        Relationships: [];
      };
      places: {
        Row: {
          address: string | null;
          created_at: string;
          description: string | null;
          id: string;
          region: string | null;
          user_id: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          region?: string | null;
          user_id?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          region?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "places_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          account_id: string;
          created_at: string;
          email: string | null;
          id: string;
          nickname: string | null;
          phone: string | null;
          profile: string | null;
          updated_at: string | null;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          nickname?: string | null;
          phone?: string | null;
          profile?: string | null;
          updated_at?: string | null;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          nickname?: string | null;
          phone?: string | null;
          profile?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      course_type: "FRONTEND" | "BACKEND" | "DESIGN";
      expense_state: "PENDING" | "COMPLETE";
      member_role: "OWNER" | "MEMBER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      course_type: ["FRONTEND", "BACKEND", "DESIGN"],
      expense_state: ["PENDING", "COMPLETE"],
      member_role: ["OWNER", "MEMBER"],
    },
  },
} as const;
