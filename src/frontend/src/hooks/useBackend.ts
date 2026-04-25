import { type Backend, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

// Stub upload/download functions since this app doesn't use object storage
const uploadFile = async (_file: unknown): Promise<Uint8Array> =>
  new Uint8Array();
const downloadFile = async (_file: Uint8Array): Promise<unknown> => ({
  directURL: "",
  getBytes: async () => new Uint8Array(),
  getDirectURL: () => "",
  withUploadProgress: () => ({}),
});

export function useBackend(): { actor: Backend | null; isFetching: boolean } {
  return useActor(
    (
      canisterId: string,
      _upload: unknown,
      _download: unknown,
      options: unknown,
    ) =>
      createActor(
        canisterId,
        uploadFile,
        downloadFile as never,
        options as never,
      ),
  );
}
