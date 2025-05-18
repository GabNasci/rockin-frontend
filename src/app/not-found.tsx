// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="text-muted-foreground mb-6">
        A página que você está procurando não existe.
      </p>
      <a href="/" className="text-primary underline">
        Voltar para a página inicial
      </a>
    </div>
  );
}
