import { Users } from "lucide-react";

export default function NoConversations() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-muted-foreground">
      <Users className="w-12 h-12 mb-4 text-primary" />
      <h2 className="text-xl font-semibold">Nenhuma conversa iniciada</h2>
      <p className="mt-2 text-sm">
        Encontre músicos ou estabelecimentos e envie uma mensagem para começar.
      </p>
    </div>
  );
}
