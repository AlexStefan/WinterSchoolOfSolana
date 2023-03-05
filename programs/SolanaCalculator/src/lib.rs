use anchor_lang::prelude::*;

declare_id!("2BDRQuuxdr2kCMN4z7cfbgpcv98bLCF5kCeJkwBDTnyZ");

#[program]
pub mod solana_calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
