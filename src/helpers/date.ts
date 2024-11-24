export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
