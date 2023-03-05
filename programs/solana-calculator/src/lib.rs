use anchor_lang::prelude::*;

declare_id!("7oU3XEDPr3MYrPfL5rWGYfeevAnQMRXh5um6nBtpA1Hs");

#[program]
pub mod solana_calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
