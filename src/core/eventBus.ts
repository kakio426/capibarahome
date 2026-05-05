export type GameEvent =
  | { type: "floating_text"; text: string; x: number; y: number }
  | { type: "toast"; message: string }
  | { type: "analytics"; name: string; payload?: Record<string, unknown> };

type Listener = (event: GameEvent) => void;

const listeners = new Set<Listener>();

export const eventBus = {
  emit(event: GameEvent) {
    listeners.forEach((listener) => listener(event));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
