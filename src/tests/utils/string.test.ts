import { idRegex } from "@/utils/string";

describe("utils.ts", () => {
  describe("string.ts", () => {
    it.each([
      "firstname",
      "LastName",
      "full.name",
      "JOHNCONSTANT",
      "user-1d",
      '0123456789',
      "all=-(Valid)+Spe.cial_Chars",
      "(open",
      "close)",
      "1+1=4"
    ])("should return true from given %s", (input) => {
      expect(idRegex.test(input)).toBeTruthy();
    });
    
    it.each([
      "",
      "  ",
      "email@address.com",
      "gov!.jp",
      "Name Family",
      "bro|t|her",
      "おはよう",
      "Ｇａｍｅ",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "{}",
      "`",
      "First:name;",
      "shoe's",
      ",",
    ])("should return false from given %s", (input) => {
      expect(idRegex.test(input)).toBeFalsy();
    });
  });
});

