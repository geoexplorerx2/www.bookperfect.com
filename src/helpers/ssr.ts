// server side rendering
export function isClientSide() {
    return typeof window !== "undefined";
};