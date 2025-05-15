import { toast } from "sonner";

type BackendErrorResponse = {
  message: string[];
  error: string;
  statusCode: number;
};

function isBackendErrorResponse(
  error: unknown,
): error is { response: { data: BackendErrorResponse } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).response === "object" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "data" in (error as any).response &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.isArray((error as any).response.data.message) &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).response.data.error === "string" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).response.data.statusCode === "number"
  );
}

function handleError(error: unknown) {
  const prefix = "Erro";

  if (isBackendErrorResponse(error)) {
    const backendError = error.response.data;
    backendError.message.forEach((msg) =>
      toast.error(`${prefix} ${backendError.statusCode}: ${msg}`, {
        richColors: true,
      }),
    );
  } else {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    toast.error(`${prefix}: ${message}`, { richColors: true });
  }
}

export type { BackendErrorResponse };
export { isBackendErrorResponse, handleError };
