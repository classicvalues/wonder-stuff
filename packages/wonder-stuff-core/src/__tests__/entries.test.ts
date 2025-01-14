// @flow
import {entries} from "../entries";

describe("#entries", () => {
    it("should call Object.entries with the given object", () => {
        // Arrange
        const entriesSpy = jest.spyOn(Object, "entries");
        const obj = {
            a: 1,
            b: "2",
            c: [3, 4],
        };

        // Act
        entries(obj);

        // Assert
        expect(entriesSpy).toHaveBeenCalledWith(obj);
    });

    it("should return the result of Object.entries", () => {
        // Arrange
        const obj = {
            a: 1,
            b: "2",
            c: [3, 4],
        };
        jest.spyOn(Object, "entries").mockReturnValueOnce([
            ["e", 1],
            ["f", 2],
            ["g", 3],
        ]);

        // Act
        const result = entries(obj);

        // Assert
        expect(result).toEqual([
            ["e", 1],
            ["f", 2],
            ["g", 3],
        ]);
    });
});
