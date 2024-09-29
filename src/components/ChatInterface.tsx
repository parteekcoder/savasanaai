import { useState, useEffect } from 'react'
import { Message, Branch } from '@/types'
import { SupabaseClient } from '@supabase/supabase-js'
import MessageComponent from './MessageComponent'
import BranchVisualizer from './BranchVisualizer'

interface ChatInterfaceProps {
  supabase: SupabaseClient
}

export default function ChatInterface({ supabase }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [input, setInput] = useState('')
  const [activeBranch, setActiveBranch] = useState<number | null>(null)

  useEffect(() => {
    fetchMessages()
    fetchBranches()
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const fetchBranches = async () => {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('created_at', { ascending: true })
    if (data) setBranches(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Partial<Message> = {
      content: input,
      branch_id: activeBranch,
      parent_message_id: messages.length > 0 ? messages[messages.length - 1].id : null,
      version: 1,
    }

    const { data, error } = await supabase.from('messages').insert(newMessage)
    if (!error) {
      setInput('')
      fetchMessages()
    }
  }

  const handleCreateBranch = async (messageId: number) => {
    const branchName = prompt('Enter a name for the new branch:')
    if (!branchName) return

    const { data, error } = await supabase
      .from('branches')
      .insert({ name: branchName, root_message_id: messageId })
    
    if (!error) {
      fetchBranches()
      if(data)
      setActiveBranch(data![0].id)
    }
  }

  const handleEditPrompt = async (messageId: number, newContent: string) => {
    const { data: oldMessage } = await supabase
      .from('messages')
      .select('*')
      .eq('id', messageId)
      .single()

    if (oldMessage) {
      const newMessage: Partial<Message> = {
        content: newContent,
        branch_id: oldMessage.branch_id,
        parent_message_id: oldMessage.id,
        version: oldMessage.version + 1,
      }

      const { error } = await supabase.from('messages').insert(newMessage)
      if (!error) {
        fetchMessages()
      }
    }
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
      <BranchVisualizer branches={branches} activeBranch={activeBranch} setActiveBranch={setActiveBranch} />
      <div className="mb-4 h-96 overflow-y-auto">
        {messages
          .filter(m => m.branch_id === activeBranch)
          .map((message) => (
            <MessageComponent
              key={message.id}
              message={message}
              onEdit={handleEditPrompt}
              onCreateBranch={handleCreateBranch}
            />
          ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow mr-2 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}