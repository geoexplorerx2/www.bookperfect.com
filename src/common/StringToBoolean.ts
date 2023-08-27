export default function StringToBoolean (string: string | undefined) {
    switch (string?.toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            break;
    };
};