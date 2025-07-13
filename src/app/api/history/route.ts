import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function GET() {
  const { data} = await supabase.from('Summmaries').select('*').order('created_at', { ascending: false })
  return Response.json(data || [])
}


export async function DELETE(req: Request) {
  const { id } = await req.json()

  const { error } = await supabase.from('Summmaries').delete().eq('id', id)
  // Also delete from MongoDB if necessary (optional)

  return Response.json({ success: !error })
}
