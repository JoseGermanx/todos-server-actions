
import { render } from "@testing-library/react";;
import Button from "@/components/Button";

describe("Button component", () => {
    it("renders without crashing", () => {
        render(<Button />);
    });
});