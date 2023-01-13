export function calculateAge(dob: string) {
    return Math.floor((Date.now() - new Date(dob).getTime()) / 3.15576e+10).toString();
};
