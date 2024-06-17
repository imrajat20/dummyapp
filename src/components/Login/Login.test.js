import { render, screen } from "@testing-library/react";
import Login from "./Login";


test('Testing login component', () => {
    render(<Login/>);
   const userEmail = screen.getByText('Login');
   expect(userEmail).toBeInTheDocument();
})