let web3;
let staking;
let unirelay;

const initWeb3 = () => {
return new Promise((resolve, reject) => {
    if(window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(web3);
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(window.web3) {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3(alert(`You are currently not logged in! Please login to your metamask account and switch to infura testnet then try again. Don't have a metamask? Click here (https://metamask.io/download.html)`)));
  });
  
    
}  

const initContract = () => {
  const contractAddress ='0x6879344353745b1b118821baf0ce90d56e9e6340'
  return new web3.eth.Contract(
    stakingAbi,
    contractAddress
  );
};

const initContract2 = () => {
    const contractAddress ='0x6f53C2a29CA2411519392DDf7f981a112A0973E1'
    return new web3.eth.Contract(
      unirelayAbi,
      contractAddress
    );
  };

const initApp = () => {
   web3.eth.net.getNetworkType()
.then(result => {
  if(result == 'main'){}
    else{
      alert('please use mainnet')
    };
});

  const stakes = document.getElementById('stakes');
  const stakesResult = document.getElementById('stakes-result');
  const pool = document.getElementById('pool');
  const poolResult = document.getElementById('pool-result');
  const index = document.getElementById('index');
  const indexResult = document.getElementById('index-result');
  const minimum = document.getElementById('minimum');
  const minimumResult = document.getElementById('minimum-result');
  const weekly = document.getElementById('weekly');
  const weeklyResult = document.getElementById('weekly-result');
  const reward = document.getElementById('reward');
  const rewardResult = document.getElementById('reward-result');
  const withdraw = document.getElementById('withdraw');
  const withdrawResult = document.getElementById('withdraw-result');
  const bonus = document.getElementById('bonus');
  const bonusResult = document.getElementById('bonus-result');
  const approve = document.getElementById('approve');
  const approveResult = document.getElementById('approve-result');
  const stake = document.getElementById('stake');
  const stakeResult = document.getElementById('stake-result');
  const unstake = document.getElementById('unstake');
  const unstakeResult = document.getElementById('unstake-result');
  const stakeOf = document.getElementById('stakeOf');
  const stakeOfResult = document.getElementById('stakeOf-result');
  const rewardOf = document.getElementById('rewardOf');
  const rewardOfResult = document.getElementById('rewardOf-result');  
  const refferal = document.getElementById('refferal');
  const refferalResult = document.getElementById('refferal-result');
  const refferalList = document.getElementById('refferalList');
  const refferalListResult = document.getElementById('refferalList-result');
  const IfStakeholder = document.getElementById('IfStakeholder');
  const IfStakeholderResult = document.getElementById('IfStakeholder-result');
  
  let accounts;
  let accountInterval = setInterval(function() {
  web3.eth.getAccounts().then(_accounts => {
  accounts = _accounts;
  });
   }, 100);

 stakes.addEventListener('click', (e) => {
    e.preventDefault();
        staking.methods.totalStakes().call()
    .then(result => {
      stakesResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(() => {
      stakesResult.innerHTML = `error`;
    });
  });

 pool.addEventListener('click', (e) => {
    e.preventDefault();
        staking.methods.stakingPool().call()
    .then(result => {
      poolResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(() => {
      poolResult.innerHTML = `error`;
    });
  });

  index.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.stakeholdersIndex().call()
    .then(result => {
        indexResult.innerHTML = result;
    })
    .catch(_e => {
        indexResult.innerHTML = `error`;
    });
  });

  minimum.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.minimumStakeValue().call()
    .then(result => {
        minimumResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(_e => {
        minimumResult.innerHTML = `error`;
    });
  });

  weekly.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.getRewardToShareWeekly().send({from: accounts[0]})
    .then(result => {
        weeklyResult.innerHTML = 'Reward shared';
    })
    .catch(_e => {
        weeklyResult.innerHTML = `Only Owner can call this<br> Only called once a week`;
    });
  });

  reward.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.getRewards().send({from: accounts[0]})
    .then(result => {
        rewardResult.innerHTML = `Reward added to address`;
    })
    .catch(_e => {
        rewardResult.innerHTML = `Address does not belong to a stakeholders<br>Can only call this function once a week`;
    });
  });

  bonus.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.getReferralBouns().send({from: accounts[0]})
    .then(result => {
        bonusResult.innerHTML =`Bonus successfully added to reward`;
    })
    .catch(_e => {
        bonusResult.innerHTML = `Address does not belong to a stakeholders<br> You do not have any bonus `;
    });
  });

  withdraw.addEventListener('click', (e) => {
    e.preventDefault();
    staking.methods.withdrawReward().send({from: accounts[0]})
    .then(result => {
        withdrawResult.innerHTML =`Withdraw successful`;
    })
    .catch(_e => {
        withdrawResult.innerHTML = `error`;
    });
  });

  approve.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    const amountt = web3.utils.toWei(amount.toString(), 'ether');
    const address = '0x6879344353745b1B118821baF0cE90D56E9e6340'
    unirelay.methods.approve(address, amountt).send({from: accounts[0]})
    .then(result => {
        approveResult.innerHTML = `Aprrove successful`;
    })
    .catch(_e => {
        approveResult.innerHTML = `error`;
    });
  });

  stake.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    const amountt = web3.utils.toWei(amount.toString(), 'ether');
    let address = e.target.elements[1].value;
    if(address == ''){address = '0x0000000000000000000000000000000000000000'}
    staking.methods.stake(amountt, address).send({from: accounts[0]})
    .then(result => {
      stakeResult.innerHTML = `Your staking was successful`;
    })
    .catch(_e => {
      stakeResult.innerHTML = `Ooops...there was an error while trying to stake<br>This error might be due to if; <br>Staking is below 20 DSD tokens, <br>Referee is not a stakeholder, <br>Referee is sender, <br>Sender already added referee.`;
    });
  });

  unstake.addEventListener('submit', (e) => {
    e.preventDefault();
    //const address = e.target.elements[0].value;
    const amount = e.target.elements[0].value;
    const amountt = web3.utils.toWei(amount.toString(), 'ether');
    staking.methods.removeStake( amountt).send({from: accounts[0]})
    .then(result => {
      unstakeResult.innerHTML = `Your unstaking was successful`;
    })
    .catch(_e => {
      unstakeResult.innerHTML = `Stakes must be above 0`;
    });
  });

  stakeOf.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.elements[0].value;
    staking.methods.stakeOf(address).call()
    .then(result => {
      stakeOfResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(_e => {
      stakeOfResult.innerHTML = `error`;
    });
  });

  rewardOf.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.elements[0].value;
    staking.methods.rewardOf(address).call()
    .then(result => {
      rewardOfResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(_e => {
      rewardOfResult.innerHTML = `error`;
    });
  });

  refferal.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.elements[0].value;
    staking.methods.bonus(address).call()
    .then(result => {
        refferalResult.innerHTML = `${web3.utils.fromWei(result.toString(), 'ether')} URE`;
    })
    .catch(_e => {
        refferalResult.innerHTML = `error`;
    });
  });

  refferalList.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.elements[0].value;
    staking.methods.stakeholderReferralCount(address).call()
    .then(result => {
        refferalListResult.innerHTML = result;
    })
    .catch(_e => {
        refferalListResult.innerHTML = `error`;
    });
  });

  IfStakeholder.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = e.target.elements[0].value;
    staking.methods.stakeholders(address).call()
    .then(result => {
        IfStakeholderResult.innerHTML = `stakeholder: ${result[0]}<br> id: ${result[1]}`;
    })
    .catch(_e => {
        IfStakeholderResult.innerHTML = `error`;
    });
  });

 }
 document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      staking = initContract();
      unirelay = initContract2();
      initApp(); 
    })
    .catch(e => console.log(e.message));
})
