use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("7oU3XEDPr3MYrPfL5rWGYfeevAnQMRXh5um6nBtpA1Hs");

#[program]
pub mod solana_calculator {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn compute(ctx: Context<Compute>, left: i64, right: i64, operator: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        match operator.as_str() {
            "+" => calculator.result = left + right,
            "-" => calculator.result = left - right,
            "*" => calculator.result = left * right,
            "/" => calculator.result = left / right,
            _ => {
                calculator.result = 0
            }
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Compute<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    greeting: String,
    result: i64
}
