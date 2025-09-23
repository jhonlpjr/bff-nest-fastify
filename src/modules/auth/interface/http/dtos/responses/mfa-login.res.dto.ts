import { ApiProperty } from "@nestjs/swagger";

export class Mfa {
    @ApiProperty({ example: ['totp', 'sms'] })
    types: string[];
}

export class MfaLoginResDTO {
    @ApiProperty({ example: 'mfa_required' })
    step: string;
    @ApiProperty({ example: 'login-transaction-id' })
    login_tx: string;
    @ApiProperty({ type: Mfa })
    mfa: Mfa;
}