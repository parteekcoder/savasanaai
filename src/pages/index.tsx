import Head from 'next/head'
import { createClient } from '@supabase/supabase-js'
import ChatInterface from '@/components/ChatInterface'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatGPT Clone</title>
        <meta name="description" content="ChatGPT clone with message branching" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">ChatGPT Clone</h1>
        <ChatInterface supabase={supabase} />
      </main>
    </>
  )
}