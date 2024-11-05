export function AllowedCharacter(s: string) {
  const AllowedCharacterRegexPattern = "^([a-zA-Z0-9\(\)\+,\-\.'/@_#& ]|[\u00C0-\u024F]|[\u1E00-\u1EFF])+$";
  return s.match(new RegExp(AllowedCharacterRegexPattern));
}