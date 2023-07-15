
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: l laborefdfgd laborum mollit.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En progreso:  Holavgcgvgfhcgfc.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finalizada: rrrdxcbkuy motyt ytftrd.',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
}