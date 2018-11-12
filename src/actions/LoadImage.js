export const LOAD_IMAGE = 'loadimage';

export function LoadImage(Image) {
    return {
        type: LOAD_IMAGE,
        image: Image
    };
}