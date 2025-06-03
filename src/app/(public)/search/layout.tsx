import { FormProvider } from "@/lib/contexts/form.context";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <FormProvider initialData={{}}>{children}</FormProvider>
    </div>
  );
}
