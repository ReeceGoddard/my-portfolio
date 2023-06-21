export type KanaCharacter = {
    alphabet: string;
    character: string;
    frequency: number;
    id: string;
    romaji: string;
    row: number;
    rowName: string;
    vowelGroup: string;
};

export type GetBoardCharsAPIResponse = KanaCharacter[];
