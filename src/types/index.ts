export interface Message {
    id?: number
    content: string
    branch_id: number | null
    parent_message_id: number | null
    version: number
    created_at: string
  }
  
  export interface Branch {
    id: number
    name: string
    root_message_id: number
    created_at: string
  }