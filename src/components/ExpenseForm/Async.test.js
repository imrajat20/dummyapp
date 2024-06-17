import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

describe('async testing of expense form',  () => {
    test('redering post', async() => {
        render(<ExpenseForm/>)

        const listElements = await screen.findAllByRole('listitem');
        expect(listElements).toHaveLength(0);
    });
});