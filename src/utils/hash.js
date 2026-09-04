import SHA256 from "crypto-js/sha256";

export function gerarHash(senha) {
  return SHA256(senha).toString();
}
