export class DecoderJwt {
  getSubject!: ()=> string;
  getAuthority!: ()=> string;
  getIssuer!: ()=> string;
}
