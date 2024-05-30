export interface AddCardRequest {
    card: Card;
}

export interface Card {
    cardNumber: string;
    ownerName: string;
    bankName: string;
}

export interface ChangeEmailRequest {
    email: string;
}

export interface ChangeNameRequest {
    name: string;
}