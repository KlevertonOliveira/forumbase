export function getUsernameFromEmail(email: string){
    return email.split('@')[0];
}