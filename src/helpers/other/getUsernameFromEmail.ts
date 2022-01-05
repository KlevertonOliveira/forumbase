export function getUsernameFromEmail(email: string){
    const username = email.split('@')[0];
    return username;
}