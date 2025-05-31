import { MessageCircle } from "lucide-react";

export default function NoneMessages() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 text-muted-foreground">
      <MessageCircle className="w-12 h-12 mb-4 text-primary" />
      <h2 className="text-xl font-semibold">Nenhuma mensagem ainda</h2>
      <p className="mt-2 text-sm">
        Envie a primeira mensagem e comece a conversa.
      </p>
    </div>
  );
}
