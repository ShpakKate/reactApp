type Mods = Record<string, string | boolean>;

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls.trim(),
        ...additional,
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ').trim();
}

