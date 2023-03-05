import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
const { SystemProgram } = anchor.web3
import { expect } from 'chai';
import { SolanaCalculator } from "../target/types/solana_calculator";

//Moka works using predescribed it blocks 
describe("solana-calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  //Referencing the program - Abstraction that allows us to call methods of our SOL program.
  const program = anchor.workspace.SolanaCalculator as Program<SolanaCalculator>;
  const programProvider = program.provider as anchor.AnchorProvider;

  //Generating a keypair for our Calculator account
  const calculatorPair = anchor.web3.Keypair.generate();

  const text = "Summer School Of Solana"

  //Creating a test block
  it("Creating Calculator Instance", async () => {
    //Calling create instance - Set our calculator keypair as a signer
    await program.methods.create(text).accounts(
      {
          calculator: calculatorPair.publicKey,
          user: programProvider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
      }
    ).signers([calculatorPair]).rpc()

    //We fecth the account and read if the string is actually in the account
    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.greeting).to.eql(text)
  });

  //Another test step - test out addition
  it('Addition',async () => {
    await program.methods.add(new anchor.BN(2), new anchor.BN(3))
      .accounts({
          calculator: calculatorPair.publicKey,
      })
      .rpc()
    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(5))
  })

  //Another test step - test out addition
  it('Deduct',async () => {
    await program.methods.deduct(new anchor.BN(2), new anchor.BN(3))
      .accounts({
          calculator: calculatorPair.publicKey,
      })
      .rpc()
    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(-1))
  })

  //Another test step - test out addition
  it('Multiply',async () => {
    await program.methods.multiply(new anchor.BN(2), new anchor.BN(3))
      .accounts({
          calculator: calculatorPair.publicKey,
      })
      .rpc()
    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(6))
  })

  //Another test step - test out addition
  it('Divide',async () => {
    await program.methods.divide(new anchor.BN(2), new anchor.BN(3))
      .accounts({
          calculator: calculatorPair.publicKey,
      })
      .rpc()
    const account = await program.account.calculator.fetch(calculatorPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(0))
  })
});