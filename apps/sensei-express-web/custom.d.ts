declare module '*.wav' {
    const src: string;
    const duration: number;
    const metadata: {
        artist: string;
        title: string;
        // Add more metadata fields as needed
    };

    export default src;
    export { duration, metadata };
}
declare module '*.mp3' {
    const src: string;
    export default src;
}
