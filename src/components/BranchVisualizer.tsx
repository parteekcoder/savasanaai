import { Branch } from '@/types'

interface BranchVisualizerProps {
  branches: Branch[]
  activeBranch: number | null
  setActiveBranch: (branchId: number | null) => void
}

export default function BranchVisualizer({ branches, activeBranch, setActiveBranch }: BranchVisualizerProps) {
  return (
    <div className="mb-4 flex space-x-2 overflow-x-auto">
      <button
        onClick={() => setActiveBranch(null)}
        className={`px-3 py-1 rounded ${activeBranch === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Main
      </button>
      {branches.map((branch) => (
        <button
          key={branch.id}
          onClick={() => setActiveBranch(branch.id)}
          className={`px-3 py-1 rounded ${activeBranch === branch.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {branch.name}
        </button>
      ))}
    </div>
  )
}