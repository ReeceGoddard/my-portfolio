import { Prisma, PrismaClient } from './index.js';
import { hiragana } from './seed-data/hiragana.js';

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

prisma.$on('query', (event: any) => {
    console.log('Query: ', event.query);
    console.log('Duration: ', event.duration);
    console.log('Params: ', event.params);
    console.log();
});

async function dropCollections() {
    return await Promise.all([
        prisma.user.deleteMany(),
        prisma.answerHistory.deleteMany(),
        prisma.character.deleteMany(),
    ]);
}

const addUsers = async () => {
    const savedUsers = await prisma.user.createMany({
        data: [
            {
                name: 'Reece Goddard',
                email: 'goddard.reece@gmail.com',
            },
        ],
    });
};

const addJapaneseCharacterLibrary = async () => {
    const characters: Prisma.CharacterCreateManyInput[] = hiragana.map(char => {
        return {
            ...char,
            alphabet: 'hiragana',
        };
    });

    const savedCharacters = await prisma.character.createMany({
        data: characters,
    });
};

async function main() {
    await dropCollections();
    await addUsers();
    await addJapaneseCharacterLibrary();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
