export class DecoderJwt {
  getSubject!: ()=> string | undefined;
  getAuthority!: ()=> string | undefined;
  getIssuer!: ()=> string | undefined;
}
