import { render, screen } from "@testing-library/react";
import Password from "./Password";

test('checking password', () => {
    render(<Password/>);
    const password = screen.getByText('Send Link');
    expect(password).toBeInTheDocument();
});