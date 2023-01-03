const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

let MoodContract;
let signer;

const MoodContractAbi = 
  [
    {
      inputs: [
        {
          internalType: "string",
          name: "_mood",
          type: "string",
        },
      ],
      name: "setMood",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getMood",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];


const MoodContractAddress = "0xe8257e00B9c0179F5546E9Ec3b6aA45a93b9168b";

// make signer for read and write in smart contract
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractAbi,
      signer
    );
  });
});

async function getMood() {
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
  document.getElementById("get").innerHTML=Mood;
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
}
