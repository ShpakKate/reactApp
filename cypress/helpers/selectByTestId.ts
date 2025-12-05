export function selectByTestId(testId: string): string {
    return `[data-testid="${testId.replace(/\./g, '\\.')}"]`;
}
