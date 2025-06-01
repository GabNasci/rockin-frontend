import { toast } from "../toast";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: unknown, meta?: Record<string, any>) {
  if (meta?.silent) {
    return;
  }
  const prefix = "Erro";

  if (isBackendErrorResponse(error)) {
    const backendError = error.response.data;

    if (backendError.message.includes("Invalid token")) {
      return;
    }
    backendError.message.forEach((msg) =>
      toast.error(`${prefix} ${backendError.statusCode}: ${msg}`),
    );
  } else {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    if (message.includes("Invalid token")) return;

    toast.error(`${prefix}: ${message}`);
  }
}

export type { BackendErrorResponse };
export { isBackendErrorResponse, handleError };
