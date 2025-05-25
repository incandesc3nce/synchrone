export interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export type TokenPayloadWithColor = TokenPayload & {
  color: string;
};
