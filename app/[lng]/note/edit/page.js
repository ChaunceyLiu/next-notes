import NoteEditor from '@/app/components/NoteEditor'

export default async function EditPage() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />
}