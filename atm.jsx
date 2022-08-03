const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [atmMode, setAtmMode] = React.useState(null);
  const [validTransaction, setValidTransaction] = React.useState(true)

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (atmMode === 'Cash Back' && deposit > totalState){
      setValidTransaction(false)
      return;
    }else{
     setValidTransaction(true)
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    }
    
    
  };

  const handleModeSelect = (e) => {
    if(e.target.value === ''){
     setAtmMode(null)
    }else if(e.target.value === 'Deposit'){
      setIsDeposit(true)
      setAtmMode('Deposit')
    }else{
      setIsDeposit(false)
      setAtmMode('Cash Back')
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {atmMode && <ATMDeposit isValid={validTransaction} onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>}
        
      
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
