"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

export default function AddPostPage() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const onlyImages = selected.filter((file) =>
      file.type.startsWith("image/"),
    );
    setFiles((prev) => [...prev, ...onlyImages]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || files.length === 0) {
      alert("Preencha o texto e selecione ao menos uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    files.forEach((file) => {
      formData.append("attachments", file);
    });

    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    alert("Post enviado!");
    setText("");
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-6">
      <div>
        <Label htmlFor="text">Texto do post</Label>
        <Input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite seu texto..."
        />
      </div>

      <div>
        <Label htmlFor="attachments">Imagens</Label>
        <Input
          id="attachments"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Pré-visualização:</p>
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <Image
                  key={index}
                  width={100}
                  height={100}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-28 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Enviar post
      </Button>
    </form>
  );
}
