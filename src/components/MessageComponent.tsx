import { useState } from 'react'
import { Message } from '@/types'

interface MessageComponentProps {
  message: Message
  onEdit: (messageId: number, newContent: string) => void
  onCreateBranch: (messageId: number) => void
}

export default function MessageComponent({ message, onEdit, onCreateBranch }: MessageComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)

  const handleEdit = () => {
    onEdit(message.id!, editContent)
    setIsEditing(false)
  }

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded-lg">
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleEdit} className="mt-2 bg-green-500 text-white px-2 py-1 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="mt-2 ml-2 bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
        </div>
      ) : (
        <div>
          <p>{message.content}</p>
          <div className="mt-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">Edit</button>
            <button onClick={() => onCreateBranch(message.id!)} className="text-green-500">Branch</button>
          </div>
        </div>
      )}
    </div>
  )
}