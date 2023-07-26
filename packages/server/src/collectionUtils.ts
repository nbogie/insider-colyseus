export function shuffle<T>(arg0: T[]): T[] {
    return [...arg0].sort(() => (Math.random() < 0.5 ? -1 : 1));
}

export function pick<T>(arg0: T[]): T {
    return arg0[Math.floor(Math.random() * arg0.length)];
}
