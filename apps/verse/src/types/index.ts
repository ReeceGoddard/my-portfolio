export type GetAuthorsAPIResponse = {
    authors: string[];
};

export type Authors = string[];

export type GetAuthorProfileAPIResponseObject = {
    title: string;
    author: string;
    lines: string[];
    lineCount: string;
};

export type GetAuthorProfileAPIResponse = GetAuthorProfileAPIResponseObject[];

export type Poem = {
    title: string;
    author: string;
    lines: string[];
    lineCount: number;
};

export type AuthorProfile = Poem[];
