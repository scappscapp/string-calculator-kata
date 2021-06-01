import { assert, expect } from "chai";
import { StringCalculator } from "../app/stringCalculator.js";

describe("String calculator", function() {
    describe("Method add", function() {
        it("should return 0 when the input string is empty", function() {
            let stringCalculator = new StringCalculator();
            let additionResult = stringCalculator.add('');

            expect(additionResult).to.equal(0);
        });

        it("sums together comma separated integers", function() {
            let stringCalculator = new StringCalculator();
            let additionResult1 = stringCalculator.add("1,2,3,4,5");
            let additionResult2 = stringCalculator.add('1,2,3,4,5');
            let additionResult3 = stringCalculator.add("1,2,3,4,5,70");

            expect(additionResult1).to.equal(15);
            expect(additionResult2).to.equal(15);
            expect(additionResult3).to.equal(85);
        });

        it("sums together integers separated by '\\n'", function() {
            let stringCalculator = new StringCalculator();
            let additionResult1 = stringCalculator.add("1\n2\n3\n4\n5");
            let additionResult2 = stringCalculator.add('1\n2\n3\n4\n5');
            let additionResult3 = stringCalculator.add("1\n2\n3\n4\n5\n70");

            expect(additionResult1).to.equal(15);
            expect(additionResult2).to.equal(15);
            expect(additionResult3).to.equal(85);
        });

        it("sums together integers separated by '\\n' or by comma ','", function() {
            let stringCalculator = new StringCalculator();
            let additionResult1 = stringCalculator.add("1\n2,3\n4,5");
            let additionResult2 = stringCalculator.add('1\n2\n3,4\n5');
            let additionResult3 = stringCalculator.add("1\n2,3,4,5\n70");

            expect(additionResult1).to.equal(15);
            expect(additionResult2).to.equal(15);
            expect(additionResult3).to.equal(85);
        });

        it("sums together integers separated by any kind of delimeter if the string starts with '//[delimiter]\\n[numbers...]' (e.g. '//;\n1;2')", function() {
            let stringCalculator = new StringCalculator();
            let additionResult1 = stringCalculator.add("//a\n1a2a3a4a5");
            let additionResult2 = stringCalculator.add('//a\n1\n2\n3\n4\n5');
            let additionResult3 = stringCalculator.add("//a\n1\n2a3a4a5\n70");

            expect(additionResult1).to.equal(15);
            expect(additionResult2).to.equal(15);
            expect(additionResult3).to.equal(85);
        });

        it("does not allow summing negative numbers", function() {
            let stringCalculator = new StringCalculator();

            assert.throw(() => stringCalculator.add("//a\n1\n2a3a4a5\n70a-1\n-20"), Error, "negatives not allowed: -1,-20");
        });

        it("filters out integers bigger than 1000", function() {
            let stringCalculator = new StringCalculator();
            let additionResult = stringCalculator.add("//a\n1\n2a3a4a5\n70a1002");

            expect(additionResult).to.equal(85);
        });
    });
});