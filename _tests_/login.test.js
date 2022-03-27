/** @format */

const sum = require("./sum");
import { checkNumberOnCard } from "../components/clickHandlers/checkNumberOnCard";

test("adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});

test("check 123456789111", () => {
	expect(checkNumberOnCard("123456789111", /^[0-9]+$/)).toBe(true);
});
