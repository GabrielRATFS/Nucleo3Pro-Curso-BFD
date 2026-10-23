import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="min-h-screen text-black flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">React + Tailwind CSS</h1>
        <p className="text-slate-400 text-sm">Ambiente configurado com sucesso.</p>
        <Button variant="secondary">Teste Button</Button>
        <Button variant="outline">Teste Button</Button>
        <Button variant="ghost">Teste Button</Button>
        <Button variant="link">Teste Button</Button>
        <Button variant="destructive">Teste Button</Button>
        <Button variant="default">Teste Button</Button>
      </div>
    </div>
  )
}
